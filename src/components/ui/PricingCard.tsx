'use client'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface PricingCardProps {
  name: string
  price: string
  period?: string
  desc: string
  features: string[]
  cta?: string
  highlight?: boolean
}

export default function PricingCard({
  name,
  price,
  period,
  desc,
  features,
  cta = 'Commencer',
  highlight = false,
}: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        'relative rounded-2xl flex flex-col gap-5 p-6 overflow-hidden',
        highlight
          ? 'border border-[var(--accent)] bg-[var(--surface-2)]'
          : 'border border-[var(--border-md)] bg-[var(--surface-1)]'
      )}
    >
      {/* Top accent for highlighted card */}
      {highlight && (
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-50" />
      )}

      {/* Header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-[var(--text-1)]">{name}</h3>
          {highlight && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20">
              Populaire
            </span>
          )}
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-[var(--text-1)]">{price}</span>
          {period && (
            <span className="text-sm text-[var(--text-3)]">/{period}</span>
          )}
        </div>
        <p className="text-sm text-[var(--text-2)] leading-relaxed">{desc}</p>
      </div>

      {/* Separator */}
      <div className="border-t border-[var(--border-md)]" />

      {/* Features list */}
      <ul className="flex flex-col gap-2.5 flex-1">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm text-[var(--text-2)]">
            <Check
              size={13}
              strokeWidth={2}
              className="shrink-0 mt-0.5"
              style={{ color: highlight ? 'var(--accent)' : 'var(--text-3)' }}
            />
            {feature}
          </li>
        ))}
      </ul>

      {/* Separator */}
      <div className="border-t border-[var(--border-md)]" />

      {/* CTA */}
      <div className="flex justify-center">
        <Button
          href="#pricing"
          variant={highlight ? 'primary' : 'secondary'}
          size="md"
          className="w-full"
        >
          {cta}
        </Button>
      </div>
    </motion.div>
  )
}
