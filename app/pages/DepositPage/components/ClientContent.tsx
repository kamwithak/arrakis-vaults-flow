"use client"

import { useAccount, useDisconnect } from "wagmi"
import { Navbar, Footer } from "@/app/components"
import { Select, Input } from "@/app/components"
import { ExecuteButton } from "./ExecuteButton"
import { useDepositForm } from "../hooks/useDepositForm"
import { TokenType } from "../types"

export function ClientContent() {
  const { disconnect } = useDisconnect()
  const { isConnected } = useAccount()

  const {
    form: { register, handleSubmit, errors, isSubmitting, onSubmit },
    token: { selected, setSelected, options },
    state: { 
      amount, 
      error, 
      hasAllowance,
      hasWethAllowance,
      hasRethAllowance
    }
  } = useDepositForm()

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