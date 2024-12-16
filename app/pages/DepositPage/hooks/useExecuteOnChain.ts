'use client'

import { useState } from 'react'
import { useWethApproval, useRethApproval } from "@/app/utils/hooks"
import { parseEther } from "viem"
import { ContractFunctionExecutionError } from "viem"

interface UseExecuteOnChainProps {
  selected?: string
  amount?: string
  isConnected: boolean
}

interface UseExecuteOnChain {
  hasAllowance: boolean
  error: string | undefined
  executeApproval: (amount: string) => Promise<void>
  executeDeposit: (amount: string) => Promise<void>
  setError: (error: string | undefined) => void
}

export function useExecuteOnChain({ 
  selected, 
  amount,
  isConnected 
}: UseExecuteOnChainProps): UseExecuteOnChain {
  const [error, setError] = useState<string>()
  
  const { approveWeth, allowance: wethAllowance } = useWethApproval()
  const { approveReth, allowance: rethAllowance } = useRethApproval()

  const hasAllowance = selected && amount && (() => {
    const allowance = selected === 'weth' ? wethAllowance : rethAllowance
    try {
      return allowance && allowance >= parseEther(amount)
    } catch {
      return false
    }
  })()

  const handleExecutionError = (error: unknown) => {
    if (error instanceof ContractFunctionExecutionError) {
      if (error.message.includes('User rejected')) {
        throw new Error('Transaction rejected by user')
      }
    }
    throw error
  }

  const executeApproval = async (amount: string) => {
    if (!selected || !isConnected) return
    
    try {
      setError(undefined)
      const approve = selected === 'weth' ? approveWeth : approveReth
      await approve(amount)
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
    hasAllowance: !!hasAllowance,
    error,
    executeApproval,
    executeDeposit,
    setError
  }
} 