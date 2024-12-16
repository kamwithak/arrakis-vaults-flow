"use client"

import { useAccount, useDisconnect } from "wagmi"
import { Navbar, Footer } from "@/app/components"
import { Select, Input } from "@/app/components"
import { useTokenSelect } from "../hooks/useTokenSelect"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { depositSchema } from "../schemas/depositSchema"
import type { DepositFormData } from "../types"
import { Button } from "@radix-ui/themes"

export function ClientContent() {
  const { selected, setSelected, options } = useTokenSelect()
  const { isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<DepositFormData>({
    resolver: zodResolver(depositSchema),
    mode: 'onChange',
    defaultValues: {
      amount: ''
    }
  })

  const onSubmit = (data: DepositFormData) => {
    console.log('Deposit amount:', data.amount)
  }

  return (
    <>
      <Navbar
        isConnected={isConnected}
        onDisconnect={disconnect}
      />
      <main className="flex-1 flex items-center justify-center">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold text-gray-100"> 
              Approve and then deposit into Arrakis Vaults
            </h1>
            <p className="text-sm text-gray-300">
              Requires approval of the token before depositing
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
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
            <Button 
              type="submit"
              disabled={!selected}
              size="3"
              className="disabled:bg-gray-700 disabled:hover:bg-gray-700 disabled:text-gray-500 bg-blue-600 hover:bg-blue-500 text-white"
            >
              Deposit
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  )
}