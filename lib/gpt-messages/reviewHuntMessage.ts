import { reviewHuntStructure } from '../constants/return-structure/reviewHuntStructure'

interface ReviewHuntMessage {
  data: string
  concepts: string
  levelSelection: string | null
  numberOfQuestions: number | null
}

export default function reviewHuntMessage({
  data,
  concepts,
  levelSelection,
  numberOfQuestions
}: ReviewHuntMessage) {
  return `
      Here is an example data structure that I'd like returned in JSON:
      ${JSON.stringify(reviewHuntStructure)}

      Take the following content data: ${data}
      and the following concept focuses: ${concepts}

      And create ${numberOfQuestions} new questions testing similar concepts.

      Note: if the content data involves only a set of vocabulary or spelling words, please use the other words
      as possible incorrect answers.

      Ensure the content is easy for all students at an elementary grade ${levelSelection}.

      Return valid JSON only.
    `
}
