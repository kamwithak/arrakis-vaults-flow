'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { depositSchema } from "../schemas/depositSchema"
import type { DepositFormData, TokenType } from "../types"
import { useTokenSelect } from "./useTokenSelect"
import { useExecuteOnChain } from "./useExecuteOnChain"

export function useDepositForm() {
  const { selected, setSelected, options } = useTokenSelect()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<DepositFormData>({
    resolver: zodResolver(depositSchema),
    mode: 'onChange',
    defaultValues: {
      amount: '',
      tokenType: 'weth'
    }
  })

  const amount = watch('amount')

  const { 
    allowances: { hasAllowance, hasWethAllowance, hasRethAllowance },
    execute: { executeApproval, executeDeposit },
    error,
    setError
  } = useExecuteOnChain({
    selected,
    amount,
  })

  const onSubmit = async (data: DepositFormData) => {
    if (!selected) return

    try {
      if (!hasAllowance) {
        const tokenType = selected as TokenType
        const needsWethApproval = tokenType === 'weth' && !hasWethAllowance
        const needsRethApproval = tokenType === 'reth' && !hasRethAllowance

        if (needsWethApproval || needsRethApproval) {
          await executeApproval(tokenType, data.amount)
          return
        }
      }
      await executeDeposit(data.amount)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Transaction failed')
    }
  }

  return {
    form: {
      register,
      handleSubmit,
      errors,
      isSubmitting,
      onSubmit
    },
    token: {
      selected,
      setSelected,
      options
    },
    state: {
      amount,
      error,
      hasAllowance,
      hasWethAllowance,
      hasRethAllowance
    }
  }
} 