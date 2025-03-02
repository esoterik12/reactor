import { z } from 'zod'

export const grammarMistakeSchema = z.object({
  correctSentence: z
    .string()
    .min(1, { message: 'A correct sentence is required.' })
    .max(255, { message: 'You cannot exceed 255 characters.' }),
  incorrectSentence: z
    .string()
    .min(1, { message: 'A correct sentence is required.' })
    .max(255, { message: 'You cannot exceed 255 characters.' })
})

// Overall schema for the edit form
export const editGrammarMistakesSchema = z.object({
  sentencePairings: z.array(grammarMistakeSchema)
})

// Inferred TypeScript types
export type GrammarMistake = z.infer<typeof grammarMistakeSchema>
export type EditGrammarMistakesFormValues = z.infer<
  typeof editGrammarMistakesSchema
>
