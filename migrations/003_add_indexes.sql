-- ============================================
-- MIGRATION: Index de performance
-- Index sur user_id pour optimiser les requêtes filtrées par utilisateur
-- (usuel car RLS filtre déjà par user_id sur chaque requête)
-- ============================================

CREATE INDEX IF NOT EXISTS idx_tracked_players_user_id
    ON public.tracked_players (user_id);

CREATE INDEX IF NOT EXISTS idx_tracked_players_history_user_id
    ON public.tracked_players_history (user_id);

-- Index complémentaire sur locked_until pour les requêtes de déverrouillage
CREATE INDEX IF NOT EXISTS idx_tracked_players_locked_until
    ON public.tracked_players (locked_until)
    WHERE locked_until IS NOT NULL;
