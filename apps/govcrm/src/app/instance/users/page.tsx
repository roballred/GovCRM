import { platformDb } from '@/db/client'
import { organizations, users } from '@/db/schema'
import { Badge, DataTable, PageHeader } from '@govcore/nextkit'
import { Checkbox, ErrorNotice, Select, SubmitButton, TextInput } from '@/components/form-controls'
import { createUser } from '@/lib/platform'

export const dynamic = 'force-dynamic'

const ERRORS = {
  'missing-fields': 'Email and organization are required.',
  'password-too-short': 'The initial password needs at least 8 characters.',
  'email-taken': 'A user with that email already exists.',
  failed: 'Could not create the user.',
}

const ROLE_OPTIONS = [
  { value: 'admin', label: 'Admin' },
  { value: 'contributor', label: 'Contributor' },
  { value: 'viewer', label: 'Viewer' },
]

// Capability: po-instance-administration — cross-org user inventory + creation.
export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams
  const [allUsers, orgs] = await Promise.all([
    platformDb.select().from(users),
    platformDb.select().from(organizations),
  ])
  const orgNames = new Map(orgs.map((o) => [o.id, o.name]))
  const orgOptions = orgs.map((o) => ({ value: o.id, label: o.name }))

  return (
    <>
      <PageHeader title="Users" description="Every account on this instance, across all organizations." />
      <ErrorNotice code={error} messages={ERRORS} />

      <DataTable
        empty="No users yet."
        rows={allUsers as unknown as Record<string, unknown>[]}
        columns={[
          {
            key: 'email',
            header: 'Email',
            cell: (r) => (
              <a className="font-medium text-primary hover:underline" href={`/instance/users/${String(r.id)}/edit`}>
                {String(r.email)}
              </a>
            ),
          },
          { key: 'name', header: 'Name', cell: (r) => String(r.name ?? '—') },
          { key: 'organizationId', header: 'Organization', cell: (r) => String(orgNames.get(String(r.organizationId)) ?? '—') },
          { key: 'role', header: 'Role', cell: (r) => <Badge>{String(r.role ?? '—')}</Badge> },
          {
            key: 'instanceRole',
            header: 'Instance',
            cell: (r) => (r.instanceRole ? <Badge tone="danger">{String(r.instanceRole)}</Badge> : '—'),
          },
          { key: 'isActive', header: 'Active', cell: (r) => (r.isActive ? 'Yes' : 'No') },
        ]}
      />

      <section className="mt-10 max-w-xl">
        <h2 className="mb-3 text-lg font-semibold">New user</h2>
        <form action={createUser} className="space-y-4">
          <TextInput name="email" label="Email" type="email" required />
          <TextInput name="name" label="Name" />
          <Select name="organization_id" label="Organization" options={orgOptions} placeholder="Choose…" />
          <Select name="role" label="Role" options={ROLE_OPTIONS} defaultValue="viewer" />
          <TextInput name="password" label="Initial password (min 8 chars)" type="password" required />
          <Checkbox name="instance_admin" label="Grant instance admin (platform operations across all orgs)" />
          <SubmitButton>Create user</SubmitButton>
        </form>
      </section>
    </>
  )
}
