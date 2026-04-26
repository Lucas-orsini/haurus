'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { MatchStats } from '@/types/match'

interface UseMatchesReturn {
  matches: MatchStats[]
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useMatches(): UseMatchesReturn {
  const [matches, setMatches] = useState<MatchStats[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchMatches = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      if (!supabase) {
        setError('Connexion Supabase non disponible. Vérifiez la configuration.')
        setLoading(false)
        return
      }

      const { data, error: supabaseError } = await supabase
        .from('match_stats')
        .select('*')
        .order('date', { ascending: false })
        .limit(100)

      if (supabaseError) {
        setError(supabaseError.message)
        setLoading(false)
        return
      }

      setMatches((data as MatchStats[]) ?? [])
    } catch (err) {
      setError('Une erreur inattendue est survenue lors du chargement des matchs.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMatches()
  }, [fetchMatches])

  return { matches, loading, error, refetch: fetchMatches }
}
