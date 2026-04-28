-- Accorde l'exécution au rôle authenticated
-- Permet au trigger de s'exécuter dans le contexte des opérations authentifiées
GRANT EXECUTE ON FUNCTION public.cleanup_match_favorites() TO authenticated;

COMMENT ON GRANT EXECUTE ON FUNCTION public.cleanup_match_favorites() TO authenticated IS
  'Trigger nécessite execute sur la fonction dans un contexte authentifié';
