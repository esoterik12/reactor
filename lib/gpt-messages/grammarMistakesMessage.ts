import { grammarMistakesStructure } from '../constants/return-structure/grammarMistakesStructure'

interface GrammarMistakesMessage {
  grammarConceptDescription: string
  numberOfMistakesPerSentence: number | null
}

export default function grammarMistakesMessage({
  grammarConceptDescription,
  numberOfMistakesPerSentence
}: GrammarMistakesMessage) {
  return `
      Here is an example data structure that I'd like returned in JSON:
      ${JSON.stringify(grammarMistakesStructure)}

      Take the following grammar concept:
      ${grammarConceptDescription}

      And generate a set of sentences that use that concept.
      Also generate an incorrectSentence with ${numberOfMistakesPerSentence} plausible 
      grammar mistakes in them related to the concept and other msitakes that are typical grammar mistakes 
      made my students learning English. For example, pronoun usage, capitalization, periods,
      punctuation, article usage.

      Return valid JSON only.
    `
}
