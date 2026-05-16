'use client'

import { useState, useMemo, useCallback, useEffect } from 'react'
import { Search, BookOpen, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { METRIC_SECTIONS, ALL_METRICS } from '@/lib/metrics/definitions'
import type { MetricDefinition } from '@/lib/metrics/definitions'
import { useLocale } from '@/providers/LocaleProvider'

function PlanBadge({ plan: _plan }: { plan: MetricDefinition['plan'] }) {
  const { dict } = useLocale()
  return (
    <span
      className="w-fit inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium whitespace-nowrap"
      style={{
        backgroundColor: 'var(--badge-beta-bg)',
        color: 'var(--badge-beta-text)',
      }}
    >
      {dict.metrics.badgeBeta}
    </span>
  )
}

function MetricDetailModal({
  metric,
  onClose,
  t,
}: {
  metric: MetricDefinition | null
  onClose: () => void
  t: (key: string) => string
}) {
  // Escape key handler
  useEffect(() => {
    if (!metric) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [metric, onClose])

  if (!metric) return null

  const name = t(metric.name)
  const shortDescription = t(metric.shortDescription)
  const expertDescription = t(metric.expertDescription)

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-metric-name"
    >
      {/* Panel — stop click propagation so clicking inside doesn't close */}
      <div
        className="w-full max-w-md bg-[var(--surface-1)] border border-[var(--border-md)] rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-4">
          <div className="flex flex-col gap-1.5 min-w-0 flex-1">
            <h2
              id="modal-metric-name"
              className="text-sm font-semibold text-[var(--text-1)] leading-snug"
            >
              {name}
            </h2>
            <PlanBadge plan={metric.plan} />
          </div>
          <button
            onClick={onClose}
            aria-label={t('metrics.modalClose')}
            className="w-7 h-7 flex items-center justify-center rounded-md
                       hover:bg-white/[0.06] text-[var(--text-3)] hover:text-[var(--text-2)]
                       transition-colors duration-150 shrink-0"
          >
            <X size={14} strokeWidth={1.5} />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 pb-5 flex flex-col gap-4">
          {/* Short description */}
          <p className="text-xs text-[var(--text-2)] leading-relaxed">
            {shortDescription}
          </p>

          {/* Visual separator */}
          <div className="h-px bg-[var(--border)]" />

          {/* Expert description */}
          <p className="text-xs text-[var(--text-3)] leading-relaxed">
            {expertDescription}
          </p>
        </div>
      </div>
    </div>
  )
}

function MetricCard({
  metric,
  onOpen,
  t,
}: {
  metric: MetricDefinition
  onOpen: (id: string) => void
  t: (key: string) => string
}) {
  const name = t(metric.name)
  const shortDescription = t(metric.shortDescription)

  return (
    <button
      type="button"
      onClick={() => onOpen(metric.id)}
      aria-label={t('metrics.openMetricDetails').replace('{metric}', name)}
      className={cn(
        'bg-[var(--surface-1)] border border-[var(--border-md)] rounded-lg p-4',
        'hover:border-[var(--border-hi)] hover:bg-white/[0.02]',
        'transition-all duration-150 cursor-pointer select-none',
        'flex flex-col gap-3 text-left w-full'
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1.5 min-w-0 flex-1 items-center">
          <h3 className="text-sm font-semibold text-[var(--text-1)] leading-snug">
            {name}
          </h3>
          <PlanBadge plan={metric.plan} />
        </div>
      </div>

      {/* Short description — always visible */}
      <p className="text-xs text-[var(--text-2)] leading-relaxed">
        {shortDescription}
      </p>
    </button>
  )
}

function MetricsSection({
  title,
  metrics,
  onOpen,
  t,
}: {
  title: string
  metrics: MetricDefinition[]
  onOpen: (id: string) => void
  t: (key: string) => string
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
        {metrics.map((metric) => (
          <MetricCard
            key={metric.id}
            metric={metric}
            onOpen={onOpen}
            t={t}
          />
        ))}
      </div>
    </section>
  )
}

export default function MetricsEducationClient() {
  const { dict } = useLocale()

  // Translation helper — wraps dict access for i18n keys
  const t = useCallback(
    (key: string): string => {
      // Navigate nested keys like "dashboard.metrics.sectionServiceRetour"
      const parts = key.split('.')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let value: any = dict
      for (const part of parts) {
        value = value?.[part]
      }
      return typeof value === 'string' ? value : key
    },
    [dict]
  )

  const [query, setQuery] = useState('')
  const [selectedMetricId, setSelectedMetricId] = useState<string | null>(null)

  const openModal = useCallback((id: string) => setSelectedMetricId(id), [])
  const closeModal = useCallback(() => setSelectedMetricId(null), [])

  // Filter sections by query — translates before comparing
  const filteredSections = useMemo(() => {
    if (!query.trim()) return METRIC_SECTIONS

    const q = query.toLowerCase().trim()

    return METRIC_SECTIONS.map((section) => ({
      ...section,
      // Translate section title before comparing
      title: t(section.title),
      metrics: section.metrics.filter((m) => {
        const name = t(m.name).toLowerCase()
        const shortDesc = t(m.shortDescription).toLowerCase()
        const expertDesc = t(m.expertDescription).toLowerCase()
        return (
          name.includes(q) ||
          shortDesc.includes(q) ||
          expertDesc.includes(q)
        )
      }),
    })).filter((section) => section.metrics.length > 0)
  }, [query, t])

  const hasResults = filteredSections.length > 0

  // Resolve selected metric from flat list
  const selectedMetric = selectedMetricId
    ? (ALL_METRICS.find((m) => m.id === selectedMetricId) ?? null)
    : null

  // Total filtered metric count for the counter
  const totalCount = filteredSections.reduce(
    (sum, section) => sum + section.metrics.length,
    0
  )

  return (
    <div className="max-w-5xl">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-base font-semibold text-[var(--text-1)] mb-1">
          {dict.metrics.pageTitle}
        </h1>
        <p className="text-sm text-[var(--text-3)]">
          {dict.metrics.pageDescription}
        </p>
      </div>

      {/* Toolbar: search + counter */}
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
            placeholder={dict.metrics.searchPlaceholder}
            className={cn(
              'w-full h-9 pl-9 pr-3 rounded-md text-sm',
              'bg-[var(--surface-1)] border border-[var(--border-md)]',
              'text-[var(--text-1)] placeholder:text-[var(--text-3)]',
              'focus:outline-none focus:border-[var(--accent)]/60',
              'focus:ring-2 focus:ring-[var(--accent)]/15 transition-colors duration-150'
            )}
          />
        </div>

        {/* Metric count */}
        <span className="text-xs text-[var(--text-3)] shrink-0 tabular-nums">
          <span className="text-[var(--text-2)] font-medium">{totalCount}</span>{' '}
          {totalCount === 1
            ? dict.metrics.metricCountSingular
            : dict.metrics.metricCountPlural}
        </span>
      </div>

      {/* Results or empty state */}
      {hasResults ? (
        <div>
          {filteredSections.map((section) => (
            <MetricsSection
              key={section.title}
              title={section.title}
              metrics={section.metrics}
              onOpen={openModal}
              t={t}
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
            {dict.metrics.emptyStateTitle}
          </p>
          <p className="text-xs text-[var(--text-3)]">
            {dict.metrics.emptyStateDescription}
          </p>
        </div>
      )}

      {/* Detail modal */}
      <MetricDetailModal metric={selectedMetric} onClose={closeModal} t={t} />
    </div>
  )
}
