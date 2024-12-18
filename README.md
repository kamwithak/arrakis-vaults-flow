# Arrakis Vault Application

A Next.js application for interacting with Arrakis Vaults on Arbitrum.

## Visuals and deployment

Deployment: https://arrakis-vaults-flow.vercel.app/

https://github.com/user-attachments/assets/b99ea88f-80bf-491d-969b-3e8125d98c47

## Directory Structure

```
app/
├── components/           # Shared components
│   ├── Account/
│   ├── Footer/
│   ├── Input/
│   ├── Navbar/
│   ├── Select/
│   └── WalletOptions/
├── pages/               # Page components
│   └── DepositPage/
│       ├── components/
│       ├── hooks/
│       ├── schemas/
│       └── types/
├── utils/              # Utility functions and hooks
│   ├── contracts/      # Contract ABIs and addresses
│   └── hooks/          # Custom hooks for contract interactions
├── providers.tsx       # App providers configuration
└── config.ts           # App configuration
```

## Installed Packages

### Core Dependencies
- `next`: 15.1.0 - React framework
- `react`: 19.0.0 - UI library
- `react-dom`: 19.0.0 - React DOM bindings

### Web3 Integration
- `@rainbow-me/rainbowkit`: 2.2.1 - Wallet connection UI
- `wagmi`: 2.14.1 - React hooks for Ethereum
- `viem`: 2.x - Low-level Ethereum interactions

### UI Components
- `@radix-ui/themes`: 3.1.6 - UI component library
- `@radix-ui/react-select`: 2.1.3 - Select component
- `@radix-ui/react-icons`: 1.3.2 - Icon set
- `clsx`: 2.1.1 - CSS class utilities

### Form Handling
- `react-hook-form`: 7.54.1 - Form state management
- `@hookform/resolvers`: 3.9.1 - Form validation resolvers
- `zod`: 3.24.1 - Schema validation

### Data Management
- `@tanstack/react-query`: 5.62.7 - Server state management

### Development Dependencies
- `typescript`: 5.x - Type checking
- `tailwindcss`: 3.4.1 - CSS framework
- `eslint`: 9.x - Code linting
- `postcss`: 8.x - CSS processing
- `pino-pretty`: 10.3.1 - Log formatting

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Required environment variables:
```
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Wagmi Documentation](https://wagmi.sh)
- [RainbowKit Documentation](https://www.rainbowkit.com/docs/introduction)
- [Arrakis Documentation](https://docs.arrakis.fi)

## Approval and Deposit Flow

### Token Approval Process
1. User connects wallet via RainbowKit
2. Selects token (WETH or RETH) and enters deposit amount
3. Each token requires separate approval:
   - Checks existing allowance against vault contract
   - If allowance insufficient, triggers approval transaction
   - Handles user rejections and transaction errors

### Deposit Process
1. Both token approvals must be completed
2. Deposit executed through Arrakis vault contract
3. Uses `addLiquidity` function with parameters:
   ```typescript
   {
     amount0Max: string    // Maximum amount of token0 to deposit
     amount1Max: string    // Maximum amount of token1 to deposit
     amount0Min: string    // Minimum amount of token0 to accept
     amount1Min: string    // Minimum amount of token1 to accept
     amountSharesMin: string // Minimum shares to receive
     vault: address       // Vault contract address
     receiver: address    // Address receiving the LP tokens
     gauge: address       // Gauge contract address
   }
   ```

### Error Handling
- Handles wallet connection errors
- Manages approval transaction failures
- Provides feedback for user rejections
- Validates input amounts
- Checks network conditions

### State Management
- Uses React Query for transaction state
- Manages loading states during approvals
- Tracks allowances for both tokens
- Handles form validation with Zod
- Provides real-time feedback

## Contract Addresses

### Arbitrum
```
WETH: 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1
RETH: 0xEC70Dcb4A1EFa46b8F2D97C310C9c4790ba5ffA8
VAULT: 0x4CA9Fb1F302B6bD8421bAd9dEbd22198eB6aB723
```


