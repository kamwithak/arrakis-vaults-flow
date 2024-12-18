import { Button } from "@radix-ui/themes"
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Image from 'next/image'

interface NavbarProps {
  isConnected: boolean
  onDisconnect: () => void
}

export function Navbar({ isConnected, onDisconnect }: NavbarProps) {
  return (
    <nav className="flex justify-between items-center w-full bg-gray-800 border-b border-blue-600 px-6 py-4">
      <div className="flex items-center gap-4">
        <Image
          src="/arrakis.png"
          alt="Arrakis Logo"
          width={40}
          height={40}
          className="rounded-md"
        />
        <h1 className="text-3xl font-bold text-white">
          Arrakis Vaults Application
        </h1>
      </div>
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