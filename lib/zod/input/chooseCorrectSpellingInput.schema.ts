import { z } from 'zod'
import { validateCommaSeparatedWords } from '@/lib/utils/validateCommaSeparatedWords'

export const chooseCorrectSpellingSchema = z.object({
  title: z.string().min(1, { message: 'Title is required.' }),
  primaryInputContent: z
    .string()
    .refine(value => validateCommaSeparatedWords({ value, min: 10, max: 30 }), {
      message: 'You can enter between 10 and 30 words total.'
    }),
  secondaryInputContent: z
    .string()
    .min(1, { message: 'Input at least 15 characters.' })
    .max(99, { message: '99 is the maximum.' })
    .refine(value => value.replace(/\s+/g, '').length >= 15, {
      message:
        'The message must be at least 15 non-whitespace characters in length.'
    })
})

export const chooseCorrectSpellingSelectorSchema =
  chooseCorrectSpellingSchema.omit({ primaryInputContent: true })
