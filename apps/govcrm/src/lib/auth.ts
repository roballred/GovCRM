import { createAuth } from '@govcore/auth'
import { authDb } from '@/db/client'

// Credentials-only for the scaffold; OIDC SSO is injected here when an IdP is
// configured (capability: pa-security-controls). Uses the auth pool — see
// db/client.ts for why login cannot run on the RLS-bound runtime role.
export const { handlers, auth, signIn, signOut } = createAuth({
  db: authDb,
  defaultRole: 'viewer',
})
