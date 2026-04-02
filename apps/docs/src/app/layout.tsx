import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Zoo Cloud Docs',
  description: 'Documentation for Zoo Cloud — DeAI + DeSci platform',
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
