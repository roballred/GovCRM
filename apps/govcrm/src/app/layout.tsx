import type { ReactNode } from 'react'
import './globals.css'

export const metadata = {
  title: 'GovCRM',
  description: 'CRM for state and local government, built on the GovCore platform core.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground antialiased">{children}</body>
    </html>
  )
}
