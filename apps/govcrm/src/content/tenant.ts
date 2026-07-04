// The app's single tenantAction factory (shared by every content type's
// generated actions): resolves the actor's active org from the trusted session,
// opens the tenant transaction with the app.current_org RLS GUC, gates on
// permission, and binds audit.

import { createTenantActions } from '@govcore/server'
import { db } from '@/db/client'
import { auth } from '@/lib/auth'
import { rbac } from '@/lib/rbac'

export const tenantAction = createTenantActions({
  db,
  rbac,
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
})

/** Standard permission map for CRM content types. */
export const contentPermissions = {
  create: 'content:write',
  update: 'content:write',
  remove: 'content:write',
  publish: 'content:write',
} as const
