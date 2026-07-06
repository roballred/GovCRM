import { notFound } from 'next/navigation'
import { eq } from 'drizzle-orm'
import { platformDb } from '@/db/client'
import { organizations } from '@/db/schema'
import { Badge, PageHeader } from '@govcore/nextkit'
import { ErrorNotice, SubmitButton, TextInput } from '@/components/form-controls'
import { updateOrganization } from '@/lib/platform'

export const dynamic = 'force-dynamic'

const ERRORS = {
  'name-required': 'A name is required.',
  'not-found': 'That organization no longer exists.',
}

// Capability: po-instance-administration
export default async function EditOrganizationPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ error?: string }>
}) {
  const [{ id }, { error }] = await Promise.all([params, searchParams])
  const [org] = await platformDb.select().from(organizations).where(eq(organizations.id, id))
  if (!org) notFound()

  return (
    <div className="max-w-xl">
      <a href="/instance/organizations" className="text-sm text-primary hover:underline">
        ← Organizations
      </a>
      <div className="mt-4">
        <PageHeader title={`Edit ${org.name}`} />
      </div>
      <ErrorNotice code={error} messages={ERRORS} />
      <p className="mb-4 text-sm text-muted-foreground">
        Slug: <Badge tone="muted">{org.slug}</Badge> (immutable — it identifies the tenant)
      </p>
      <form action={updateOrganization} className="space-y-4">
        <input type="hidden" name="id" value={org.id} />
        <TextInput name="name" label="Name" required defaultValue={org.name} />
        <SubmitButton>Save</SubmitButton>
      </form>
    </div>
  )
}
