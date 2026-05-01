'use client'

import { useState, useEffect } from 'react'

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
 * - Tooltip is positioned ABOVE the label, with a CSS arrow pointing down
 * - pointer-events-none when invisible (does not block interactions)
 * - Uses only existing CSS variables — no hardcoded colors
 */
export default function MetricTooltip({ label, tooltip }: MetricTooltipProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!isHovered) {
      setIsVisible(false)
      return
    }
    const timer = setTimeout(() => setIsVisible(true), 300)
    return () => clearTimeout(timer)
  }, [isHovered])

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Label — inherits text size from parent */}
      <span className="text-[11px] text-[var(--text-3)] leading-none text-center cursor-default">
        {label}
      </span>

      {/* Tooltip — appears above label after 300ms */}
      <div
        className={`
          absolute bottom-full left-1/2 -translate-x-1/2 mb-2
          max-w-[220px] px-2.5 py-2
          bg-[var(--surface-2)] border border-[var(--border)]
          rounded-md shadow-lg
          z-50
          text-[11px] leading-relaxed text-[var(--text-1)]
          text-center
          pointer-events-none
          transition-opacity duration-150
          ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}
        style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}
      >
        {/* CSS arrow — points down toward the label */}
        <span
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            bottom: '-5px',
            width: 0,
            height: 0,
            borderLeft: '5px solid transparent',
            borderRight: '5px solid transparent',
            borderTop: '5px solid var(--surface-2)',
          }}
        />
        {tooltip}
      </div>
    </div>
  )
}
