'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

interface SidebarLink {
  href: string
  className?: string
  children: React.ReactNode
}

const SidebarLink = ({ href, children, className, ...props }: SidebarLink) => {
  const pathname = usePathname()
  const isActiveLink = href === pathname

  return (
    <Link
      {...props}
      href={href}
      className={clsx(className, isActiveLink && 'secondary-text', !isActiveLink && 'paragraph-text')}
    >
      <div>{children}</div>
    </Link>
  )
}

export default SidebarLink
