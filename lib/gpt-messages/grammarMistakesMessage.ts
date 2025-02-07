import { grammarMistakesStructure } from '../constants/return-structure/grammarMistakesStructure'

interface GrammarMistakesMessage {
  grammarConceptDescription: string
  // numberOfMistakesPerSentence: number | null
  levelSelection: string
  numberOfContent: number | null | undefined
  textareaInput: string | undefined
}

export default function grammarMistakesMessage({
  grammarConceptDescription,
  // TODO: currently this doesn't actually take this numberOfMistakesPerSentence input
  // numberOfMistakesPerSentence = 3,
  levelSelection,
  numberOfContent,
  textareaInput
}: GrammarMistakesMessage) {
  return `
      Here is an example data structure that I'd like returned in JSON:
      ${JSON.stringify(grammarMistakesStructure)}

      Take the following grammar concept:
      ${grammarConceptDescription}

      And the follow content:
      ${textareaInput}

      And generate ${numberOfContent} sets of sentences that use that concept
      and relate to the content.
      
      Also generate an incorrectSentence with 2 to 4 plausible 
      grammar mistakes in them related to the concepts.
      
      You can use some other msitakes that are typical grammar mistakes 
      made by students learning English. For example, pronoun usage, capitalization, periods,
      punctuation, article usage. However, please do not use the same mistakes repeatedly unless they are related
      to the grammar concept of ${grammarConceptDescription}

      Ensure returned content orresponds to a grade level of ${levelSelection}.

      Return valid JSON only.
    `
}
