import { z } from 'zod'

// TODO: This is currently used in paragraphs as well
export const editSentencesSchema = z.object({
  data: z
    .array(z.string().min(1, { message: 'Text is required.' }))
    .max(2000, { message: 'Input cannot support more than 2,000 characters.' })
})

export type EditSentencesFormValues = z.infer<typeof editSentencesSchema>