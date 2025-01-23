'use client'
import { signOut } from 'next-auth/react'
import DefaultButton from './DefaultButton'

const SignOut = () => {
  return (
    <DefaultButton
      customClasses='w-24 p-1 container-background button-border hover-effect'
      handleClick={() => signOut()}
    >
      <p className='mt-0.5'>Sign Out</p>
    </DefaultButton>
  )
}

export default SignOut
