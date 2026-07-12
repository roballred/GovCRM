import { revalidatePath } from 'next/cache'
import { ContentListScreen } from '@govcore/content/screens'
import { auth } from '@/lib/auth'
import { contact } from '@/content/contact'
import { contactActions } from '@/content/actions'
import { contactRefs, toQuery } from '@/content/ui'

export const dynamic = 'force-dynamic'

// Capability: cdm-contact-management
async function deleteContact(formData: FormData) {
  'use server'
  await contactActions.remove({ id: String(formData.get('id')) })
  revalidatePath('/contacts')
}

export default async function ContactsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const [rows, references, session, sp] = await Promise.all([
    contactActions.list(),
    contactRefs(),
    auth(),
    searchParams,
  ])
  const role = session?.user?.role
  const canEdit = role === 'admin' || role === 'contributor'

  return (
    <div className="max-w-4xl">
      <ContentListScreen
        def={contact}
        rows={rows as Record<string, unknown>[]}
        basePath="/contacts"
        references={references}
        title="Contacts"
        description="People this office works with."
        newHref="/contacts/new"
        canEdit={canEdit}
        canDelete={role === 'admin'}
        deleteAction={deleteContact}
        columns={['first_name', 'last_name', 'email', 'title', 'account']}
        searchable
        query={toQuery(sp)}
      />
    </div>
  )
}
