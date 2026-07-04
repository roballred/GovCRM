import { notFound, redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { ContentForm, parseContentForm } from '@/components/content-screens'
import { deal } from '@/content/deal'
import { dealActions } from '@/content/actions'
import { dealChoices, dealRefs } from '@/content/ui'

export const dynamic = 'force-dynamic'

// Capability: sfa-opportunity-management
async function updateDeal(formData: FormData) {
  'use server'
  const id = String(formData.get('id'))
  await dealActions.update({ id, values: parseContentForm(deal, formData) })
  revalidatePath('/deals')
  revalidatePath('/dashboard')
  redirect(`/deals/${id}`)
}

export default async function EditDealPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [row, references] = await Promise.all([dealActions.get({ id }), dealRefs()])
  if (!row) notFound()

  return (
    <div className="max-w-3xl">
      <a href={`/deals/${id}`} className="text-sm text-primary hover:underline">
        ← Back
      </a>
      <h1 className="mb-6 mt-4 text-2xl font-semibold tracking-tight">Edit deal</h1>
      <ContentForm def={deal} row={row as Record<string, unknown>} action={updateDeal} references={references} choices={dealChoices} />
    </div>
  )
}
