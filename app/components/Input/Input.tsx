'use client'

import * as React from 'react'
import { clsx } from 'clsx'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  className?: string
}

export function Input({ 
  label,
  error,
  className,
  ...props 
}: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm text-gray-200">
          {label}
        </label>
      )}
      <input
        type="number"
        className={clsx(
          "rounded-md p-4 text-sm",
          "bg-gray-800 border border-blue-600 text-white",
          "focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600",
          "placeholder:text-gray-400",
          className
        )}
        {...props}
      />
      {error && (
        <span className="text-sm text-red-500">
          {error}
        </span>
      )}
    </div>
  )
} 