import { StatCard, StatGrid } from '@govcore/nextkit'
import {
  accountActions,
  activityActions,
  contactActions,
  dealActions,
  leadActions,
} from '@/content/actions'

export const dynamic = 'force-dynamic'

// Capability: ar-dashboards (first slice) — live counts and open pipeline from
// the org's own data, RLS-scoped through the generated actions.
export default async function DashboardPage() {
  const [accounts, contacts, leads, deals, activities] = await Promise.all([
    accountActions.list(),
    contactActions.list(),
    leadActions.list(),
    dealActions.list(),
    activityActions.list(),
  ])

  const openDeals = (deals as Record<string, unknown>[]).filter(
    (d) => d.stage !== 'won' && d.stage !== 'lost',
  )
  const pipeline = openDeals.reduce((sum, d) => sum + (Number(d.amount) || 0), 0)
  const openActivities = (activities as Record<string, unknown>[]).filter((a) => !a.completed)

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Your organization&apos;s CRM at a glance.
      </p>

      <div className="mt-6">
        <StatGrid>
          <StatCard label="Contacts" value={contacts.length} />
          <StatCard label="Accounts" value={accounts.length} />
          <StatCard label="Open leads" value={(leads as Record<string, unknown>[]).filter((l) => l.lead_status !== 'disqualified').length} />
          <StatCard label="Open deals" value={openDeals.length} />
          <StatCard label="Open pipeline" value={`$${pipeline.toLocaleString()}`} />
          <StatCard label="Open activities" value={openActivities.length} />
        </StatGrid>
      </div>

      <section className="mt-10">
        <h2 className="mb-3 text-lg font-semibold">Next activities</h2>
        {openActivities.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nothing due — log one from the Activities page.</p>
        ) : (
          <ul className="divide-y divide-border rounded-md border border-border">
            {openActivities.slice(0, 6).map((a) => (
              <li key={String(a.id)} className="flex items-center justify-between px-4 py-2.5 text-sm">
                <a href={`/activities/${String(a.id)}`} className="hover:underline">
                  {String(a.subject)}
                </a>
                <span className="text-muted-foreground">
                  {a.activity_type ? `${String(a.activity_type)} · ` : ''}
                  {a.due_date ? new Date(String(a.due_date)).toLocaleDateString() : 'no date'}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}
