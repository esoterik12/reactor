// import { shuffleArray } from '../shuffleArray'

/*
This game state needs to:
  1. Hold the files in an array
  2. It needs to shuffle the array file when the games starts
  3. it neeeds to keep track of the current index of the image being viewed by the game
  4. It needs to keep track of gameIsStarted (used to open the game component)

  It will also keep track of the specific game state revealing squares
    Two functions SHOW_IMAGE and REVEAL_NEXT_SQUARE

    Wondering how to execute this section of the game state
      Perhaps an array of objects representing each square with an id and isRevealed prop

  Start game should:
    shuffle the array and set gameIsStarted
    reset game should shuffle the array and set

*/

export interface PictureRevealState {
  images: File[]
  gameIsStarted: boolean

}

export type PictureRevealAction =
  | { type: 'START_GAME' }
  | { type: 'RESET_GAME' }
  | { type: 'NEXT_IMAGE' }
  | { type: 'SHOW_IMAGE' }
  | { type: 'REVEAL_NEXT_SQUARE' }
