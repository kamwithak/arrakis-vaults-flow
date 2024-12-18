import { z } from "zod"
import { TokenType } from "../types"

export const depositSchema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => !isNaN(Number(val)), "Must be a number")
    .refine((val) => Number(val) > 0, "Must be greater than 0"),
  tokenType: z.enum(['weth', 'reth'] as [TokenType, TokenType]),
})

export type DepositFormData = z.infer<typeof depositSchema> 