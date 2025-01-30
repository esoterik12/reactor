import DefaultButton from './DefaultButton'
import IconInfo from '../icons/IconInfo'
import { MouseEventHandler } from 'react'

interface ContentInfoButtonProps {
  handleClick: MouseEventHandler<HTMLButtonElement> | (() => void)
}

const ContentInfoButton = ({ handleClick }: ContentInfoButtonProps) => {
  return (
    <DefaultButton handleClick={handleClick}>
      <IconInfo classes='h-5 w-5 primary-text mb-1' />
    </DefaultButton>
  )
}

export default ContentInfoButton
