-- Révoque l'accès public à la fonction
-- Empêche tout appel manuel non authentifié ou par un rôle non prévu
REVOKE EXECUTE ON FUNCTION public.cleanup_match_favorites() FROM PUBLIC;

COMMENT ON REVOKE EXECUTE ON FUNCTION public.cleanup_match_favorites() FROM PUBLIC IS
  'Fonction réservée aux appels internos (trigger) — pas d''appel client direct';
