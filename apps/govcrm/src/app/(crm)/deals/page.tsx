import { revalidatePath } from 'next/cache'
import { ContentListScreen } from '@govcore/content/screens'
import { deal } from '@/content/deal'
import { accountActions, contactActions, dealActions } from '@/content/actions'
import { Select, SubmitButton, TextArea, TextInput } from '@/components/fields'
import { req, str } from '@/lib/forms'

export const dynamic = 'force-dynamic'

// Capability: sfa-opportunity-management
async function createDeal(formData: FormData) {
  'use server'
  await dealActions.create({
    name: req(formData, 'name'),
    account_id: str(formData, 'account_id'),
    primary_contact_id: str(formData, 'primary_contact_id'),
    amount: str(formData, 'amount'),
    stage: str(formData, 'stage') ?? 'prospecting',
    close_date: str(formData, 'close_date'),
    notes: str(formData, 'notes'),
  })
  revalidatePath('/deals')
}

export default async function DealsPage() {
  const [rows, accounts, contacts] = await Promise.all([
    dealActions.list(),
    accountActions.list(),
    contactActions.list(),
  ])

  const accountOptions = (accounts as Record<string, unknown>[]).map((a) => ({
    value: String(a.id),
    label: String(a.name),
  }))
  const contactOptions = (contacts as Record<string, unknown>[]).map((c) => ({
    value: String(c.id),
    label: String(c.full_name ?? `${c.first_name} ${c.last_name}`),
  }))

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <ContentListScreen
        def={deal}
        rows={rows as Record<string, unknown>[]}
        basePath="/deals"
        title="Deals"
        description="Tracked opportunities — procurements, grants, renewals — with stage and value."
      />

      <section className="mt-10 max-w-xl">
        <h2 className="mb-3 text-lg font-semibold">New deal</h2>
        <form action={createDeal} className="space-y-4">
          <TextInput name="name" label="Name" required />
          <Select name="account_id" label="Account" options={accountOptions} placeholder="No account" />
          <Select
            name="primary_contact_id"
            label="Primary contact"
            options={contactOptions}
            placeholder="No contact"
          />
          <TextInput name="amount" label="Amount (USD)" type="number" />
          <Select
            name="stage"
            label="Stage"
            options={[
              { value: 'prospecting', label: 'Prospecting' },
              { value: 'qualified', label: 'Qualified' },
              { value: 'proposal', label: 'Proposal' },
              { value: 'negotiation', label: 'Negotiation' },
              { value: 'won', label: 'Won' },
              { value: 'lost', label: 'Lost' },
            ]}
            placeholder="Prospecting"
          />
          <TextInput name="close_date" label="Expected close" type="date" />
          <TextArea name="notes" label="Notes" />
          <SubmitButton>Create deal</SubmitButton>
        </form>
      </section>
    </main>
  )
}
