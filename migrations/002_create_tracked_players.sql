-- Migration 2 : Table principale du système de joueurs suivis
-- Chaque utilisateur peut suivre un nombre limité de joueurs selon son plan.
-- Une fois ajouté, un joueur est verrouillé jusqu'au premier jour du mois suivant (sauf beta/enterprise).

-- 1. Création de la table
CREATE TABLE IF NOT EXISTS public.tracked_players (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  player_name text        NOT NULL,
  added_at    date        NOT NULL DEFAULT CURRENT_DATE,
  locked_until date       NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now(),
  -- Contrainte métier : un joueur ne peut être suivi qu'une seule fois par utilisateur
  UNIQUE (user_id, player_name)
);

-- 2. Index composite pour requêtes fréquentes (liste des joueurs d'un user, recherche par nom)
CREATE INDEX IF NOT EXISTS idx_tracked_players_user_player
  ON public.tracked_players (user_id, player_name);

-- 3. Activation de RLS
ALTER TABLE public.tracked_players ENABLE ROW LEVEL SECURITY;

-- 4. Policy SELECT — un utilisateur ne voit que SES joueurs suivis
CREATE POLICY "tracked_players_select_own"
  ON public.tracked_players
  FOR SELECT
  USING (auth.uid() = user_id);

-- 5. Policy INSERT — un utilisateur peut ajouter un joueur à SA liste uniquement
CREATE POLICY "tracked_players_insert_own"
  ON public.tracked_players
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 6. Policy DELETE — un utilisateur peut supprimer un joueur UNIQUEMENT s'il n'est pas verrouillé.
-- La vérification de locked_until > today se fait côté Server Action (pas possible en RLS).
-- Ici on permet le DELETE sur la ligne own, la logique métier est dans le serveur.
CREATE POLICY "tracked_players_delete_own"
  ON public.tracked_players
  FOR DELETE
  USING (auth.uid() = user_id);

-- Note : pas de policy UPDATE — le client ne doit jamais modifier tracked_players directement.
