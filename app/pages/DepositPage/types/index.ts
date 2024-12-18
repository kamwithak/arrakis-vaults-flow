export type TokenType = 'weth' | 'reth'

export interface DepositFormData {
  amount: string
  tokenType: TokenType
} 