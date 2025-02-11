import { pairStructure } from '../constants/return-structure/matchingPairsStructures'

interface MemoryCardsMessage {
  data: string
  matchingCriteria: string | null
  levelSelection: string
  numberOfContent: number | null | undefined
}

export default function memoryCardsMessage({
  data,
  matchingCriteria,
  levelSelection,
  numberOfContent = 8
}: MemoryCardsMessage) {
  const structure = pairStructure

  return `
      Here is an example data structure that I'd like returned in JSON:
      ${JSON.stringify(structure)}

      Take the following input data:
      ${data}

      And the following matching criteria:
      ${matchingCriteria}

      And generate ${numberOfContent} of pairs where the pairs are words or phrases you create according to the matching crieteria of: ${matchingCriteria}.

      If there are more words in the input data than ${numberOfContent}, remove some words.

      Try to ensure that the language used corresponds to a grade level of ${levelSelection}.

      Return valid JSON only.
    `
}
