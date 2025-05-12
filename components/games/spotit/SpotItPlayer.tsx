'use client'
import DefaultButton from '@/components/buttons/DefaultButton'
import { useRef, useEffect, useReducer, SetStateAction } from 'react'
import { useSoundPlayer } from '@/lib/hooks/useSoundPlayer'
import { useTheme } from 'next-themes'
import ScoreDisplay from '../ScoreDisplay'
import { SpotItWord } from '@/types/games.types'
import { spotItReducer } from '@/lib/utils/game-utils/spotItReducer'
import NextButton from '../NextButton'
import GamePlayerContainer from '@/components/containers/GamePlayerContainer'
import BlurOpponent from './BlurOpponent'
import ScatterText from './ScatterText'
import BonusPointsButton from '../BonusPointsButton'

interface SpotItPlayerProps {
  content: SpotItWord[]
  playerNumber: number
  isReset: boolean
  gameIsStarted: boolean
  isBlurred: number[]
  setIsBlurred: React.Dispatch<SetStateAction<number[]>>
  isFullScreen: boolean
  numOfPlayers: number[]
}

export default function SpotItPlayer({
  content,
  playerNumber,
  isReset,
  gameIsStarted,
  isBlurred,
  setIsBlurred,
  isFullScreen,
  numOfPlayers
}: SpotItPlayerProps) {
  const { play: playCorrect } = useSoundPlayer('correct', 0.8)
  const { play: playBonus } = useSoundPlayer('multiply', 0.4)
  const { play: playBlur } = useSoundPlayer('swoosh', 0.6)

  const { theme } = useTheme()
  const [
    { gameContent, score, gameStarted, matchedWord, perfectStreak },
    dispatch
  ] = useReducer(spotItReducer, {
    score: 0,
    gameContent: content,
    gameStarted: false,
    matchedWord: null,
    perfectStreak: 0
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
    dispatch({ type: 'START_GAME', payload: gameContent })
  }

  const handleClickWord = ({ clickedWord }: { clickedWord: SpotItWord }) => {
    if (matchedWord) return
    dispatch({ type: 'CLICK_WORD', payload: clickedWord })
  }

  const handleNextWord = () => {
    if (loadingRef.current) return
    loadingRef.current = true
    playCorrect()
    dispatch({ type: 'NEXT_WORD' })
  }

  const handleBlurOpponent = () => {
    const opponent = playerNumber === 1 ? 2 : 1
    setIsBlurred(prev => (prev.includes(opponent) ? prev : [...prev, opponent]))
    playBlur()
    dispatch({ type: 'RESET_STREAK' })
    setTimeout(() => {
      setIsBlurred(prev => prev.filter(p => p !== opponent))
    }, 5000)
  }

  const handleBonusPoints = () => {
    if (loadingRef.current) return
    loadingRef.current = true
    playBonus()
    dispatch({ type: 'ADD_BONUS_POINTS' })
    dispatch({ type: 'RESET_STREAK' })
  }

  return (
    <>
      {gameStarted ? (
        <GamePlayerContainer playerNumber={playerNumber}>
          <div className='h-full w-full'>
            {/* Score Container */}
            <ScoreDisplay score={score} streak={perfectStreak} />

            {/* Scattered Words Display */}
            <ScatterText
              items={gameContent}
              playerNumber={playerNumber}
              handleClickWord={handleClickWord}
              matchedWord={matchedWord}
              isBlurred={isBlurred}
              isFullScreen={isFullScreen}
              numOfPlayers={numOfPlayers}
            />

            {/* Action Buttons Button */}
            <div className='flex h-[14%] w-full flex-row items-center justify-center'>
              <div className='w-20'>
                <BlurOpponent
                  handleBlurOpponent={handleBlurOpponent}
                  displayCondition={
                    perfectStreak >= 10 && numOfPlayers.length > 1
                  }
                  isLoadingRef={loadingRef}
                />
              </div>
              <div className='w-20'>
                <NextButton
                  nextFn={handleNextWord}
                  displayCondition={!!matchedWord}
                  isLoadingRef={loadingRef}
                />
              </div>
              <div className='w-20'>
                <BonusPointsButton
                  bonusPointsFn={handleBonusPoints}
                  displayCondition={perfectStreak >= 10}
                  isLoadingRef={loadingRef}
                />
              </div>
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
