import { bingoStructure } from '../constants/return-structure/bingoStructure'

interface BingoMessage {
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

      Incorporate any words provided in the list if they are added as a comma-separated list at the beginning of
      the content description.

      If there is simply a list of words that total fewer than 25, extrapolate based on the words in the list
      what other words would fit well with those words.

      Try to ensure that the language used corresponds to a grade level of ${levelSelection}.

      Return valid JSON only.

      Make sure the final JSON string array contains only 25 words.
    `
}
