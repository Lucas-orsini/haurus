-- ============================================
-- MIGRATION: Activation RLS et création des policies
-- ============================================

-- Activation RLS sur les deux tables
ALTER TABLE public.tracked_players ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tracked_players_history ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- Policies pour tracked_players
-- SELECT : lecture de ses propres lignes uniquement
-- INSERT : ajout avec vérification d'appartenance
-- DELETE : suppression uniquement de ses propres lignes (vérification lock côté serveur/endpoint)
--
-- NOTE: Aucune policy UPDATE n'est créée intentionnellement.
-- La mise à jour de locked_until (prolongation de verrou, correction d'erreur) est
-- réservée à un endpoint serveur futur utilisant service_role, qui bypass RLS.
-- Le client ne doit jamais être autorisé à modifier locked_until directement.
-- ==========================================
CREATE POLICY "tracked_players_select_own"
    ON public.tracked_players
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "tracked_players_insert_own"
    ON public.tracked_players
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "tracked_players_delete_own"
    ON public.tracked_players
    FOR DELETE
    USING (auth.uid() = user_id);

-- ==========================================
-- Policies pour tracked_players_history
-- SELECT : lecture de son propre historique uniquement
-- INSERT : écriture dans son propre historique (service_role ou endpoint serveur)
-- Aucune policy UPDATE/DELETE → append-only, seul le serveur peut écrire
-- ==========================================
CREATE POLICY "tracked_players_history_select_own"
    ON public.tracked_players_history
    FOR SELECT
    USING (auth.uid() = user_id);

-- Policy INSERT : le client peut insérer dans son propre historique
-- (via un endpoint serveur qui utilise service_role, la policy garantit
--  que user_id correspond à auth.uid())
CREATE POLICY "tracked_players_history_insert_own"
    ON public.tracked_players_history
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);
