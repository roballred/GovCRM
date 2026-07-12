import { revalidatePath } from 'next/cache'
import { ContentListScreen } from '@govcore/content/screens'
import { auth } from '@/lib/auth'
import { lead } from '@/content/lead'
import { leadActions } from '@/content/actions'
import { leadChoices, toQuery } from '@/content/ui'

export const dynamic = 'force-dynamic'

// Capability: sfa-lead-management
async function deleteLead(formData: FormData) {
  'use server'
  await leadActions.remove({ id: String(formData.get('id')) })
  revalidatePath('/leads')
}

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const [rows, session, sp] = await Promise.all([leadActions.list(), auth(), searchParams])
  const role = session?.user?.role
  const canEdit = role === 'admin' || role === 'contributor'

  return (
    <div className="max-w-4xl">
      <ContentListScreen
        def={lead}
        rows={rows as Record<string, unknown>[]}
        basePath="/leads"
        title="Leads"
        description="Unqualified prospects — qualify them, then convert to contacts and deals."
        newHref="/leads/new"
        canEdit={canEdit}
        canDelete={role === 'admin'}
        deleteAction={deleteLead}
        columns={['first_name', 'last_name', 'organization_name', 'source', 'lead_status']}
        searchable
        filters={[{ field: 'lead_status', label: 'Status', options: leadChoices.lead_status }]}
        query={toQuery(sp)}
      />
    </div>
  )
}
