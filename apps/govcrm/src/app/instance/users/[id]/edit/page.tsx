import { notFound } from 'next/navigation'
import { eq } from 'drizzle-orm'
import { platformDb } from '@/db/client'
import { organizations, users } from '@/db/schema'
import { Badge, PageHeader } from '@govcore/nextkit'
import { Checkbox, ErrorNotice, Select, SubmitButton } from '@/components/form-controls'
import { updateUser } from '@/lib/platform'

export const dynamic = 'force-dynamic'

const ERRORS = {
  'not-found': 'That user no longer exists.',
  'own-instance-admin': 'You cannot remove your own instance-admin role (lockout protection).',
  'last-admin': 'This is the last active admin of their organization — promote another admin first.',
}

const ROLE_OPTIONS = [
  { value: 'admin', label: 'Admin' },
  { value: 'contributor', label: 'Contributor' },
  { value: 'viewer', label: 'Viewer' },
]

// Capability: po-instance-administration
export default async function EditUserPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ error?: string }>
}) {
  const [{ id }, { error }] = await Promise.all([params, searchParams])
  const [user] = await platformDb.select().from(users).where(eq(users.id, id))
  if (!user) notFound()
  const [org] = user.organizationId
    ? await platformDb.select().from(organizations).where(eq(organizations.id, user.organizationId))
    : []

  return (
    <div className="max-w-xl">
      <a href="/instance/users" className="text-sm text-primary hover:underline">
        ← Users
      </a>
      <div className="mt-4">
        <PageHeader title={`Edit ${user.email}`} />
      </div>
      <ErrorNotice code={error} messages={ERRORS} />
      <p className="mb-4 text-sm text-muted-foreground">
        Organization: <Badge tone="muted">{org?.name ?? '—'}</Badge>
      </p>
      <form action={updateUser} className="space-y-4">
        <input type="hidden" name="id" value={user.id} />
        <Select name="role" label="Role" options={ROLE_OPTIONS} defaultValue={user.role ?? 'viewer'} />
        <Checkbox name="is_active" label="Active (inactive users cannot sign in)" defaultChecked={user.isActive} />
        <Checkbox
          name="instance_admin"
          label="Instance admin (platform operations across all orgs)"
          defaultChecked={user.instanceRole === 'instance_admin'}
        />
        <SubmitButton>Save</SubmitButton>
      </form>
    </div>
  )
}
