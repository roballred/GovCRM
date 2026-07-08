import { revalidatePath } from 'next/cache'
import { ContentForm, ContentListScreen, parseContentForm } from '@govcore/content/screens'
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
}

export default async function DealsPage() {
  const [rows, references] = await Promise.all([dealActions.list(), dealRefs()])

  return (
    <div className="max-w-4xl">
      <ContentListScreen
        def={deal}
        rows={rows as Record<string, unknown>[]}
        basePath="/deals"
        references={references}
        title="Deals"
        description="Tracked opportunities — procurements, grants, renewals — with stage and value."
      />

      <section className="mt-10">
        <h2 className="mb-3 text-lg font-semibold">New deal</h2>
        <ContentForm def={deal} action={createDeal} references={references} choices={dealChoices} />
      </section>
    </div>
  )
}
