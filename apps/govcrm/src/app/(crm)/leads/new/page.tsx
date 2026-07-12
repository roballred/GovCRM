import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { ContentForm, parseContentForm } from '@govcore/content/screens'
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
  redirect('/leads')
}

export default function NewLeadPage() {
  return (
    <div className="max-w-3xl">
      <a href="/leads" className="text-sm text-primary hover:underline">
        ← Leads
      </a>
      <h1 className="mb-6 mt-4 text-2xl font-semibold tracking-tight">New lead</h1>
      <ContentForm def={lead} action={createLead} choices={leadChoices} />
    </div>
  )
}
