import { shuffleArray } from '../shuffleArray'
import { WordPairings } from '@/lib/zod/edit/editWordPairs.schema'

// This adds ids to WordPairings for easy matching
export interface WordPairingWithIds {
  word: string
  pairId: number
  wordIsShowing: boolean
  wordHasMatched: boolean
}

export interface MemoryGameState {
  generatedContent: WordPairings
  gameContent: WordPairingWithIds[] | null
  gameStarted: boolean
  currentWords: WordPairingWithIds[]
  completedWords: WordPairingWithIds[]
}

export type MemoryGameAction =
  | { type: 'START_GAME' }
  | { type: 'RESET_GAME' }
  | { type: 'CLICK_WORD'; payload: WordPairingWithIds }
  | { type: 'HIDE_MISMATCHED' }

export function memoryGameReducer(
  state: MemoryGameState,
  action: MemoryGameAction
): MemoryGameState {
  const {
    generatedContent,
    gameContent,
    currentWords,
    completedWords
  } = state

  switch (action.type) {
    case 'START_GAME': {
      const newContent = generatedContent.flatMap((wordPairing, index) => [
        {
          word: wordPairing.wordOne,
          pairId: index,
          wordIsShowing: false,
          wordHasMatched: false
        },
        {
          word: wordPairing.wordTwo,
          pairId: index,
          wordIsShowing: false,
          wordHasMatched: false
        }
      ])

      return {
        ...state,
        gameContent: shuffleArray(newContent),
        gameStarted: true,
        currentWords: [],
        completedWords: []
      }
    }

    case 'CLICK_WORD': {
      if (!gameContent) return state

      const clickedWord = action.payload

      if (clickedWord.wordHasMatched || clickedWord.wordIsShowing) {
        return state
      }

      const updatedGameContent = gameContent.map(word =>
        word === clickedWord ? { ...word, wordIsShowing: true } : word
      )

      // if first click
      if (currentWords.length === 0) {
        return {
          ...state,
          gameContent: updatedGameContent,
          currentWords: [clickedWord]
        }

        // if second click
      } else if (currentWords.length === 1) {
        const firstWord = currentWords[0]
        const secondWord = clickedWord

        const isMatch = firstWord.pairId === secondWord.pairId

        const updatedMatchedGameContent = updatedGameContent.map(word => {
          if (word.word === firstWord.word || word.word === secondWord.word) {
            return {
              ...word,
              wordIsShowing: true,
              wordHasMatched: isMatch
            }
          }
          return word
        })

        return {
          ...state,
          gameContent: updatedMatchedGameContent,
          currentWords: isMatch ? [] : [firstWord, secondWord],
          completedWords: isMatch
            ? [...completedWords, firstWord, secondWord]
            : completedWords
        }
      }

      return state
    }

    case 'HIDE_MISMATCHED': {
      if (!gameContent || currentWords.length !== 2) return state

      const [first, second] = currentWords

      const updatedGameContent = gameContent.map(word => {
        if (word.word === first.word || word.word === second.word) {
          return { ...word, wordIsShowing: false }
        }

        return word
      })

      return {
        ...state,
        gameContent: updatedGameContent,
        currentWords: []
      }
    }

    case 'RESET_GAME': {
      return {
        ...state,
        gameContent: null,
        gameStarted: false
      }
    }

    default:
      throw new Error('Unhandled action type in Memory Game.')
  }
}
