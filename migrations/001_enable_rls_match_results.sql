-- ============================================================
-- Migration: Activer RLS + Policy SELECT sur match_results
-- Contexte: Table avec données ATP publiques, pas de user_id
-- Risque: Aucun (données publiques)
-- ============================================================

-- 1. S'assurer que RLS est activé sur la table
ALTER TABLE public.match_results ENABLE ROW LEVEL SECURITY;

-- 2. Policy SELECT pour utilisateurs authentifiés
-- match_results ne contient aucune donnée utilisateur personnel,
-- uniquement des résultats ATP publics (joueurs, scores, tournois).
-- Pattern identique à match_stats et predictions.
CREATE POLICY "match_results_select_authenticated"
  ON public.match_results
  FOR SELECT
  TO authenticated
  USING (true);
