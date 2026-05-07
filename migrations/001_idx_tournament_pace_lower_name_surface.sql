-- Index fonctionnel sur lower(tourney_name, surface) pour optimiser le matching case-insensitive
-- lower() est IMMUTABLE → utilisable sans risque dans un index B-tree
CREATE INDEX IF NOT EXISTS idx_tournament_pace_lower_name_surface
ON public.tournament_pace (lower(tourney_name), lower(surface));
