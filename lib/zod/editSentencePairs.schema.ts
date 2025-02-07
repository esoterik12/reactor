import { z } from 'zod'

export const editSentencePairsSchema = z.object({
  sentencePairings: z.array(
    z.object({
      correctSentence: z
        .string()
        .min(1, { message: 'A correct sentence is required.' }),
      incorrectSentence: z
        .string()
        .min(1, { message: 'An incorrect sentence is required.' })
    })
  )
})
export type EditSentencePairsFormValues = z.infer<
  typeof editSentencePairsSchema
>

export type EditSentencePairs = EditSentencePairsFormValues['sentencePairings']