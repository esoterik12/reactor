import { z } from 'zod'

export const baseContentSchema = z.object({
  title: z.string().min(1, { message: 'Title is required.' }),
  primaryInputContent: z.string().min(1, { message: 'Input is required.' })
})

export const chooseCorrectSpellingSchema = z.object({
  title: z.string().min(1, { message: 'Title is required.' }),
  primaryInputContent: z.string().refine(
    value => {
      const words = value
        .split(',')
        .map(word => word.trim())
        .filter(Boolean) // removes any empty entries that might result from consecutive commas or trailing commas

      return words.length >= 10 && words.length <= 15
    },
    { message: 'You can enter between 10 and 15 words total.' }
  ),
  secondaryInputContent: z
    .string()
    .refine(value => value.replace(/\s+/g, '').length >= 15, {
      message: 'Must be at least 15 non-whitespace characters in length.'
    })
})

// Generated Memory and Find Your Partner Schema
export const generatePairsSchema = baseContentSchema.extend({
  secondaryInputContent: z
    .string()
    .min(1, { message: 'You must enter matching criteria.' })
})

// Combines the baseContentSchema with a textareaInputCOntent validation to be used
// in reviewHunt, grammarMistakes and others
export const textareaContentSchema = baseContentSchema.extend({
  textareaInputContent: z
    .string()
    .min(200, {
      message:
        'You need to put in enough data, at least 200 characters, to build questions around.'
    })
    .max(10000, {
      message: 'We can only support 10,000 characters at the moment.'
    })
})

export const huntAndMistakesSchema = textareaContentSchema.extend({
  numberOfContent: z.preprocess(
    value => {
      if (typeof value === 'string') {
        const parsed = parseInt(value, 10)
        return isNaN(parsed) ? value : parsed
      }
      return value
    },
    z
      .number()
      .min(4, { message: 'Generate at least 4.' })
      .max(12, { message: 'Generate at most 12.' })
  )
})
