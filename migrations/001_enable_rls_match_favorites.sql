-- Migration 001 : Activation RLS + Index + Policies sur match_favorites
-- Table contenir des données utilisateur (user_id) → RLS obligatoire

-- Index pour requêtes de lookup par (user_id, match_id)
-- Performance des requêtes EXISTS/SELECT
CREATE INDEX IF NOT EXISTS idx_match_favorites_user_match
  ON public.match_favorites (user_id, match_id)
  WHERE user_id IS NOT NULL;

-- Activation RLS sur la table
ALTER TABLE public.match_favorites ENABLE ROW LEVEL SECURITY;

-- Policy SELECT : utilisateur voit uniquement SES favoris
CREATE POLICY "match_favorites_select_own"
  ON public.match_favorites FOR SELECT
  USING (auth.uid() = user_id);

-- Policy INSERT : utilisateur ne peut créer un favori QUE pour lui-même
-- WITH CHECK protège contre injection d'un user_id différent
CREATE POLICY "match_favorites_insert_own"
  ON public.match_favorites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy DELETE : utilisateur ne peut supprimer QUE SES favoris
CREATE POLICY "match_favorites_delete_own"
  ON public.match_favorites FOR DELETE
  USING (auth.uid() = user_id);

-- Note : Pas de policy UPDATE car les favoris sont immuables (on ne modifie pas un favori, on l'ajoute ou le supprime)
