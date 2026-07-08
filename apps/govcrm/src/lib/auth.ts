import { createAuth } from '@govcore/auth'
import { db, authDb } from '@/db/client'

// Credentials-only for the scaffold; OIDC SSO is injected here when an IdP is
// configured (capability: pa-security-controls). `authDb` is now first-class in
// createAuth (#57): the runtime `db` is the RLS-bound non-owner pool, while the
// pre-/cross-session identity reads (credentials lookup, adapter, membership
// resolution, login audit) run on `authDb`, the RLS-bypassing owner pool — see
// db/client.ts for why login cannot run on the runtime role.
export const { handlers, auth, signIn, signOut } = createAuth({
  db,
  authDb,
  defaultRole: 'viewer',
})
