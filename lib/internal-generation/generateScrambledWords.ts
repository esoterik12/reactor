import { AppError } from '../errors/AppError'

interface GenerateScrambledWordsProps {
  primaryInputContent: string
}

export const generateScrambledWords = ({
  primaryInputContent
}: GenerateScrambledWordsProps) => {
  try {
    const wordsArray = primaryInputContent.split(',').map(word => word.trim())

    const scrambleWord = (word: string): string => {
      if (word.length < 2) return word

      const arr = word.split('')
      // All letters the same, no scramble is possible
      if (arr.every(letter => letter === arr[0])) return word

      let scrambled = word
      let attempts = 0
      const maxAttempts = 20

      while (scrambled === word && attempts < maxAttempts) {
        const newArr = [...arr]
        for (let i = newArr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1))
          ;[newArr[i], newArr[j]] = [newArr[j], newArr[i]]
        }
        scrambled = newArr.join('')
        attempts++
      }
      return scrambled
    }

    const combinedResult = wordsArray.map(word => ({
      wordTwo: scrambleWord(word),
      wordOne: word
    }))

    return { data: combinedResult }
  } catch (error) {
    console.error('Error processing input content: ', error)
    throw new AppError(404, 'Error running generateScrambledWords.')
  }
}
