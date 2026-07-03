// Generated CRUD for `contact`, wired through @govcore/server's tenantAction:
// every call resolves the actor's active org from the trusted session (never
// request input), runs inside a transaction with the `app.current_org` RLS GUC,
// checks the permission, and is audited.

import { generateContentActions } from '@govcore/content'
import { createTenantActions } from '@govcore/server'
import { db } from '@/db/client'
import { auth } from '@/lib/auth'
import { rbac } from '@/lib/rbac'
import { contact, contactTable } from './contact'

const tenantAction = createTenantActions({
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

export const contactActions = generateContentActions(tenantAction, contact, contactTable, {
  permissions: {
    create: 'content:write',
    update: 'content:write',
    remove: 'content:write',
    publish: 'content:write',
  },
})
