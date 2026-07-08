'use client'

import { usePathname } from 'next/navigation'
import { SideNav } from '@govcore/nextkit'

const NAV = [
  { href: '/instance', label: 'Overview', exact: true },
  { href: '/instance/organizations', label: 'Organizations' },
  { href: '/instance/users', label: 'Users' },
  { href: '/instance/audit', label: 'Audit log' },
  { href: '/instance/support', label: 'Support sessions' },
]

export function InstanceNav() {
  const pathname = usePathname()
  const items = [
    ...NAV.map((item) => ({
      href: item.href,
      label: item.label,
      active: item.exact ? pathname === item.href : pathname.startsWith(item.href),
    })),
    { href: '/dashboard', label: '← Back to GovCRM' },
  ]
  return <SideNav items={items} ariaLabel="Instance console" />
}
