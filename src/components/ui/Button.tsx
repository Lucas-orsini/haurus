import { cn } from '@/lib/utils'
import Link from 'next/link'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  external?: boolean
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  glow?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--accent)] text-black hover:bg-[var(--accent-hi)] hover:scale-[1.02] transition-all duration-200 shadow-[0_0_16px_rgba(242,203,56,0.25)] hover:shadow-[0_0_24px_rgba(242,203,56,0.40)]',
  secondary:
    'bg-[var(--surface-2)] text-[var(--text-2)] hover:text-[var(--text-1)] hover:bg-[var(--surface-1)] border border-[var(--border-md)] transition-all duration-150',
  ghost:
    'bg-transparent text-[var(--text-2)] hover:text-[var(--text-1)] hover:bg-white/[0.04] border border-[var(--border-md)] hover:border-[var(--border-hi)] transition-all duration-150',
  outline:
    'bg-transparent border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent-glow)] transition-all duration-150',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm:  'h-8 px-4 text-xs rounded-md gap-1.5',
  md:  'h-10 px-5 text-sm rounded-lg gap-2',
  lg:  'h-12 px-8 text-sm rounded-full gap-2',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  external,
  iconLeft,
  iconRight,
  glow,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    'font-medium select-none cursor-pointer',
    variantClasses[variant],
    sizeClasses[size],
    className,
  )

  const inner = (
    <>
      {iconLeft && <span className="flex items-center gap-1.5 shrink-0">{iconLeft}</span>}
      {children}
      {iconRight && <span className="flex items-center gap-1.5 shrink-0">{iconRight}</span>}
    </>
  )

  if (href) {
    return external ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {inner}
      </a>
    ) : (
      <Link href={href} className={classes}>
        {inner}
      </Link>
    )
  }

  return (
    <button className={classes} {...props}>
      {inner}
    </button>
  )
}
