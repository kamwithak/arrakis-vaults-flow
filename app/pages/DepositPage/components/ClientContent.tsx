"use client"

import { useAccount, useDisconnect } from "wagmi"
import { Navbar } from "@/app/components/Navbar"
import { Select } from "@/app/components/Select/Select"
import { useTokenSelect } from "../hooks/useTokenSelect"

export function ClientContent() {
  const { selected, setSelected, options } = useTokenSelect()
  const { isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  return (
    <>
      <Navbar
        isConnected={isConnected}
        onDisconnect={disconnect}
      />
      <main className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-8">
          <Select
            options={options}
            value={selected}
            onValueChange={setSelected}
            placeholder="Select a token..."
            className="w-[180px]"
          />
        </div>
      </main>
    </>
  )
}