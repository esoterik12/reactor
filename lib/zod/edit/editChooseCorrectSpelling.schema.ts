import { z } from 'zod'

export const editChooseCorrectSpellingSchema = z.object({
  wordPairings: z.array(
    z.object({
      wordOne: z.string().min(1, { message: 'Word one is required.' }),
      wordTwo: z.string().min(1, { message: 'Word two is required.' })
    })
  ),
  secondaryInputContent: z
    .string()
    .min(1, { message: 'Input at least 15 characters.' })
    .max(99, { message: '99 is the maximum.' })
    .refine(value => value.replace(/\s+/g, '').length >= 15, {
      message:
        'The message must be at least 15 non-whitespace characters in length.'
    })
    .optional()
})

export type EditCorrectSpellingFormValues = z.infer<
  typeof editChooseCorrectSpellingSchema
>
export type SpellingWordPairings = EditCorrectSpellingFormValues['wordPairings']
