import { z } from 'zod'

export const editScrambledSentencesSchema = z.object({
  data: z.array(
    z
      .string()
      .min(1, 'You must input some text.')
      .max(255, 'Each sentence can be maximum 255 characters.')
  )
})

export type EditScrambledSentencesFormValues = z.infer<typeof editScrambledSentencesSchema>
