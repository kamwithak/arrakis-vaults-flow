'use client'

import { useState } from 'react'

export interface SelectOption {
  value: string
  label: string
  imageUrl: string
}

interface UseSelectProps<T extends SelectOption> {
  options: T[]
  defaultValue?: string
}

export function useSelect<T extends SelectOption>({ 
  options,
  defaultValue 
}: UseSelectProps<T>) {
  const [selected, setSelected] = useState<string | undefined>(defaultValue)

  return {
    selected,
    setSelected,
    options,
  }
} 