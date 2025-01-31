import { rhymingPairStructure } from '../constants/return-structure/matchingPairsStructures'

interface MemoryCardsMessage {
  data: string
  matchingCriteria: string | null
}

export default function memoryCardsMessage({
  data,
  matchingCriteria
}: MemoryCardsMessage) {
  const structure = rhymingPairStructure

  return `
      Here is an example data structure that I'd like returned in JSON:
      ${JSON.stringify(structure)}

      Take the following input data:
      ${data}

      And the following matching criteria:
      ${matchingCriteria}

      And generate a set of pairs where the pairs are words or phrases you create according to the matching crieteria of: ${matchingCriteria}.

      Return valid JSON only.
    `
}
