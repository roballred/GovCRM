import { revalidatePath } from 'next/cache'
import { ContentListScreen } from '@govcore/content/screens'
import { auth } from '@/lib/auth'
import { activity } from '@/content/activity'
import { activityActions } from '@/content/actions'
import { activityChoices, activityRefs, toQuery } from '@/content/ui'

export const dynamic = 'force-dynamic'

// Capabilities: sfa-task-activity-management, cdm-activity-timeline
async function deleteActivity(formData: FormData) {
  'use server'
  await activityActions.remove({ id: String(formData.get('id')) })
  revalidatePath('/activities')
}

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
  const role = session?.user?.role
  const canEdit = role === 'admin' || role === 'contributor'

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
        canDelete={role === 'admin'}
        deleteAction={deleteActivity}
        columns={['subject', 'activity_type', 'due_date', 'completed']}
        searchable
        filters={[{ field: 'activity_type', label: 'Type', options: activityChoices.activity_type }]}
        query={toQuery(sp)}
      />
    </div>
  )
}
