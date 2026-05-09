-- Baseline migration : reproduit fidèlement l'état de la DB live au moment
-- de la run (généré par Kurtel SYNC SCHEMA mode).
-- Cette migration est destinée à un environnement vide (ex: nouveau projet
-- Supabase dev). NE PAS appliquer sur la DB d'origine — les CREATE TABLE
-- IF NOT EXISTS la rendraient no-op mais les CREATE POLICY échoueraient.

BEGIN;

-- ============================================================
-- TABLES
-- ============================================================

CREATE TABLE IF NOT EXISTS "atp_averages" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "updated_at" timestamp,
  "surface" text,
  "p_serve" double precision,
  "p_return" double precision,
  "glicko" double precision,
  "tsd" double precision,
  "bppi" double precision,
  "momentum_td" double precision,
  "win_rate_td" double precision,
  "breaks_won" double precision,
  "breaks_lost" double precision,
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "match_favorites" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "user_id" uuid NOT NULL,
  "match_id" text NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "match_results" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "created_at" timestamptz DEFAULT now(),
  "date_match" date NOT NULL,
  "tournoi" text,
  "surface" text,
  "best_of" integer,
  "round" text,
  "player1" text NOT NULL,
  "player2" text NOT NULL,
  "winner" text,
  "loser" text,
  "score" text,
  "minutes" integer,
  "rank_winner" integer,
  "rank_loser" integer,
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "match_stats" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "created_at" timestamptz DEFAULT now(),
  "date_match" date NOT NULL,
  "tournoi" text,
  "surface" text,
  "best_of" integer,
  "player1" text NOT NULL,
  "player2" text NOT NULL,
  "rank_p1" double precision,
  "rank_p2" double precision,
  "p_serve_p1" double precision,
  "p_serve_p2" double precision,
  "p_return_p1" double precision,
  "p_return_p2" double precision,
  "glicko_rating_p1" double precision,
  "glicko_rd_p1" double precision,
  "glicko_rating_p2" double precision,
  "glicko_rd_p2" double precision,
  "tsd_p1" double precision,
  "tsd_p2" double precision,
  "bppi_p1" double precision,
  "bppi_p2" double precision,
  "map_p1" double precision,
  "map_p2" double precision,
  "form_p1" text,
  "form_p2" text,
  "win_rate_td_p1" double precision,
  "win_rate_td_p2" double precision,
  "win_rate_surf_td_p1" double precision,
  "win_rate_surf_td_p2" double precision,
  "momentum_td_p1" double precision,
  "momentum_td_p2" double precision,
  "breaks_won_td_p1" double precision,
  "breaks_won_td_p2" double precision,
  "breaks_lost_td_p1" double precision,
  "breaks_lost_td_p2" double precision,
  "fatigue_72h_p1" double precision,
  "fatigue_72h_p2" double precision,
  "jours_repos_p1" double precision,
  "jours_repos_p2" double precision,
  "delta_rank_6m_p1" double precision,
  "delta_rank_6m_p2" double precision,
  "win_rate_5m_p1" numeric,
  "win_rate_5m_p2" numeric,
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "model_performance" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "date" date,
  "accuracy" numeric,
  "auc" numeric,
  "total_bets" integer,
  "wins" integer,
  "losses" integer,
  "win_rate" numeric,
  "roi" numeric,
  "profit_total" numeric,
  "created_at" timestamptz DEFAULT now(),
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "newsletter_subscribers" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "email" text NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "player_stats" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "updated_at" timestamptz DEFAULT now(),
  "player_name" text NOT NULL,
  "rank" integer,
  "glicko_hard" double precision,
  "glicko_rd_hard" double precision,
  "glicko_clay" double precision,
  "glicko_rd_clay" double precision,
  "glicko_grass" double precision,
  "glicko_rd_grass" double precision,
  "p_serve_hard" double precision,
  "p_serve_clay" double precision,
  "p_serve_grass" double precision,
  "p_return_hard" double precision,
  "p_return_clay" double precision,
  "p_return_grass" double precision,
  "tsd_hard" double precision,
  "tsd_clay" double precision,
  "tsd_grass" double precision,
  "bppi" double precision,
  "map_hard" double precision,
  "map_clay" double precision,
  "map_grass" double precision,
  "form" text,
  "win_rate_td" double precision,
  "win_rate_hard_td" double precision,
  "win_rate_clay_td" double precision,
  "win_rate_grass_td" double precision,
  "momentum_td" double precision,
  "breaks_won_td" double precision,
  "breaks_lost_td" double precision,
  "fatigue_72h" double precision,
  "jours_repos" double precision,
  "delta_rank_6m" double precision,
  "last_match_date" date,
  "win_rate_5m" numeric,
  "stats_history" jsonb DEFAULT '{}'::jsonb,
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "predictions" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "date_prediction" date,
  "date_match" date,
  "tournoi" text,
  "match" text,
  "favori" text,
  "bookmaker" text,
  "fr" text,
  "cote" numeric,
  "break_even" numeric,
  "prob_ia" numeric,
  "prob_book" numeric,
  "edge_pct" numeric,
  "ev_pct" numeric,
  "ev_ajuste_pct" numeric,
  "unites" integer,
  "stars" text,
  "roi_profil" text,
  "forme_p1" text,
  "forme_p2" text,
  "h2h" text,
  "surface" text,
  "resultat" text,
  "profit_eur" numeric,
  "notes" text,
  "created_at" timestamptz DEFAULT now(),
  "updated_at" timestamptz DEFAULT now(),
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "profiles" (
  "id" uuid NOT NULL,
  "role" text NOT NULL DEFAULT 'user'::text,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now(),
  "plan" text NOT NULL DEFAULT 'free'::text,
  "name" text NOT NULL DEFAULT ''::text,
  "avatar_url" text,
  "telegram_token" text DEFAULT (gen_random_uuid())::text,
  "telegram_chat_id" bigint,
  "telegram_active" boolean NOT NULL DEFAULT false,
  PRIMARY KEY ("id"),
  CONSTRAINT "profiles_plan_check" CHECK ((plan = ANY (ARRAY['beta'::text, 'free'::text, 'pro'::text, 'enterprise'::text]))),
  CONSTRAINT "profiles_role_check" CHECK ((role = ANY (ARRAY['user'::text, 'admin'::text])))
);

