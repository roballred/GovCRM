import { revalidatePath } from 'next/cache'
import { ContentForm, ContentListScreen, parseContentForm } from '@/components/content-screens'
import { lead } from '@/content/lead'
import { leadActions } from '@/content/actions'
import { leadChoices } from '@/content/ui'

export const dynamic = 'force-dynamic'

// Capability: sfa-lead-management
async function createLead(formData: FormData) {
  'use server'
  const values = parseContentForm(lead, formData)
  await leadActions.create({ ...values, lead_status: values.lead_status ?? 'new' })
  revalidatePath('/leads')
}

export default async function LeadsPage() {
  const rows = await leadActions.list()

  return (
    <div className="max-w-4xl">
      <ContentListScreen
        def={lead}
        rows={rows as Record<string, unknown>[]}
        basePath="/leads"
        title="Leads"
        description="Unqualified prospects — qualify them, then convert to contacts and deals."
      />

      <section className="mt-10">
        <h2 className="mb-3 text-lg font-semibold">New lead</h2>
        <ContentForm def={lead} action={createLead} choices={leadChoices} />
      </section>
    </div>
  )
}
