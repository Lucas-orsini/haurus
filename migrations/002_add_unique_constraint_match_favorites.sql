-- Migration 002 : Contrainte unique sur (user_id, match_id)
-- Empêche les doublons et protège contre les race conditions
-- Idempotent : ne échoue pas si la contrainte existe déjà

-- Vérification des doublons existants avant ajout de la contrainte
-- Requête optionnelle à exécuter manuellement en pré-migration si besoin :
-- SELECT user_id, match_id, COUNT(*) FROM match_favorites GROUP BY user_id, match_id HAVING COUNT(*) > 1;

ALTER TABLE public.match_favorites
  ADD CONSTRAINT match_favorites_user_id_match_id_unique
  UNIQUE (user_id, match_id);
