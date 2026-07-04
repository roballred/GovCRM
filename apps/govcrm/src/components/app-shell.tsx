// Local app shell + side nav, mirroring the API of @govcore/nextkit's AppShell
// and SideNav from GovCore PR #59 — when nextkit 0.2.0 publishes, replace these
// with the core imports and delete this file.

import type { ReactNode } from 'react'

export interface NavItem {
  href: string
  label: string
  active?: boolean
}

export function SideNav({ items, ariaLabel = 'Primary' }: { items: NavItem[]; ariaLabel?: string }) {
  return (
    <nav aria-label={ariaLabel} className="w-48 shrink-0">
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              aria-current={item.active ? 'page' : undefined}
              className={
                item.active
                  ? 'block rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground'
                  : 'block rounded-md px-3 py-2 text-sm text-foreground hover:bg-muted'
              }
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function AppShell({
  title,
  nav,
  navAriaLabel = 'Primary',
  user,
  actions,
  children,
}: {
  title: ReactNode
  nav: NavItem[] | ReactNode
  navAriaLabel?: string
  user?: { name?: string | null; email?: string | null }
  actions?: ReactNode
  children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="bg-header text-header-foreground">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <span className="text-lg font-semibold">{title}</span>
          <div className="flex items-center gap-4">
            {user ? <span className="text-sm opacity-90">{user.name ?? user.email}</span> : null}
            {actions}
          </div>
        </div>
      </header>
      <div className="mx-auto flex max-w-6xl gap-8 px-6 py-8">
        {Array.isArray(nav) ? <SideNav items={nav} ariaLabel={navAriaLabel} /> : nav}
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  )
}
