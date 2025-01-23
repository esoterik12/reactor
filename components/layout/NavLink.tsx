'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import DefaultButton from '../buttons/DefaultButton'

interface NavLink {
  href: string
  className?: string
  children: React.ReactNode
}

const NavLink = ({ href, children, className, ...props }: NavLink) => {
  const pathname = usePathname()
  const isActiveLink = href === pathname

  return (
    <Link
      {...props}
      href={href}
      className={clsx(
        className,
        isActiveLink && 'underline decoration-sky-500'
      )}
    >
      <DefaultButton customClasses='w-28 h-9 p-1 container-background button-border hover-effect'>
        <div>{children}</div>
      </DefaultButton>
    </Link>
  )
}

export default NavLink
