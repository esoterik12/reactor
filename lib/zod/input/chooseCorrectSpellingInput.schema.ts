import { z } from 'zod'
import { validateCommaSeparatedWords } from '@/lib/utils/validateCommaSeparatedWords'

export const chooseCorrectSpellingSchema = z.object({
  title: z.string().min(1, { message: 'Title is required.' }),
  primaryInputContent: z
    .string()
    .refine(value => validateCommaSeparatedWords({ value, min: 10, max: 30 }), {
      message: 'You can enter between 10 and 30 words total.'
    }),
})

export const chooseCorrectSpellingSelectorSchema =
  chooseCorrectSpellingSchema.omit({ primaryInputContent: true })