import { z } from 'zod'
import { baseContentInputSchema, baseContentSelectorSchema } from './baseContentInput.schema'

export const scrambledSentencesContentSchema = {
  numberOfContent: z.coerce
    .number({
      required_error: 'Input required.',
      invalid_type_error: 'Must be a number.'
    })
    .min(3, { message: 'At least 3.' })
    .max(12, { message: 'At most 12.' }),
  secondaryNumberOfContent: z.coerce
    .number({
      required_error: 'Input required.',
      invalid_type_error: 'Must be a number.'
    })
    .min(3, { message: 'At least 3 words.' })
    .max(10, { message: 'At most 10 words.' })
}

export const scrambledSentencesFormSchema = baseContentInputSchema.extend(
  scrambledSentencesContentSchema
)

export const scrambledSentencesSelectorSchema =
  baseContentSelectorSchema.extend(scrambledSentencesContentSchema)
