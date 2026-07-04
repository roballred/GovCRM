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
    <main className="mx-auto max-w-3xl px-6 py-10">
      <a href="/accounts" className="text-sm text-primary hover:underline">
        ← Accounts
      </a>
      <div className="mt-4">
        <ContentDetailScreen def={account} row={row as Record<string, unknown>} />
      </div>
    </main>
  )
}
