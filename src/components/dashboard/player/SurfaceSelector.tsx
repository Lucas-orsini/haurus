'use client'

import { cn } from '@/lib/utils'

interface SurfaceSelectorProps {
  selectedSurface: 'Hard' | 'Clay' | 'Grass'
  onSurfaceChange: (surface: 'Hard' | 'Clay' | 'Grass') => void
}

const SURFACES = ['Hard', 'Clay', 'Grass'] as const

const LABEL_MAP: Record<'Hard' | 'Clay' | 'Grass', string> = {
  Hard: 'Dur',
  Clay: 'Terre battue',
  Grass: 'Gazon',
}

export default function SurfaceSelector({ selectedSurface, onSurfaceChange }: SurfaceSelectorProps) {
  return (
    <div className="w-full md:w-auto flex items-center gap-1">
      {SURFACES.map((surface) => {
        const active = selectedSurface === surface
        return (
          <button
            key={surface}
            onClick={() => onSurfaceChange(surface)}
            className={cn(
              'flex-1 h-7 px-1 md:px-3 flex items-center justify-center rounded-md text-[10px] md:text-xs font-medium',
              'transition-all duration-150 whitespace-nowrap',
              active
                ? 'border border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent-hi)]'
                : 'border border-[var(--border-md)] bg-white/[0.03] text-[var(--text-2)] hover:bg-white/[0.06]'
            )}
          >
            {LABEL_MAP[surface]}
          </button>
        )
      })}
    </div>
  )
}
