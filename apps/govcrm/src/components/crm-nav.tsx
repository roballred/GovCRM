'use client'

import { usePathname } from 'next/navigation'
import { GroupedSideNav, type NavGroup } from '@govcore/nextkit'

// Sectioned nav (grouped shell, matching GovEA via @govcore/nextkit). Groups and
// items are declared here; the client wrapper computes `active` + `defaultOpen`
// from the route and hands them to the presentational GroupedSideNav.
const GROUPS: { label: string; items: { href: string; label: string }[] }[] = [
  { label: 'Overview', items: [{ href: '/dashboard', label: 'Dashboard' }] },
  {
    label: 'Records',
    items: [
      { href: '/contacts', label: 'Contacts' },
      { href: '/accounts', label: 'Accounts' },
      { href: '/leads', label: 'Leads' },
      { href: '/deals', label: 'Deals' },
      { href: '/activities', label: 'Activities' },
    ],
  },
  { label: 'Settings', items: [{ href: '/settings', label: 'Appearance' }] },
]

export function CrmNav({ showInstance }: { showInstance: boolean }) {
  const pathname = usePathname()
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  const groups: NavGroup[] = GROUPS.map((g) => {
    const items = g.items.map((i) => ({ ...i, active: isActive(i.href) }))
    return { label: g.label, items, defaultOpen: items.some((i) => i.active) }
  })

  if (showInstance) {
    groups.push({
      label: 'Admin',
      items: [{ href: '/instance', label: 'Instance console', active: isActive('/instance') }],
      defaultOpen: isActive('/instance'),
    })
  }

  // Open the first section when nothing else matches (e.g. an unknown route).
  if (!groups.some((g) => g.defaultOpen)) groups[0].defaultOpen = true

  return <GroupedSideNav groups={groups} ariaLabel="GovCRM" />
}
