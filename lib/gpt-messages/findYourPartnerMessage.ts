import { rhymingPairStructure } from '../constants/return-structure/matchingPairsStructures'

export interface FindYourPartnerMessage {
  data: string
  matchingCriteria: string | null
}

export default function findYourPartnerMessage({
  data,
  matchingCriteria
}: FindYourPartnerMessage) {
  const structure = rhymingPairStructure

  return `
      Here is an example data structure that I'd like returned in JSON:
      ${JSON.stringify(structure)}

      Take the following data words:
      ${data}

      And the following matching criteria:
      ${matchingCriteria}

      And generate a set of pairs with the same data structure that are linked based on the above matching criteria: ${matchingCriteria}.

      Return valid JSON only.
    `
}
