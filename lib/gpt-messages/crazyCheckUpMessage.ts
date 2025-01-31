import { crazyCheckUpStructure } from '../constants/return-structure/crazyCheckUpStructure'

interface CrazyCheckUpMessage {
  data: string
  levelSelection: string | null
}

export default function crazyCheckUpMessage({
  data,
  levelSelection
}: CrazyCheckUpMessage) {
  return `
      Here is an example data structure that I'd like returned in JSON:
      ${JSON.stringify(crazyCheckUpStructure)}

      Take the following data vocabulary words:
      ${data}

      And generate a set of fun and engaging commands for students to follow in a classroom environment.
      Each command should use one of the words in the data vocabulary words.

      Here is a list of possible command structures to base your generated commands on:
      - Draw a picture of an X
      - Ask someone a question using the word
      - Do something that involves the word (ie, say, sit, ask, do and action)
      - Make something using paper related to the word
      - Write something on the board related to the word
      - Find something in the classroom related to the word
      - Tell your teacher something that is related to the word

      Make sure all actions are not elaborate and do not require being outside or using many materials

      Ensure the content is suitable for all students at an elementary grade ${levelSelection}

      Return valid JSON only.
    `
}
