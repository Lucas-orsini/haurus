import { cn } from '@/lib/utils'

interface SpeedGaugeProps {
  paceIndex: number | null
  name: string
  surface: string
}

export default function SpeedGauge({ paceIndex, name, surface }: SpeedGaugeProps) {
  const getPaceLabel = (index: number | null): { label: string; colorClass: string } => {
    if (index === null) return { label: '—', colorClass: 'text-[var(--text-2)]' }
    if (index < 0.80) return { label: 'lent', colorClass: 'text-[var(--red)]' }
    if (index > 1.20) return { label: 'rapide', colorClass: 'text-[var(--green)]' }
    return { label: 'moyen', colorClass: 'text-[var(--yellow)]' }
  }

  const { label, colorClass } = getPaceLabel(paceIndex)
  const cursorPercent = paceIndex !== null ? (paceIndex / 2) * 100 : 50

  const hasData = paceIndex !== null

  return (
    <div className="flex flex-col gap-0.5">
      {/* Header */}
      <div className="flex items-center gap-1 text-[11px]">
        <span className="text-[var(--text-1)] font-medium truncate">{name}</span>
        <span className="text-[var(--text-3)] shrink-0">·</span>
        <span className="text-[var(--text-3)] shrink-0">{surface}</span>
      </div>

      {/* Gauge SVG */}
      <div className="relative h-5 w-full">
        <svg
          viewBox="0 0 220 20"
          className="h-5 w-full overflow-visible"
          aria-hidden="true"
        >
          {/* Zone rouge : 0 - 0.80 */}
          <rect x="0" y="2" width="88" height="16" rx="3" fill="var(--red)" opacity="0.85" />
          {/* Zone jaune : 0.80 - 1.20 */}
          <rect x="88" y="2" width="44" height="16" fill="var(--yellow)" opacity="0.85" />
          {/* Zone verte : 1.20 - 2.00 */}
          <rect x="132" y="2" width="88" height="16" rx="3" fill="var(--green)" opacity="0.85" />

          {/* Curseur triangulaire */}
          {hasData ? (
            <polygon
              points={`${cursorPercent},0 ${cursorPercent - 6},20 ${cursorPercent + 6},20`}
              fill="var(--text-1)"
              stroke="var(--bg)"
              strokeWidth="1.5"
            />
          ) : (
            /* Placeholder : ligne grise en pointillés */
            <line
              x1="110"
              y1="0"
              x2="110"
              y2="20"
              stroke="var(--text-3)"
              strokeWidth="2"
              strokeDasharray="3 2"
              opacity="0.4"
            />
          )}
        </svg>
      </div>

      {/* Valeur + label */}
      <div className="flex items-center gap-1">
        <span className={cn('text-[11px] font-mono tabular-nums', colorClass)}>
          {paceIndex !== null ? paceIndex.toFixed(3) : '—'}
        </span>
        <span className={cn('text-[10px]', colorClass)}>
          ({label})
        </span>
      </div>
    </div>
  )
}
