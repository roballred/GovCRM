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
    <div className="max-w-3xl">
      <a href="/leads" className="text-sm text-primary hover:underline">
        ← Leads
      </a>
      <div className="mt-4">
        <ContentDetailScreen
          def={lead}
          row={row as Record<string, unknown>}
          actions={
            <a href={`/leads/${id}/edit`} className="rounded-md border border-border px-3 py-1.5 text-sm">
              Edit
            </a>
          }
        />
      </div>
    </div>
  )
}
