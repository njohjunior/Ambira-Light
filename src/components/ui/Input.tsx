import type { InputHTMLAttributes, ReactNode } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
  error?: string
  leftIcon?: ReactNode
}

export default function Input({
  label,
  hint,
  error,
  leftIcon,
  id,
  className = '',
  ...props
}: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
  const hasError = Boolean(error)

  return (
    <div className="flex flex-col gap-1.5 w-full">

      {label && (
        <label
          htmlFor={inputId}
          className="font-[family-name:var(--font-body)] text-sm font-medium tracking-[0.06em] uppercase text-[var(--color-dark)] dark:text-[#E0E0E0]"
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {leftIcon && (
          <span className="absolute left-3.5 flex items-center text-[var(--color-light)] pointer-events-none">
            {leftIcon}
          </span>
        )}

        <input
          id={inputId}
          className={[
            'w-full rounded-xl bg-transparent px-4 py-3 text-base',
            'font-[family-name:var(--font-body)] text-[var(--color-dark)] dark:text-[#E0E0E0]',
            'placeholder:text-[var(--color-light)] placeholder:font-light',
            'border transition-all duration-200 outline-none',
            leftIcon ? 'pl-10' : '',
            hasError
              ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-400/20'
              : 'border-[var(--color-light)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20',
            'disabled:opacity-40 disabled:cursor-not-allowed',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          {...props}
        />
      </div>

      {(hint || error) && (
        <p
          className={[
            'text-sm font-[family-name:var(--font-body)] font-light',
            hasError ? 'text-red-400' : 'text-[var(--color-light)]',
          ].join(' ')}
        >
          {error ?? hint}
        </p>
      )}

    </div>
  )
}
