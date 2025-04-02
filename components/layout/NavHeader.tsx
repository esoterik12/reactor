import Logo from './Logo'
import NavLink from './NavLink'
import GoogleSignIn from '../buttons/GoogleSignIn'
import { getServerSession } from 'next-auth'
import SignOut from '../buttons/SignOut'
import ThemeButton from '../buttons/ThemeButton'

export default async function NavHeader() {
  const session = await getServerSession()

  return (
    <header className='z-20 h-20'>
      <nav className='flex flex-row items-center pt-3 justify-between'>
        {/* Logo - Left Side */}
        <div className='flex w-1/4 ml-2 flex-row'>
          <Logo />
        </div>

        {/* NavLinks */}
        <div className='mr-8 flex flex-row items-center justify-center gap-x-3'>
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