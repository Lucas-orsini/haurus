-- Migration 003 : Ajouter un index sur rank pour trier les joueurs par classement
-- Utile pour afficher les résultats de recherche triés par ranking ATP

CREATE INDEX IF NOT EXISTS idx_player_stats_rank
  ON public.player_stats (rank DESC)
  WHERE rank IS NOT NULL;
