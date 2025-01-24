import Logo from './Logo'
import NavLink from './NavLink'
import GoogleSignIn from '../buttons/GoogleSignIn'
import { getServerSession } from 'next-auth'
import SignOut from '../buttons/SignOut'
import ThemeButton from '../buttons/ThemeButton'

export default async function NavHeader() {
  const session = await getServerSession()

  return (
    <header className='z-20 h-14'>
      <nav className='flex flex-row items-center justify-between'>
        {/* Logo - Left Side */}
        <div className='flex w-1/4 flex-row'>
          <Logo />
        </div>

        {/* NavLinks */}
        <div className='mr-4 flex flex-row items-center justify-center gap-x-2'>
          <NavLink href='/design'>
            <p>Design</p>
          </NavLink>
          <NavLink className='' href='/content'>
            <p>Content</p>
          </NavLink>
          <ThemeButton />
          {session && <SignOut />}
          {!session && <GoogleSignIn />}
        </div>
      </nav>
    </header>
  )
}
