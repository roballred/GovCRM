import { revalidatePath } from 'next/cache'
import { ContentListScreen } from '@govcore/content/screens'
import { auth } from '@/lib/auth'
import { deal } from '@/content/deal'
import { dealActions } from '@/content/actions'
import { dealChoices, dealRefs, toQuery } from '@/content/ui'

export const dynamic = 'force-dynamic'

// Capability: sfa-opportunity-management
async function deleteDeal(formData: FormData) {
  'use server'
  await dealActions.remove({ id: String(formData.get('id')) })
  revalidatePath('/deals')
}

export default async function DealsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const [rows, references, session, sp] = await Promise.all([
    dealActions.list(),
    dealRefs(),
    auth(),
    searchParams,
  ])
  const role = session?.user?.role
  const canEdit = role === 'admin' || role === 'contributor'

  return (
    <div className="max-w-4xl">
      <ContentListScreen
        def={deal}
        rows={rows as Record<string, unknown>[]}
        basePath="/deals"
        references={references}
        title="Deals"
        description="Tracked opportunities — procurements, grants, renewals — with stage and value."
        newHref="/deals/new"
        canEdit={canEdit}
        canDelete={role === 'admin'}
        deleteAction={deleteDeal}
        columns={['name', 'account', 'amount', 'stage', 'close_date']}
        searchable
        filters={[{ field: 'stage', label: 'Stage', options: dealChoices.stage }]}
        query={toQuery(sp)}
      />
    </div>
  )
}
