import { correctSpellingStructure } from '../constants/return-structure/correctSpellingStructure'

interface ChooseCorrectSpellingMessage {
  data: string
}

export default function chooseCorrectSpellingMessage({
  data
}: ChooseCorrectSpellingMessage) {
  return `
      Here is an example data structure that I'd like returned in JSON:
      ${JSON.stringify(correctSpellingStructure)}

      Take the following data words:
      ${data}

      And generate a set of words with a plausible misspelling for each 
      of the data words provided above. Use the provided word for the correctWord 
      property and create a plausible wrongly spelled word for the incorrectWord property.

      Return valid JSON only.
    `
}
