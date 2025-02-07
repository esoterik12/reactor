import { pairStructure } from '../constants/return-structure/matchingPairsStructures'

interface MemoryCardsMessage {
  data: string
  matchingCriteria: string | null
  levelSelection: string
}

export default function memoryCardsMessage({
  data,
  matchingCriteria,
  levelSelection
}: MemoryCardsMessage) {
  const structure = pairStructure

  return `
      Here is an example data structure that I'd like returned in JSON:
      ${JSON.stringify(structure)}

      Take the following input data:
      ${data}

      And the following matching criteria:
      ${matchingCriteria}

      And generate a set of pairs where the pairs are words or phrases you create according to the matching crieteria of: ${matchingCriteria}.

      Try to ensure there are 8 pairs in total and that language corresponds 
      to a grade level of ${levelSelection}.

      Return valid JSON only.
    `
}
