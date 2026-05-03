-- ============================================================
-- ÉTAPE 2 : Attachement du trigger à la table profiles
-- ============================================================
-- BEFORE UPDATE OF role : modifie NEW avant écriture (plus propre)
-- FOR EACH ROW : exécuté pour chaque ligne mise à jour
-- ONLY sur colonne 'role' : ne déclenche pas sur d'autres colonnes
-- IF EXISTS : idempotent, peut être ré-exécuté sans erreur
-- ============================================================

DROP TRIGGER IF EXISTS trg_reset_telegram_on_role_change ON public.profiles;

CREATE TRIGGER trg_reset_telegram_on_role_change
  BEFORE UPDATE OF role
  ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.reset_telegram_on_role_downgrade();

-- ============================================================
-- VÉRIFICATION : confirmer l'existence du trigger
-- ============================================================
-- Cette requête SELECT permet de valider en post-migration
-- que le trigger est bien attaché (à exécuter manuellement si besoin)
-- SELECT triggenabled, tgname FROM pg_trigger WHERE tgname = 'trg_reset_telegram_on_role_change';
