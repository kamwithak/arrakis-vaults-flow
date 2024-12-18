"use client"

import dynamic from 'next/dynamic'

// Dynamically import the client component with no SSR
const ClientContent = dynamic(
  () => import('./components/ClientContent').then(mod => mod.ClientContent),
  { ssr: false }
)

export function DepositPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <ClientContent />
    </div>
  )
} 