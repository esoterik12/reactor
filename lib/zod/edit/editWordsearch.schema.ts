import { z } from 'zod'

export const editWordsearchSchema = z.object({
  wordsearchWords: z
    .array(
      z.object({
        word: z
          .string()
          .min(1, { message: 'You must enter at least 1 character.' })
          .max(20, { message: 'You can enter at most 20 characters.' })
      })
    )
    .min(6, { message: 'Must have at least 6 words' })
    .max(18, { message: 'Must have at most 18 words' })
})

export type EditWordsearchFormValues = z.infer<typeof editWordsearchSchema>
export type EditWordsearchValues = z.infer<typeof editWordsearchSchema>['wordsearchWords']