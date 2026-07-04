import type { ReactNode } from 'react'
import { themeToCss } from '@govcore/theme'
import { govcrmTheme } from '@/lib/theme'
import './globals.css'

export const metadata = {
  title: 'GovCRM',
  description: 'CRM for state and local government, built on the GovCore platform core.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground antialiased">
        {/* Brand theme over the WCAG-AA base tokens — defineTheme sanitizes values. */}
        <style dangerouslySetInnerHTML={{ __html: themeToCss(govcrmTheme) }} />
        {children}
      </body>
    </html>
  )
}
