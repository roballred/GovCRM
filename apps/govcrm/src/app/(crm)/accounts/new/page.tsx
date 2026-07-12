import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { ContentForm, parseContentForm } from '@govcore/content/screens'
import { account } from '@/content/account'
import { accountActions } from '@/content/actions'
import { accountChoices } from '@/content/ui'

export const dynamic = 'force-dynamic'

// Capability: cdm-account-management
async function createAccount(formData: FormData) {
  'use server'
  await accountActions.create(parseContentForm(account, formData))
  revalidatePath('/accounts')
  redirect('/accounts')
}

export default function NewAccountPage() {
  return (
    <div className="max-w-3xl">
      <a href="/accounts" className="text-sm text-primary hover:underline">
        ← Accounts
      </a>
      <h1 className="mb-6 mt-4 text-2xl font-semibold tracking-tight">New account</h1>
      <ContentForm def={account} action={createAccount} choices={accountChoices} />
    </div>
  )
}
