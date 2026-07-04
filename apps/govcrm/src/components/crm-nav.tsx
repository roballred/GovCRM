'use client'

import { usePathname } from 'next/navigation'
import { SideNav } from '@/components/app-shell'

const NAV = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/contacts', label: 'Contacts' },
  { href: '/accounts', label: 'Accounts' },
  { href: '/leads', label: 'Leads' },
  { href: '/deals', label: 'Deals' },
  { href: '/activities', label: 'Activities' },
]

// The ~5-line client wrapper: compute active from the route, render the
// presentational SideNav (no client hooks in the shell components themselves).
export function CrmNav({ showInstance }: { showInstance: boolean }) {
  const pathname = usePathname()
  const items = (showInstance ? [...NAV, { href: '/instance', label: 'Instance console' }] : NAV).map(
    (item) => ({ ...item, active: pathname === item.href || pathname.startsWith(`${item.href}/`) }),
  )
  return <SideNav items={items} ariaLabel="GovCRM" />
}
