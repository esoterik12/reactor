import Link from 'next/link'
import IconLogo from '../icons/IconLogo'

const Logo = async () => {
  return (
    <div className='my-3 ml-4'>
      <Link
        href='/'
        className='flex flex-row items-center gap-1 text-xl tracking-wide'
      >
        <div className='flex w-60 flex-row items-center'>
          <IconLogo classes='h-8 w-8' />
          <p className='ml-2 hidden md:block'>Reactor</p>
        </div>
      </Link>
    </div>
  )
}

export default Logo
