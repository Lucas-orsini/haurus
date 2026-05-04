'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useTooltipPlacement } from '@/hooks/useTooltipPlacement'

export interface MetricTooltipProps {
  label: string
  tooltip: string
}

/**
 * Flèche directionnelle CSS — triangle équilatéral de 5px de côté.
 * Le border-side correspondant est omis pour simuler un triangle arent vers le trigger.
 *
 * Placements :
 *  - bottom : flèche en HAUT du tooltip (pointe vers le bas → trigger)
 *  - top    : flèche en BAS  du tooltip (pointe vers le haut → trigger)
 *  - left   : flèche à DROITE du tooltip (pointe vers la gauche → trigger)
 *  - right  : flèche à GAUCHE du tooltip (pointe vers la droite → trigger)
 */
function TooltipArrow({ placement }: { placement: 'bottom' | 'top' | 'left' | 'right' }) {
  const base: React.CSSProperties = {
    position: 'absolute',
    width: 0,
    height: 0,
  }

  if (placement === 'bottom') {
    // Flèche en haut du tooltip, pointe vers le bas (trigger en dessous)
    return (
      <span
        style={{
          ...base,
          left: '50%',
          transform: 'translateX(-50%)',
          top: -5,
          borderLeft:  `${ARROW}px solid transparent`,
          borderRight: `${ARROW}px solid transparent`,
          borderBottom: `${ARROW}px solid var(--surface-2)`,
        }}
      />
    )
  }

  if (placement === 'top') {
    // Flèche en bas du tooltip, pointe vers le haut (trigger au-dessus)
    return (
      <span
        style={{
          ...base,
          left: '50%',
          transform: 'translateX(-50%)',
          bottom: -5,
          borderLeft:  `${ARROW}px solid transparent`,
          borderRight: `${ARROW}px solid transparent`,
          borderTop:   `${ARROW}px solid var(--surface-2)`,
        }}
      />
    )
  }

  if (placement === 'left') {
    // Flèche à droite du tooltip, pointe vers la gauche (trigger à gauche)
    return (
      <span
        style={{
          ...base,
          top: '50%',
          transform: 'translateY(-50%)',
          right: -5,
          borderTop:    `${ARROW}px solid transparent`,
          borderBottom: `${ARROW}px solid transparent`,
          borderLeft:   `${ARROW}px solid var(--surface-2)`,
        }}
      />
    )
  }

  // placement === 'right'
  // Flèche à gauche du tooltip, pointe vers la droite (trigger à droite)
  return (
    <span
      style={{
        ...base,
        top: '50%',
        transform: 'translateY(-50%)',
        left: -5,
        borderTop:    `${ARROW}px solid transparent`,
        borderBottom: `${ARROW}px solid transparent`,
        borderRight:  `${ARROW}px solid var(--surface-2)`,
      }}
    />
  )
}

// Taille en px de la flèche — partagée avec le hook via constante (5px)
const ARROW = 5

/**
 * Reusable tooltip component for metric labels in the match comparison table.
 *
 * Comportement :
 *  - Hover label → tooltip apparaît après un délai de 300ms (setTimeout)
 *  - Mouse leave → tooltip disparaît immédiatement (clearTimeout + setIsVisible(false))
 *  - Délai de 300ms évité les flicker sur passages rapides de la souris
 *
 * Positionnement intelligent :
 *  - Le hook `useTooltipPlacement` calcule l'espace disponible via getBoundingClientRect()
 *  - Choix du placement : bottom > top > left > right (priorité dans cet ordre)
 *  - Tooltip rendu via React Portal vers document.body (évite le clipping par overflow:hidden du parent)
 *  - Le Portal ne monte qu'après le premier render client (state isMounted) pour éviter les flashs SSR
 *  - Position fixed avec coordonnées viewport absolues retournées par le hook
 *  - z-index 9999 : passe au-dessus de tous les éléments (sidebar dropdown = z-50)
 *  - Flèche directionnelle qui pointe vers le trigger selon le placement choisi
 *
 * Props inchangées : { label: string; tooltip: string } — backward compatible avec MatchRow.tsx
 */
export default function MetricTooltip({ label, tooltip }: MetricTooltipProps) {
  // ── États de visibilité ─────────────────────────────────────────────────
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible,  setIsVisible]  = useState(false)

  // ── Portal mount gating — éviter les flashs SSR ────────────────────────
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => { setIsMounted(true) }, [])

  // ── Délai 300ms avant apparition — clearTimer au mouseLeave pour éviter les flickering ──
  useEffect(() => {
    if (!isHovered) {
      setIsVisible(false)
      return
    }
    const timer = setTimeout(() => setIsVisible(true), 300)
    return () => clearTimeout(timer)
  }, [isHovered])

  // ── Ref sur le conteneur trigger ────────────────────────────────────────
  const containerRef = useRef<HTMLDivElement>(null)

  // ── Hook de positionnement intelligent ─────────────────────────────────
  const { placement, top, left } = useTooltipPlacement(containerRef, isVisible)

  // ── Contenu du tooltip (référencé pour le portal) ────────────────────────
  const tooltipContent = (
    <div
      className="z-[9999] min-w-[140px] max-w-[320px] px-2.5 py-2
                 bg-[var(--surface-2)] border border-[var(--border)]
                 rounded-md shadow-lg
                 text-[13px] leading-relaxed text-[var(--text-1)]
                 text-center pointer-events-none
                 transition-opacity duration-150"
      style={{
        position: 'fixed',
        top,
        left,
        // Clamp pour éviter le débordement hors viewport
        maxWidth: `min(320px, ${typeof window !== 'undefined' ? window.innerWidth - left : 320}px)`,
        zIndex: 9999,
        whiteSpace: 'normal',
        wordBreak: 'break-word',
        opacity: isVisible ? 1 : 0,
      }}
    >
      <TooltipArrow placement={placement} />
      {tooltip}
    </div>
  )

  return (
    <div
      ref={containerRef}
      className="relative inline-flex"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Label — hérite la taille de texte du parent */}
      <span className="text-[13px] text-[var(--text-3)] leading-none text-center cursor-default">
        {label}
      </span>

      {/* Portal vers document.body — ne monte qu'après le premier render */}
      {isMounted && createPortal(tooltipContent, document.body)}
    </div>
  )
}
