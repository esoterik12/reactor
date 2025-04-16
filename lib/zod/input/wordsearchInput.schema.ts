import { z } from 'zod'

// This is used in generated
export const wordsearchInputSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is required.' })
    .max(255, { message: 'Title cannot exceed 255 characters.' }),
  primaryInputContent: z
    .string()
    .min(1, { message: 'Input is required.' })
    .max(1000, { message: 'You can only input up to 1000 characters.' }),
  // Number of versions
  numberOfContent: z.coerce
    .number({
      required_error: 'Number of versions is required.',
      invalid_type_error: 'Must be a number.'
    })
    .min(1, { message: 'Generate at least 1.' })
    .max(24, { message: 'Generate at most 24.' }),
  // Number of words
  secondaryNumberOfContent: z.coerce
    .number({
      required_error: 'Number of words is required.',
      invalid_type_error: 'Must be a number.'
    })
    .min(6, { message: 'Have at least 6 words.' })
    .max(24, { message: 'Generate at most 18.' })
})

export const wordsearchManualInputSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is required.' })
    .max(255, { message: 'Title cannot exceed 255 characters.' }),

  // Manually input comma word list
  primaryInputContent: z
    .string()
    .min(1, { message: 'Input is required.' })
    .max(1000, { message: 'You can only input up to 1000 characters.' })
    .superRefine((value, ctx) => {
      const words = value
        .split(',')
        .map(word => word.trim())
        .filter(word => word.length > 0)
      if (words.length < 6 || words.length > 18) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Input must be a comma separated list of between 6 and 18 words. You provided ${words.length} word${words.length !== 1 ? 's' : ''}.`
        })
      }
    }),
  // Number of versions
  numberOfContent: z.coerce
    .number({
      required_error: 'Number of content is required.',
      invalid_type_error: 'Must be a number.'
    })
    .min(1, { message: 'Generate at least 1.' })
    .max(24, { message: 'Generate at most 24.' })
})

export const wordsearchSelectorSchema = wordsearchManualInputSchema.omit({
  primaryInputContent: true
})
