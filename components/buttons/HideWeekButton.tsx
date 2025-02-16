import React, { useMemo } from 'react'
import IconEye from '../icons/IconEye'
import IconEyeSlash from '../icons/IconEyeSlash'
import DefaultButton from './DefaultButton'
import {
  VocabWeek,
  SpellingWeek
} from '@/lib/constants/curriculum/curriculumSelectorValues'

type Props = {
  weekItem: SpellingWeek | VocabWeek
  wordsToFilter: string[]
  setWordsToFilter: React.Dispatch<React.SetStateAction<string[]>>
}

const HideWeekButton: React.FC<Props> = ({
  weekItem,
  wordsToFilter,
  setWordsToFilter
}) => {
  // Gets a string array of weekItem words, useMemo prevents unnecessary remapping
  const weekWords = useMemo(
    () => weekItem.words.map(word => word.answer),
    [weekItem.words]
  )

  const updateFilter = (shouldFilter: boolean) => {
    // Gets words from other weeks
    const otherWeeksWords = wordsToFilter.filter(
      word => !weekWords.includes(word)
    )

    // if shouldFilter adds all this weekItem and other weeks, if not only otherWeeks
    setWordsToFilter(
      shouldFilter ? [...otherWeeksWords, ...weekWords] : otherWeeksWords
    )
  }

  return (
    <div className='paragraph-text flex items-center gap-1 hover:cursor-pointer'>
      <DefaultButton
        customClasses='muted-transition-effect'
        handleClick={() => updateFilter(false)}
      >
        <IconEye classes='w-4 h-4' />
      </DefaultButton>
      <DefaultButton
        customClasses='muted-transition-effect'
        handleClick={() => updateFilter(true)}
      >
        <IconEyeSlash classes='w-4 h-4' />
      </DefaultButton>
    </div>
  )
}

export default HideWeekButton
