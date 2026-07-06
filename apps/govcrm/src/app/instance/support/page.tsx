import { desc } from 'drizzle-orm'
import { platformDb } from '@/db/client'
import { actAsSessions, breakGlassSessions, organizations, users } from '@/db/schema'
import { Badge, DataTable, PageHeader } from '@govcore/nextkit'

export const dynamic = 'force-dynamic'

// Capability: po-support-access — visibility first: every break-glass and
// act-as session is listed here (read-only). Starting sessions from the
// console is not wired yet; @govcore/support ships the lifecycle.
export default async function SupportSessionsPage() {
  const [breakGlass, actAs, allUsers, orgs] = await Promise.all([
    platformDb.select().from(breakGlassSessions).orderBy(desc(breakGlassSessions.grantedAt)).limit(25),
    platformDb.select().from(actAsSessions).orderBy(desc(actAsSessions.startedAt)).limit(25),
    platformDb.select().from(users),
    platformDb.select().from(organizations),
  ])
  const userNames = new Map(allUsers.map((u) => [u.id, u.email]))
  const orgNames = new Map(orgs.map((o) => [o.id, o.name]))
  const now = Date.now()

  return (
    <>
      <PageHeader
        title="Support sessions"
        description="Break-glass and act-as access into tenant data — exceptional, time-boxed, and fully audited. Starting sessions from the console is not wired yet."
      />

      <section>
        <h2 className="mb-3 text-lg font-semibold">Break-glass sessions</h2>
        <DataTable
          empty="None — no operator has accessed tenant data. That is the healthy state."
          rows={breakGlass as unknown as Record<string, unknown>[]}
          columns={[
            { key: 'instanceAdminId', header: 'Operator', cell: (r) => String(userNames.get(String(r.instanceAdminId)) ?? '—') },
            { key: 'targetOrgId', header: 'Tenant', cell: (r) => String(orgNames.get(String(r.targetOrgId)) ?? '—') },
            { key: 'reason', header: 'Reason' },
            {
              key: 'grantedAt',
              header: 'Granted',
              cell: (r) => new Date(r.grantedAt as string).toLocaleString(),
            },
            {
              key: 'expiresAt',
              header: 'Status',
              cell: (r) =>
                r.revokedAt ? (
                  <Badge tone="muted">revoked</Badge>
                ) : new Date(r.expiresAt as string).getTime() < now ? (
                  <Badge tone="muted">expired</Badge>
                ) : (
                  <Badge tone="danger">active</Badge>
                ),
            },
          ]}
        />
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-lg font-semibold">Act-as sessions</h2>
        <DataTable
          empty="None."
          rows={actAs as unknown as Record<string, unknown>[]}
          columns={[
            { key: 'instanceAdminId', header: 'Operator', cell: (r) => String(userNames.get(String(r.instanceAdminId)) ?? '—') },
            { key: 'targetOrgId', header: 'Tenant', cell: (r) => String(orgNames.get(String(r.targetOrgId)) ?? '—') },
            {
              key: 'startedAt',
              header: 'Started',
              cell: (r) => new Date(r.startedAt as string).toLocaleString(),
            },
            {
              key: 'endedAt',
              header: 'Status',
              cell: (r) =>
                r.endedAt ? (
                  <Badge tone="muted">{String(r.endReason ?? 'ended')}</Badge>
                ) : new Date(r.expiresAt as string).getTime() < now ? (
                  <Badge tone="muted">expired</Badge>
                ) : (
                  <Badge tone="danger">active</Badge>
                ),
            },
          ]}
        />
      </section>
    </>
  )
}
