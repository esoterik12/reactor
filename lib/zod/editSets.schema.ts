import { z } from 'zod'

export const editSetsSchema = z.object({
  data: z.array(
    z.array(
      z.string().min(1, 'Word is required').max(24, '24 character maximum.')
    )
  ),
})

export type EditSetsFormValues = z.infer<typeof editSetsSchema>
