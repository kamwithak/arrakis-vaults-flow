import { http, createConfig } from "wagmi";
import { arbitrum, base, mainnet, optimism } from "wagmi/chains";
import { injected, metaMask, safe } from "wagmi/connectors";

// const projectId = '<WALLETCONNECT_PROJECT_ID>' // TODO: point to .env

export const config = createConfig({
  chains: [mainnet, base],
  connectors: [
    injected(),
    // walletConnect({ projectId }),
    metaMask(),
    safe(),
  ],
  transports: {
    [mainnet.id]: http(),
    [optimism.id]: http(),
    [arbitrum.id]: http(),
    [base.id]: http(),
  },
});
