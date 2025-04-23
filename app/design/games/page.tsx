'use client'
// import DefaultButton from '@/components/buttons/DefaultButton'
// import { WordPairings } from '@/lib/zod/edit/editWordPairs.schema'
// import { useEffect, useState } from 'react'

// // This will come in as the initial state
// const dummyContent = [
//   { wordOne: 'hack', wordTwo: 'kcah' },
//   { wordOne: 'achievement', wordTwo: 'ivnhcmaeeet' },
//   { wordOne: 'apologized', wordTwo: 'eiozoladpg' },
//   { wordOne: 'attention', wordTwo: 'otntnteia' },
//   { wordOne: 'audience', wordTwo: 'ecudinea' },
//   { wordOne: 'confidence', wordTwo: 'eedcinocnf' },
//   { wordOne: 'embarrassed', wordTwo: 'sadasmreebr' },
//   { wordOne: 'realized', wordTwo: 'laedzeir' },
//   { wordOne: 'talents', wordTwo: 'ntsaetl' }
// ]

export default function GamesDesignPage() {
//   const [content, setContent] = useState<WordPairings | null>(dummyContent)
//   const [metaData, setMetaData] = useState({
//     title: 'Unscramble Words Test',
//     contentType: 'unscrambleWordsGame'
//   })
//   const [currentWordIndex, setCurrentWordIndex] = useState(0)
//   const [currentLetterIndex, setCurrentLetterIndex] = useState(0)
//   const [clickedIndexes, setClickedIndexes] = useState<number[]>([])

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

//   useEffect(() => {
//     if (currentLetterIndex === content[currentWordIndex].wordOne.length) {
//       setCurrentWordIndex(currentWordIndex => currentWordIndex + 1)
//       setClickedIndexes([])
//       setCurrentLetterIndex(0)
//     }
//   }, [currentLetterIndex, setCurrentWordIndex])

  return (
    <section className='m-4'>
      {/* Selection Top Panel */}
      <div className='container-border container-background my-2 flex h-16 flex-row'>
        <div className='flex flex-row p-2'>
          <p>Timer</p>
        </div>
      </div>

      {/* Game Container */}
      {/* <div className='container-border container-background flex h-40 flex-row gap-1 p-4'>
        {content[currentWordIndex].wordOne
          .split('')
          .map((letter, letterIndex) => (
            <div
              className={`${letterIndex >= currentLetterIndex && 'hidden'} page-background button-border hover-effect flex h-12 w-12 flex-row items-center justify-center p-1`}
              key={`${letterIndex}-${letter}`}
            >
              <p className='large-text'>{letter}</p>
            </div>
          ))}
      </div>

      <div className='container-border container-background flex h-40 flex-row gap-1 p-4'>
        {content[currentWordIndex].wordTwo
          .split('')
          .map((letter, letterIdx) => (
            <DefaultButton
              customClasses={`${clickedIndexes.includes(letterIdx) ? 'page-background' : 'primary-background'} w-12 h-12 p-1 button-border hover-effect`}
              key={`${letterIdx}-${letter}`}
              handleClick={() =>
                handleClickLetter({ letter, clickedLetterIndex: letterIdx })
              }
              isDisabled={clickedIndexes.includes(letterIdx)}
            >
              <p className='button-text large-text'>{letter}</p>
            </DefaultButton>
          ))}
      </div> */}
    </section>
  )
}
