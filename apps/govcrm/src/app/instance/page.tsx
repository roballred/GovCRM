import { desc } from 'drizzle-orm'
import { platformDb } from '@/db/client'
import { auditLog, organizations, userOrganizationMemberships, users } from '@/db/schema'
import { Badge, DataTable, PageHeader, StatCard, StatGrid } from '@govcore/nextkit'

export const dynamic = 'force-dynamic'

// Capability: po-instance-administration — operator overview. Entity list and
// edit views live on their own routes (organizations/users/audit/support).
// Reads the privileged platformDb pool; gated in middleware AND ./layout.tsx.
export default async function InstancePage() {
  const [orgs, allUsers, memberships, audits] = await Promise.all([
    platformDb.select().from(organizations),
    platformDb.select().from(users),
    platformDb.select().from(userOrganizationMemberships),
    platformDb.select().from(auditLog).orderBy(desc(auditLog.createdAt)).limit(8),
  ])

  return (
    <>
      <PageHeader title="Overview" description="Cross-organization view for instance administrators." />

      <StatGrid>
        <StatCard label="Organizations" value={<a className="hover:underline" href="/instance/organizations">{orgs.length}</a>} />
        <StatCard label="Users" value={<a className="hover:underline" href="/instance/users">{allUsers.length}</a>} />
        <StatCard label="Memberships" value={memberships.length} />
        <StatCard label="Active users" value={allUsers.filter((u) => u.isActive).length} />
      </StatGrid>

      <section className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent audit events</h2>
          <a href="/instance/audit" className="text-sm text-primary hover:underline">
            View all →
          </a>
        </div>
        <DataTable
          empty="No audit events yet."
          rows={audits as unknown as Record<string, unknown>[]}
          columns={[
            { key: 'action', header: 'Action', cell: (r) => <Badge tone="muted">{String(r.action)}</Badge> },
            { key: 'entityType', header: 'Entity' },
            {
              key: 'createdAt',
              header: 'When',
              cell: (r) => new Date(r.createdAt as string).toLocaleString(),
            },
          ]}
        />
      </section>
    </>
  )
}
