import { revalidatePath } from 'next/cache'
import { ContentListScreen } from '@govcore/content/screens'
import { activity } from '@/content/activity'
import { activityActions, contactActions, dealActions } from '@/content/actions'
import { Select, SubmitButton, TextArea, TextInput } from '@/components/fields'
import { bool, req, str } from '@/lib/forms'

export const dynamic = 'force-dynamic'

// Capabilities: sfa-task-activity-management, cdm-activity-timeline
async function createActivity(formData: FormData) {
  'use server'
  await activityActions.create({
    subject: req(formData, 'subject'),
    activity_type: str(formData, 'activity_type') ?? 'task',
    due_date: str(formData, 'due_date'),
    completed: bool(formData, 'completed'),
    contact_id: str(formData, 'contact_id'),
    deal_id: str(formData, 'deal_id'),
    notes: str(formData, 'notes'),
  })
  revalidatePath('/activities')
}

export default async function ActivitiesPage() {
  const [rows, contacts, deals] = await Promise.all([
    activityActions.list(),
    contactActions.list(),
    dealActions.list(),
  ])

  const contactOptions = (contacts as Record<string, unknown>[]).map((c) => ({
    value: String(c.id),
    label: String(c.full_name ?? `${c.first_name} ${c.last_name}`),
  }))
  const dealOptions = (deals as Record<string, unknown>[]).map((d) => ({
    value: String(d.id),
    label: String(d.name),
  }))

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <ContentListScreen
        def={activity}
        rows={rows as Record<string, unknown>[]}
        basePath="/activities"
        title="Activities"
        description="Calls, meetings, tasks, and notes — planned and logged."
      />

      <section className="mt-10 max-w-xl">
        <h2 className="mb-3 text-lg font-semibold">New activity</h2>
        <form action={createActivity} className="space-y-4">
          <TextInput name="subject" label="Subject" required />
          <Select
            name="activity_type"
            label="Type"
            options={[
              { value: 'call', label: 'Call' },
              { value: 'meeting', label: 'Meeting' },
              { value: 'task', label: 'Task' },
              { value: 'note', label: 'Note' },
            ]}
            placeholder="Task"
          />
          <TextInput name="due_date" label="Due" type="date" />
          <Select name="contact_id" label="Contact" options={contactOptions} placeholder="No contact" />
          <Select name="deal_id" label="Deal" options={dealOptions} placeholder="No deal" />
          <TextArea name="notes" label="Notes" />
          <SubmitButton>Create activity</SubmitButton>
        </form>
      </section>
    </main>
  )
}
