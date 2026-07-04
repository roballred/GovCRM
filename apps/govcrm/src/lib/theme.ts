import { defineTheme } from '@govcore/theme'

// GovCRM brand theme — a civic teal-green over the WCAG-AA base tokens.
// Only allowlisted brand vars can be overridden; values are HSL triplets
// consumed as hsl(var(--token)). Contrast pairs kept ≥4.5:1.
export const govcrmTheme = defineTheme({
  id: 'govcrm',
  name: 'GovCRM',
  brandVars: {
    '--primary': '174 62% 24%',
    '--primary-foreground': '0 0% 100%',
    '--ring': '174 62% 32%',
    '--header-bg': '176 58% 15%',
    '--header-fg': '168 40% 94%',
  },
})
