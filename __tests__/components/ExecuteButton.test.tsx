import { describe, it, expect } from 'vitest'
import { render, screen } from '../utils/test-utils'
import { ExecuteButton } from '@/app/pages/DepositPage/components/ExecuteButton'

describe('ExecuteButton', () => {
  it('should render select token text when no token selected', () => {
    render(
      <ExecuteButton
        isSubmitting={false}
        hasAllowance={false}
        hasWethAllowance={false}
        hasRethAllowance={false}
        disabled={false}
      />
    )

    expect(screen.getByText('Select Token')).toBeInTheDocument()
  })

  it('should render approve text for WETH', () => {
    render(
      <ExecuteButton
        isSubmitting={false}
        hasAllowance={false}
        hasWethAllowance={false}
        hasRethAllowance={false}
        disabled={false}
        selectedToken="weth"
      />
    )

    expect(screen.getByText('Approve WETH')).toBeInTheDocument()
  })

  it('should render deposit text when approved', () => {
    render(
      <ExecuteButton
        isSubmitting={false}
        hasAllowance={true}
        hasWethAllowance={true}
        hasRethAllowance={true}
        disabled={false}
        selectedToken="weth"
      />
    )

    expect(screen.getByText('Deposit')).toBeInTheDocument()
  })
}) 