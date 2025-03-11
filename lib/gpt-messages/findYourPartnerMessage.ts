import { findYourPartnerStructureArrays } from '../constants/return-structure/findYourPartnerStructure'

export interface FindYourPartnerMessage {
  data: string
  matchingCriteria: string | null
  levelSelection?: string
  numberOfContent: number | null | undefined
  // This is the set size:
  secondaryNumberOfContent: number | null | undefined
}

export default function findYourPartnerMessage({
  data,
  matchingCriteria,
  levelSelection,
  numberOfContent,
  secondaryNumberOfContent
}: FindYourPartnerMessage) {
  let structure

  switch (secondaryNumberOfContent) {
    case 2:
      structure = findYourPartnerStructureArrays.twos
      break
    case 3:
      structure = findYourPartnerStructureArrays.threes
      break
    case 4:
      structure = findYourPartnerStructureArrays.fours
      break
    default:
      structure = findYourPartnerStructureArrays.twos
      break
  }

  return `
      Here is an example data structure that I'd like returned in JSON:
      ${JSON.stringify(structure)}

      Take the following words, with each word to be used as the first word in each array:
      ${data}

      And the following matching criteria:
      ${matchingCriteria}

      And generate an array of arrays with matching words based on the following matching criteria: ${matchingCriteria}. 
      Each array should be a set of ${secondaryNumberOfContent} matching words according to the above matching criteria.

      Ensure you create ${numberOfContent} set in total the returned JSON and that language used
      is easy for an elementary grade level of ${levelSelection}.

      Return valid JSON only.
    `
}
