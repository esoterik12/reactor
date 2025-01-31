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

      Take the following content data:
      ${data}
      and the following concept focuses: ${concepts}

      And create ${numberOfQuestions} new questions testing similar concepts.

      Ensure the content is suitable for all students at an elementary grade ${levelSelection}

      Return valid JSON only.
    `
}

/*
      The most important part here are the concepts: ${concepts}

      And generate a set of review questions based around ${concepts} that take the form of sentences with blanks and four possible answers based around the content data.
      The sentenceWithBlank should hold the sentence with a blank.
      The possibleAnswers should hold THREE INCORRECT answers and one correct answer
      The correctAnswer should hold the one correct answer

      Ensure the content is suitable for all students at an elementary grade ${levelSelection} level.
*/
