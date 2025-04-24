import React from 'react'


const page = () => {
  return (
    <div>page</div>
  )
}

export default page

// 'use client'
// import DefaultButton from '@/components/buttons/DefaultButton'
// import UnscrambleWordsPlayer from '@/components/games/UnscrambleWordsPlayer'
// import { WordPairings } from '@/lib/zod/edit/editWordPairs.schema'
// import { useEffect, useState } from 'react'

// // This will come in as the initial state
// const dummyContent = [
//   { wordOne: 'hack', wordTwo: 'kcah' },
//   { wordOne: 'slip', wordTwo: 'plis' },
//   { wordOne: 'talents', wordTwo: 'ntsaetl' },
//   { wordOne: 'achievement', wordTwo: 'ivnhcmaeeet' },
//   { wordOne: 'apologized', wordTwo: 'eiozoladpg' },
//   { wordOne: 'attention', wordTwo: 'otntnteia' },
//   { wordOne: 'audience', wordTwo: 'ecudinea' },
//   { wordOne: 'confidence', wordTwo: 'eedcinocnf' },
//   { wordOne: 'embarrassed', wordTwo: 'sadasmreebr' },
//   { wordOne: 'realized', wordTwo: 'laedzeir' }
// ]

// export default function GamesDesignPage() {
//   const [content, setContent] = useState<WordPairings | null>(dummyContent)
//   const [metaData, setMetaData] = useState({
//     title: 'Unscramble Words Test',
//     contentType: 'unscrambleWordsGame'
//   })

//   // Eventually, this can be built using a reducer
//   const [numOfPlayers, setNumOfPlayers] = useState<number[]>([1])
//   const [currentWordIndex, setCurrentWordIndex] = useState(0)
//   const [currentLetterIndex, setCurrentLetterIndex] = useState(0)
//   const [clickedIndexes, setClickedIndexes] = useState<number[]>([])

//   // Add proper error handling here
//   if (!content) {
//     return
//   }

//   const handleClickLetter = ({
//     letter,
//     clickedLetterIndex
//   }: {
//     letter: string
//     clickedLetterIndex: number
//   }) => {
//     const correctWordArray = content[currentWordIndex].wordOne.split('')
//     const scrambledWordArray = content[currentWordIndex].wordTwo.split('')

//     const expectedLetter = correctWordArray[currentLetterIndex]

//     if (letter === expectedLetter) {
//       setClickedIndexes([...clickedIndexes, clickedLetterIndex])
//       setCurrentLetterIndex(currentLetterIndex => currentLetterIndex + 1)
//     }

//     console.log('correctWordArray: ', correctWordArray)
//     console.log('scrambledWordArray: ', scrambledWordArray)
//     console.log('expectedLetter: ', expectedLetter)
//     console.log('clickedIndexes', clickedIndexes)

//     /*
//       So this will have to take the letter index and letter and check if the LETTER matches the expected letter
//       The issue is that sometimes there will be multiples of the same letter, but we want to blur out the letter clicked
//     */
//   }

//   const toggleNumOfPlayers = (num: 1 | 2) => {
//     setNumOfPlayers(Array.from({ length: num }, (_, i) => i + 1))
//   }

//   useEffect(() => {
//     if (currentLetterIndex === content[currentWordIndex].wordOne.length) {
//       setCurrentWordIndex(currentWordIndex => currentWordIndex + 1)
//       setClickedIndexes([])
//       setCurrentLetterIndex(0)
//     }
//   }, [currentLetterIndex, setCurrentWordIndex])

//   return (
//     <section className='m-4'>
//       {/* Selection Top Panel */}
//       <div className='container-border container-background my-2 flex h-16 flex-row'>
//         <div className='flex flex-row p-2'>
//           <p>Timer</p>
//         </div>
//         <div className='flex flex-row gap-2 p-2'>
//           <p>Number of Players</p>
//           <DefaultButton
//             handleClick={() => toggleNumOfPlayers(1)}
//             customClasses={`${numOfPlayers.length === 1 ? 'secondary-background' : 'page-background hover-effect'} w-12 h-12 p-1 button-border`}
//           >
//             <p>1</p>
//           </DefaultButton>
//           <DefaultButton
//             handleClick={() => toggleNumOfPlayers(2)}
//             customClasses={`${numOfPlayers.length === 2 ? 'secondary-background' : 'page-background hover-effect'} w-12 h-12 p-1 button-border`}
//           >
//             <p>2</p>
//           </DefaultButton>
//         </div>
//       </div>

//       {/* Game Container */}
//       <div className='flex w-full gap-8 flex-row'>
//         {numOfPlayers.map((player, playerIndex) => (
//           <UnscrambleWordsPlayer
//             key={`player-${playerIndex}-comp`}
//             content={content}
//           />
//         ))}
//       </div>
//     </section>
//   )
// }
