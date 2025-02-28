import { z } from 'zod'

// All schemas that use CurriculumSelector have an extension using
// omit from zod to remove primary input requirement since it is
// filled with the unitData from JSON files

// Used in several content types like crazy check up manual
export const baseContentSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is required.' })
    .max(255, { message: 'Title cannot exceed 255 characters.' }),
  primaryInputContent: z
    .string()
    .min(1, { message: 'Input is required.' })
    .max(1000, { message: 'You can only input up to 1000 characters.' })
})

// Choose correct spelling schemas
// TODO: this need to stop secondary being shorter than the number of pairs somehow
// TODO: this also needs to ensure that the seondaryInputCOntent is only a-z lower or uppercase
export const chooseCorrectSpellingSchema = z.object({
  title: z.string().min(1, { message: 'Title is required.' }),
  primaryInputContent: z
    .string()
    .refine(value => validateCommaSeparatedWords({ value, min: 10, max: 30 }), {
      message: 'You can enter between 10 and 30 words total.'
    }),
  secondaryInputContent: z
    .string()
    .refine(value => value.replace(/\s+/g, '').length >= 15, {
      message:
        'The message must be at least 15 non-whitespace characters in length.'
    })
})

export const chooseCorrectSpellingSelectorSchema =
  chooseCorrectSpellingSchema.omit({ primaryInputContent: true })

// Manual Memory and Manual Find Your Partner Schema
export const manualPairsSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is required.' })
    .max(255, { message: 'Title cannot exceed 255 characters.' }),
  primaryInputContent: z
    .string()
    .refine(value => validateCommaSeparatedWords({ value, min: 8, max: 24 }), {
      message: 'You can enter between 8 and 24 words total.'
    })
})

// Generated Memory Schema
export const generatePairsSchema = baseContentSchema.extend({
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
    .max(24, { message: 'Generate at most 24.' })
})

export const memorySelectorSchama = generatePairsSchema.omit({
  primaryInputContent: true
})

// Generated Find Your Partner Schema
export const generateFindYourPartnerSchema = generatePairsSchema.extend({
  numberOfContent: z.coerce
    .number({
      required_error: 'Number of content is required.',
      invalid_type_error: 'Must be a number.'
    })
    .min(4, { message: 'Generate at least 4.' })
    .max(24, { message: 'Generate at most 24.' })
})

// Combines the baseContentSchema with a textareaInputContent validation to be used
// in reviewHunt, grammarMistakes and others
export const textareaContentSchema = baseContentSchema.extend({
  textareaInputContent: z
    .string()
    .min(50, {
      message: 'Input at least 50 characters to build questions around.'
    })
    .max(10000, {
      message: 'We can only support 10,000 characters at the moment.'
    })
})

// This is used in Crazy Check Up Selector / Riddles Selector and others for
export const baseContentSelectorSchema = baseContentSchema.omit({
  primaryInputContent: true
})

export const huntAndMistakesSchema = textareaContentSchema.extend({
  numberOfContent: z.coerce
    .number({
      required_error: 'Number of content is required.',
      invalid_type_error: 'Must be a number.'
    })
    .min(4, { message: 'Generate at least 4.' })
    .max(16, { message: 'Generate at most 16.' })
})

// TODO: move helper function to utils
const validateCommaSeparatedWords = ({
  value,
  min = 10,
  max = 15
}: {
  value: string
  min: number
  max: number
}) => {
  const words = value
    .trim()
    .split(',')
    .map(word => word.trim())
    .filter(Boolean)
  return words.length >= min && words.length <= max
}
