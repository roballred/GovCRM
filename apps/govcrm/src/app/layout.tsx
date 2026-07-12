import type { ReactNode } from 'react'
import { themesToCss, starterThemes } from '@govcore/theme'
import { ThemeInitScript } from '@govcore/nextkit'
import './globals.css'

export const metadata = {
  title: 'GovCRM',
  description: 'CRM for state and local government, built on the GovCore platform core.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // suppressHydrationWarning: ThemeInitScript sets data-theme/.dark on <html>
    // before hydration, so the server markup intentionally differs.
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Restore the saved brand + dark mode before first paint (no FOUC). */}
        <ThemeInitScript />
        {/* The shared GovCore theme registry — one <style> holds every brand
            under its data-theme selector; ThemeSelector flips the attribute. */}
        <style dangerouslySetInnerHTML={{ __html: themesToCss(starterThemes) }} />
      </head>
      <body className="bg-background text-foreground antialiased">{children}</body>
    </html>
  )
}
