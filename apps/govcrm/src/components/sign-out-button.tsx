import { signOut } from '@/lib/auth'

// The one sign-out affordance, shared by every shell so headers stay identical.
export function SignOutButton() {
  return (
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
  )
}
