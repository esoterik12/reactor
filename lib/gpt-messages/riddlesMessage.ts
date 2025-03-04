import { riddleStructure } from '../constants/return-structure/riddlesStructure'

interface RiddlesMessage {
  data: string
  levelSelection: string | null
}

export default function riddlesMessage({
  data,
  levelSelection
}: RiddlesMessage) {
  return `
      Here is an example data structure that I'd like returned in JSON:
      ${JSON.stringify(riddleStructure)}

      Take the following input data:
      ${data}

      And generate a set of fun and engaging riddles where the answer to each riddle is one of the 
      words or concepts in the data above (each will be separated by commas).

      Ensure the answers are not included in the riddles and that the return data uses a newline character to represent a line break.

      Importantly, also ensure the language is simple and suitable for all students at an elementary grade ${levelSelection} or below.

      Return valid JSON only.
    `
}
