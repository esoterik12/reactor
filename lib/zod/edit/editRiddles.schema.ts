import { z } from 'zod'

export const editRiddlesSchema = z.object({
  data: z
    .array(z.string().min(1, { message: 'Text is required.' }))
    .max(255, { message: 'Input cannot support more than 255 characters.' })
})

export type EditRiddlesFormValues = z.infer<typeof editRiddlesSchema>


