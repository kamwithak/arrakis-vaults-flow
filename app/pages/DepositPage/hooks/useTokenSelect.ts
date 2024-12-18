'use client'

import { tokenOptions } from "../config/tokens"
import { useSelect } from "@/app/components/Select/useSelect"

export function useTokenSelect() {
  return useSelect({
    options: tokenOptions
  })
} 