import { ContentListScreen } from '@govcore/content/screens'
import { auth } from '@/lib/auth'
import { contact } from '@/content/contact'
import { contactActions } from '@/content/actions'
import { contactRefs, toQuery } from '@/content/ui'

export const dynamic = 'force-dynamic'

// Capability: cdm-contact-management
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
  const canEdit = session?.user?.role === 'admin' || session?.user?.role === 'contributor'

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
        searchable
        query={toQuery(sp)}
      />
    </div>
  )
}
