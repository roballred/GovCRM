import { starterThemes } from '@govcore/theme'
import { PageHeader } from '@govcore/nextkit'
import { ThemeSelector } from '@govcore/nextkit/theming'

export const dynamic = 'force-dynamic'

// Appearance settings: pick a shared GovCore brand theme. The choice is saved on
// the device (localStorage) and restored before first paint by ThemeInitScript;
// dark mode has its own header toggle. Capability: po-instance-administration.
export default function SettingsPage() {
  return (
    <div className="max-w-3xl">
      <PageHeader
        title="Appearance"
        description="Choose a theme. Your choice is saved on this device; use the header toggle for light/dark."
      />
      <ThemeSelector themes={starterThemes} />
    </div>
  )
}
