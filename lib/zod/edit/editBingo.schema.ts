import { z } from 'zod'

export const editBingoSchema = z.object({
  bingoWords: z
    .array(
      z.object({
        word: z
          .string()
          .min(1, { message: 'You must enter at least 1 character.' })
          .max(20, { message: 'You can enter at most 20 characters.' })
      })
    )
    .min(25, { message: 'Must have at least 25 words' })
    .max(50, { message: 'Must have at most 50 words' })
})

export type EditBingoFormValues = z.infer<typeof editBingoSchema>
export type EditBingoValues = z.infer<typeof editBingoSchema>['bingoWords']