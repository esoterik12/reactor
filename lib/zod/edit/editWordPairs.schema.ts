import { z } from 'zod'

export const editPairsSchema = z.object({
  wordPairings: z.array(
    z.object({
      wordOne: z.string().min(1, { message: 'Word one is required.' }),
      wordTwo: z.string().min(1, { message: 'Word two is required.' })
    })
  )
})

export type EditPairsFormValues = z.infer<typeof editPairsSchema>
export type WordPairings = EditPairsFormValues['wordPairings']