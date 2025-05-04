import { SpotItWord } from '@/types/games.types'

interface ProcessSpotItWordsReturn {
  data: SpotItWord[]
}

interface ProcessSpotItWordsInput {
  words: string
  deduplicate?: boolean
}

export const processSpotItWords = ({
  words,
  deduplicate = true
}: ProcessSpotItWordsInput): ProcessSpotItWordsReturn => {
  if (typeof words !== 'string') {
    throw new Error(
      'Cannot process SpotIt words. Invalid SpotIt input: "words" must be a string'
    )
  }

  const rawWords = words
    .split(',')
    .map(word => word.trim().toLowerCase())
    .filter(word => word.length > 0)

  const uniqueWords = deduplicate ? Array.from(new Set(rawWords)) : rawWords

  const spotItWords: SpotItWord[] = uniqueWords.map((word, index) => {
    return {
      wordId: index + 1,
      word: word,
      viewCount: 0,
      isDuplicatedWord: false
    }
  })

  return { data: spotItWords }
}
