import { useMemo } from 'react'
import { useAccount, useChainId, useWriteContract, useReadContract } from 'wagmi'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ADDRESSES } from '../contracts/addresses'
import { ERC20_ABI } from '../contracts/abis'
import { parseEther, type TransactionReceipt } from 'viem'

interface UseWethApproval {
  approveWeth: (amount: string) => Promise<TransactionReceipt>
  allowance: bigint | undefined
  isLoading: boolean
  isError: boolean
}

export function useWethApproval(): UseWethApproval {
  const chainId = useChainId()
  const { address: userAddress } = useAccount()
  
  const addresses = useMemo(() => {
    return chainId === 1 ? ADDRESSES.MAINNET : ADDRESSES.SEPOLIA
  }, [chainId])

  const { writeContractAsync } = useWriteContract()

  const { data: allowance, isLoading, isError } = useQuery({
    queryKey: ['allowance', 'weth', userAddress, addresses.VAULT],
    queryFn: () => useReadContract({
      address: addresses.WETH,
      abi: ERC20_ABI,
      functionName: 'allowance',
      args: [userAddress!, addresses.VAULT],
    }),
    enabled: !!userAddress,
  })

  const { mutateAsync: approveWeth } = useMutation({
    mutationFn: async (amount: string) => {
      try {
        const tx = await writeContractAsync({
          address: addresses.WETH,
          abi: ERC20_ABI,
          functionName: 'approve',
          args: [addresses.VAULT, parseEther(amount)]
        })
        return tx as unknown as TransactionReceipt
      } catch (error) {
        console.error('WETH approval error:', error)
        throw error
      }
    }
  })

  return {
    approveWeth,
    allowance: allowance as bigint | undefined,
    isLoading,
    isError
  }
} 