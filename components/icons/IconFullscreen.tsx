export default function IconFullscreen({ classes }: { classes: string }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      className={ classes }
    >
      <path d='M8 3H5a2 2 0 0 0-2 2v3' />
      <path d='M21 8V5a2 2 0 0 0-2-2h-3' />
      <path d='M3 16v3a2 2 0 0 0 2 2h3' />
      <path d='M16 21h3a2 2 0 0 0 2-2v-3' />
    </svg>
  )
}
