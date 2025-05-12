'use client'
import DefaultButton from '@/components/buttons/DefaultButton'
import { useEffect, useReducer, SetStateAction } from 'react'
// import { useSoundPlayer } from '@/lib/hooks/useSoundPlayer'
import { useTheme } from 'next-themes'
import GamePlayerContainer from '@/components/containers/GamePlayerContainer'
import { memoryGameReducer } from '@/lib/utils/game-utils/memoryGameReducer'
import { WordPairings } from '@/lib/zod/edit/editWordPairs.schema'
import { WordPairingWithIds } from '@/lib/utils/game-utils/memoryGameReducer'
import MemoryCard from './MemoryCard'

interface MemoryPlayerProps {
  content: WordPairings
  playerNumber: number
  isReset: boolean
  gameIsStarted: boolean
  isBlurred: number[]
  setIsBlurred: React.Dispatch<SetStateAction<number[]>>
  isFullScreen: boolean
  numOfPlayers: number[]
}

export default function MemoryPlayer({
  content,
  playerNumber,
  isReset,
  gameIsStarted,
}: MemoryPlayerProps) {
  // const { play: playCorrect } = useSoundPlayer('correct', 0.8)
  // const { play: playBonus } = useSoundPlayer('multiply', 0.4)
  // const { play: playBlur } = useSoundPlayer('swoosh', 0.6)

  const { theme } = useTheme()
  const [{ gameContent, gameStarted, currentWords }, dispatch] =
    useReducer(memoryGameReducer, {
      generatedContent: content,
      gameContent: null,
      gameStarted: false,
      completedWords: [],
      currentWords: []
    })

  useEffect(() => {
    dispatch({ type: 'RESET_GAME' })
  }, [isReset, content])

  const startGame = () => {
    dispatch({ type: 'START_GAME' })
  }

  const handleClickWord = (word: WordPairingWithIds) => {
    dispatch({ type: 'CLICK_WORD', payload: word })
  }

  useEffect(() => {
    if (currentWords.length === 2) {
      const timer = setTimeout(
        () => dispatch({ type: 'HIDE_MISMATCHED' }),
        1000
      )
      return () => clearTimeout(timer)
    }
  }, [currentWords])

  // Add proper error handling here
  if (!content || !theme) {
    return <p>Error loading player component</p>
  }

  return (
    <>
      {gameStarted ? (
        <GamePlayerContainer playerNumber={playerNumber}>
          {/* Game Container */}
          <div className='mt-6 h-full w-full'>
            <div className='grid h-full w-full grid-cols-4'>
              {gameContent?.map((wordObj, wordIndex) => (
                <MemoryCard
                  front={wordIndex + 1}
                  wordObj={wordObj}
                  key={`word-${wordObj.word}-${wordIndex}}`}
                  currentWords={currentWords}
                  handleClickWord={handleClickWord}
                />
              ))}
            </div>
          </div>
        </GamePlayerContainer>
      ) : (
        <GamePlayerContainer playerNumber={playerNumber}>
          <div className='flex h-full flex-col items-center justify-center'>
            <DefaultButton
              handleClick={startGame}
              isDisabled={!gameIsStarted}
              customClasses={`w-32 h-10 p-1 button-border ${gameIsStarted ? 'tertiary-background' : 'page-background'}`}
            >
              <p className='subheader button-text'>Start</p>
            </DefaultButton>
          </div>
        </GamePlayerContainer>
      )}
    </>
  )
}
