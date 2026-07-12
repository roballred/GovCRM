import type { Config } from 'tailwindcss'
import { baseTheme } from '@govcore/theme'

export default {
  presets: [baseTheme as unknown as Partial<Config>],
  content: [
    './src/**/*.{ts,tsx}',
    // GovCore packages ship compiled dist (#71) — scan the built JS for the class
    // names their components use (nextkit shell/table, content screens).
    './node_modules/@govcore/nextkit/dist/**/*.js',
    './node_modules/@govcore/content/dist/**/*.js',
  ],
} satisfies Config
