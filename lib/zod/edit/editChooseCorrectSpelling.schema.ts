import { z } from 'zod'

export const editChooseCorrectSpellingSchema = z.object({
  wordPairings: z.array(
    z.object({
      wordOne: z.string().min(1, { message: 'Word one is required.' }),
      wordTwo: z.string().min(1, { message: 'Word two is required.' })
    })
  ),
})

export type EditCorrectSpellingFormValues = z.infer<
  typeof editChooseCorrectSpellingSchema
>
export type SpellingWordPairings = EditCorrectSpellingFormValues['wordPairings']
