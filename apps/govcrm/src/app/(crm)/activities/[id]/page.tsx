import { notFound } from 'next/navigation'
import { ContentDetailScreen } from '@govcore/content/screens'
import { activity } from '@/content/activity'
import { activityActions } from '@/content/actions'

export const dynamic = 'force-dynamic'

export default async function ActivityDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const row = await activityActions.get({ id })
  if (!row) notFound()

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <a href="/activities" className="text-sm text-primary hover:underline">
        ← Activities
      </a>
      <div className="mt-4">
        <ContentDetailScreen def={activity} row={row as Record<string, unknown>} />
      </div>
    </main>
  )
}
