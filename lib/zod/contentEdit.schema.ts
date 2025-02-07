import { z } from 'zod'

export const editPairsSchema = z.object({
  wordPairings: z.array(
    z.object({
      wordOne: z.string().min(1, { message: 'Word one is required.' }),
      wordTwo: z.string().min(1, { message: 'Word two is required.' })
    })
  )
})

export type EditPairsFormValues = z.infer<typeof editPairsSchema>
export type WordPairings = EditPairsFormValues['wordPairings']

export const editCorrectSpellingSchema = z.object({
  wordPairings: z.array(
    z.object({
      correctWord: z
        .string()
        .min(1, { message: 'A correct word is required.' }),
      incorrectWord: z
        .string()
        .min(1, { message: 'An incorrect word is required.' })
    })
  )
})

export type EditCorrectSpellingFormValues = z.infer<
  typeof editCorrectSpellingSchema
>
// Extract just the type of wordPairings (which is an array of objects)
export type CorrectSpellingWordPairings =
  EditCorrectSpellingFormValues['wordPairings']

export const editSentencesSchema = z.object({
  sentence: z.array(z.string().min(1, { message: 'Text is required.' }))
})

export type EditSentencesFormValues = z.infer<typeof editSentencesSchema>


// Edit multiple choice:
export const editMultipleChoice = z.object({
  questions: z.array(
    z.object({
      sentenceWithBlank: z
        .string()
        .min(1, { message: 'A sentence is required.' }),
      correctAnswer: z.string().min(1, { message: 'An answer is required.' }),
      // Change possibleAnswers to be an array of objects
      possibleAnswers: z.array(
        z.object({
          answer: z
            .string()
            .min(1, { message: 'A possible answer is required.' })
        })
      )
    })
  )
})

export type EditMultipleChoiceFormValues = z.infer<typeof editMultipleChoice>

export type EditMultipleChoiceValues = z.infer<
  typeof editMultipleChoice
>['questions']
