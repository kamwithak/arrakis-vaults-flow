"use client"

import { useAccount, useDisconnect } from "wagmi"
import { Navbar, Footer } from "@/app/components"
import { Select, Input } from "@/app/components"
import { useTokenSelect } from "../hooks/useTokenSelect"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { depositSchema } from "../schemas/depositSchema"
import type { DepositFormData, TokenType } from "../types"
import { ExecuteButton } from "./ExecuteButton"
import { useExecuteOnChain } from "../hooks/useExecuteOnChain"

export function ClientContent() {
  const { selected, setSelected, options } = useTokenSelect()
  const { isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  
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
    isConnected
  })

  const onSubmit = async (data: DepositFormData) => {
    console.log('Form submitted:', { data, selected, amount })
    
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

  return (
    <>
      <Navbar
        isConnected={isConnected}
        onDisconnect={disconnect}
      />
      <main className="flex-1 flex items-center justify-center">
        <div className="flex flex-col gap-8 w-[500px]">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold text-gray-100"> 
              Approve and then deposit into Arrakis Vaults
            </h1>
            <p className="text-sm text-gray-300">
              Requires approval of the token before depositing
            </p>
          </div>
          <form 
            onSubmit={handleSubmit(onSubmit)} 
            className="flex flex-col gap-8"
          >
            <div className="flex items-start gap-4">
              <Select
                options={options}
                value={selected}
                onValueChange={setSelected}
                placeholder="Deposit token"
                className="w-[180px]"
              />
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Input
                    {...register('amount')}
                    placeholder="Deposit amount"
                    disabled={!selected}
                    className="w-[180px]"
                  />
                  <p className="text-gray-100 text-bold text-3xl">
                    {options.find(option => option.value === selected)?.label}
                  </p>
                </div>
                {errors.amount && (
                  <p className="text-sm text-red-500">
                    {errors.amount.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <ExecuteButton
                isSubmitting={isSubmitting}
                hasAllowance={hasAllowance}
                hasWethAllowance={hasWethAllowance}
                hasRethAllowance={hasRethAllowance}
                disabled={isSubmitting || !isConnected || !selected || !amount}
                selectedToken={selected as TokenType}
              />
              <div className="h-6">
                {error && (
                  <p className="text-sm text-red-500">
                    Error: {error}
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  )
}