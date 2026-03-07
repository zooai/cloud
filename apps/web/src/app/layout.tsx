import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Zoo Cloud',
  description: 'DeAI + DeSci platform by Zoo Labs Foundation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
