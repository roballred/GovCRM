import { notFound } from 'next/navigation'
import { ContentDetailScreen } from '@govcore/content/screens'
import { account } from '@/content/account'
import { accountActions } from '@/content/actions'

export const dynamic = 'force-dynamic'

export default async function AccountDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const row = await accountActions.get({ id })
  if (!row) notFound()

  return (
    <div className="max-w-3xl">
      <a href="/accounts" className="text-sm text-primary hover:underline">
        ← Accounts
      </a>
      <div className="mt-4">
        <ContentDetailScreen
          def={account}
          row={row as Record<string, unknown>}
          actions={
            <a href={`/accounts/${id}/edit`} className="rounded-md border border-border px-3 py-1.5 text-sm">
              Edit
            </a>
          }
        />
      </div>
    </div>
  )
}
