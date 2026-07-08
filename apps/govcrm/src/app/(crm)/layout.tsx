import type { ReactNode } from 'react'
import { auth } from '@/lib/auth'
import { AppShell } from '@govcore/nextkit'
import { CrmNav } from '@/components/crm-nav'
import { SignOutButton } from '@/components/sign-out-button'

// Product-plane shell. Middleware already requires a session under this group;
// the session read here is for display and nav gating only.
export default async function CrmLayout({ children }: { children: ReactNode }) {
  const session = await auth()
  const user = session?.user

  return (
    <AppShell
      title={<a href="/dashboard">GovCRM</a>}
      nav={<CrmNav showInstance={user?.instanceRole === 'instance_admin'} />}
      user={user ?? undefined}
      actions={<SignOutButton />}
    >
      {children}
    </AppShell>
  )
}
