-- Fonction de cleanup des favoris orphelins
-- Supprime tous les favoris pointant vers un match_stats supprimé
-- SECURITY DEFINER : s'exécute avec les droits du créateur (bypass RLS)
-- SET search_path : protège contre les attaques de search_path poisoning
CREATE OR REPLACE FUNCTION public.cleanup_match_favorites()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  -- Supprime les favoris liés au match supprimé
  -- Utilise OLD.id car on est dans un trigger AFTER DELETE
  DELETE FROM public.match_favorites
  WHERE match_id = OLD.id;

  RETURN OLD;
END;
$$;

COMMENT ON FUNCTION public.cleanup_match_favorites() IS
  'Supprime les favoris orphelins quand un match_stats est supprimé. Trigger automatique.';
