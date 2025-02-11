'use client'
import React, { MouseEventHandler, ReactNode } from 'react'

interface RefButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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

const RefButton = React.forwardRef<HTMLButtonElement, RefButtonProps>(
  (
    {
      children,
      isDisabled,
      customClasses,
      handleClick,
      btnType,
      id,
      ariaLabel,
      role,
      ...rest
    },
    ref
  ) => (
    <button
      ref={ref}
      onClick={handleClick}
      type={btnType || 'button'}
      id={id}
      className={`custom-hover-effect disabled:cursor-not-allowed ${customClasses}`}
      disabled={isDisabled}
      aria-label={ariaLabel}
      role={role}
      {...rest}
    >
      {children}
    </button>
  )
)

RefButton.displayName = 'RefButton'

export { RefButton }
