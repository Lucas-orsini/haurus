-- Migration 3 : Table d'historique des actions add/remove
-- Audit trail append-only pour tracer tous les changements.
-- Réservée aux Server Actions (côté serveur avec service_role) — pas de manipulation client directe.

-- 1. Création de la table
CREATE TABLE IF NOT EXISTS public.tracked_players_history (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  player_name text        NOT NULL,
  action      text        NOT NULL CHECK (action IN ('added', 'removed')),
  action_date timestamptz NOT NULL DEFAULT now()
);

-- 2. Index pour requêtes par user (historique d'un utilisateur)
CREATE INDEX IF NOT EXISTS idx_tracked_players_history_user_id
  ON public.tracked_players_history (user_id);

-- 3. Activation de RLS
ALTER TABLE public.tracked_players_history ENABLE ROW LEVEL SECURITY;

-- 4. Policy SELECT — l'utilisateur peut consulter son propre historique
CREATE POLICY "tracked_players_history_select_own"
  ON public.tracked_players_history
  FOR SELECT
  USING (auth.uid() = user_id);

-- 5. Policy INSERT — réservée au service_role (Server Actions).
-- WITH CHECK (false) bloque explicitement tout utilisateur authentifié.
CREATE POLICY "tracked_players_history_insert_service_role_only"
  ON public.tracked_players_history
  FOR INSERT
  WITH CHECK (false);

-- Note : pas de policies UPDATE/DELETE — table append-only, aucune modification ni suppression.
