'use client'

import { Button } from "@radix-ui/themes"

interface ExecuteButtonProps {
  isSubmitting: boolean
  hasAllowance: boolean
  disabled: boolean
}

export function ExecuteButton({ 
  isSubmitting,
  hasAllowance,
  disabled
}: ExecuteButtonProps) {
  return (
    <Button
      type="submit"
      size="3"
      disabled={disabled}
      className="bg-blue-600 hover:bg-blue-500 text-white disabled:bg-gray-600"
    >
      {isSubmitting 
        ? hasAllowance ? 'Depositing...' : 'Approving...'
        : hasAllowance ? 'Deposit' : 'Approve'
      }
    </Button>
  )
} 