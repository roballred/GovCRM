import { notFound, redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { ContentForm, parseContentForm } from '@/components/content-screens'
import { activity } from '@/content/activity'
import { activityActions } from '@/content/actions'
import { activityChoices, activityRefs } from '@/content/ui'

export const dynamic = 'force-dynamic'

// Capability: sfa-task-activity-management
async function updateActivity(formData: FormData) {
  'use server'
  const id = String(formData.get('id'))
  await activityActions.update({ id, values: parseContentForm(activity, formData) })
  revalidatePath('/activities')
  revalidatePath('/dashboard')
  redirect(`/activities/${id}`)
}

export default async function EditActivityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [row, references] = await Promise.all([activityActions.get({ id }), activityRefs()])
  if (!row) notFound()

  return (
    <div className="max-w-3xl">
      <a href={`/activities/${id}`} className="text-sm text-primary hover:underline">
        ← Back
      </a>
      <h1 className="mb-6 mt-4 text-2xl font-semibold tracking-tight">Edit activity</h1>
      <ContentForm def={activity} row={row as Record<string, unknown>} action={updateActivity} references={references} choices={activityChoices} />
    </div>
  )
}
