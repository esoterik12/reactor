import { WordPairings } from '@/lib/zod/edit/editWordPairs.schema'
import { shuffleArray } from '../shuffleArray'

export interface GameState {
  currentWordIndex: number
  currentLetterIndex: number
  clickedIndexes: number[]
  score: number
  gameContent: WordPairings
}

export type GameAction =
  | {
      type: 'CLICK_LETTER'
      payload: { letter: string; clickedLetterIndex: number }
    }
  | { type: 'NEXT_WORD' }
  | { type: 'RESET_GAME'; payload: WordPairings }

export function unscrambleWordsReducer(
  state: GameState,
  action: GameAction
): GameState {
  switch (action.type) {
    case 'CLICK_LETTER': {
      const { letter, clickedLetterIndex } = action.payload
      const currentWord = state.gameContent[state.currentWordIndex].wordOne
      const expectedLetter = currentWord[state.currentLetterIndex]

      if (
        letter !== expectedLetter ||
        state.clickedIndexes.includes(clickedLetterIndex)
      ) {
        return state // invalid click
      }

      const updatedIndexes = [...state.clickedIndexes, clickedLetterIndex]
      const nextLetterIndex = state.currentLetterIndex + 1

      return {
        ...state,
        clickedIndexes: updatedIndexes,
        currentLetterIndex: nextLetterIndex
      }
    }

    case 'NEXT_WORD': {
      // Guard NEXT_WORD so it only fires when the word is complete
      const current = state.gameContent[state.currentWordIndex]
      if (state.currentLetterIndex < current.wordOne.length) {
        return state
      }

      const isLastWord = state.currentWordIndex === state.gameContent.length - 1
      const completedWord = state.gameContent[state.currentWordIndex].wordOne

      if (isLastWord) {
        // Create newly scrambled letters
        const newContent = shuffleArray(
          state.gameContent.map(word => ({
            ...word,
            wordTwo: shuffleArray(word.wordOne.split('')).join('')
          }))
        )

        return {
          ...state,
          score: state.score + completedWord.length,
          currentWordIndex: 0,
          currentLetterIndex: 0,
          clickedIndexes: [],
          gameContent: newContent
        }
      }

      return {
        ...state,
        score: state.score + completedWord.length,
        currentWordIndex: state.currentWordIndex + 1,
        currentLetterIndex: 0,
        clickedIndexes: []
      }
    }

    case 'RESET_GAME': {
      return {
        currentWordIndex: 0,
        currentLetterIndex: 0,
        clickedIndexes: [],
        score: 0,
        gameContent: action.payload
      }
    }

    default:
      throw new Error('Unhandled action type in unscrambleWordsReducer.')
  }
}
