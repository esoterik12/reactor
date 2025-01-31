interface VocabularyExplainerMessage {
  structure: string
  data: string[]
  levelSelection: string
}

export default function vocabularyExplainerMessage({
  structure,
  data,
  levelSelection
}: VocabularyExplainerMessage) {
  return `
      Here is an example data structure that I'd like returned in JSON:
      ${structure}

      Take the following data vocabulary words:
      ${data}

      And generate a set of four context sentences for each word, making them slightly easier for each one.
      Make sure the sentences are natural context uses of the words and not explanations of their meanings.

      Ensure the content is suitable for all students at an elementary grade ${levelSelection}

      Return valid JSON only.
    `
}
