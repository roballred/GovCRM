import { notFound, redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { contact } from '@/content/contact'
import { contactActions } from '@/content/contact-actions'
import { ContentDetailScreen } from '@govcore/content/screens'

export const dynamic = 'force-dynamic'

export default async function ContactDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) redirect('/login')

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
