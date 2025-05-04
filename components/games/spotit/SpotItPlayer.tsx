'use client'
import DefaultButton from '@/components/buttons/DefaultButton'
import { useRef, useEffect, useReducer, SetStateAction } from 'react'
import { useSoundPlayer } from '@/lib/hooks/useSoundPlayer'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import ScoreDisplay from '../ScoreDisplay'
import { SpotItWord } from '@/types/games.types'
import { spotItReducer } from '@/lib/utils/game-utils/spotItReducer'
import NextButton from '../NextButton'

interface UnscrambleWordsPlayerProps {
  content: SpotItWord[]
  playerNumber: number
  isReset: boolean
  gameIsStarted: boolean
  setGameIsStarted: React.Dispatch<SetStateAction<boolean>>
}

export default function SpotItPlayer({
  content,
  playerNumber,
  isReset,
  // gameIsStarted,
  setGameIsStarted
}: UnscrambleWordsPlayerProps) {
  const { play: playCorrect } = useSoundPlayer('correct')

  const { theme } = useTheme()
  const [{ gameContent, score, gameStarted, matchedWord }, dispatch] =
    useReducer(spotItReducer, {
      score: 0,
      gameContent: content,
      gameStarted: false,
      matchedWord: null
    })

  // useRef is used here to avoid an issue with two fast double clicks
  const loadingRef = useRef(false)

  useEffect(() => {
    dispatch({ type: 'RESET_GAME', payload: content })
  }, [isReset, content])

  // Add proper error handling here
  if (!content || !theme) {
    return <p>Error loading player component</p>
  }

  const startGame = () => {
    setGameIsStarted(true)
    dispatch({ type: 'START_GAME', payload: gameContent })
  }

  const handleClickWord = ({ clickedWord }: { clickedWord: SpotItWord }) => {
    dispatch({ type: 'CLICK_WORD', payload: clickedWord })
  }

  const handleNextWord = () => {
    if (loadingRef.current) return
    loadingRef.current = true
    playCorrect()
    dispatch({ type: 'NEXT_WORD' })
  }

  return (
    <>
      {gameStarted ? (
        <motion.div
          layout
          className='container-border container-background flex h-[70vh] w-full flex-col items-center justify-between gap-1 p-4'
          key={`player-number-${playerNumber}`}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 25 }}
          transition={{
            layout: { type: 'spring', stiffness: 456, damping: 45 },
            opacity: { duration: 0.4, ease: 'easeInOut' },
            y: { duration: 0.1, ease: 'easeOut' }
          }}
        >
          {/* Top Half */}
          <div className='h-full w-full border'>
            {/* Score Container */}
            <ScoreDisplay score={score} />

            {/* Scattered Words Display */}
            <div className='grid h-4/5 w-full grid-cols-4 flex-row items-center justify-center'>
              {gameContent.map(word => (
                <DefaultButton
                  key={`spotItWord1-${word.wordId}-${playerNumber}`}
                  handleClick={() => handleClickWord({ clickedWord: word })}
                  customClasses='w-36 h-10 p-1'
                >
                  <p
                    className={`${word.word === matchedWord ? 'tertiary-text' : 'transition-effect'} large-text`}
                  >
                    {word.word}
                  </p>
                </DefaultButton>
              ))}
            </div>

            {/* Next Word Button */}
            <div className='flex h-20 w-full flex-row items-center justify-center'>
              <NextButton
                nextFn={handleNextWord}
                displayCondition={!!matchedWord}
                isLoadingRef={loadingRef}
              />
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          layout
          key={`player-number-${playerNumber}`}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 25 }}
          transition={{
            layout: { type: 'spring', stiffness: 456, damping: 45 },
            opacity: { duration: 0.4, ease: 'easeInOut' },
            y: { duration: 0.1, ease: 'easeOut' }
          }}
          className='container-border container-background flex h-[70vh] w-full flex-col items-center justify-center gap-1 p-4'
        >
          <DefaultButton
            handleClick={startGame}
            customClasses='w-32 h-10 p-1 button-border tertiary-background'
          >
            <p className='subheader button-text'>Start</p>
          </DefaultButton>
        </motion.div>
      )}
    </>
  )
}
