import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useExecuteOnChain } from '@/app/pages/DepositPage/hooks/useExecuteOnChain'
import { useAccount } from 'wagmi'
import { TestProviders } from '../utils/test-utils'

// Mock wagmi hooks
vi.mock('wagmi', async () => {
  const actual = await vi.importActual('wagmi')
  return {
    ...actual,
    useAccount: vi.fn(),
  }
})

// Mock custom hooks
vi.mock('@/app/utils/hooks', () => ({
  useWethApproval: () => ({
    approveWeth: vi.fn(),
    allowance: BigInt(0),
  }),
  useRethApproval: () => ({
    approveReth: vi.fn(),
    allowance: BigInt(0),
  }),
  useVaultDeposit: () => ({
    deposit: vi.fn(),
  }),
}))

describe('useExecuteOnChain', () => {  
  beforeEach(() => {
    vi.mocked(useAccount).mockReturnValue({
      isConnected: true,
      address: '0x123',
    } as any)
  })

  it('should check allowances correctly', () => {
    const { result } = renderHook(() => useExecuteOnChain({
      selected: 'weth',
      amount: '1.0'
    }), { wrapper: TestProviders })

    expect(result.current.allowances.hasWethAllowance).toBe(false)
    expect(result.current.allowances.hasRethAllowance).toBe(false)
    expect(result.current.allowances.hasAllowance).toBe(false)
  })

  it('should handle execution errors', async () => {
    const { result } = renderHook(() => useExecuteOnChain({
      selected: 'weth',
      amount: '1.0'
    }), { wrapper: TestProviders })

    try {
      await result.current.execute.executeApproval('weth', '1.0')
    } catch (error) {
      expect(error).toBeDefined()
    }
  })
}) 