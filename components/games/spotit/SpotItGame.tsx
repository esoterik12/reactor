'use client'
import { EditMetaDataProps } from '@/types/input.types'
import DefaultButton from '@/components/buttons/DefaultButton'
import { useFullscreen } from '@/lib/hooks/useFullscreen'
import GameTimer from '@/components/games/GameTimer'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import IconFullscreen from '@/components/icons/IconFullscreen'
import SpotItPlayer from './SpotItPlayer'
import { SpotItWord } from '@/types/games.types'

interface SpotItGameProps {
  generatedContent: { data: SpotItWord[] }
  metaData?: EditMetaDataProps
}

const SpotItGame = ({ generatedContent }: SpotItGameProps) => {
  const { containerRef, toggleFullScreen, isFullscreen } =
    useFullscreen<HTMLDivElement>()

  const [numOfPlayers, setNumOfPlayers] = useState<number[]>([1])
  const [isReset, setIsReset] = useState(false)
  const [gameIsStarted, setGameIsStarted] = useState(false)
  const [isBlurred, setIsBlurred] = useState<number[]>([])

  const toggleNumOfPlayers = (num: 1 | 2) => {
    setNumOfPlayers(Array.from({ length: num }, (_, i) => i + 1))
  }

  useEffect(() => {
    setIsReset(false)
    setGameIsStarted(false)
  }, [isReset, setIsReset])

  return (
    <section
      className={`${isFullscreen && 'p-4'} h-full page-background flex flex-col`}
      ref={containerRef}
    >
      {/* Selection Top Panel */}
      <div
        className={`container-background container-border flex flex-row justify-between`}
      >
        <div className='ml-2 flex flex-row p-2'>
          <GameTimer
            parentResetFunction={setIsReset}
            parentStartFucntion={setGameIsStarted}
          />
        </div>
        <div className='mr-1 flex flex-row items-center gap-2 p-2'>
          <DefaultButton
            handleClick={() => toggleNumOfPlayers(1)}
            customClasses={`${numOfPlayers.length === 1 ? 'secondary-background' : 'page-background hover-effect'} w-32 h-10 p-1 button-border`}
          >
            <p className='button-text subheader'>1 Player</p>
          </DefaultButton>
          <DefaultButton
            handleClick={() => toggleNumOfPlayers(2)}
            customClasses={`${numOfPlayers.length === 2 ? 'secondary-background' : 'page-background hover-effect'} w-32 h-10 p-1 button-border`}
          >
            <p className='button-text subheader'>2 Players</p>
          </DefaultButton>
          <DefaultButton handleClick={toggleFullScreen}>
            <IconFullscreen classes='h-10 w-10' />
          </DefaultButton>
        </div>
      </div>

      {/* Game Container */}
      <motion.div layout className='mt-2 h-screen flex w-full flex-row gap-2'>
        {numOfPlayers.map((_, playerIndex) => (
          <SpotItPlayer
            key={`player-${playerIndex}-comp`}
            playerNumber={playerIndex + 1}
            content={generatedContent.data}
            isReset={isReset}
            gameIsStarted={gameIsStarted}
            isBlurred={isBlurred}
            setIsBlurred={setIsBlurred}
            isFullScreen={isFullscreen}
            numOfPlayers={numOfPlayers}
          />
        ))}
      </motion.div>
    </section>
  )
}

export default SpotItGame
