import { notFound } from 'next/navigation'
import { ContentDetailScreen } from '@/components/content-screens'
import { deal } from '@/content/deal'
import { dealActions } from '@/content/actions'
import { dealRefs } from '@/content/ui'

export const dynamic = 'force-dynamic'

export default async function DealDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [row, references] = await Promise.all([dealActions.get({ id }), dealRefs()])
  if (!row) notFound()

  return (
    <div className="max-w-3xl">
      <a href="/deals" className="text-sm text-primary hover:underline">
        ← Deals
      </a>
      <div className="mt-4">
        <ContentDetailScreen
          def={deal}
          row={row as Record<string, unknown>}
          references={references}
          actions={
            <a href={`/deals/${id}/edit`} className="rounded-md border border-border px-3 py-1.5 text-sm">
              Edit
            </a>
          }
        />
      </div>
    </div>
  )
}
