// Seed a throwaway demo database: create it, run the GovCore platform
// migrations, compile the CRM content types (in reference-dependency order),
// and insert demo orgs, users, memberships, and CRM records.
//
//   DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/govcrm_dev \
//     pnpm --filter govcrm seed

import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from '@govcore/schema/migrate'
import { hashPassword } from '@govcore/auth/password'
import { compileContentType, materializedValues } from '@govcore/content'
import {
  auditLog,
  organizations,
  userOrganizationMemberships,
  users,
} from '@govcore/schema'
import { account, accountTable } from './src/content/account'
import { activity, activityTable } from './src/content/activity'
import { contact, contactTable } from './src/content/contact'
import { deal, dealTable } from './src/content/deal'
import { lead, leadTable } from './src/content/lead'

const url = process.env.DATABASE_URL
if (!url) {
  console.error('Set DATABASE_URL (e.g. postgresql://postgres:postgres@127.0.0.1:5432/govcrm_dev)')
  process.exit(2)
}

const target = new URL(url)
const dbName = target.pathname.replace(/^\//, '')

const adminUrl = (() => {
  const u = new URL(url)
  u.pathname = '/postgres'
  return u.toString()
})()

async function main() {
  // 1. fresh database
  const admin = postgres(adminUrl, { max: 1, onnotice: () => {} })
  await admin.unsafe(`DROP DATABASE IF EXISTS ${dbName} WITH (FORCE)`)
  await admin.unsafe(`CREATE DATABASE ${dbName}`)
  await admin.end()
  console.log(`• created ${dbName}`)

  // 2. platform migrations, then the CRM content-type tables. Reference targets
  // must be compiled before the types that point at them: account → contact →
  // lead → deal → activity. (Folds into the app migration stream later.)
  await migrate({ connectionString: url, log: (m) => console.log(`  ${m}`) })
  const ddl = postgres(url!, { max: 1, onnotice: () => {} })
  for (const def of [account, contact, lead, deal, activity]) {
    await ddl.unsafe(compileContentType(def).sql)
    console.log(`• created content type "${def.name}"`)
  }

  // 2.5 two-role split (design §13.2): the app must connect as a non-superuser
  // runtime role — superusers bypass RLS, so running the app as `postgres`
  // silently disables tenant isolation. Seed/migrate keep the owner URL; the
  // app's DATABASE_URL uses govcrm_app (see .env.example).
  await ddl.unsafe(
    `DO $$ BEGIN CREATE ROLE govcrm_app LOGIN PASSWORD 'govcrm-app-dev'; EXCEPTION WHEN duplicate_object THEN NULL; END $$;`,
  )
  await ddl.unsafe('GRANT USAGE ON SCHEMA govcore TO govcrm_app')
  await ddl.unsafe('GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA govcore TO govcrm_app')
  await ddl.unsafe('GRANT USAGE ON SCHEMA content TO govcrm_app')
  await ddl.unsafe('GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA content TO govcrm_app')
  console.log('• created runtime role govcrm_app (non-owner; RLS applies)')
  await ddl.end()

  // 3. platform seed: orgs, users, memberships
  const sql = postgres(url!, { max: 1, onnotice: () => {} })
  const db = drizzle(sql)

  const [orgA] = await db
    .insert(organizations)
    .values({ name: 'City of Riverbend', slug: 'city-of-riverbend' })
    .returning()
  const [orgB] = await db
    .insert(organizations)
    .values({ name: 'Harris County', slug: 'harris-county' })
    .returning()

  const passwordHash = await hashPassword('govcrm-demo')
  const [admin1] = await db
    .insert(users)
    .values({
      organizationId: orgA.id,
      email: 'admin@govcrm.test',
      name: 'Avery Admin',
      role: 'admin',
      instanceRole: 'instance_admin',
      passwordHash,
    })
    .returning()
  const [contributor1] = await db
    .insert(users)
    .values({
      organizationId: orgA.id,
      email: 'casey@riverbend.example',
      name: 'Casey Contributor',
      role: 'contributor',
      passwordHash,
    })
    .returning()
  const [viewer1] = await db
    .insert(users)
    .values({
      organizationId: orgB.id,
      email: 'val@harris.example',
      name: 'Val Viewer',
      role: 'viewer',
      passwordHash,
    })
    .returning()

  await db.insert(userOrganizationMemberships).values([
    { userId: admin1.id, organizationId: orgA.id, role: 'admin', isPrimary: true },
    { userId: contributor1.id, organizationId: orgA.id, role: 'contributor', isPrimary: true },
    { userId: viewer1.id, organizationId: orgB.id, role: 'viewer', isPrimary: true },
  ])

  await db.insert(auditLog).values([
    { action: 'org.create', entityType: 'organization', entityId: orgA.id, organizationId: orgA.id, userId: admin1.id },
    { action: 'org.create', entityType: 'organization', entityId: orgB.id, organizationId: orgB.id, userId: admin1.id },
    { action: 'user.invite', entityType: 'user', entityId: contributor1.id, organizationId: orgA.id, userId: admin1.id },
  ])

  // 4. CRM seed for orgA. Content tables FORCE RLS — set the active-org GUC
  // first (the same scope tenantAction sets at request time).
  await sql.unsafe(`SELECT set_config('app.current_org', '${orgA.id}', false)`)
  const org = { organizationId: orgA.id }

  const [ramirez] = await db
    .insert(accountTable)
    .values({ ...org, name: 'Ramirez Paving LLC', account_type: 'vendor', phone: '555-0130', city: 'Riverbend', notes: 'Road-maintenance vendor since 2023.', status: 'published' })
    .returning()
  const [chamber] = await db
    .insert(accountTable)
    .values({ ...org, name: 'Riverbend Chamber of Commerce', account_type: 'community', phone: '555-0165', website: 'https://riverbendchamber.example', city: 'Riverbend', status: 'published' })
    .returning()
  const [countyIT] = await db
    .insert(accountTable)
    .values({ ...org, name: 'Harris County IT Services', account_type: 'partner', city: 'Harrisville', notes: 'Shared-services partner for GIS hosting.' })
    .returning()

  const contactRows = [
    { ...org, first_name: 'Jordan', last_name: 'Ramirez', email: 'jordan@ramirezpaving.example', phone: '555-0142', title: 'Owner', account_id: ramirez.id as string, notes: 'Prefers phone over email.', status: 'published' },
    { ...org, first_name: 'Priya', last_name: 'Natarajan', email: 'priya@riverbendchamber.example', phone: '555-0177', title: 'Executive Director', account_id: chamber.id as string, status: 'published' },
    { ...org, first_name: 'Sam', last_name: 'Okafor', email: 's.okafor@harriscounty.example', title: 'GIS Program Manager', account_id: countyIT.id as string },
    { ...org, first_name: 'Dana', last_name: 'Whitfield', email: 'dana.w@resident.example', phone: '555-0190', notes: 'Downtown small-business program applicant.' },
  ]
  const contacts: Record<string, unknown>[] = []
  for (const r of contactRows) {
    const [row] = await db.insert(contactTable).values({ ...r, ...materializedValues(contact, r) }).returning()
    contacts.push(row)
  }

  const leadRows = [
    { ...org, first_name: 'Marcus', last_name: 'Bell', email: 'mbell@bellelectric.example', organization_name: 'Bell Electric', source: 'web-form', lead_status: 'new', notes: 'Asked about the streetlight retrofit RFP.' },
    { ...org, first_name: 'Elena', last_name: 'Cruz', email: 'ecruz@cruzlandscaping.example', organization_name: 'Cruz Landscaping', source: 'referral', lead_status: 'contacted' },
    { ...org, first_name: 'Tom', last_name: 'Askew', email: 't.askew@resident.example', source: 'event', lead_status: 'qualified', notes: 'Farmers-market vendor program.' },
  ]
  for (const r of leadRows) {
    await db.insert(leadTable).values({ ...r, ...materializedValues(lead, r) })
  }

  const [pavingDeal] = await db
    .insert(dealTable)
    .values({ ...org, name: 'FY27 road-maintenance contract renewal', account_id: ramirez.id as string, primary_contact_id: contacts[0].id as string, amount: '185000', stage: 'negotiation', close_date: '2026-09-30', status: 'published' })
    .returning()
  await db.insert(dealTable).values({ ...org, name: 'Downtown wayfinding signage', account_id: chamber.id as string, primary_contact_id: contacts[1].id as string, amount: '42000', stage: 'proposal', close_date: '2026-08-15' })
  await db.insert(dealTable).values({ ...org, name: 'GIS hosting shared-services agreement', account_id: countyIT.id as string, primary_contact_id: contacts[2].id as string, amount: '96000', stage: 'qualified', close_date: '2026-11-01' })

  await db.insert(activityTable).values([
    { ...org, subject: 'Call Jordan about renewal terms', activity_type: 'call', due_date: '2026-07-08', completed: false, contact_id: contacts[0].id as string, deal_id: pavingDeal.id as string },
    { ...org, subject: 'Chamber quarterly sync', activity_type: 'meeting', due_date: '2026-07-15', completed: false, contact_id: contacts[1].id as string },
    { ...org, subject: 'Send signage proposal draft', activity_type: 'task', due_date: '2026-07-10', completed: false },
    { ...org, subject: 'Logged: site visit to paving depot', activity_type: 'note', completed: true, contact_id: contacts[0].id as string, notes: 'Equipment inventory looks sufficient for FY27 scope.' },
  ])

  await sql.end()
  console.log('• seeded 2 orgs, 3 users, 3 accounts, 4 contacts, 3 leads, 3 deals, 4 activities')
  console.log('  sign in: admin@govcrm.test / govcrm-demo')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
