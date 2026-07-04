import { notFound, redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { ContentForm, parseContentForm } from '@/components/content-screens'
import { account } from '@/content/account'
import { accountActions } from '@/content/actions'
import { accountChoices } from '@/content/ui'

export const dynamic = 'force-dynamic'

// Capability: cdm-account-management
async function updateAccount(formData: FormData) {
  'use server'
  const id = String(formData.get('id'))
  await accountActions.update({ id, values: parseContentForm(account, formData) })
  revalidatePath('/accounts')
  redirect(`/accounts/${id}`)
}

export default async function EditAccountPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const row = await accountActions.get({ id })
  if (!row) notFound()

  return (
    <div className="max-w-3xl">
      <a href={`/accounts/${id}`} className="text-sm text-primary hover:underline">
        ← Back
      </a>
      <h1 className="mb-6 mt-4 text-2xl font-semibold tracking-tight">Edit account</h1>
      <ContentForm def={account} row={row as Record<string, unknown>} action={updateAccount} choices={accountChoices} />
    </div>
  )
}
