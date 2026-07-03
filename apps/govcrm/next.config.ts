import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // @govcore/* packages are source-first TS even on npm — Next must transpile
  // every consumed package (invariant; see CLAUDE.md).
  transpilePackages: [
    '@govcore/schema',
    '@govcore/rbac',
    '@govcore/audit',
    '@govcore/tenancy',
    '@govcore/auth',
    '@govcore/middleware',
    '@govcore/server',
    '@govcore/theme',
    '@govcore/nextkit',
    '@govcore/content',
  ],
}

export default nextConfig
