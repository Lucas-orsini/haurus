'use client'

import { X, AlertTriangle } from 'lucide-react'

interface TrackPlayerModalProps {
  isOpen: boolean
  playerName: string
  role: string
  onConfirm: () => Promise<void>
  onCancel: () => void
}

export default function TrackPlayerModal({
  isOpen,
  playerName,
  role,
  onConfirm,
  onCancel,
}: TrackPlayerModalProps) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div className="w-full max-w-sm bg-[var(--surface-1)] border border-[var(--border-md)] rounded-xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[var(--yellow)]/10 border border-[var(--yellow)]/20 flex items-center justify-center shrink-0">
              <AlertTriangle size={14} strokeWidth={1.5} className="text-[var(--yellow)]" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm font-semibold text-[var(--text-1)] truncate max-w-[200px]">
                Suivre {playerName}
              </h2>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white/[0.06] text-[var(--text-3)] hover:text-[var(--text-2)] transition-colors duration-150 shrink-0 ml-2"
          >
            <X size={14} />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4">
          <p className="text-xs text-[var(--text-2)] leading-relaxed">
            Une fois ajouté à vos suivis, ce joueur sera{' '}
            <span className="text-[var(--text-1)] font-medium">verrouillé jusqu&apos;au premier jour du mois suivant</span>.
            Vous ne pourrez pas le retirer de vos suivis avant cette date.
          </p>

          {role === 'user' && (
            <p className="text-[11px] text-[var(--text-3)] mt-2 leading-relaxed">
              Note : aucune restriction ne s&apos;applique pour le moment sur votre plan.
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col md:flex-row items-center justify-end gap-2 px-5 py-4 border-t border-[var(--border)]">
          <button
            onClick={onCancel}
            className="h-8 w-full md:w-auto px-4 flex items-center justify-center rounded-md border border-[var(--border-md)] bg-white/[0.03] hover:bg-white/[0.06] text-[var(--text-2)] text-xs font-medium transition-colors duration-150"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="h-8 w-full md:w-auto px-4 flex items-center justify-center gap-2 rounded-md bg-[var(--accent)] hover:bg-[var(--accent-hi)] text-white text-xs font-medium transition-colors duration-150"
          >
            Suivre et consulter
          </button>
        </div>
      </div>
    </div>
  )
}
