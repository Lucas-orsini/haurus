'use client'

import { useState } from 'react'
import { Loader2, Trash2, Lock, X } from 'lucide-react'
import { cn } from '@/lib/utils'

/** Type TrackedPlayer — aligné avec la réponse GET /api/tracked-players */
export interface TrackedPlayer {
  id: string
  player_name: string
  player_id: string
  locked_until: string
  created_at: string
}

interface TrackedPlayersListProps {
  trackedPlayers: TrackedPlayer[]
  role: string
  limit: number | null
  onSelectPlayer: (playerName: string, playerId: string) => void
  onRemovePlayer: (playerName: string) => Promise<void>
  onClose?: () => void
}

function isLocked(lockedUntil: string): boolean {
  return new Date(lockedUntil) > new Date()
}

function formatLockDate(isoDate: string): string {
  const date = new Date(isoDate)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

export default function TrackedPlayersList({
  trackedPlayers,
  role,
  limit,
  onSelectPlayer,
  onRemovePlayer,
  onClose,
}: TrackedPlayersListProps) {
  const [removingName, setRemovingName] = useState<string | null>(null)

  const lockDays = role === 'starter' || role === 'analyste'
  const limitDisplay = limit === null ? '∞' : limit
  const countLabel = `${trackedPlayers.length} / ${limitDisplay}`

  async function handleRemove(e: React.MouseEvent, playerName: string) {
    e.stopPropagation()
    if (removingName) return
    setRemovingName(playerName)
    try {
      await onRemovePlayer(playerName)
    } finally {
      setRemovingName(null)
    }
  }

  if (trackedPlayers.length === 0) {
    return (
      <div className="flex flex-col gap-3">
        {/* Counter — sticky top mobile */}
        <div className="sticky top-0 z-10 bg-[var(--surface-1)] flex items-center justify-between px-1 py-1">
          <span className="text-[11px] font-medium text-[var(--text-3)] uppercase tracking-wider">
            Suivis
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-[var(--text-3)] tabular-nums">
              {countLabel}
            </span>
            {onClose && (
              <button
                onClick={onClose}
                className="md:hidden w-6 h-6 flex items-center justify-center rounded-md hover:bg-white/[0.06] text-[var(--text-3)] hover:text-[var(--text-1)] transition-colors duration-150"
                aria-label="Fermer le panneau"
              >
                <X size={15} strokeWidth={1.5} className="shrink-0" />
              </button>
            )}
          </div>
        </div>

        {/* Empty state */}
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
          <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-[var(--border-md)] flex items-center justify-center mb-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--text-3)]">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <p className="text-xs font-medium text-[var(--text-2)] mb-1">Aucun joueur suivi</p>
          <p className="text-[11px] text-[var(--text-3)] leading-relaxed">
            Recherchez un joueur et ajoutez-le à vos suivis
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Counter — sticky top mobile */}
      <div className="sticky top-0 z-10 bg-[var(--surface-1)] flex items-center justify-between px-1 py-1">
        <span className="text-[11px] font-medium text-[var(--text-3)] uppercase tracking-wider">
          Suivis
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-[var(--text-3)] tabular-nums">
            {countLabel}
          </span>
          {onClose && (
            <button
              onClick={onClose}
              className="md:hidden w-6 h-6 flex items-center justify-center rounded-md hover:bg-white/[0.06] text-[var(--text-3)] hover:text-[var(--text-1)] transition-colors duration-150"
              aria-label="Fermer le panneau"
            >
              <X size={15} strokeWidth={1.5} className="shrink-0" />
            </button>
          )}
        </div>
      </div>

      {/* List */}
      <div className="flex flex-col gap-0.5">
        {trackedPlayers.map((player) => {
          const locked = lockDays && isLocked(player.locked_until)
          const removing = removingName === player.player_name

          return (
            <div
              key={player.id}
              className="group flex items-center gap-2 px-3 py-2.5 min-h-11 rounded-md hover:bg-white/[0.04] transition-colors duration-150 cursor-pointer"
              onClick={() => onSelectPlayer(player.player_name, player.player_id)}
            >
              {/* Name */}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[var(--text-1)] truncate leading-tight">
                  {player.player_name}
                </p>
                {/* Lock info */}
                {lockDays && locked && (
                  <p className="text-[11px] text-[var(--text-3)] flex items-center gap-1 mt-0.5">
                    <Lock size={9} strokeWidth={1.5} className="shrink-0" />
                    Verrouillé jusqu&apos;au {formatLockDate(player.locked_until)}
                  </p>
                )}
                {lockDays && !locked && (
                  <p className="text-[11px] text-[var(--green)] mt-0.5">
                    Débloqué
                  </p>
                )}
              </div>

              {/* Remove button */}
              <button
                onClick={(e) => handleRemove(e, player.player_name)}
                disabled={locked || removing}
                title={locked ? `Joueur verrouillé jusqu'au ${formatLockDate(player.locked_until)}` : 'Retirer des suivis'}
                className={cn(
                  'w-6 h-6 shrink-0 rounded flex items-center justify-center transition-all duration-150',
                  locked
                    ? 'text-[var(--text-3)]/30 cursor-not-allowed'
                    : 'text-[var(--text-3)] hover:text-[var(--red)] hover:bg-[var(--red)]/10',
                  removing && 'opacity-50 cursor-not-allowed'
                )}
              >
                {removing ? (
                  <Loader2 size={11} strokeWidth={1.5} className="animate-spin shrink-0" />
                ) : (
                  <Trash2 size={11} strokeWidth={1.5} className="shrink-0" />
                )}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
