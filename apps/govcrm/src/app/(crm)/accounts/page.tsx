import { revalidatePath } from 'next/cache'
import { ContentForm, ContentListScreen, parseContentForm } from '@govcore/content/screens'
import { account } from '@/content/account'
import { accountActions } from '@/content/actions'
import { accountChoices } from '@/content/ui'

export const dynamic = 'force-dynamic'

// Capability: cdm-account-management
async function createAccount(formData: FormData) {
  'use server'
  await accountActions.create(parseContentForm(account, formData))
  revalidatePath('/accounts')
}

export default async function AccountsPage() {
  const rows = await accountActions.list()

  return (
    <div className="max-w-4xl">
      <ContentListScreen
        def={account}
        rows={rows as Record<string, unknown>[]}
        basePath="/accounts"
        title="Accounts"
        description="Organizations this office works with — vendors, partners, community groups."
      />

      <section className="mt-10">
        <h2 className="mb-3 text-lg font-semibold">New account</h2>
        <ContentForm def={account} action={createAccount} choices={accountChoices} />
      </section>
    </div>
  )
}
