import { correctSpellingStructure } from '../constants/return-structure/correctSpellingStructure'

export interface ChooseCorrectSpellingMessageProps {
  data: string
}

export default function chooseCorrectSpellingMessage({
  data
}: ChooseCorrectSpellingMessageProps) {
  return `
      Here is an example data structure that I'd like returned in JSON:
      ${JSON.stringify(correctSpellingStructure)}
      Return content labelled wordOne and wordTwo.

      Take the following data words:
      ${data}

      And generate a set of words with a plausible misspelling for each of the data words provided above. 
      With the misspellings, if possible and occasionally, use letter combinations that also make the same sounds. For example, a "C" could be replaced by a "K".
      Or with vowels, things like "aw" could be replaced with "au" because they both make the same sound. Or "ew" and "oo". Only if possible.
      
      Use the provided word for the correctWord property and create a plausible wrongly spelled word for the incorrectWord property.

      Return valid JSON only.
    `
}
