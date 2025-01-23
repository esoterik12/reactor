'use client'
import React, { MouseEventHandler, ReactElement } from 'react'

interface DefaultButtonProps {
  children: ReactElement
  isDisabled?: boolean
  customClasses?: string
  handleClick?: MouseEventHandler<HTMLButtonElement>
  btnType?: 'button' | 'submit'
  id?: string
  'aria-label'?: string
  'data-action'?: string
  role?: string
}

const DefaultButton = ({
  children,
  isDisabled,
  customClasses,
  handleClick,
  btnType,
  id
}: DefaultButtonProps) => {
  return (
    <button
      onClick={handleClick}
      type={btnType || 'button'}
      id={id}
      className={`custom-hover-effect rounded-lg disabled:cursor-not-allowed ${customClasses}`}
      disabled={isDisabled}
    >
      {children}
    </button>
  )
}

export default DefaultButton
