'use client'
import React from 'react'
import { signIn } from 'next-auth/react'
import DefaultButton from './DefaultButton'

const GoogleSignIn = () => {
  return (
    <DefaultButton
      customClasses='w-20 h-8 shadow-border-sm p-1 container-background button-border hover-effect'
      handleClick={() => signIn('google')}
    >
      <p className=''>Sign In</p>
    </DefaultButton>
  )
}

export default GoogleSignIn
