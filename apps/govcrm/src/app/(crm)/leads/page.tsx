import { revalidatePath } from 'next/cache'
import { ContentListScreen } from '@govcore/content/screens'
import { lead } from '@/content/lead'
import { leadActions } from '@/content/actions'
import { Select, SubmitButton, TextArea, TextInput } from '@/components/fields'
import { req, str } from '@/lib/forms'

export const dynamic = 'force-dynamic'

// Capability: sfa-lead-management
async function createLead(formData: FormData) {
  'use server'
  await leadActions.create({
    first_name: req(formData, 'first_name'),
    last_name: req(formData, 'last_name'),
    email: str(formData, 'email'),
    phone: str(formData, 'phone'),
    organization_name: str(formData, 'organization_name'),
    source: str(formData, 'source'),
    lead_status: str(formData, 'lead_status') ?? 'new',
    notes: str(formData, 'notes'),
  })
  revalidatePath('/leads')
}

export default async function LeadsPage() {
  const rows = await leadActions.list()

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <ContentListScreen
        def={lead}
        rows={rows as Record<string, unknown>[]}
        basePath="/leads"
        title="Leads"
        description="Unqualified prospects — qualify them, then convert to contacts and deals."
      />

      <section className="mt-10 max-w-xl">
        <h2 className="mb-3 text-lg font-semibold">New lead</h2>
        <form action={createLead} className="space-y-4">
          <TextInput name="first_name" label="First name" required />
          <TextInput name="last_name" label="Last name" required />
          <TextInput name="email" label="Email" type="email" />
          <TextInput name="phone" label="Phone" />
          <TextInput name="organization_name" label="Organization" />
          <Select
            name="source"
            label="Source"
            options={[
              { value: 'web-form', label: 'Web form' },
              { value: 'referral', label: 'Referral' },
              { value: 'event', label: 'Event' },
              { value: 'other', label: 'Other' },
            ]}
          />
          <Select
            name="lead_status"
            label="Lead status"
            options={[
              { value: 'new', label: 'New' },
              { value: 'contacted', label: 'Contacted' },
              { value: 'qualified', label: 'Qualified' },
              { value: 'disqualified', label: 'Disqualified' },
            ]}
            placeholder="New"
          />
          <TextArea name="notes" label="Notes" />
          <SubmitButton>Create lead</SubmitButton>
        </form>
      </section>
    </main>
  )
}
