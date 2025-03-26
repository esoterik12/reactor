import { AppError } from '../errors/AppError'
import { shuffleArray } from '../utils/shuffleArray'

export const generateCryptogram = ({
  primaryInputContent,
  secondaryInputContent
}: {
  primaryInputContent: string
  secondaryInputContent: string | undefined
}) => {
  if (
    typeof primaryInputContent !== 'string' ||
    typeof secondaryInputContent !== 'string'
  ) {
    throw new AppError(400, 'Invalid cryptogram input.')
  }

  console.log(
    'running generateCryprogram with primary and secondary input content: ',
    primaryInputContent,
    secondaryInputContent
  )

  // Prepare an array of the alphabet in lowercase
  const alphabet = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(97 + i)
  )

  // Create an array of the given letters
  const givenAnswersArray = Array.from(
    new Set(
      secondaryInputContent
        .toLowerCase()
        .split('')
        .filter(char => alphabet.includes(char))
    )
  )

  // Shuffle the alphabet
  const shuffledAlphabetArray = shuffleArray(alphabet)

  // Removes anything that isn't a letter or a space
  const validCharacters = primaryInputContent
    .toLowerCase()
    .split('')
    .filter(char => alphabet.includes(char) || char === ' ')

  const cryptogramOutput = validCharacters.map(char => {
    const number = shuffledAlphabetArray.indexOf(char) + 1

    if (givenAnswersArray.includes(char)) {
      return {
        number,
        letter: char,
        given: true
      }
    } else if (char !== ' ') {
      return {
        number,
        letter: char,
        given: false
      }
    } else if (char === ' ') {
      return {
        number: 0,
        letter: 'space',
        given: true
      }
    }
  })

  console.log('cryptogramOutput: ', cryptogramOutput)

  return cryptogramOutput
}
