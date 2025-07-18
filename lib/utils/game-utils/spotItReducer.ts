import { shuffleArray } from '../shuffleArray'
import { SpotItWord } from '@/types/games.types'

export interface SpotItGameState {
  score: number
  gameContent: SpotItWord[]
  gameStarted: boolean
  matchedWord: string | null
  perfectStreak: number
}

export type GameAction =
  | {
      type: 'START_GAME'
      payload: SpotItWord[]
    }
  | {
      type: 'CLICK_WORD'
      payload: SpotItWord
    }
  | { type: 'NEXT_WORD' }
  | { type: 'RESET_GAME'; payload: SpotItWord[] }
  | { type: 'RESET_STREAK' }
  | { type: 'ADD_BONUS_POINTS' }

export function spotItReducer(
  state: SpotItGameState,
  action: GameAction
): SpotItGameState {
  switch (action.type) {
    case 'START_GAME': {
      if (action.payload.length === 0) {
        throw new Error('Invalid SpotIt words input.')
      }

      const newContent: SpotItWord[] = [...action.payload]

      const wordToDuplicate =
        newContent[Math.floor(Math.random() * newContent.length)]

      const duplicatedWord: SpotItWord = {
        ...wordToDuplicate,
        isDuplicatedWord: true,
        // Sets the first duplicated word's viewCount
        viewCount: 1,
        // Add one to the length for a new id
        wordId: newContent.length + 1
      }

      newContent.push(duplicatedWord)

      return {
        ...state,
        gameStarted: true,
        gameContent: newContent
      }
    }

    case 'CLICK_WORD': {
      const clickedWord = action.payload

      const duplicatedWord = state.gameContent.find(
        word => word.isDuplicatedWord
      )

      if (!duplicatedWord) {
        throw new Error('No duplicated word found in gameContent.')
      }

      const isCorrect = clickedWord.word === duplicatedWord.word

      if (!isCorrect) {
        return { ...state, perfectStreak: 0 }
      } else {
        return {
          ...state,
          matchedWord: duplicatedWord.word,
          score: state.score + 1,
          perfectStreak: state.perfectStreak + 1
        }
      }
    }

    case 'NEXT_WORD': {
      const duplicatedWord = state.gameContent.find(
        word => word.isDuplicatedWord
      )

      if (!duplicatedWord) {
        throw new Error('No duplicated word found in gameContent.')
      }

      // clears the duplicated word
      const filteredContent = state.gameContent.filter(
        word => !word.isDuplicatedWord
      )

      // Increment the viewCount for the matched word
      const updatedContent = filteredContent.map(word =>
        word.word === duplicatedWord.word
          ? { ...word, viewCount: word.viewCount + 1 }
          : word
      )

      // Find the minimum viewCount
      const minViewCount = Math.min(
        ...updatedContent.map(word => word.viewCount)
      )

      // Collect the least viewed words
      const leastViewedWords = updatedContent.filter(
        word => word.viewCount === minViewCount
      )

      const nextWordToDuplicate =
        leastViewedWords[Math.floor(Math.random() * leastViewedWords.length)]

      const newDuplicatedWord: SpotItWord = {
        ...nextWordToDuplicate,
        isDuplicatedWord: true,
        wordId: updatedContent.length + 1
      }

      updatedContent.push(newDuplicatedWord)

      shuffleArray(updatedContent)

      return {
        ...state,
        matchedWord: null,
        gameContent: updatedContent
      }
    }

    case 'ADD_BONUS_POINTS': {
      return {
        ...state,
        score: state.score + 3
      }
    }

    case 'RESET_STREAK': {
      return {
        ...state,
        perfectStreak: 0
      }
    }

    case 'RESET_GAME': {
      return {
        matchedWord: null,
        gameStarted: false,
        score: 0,
        gameContent: action.payload,
        perfectStreak: 0
      }
    }

    default:
      throw new Error('Unhandled action type in spotItReducer.')
  }
}
