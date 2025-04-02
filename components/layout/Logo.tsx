import Link from 'next/link'
import IconLogo from '../icons/IconLogo'

const Logo = async () => {
  return (
    <div className='my-3 ml-6'>
      <Link
        href='/'
        className='flex flex-row items-center gap-1 text-xl tracking-wide'
      >
        <div className='flex w-72 flex-row items-center'>
          <IconLogo classes='h-9 w-9' />
          <p className='ml-2 subheader hidden md:block'>Classroom Reactor</p>
        </div>
      </Link>
    </div>
  )
}

export default Logo