CREATE TABLE IF NOT EXISTS "tournament_pace" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "tourney_name" text NOT NULL,
  "surface" text NOT NULL,
  "level" text NOT NULL,
  "pace_index" double precision NOT NULL,
  "updated_at" timestamp DEFAULT now(),
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "tracked_players" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "user_id" uuid NOT NULL,
  "player_name" text NOT NULL,
  "player_id" text NOT NULL,
  "locked_until" timestamptz NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY ("id"),
  CONSTRAINT "tracked_players_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "profiles" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS "tracked_players_history" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "user_id" uuid NOT NULL,
  "player_name" text NOT NULL,
  "action" text NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY ("id"),
  CONSTRAINT "tracked_players_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "profiles" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT "tracked_players_history_action_check" CHECK ((action = ANY (ARRAY['add'::text, 'remove'::text])))
);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX IF NOT EXISTS "idx_match_favorites_user_match" ON public.match_favorites USING btree (user_id, match_id) WHERE (user_id IS NOT NULL);
CREATE INDEX IF NOT EXISTS "idx_player_stats_player_name_lower" ON public.player_stats USING btree (lower(player_name) text_pattern_ops);
CREATE INDEX IF NOT EXISTS "idx_player_stats_rank" ON public.player_stats USING btree (rank DESC) WHERE (rank IS NOT NULL);
CREATE INDEX IF NOT EXISTS "idx_tournament_pace_lower_name_surface" ON public.tournament_pace USING btree (lower(tourney_name), lower(surface));
CREATE INDEX IF NOT EXISTS "idx_tracked_players_user_id" ON public.tracked_players USING btree (user_id);
CREATE INDEX IF NOT EXISTS "idx_tracked_players_locked_until" ON public.tracked_players USING btree (locked_until) WHERE (locked_until IS NOT NULL);
CREATE INDEX IF NOT EXISTS "idx_tracked_players_history_user_id" ON public.tracked_players_history USING btree (user_id);

-- ============================================================
-- FUNCTIONS (user-defined — référencées par les triggers)
-- ============================================================

CREATE OR REPLACE FUNCTION public.cleanup_match_favorites()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
BEGIN
  -- Supprime les favoris liés au match supprimé
  -- Utilise OLD.id car on est dans un trigger AFTER DELETE
  DELETE FROM public.match_favorites
  WHERE match_id = OLD.id;

  RETURN OLD;
END;
$function$;

CREATE OR REPLACE FUNCTION public.reset_telegram_on_role_downgrade()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
BEGIN
  -- Vérifie que le rôle a réellement changé (évite les faux positifs sur other updates)
  IF OLD.role IS DISTINCT FROM NEW.role
     AND NEW.role NOT IN ('user', 'analyste', 'pro', 'enterprise')
  THEN
    -- Réinitialise l'état actif et le chat_id
    -- telegram_token EST CONSERVÉ : l'utilisateur peut se reconnecter plus tard
    NEW.telegram_active = false;
    NEW.telegram_chat_id = NULL;
  END IF;

  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.sync_telegram_active()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  NEW.telegram_active := (NEW.role IN ('user', 'pro', 'enterprise'));
  RETURN NEW;
END;
$function$;

-- ============================================================
-- TRIGGERS
-- ============================================================

DROP TRIGGER IF EXISTS "on_match_stats_delete" ON public.match_stats;
CREATE TRIGGER "on_match_stats_delete" AFTER DELETE ON public.match_stats FOR EACH ROW EXECUTE FUNCTION cleanup_match_favorites();

DROP TRIGGER IF EXISTS "trg_reset_telegram_on_role_change" ON public.profiles;
CREATE TRIGGER "trg_reset_telegram_on_role_change" BEFORE UPDATE OF role ON public.profiles FOR EACH ROW EXECUTE FUNCTION reset_telegram_on_role_downgrade();

DROP TRIGGER IF EXISTS "trg_sync_telegram" ON public.profiles;
CREATE TRIGGER "trg_sync_telegram" BEFORE UPDATE OF role ON public.profiles FOR EACH ROW EXECUTE FUNCTION sync_telegram_active();

-- ============================================================
-- RLS (aucune policy définie dans le DDL live — aucune activation)
-- ============================================================

COMMIT;
