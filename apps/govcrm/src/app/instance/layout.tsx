import type { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { AppShell } from '@govcore/nextkit'
import { DarkModeToggle } from '@govcore/nextkit/theming'
import { InstanceNav } from '@/components/instance-nav'
import { SignOutButton } from '@/components/sign-out-button'

// Operator-plane shell: same look as the CRM shell (one AppShell), distinct
// nav. Middleware gates /instance to instance_admin (instanceOnlyPaths); the
// check here is defense in depth because pages under this layout read the
// privileged platformDb pool.
export default async function InstanceLayout({ children }: { children: ReactNode }) {
  const session = await auth()
  if (session?.user?.instanceRole !== 'instance_admin') redirect('/dashboard')

  return (
    <AppShell
      title={<a href="/instance">GovCRM · Instance Console</a>}
      nav={<InstanceNav />}
      navAriaLabel="Instance console"
      user={session?.user ?? undefined}
      actions={
        <>
          <DarkModeToggle />
          <SignOutButton />
        </>
      }
    >
      {children}
    </AppShell>
  )
}
