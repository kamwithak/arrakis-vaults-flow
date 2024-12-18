import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../utils/test-utils'
import userEvent from '@testing-library/user-event'
import { ClientContent } from '@/app/pages/DepositPage/components/ClientContent'

// Mock hooks
vi.mock('wagmi', async () => {
  const actual = await vi.importActual('wagmi')
  return {
    ...actual,
    useAccount: () => ({
      isConnected: true,
    }),
    useDisconnect: () => ({
      disconnect: vi.fn(),
    }),
  }
})

vi.mock('@/app/pages/DepositPage/hooks/useDepositForm', () => ({
  useDepositForm: () => ({
    form: {
      register: () => ({}),
      handleSubmit: (fn: any) => fn,
      errors: {},
      isSubmitting: false,
      onSubmit: vi.fn(),
    },
    token: {
      selected: 'weth',
      setSelected: vi.fn(),
      options: [
        { value: 'weth', label: 'WETH' },
        { value: 'reth', label: 'RETH' },
      ],
    },
    state: {
      amount: '1.0',
      error: null,
      hasAllowance: false,
      hasWethAllowance: false,
      hasRethAllowance: false,
    },
  }),
}))

describe('ClientContent', () => {
  it('should render form elements', () => {
    render(<ClientContent />)
    
    expect(screen.getByPlaceholderText('Deposit token')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Deposit amount')).toBeInTheDocument()
  })

  it('should handle token selection', async () => {
    render(<ClientContent />)
    const user = userEvent.setup()
    
    const select = screen.getByPlaceholderText('Deposit token')
    await user.click(select)
    
    expect(screen.getByText('WETH')).toBeInTheDocument()
    expect(screen.getByText('RETH')).toBeInTheDocument()
  })
}) 