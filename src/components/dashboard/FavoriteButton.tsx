'use client'

import { useState } from 'react'
import { Star, Loader2 } from 'lucide-react'
import type { FavoriteButtonProps } from '@/lib/types/favorite'

/**
 * Interactive star button for marking/unmarking a match as favorite.
 * Calls POST /api/match-favorites to persist the toggle, then
 * calls onToggle with the result. Reverts on error.
 */
export default function FavoriteButton({ matchId, isFavorite, onToggle }: FavoriteButtonProps) {
  const [loading, setLoading] = useState(false)

  async function handleToggle(e: React.MouseEvent) {
    e.stopPropagation()
    if (loading) return

    const previousFavorite = isFavorite
    setLoading(true)

    try {
      const res = await fetch('/api/match-favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matchId }),
      })

      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`)
      }

      const data: { favorited: boolean; matchId: string } = await res.json()
      onToggle(data.matchId, data.favorited)
    } catch {
      // Revert to previous state on error
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      className="w-7 h-7 flex items-center justify-center rounded-md transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-white/[0.06]"
      aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
    >
      {loading ? (
        <Loader2 size={13} className="animate-spin text-[var(--text-3)]" strokeWidth={1.5} />
      ) : (
        <Star
          size={13}
          strokeWidth={1.5}
          className={
            isFavorite
              ? 'fill-yellow-400 text-yellow-400'
              : 'text-[var(--text-3)] hover:text-[var(--text-2)]'
          }
        />
      )}
    </button>
  )
}
