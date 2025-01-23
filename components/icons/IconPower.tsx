export default function IconPower({
  classes,
  id,
  onClick
}: {
  classes: string
  id?: string
  onClick: () => void
}) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className={classes}
      onClick={onClick}
      id={id}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9'
      />
    </svg>
  )
}
