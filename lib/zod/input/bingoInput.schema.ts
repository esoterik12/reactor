import { z } from 'zod'

// This is used in generated
export const bingoInputSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is required.' })
    .max(255, { message: 'Title cannot exceed 255 characters.' }),
  primaryInputContent: z
    .string()
    .min(1, { message: 'Input is required.' })
    .max(1000, { message: 'You can only input up to 1000 characters.' }),
  numberOfContent: z.coerce
    .number({
      required_error: 'Number of content is required.',
      invalid_type_error: 'Must be a number.'
    })
    .min(1, { message: 'Generate at least 1.' })
    .max(24, { message: 'Generate at most 24.' })
})

export const bingoManualInputSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is required.' })
    .max(255, { message: 'Title cannot exceed 255 characters.' }),

  primaryInputContent: z
    .string()
    .min(1, { message: 'Input is required.' })
    .max(1000, { message: 'You can only input up to 1000 characters.' })
    .superRefine((value, ctx) => {
      const words = value
        .split(',')
        .map(word => word.trim())
        .filter(word => word.length > 0)
      if (words.length !== 25) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Input must be a comma separated list of exactly 25 words. You provided ${words.length} word${words.length !== 1 ? 's' : ''}.`
        })
      }
    }),
  numberOfContent: z.coerce
    .number({
      required_error: 'Number of content is required.',
      invalid_type_error: 'Must be a number.'
    })
    .min(1, { message: 'Generate at least 1.' })
    .max(24, { message: 'Generate at most 24.' })
})

export const bingoSelectorSchema = bingoInputSchema.omit({
  primaryInputContent: true
})
