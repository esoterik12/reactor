/*
This function takes the number of pairs for a chooseCorrectSpellingPDF
and the message input by the user and splits the message into parts
equal to the numberOfPairs
It also creates a (more or less plausible) alternativeMessageParts
that is used in the PDF as the wrong answer to each question

It then combines these correct and incorrect message segments into
and array with the correct and incorrect words
*/

import { AppError } from '@/lib/errors/AppError'
import { WordPairings } from '@/lib/zod/contentEdit.schema'

interface CreateSpellingMessagesParams {
  numberOfPairs: number
  secondaryInputContent: string
  wordPairings: WordPairings
}

interface CorrectWord {
  word: string
  correctMessage: string
}

interface IncorrectWord {
  word: string
  incorrectMessage: string
}

interface CombinedResult {
  correctWord: CorrectWord
  incorrectWord: IncorrectWord
}

export const createSpellingMessages = ({
  numberOfPairs,
  secondaryInputContent,
  wordPairings
}: CreateSpellingMessagesParams): CombinedResult[] => {
  // Ensure `wordPairings` is an array
  if (typeof wordPairings === 'string') {
    try {
      wordPairings = JSON.parse(wordPairings)
    } catch (error) {
      console.log('Error creating spelling messages: ', error)
      throw new AppError(400, 'Invalid wordPairings JSON')
    }
  }

  if (!Array.isArray(wordPairings)) {
    throw new AppError(400, 'wordPairings must be an array')
  }

  if (!wordPairings || !Array.isArray(wordPairings)) {
    throw new AppError(400, 'wordPairings must be a valid array')
  }

  const messageSpacesRemoved = secondaryInputContent
    .replace(/\s+/g, '')
    .toLowerCase()
  const messageLength = messageSpacesRemoved.length

  // ensure the message is long enough
  if (messageLength < numberOfPairs) {
    throw new AppError(
      404,
      `The message must be at least ${numberOfPairs} characters long after removing spaces.`
    )
  }

  const baseSize = Math.floor(messageLength / numberOfPairs)
  const extraChars = messageLength % numberOfPairs

  const messageParts: string[] = []
  let index = 0

  for (let i = 0; i < numberOfPairs; i++) {
    const segmentSize = baseSize + (i < extraChars ? 1 : 0)
    messageParts.push(messageSpacesRemoved.slice(index, index + segmentSize))
    index += segmentSize
  }

  const vowels = 'aeiou'
  const consonants = 'wrtpsdfghjklcbnm' // removed uncommon consonants

  const vowelsArray = vowels.split('')
  const consonantsArray = consonants.split('')

  const alternativeMessageParts = messageParts.map(part => {
    return part
      .split('')
      .map(letter => {
        if (vowelsArray.includes(letter)) {
          const otherVowels = vowelsArray.filter(vowel => vowel !== letter)
          return otherVowels[Math.floor(Math.random() * otherVowels.length)]
        } else if (consonantsArray.includes(letter)) {
          const otherConsonants = consonantsArray.filter(
            consonant => consonant !== letter
          )
          return otherConsonants[
            Math.floor(Math.random() * otherConsonants.length)
          ]
        }
        return letter // Shouldn't happen with validation but if it's neither a vowel nor a consonant, return as is (e.g., punctuation)
      })
      .join('')
  })

  const combinedResult = wordPairings.map((pair, index) => {
    return {
      correctWord: {
        word: pair.wordOne,
        correctMessage: messageParts[index]
      },
      incorrectWord: {
        word: pair.wordTwo,
        incorrectMessage: alternativeMessageParts[index]
      }
    }
  })

  return combinedResult
}
