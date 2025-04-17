'use client'
// import { useState} from 'react'
import { WordPairings } from '@/lib/zod/edit/editWordPairs.schema'
import { EditMetaDataProps } from '@/types/input.types'
import DefaultButton from '../buttons/DefaultButton'
import IconFullscreen from '../icons/IconFullscreen'
import { useFullscreen } from '@/lib/hooks/useFullscreen'

interface EditPairsFormProps {
  generatedContent: WordPairings
  metaData: EditMetaDataProps
}

const UnscrambleWords = ({
  generatedContent,
  metaData
}: EditPairsFormProps) => {
  // const [isLoading, setIsLoading] = useState<boolean>(false)
  // const [error, setError] = useState<string | null>(null)
  const { containerRef, toggleFullScreen } =
    useFullscreen<HTMLDivElement>()

  /*
    Left off here

    plan is to continue using existing input system and simply change the edit components to game components with a reset

    Inputs:

    Component should:
      -Prepare the words in state with a view count
        -This should be done after selecting player number
      
      -Keep score by the number of letters in a word completed

      Setup:
        -Have a one, two, three, four player split screen option (for whiteboards)
        -Have a target score selector (25, 50, 75, 100, 150)

      Display:
        -Have a score at the top for each player
        -Have a full screen option

      Styling:
        -Using the w
  */

  console.log('generatedContent in UnscrambleWords: ', generatedContent)
  console.log('metaData in UnscrambleWords: ', metaData)

  return (
    <section className='container-background flex h-full flex-col rounded-lg'>
      <div className='flex'>
        <p className='z-10 w-[180px] border-b-2 border-sky-500 py-2 text-center'>
          Unscrable Words
        </p>
      </div>
      <div
        ref={containerRef}
        className='container-background relative z-0 -my-[2px] flex h-screen border-b-2 border-zinc-600'
      >
        <p>SS</p>
        <DefaultButton handleClick={toggleFullScreen}>
          <IconFullscreen classes='h-6 w-6 primary-text' />
        </DefaultButton>
      </div>
    </section>
  )
}

export default UnscrambleWords
