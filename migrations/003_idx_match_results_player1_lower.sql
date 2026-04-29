-- Index fonctionnel sur lower(player1) pour anticiper les queries case-insensitive
-- lower() est IMMUTABLE → valide dans un index B-tree
-- text_pattern_ops permet les recherches prefix (ilike 'name%')
CREATE INDEX IF NOT EXISTS idx_match_results_player1_lower
  ON public.match_results (lower(player1) text_pattern_ops);
