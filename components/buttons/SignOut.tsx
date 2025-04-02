'use client'
import { signOut } from 'next-auth/react'
import DefaultButton from './DefaultButton'

const SignOut = () => {
  return (
    <DefaultButton
      customClasses='w-24 h-9 shadow-border-sm container-background button-border hover-effect'
      handleClick={() => signOut()}
    >
      <p className=''>Sign Out</p>
    </DefaultButton>
  )
}

export default SignOut
