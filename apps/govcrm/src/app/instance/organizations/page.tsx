import { platformDb } from '@/db/client'
import { organizations, users } from '@/db/schema'
import { Badge, DataTable, PageHeader } from '@govcore/nextkit'
import { ErrorNotice, SubmitButton, TextInput } from '@/components/form-controls'
import { createOrganization } from '@/lib/platform'

export const dynamic = 'force-dynamic'

const ERRORS = {
  'name-required': 'A name is required.',
  'slug-taken': 'That slug is already in use.',
  failed: 'Could not create the organization.',
}

// Capability: po-instance-administration — tenant inventory + creation.
export default async function OrganizationsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams
  const [orgs, allUsers] = await Promise.all([
    platformDb.select().from(organizations),
    platformDb.select().from(users),
  ])
  const userCounts = new Map<string, number>()
  for (const u of allUsers) {
    userCounts.set(u.organizationId, (userCounts.get(u.organizationId) ?? 0) + 1)
  }

  return (
    <>
      <PageHeader title="Organizations" description="Every tenant on this instance." />
      <ErrorNotice code={error} messages={ERRORS} />

      <DataTable
        empty="No organizations yet."
        rows={orgs as unknown as Record<string, unknown>[]}
        columns={[
          {
            key: 'name',
            header: 'Name',
            cell: (r) => (
              <a className="font-medium text-primary hover:underline" href={`/instance/organizations/${String(r.id)}/edit`}>
                {String(r.name)}
              </a>
            ),
          },
          { key: 'slug', header: 'Slug', cell: (r) => <Badge tone="muted">{String(r.slug)}</Badge> },
          { key: 'users', header: 'Users', cell: (r) => String(userCounts.get(String(r.id)) ?? 0) },
          {
            key: 'createdAt',
            header: 'Created',
            cell: (r) => new Date(r.createdAt as string).toLocaleDateString(),
          },
        ]}
      />

      <section className="mt-10 max-w-xl">
        <h2 className="mb-3 text-lg font-semibold">New organization</h2>
        <form action={createOrganization} className="space-y-4">
          <TextInput name="name" label="Name" required />
          <TextInput name="slug" label="Slug (defaults from the name)" />
          <SubmitButton>Create organization</SubmitButton>
        </form>
      </section>
    </>
  )
}
