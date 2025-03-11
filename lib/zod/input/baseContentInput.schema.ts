import { z } from 'zod'

// All schemas that use CurriculumSelector have an extension using
// omit from zod to remove primary input requirement since it is
// filled with the unitData from JSON files

// Used in several content types like crazy check up manual
export const baseContentInputSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is required.' })
    .max(255, { message: 'Title cannot exceed 255 characters.' }),
  primaryInputContent: z
    .string()
    .min(1, { message: 'Input is required.' })
    .max(1000, { message: 'You can only input up to 1000 characters.' })
})

// This is used in Crazy Check Up Selector / Riddles Selector and others for
export const baseContentSelectorSchema = baseContentInputSchema.omit({
  primaryInputContent: true
})
