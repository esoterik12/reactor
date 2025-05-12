import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import './globals.css'
import Providers from '@/components/shared/Providers'
import NavHeader from '@/components/layout/NavHeader'
import { Analytics } from '@vercel/analytics/next'

const late = Lato({
  weight: '400',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Reactor',
  description: 'Content generation and lesson planning application.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${late.className} page-background flex flex-col flex-grow antialiased`}
      >
        <Providers>
          <NavHeader />
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
