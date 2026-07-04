import { revalidatePath } from 'next/cache'
import { ContentForm, ContentListScreen, parseContentForm } from '@/components/content-screens'
import { activity } from '@/content/activity'
import { activityActions } from '@/content/actions'
import { activityChoices, activityRefs } from '@/content/ui'

export const dynamic = 'force-dynamic'

// Capabilities: sfa-task-activity-management, cdm-activity-timeline
async function createActivity(formData: FormData) {
  'use server'
  const values = parseContentForm(activity, formData)
  await activityActions.create({ ...values, activity_type: values.activity_type ?? 'task' })
  revalidatePath('/activities')
}

export default async function ActivitiesPage() {
  const [rows, references] = await Promise.all([activityActions.list(), activityRefs()])

  return (
    <div className="max-w-4xl">
      <ContentListScreen
        def={activity}
        rows={rows as Record<string, unknown>[]}
        basePath="/activities"
        references={references}
        title="Activities"
        description="Calls, meetings, tasks, and notes — planned and logged."
      />

      <section className="mt-10">
        <h2 className="mb-3 text-lg font-semibold">New activity</h2>
        <ContentForm def={activity} action={createActivity} references={references} choices={activityChoices} />
      </section>
    </div>
  )
}
