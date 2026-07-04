'use client'

import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/contacts', label: 'Contacts' },
  { href: '/accounts', label: 'Accounts' },
  { href: '/leads', label: 'Leads' },
  { href: '/deals', label: 'Deals' },
  { href: '/activities', label: 'Activities' },
]

export function CrmNav({ showInstance }: { showInstance: boolean }) {
  const pathname = usePathname()

  const items = showInstance ? [...NAV, { href: '/instance', label: 'Instance console' }] : NAV

  return (
    <nav aria-label="GovCRM" className="w-48 shrink-0">
      <ul className="space-y-1">
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
          return (
            <li key={item.href}>
              <a
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={
                  active
                    ? 'block rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground'
                    : 'block rounded-md px-3 py-2 text-sm text-foreground hover:bg-muted'
                }
              >
                {item.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
