'use client'
import NextAuthProvider from '@/components/layout/NextAuthProvider'
import { ThemeProvider } from 'next-themes'
import { useState, useEffect } from 'react'

// Conditionally render the ThemeProvider only after the component has mounted on the client side.
// This approach ensures that the server-side rendering does not conflict with client-side rendering.

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <>{children}</> // Render children without ThemeProvider during SSR
  }

  return (
    <ThemeProvider attribute='class' defaultTheme='dark'>
      <NextAuthProvider>{children}</NextAuthProvider>
    </ThemeProvider>
  )
}

export default Providers
