-- Index sur player2 pour optimisation des recherches ilike
CREATE INDEX IF NOT EXISTS idx_match_results_player2
  ON public.match_results (player2);
