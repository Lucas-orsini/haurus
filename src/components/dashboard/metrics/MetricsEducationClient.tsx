'use client'

import { useState, useMemo, useCallback } from 'react'
import { Search, ChevronDown, BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'
import { METRIC_SECTIONS } from '@/lib/metrics/definitions'
import type { MetricDefinition } from '@/lib/metrics/definitions'

type ViewMode = 'simple' | 'expert'

function PlanBadge({ plan }: { plan: MetricDefinition['plan'] }) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium whitespace-nowrap',
        plan === 'Free' &&
          'bg-[var(--badge-free-bg)] text-[var(--badge-free-text)]',
        plan === 'Pro' &&
          'bg-[var(--badge-pro-bg)] text-[var(--badge-pro-text)]',
        plan === 'Enterprise' &&
          'bg-[var(--badge-enterprise-bg)] text-[var(--badge-enterprise-text)]'
      )}
    >
      {plan}
    </span>
  )
}

function MetricCard({
  metric,
  isExpanded,
  onToggle,
}: {
  metric: MetricDefinition
  isExpanded: boolean
  onToggle: () => void
}) {
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onToggle()
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      onClick={onToggle}
      onKeyDown={handleKeyDown}
      className={cn(
        'bg-[var(--surface-1)] border border-[var(--border-md)] rounded-lg p-4',
        'hover:border-[var(--border-hi)] hover:bg-white/[0.02]',
        'transition-all duration-150 cursor-pointer select-none',
        'flex flex-col gap-3'
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1.5 min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-[var(--text-1)] leading-snug">
            {metric.name}
          </h3>
          <PlanBadge plan={metric.plan} />
        </div>
        <ChevronDown
          size={14}
          strokeWidth={1.5}
          className={cn(
            'text-[var(--text-3)] shrink-0 mt-0.5 transition-transform duration-200',
            isExpanded && 'rotate-180'
          )}
        />
      </div>

      {/* Short description — always visible */}
      <p className="text-xs text-[var(--text-2)] leading-relaxed">
        {metric.shortDescription}
      </p>

      {/* Expert description — only when expanded */}
      {isExpanded && (
        <div className="pt-2 border-t border-[var(--border)]">
          <p className="text-xs text-[var(--text-3)] leading-relaxed">
            {metric.expertDescription}
          </p>
        </div>
      )}
    </div>
  )
}

function MetricsSection({
  title,
  metrics,
  expandedCards,
  viewMode,
  onToggle,
}: {
  title: string
  metrics: MetricDefinition[]
  expandedCards: Set<string>
  viewMode: ViewMode
  onToggle: (id: string) => void
}) {
  return (
    <section className="mb-10 last:mb-0">
      {/* Section title */}
      <div className="flex items-center gap-2 mb-4">
        <BookOpen size={15} strokeWidth={1.5} className="text-[var(--accent-hi)] shrink-0" />
        <h2 className="text-sm font-semibold text-[var(--text-1)]">{title}</h2>
        <span className="text-[11px] text-[var(--text-3)] font-mono tabular-nums ml-auto">
          {metrics.length}
        </span>
      </div>

      {/* Metric cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {metrics.map((metric) => {
          const isExpanded =
            viewMode === 'expert' || expandedCards.has(metric.id)
          return (
            <MetricCard
              key={metric.id}
              metric={metric}
              isExpanded={isExpanded}
              onToggle={() => onToggle(metric.id)}
            />
          )
        })}
      </div>
    </section>
  )
}

export default function MetricsEducationClient() {
  const [query, setQuery] = useState('')
  const [viewMode, setViewMode] = useState<ViewMode>('simple')
  const [expandedCards, setExpandedCards] = useState<Set<string>>(
    new Set()
  )

  const toggleCard = useCallback((id: string) => {
    setExpandedCards((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }, [])

  // Filter sections by query — searches name + shortDescription + expertDescription
  const filteredSections = useMemo(() => {
    if (!query.trim()) return METRIC_SECTIONS

    const q = query.toLowerCase().trim()

    return METRIC_SECTIONS.map((section) => ({
      ...section,
      metrics: section.metrics.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.shortDescription.toLowerCase().includes(q) ||
          m.expertDescription.toLowerCase().includes(q)
      ),
    })).filter((section) => section.metrics.length > 0)
  }, [query])

  const hasResults = filteredSections.length > 0

  return (
    <div className="max-w-5xl">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-base font-semibold text-[var(--text-1)] mb-1">
          Comprendre les métriques
        </h1>
        <p className="text-sm text-[var(--text-3)]">
          Chaque métrique expliquée simplement — descriptions courtes pour tous,
          contenus experts pour approfondir.
        </p>
      </div>

      {/* Toolbar: search + view mode toggle */}
      <div className="flex items-center gap-3 mb-8">
        {/* Search input */}
        <div className="relative flex-1 max-w-sm">
          <Search
            size={14}
            strokeWidth={1.5}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-3)] pointer-events-none"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher une métrique..."
            className={cn(
              'w-full h-9 pl-9 pr-3 rounded-md text-sm',
              'bg-[var(--surface-1)] border border-[var(--border-md)]',
              'text-[var(--text-1)] placeholder:text-[var(--text-3)]',
              'focus:outline-none focus:border-[var(--accent)]/60',
              'focus:ring-2 focus:ring-[var(--accent)]/15 transition-colors duration-150'
            )}
          />
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <span
            className={cn(
              'text-xs font-medium transition-colors duration-150',
              viewMode === 'simple'
                ? 'text-[var(--text-1)]'
                : 'text-[var(--text-3)]'
            )}
          >
            Simple
          </span>
          <button
            onClick={() =>
              setViewMode((m) => (m === 'simple' ? 'expert' : 'simple'))
            }
            aria-label={`Mode actuel : ${viewMode}. Cliquer pour basculer.`}
            className={cn(
              'relative w-10 h-5 rounded-full transition-colors duration-200',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]',
              viewMode === 'expert'
                ? 'bg-[var(--accent)]'
                : 'bg-[var(--surface-3)]'
            )}
          >
            <div
              className={cn(
                'absolute top-0.5 w-4 h-4 rounded-full bg-white shadow',
                'transition-transform duration-200',
                viewMode === 'expert' ? 'translate-x-5' : 'translate-x-0.5'
              )}
            />
          </button>
          <span
            className={cn(
              'text-xs font-medium transition-colors duration-150',
              viewMode === 'expert'
                ? 'text-[var(--text-1)]'
                : 'text-[var(--text-3)]'
            )}
          >
            Expert
          </span>
        </div>
      </div>

      {/* Results or empty state */}
      {hasResults ? (
        <div>
          {filteredSections.map((section) => (
            <MetricsSection
              key={section.title}
              title={section.title}
              metrics={section.metrics}
              expandedCards={expandedCards}
              viewMode={viewMode}
              onToggle={toggleCard}
            />
          ))}
        </div>
      ) : (
        /* Empty state — only shown when a query produced no results */
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-[var(--border-md)] flex items-center justify-center mb-4">
            <Search size={18} strokeWidth={1.5} className="text-[var(--text-3)]" />
          </div>
          <p className="text-sm font-medium text-[var(--text-2)] mb-1">
            Aucune métrique ne correspond à votre recherche
          </p>
          <p className="text-xs text-[var(--text-3)]">
            Essayez un autre terme — nom, description ou surface.
          </p>
        </div>
      )}
    </div>
  )
}
