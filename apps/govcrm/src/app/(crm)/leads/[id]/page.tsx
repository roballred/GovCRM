import { notFound } from 'next/navigation'
import { ContentDetailScreen } from '@govcore/content/screens'
import { lead } from '@/content/lead'
import { leadActions } from '@/content/actions'

export const dynamic = 'force-dynamic'

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const row = await leadActions.get({ id })
  if (!row) notFound()

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <a href="/leads" className="text-sm text-primary hover:underline">
        ← Leads
      </a>
      <div className="mt-4">
        <ContentDetailScreen def={lead} row={row as Record<string, unknown>} />
      </div>
    </main>
  )
}
