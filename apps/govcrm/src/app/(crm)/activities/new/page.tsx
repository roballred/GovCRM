import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { ContentForm, parseContentForm } from '@govcore/content/screens'
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
  redirect('/activities')
}

export default async function NewActivityPage() {
  const references = await activityRefs()
  return (
    <div className="max-w-3xl">
      <a href="/activities" className="text-sm text-primary hover:underline">
        ← Activities
      </a>
      <h1 className="mb-6 mt-4 text-2xl font-semibold tracking-tight">New activity</h1>
      <ContentForm def={activity} action={createActivity} references={references} choices={activityChoices} />
    </div>
  )
}
