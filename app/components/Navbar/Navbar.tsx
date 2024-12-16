import { Button } from "@radix-ui/themes"
import { WalletOptions } from "../WalletOptions"

interface NavbarProps {
  isConnected: boolean
  onDisconnect: () => void
}

export function Navbar({ isConnected, onDisconnect }: NavbarProps) {
  return (
    <nav className="flex justify-between items-center w-full bg-gray-800 border-b border-blue-600 px-6 py-4">
      <h1 className="text-3xl font-bold text-white">
        Arrakis Vault Deposit Page
      </h1>
      {!isConnected ? (
        <WalletOptions />
      ) : (
        <Button
          onClick={onDisconnect}
          size="3"
          color="red"
        >
          Disconnect
        </Button>
      )}
    </nav>
  )
} 