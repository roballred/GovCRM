import { createMiddleware } from '@govcore/middleware'

export default createMiddleware({
  // Landing page is public; everything else needs a session; /instance needs instance_admin.
  publicPaths: ['/', '/login', '/error', '/api/auth', '/maintenance'],
  instanceOnlyPaths: ['/instance'],
})

// Next statically parses `config.matcher` and rejects imported bindings — keep
// this inline; it mirrors @govcore/middleware's `defaultMatcher`.
export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico|api/auth).*)'] }
