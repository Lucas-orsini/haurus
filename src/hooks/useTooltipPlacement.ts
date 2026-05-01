'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

export type Placement = 'bottom' | 'top' | 'left' | 'right'

interface TooltipPlacementResult {
  placement: Placement
  top: number
  left: number
}

const OFFSET_PX = 8       // distance min entre le bord du trigger et le tooltip
const MIN_SPACE_PX = 50   // espace minimal requis pour le placement (hauteur tooltip estimée)
const ARROW_SIZE_PX = 5   // taille de la flèche CSS (triangle borders)

/**
 * Calcule l'espace disponible sous / au-dessus / à gauche / à droite du trigger.
 */
function getSpaceAround(
  rect: DOMRect,
  tooltipHeight: number,
  tooltipWidth: number
): { bottom: number; top: number; left: number; right: number } {
  return {
    bottom: window.innerHeight - rect.bottom,
    top: rect.top,
    left: rect.left,
    right: window.innerWidth - rect.right,
  }
}

/**
 * Détermine le placement optimal selon la priorité : bottom → top → left → right.
 * Choisis le premier placement qui a assez d'espace disponible.
 */
function choosePlacement(
  space: { bottom: number; top: number; left: number; right: number },
  tooltipHeight: number,
  tooltipWidth: number
): Placement {
  const candidates: Array<{ p: Placement; needed: number }> = [
    { p: 'bottom', needed: tooltipHeight + OFFSET_PX },
    { p: 'top',    needed: tooltipHeight + OFFSET_PX },
    { p: 'left',   needed: tooltipWidth  + OFFSET_PX },
    { p: 'right',  needed: tooltipWidth  + OFFSET_PX },
  ]

  for (const { p, needed } of candidates) {
    const available =
      p === 'bottom' ? space.bottom :
      p === 'top'    ? space.top    :
      p === 'left'   ? space.left  : space.right

    if (available >= needed) return p
  }

  // Fallback : dernier recours — prend celui avec le plus d'espace
  const maxSpace = Math.max(space.bottom, space.top, space.left, space.right)
  if (maxSpace === space.bottom) return 'bottom'
  if (maxSpace === space.top)    return 'top'
  if (maxSpace === space.left)  return 'left'
  return 'right'
}

/**
 * Calcule les coordonnées absolues (top, left) pour le tooltip selon le placement.
 * Le tooltip est positionné en fixed par rapport au viewport.
 */
function computeCoords(
  rect: DOMRect,
  placement: Placement,
  tooltipHeight: number,
  tooltipWidth: number
): { top: number; left: number } {
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top  + rect.height / 2

  switch (placement) {
    case 'bottom':
      return {
        top:  rect.bottom + OFFSET_PX + ARROW_SIZE_PX,
        left: centerX - tooltipWidth / 2,
      }
    case 'top':
      return {
        top:  rect.top - tooltipHeight - OFFSET_PX - ARROW_SIZE_PX,
        left: centerX - tooltipWidth / 2,
      }
    case 'left':
      return {
        top:  centerY - tooltipHeight / 2,
        left: rect.left - tooltipWidth - OFFSET_PX - ARROW_SIZE_PX,
      }
    case 'right':
      return {
        top:  centerY - tooltipHeight / 2,
        left: rect.right + OFFSET_PX + ARROW_SIZE_PX,
      }
  }
}

/**
 * Hook custom pour le positionnement intelligent d'un tooltip.
 *
 * @param triggerRef   — ref vers l'élément trigger (le conteneur du MetricTooltip)
 * @param isVisible    — true quand le tooltip doit être visible (après le délai de 300ms)
 *
 * @returns placement et coordonnées (top, left) pour le tooltip portalé.
 *
 * Détails :
 * - Scroll passif avec requestAnimationFrame pour limiter les recalculs.
 * - Recalcul quand isVisible passe à true (géométrie peut changer après ouverture accordéon).
 * - Retourne les coords viewport absolues — le tooltip est en position:fixed.
 * - Valeurs par défaut 'bottom' / {0,0} avant le premier calcul.
 */
export function useTooltipPlacement(
  triggerRef: React.RefObject<HTMLElement | null>,
  isVisible: boolean
): TooltipPlacementResult {
  const [result, setResult] = useState<TooltipPlacementResult>({
    placement: 'bottom',
    top: 0,
    left: 0,
  })

  // RAF throttle — évite les recalculs multiples pendant un même frame de scroll
  const rafRef = useRef<number | null>(null)

  const updatePlacement = useCallback(() => {
    const el = triggerRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()

    // Estimation de la taille du tooltip (max-w-[320px] + padding + flèche ≈ 44px de haut, 180px de large)
    const tooltipHeight = 44
    const tooltipWidth  = 180

    const space   = getSpaceAround(rect, tooltipHeight, tooltipWidth)
    const placement = choosePlacement(space, tooltipHeight, tooltipWidth)
    const coords    = computeCoords(rect, placement, tooltipHeight, tooltipWidth)

    setResult({ placement, ...coords })
  }, [triggerRef])

  // Recalcul quand le tooltip devient visible
  useEffect(() => {
    if (isVisible) {
      // Tick synchronisé après le render pour capter la géométrie finale du DOM
      rafRef.current = requestAnimationFrame(updatePlacement)
    }
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
  }, [isVisible, updatePlacement])

  // Scroll — passive event listener avec RAF throttle
  useEffect(() => {
    if (!isVisible) return

    let pending = false

    const handleScroll = () => {
      if (pending) return
      pending = true
      rafRef.current = requestAnimationFrame(() => {
        updatePlacement()
        pending = false
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
  }, [isVisible, updatePlacement])

  return result
}
