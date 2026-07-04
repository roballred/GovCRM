import type { ReactNode } from 'react'
import { auth, signOut } from '@/lib/auth'

const NAV = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/contacts', label: 'Contacts' },
  { href: '/accounts', label: 'Accounts' },
  { href: '/leads', label: 'Leads' },
  { href: '/deals', label: 'Deals' },
  { href: '/activities', label: 'Activities' },
]

// Middleware already requires a session for everything under this group; the
// session read here is for display only.
export default async function CrmLayout({ children }: { children: ReactNode }) {
  const session = await auth()
  const user = session?.user

  return (
    <div className="min-h-screen">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-5xl items-center gap-6 px-6 py-3">
          <a href="/dashboard" className="text-sm font-semibold tracking-tight">
            GovCRM
          </a>
          <nav className="flex flex-1 gap-4">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
          {user?.instanceRole === 'instance_admin' ? (
            <a href="/instance" className="text-sm text-muted-foreground hover:text-foreground">
              Instance
            </a>
          ) : null}
          <span className="text-sm text-muted-foreground">{user?.email}</span>
          <form
            action={async () => {
              'use server'
              await signOut({ redirectTo: '/' })
            }}
          >
            <button className="rounded-md border border-border px-2.5 py-1 text-sm">Sign out</button>
          </form>
        </div>
      </header>
      {children}
    </div>
  )
}
