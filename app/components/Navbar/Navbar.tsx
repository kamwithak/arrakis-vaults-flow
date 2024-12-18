import { Button } from "@radix-ui/themes"
import { ConnectButton } from '@rainbow-me/rainbowkit'

interface NavbarProps {
  isConnected: boolean
  onDisconnect: () => void
}

export function Navbar({ isConnected, onDisconnect }: NavbarProps) {
  return (
    <nav className="flex justify-between items-center w-full bg-gray-800 border-b border-blue-600 px-6 py-4">
      <h1 className="text-3xl font-bold text-white">
        Arrakis Vault Application
      </h1>
      {!isConnected ? (
        <ConnectButton />
      ) : (
        <Button
          onClick={onDisconnect}
          size="3"
          color="red"
          radius="large"
        >
          Disconnect
        </Button>
      )}
    </nav>
  )
} 