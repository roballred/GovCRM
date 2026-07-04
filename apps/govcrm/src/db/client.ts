import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

const globalForDb = globalThis as unknown as {
  __client?: ReturnType<typeof postgres>
  __authClient?: ReturnType<typeof postgres>
}

// Runtime pool — non-superuser role (govcrm_app), so FORCEd RLS applies to
// every tenant query. All domain/tenant access goes through this pool.
const client = globalForDb.__client ?? postgres(process.env.DATABASE_URL!, { max: 5 })
globalForDb.__client = client

export const db = drizzle(client, { schema })

// Auth pool — owner credentials, used ONLY by createAuth. The credentials
// lookup at login runs before any org context exists, and govcore.users' RLS
// policy requires the app.current_org GUC — so the lookup is impossible on the
// runtime role. Filed upstream (GovCore) for a core-blessed pattern.
const authClient =
  globalForDb.__authClient ??
  postgres(process.env.AUTH_DATABASE_URL ?? process.env.DATABASE_URL!, { max: 2 })
globalForDb.__authClient = authClient

export const authDb = drizzle(authClient, { schema })
