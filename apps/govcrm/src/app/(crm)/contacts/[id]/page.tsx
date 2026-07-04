import { notFound } from 'next/navigation'
import { ContentDetailScreen } from '@govcore/content/screens'
import { contact } from '@/content/contact'
import { contactActions } from '@/content/actions'

export const dynamic = 'force-dynamic'

export default async function ContactDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const row = await contactActions.get({ id }) // RLS-scoped: a foreign org's id returns null
  if (!row) notFound()

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <a href="/contacts" className="text-sm text-primary hover:underline">
        ← Contacts
      </a>
      <div className="mt-4">
        <ContentDetailScreen def={contact} row={row as Record<string, unknown>} />
      </div>
    </main>
  )
}
