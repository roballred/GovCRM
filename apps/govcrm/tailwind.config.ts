import type { Config } from 'tailwindcss'
import { baseTheme } from '@govcore/theme'

export default {
  presets: [baseTheme as unknown as Partial<Config>],
  content: [
    './src/**/*.{ts,tsx}',
    // nextkit ships source (source-first packages); scan it for classes.
    './node_modules/@govcore/nextkit/src/**/*.{ts,tsx}',
  ],
} satisfies Config
