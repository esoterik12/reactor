'use client'
// import { useState} from 'react'
import { WordPairings } from '@/lib/zod/edit/editWordPairs.schema'
import { EditMetaDataProps } from '@/types/input.types'
import DefaultButton from '../buttons/DefaultButton'
import IconFullscreen from '../icons/IconFullscreen'
import { useFullscreen } from '@/lib/hooks/useFullscreen'
import GameTimer from '@/components/games/GameTimer'
import UnscrambleWordsPlayer from '@/components/games/UnscrambleWordsPlayer'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface EditPairsFormProps {
  generatedContent: WordPairings
  metaData?: EditMetaDataProps
}

const UnscrambleWordsGame = ({
  generatedContent,
}: EditPairsFormProps) => {
  const { containerRef, toggleFullScreen, isFullscreen } =
    useFullscreen<HTMLDivElement>()
  const [numOfPlayers, setNumOfPlayers] = useState<number[]>([1])
  const [isReset, setIsReset] = useState(false)

  const toggleNumOfPlayers = (num: 1 | 2) => {
    setNumOfPlayers(Array.from({ length: num }, (_, i) => i + 1))
  }

  useEffect(() => {
    setIsReset(false)
  }, [isReset, setIsReset])

  return (
    <section
      className={`${isFullscreen && 'p-4'} page-background flex flex-col justify-between`}
      ref={containerRef}
    >
      {/* Selection Top Panel */}
      <div className={`container-background container-border flex h-1/6 flex-row justify-between`}>
        <div className='ml-2 flex flex-row p-2'>
          <GameTimer parentResetFunction={setIsReset} />
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
      <motion.div layout className='mt-2 flex h-5/6 w-full flex-row gap-2'>
        {numOfPlayers.map((_, playerIndex) => (
          <UnscrambleWordsPlayer
            key={`player-${playerIndex}-comp`}
            playerNumber={playerIndex + 1}
            content={generatedContent}
            isReset={isReset}
          />
        ))}
      </motion.div>
    </section>
  )
}

export default UnscrambleWordsGame
