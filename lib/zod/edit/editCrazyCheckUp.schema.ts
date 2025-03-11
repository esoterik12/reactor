import { z } from 'zod'

// Define the command type union
export const commandTypeSchema = z.union([
  z.literal('doAnAction'),
  z.literal('speakOrAsk'),
  z.literal('writeOnThisPaper'),
  z.literal('useWhiteboard'),
  z.literal('drawOnThisPaper'),
  z.literal('useScrapPaper'),
  z.literal('findSomething'),
])

// Schema for a single command
export const singleCrazyCheckUpCommandSchema = z.object({
  commandType: commandTypeSchema,
  command: z
    .string()
    .min(3, { message: 'A command must have at least 3 characters.' })
    .max(255, { message: 'A command cannot exceed 255 characters.' })
})

// Overall schema for the edit form
export const editCrazyCheckUpSchema = z.object({
  data: z.array(singleCrazyCheckUpCommandSchema)
})

// Inferred TypeScript types
export type CrazyCheckUpCommand = z.infer<typeof singleCrazyCheckUpCommandSchema>
export type EditCrazyCheckUpFormValues = z.infer<typeof editCrazyCheckUpSchema>
