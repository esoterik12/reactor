import { z } from 'zod'
import { baseContentInputSchema } from './baseContentInput.schema'

export const generateFindYourPartnerSchema = baseContentInputSchema.extend({
  secondaryInputContent: z
    .string()
    .min(1, { message: 'You must enter matching criteria.' })
    .max(1000, { message: 'You can only input up to 1000 characters.' }),
  numberOfContent: z.coerce
    .number({
      required_error: 'Number of content is required.',
      invalid_type_error: 'Must be a number.'
    })
    .min(4, { message: 'Generate at least 4.' })
    .max(24, { message: 'Generate at most 24.' }),
  secondaryNumberOfContent: z.coerce

    .number({
      required_error: 'Set size is required.',
      invalid_type_error: 'Must be a number.'
    })
    .min(2, { message: '2 is the minimum.' })
    .max(4, { message: '4 is the maximum.' })
})

export const generateFindYourPartnerSelectorSchema =
  generateFindYourPartnerSchema.omit({
    primaryInputContent: true
  })
