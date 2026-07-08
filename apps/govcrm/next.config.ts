import type { NextConfig } from 'next'

// @govcore/* packages ship compiled `dist/` (ESM + types) as of the 0.3/0.4
// wave (GovCore #71), so Next resolves them like any other npm dependency — no
// `transpilePackages` needed.
const nextConfig: NextConfig = {}

export default nextConfig
