'use client'

import { cn } from '@/lib/utils'
import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export default function Input({ label, error, disabled, className, id, ...props }: InputProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={inputId}
        className={cn(
          'text-xs font-medium select-none',
          disabled ? 'text-[var(--text-3)]' : 'text-[var(--text-2)]',
        )}
      >
        {label}
      </label>
      <input
        id={inputId}
        disabled={disabled}
        className={cn(
          'h-10 w-full rounded-lg px-3 text-sm text-[var(--text-1)] placeholder:text-[var(--text-3)]',
          'bg-[var(--surface-2)] border border-[var(--border-md)]',
          'outline-none transition-all duration-150',
          'focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)]',
          error && !disabled
            ? 'border-[var(--red)] focus:ring-[var(--red)] focus:border-[var(--red)]'
            : 'hover:border-[var(--border-hi)]',
          disabled && 'opacity-50 cursor-not-allowed',
          className,
        )}
        {...props}
      />
      {error && (
        <p className="text-xs text-[var(--red)] leading-tight">{error}</p>
      )}
    </div>
  )
}
