import { scrambledSentencesStructure } from '../constants/return-structure/scrambledSentencesStructure'

interface ScrambledSentencesMessage {
  data: string
  levelSelection: string | null
  numberOfSentences: number
  wordsPerSentence: number
}

export default function scrambledSentencesMessage({
  data,
  levelSelection,
  numberOfSentences,
  wordsPerSentence
}: ScrambledSentencesMessage) {
  return `
      Here is an example data structure that I'd like returned in JSON:
      ${JSON.stringify(scrambledSentencesStructure)}

      Take the following input data:
      ${data}

      And generate a ${numberOfSentences} sentences that use the above words or concept. 

      Each sentence should have roughly ${wordsPerSentence} words in total.

      Importantly, also ensure the language is simple and suitable for all students at an elementary grade ${levelSelection} or below.

      Return valid JSON only.
    `
}
