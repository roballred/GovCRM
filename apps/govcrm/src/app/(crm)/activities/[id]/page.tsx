import { notFound } from 'next/navigation'
import { ContentDetailScreen } from '@/components/content-screens'
import { activity } from '@/content/activity'
import { activityActions } from '@/content/actions'
import { activityRefs } from '@/content/ui'

export const dynamic = 'force-dynamic'

export default async function ActivityDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [row, references] = await Promise.all([activityActions.get({ id }), activityRefs()])
  if (!row) notFound()

  return (
    <div className="max-w-3xl">
      <a href="/activities" className="text-sm text-primary hover:underline">
        ← Activities
      </a>
      <div className="mt-4">
        <ContentDetailScreen
          def={activity}
          row={row as Record<string, unknown>}
          references={references}
          actions={
            <a href={`/activities/${id}/edit`} className="rounded-md border border-border px-3 py-1.5 text-sm">
              Edit
            </a>
          }
        />
      </div>
    </div>
  )
}
