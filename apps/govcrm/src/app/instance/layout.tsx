import type { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { AppShell } from '@/components/app-shell'
import { SignOutButton } from '@/components/sign-out-button'

// Operator-plane shell: same look as the CRM shell (one AppShell), distinct
// nav. Middleware gates /instance to instance_admin (instanceOnlyPaths); the
// check here is defense in depth because pages under this layout read the
// privileged platformDb pool.
export default async function InstanceLayout({ children }: { children: ReactNode }) {
  const session = await auth()
  if (session?.user?.instanceRole !== 'instance_admin') redirect('/dashboard')

  const nav = [
    { href: '/instance', label: 'Overview', active: true },
    { href: '/instance#orgs', label: 'Organizations' },
    { href: '/instance#users', label: 'Users' },
    { href: '/instance#audit', label: 'Audit log' },
    { href: '/dashboard', label: '← Back to GovCRM' },
  ]

  return (
    <AppShell
      title={<a href="/dashboard">GovCRM · Instance Console</a>}
      nav={nav}
      navAriaLabel="Instance console"
      user={session?.user ?? undefined}
      actions={<SignOutButton />}
    >
      {children}
    </AppShell>
  )
}
