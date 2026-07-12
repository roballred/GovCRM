import { ContentListScreen } from '@govcore/content/screens'
import { auth } from '@/lib/auth'
import { lead } from '@/content/lead'
import { leadActions } from '@/content/actions'
import { leadChoices, toQuery } from '@/content/ui'

export const dynamic = 'force-dynamic'

// Capability: sfa-lead-management
export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const [rows, session, sp] = await Promise.all([leadActions.list(), auth(), searchParams])
  const canEdit = session?.user?.role === 'admin' || session?.user?.role === 'contributor'

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
        searchable
        filters={[{ field: 'lead_status', label: 'Status', options: leadChoices.lead_status }]}
        query={toQuery(sp)}
      />
    </div>
  )
}
