import type { ReactNode } from 'react'
import { auth, signOut } from '@/lib/auth'
import { CrmNav } from '@/components/crm-nav'

// GovEA-style app shell: branded header + left sidebar nav. Middleware already
// requires a session for everything under this group; the session read here is
// for display and nav gating only.
export default async function CrmLayout({ children }: { children: ReactNode }) {
  const session = await auth()
  const user = session?.user

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="bg-header text-header-foreground">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <a href="/dashboard" className="text-lg font-semibold tracking-tight">
            GovCRM
          </a>
          <div className="flex items-center gap-4">
            <span className="text-sm opacity-90">{user?.email}</span>
            <form
              action={async () => {
                'use server'
                await signOut({ redirectTo: '/' })
              }}
            >
              <button className="rounded-md border border-header-foreground px-2.5 py-1 text-sm opacity-80 hover:opacity-100">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      <div className="mx-auto flex max-w-6xl gap-8 px-6 py-8">
        <CrmNav showInstance={user?.instanceRole === 'instance_admin'} />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  )
}
