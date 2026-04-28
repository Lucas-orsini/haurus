-- Migration 002 : Créer un index B-tree sur lower(player_name)
-- Optimise les recherches ILIKE/LOWER pour la recherche de joueurs
-- lower() est IMMUTABLE → index sur expression valide
-- text_pattern_ops car lower() retourne le type text, pas varchar

CREATE INDEX IF NOT EXISTS idx_player_stats_player_name_lower
  ON public.player_stats (lower(player_name) text_pattern_ops);
