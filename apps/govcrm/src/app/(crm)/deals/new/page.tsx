import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { ContentForm, parseContentForm } from '@govcore/content/screens'
import { deal } from '@/content/deal'
import { dealActions } from '@/content/actions'
import { dealChoices, dealRefs } from '@/content/ui'

export const dynamic = 'force-dynamic'

// Capability: sfa-opportunity-management
async function createDeal(formData: FormData) {
  'use server'
  const values = parseContentForm(deal, formData)
  await dealActions.create({ ...values, stage: values.stage ?? 'prospecting' })
  revalidatePath('/deals')
  redirect('/deals')
}

export default async function NewDealPage() {
  const references = await dealRefs()
  return (
    <div className="max-w-3xl">
      <a href="/deals" className="text-sm text-primary hover:underline">
        ← Deals
      </a>
      <h1 className="mb-6 mt-4 text-2xl font-semibold tracking-tight">New deal</h1>
      <ContentForm def={deal} action={createDeal} references={references} choices={dealChoices} />
    </div>
  )
}
