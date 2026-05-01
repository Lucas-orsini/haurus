'use client'

import { useState, useEffect, useRef } from 'react'

export interface MetricTooltipProps {
  label: string
  tooltip: string
}

/**
 * Reusable tooltip component for metric labels in the match comparison table.
 *
 * Behaviour:
 * - Hover label → tooltip appears after 300ms delay (setTimeout)
 * - Mouse leave → tooltip disappears immediately (clearTimeout + setIsVisible(false))
 * - Tooltip is positioned ABOVE the label by default, with a CSS arrow pointing down
 * - If the label is within 180px of the viewport top, the tooltip flips BELOW the label
 *   and the arrow points up — preventing it from being clipped at the page edge
 * - Tooltip flip is recalculated only on appearance (isVisible transition), not on scroll
 * - pointer-events-none when invisible (does not block interactions)
 * - Uses only existing CSS variables — no hardcoded colors
 */
export default function MetricTooltip({ label, tooltip }: MetricTooltipProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState<'above' | 'below'>('above')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isHovered) {
      setIsVisible(false)
      setPosition('above')
      return
    }
    const timer = setTimeout(() => {
      setIsVisible(true)
      // Detect flip: measure distance from label top to viewport top
      const rect = containerRef.current?.getBoundingClientRect()
      if (rect != null) {
        // If the label is too close to the top of the viewport (< 180px),
        // flip the tooltip below the label instead of above
        const hasRoomAbove = rect.top > 180
        setPosition(hasRoomAbove ? 'above' : 'below')
      } else {
        // Defensive: if getBoundingClientRect returns null (e.g. detached DOM),
        // fall back to the default (above) positioning
        setPosition('above')
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [isHovered])

  const isFlipped = position === 'below'

  return (
    <div
      ref={containerRef}
      className="relative inline-flex"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Label — inherits text size from parent */}
      <span className="text-[13px] text-[var(--text-3)] leading-none text-center cursor-default">
        {label}
      </span>

      {/* Tooltip — positioned above or below the label depending on viewport space */}
      <div
        className={`
          absolute left-1/2 -translate-x-1/2
          min-w-[140px] max-w-[320px] px-2.5 py-2
          bg-[var(--surface-2)] border border-[var(--border)]
          rounded-md shadow-lg
          z-[60]
          text-[13px] leading-relaxed text-[var(--text-1)]
          text-center
          pointer-events-none
          transition-opacity duration-150
          ${isVisible ? 'opacity-100' : 'opacity-0'}
          ${isFlipped ? 'top-full mt-2' : 'bottom-full mb-2'}
        `}
        style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}
      >
        {/* CSS arrow — points down toward the label when above, up when below */}
        <span
          className="absolute left-1/2 -translate-x-1/2"
          style={
            isFlipped
              ? {
                  top: '-5px',
                  bottom: 'auto',
                  width: 0,
                  height: 0,
                  borderLeft: '5px solid transparent',
                  borderRight: '5px solid transparent',
                  borderBottom: '5px solid var(--surface-2)',
                }
              : {
                  bottom: '-5px',
                  top: 'auto',
                  width: 0,
                  height: 0,
                  borderLeft: '5px solid transparent',
                  borderRight: '5px solid transparent',
                  borderTop: '5px solid var(--surface-2)',
                }
          }
        />
        {tooltip}
      </div>
    </div>
  )
}
