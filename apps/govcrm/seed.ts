// Seed a throwaway demo database: create it, run the GovCore platform
// migrations, compile the `contact` content type, and insert demo orgs, users,
// memberships, audit events, and contacts.
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
import { contact, contactTable } from './src/content/contact'

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

  // 2. platform migrations, then the `contact` content type's table (folds into
  // the app migration stream once GovCRM has one).
  await migrate({ connectionString: url, log: (m) => console.log(`  ${m}`) })
  const ddl = postgres(url!, { max: 1, onnotice: () => {} })
  await ddl.unsafe(compileContentType(contact).sql)
  await ddl.end()
  console.log('• created content type "contact"')

  // 3. seed
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
    })
    .returning()
  const [viewer1] = await db
    .insert(users)
    .values({
      organizationId: orgB.id,
      email: 'val@harris.example',
      name: 'Val Viewer',
      role: 'viewer',
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

  // Seed contacts for orgA. The contact table FORCEs RLS — set the active-org
  // GUC first (the same scope tenantAction sets at request time).
  await sql.unsafe(`SELECT set_config('app.current_org', '${orgA.id}', false)`)
  const contactRows = [
    {
      organizationId: orgA.id,
      first_name: 'Jordan',
      last_name: 'Ramirez',
      email: 'jordan.ramirez@vendor.example',
      phone: '555-0142',
      organization_name: 'Ramirez Paving LLC',
      notes: 'Road-maintenance vendor; renewal conversation due in Q3.',
    },
    {
      organizationId: orgA.id,
      first_name: 'Priya',
      last_name: 'Natarajan',
      email: 'priya.n@riverbendchamber.example',
      phone: '555-0177',
      organization_name: 'Riverbend Chamber of Commerce',
      notes: 'Main liaison for the downtown small-business program.',
    },
  ]
  for (const r of contactRows) {
    await db.insert(contactTable).values({ ...r, ...materializedValues(contact, r) })
  }

  await sql.end()
  console.log('• seeded 2 orgs, 3 users, 3 memberships, 3 audit events, 2 contacts')
  console.log('  sign in: admin@govcrm.test / govcrm-demo')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
