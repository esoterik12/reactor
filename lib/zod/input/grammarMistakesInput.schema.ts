import { z } from 'zod'
import { baseContentInputSchema } from './baseContentInput.schema'

export const grammarMistakesInputSchema = baseContentInputSchema.extend({
  textareaInputContent: z
    .string()
    .max(10000, { message: 'We can only support 10,000 characters at the moment.' })
    .optional(),
  numberOfContent: z.coerce
    .number({
      required_error: 'Number of content is required.',
      invalid_type_error: 'Must be a number.'
    })
    .min(4, { message: 'Generate at least 4.' })
    .max(16, { message: 'Generate at most 16.' })
})
