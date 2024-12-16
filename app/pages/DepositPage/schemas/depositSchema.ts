import { z } from "zod"

export const depositSchema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => !isNaN(Number(val)), "Must be a number")
    .refine((val) => Number(val) > 0, "Must be greater than 0")
})

export type DepositFormData = z.infer<typeof depositSchema> 