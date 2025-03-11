import { z } from 'zod'
import { baseContentInputSchema } from './baseContentInput.schema'

export const textareaContentSchema = baseContentInputSchema.extend({
  textareaInputContent: z
    .string()
    .min(50, {
      message: 'Input at least 50 characters to build questions around.'
    })
    .max(10000, {
      message: 'We can only support 10,000 characters at the moment.'
    })
})

export const reviewHuntInputSchema = textareaContentSchema.extend({
  numberOfContent: z.coerce
    .number({
      required_error: 'Number of content is required.',
      invalid_type_error: 'Must be a number.'
    })
    .min(4, { message: 'Generate at least 4.' })
    .max(16, { message: 'Generate at most 16.' })
})
