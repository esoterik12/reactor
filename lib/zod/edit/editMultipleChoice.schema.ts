import { z } from 'zod'

// Edit multiple choice:
export const editMultipleChoiceSchema = z.object({
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

export type EditMultipleChoiceFormValues = z.infer<typeof editMultipleChoiceSchema>

export type EditMultipleChoiceValues = z.infer<
  typeof editMultipleChoiceSchema
>['questions']
