// 'use client'
// import DefaultButton from '@/components/buttons/DefaultButton'
// import { WordPairings } from '@/lib/zod/edit/editWordPairs.schema'
// import { useState } from 'react'
// import IconCheckCircle from '../icons/IconCheckCircle'

// interface UnscrambleWordsPlayerProps {
//   content: WordPairings
// }

// export default function UnscrambleWordsPlayer({
//   content
// }: UnscrambleWordsPlayerProps) {
//   const [gameContent, setGameContent] = useState<WordPairings | null>(content)

//   // Eventually, this can be built using a reducer
//   const [currentWordIndex, setCurrentWordIndex] = useState(0)
//   const [currentLetterIndex, setCurrentLetterIndex] = useState(0)
//   const [clickedIndexes, setClickedIndexes] = useState<number[]>([])

//   // Add proper error handling here
//   if (!gameContent) {
//     return <p>Error loading player component</p>
//   }

//   const handleClickLetter = ({
//     letter,
//     clickedLetterIndex
//   }: {
//     letter: string
//     clickedLetterIndex: number
//   }) => {
//     const correctWordArray = gameContent[currentWordIndex].wordOne.split('')
//     const scrambledWordArray = gameContent[currentWordIndex].wordTwo.split('')

//     const expectedLetter = correctWordArray[currentLetterIndex]

//     if (letter === expectedLetter) {
//       setClickedIndexes([...clickedIndexes, clickedLetterIndex])
//       setCurrentLetterIndex(currentLetterIndex => currentLetterIndex + 1)
//     }

//     // console.log('correctWordArray: ', correctWordArray)
//     // console.log('scrambledWordArray: ', scrambledWordArray)
//     // console.log('expectedLetter: ', expectedLetter)
//     // console.log('clickedIndexes', clickedIndexes)

//     /*
//       So this will have to take the letter index and letter and check if the LETTER matches the expected letter
//       The issue is that sometimes there will be multiples of the same letter, but we want to blur out the letter clicked
//     */
//   }

//   const nextWord = () => {
//     if (currentLetterIndex === gameContent[currentWordIndex].wordOne.length) {
//       setCurrentWordIndex(currentWordIndex => currentWordIndex + 1)
//       setClickedIndexes([])
//       setCurrentLetterIndex(0)
//     }
//   }

//   return (
//     <div className='container-border container-background flex w-full flex-col gap-1 p-4 items-center'>
//       {/* Score Container */}
//       <div className='flex h-16 flex-row gap-2'>
//         <p className='subheader paragraph-text'>Score:</p>
//         <p className='subheader'>11</p>
//       </div>

//       {/* Game Container */}
//       <div className='flex h-20 flex-row gap-2'>
//         {gameContent[currentWordIndex].wordOne
//           .split('')
//           .map((letter, letterIndex) => (
//             <div
//               className={`${letterIndex >= currentLetterIndex && 'hidden'} flex h-12 w-2 flex-row items-center justify-center p-1`}
//               key={`${letterIndex}-${letter}`}
//             >
//               <p className='header'>{letter}</p>
//             </div>
//           ))}
//       </div>

//       <div className='flex h-32 flex-col gap-8 items-center'>
//         <div className='flex flex-row gap-2'>
//           {gameContent[currentWordIndex].wordTwo
//             .split('')
//             .map((letter, letterIdx) => (
//               <DefaultButton
//                 customClasses={`${clickedIndexes.includes(letterIdx) ? 'page-background' : 'primary-background'} w-12 h-12 p-1 button-border hover-effect`}
//                 key={`${letterIdx}-${letter}`}
//                 handleClick={() =>
//                   handleClickLetter({ letter, clickedLetterIndex: letterIdx })
//                 }
//                 isDisabled={clickedIndexes.includes(letterIdx)}
//               >
//                 <p className='button-text subheader'>{letter}</p>
//               </DefaultButton>
//             ))}
//         </div>
//         {/* Next Word Button */}
//         <div>
//           {currentLetterIndex ===
//             gameContent[currentWordIndex].wordOne.length && (
//             <DefaultButton handleClick={nextWord}>
//               <IconCheckCircle classes='h-12 w-12 tertiary-text' />
//             </DefaultButton>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }
