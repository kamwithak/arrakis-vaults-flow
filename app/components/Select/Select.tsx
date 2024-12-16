'use client'

import * as RadixSelect from '@radix-ui/react-select'
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import { clsx } from 'clsx'
import Image from 'next/image'
import { SelectOption } from './useSelect'

interface SelectProps {
  options: SelectOption[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  className?: string
}

export function Select({ 
  options, 
  value, 
  onValueChange, 
  placeholder = "Select an option...",
  className 
}: SelectProps) {
  const selectedOption = options.find(opt => opt.value === value)

  return (
    <RadixSelect.Root value={value} onValueChange={onValueChange}>
      <RadixSelect.Trigger 
        className={clsx(
          "inline-flex items-center justify-between rounded-md p-4 text-sm",
          "bg-gray-800 border border-blue-600 text-white",
          "focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600",
          className
        )}
      >
        <div className="flex items-center gap-2.5">
          {selectedOption && (
            <Image
              src={selectedOption.imageUrl}
              alt=""
              width={20}
              height={20}
              className="rounded-full"
            />
          )}
          <RadixSelect.Value placeholder={placeholder} />
        </div>
        <RadixSelect.Icon>
          <ChevronDownIcon className="text-white" />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content 
          className="overflow-hidden bg-gray-800 rounded-md shadow-lg border border-blue-600 text-white"
        >
          <RadixSelect.ScrollUpButton className="flex items-center justify-center h-6 bg-gray-800 cursor-default">
            <ChevronUpIcon className="text-white" />
          </RadixSelect.ScrollUpButton>
          
          <RadixSelect.Viewport className="p-1">
            {options.map((option) => (
              <RadixSelect.Item
                key={option.value}
                value={option.value}
                className={clsx(
                  "relative flex items-center p-4 text-sm rounded-sm gap-2.5",
                  "hover:bg-gray-700",
                  "focus:outline-none cursor-pointer",
                  "radix-highlighted:bg-blue-600 radix-highlighted:text-white"
                )}
              >
                <Image
                  src={option.imageUrl}
                  alt=""
                  width={20}
                  height={20}
                  className="rounded-full"
                />
                <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>

          <RadixSelect.ScrollDownButton className="flex items-center justify-center h-6 bg-gray-800 cursor-default">
            <ChevronDownIcon className="text-white" />
          </RadixSelect.ScrollDownButton>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  )
}
