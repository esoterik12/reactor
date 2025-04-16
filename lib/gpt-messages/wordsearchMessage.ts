import { wordsearchStructure } from '../constants/return-structure/wordsearchStructure'

interface WordsearchMessage {
  primaryInputContent: string
  secondaryNumberOfContent: number | null | undefined
  levelSelection: string
}

export default function wordsearchMessage({
  primaryInputContent,
  secondaryNumberOfContent,
  levelSelection
}: WordsearchMessage) {
  return `
      Here is an example data structure that I'd like returned in JSON:
      ${JSON.stringify(wordsearchStructure)}

      Take the following content description:
      ${primaryInputContent}

      And generate a list of ${secondaryNumberOfContent} words in the structure shown above that fit the content description ${primaryInputContent}.

      Incorporate any words provided in the list if they are added as a comma-separated list at the beginning of
      the content description.

      If there is simply a list of words that total fewer than ${secondaryNumberOfContent}, extrapolate based on the words in the list
      and any descriptive content what other words would fit well with those words.

      Try to ensure that the language used corresponds to a grade level of ${levelSelection}.

      Return valid JSON only.

      Make sure the final JSON string array contains only ${secondaryNumberOfContent} words.
    `
}
