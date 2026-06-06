import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children: ReactNode;
}

const sizeClasses = {
  sm: "px-4 pt-2 pb-1 text-sm rounded-[4px]",
  md: "px-6 pt-3 pb-2 text-base rounded-[8px]",
  lg: "px-8 pt-3.5 pb-2.5 text-lg rounded-[16px]",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 font-[family-name:var(--font-body)] font-medium tracking-[0.04em] leading-none transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed select-none";

const variantClasses = {
  primary:
    "bg-[var(--color-primary)] text-white hover:opacity-85 active:scale-[0.98]",
  secondary:
    "border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white active:scale-[0.98]",
};

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="size-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
      )}
      {children}
    </button>
  );
}
