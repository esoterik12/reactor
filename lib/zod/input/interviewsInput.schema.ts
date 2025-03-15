import { baseContentInputSchema } from './baseContentInput.schema'
import { z } from 'zod'

export const interviewsInputSchema = baseContentInputSchema.extend({
  numberOfContent: z.coerce
    .number({
      required_error: 'Number of content is required.',
      invalid_type_error: 'Must be a number.'
    })
    .min(1, { message: 'Generate at least 1 question.' })
    .max(24, { message: 'Generate at most 24 questions.' })
})
