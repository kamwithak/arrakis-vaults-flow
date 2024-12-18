'use client'

import { Button } from "@radix-ui/themes"
import { TokenType } from "../types"

interface ExecuteButtonProps {
  isSubmitting: boolean
  hasAllowance: boolean
  hasWethAllowance: boolean
  hasRethAllowance: boolean
  disabled: boolean
  selectedToken?: TokenType
  onClick?: () => void
}

export function ExecuteButton({ 
  isSubmitting,
  hasAllowance,
  hasWethAllowance,
  hasRethAllowance,
  disabled,
  selectedToken,
  onClick
}: ExecuteButtonProps) {
  const getButtonText = () => {
    if (!selectedToken) return 'Select Token'
    
    if (isSubmitting) {
      if (hasAllowance) return 'Depositing...'
      return `Approving ${selectedToken.toUpperCase()}...`
    }
    
    if (hasAllowance) return 'Deposit'
    
    const needsApproval = selectedToken === 'weth' 
      ? !hasWethAllowance 
      : !hasRethAllowance

    if (needsApproval) {
      return `Approve ${selectedToken.toUpperCase()}`
    }

    return 'Approve'
  }

  return (
    <Button
      type="submit"
      size="3"
      disabled={disabled}
      onClick={onClick}
      className="bg-blue-600 hover:bg-blue-500 text-white disabled:bg-gray-600"
    >
      {getButtonText()}
    </Button>
  )
} 