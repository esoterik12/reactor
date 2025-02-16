'use client'
import {
  SpellingWeek,
  VocabWeek
} from '@/lib/constants/curriculum/curriculumSelectorValues'
import React, { SetStateAction } from 'react'
import { motion } from 'framer-motion'
import HideWeekButton from '../buttons/HideWeekButton'

type Props = {
  weekItem: SpellingWeek | VocabWeek
  wordsToFilter: string[]
  setWordsToFilter: React.Dispatch<SetStateAction<string[]>>
  weekName: string
  weekSelected: boolean
  title: React.ReactNode
  columnNumber: 1 | 2
}

const WeekWordsContainer = ({
  weekItem,
  wordsToFilter,
  setWordsToFilter,
  weekName,
  weekSelected,
  title,
  columnNumber
}: Props) => {
  const handleFilterToggle = (clickedWord: string) => {
    const currentWordsToFilter = [...wordsToFilter]

    if (currentWordsToFilter.includes(clickedWord)) {
      setWordsToFilter(
        currentWordsToFilter.filter(word => word !== clickedWord)
      )
    } else {
      setWordsToFilter([...currentWordsToFilter, clickedWord])
    }
  }

  return (
    <>
      {weekItem.week && weekSelected && (
        <motion.div
          layout
          key={`spelling-week-${weekItem.week}`}
          className='border-color h-[244px] rounded border p-2'
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 25 }}
          transition={{
            layout: { type: 'spring', stiffness: 450, damping: 35 },
            opacity: { duration: 0.4, ease: 'easeInOut' },
            y: { duration: 0.35, ease: 'easeInOut' }
          }}
        >
          <div className='mb-2 flex flex-row items-center justify-between'>
            <h4 className='text-sm font-medium'>
              {title}
              {weekName}
            </h4>
            <HideWeekButton
              weekItem={weekItem}
              wordsToFilter={wordsToFilter}
              setWordsToFilter={setWordsToFilter}
            />
          </div>

          <div className={`grid grid-cols-${columnNumber}`}>
            {weekItem.words.map((word, spIndex) => (
              <button
                key={`${word.answer}-${spIndex}`}
                className='paragraph-text flex items-start text-sm'
                onClick={() => handleFilterToggle(word.answer)}
              >
                <p
                  className={
                    wordsToFilter.includes(word.answer)
                      ? 'text-zinc-300 dark:text-zinc-600'
                      : ''
                  }
                >
                  {word.answer.toLowerCase()}
                </p>
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </>
  )
}

export default WeekWordsContainer
