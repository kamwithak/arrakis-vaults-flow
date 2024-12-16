"use client"

import { useAccount, useDisconnect } from "wagmi"
import { Navbar } from "@/app/components/Navbar"
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
    resolver: zodResolver(depositSchema)
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
            <h1 className="text-2xl font-bold text-white"> 
              Approve and then deposit into the protocol
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
              <div className="flex items-center gap-2">
                <Input
                  {...register('amount')}
                  placeholder="Deposit amount"
                  className="w-[180px]"
                />
                <p className="text-gray-200">
                  {options.find(option => option.value === selected)?.label}
                </p>
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
            {errors.amount && (
              <p className="text-red-500">
                Error: {errors.amount?.message}
              </p>
            )}
          </form>
        </div>
      </main>
    </>
  )
}