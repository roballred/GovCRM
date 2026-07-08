// The app's single operatorAction factory — the operator-plane counterpart to
// tenant.ts. Instance-console mutations legitimately cross org boundaries (create
// any org, provision a user in any org), so they run on the privileged, RLS-
// bypassing platformDb pool with NO tenant GUC, gated on instanceRole rather than
// an RBAC permission. Wrapping every cross-org mutation here turns what used to be
// ad-hoc platformDb writes into one named, instance-admin-gated seam.

import { createOperatorActions } from '@govcore/server'
import { redirect } from 'next/navigation'
import { platformDb } from '@/db/client'
import { auth } from '@/lib/auth'

export const operatorAction = createOperatorActions({
  operatorDb: platformDb,
  getActiveContext: async () => {
    const session = await auth()
    const user = session?.user
    if (!user?.id || !user.organizationId) return null
    return {
      userId: user.id,
      organizationId: user.organizationId,
      role: user.role ?? 'viewer',
      instanceRole: user.instanceRole ?? null,
    }
  },
  // Console pages are already gated in middleware + instance/layout.tsx; if a
  // non-operator still reaches an action, bounce to the product plane.
  onUnauthorized: () => redirect('/login'),
  onForbidden: () => redirect('/dashboard'),
})
