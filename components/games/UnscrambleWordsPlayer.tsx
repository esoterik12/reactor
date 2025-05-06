'use client'
import DefaultButton from '@/components/buttons/DefaultButton'
import { WordPairings } from '@/lib/zod/edit/editWordPairs.schema'
import { useRef, useEffect, useReducer } from 'react'
import { useSoundPlayer } from '@/lib/hooks/useSoundPlayer'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import ScoreDisplay from './ScoreDisplay'
import { unscrambleWordsReducer } from '@/lib/utils/game-utils/unscrambleWordsReducer'
import NextButton from './NextButton'
import GamePlayerContainer from '../containers/GamePlayerContainer'

interface UnscrambleWordsPlayerProps {
  content: WordPairings
  playerNumber: number
  isReset: boolean
}

export default function UnscrambleWordsPlayer({
  content,
  playerNumber,
  isReset
}: UnscrambleWordsPlayerProps) {
  const { play: playCorrect } = useSoundPlayer('correct')
  const { theme } = useTheme()
  const [
    {
      currentWordIndex,
      clickedIndexes,
      currentLetterIndex,
      score,
      gameContent
    },
    dispatch
  ] = useReducer(unscrambleWordsReducer, {
    currentWordIndex: 0,
    currentLetterIndex: 0,
    clickedIndexes: [],
    score: 0,
    gameContent: content
  })

  // useEffect to reset everything if timer reset is clicked
  useEffect(() => {
    dispatch({ type: 'RESET_GAME', payload: content })
  }, [isReset, content])

  // useRef is used here to avoid an issue with two fast double clicks
  const loadingRef = useRef(false)

  // Add proper error handling here
  if (!content || !theme) {
    return <p>Error loading player component</p>
  }

  const handleClickLetter = ({
    letter,
    clickedLetterIndex
  }: {
    letter: string
    clickedLetterIndex: number
  }) => {
    dispatch({ type: 'CLICK_LETTER', payload: { letter, clickedLetterIndex } })
  }

  const nextWord = () => {
    if (loadingRef.current) return
    loadingRef.current = true
    playCorrect()
    dispatch({ type: 'NEXT_WORD' })
  }

  return (
    <GamePlayerContainer playerNumber={playerNumber}>
      {/* Top Half */}
      <div>
        {/* Score Container */}
        <ScoreDisplay score={score} />

        {/* Completed Letters Display */}
        <div className='flex h-24 w-full flex-row items-center justify-center'>
          {gameContent[currentWordIndex].wordOne
            .split('')
            .map((letter, letterIndex) => (
              <p
                key={`${letterIndex}-${letter}`}
                className={`${letterIndex >= currentLetterIndex && 'hidden'} header-largest flex flex-row items-center justify-center`}
              >
                {letter}
              </p>
            ))}
        </div>
      </div>

      {/* Bottom Half */}
      <div className='flex h-56 w-full flex-col items-center justify-center'>
        {/* Current Scrambled Word Input Buttons */}
        <div className='flex h-40 w-full flex-col items-center justify-center'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={gameContent[currentWordIndex].wordTwo} // changes for each word
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.14 }}
              className='flex flex-row flex-wrap items-center justify-center gap-2'
            >
              {gameContent[currentWordIndex].wordTwo
                .split('')
                .map((letter, letterIdx) => (
                  <DefaultButton
                    customClasses={`${clickedIndexes.includes(letterIdx) ? 'page-background' : 'primary-background'} h-14 w-14 header p-1 button-border hover-effect`}
                    key={`${letterIdx}-${letter}`}
                    handleClick={() =>
                      handleClickLetter({
                        letter,
                        clickedLetterIndex: letterIdx
                      })
                    }
                    isDisabled={clickedIndexes.includes(letterIdx)}
                  >
                    <p className='button-text'>{letter}</p>
                  </DefaultButton>
                ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Next Word Button */}
        <div className='flex h-20 w-full flex-row items-center justify-center'>
          <NextButton
            nextFn={nextWord}
            displayCondition={
              currentLetterIndex ===
              gameContent[currentWordIndex].wordOne.length
            }
            isLoadingRef={loadingRef}
          />
        </div>
      </div>
    </GamePlayerContainer>
  )
}
