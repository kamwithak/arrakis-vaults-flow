'use client'

import { useState } from 'react'
import { useWethApproval, useRethApproval } from "@/app/utils/hooks"
import { parseEther } from "viem"
import { ContractFunctionExecutionError } from "viem"
import { TokenType } from '../types'

interface UseExecuteOnChainProps {
  selected?: string
  amount?: string
  isConnected: boolean
}

interface UseExecuteOnChainReturn {
  allowances: {
    hasAllowance: boolean
    hasWethAllowance: boolean
    hasRethAllowance: boolean
  }
  execute: {
    executeApproval: (tokenType: 'weth' | 'reth', amount: string) => Promise<void>
    executeDeposit: (amount: string) => Promise<void>
  }
  error: string | undefined
  setError: (error: string | undefined) => void
}

export function useExecuteOnChain({ 
  selected, 
  amount,
  isConnected 
}: UseExecuteOnChainProps): UseExecuteOnChainReturn {
  const [error, setError] = useState<string>()
  
  const { approveWeth, allowance: wethAllowance } = useWethApproval()
  const { approveReth, allowance: rethAllowance } = useRethApproval()

  const checkAllowance = (allowance: bigint | undefined, amount: string) => {
    try {
      return Boolean(allowance && allowance >= parseEther(amount))
    } catch {
      return false
    }
  }

  const hasWethAllowance = amount ? checkAllowance(wethAllowance, amount) : false
  const hasRethAllowance = amount ? checkAllowance(rethAllowance, amount) : false
  const hasAllowance = Boolean(hasWethAllowance && hasRethAllowance)

  const handleExecutionError = (error: unknown) => {
    if (error instanceof ContractFunctionExecutionError) {
      if (error.message.includes('User rejected')) {
        throw new Error('Transaction rejected by user')
      }
    }
    throw error
  }

  const executeApproval = async (tokenType: TokenType, amount: string) => {
    if (!isConnected) return
    
    try {
      setError(undefined)
      
      if (tokenType === 'weth' && !hasWethAllowance) {
        await approveWeth(amount)
      } else if (tokenType === 'reth' && !hasRethAllowance) {
        await approveReth(amount)
      }
    } catch (error) {
      console.error('Approval failed:', error)
      handleExecutionError(error)
    }
  }

  const executeDeposit = async (amount: string) => {
    if (!selected || !isConnected) return
    
    try {
      setError(undefined)
      // TODO: Implement deposit logic
      console.log('Deposit amount:', amount)
    } catch (error) {
      console.error('Deposit failed:', error)
      handleExecutionError(error)
    }
  }

  return {
    allowances: {
      hasAllowance,
      hasWethAllowance,
      hasRethAllowance,
    },
    execute: {
      executeApproval,
      executeDeposit,
    },
    error,
    setError
  }
} 