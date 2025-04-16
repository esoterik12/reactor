import { interviewsStructure } from '../constants/return-structure/interviewsStructure'

interface InterviewsMessage {
  data: string
  levelSelection: string | null
  numberOfContent: number | null | undefined
}

export default function interviewsMessage({
  data,
  levelSelection,
  numberOfContent
}: InterviewsMessage) {
  const numberOfQuestions = numberOfContent || data

  return `
      Here is an example data structure that I'd like returned in JSON:
      ${JSON.stringify(interviewsStructure)}

      Take the following data:
      ${data}

      And generate ${numberOfQuestions} fun and engaging questions students could ask each 
      other to practice using the words or exploring the concepts.

      Ensure the questions are easy to answer for all students at an elementary grade ${levelSelection}

      Return valid JSON only.
    `
}
