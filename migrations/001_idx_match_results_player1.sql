-- Index sur player1 pour optimisation des recherches ilike
CREATE INDEX IF NOT EXISTS idx_match_results_player1
  ON public.match_results (player1);
