'use client'

import { useMemo } from 'react'
import { useAccount, useChainId, useWriteContract } from 'wagmi'
import { useMutation } from '@tanstack/react-query'
import { ADDRESSES } from '../contracts/addresses'
import { VAULT_ABI } from '../contracts/abis'
import { Address, parseEther, type TransactionReceipt } from 'viem'

interface DepositParams {
  amount0Max: string
  amount1Max: string
  amount0Min: string
  amount1Min: string
  amountSharesMin?: string
  receiver?: Address
}

export function useVaultDeposit() {
  const chainId = useChainId()
  const { address: userAddress } = useAccount()
  
  const addresses = useMemo(() => {
    return chainId === 1 ? ADDRESSES.MAINNET : ADDRESSES.SEPOLIA
  }, [chainId])

  const { writeContractAsync } = useWriteContract()

  const { mutateAsync: deposit, ...rest } = useMutation({
    mutationFn: async ({
      amount0Max,
      amount1Max,
      amount0Min,
      amount1Min,
      amountSharesMin = '0',
      receiver
    }: DepositParams) => {
      if (!userAddress) throw new Error('No user address')

      try {
        const tx = await writeContractAsync({
          address: addresses.VAULT,
          abi: VAULT_ABI,
          functionName: 'addLiquidity',
          args: [{
            amount0Max: parseEther(amount0Max),
            amount1Max: parseEther(amount1Max),
            amount0Min: parseEther(amount0Min),
            amount1Min: parseEther(amount1Min),
            amountSharesMin: parseEther(amountSharesMin),
            vault: addresses.VAULT,
            receiver: receiver || userAddress,
            gauge: addresses.VAULT
          }]
        })
        return tx as unknown as TransactionReceipt
      } catch (error) {
        console.error('Deposit error:', error)
        throw error
      }
    }
  })

  return {
    deposit,
    ...rest
  }
} 