import { desc } from 'drizzle-orm'
import { platformDb } from '@/db/client'
import { auditLog, organizations, users } from '@/db/schema'
import { Badge, DataTable, PageHeader } from '@govcore/nextkit'

export const dynamic = 'force-dynamic'

// Capability: po-instance-administration + pa-audit-logging (operator view).
// Latest 50 events with actor and org resolved to names. Pagination is a known
// gap (nextkit DataTable has none) — flagged upstream.
export default async function AuditPage() {
  const [events, allUsers, orgs] = await Promise.all([
    platformDb.select().from(auditLog).orderBy(desc(auditLog.createdAt)).limit(50),
    platformDb.select().from(users),
    platformDb.select().from(organizations),
  ])
  const userNames = new Map(allUsers.map((u) => [u.id, u.email]))
  const orgNames = new Map(orgs.map((o) => [o.id, o.name]))

  return (
    <>
      <PageHeader title="Audit log" description="Latest 50 platform and content events, newest first. Append-only — nothing here can be edited, including by you." />
      <DataTable
        empty="No audit events yet."
        rows={events as unknown as Record<string, unknown>[]}
        columns={[
          { key: 'action', header: 'Action', cell: (r) => <Badge tone="muted">{String(r.action)}</Badge> },
          { key: 'entityType', header: 'Entity' },
          {
            key: 'userId',
            header: 'Actor',
            cell: (r) => String(r.userId ? (userNames.get(String(r.userId)) ?? String(r.userId).slice(0, 8)) : '—'),
          },
          {
            key: 'organizationId',
            header: 'Organization',
            cell: (r) => String(r.organizationId ? (orgNames.get(String(r.organizationId)) ?? '—') : '—'),
          },
          {
            key: 'createdAt',
            header: 'When',
            cell: (r) => new Date(r.createdAt as string).toLocaleString(),
          },
        ]}
      />
    </>
  )
}
