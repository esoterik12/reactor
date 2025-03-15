import { z } from 'zod'
import { baseContentInputSchema } from './baseContentInput.schema'

export const bingoInputSchema = baseContentInputSchema.extend({
  numberOfContent: z.coerce
    .number({
      required_error: 'Number of content is required.',
      invalid_type_error: 'Must be a number.'
    })
    .min(4, { message: 'Generate at least 1.' })
    .max(24, { message: 'Generate at most 24.' })
})

export const bingoSelectorSchema = bingoInputSchema.omit({
  primaryInputContent: true
})
