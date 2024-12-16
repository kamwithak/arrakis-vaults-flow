import {
  getDefaultConfig,
} from '@rainbow-me/rainbowkit'
import {
  mainnet,
  sepolia,
} from 'wagmi/chains'
import { http } from 'wagmi'

if (!process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID) {
  throw new Error('Missing NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID')
}

export const config = getDefaultConfig({
  appName: 'Arrakis Vault Application',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
  ssr: true
})
