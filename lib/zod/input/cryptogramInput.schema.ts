import { z } from 'zod'

export const cryptogramInputSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is required.' })
    .max(255, { message: 'Title cannot exceed 255 characters.' }),
  primaryInputContent: z
    .string()
    .min(25, { message: 'At least 25 characters are required.' })
    .max(150, { message: 'At most 150-character sentences are supported.' })
    // input does not contain any numbers.
    .refine(value => !/\d/.test(value), {
      message: 'Input cannot contain numbers.'
    })
    // Step 2: remove any characters that aren't letters or whitespace.
    .transform(value => value.replace(/[^A-Za-z\s]/g, ''))
    .refine(
      value => {
        const words = value.split(/\s+/).filter(Boolean)
        return words.every(word => word.length <= 16)
      },
      {
        message: 'No word can be longer than 16 characters.'
      }
    ),
  secondaryInputContent: z
    .string()
    .optional()
    // Step 1: Remove punctuation and whitespace.
    .transform(value => (value ? value.replace(/[\s\p{P}]/gu, '') : value))
    // Step 2: Validate that the string contains only alphabetical characters.
    .refine(value => value === undefined || /^[A-Za-z]*$/.test(value), {
      message: 'Given letters must contain only alphabetical characters'
    })
    // Step 3: Remove duplicate letters preserving order.
    .transform(value =>
      value ? Array.from(new Set(value.split(''))).join('') : value
    )
    // Step 4: Ensure that there are at most 26 unique letters.
    .refine(value => value === undefined || value.length <= 26, {
      message: 'Maximum unique letters allowed is 26'
    })
})
