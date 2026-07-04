import { revalidatePath } from 'next/cache'
import { ContentListScreen } from '@govcore/content/screens'
import { account } from '@/content/account'
import { accountActions } from '@/content/actions'
import { Select, SubmitButton, TextArea, TextInput } from '@/components/fields'
import { req, str } from '@/lib/forms'

export const dynamic = 'force-dynamic'

// Capability: cdm-account-management
async function createAccount(formData: FormData) {
  'use server'
  await accountActions.create({
    name: req(formData, 'name'),
    account_type: str(formData, 'account_type'),
    phone: str(formData, 'phone'),
    website: str(formData, 'website'),
    city: str(formData, 'city'),
    notes: str(formData, 'notes'),
  })
  revalidatePath('/accounts')
}

export default async function AccountsPage() {
  const rows = await accountActions.list()

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <ContentListScreen
        def={account}
        rows={rows as Record<string, unknown>[]}
        basePath="/accounts"
        title="Accounts"
        description="Organizations this office works with — vendors, partners, community groups."
      />

      <section className="mt-10 max-w-xl">
        <h2 className="mb-3 text-lg font-semibold">New account</h2>
        <form action={createAccount} className="space-y-4">
          <TextInput name="name" label="Name" required />
          <Select
            name="account_type"
            label="Type"
            options={[
              { value: 'vendor', label: 'Vendor' },
              { value: 'partner', label: 'Partner agency' },
              { value: 'community', label: 'Community organization' },
              { value: 'other', label: 'Other' },
            ]}
          />
          <TextInput name="phone" label="Phone" />
          <TextInput name="website" label="Website" />
          <TextInput name="city" label="City" />
          <TextArea name="notes" label="Notes" />
          <SubmitButton>Create account</SubmitButton>
        </form>
      </section>
    </main>
  )
}
