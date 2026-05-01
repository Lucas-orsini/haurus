'use client'

import { X } from 'lucide-react'

interface FollowPlayerModalProps {
  isOpen: boolean
  playerName: string
  lockedUntil: Date
  userPlan: string
  isLimitReached: boolean
  onConfirm: () => void
  onCancel: () => void
}

export default function FollowPlayerModal({
  isOpen,
  playerName,
  lockedUntil,
  userPlan,
  isLimitReached,
  onConfirm,
  onCancel,
}: FollowPlayerModalProps) {
  if (!isOpen) return null

  const formattedDate = Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(lockedUntil)

  const isBeta = userPlan === 'beta'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal panel */}
      <div className="relative w-full max-w-sm bg-[var(--surface-1)] border border-[var(--border-md)] rounded-xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
          <h2 className="text-sm font-semibold text-[var(--text-1)]">
            Suivre ce joueur ?
          </h2>
          <button
            onClick={onCancel}
            className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white/[0.06] text-[var(--text-3)] hover:text-[var(--text-2)] transition-colors duration-150"
          >
            <X size={14} />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-5 space-y-4">
          <p className="text-sm text-[var(--text-2)] leading-relaxed">
            Vous allez suivre{' '}
            <span className="font-medium text-[var(--text-1)]">{playerName}</span>.
            {isBeta ? (
              <>
                {' '}Vous pourrez le retirer à tout moment sans délai de verrouillage.
              </>
            ) : (
              <>
                {' '}Vous ne pourrez pas le retirer de votre liste avant le{' '}
                <span className="font-medium text-[var(--text-1)]">{formattedDate}</span>.
              </>
            )}
          </p>

          {isBeta && (
            <div className="px-3 py-2.5 rounded-lg bg-[var(--accent)]/[0.07] border border-[var(--accent)]/20">
              <p className="text-xs text-[var(--accent-hi)] leading-relaxed">
                Vous êtes sur le plan beta — le verrouillage mensuel est désactivé.
                Profitez-en pour tester la plateforme !
              </p>
            </div>
          )}

          {isLimitReached && (
            <p className="text-xs text-[var(--red)] flex items-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              Vous avez atteint la limite de joueurs suivis pour votre plan.
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-[var(--border)]">
          <button
            onClick={onCancel}
            className="h-8 px-4 flex items-center justify-center rounded-md border border-[var(--border-md)] bg-white/[0.03] hover:bg-white/[0.06] text-[var(--text-2)] text-xs font-medium transition-colors duration-150"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            disabled={isLimitReached}
            className="h-8 px-4 flex items-center justify-center rounded-md bg-[var(--accent)] hover:bg-[var(--accent-hi)] text-white text-xs font-medium transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Suivre et consulter
          </button>
        </div>
      </div>
    </div>
  )
}
