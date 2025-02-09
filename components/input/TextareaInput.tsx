// May require suppressHydrationWarning in html of layout.tsx
// Input Component designed for text/email to be used in conjunction with ReactHookForm
// Has its own default styles as well as optional props for more Tailwind styling

import React from 'react'
import { FieldError } from 'react-hook-form'

interface ITextareaInputProps {
  id: string
  label?: string
  placeholder: string
  containerClasses?: string
  labelClasses?: string
  inputClasses?: string
  error: FieldError | undefined
  maxLength?: number
  isDisabled: boolean
}

const TextareaInput: React.ForwardRefExoticComponent<
  ITextareaInputProps & React.RefAttributes<HTMLTextAreaElement>
> = React.forwardRef<HTMLTextAreaElement, ITextareaInputProps>(
  (
    {
      id,
      label,
      placeholder,
      containerClasses,
      labelClasses,
      inputClasses,
      error,
      isDisabled,
      ...rest
    },
    ref
  ) => (
    <div className={`${containerClasses}`}>
      {label && (
        <label htmlFor={id} className={`${labelClasses} block p-1 font-medium`}>
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={id}
        placeholder={placeholder}
        className={`${inputClasses} page-background input-border block rounded-md border`}
        disabled={isDisabled}
        {...rest}
      />
      <div className='ml-1 mr-1 min-h-8 p-1'>
        <p className='secondary-text text-[12px]'>
          {error ? error.message : '\u00A0'}
        </p>{' '}
      </div>
    </div>
  )
)

TextareaInput.displayName = 'Textarea'

export { TextareaInput }
