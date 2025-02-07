'use client'
import React, { MouseEventHandler, ReactNode } from 'react'

interface DefaultButtonProps {
  children: ReactNode
  isDisabled?: boolean
  customClasses?: string
  handleClick?: MouseEventHandler<HTMLButtonElement> | (() => void)
  btnType?: 'button' | 'submit'
  id?: string
  ariaLabel?: string
  dataAction?: string
  role?: string
}

const DefaultButton = ({
  children,
  isDisabled,
  customClasses,
  handleClick,
  btnType,
  id,
  ariaLabel,
  role
}: DefaultButtonProps) => {
  return (
    <button
      onClick={handleClick}
      type={btnType || 'button'}
      id={id}
      className={`custom-hover-effect disabled:cursor-not-allowed ${customClasses}`}
      disabled={isDisabled}
      aria-label={ariaLabel}
      role={role}
    >
      {children}
    </button>
  )
}

export default DefaultButton
