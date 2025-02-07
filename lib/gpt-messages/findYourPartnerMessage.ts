import { pairStructure } from '../constants/return-structure/matchingPairsStructures'

export interface FindYourPartnerMessage {
  data: string
  matchingCriteria: string | null
  numberOfContent: number | null | undefined
  levelSelection?: string
}

export default function findYourPartnerMessage({
  data,
  matchingCriteria,
  numberOfContent,
  levelSelection
}: FindYourPartnerMessage) {
  const structure = pairStructure

  console.log('data', data)
  console.log('matchingCriteria', matchingCriteria)

  return `
      Here is an example data structure that I'd like returned in JSON:
      ${JSON.stringify(structure)}

      Take the following words to be used as wordOne:
      ${data}

      And the following matching criteria:
      ${matchingCriteria}

      And generate a wordTwo that matches wordOne based on the above matching criteria: ${matchingCriteria}.

      Ensure you create ${numberOfContent} pairs in total the returned JSON and that language used
      corresponds to a grade level of ${levelSelection}.

      Return valid JSON only.
    `
}
