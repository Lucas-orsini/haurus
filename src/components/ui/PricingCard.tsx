import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import Button from '@/components/ui/Button'

interface PricingCardProps {
  name: string
  price: string
  period?: string
  description: string
  features: string[]
  highlighted?: boolean
  badge?: string
  ctaLabel?: string
  ctaVariant?: 'primary' | 'outline'
  className?: string
}

export default function PricingCard({
  name,
  price,
  period = '/mo',
  description,
  features,
  highlighted = false,
  badge,
  ctaLabel = 'Get started',
  ctaVariant = 'outline',
  className,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        'relative rounded-2xl flex flex-col gap-6 p-8 overflow-hidden transition-all duration-200',
        highlighted
          ? 'border border-[var(--accent)] bg-[var(--surface-1)] shadow-[0_0_32px_rgba(242,203,56,0.08)]'
          : 'border border-[var(--border-md)] bg-[var(--surface-1)] hover:border-[var(--border-hi)]',
        className,
      )}
    >
      {/* Radial glow for highlighted */}
      {highlighted && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(242,203,56,0.10),transparent)] pointer-events-none" />
      )}

      {/* Badge */}
      {badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="px-3 py-1 rounded-full bg-[var(--accent)] text-black text-[11px] font-semibold">
            {badge}
          </span>
        </div>
      )}

      {/* Header */}
      <div>
        <p className="text-sm font-medium text-[var(--text-2)] uppercase tracking-wider">{name}</p>
        <div className="flex items-end gap-1 mt-2">
          <span className="text-4xl font-bold text-[var(--text-1)] tracking-tight">{price}</span>
          <span className="text-[var(--text-3)] text-sm mb-1.5">{period}</span>
        </div>
        <p className="text-sm text-[var(--text-3)] mt-3 leading-relaxed">{description}</p>
      </div>

      {/* Features */}
      <ul className="flex flex-col gap-2.5 flex-1">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm text-[var(--text-2)]">
            <Check
              size={14}
              strokeWidth={2}
              className="text-[var(--accent)] shrink-0 mt-0.5"
            />
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Button
        href="#"
        variant={highlighted ? 'primary' : ctaVariant}
        size="lg"
        className={cn(
          'w-full',
          highlighted && 'mt-auto',
        )}
      >
        {ctaLabel}
      </Button>
    </div>
  )
}
