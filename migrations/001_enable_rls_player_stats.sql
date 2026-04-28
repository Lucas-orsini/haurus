-- Migration 001 : Activer RLS sur player_stats et créer les policies
-- Les données ATP sont publiques (pas de user_id), accessibles à tout user authentifié.
-- Les écritures (refresh stats, mise à jour rank) sont réservées au service_role/backend uniquement.
-- Policies INSERT/UPDATE/DELETE explicites avec false → intention audible, pas d'ambiguïté.

-- Activer RLS sur la table player_stats
ALTER TABLE public.player_stats ENABLE ROW LEVEL SECURITY;

-- Policy SELECT : tout utilisateur authentifié peut lire les stats des joueurs
-- Les données tennis ATP sont publiques par conception
CREATE POLICY "player_stats_select_authenticated"
  ON public.player_stats
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy INSERT : réservée au service_role/backend uniquement
-- client direct interdit (pas de user_id sur cette table)
CREATE POLICY "player_stats_insert_service_role_only"
  ON public.player_stats
  FOR INSERT
  WITH CHECK (false);

-- Policy UPDATE : réservée au service_role/backend uniquement
CREATE POLICY "player_stats_update_service_role_only"
  ON public.player_stats
  FOR UPDATE
  USING (false)
  WITH CHECK (false);

-- Policy DELETE : réservée au service_role/backend uniquement
CREATE POLICY "player_stats_delete_service_role_only"
  ON public.player_stats
  FOR DELETE
  USING (false);
