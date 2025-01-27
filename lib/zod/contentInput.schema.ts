import { z } from 'zod'

export const baseContentSchema = z.object({
  title: z.string().min(1, { message: 'Title is required.' }),
  primaryInputContent: z.string().min(1, { message: 'Input is required.' })
})

export const chooseCorrectSpellingSchema = baseContentSchema.extend({
  secondaryInputContent: z
    .string()
    .refine(value => value.replace(/\s+/g, '').length >= 15, {
      message: 'Must be at least 15 non-whitespace characters in length.'
    })
})
