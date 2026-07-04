import { notFound } from 'next/navigation'
import { ContentDetailScreen } from '@govcore/content/screens'
import { deal } from '@/content/deal'
import { dealActions } from '@/content/actions'

export const dynamic = 'force-dynamic'

export default async function DealDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const row = await dealActions.get({ id })
  if (!row) notFound()

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <a href="/deals" className="text-sm text-primary hover:underline">
        ← Deals
      </a>
      <div className="mt-4">
        <ContentDetailScreen def={deal} row={row as Record<string, unknown>} />
      </div>
    </main>
  )
}
