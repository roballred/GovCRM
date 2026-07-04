import { desc } from 'drizzle-orm'
import { platformDb } from '@/db/client'
import { auditLog, organizations, userOrganizationMemberships, users } from '@/db/schema'
import { Badge, DataTable, PageHeader, StatCard, StatGrid } from '@govcore/nextkit'

export const dynamic = 'force-dynamic'

// Capability: po-instance-administration — cross-org operator console.
// Reads the privileged platformDb pool: this inventory is legitimately
// cross-org, which RLS on the runtime pool rightly forbids. Access is gated
// to instance_admin in middleware AND ./layout.tsx.
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
        <StatCard label="Organizations" value={orgs.length} />
        <StatCard label="Users" value={allUsers.length} />
        <StatCard label="Memberships" value={memberships.length} />
        <StatCard label="Audit events" value={audits.length} />
      </StatGrid>

      <section id="orgs" className="mt-8">
        <h2 className="mb-3 text-lg font-semibold">Organizations</h2>
        <DataTable
          rows={orgs as unknown as Record<string, unknown>[]}
          columns={[
            { key: 'name', header: 'Name' },
            { key: 'slug', header: 'Slug', cell: (r) => <Badge tone="muted">{String(r.slug)}</Badge> },
            {
              key: 'createdAt',
              header: 'Created',
              cell: (r) => new Date(r.createdAt as string).toLocaleDateString(),
            },
          ]}
        />
      </section>

      <section id="users" className="mt-8">
        <h2 className="mb-3 text-lg font-semibold">Users</h2>
        <DataTable
          rows={allUsers as unknown as Record<string, unknown>[]}
          columns={[
            { key: 'email', header: 'Email' },
            { key: 'role', header: 'Role', cell: (r) => <Badge>{String(r.role ?? '—')}</Badge> },
            {
              key: 'instanceRole',
              header: 'Instance',
              cell: (r) =>
                r.instanceRole ? <Badge tone="danger">{String(r.instanceRole)}</Badge> : '—',
            },
            { key: 'isActive', header: 'Active', cell: (r) => (r.isActive ? 'Yes' : 'No') },
          ]}
        />
      </section>

      <section id="audit" className="mt-8">
        <h2 className="mb-3 text-lg font-semibold">Recent audit events</h2>
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
