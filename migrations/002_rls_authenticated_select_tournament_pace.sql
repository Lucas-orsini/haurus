-- Policy RLS pour permettre aux utilisateurs authentifiés de lire tournament_pace
-- Données agrégées publiques (pace_index par tournoi/surface) — pas de données utilisateur sensibles
-- La table n'a pas de colonne user_id, le SELECT USING (true) est donc appropriée ici
CREATE POLICY "authenticated_select_tournament_pace"
ON public.tournament_pace
FOR SELECT
USING (true);
