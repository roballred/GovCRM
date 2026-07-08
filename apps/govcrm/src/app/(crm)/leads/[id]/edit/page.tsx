import { notFound, redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { ContentForm, parseContentForm } from '@govcore/content/screens'
import { lead } from '@/content/lead'
import { leadActions } from '@/content/actions'
import { leadChoices } from '@/content/ui'

export const dynamic = 'force-dynamic'

// Capability: sfa-lead-management
async function updateLead(formData: FormData) {
  'use server'
  const id = String(formData.get('id'))
  await leadActions.update({ id, values: parseContentForm(lead, formData) })
  revalidatePath('/leads')
  redirect(`/leads/${id}`)
}

export default async function EditLeadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const row = await leadActions.get({ id })
  if (!row) notFound()

  return (
    <div className="max-w-3xl">
      <a href={`/leads/${id}`} className="text-sm text-primary hover:underline">
        ← Back
      </a>
      <h1 className="mb-6 mt-4 text-2xl font-semibold tracking-tight">Edit lead</h1>
      <ContentForm def={lead} row={row as Record<string, unknown>} action={updateLead} choices={leadChoices} />
    </div>
  )
}
