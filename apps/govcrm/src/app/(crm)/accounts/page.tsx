import { ContentListScreen } from '@govcore/content/screens'
import { auth } from '@/lib/auth'
import { account } from '@/content/account'
import { accountActions } from '@/content/actions'
import { accountChoices, toQuery } from '@/content/ui'

export const dynamic = 'force-dynamic'

// Capability: cdm-account-management
export default async function AccountsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const [rows, session, sp] = await Promise.all([accountActions.list(), auth(), searchParams])
  const canEdit = session?.user?.role === 'admin' || session?.user?.role === 'contributor'

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
        searchable
        filters={[{ field: 'account_type', label: 'Type', options: accountChoices.account_type }]}
        query={toQuery(sp)}
      />
    </div>
  )
}
