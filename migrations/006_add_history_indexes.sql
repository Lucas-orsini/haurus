-- Migration 6 : Index supplémentaires pour les performances sur tracked_players_history
-- Accélère les requêtes de lecture de l'historique utilisateur.

-- Index sur user_id + action_date pour filtres "historique des 30 derniers jours"
CREATE INDEX IF NOT EXISTS idx_tracked_players_history_user_date
  ON public.tracked_players_history (user_id, action_date DESC);

-- Index sur player_name pour jointures avec player_stats (recherche par nom)
CREATE INDEX IF NOT EXISTS idx_tracked_players_history_player_name
  ON public.tracked_players_history (player_name);
