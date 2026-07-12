import { revalidatePath } from 'next/cache'
import { ContentListScreen } from '@govcore/content/screens'
import { auth } from '@/lib/auth'
import { account } from '@/content/account'
import { accountActions } from '@/content/actions'
import { accountChoices, toQuery } from '@/content/ui'

export const dynamic = 'force-dynamic'

// Capability: cdm-account-management
async function deleteAccount(formData: FormData) {
  'use server'
  await accountActions.remove({ id: String(formData.get('id')) })
  revalidatePath('/accounts')
}

export default async function AccountsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const [rows, session, sp] = await Promise.all([accountActions.list(), auth(), searchParams])
  const role = session?.user?.role
  const canEdit = role === 'admin' || role === 'contributor'

  return (
    <div className="max-w-4xl">
      <ContentListScreen
        def={account}
        rows={rows as Record<string, unknown>[]}
        basePath="/accounts"
        title="Accounts"
        description="Organizations this office works with — vendors, partners, community groups."
        newHref="/accounts/new"
        canEdit={canEdit}
        canDelete={role === 'admin'}
        deleteAction={deleteAccount}
        columns={['name', 'account_type', 'city', 'phone']}
        searchable
        filters={[{ field: 'account_type', label: 'Type', options: accountChoices.account_type }]}
        query={toQuery(sp)}
      />
    </div>
  )
}
