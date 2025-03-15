import { bingoStructure } from '../constants/return-structure/bingoStructure'

interface BingoMessage {
  // This will be a description of the words we want generated
  data: string
  levelSelection: string
}

export default function bingoMessage({ data, levelSelection }: BingoMessage) {
  return `
      Here is an example data structure that I'd like returned in JSON:
      ${JSON.stringify(bingoStructure)}

      Take the following content description:
      ${data}

      And generate a list of 25 words in the structure shown above that fit the content description ${data}.

      Try to ensure that the language used corresponds to a grade level of ${levelSelection}.

      Return valid JSON only.
    `
}
