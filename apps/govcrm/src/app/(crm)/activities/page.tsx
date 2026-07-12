import { ContentListScreen } from '@govcore/content/screens'
import { auth } from '@/lib/auth'
import { activity } from '@/content/activity'
import { activityActions } from '@/content/actions'
import { activityChoices, activityRefs, toQuery } from '@/content/ui'

export const dynamic = 'force-dynamic'

// Capabilities: sfa-task-activity-management, cdm-activity-timeline
export default async function ActivitiesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const [rows, references, session, sp] = await Promise.all([
    activityActions.list(),
    activityRefs(),
    auth(),
    searchParams,
  ])
  const canEdit = session?.user?.role === 'admin' || session?.user?.role === 'contributor'

  return (
    <div className="max-w-4xl">
      <ContentListScreen
        def={activity}
        rows={rows as Record<string, unknown>[]}
        basePath="/activities"
        references={references}
        title="Activities"
        description="Calls, meetings, tasks, and notes — planned and logged."
        newHref="/activities/new"
        canEdit={canEdit}
        searchable
        filters={[{ field: 'activity_type', label: 'Type', options: activityChoices.activity_type }]}
        query={toQuery(sp)}
      />
    </div>
  )
}
