// May require suppressHydrationWarning in html of layout.tsx
// Input Component designed for text/email to be used in conjunction with ReactHookForm
// Has its own default styles as well as optional props for more Tailwind styling

import React from 'react'
import { FieldError } from 'react-hook-form'

interface InputFieldProps {
  id: string
  type: string
  label?: string
  errorType?: 'textBelow' | 'highlightInput'
  placeholder: string
  labelClasses?: string
  inputClasses?: string
  isDisabled?: boolean
  containerClasses?: string
  error: FieldError | undefined
  maxLength?: number
}

// Using React.ForwardRefExoticComponent to properly type the component with forwarded refs
// React.forwardRef in TypeScript: specify two generic types: ref type / props type
const InputField: React.ForwardRefExoticComponent<
  InputFieldProps & React.RefAttributes<HTMLInputElement>
> = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      type,
      id,
      label,
      placeholder,
      errorType = 'textBelow',
      labelClasses,
      inputClasses,
      isDisabled,
      containerClasses = 'w-full',
      error,
      ...rest
    },
    ref
  ) => (
    <div className={`${containerClasses}`}>
      {label && (
        <label htmlFor={id} className={`${labelClasses} block font-medium`}>
          {label}
        </label>
      )}

      <input
        ref={ref}
        type={type}
        id={id}
        tabIndex={-1}
        placeholder={placeholder}
        className={`${inputClasses} shadow-inset page-background ${errorType === 'highlightInput' && error ? 'input-error-border' : 'input-border'}`}
        disabled={isDisabled}
        {...rest}
      />
      {errorType === 'textBelow' && (
        <div className='ml-1 mr-1 min-h-8 p-1'>
          {error && (
            <p className='secondary-text text-[12px]'>{error.message}</p>
          )}
        </div>
      )}
    </div>
  )
)

InputField.displayName = 'InputField'

export { InputField }
