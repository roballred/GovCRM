import { notFound } from 'next/navigation'
import { ContentDetailScreen } from '@govcore/content/screens'
import { contact } from '@/content/contact'
import { contactActions } from '@/content/actions'
import { contactRefs } from '@/content/ui'

export const dynamic = 'force-dynamic'

export default async function ContactDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [row, references] = await Promise.all([contactActions.get({ id }), contactRefs()])
  if (!row) notFound()

  return (
    <div className="max-w-3xl">
      <a href="/contacts" className="text-sm text-primary hover:underline">
        ← Contacts
      </a>
      <div className="mt-4">
        <ContentDetailScreen
          def={contact}
          row={row as Record<string, unknown>}
          references={references}
          actions={
            <a href={`/contacts/${id}/edit`} className="rounded-md border border-border px-3 py-1.5 text-sm">
              Edit
            </a>
          }
        />
      </div>
    </div>
  )
}
