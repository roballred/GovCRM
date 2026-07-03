import { createAuth } from '@govcore/auth'
import { db } from '@/db/client'

// Credentials-only for the scaffold; OIDC SSO is injected here when an IdP is
// configured (capability: pa-security-controls).
export const { handlers, auth, signIn, signOut } = createAuth({
  db,
  defaultRole: 'viewer',
})
