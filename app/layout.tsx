import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Metrics Health - Health Goals on Autopilot',
  description: 'How high-achieving women reach health goals on autopilot',
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg'
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
