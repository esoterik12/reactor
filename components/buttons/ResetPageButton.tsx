'use client'
import DefaultButton from './DefaultButton'
import IconReset from '../icons/IconReset'

type ResetPageButtonProps = {
  resetPage: () => void
}

const ResetPageButton = ({ resetPage }: ResetPageButtonProps) => {
  return (
    <div className='mr-1 mt-1 p-1'>
      <DefaultButton handleClick={resetPage}>
        <div className='flex flex-row gap-1'>
          <IconReset classes='h-6 w-6 paragraph-text transition-effect' />
        </div>
      </DefaultButton>
    </div>
  )
}

export default ResetPageButton
