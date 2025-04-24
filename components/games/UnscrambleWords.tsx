// 'use client'
// // import { useState} from 'react'
// import { WordPairings } from '@/lib/zod/edit/editWordPairs.schema'
// import { EditMetaDataProps } from '@/types/input.types'
// import DefaultButton from '../buttons/DefaultButton'
// import IconFullscreen from '../icons/IconFullscreen'
// import { useFullscreen } from '@/lib/hooks/useFullscreen'

// interface EditPairsFormProps {
//   generatedContent: WordPairings
//   metaData: EditMetaDataProps
// }

// const UnscrambleWords = ({
//   generatedContent,
//   metaData
// }: EditPairsFormProps) => {
//   // const [isLoading, setIsLoading] = useState<boolean>(false)
//   // const [error, setError] = useState<string | null>(null)
//   const { containerRef, toggleFullScreen } =
//     useFullscreen<HTMLDivElement>()

//   /*
//     Left off here

//     plan is to continue using existing input system and simply change the edit components to game components with a reset

//     Inputs:

//       Component should:
//         -Prepare the words in state with a view count
//           -This should be done after selecting player/team number
        
//         -Keep score by the number of letters in a word completed

//         Setup:
//           -Have a one, two, three, four player split screen option (for whiteboards)
//             -Default to one player
//           -Select a time limit (30 seconds, 60, 120)

//         Display:
//           -Timer
//           -Have a score at the top for each player
//           -Have a full screen option
//           -Columns for each team with: scores at the top, current word, reset at the bottom

//         Styling:
//           -Using blues and oranges
//           -Thing grey line down the middle
//           -Use Icons for:
//             -Players/teams
//             -Timer
//             -Animated floating up star for correct

//       Reusable Components:
//         -Score
//         -Player/team select
//         -GameButton (this could be an extension of DefaultButton)
//         -Fullscreen Button
//         -Reset Button
//         -PlaySound (this should play a juingle or a buzzer - with prop text to select)

//       -Process:
//         1. Create some dummy data in a test page
//           -This should be a data sctructure that models generatedContent and metaData
//         2. Build visual design
//         3. Build dummy interactivity (buttons, scores, timers, etc)

//   */

//   console.log('generatedContent in UnscrambleWords: ', generatedContent)
//   console.log('metaData in UnscrambleWords: ', metaData)

//   return (
//     <section className='container-background flex h-full flex-col rounded-lg'>
//       <div className='flex'>
//         <p className='z-10 w-[180px] border-b-2 border-sky-500 py-2 text-center'>
//           Unscrable Words
//         </p>
//       </div>
//       <div
//         ref={containerRef}
//         className='container-background relative z-0 -my-[2px] flex h-screen border-b-2 border-zinc-600'
//       >
//         <p>SS</p>
//         <DefaultButton handleClick={toggleFullScreen}>
//           <IconFullscreen classes='h-6 w-6 primary-text' />
//         </DefaultButton>
//       </div>
//     </section>
//   )
// }

// export default UnscrambleWords
