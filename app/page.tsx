'use client'

import { useState } from "react";
import { ConnectWallet } from "./components/ConnectWallet";
import { Select } from "./components/Select/Select";

const tokenOptions = [
  { 
    value: 'weth', 
    label: 'WETH',
    imageUrl: '/tokens/weth.png'
  },
  { 
    value: 'reth', 
    label: 'RETH',
    imageUrl: '/tokens/rpl.png'
  },
]

export default function App() {
  const [selectedToken, setSelectedToken] = useState<string | undefined>(undefined);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="w-full bg-gray-800 border-b border-blue-600 px-6 py-4">
        <h1 className="text-3xl font-bold text-white">
          Arrakis Vault Application
        </h1>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-8">
          <Select
            options={tokenOptions}
            value={selectedToken}
            onValueChange={setSelectedToken}
            placeholder="Select a token..."
            className="w-[140px]"
          />
          <ConnectWallet />
        </div>
      </main>
    </div>
  );
}
