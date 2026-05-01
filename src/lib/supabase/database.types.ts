/**
 * Database type definitions for Supabase client.
 * Generated from the Supabase schema — do not edit manually.
 *
 * Used by:
 *   - @/lib/supabase/client
 *   - @/lib/supabase/server
 *   - All components that use Supabase row types via
 *     Database['public']['Tables']['table_name']['Row']
 *
 * @TODO: data pipeline — match_stats does not have a `winner` column.
 *        The `winner` field exists in match_results but not in match_stats.
 *        The data pipeline should add `winner` to match_stats or maintain
 *        a join on (date_match, player1, player2) to populate it.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      atp_averages: {
        Row: {
          id: string
          surface: string | null
          p_serve: number | null
          p_return: number | null
          glicko: number | null
          tsd: number | null
          bppi: number | null
          momentum_td: number | null
          win_rate_td: number | null
          breaks_won: number | null
          breaks_lost: number | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          surface?: string | null
          p_serve?: number | null
          p_return?: number | null
          glicko?: number | null
          tsd?: number | null
          bppi?: number | null
          momentum_td?: number | null
          win_rate_td?: number | null
          breaks_won?: number | null
          breaks_lost?: number | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          surface?: string | null
          p_serve?: number | null
          p_return?: number | null
          glicko?: number | null
          tsd?: number | null
          bppi?: number | null
          momentum_td?: number | null
          win_rate_td?: number | null
          breaks_won?: number | null
          breaks_lost?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      match_favorites: {
        Row: {
          id: string
          user_id: string
          match_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          match_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          match_id?: string
          created_at?: string
        }
        Relationships: []
      }
      match_results: {
        Row: {
          id: string
          date_match: string
          player1: string
          player2: string
          winner: string | null
          loser: string | null
          score: string | null
          surface: string | null
          tournoi: string | null
          best_of: number | null
          round: string | null
          minutes: number | null
          rank_winner: number | null
          rank_loser: number | null
          created_at: string | null
        }
        Insert: {
          id?: string
          date_match: string
          player1: string
          player2: string
          winner?: string | null
          loser?: string | null
          score?: string | null
          surface?: string | null
          tournoi?: string | null
          best_of?: number | null
          round?: string | null
          minutes?: number | null
          rank_winner?: number | null
          rank_loser?: number | null
          created_at?: string | null
        }
        Update: {
          id?: string
          date_match?: string
          player1?: string
          player2?: string
          winner?: string | null
          loser?: string | null
          score?: string | null
          surface?: string | null
          tournoi?: string | null
          best_of?: number | null
          round?: string | null
          minutes?: number | null
          rank_winner?: number | null
          rank_loser?: number | null
          created_at?: string | null
        }
        Relationships: []
      }
      match_stats: {
        Row: {
          id: string
          created_at: string | null
          date_match: string
          player1: string
          player2: string
          surface: string | null
          tournoi: string | null
          best_of: number | null
          // TODO: data pipeline — winner exists in match_results but not in match_stats.
          // Populated via join on (date_match, player1, player2) until column is added.
          winner: string | null
          rank_p1: number | null
          rank_p2: number | null
          delta_rank_6m_p1: number | null
          delta_rank_6m_p2: number | null
          p_serve_p1: number | null
          p_serve_p2: number | null
          p_return_p1: number | null
          p_return_p2: number | null
          glicko_rating_p1: number | null
          glicko_rating_p2: number | null
          glicko_rd_p1: number | null
          glicko_rd_p2: number | null
          tsd_p1: number | null
          tsd_p2: number | null
          bppi_p1: number | null
          bppi_p2: number | null
          map_p1: number | null
          map_p2: number | null
          form_p1: string | null
          form_p2: string | null
          win_rate_td_p1: number | null
          win_rate_td_p2: number | null
          win_rate_surf_td_p1: number | null
          win_rate_surf_td_p2: number | null
          win_rate_5m_p1: number | null
          win_rate_5m_p2: number | null
          momentum_td_p1: number | null
          momentum_td_p2: number | null
          fatigue_72h_p1: number | null
          fatigue_72h_p2: number | null
          jours_repos_p1: number | null
          jours_repos_p2: number | null
          breaks_won_td_p1: number | null
          breaks_won_td_p2: number | null
          breaks_lost_td_p1: number | null
          breaks_lost_td_p2: number | null
        }
        Insert: {
          id?: string
          created_at?: string | null
          date_match: string
          player1: string
          player2: string
          surface?: string | null
          tournoi?: string | null
          best_of?: number | null
          winner?: string | null
          rank_p1?: number | null
          rank_p2?: number | null
          delta_rank_6m_p1?: number | null
          delta_rank_6m_p2?: number | null
          p_serve_p1?: number | null
          p_serve_p2?: number | null
          p_return_p1?: number | null
          p_return_p2?: number | null
          glicko_rating_p1?: number | null
          glicko_rating_p2?: number | null
          glicko_rd_p1?: number | null
          glicko_rd_p2?: number | null
          tsd_p1?: number | null
          tsd_p2?: number | null
          bppi_p1?: number | null
          bppi_p2?: number | null
          map_p1?: number | null
          map_p2?: number | null
          form_p1?: string | null
          form_p2?: string | null
          win_rate_td_p1?: number | null
          win_rate_td_p2?: number | null
          win_rate_surf_td_p1?: number | null
          win_rate_surf_td_p2?: number | null
          win_rate_5m_p1?: number | null
          win_rate_5m_p2?: number | null
          momentum_td_p1?: number | null
          momentum_td_p2?: number | null
          fatigue_72h_p1?: number | null
          fatigue_72h_p2?: number | null
          jours_repos_p1?: number | null
          jours_repos_p2?: number | null
          breaks_won_td_p1?: number | null
          breaks_won_td_p2?: number | null
          breaks_lost_td_p1?: number | null
          breaks_lost_td_p2?: number | null
        }
        Update: {
          id?: string
          created_at?: string | null
          date_match?: string
          player1?: string
          player2?: string
          surface?: string | null
          tournoi?: string | null
          best_of?: number | null
          winner?: string | null
          rank_p1?: number | null
          rank_p2?: number | null
          delta_rank_6m_p1?: number | null
          delta_rank_6m_p2?: number | null
          p_serve_p1?: number | null
          p_serve_p2?: number | null
          p_return_p1?: number | null
          p_return_p2?: number | null
          glicko_rating_p1?: number | null
          glicko_rating_p2?: number | null
          glicko_rd_p1?: number | null
          glicko_rd_p2?: number | null
          tsd_p1?: number | null
          tsd_p2?: number | null
          bppi_p1?: number | null
          bppi_p2?: number | null
          map_p1?: number | null
          map_p2?: number | null
          form_p1?: string | null
          form_p2?: string | null
          win_rate_td_p1?: number | null
          win_rate_td_p2?: number | null
          win_rate_surf_td_p1?: number | null
          win_rate_surf_td_p2?: number | null
          win_rate_5m_p1?: number | null
          win_rate_5m_p2?: number | null
          momentum_td_p1?: number | null
          momentum_td_p2?: number | null
          fatigue_72h_p1?: number | null
          fatigue_72h_p2?: number | null
          jours_repos_p1?: number | null
          jours_repos_p2?: number | null
          breaks_won_td_p1?: number | null
          breaks_won_td_p2?: number | null
          breaks_lost_td_p1?: number | null
          breaks_lost_td_p2?: number | null
        }
        Relationships: []
      }
      model_performance: {
        Row: {
          id: string
          date: string | null
          accuracy: number | null
          auc: number | null
          total_bets: number | null
          wins: number | null
          losses: number | null
          win_rate: number | null
          roi: number | null
          profit_total: number | null
          created_at: string | null
        }
        Insert: {
          id?: string
          date?: string | null
          accuracy?: number | null
          auc?: number | null
          total_bets?: number | null
          wins?: number | null
          losses?: number | null
          win_rate?: number | null
          roi?: number | null
          profit_total?: number | null
          created_at?: string | null
        }
        Update: {
          id?: string
          date?: string | null
          accuracy?: number | null
          auc?: number | null
          total_bets?: number | null
          wins?: number | null
          losses?: number | null
          win_rate?: number | null
          roi?: number | null
          profit_total?: number | null
          created_at?: string | null
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          id: string
          email: string
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
        }
        Relationships: []
      }
      player_stats: {
        Row: {
          id: string
          player_name: string
          rank: number | null
          glicko_hard: number | null
          glicko_rd_hard: number | null
          glicko_clay: number | null
          glicko_rd_clay: number | null
          glicko_grass: number | null
          glicko_rd_grass: number | null
          p_serve_hard: number | null
          p_serve_clay: number | null
          p_serve_grass: number | null
          p_return_hard: number | null
          p_return_clay: number | null
          p_return_grass: number | null
          tsd_hard: number | null
          tsd_clay: number | null
          tsd_grass: number | null
          bppi: number | null
          map_hard: number | null
          map_clay: number | null
          map_grass: number | null
          form: string | null
          win_rate_td: number | null
          win_rate_hard_td: number | null
          win_rate_clay_td: number | null
          win_rate_grass_td: number | null
          momentum_td: number | null
          breaks_won_td: number | null
          breaks_lost_td: number | null
          fatigue_72h: number | null
          jours_repos: number | null
          delta_rank_6m: number | null
          last_match_date: string | null
          win_rate_5m: number | null
          stats_history: Json | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          player_name: string
          rank?: number | null
          glicko_hard?: number | null
          glicko_rd_hard?: number | null
          glicko_clay?: number | null
          glicko_rd_clay?: number | null
          glicko_grass?: number | null
          glicko_rd_grass?: number | null
          p_serve_hard?: number | null
          p_serve_clay?: number | null
          p_serve_grass?: number | null
          p_return_hard?: number | null
          p_return_clay?: number | null
          p_return_grass?: number | null
          tsd_hard?: number | null
          tsd_clay?: number | null
          tsd_grass?: number | null
          bppi?: number | null
          map_hard?: number | null
          map_clay?: number | null
          map_grass?: number | null
          form?: string | null
          win_rate_td?: number | null
          win_rate_hard_td?: number | null
          win_rate_clay_td?: number | null
          win_rate_grass_td?: number | null
          momentum_td?: number | null
          breaks_won_td?: number | null
          breaks_lost_td?: number | null
          fatigue_72h?: number | null
          jours_repos?: number | null
          delta_rank_6m?: number | null
          last_match_date?: string | null
          win_rate_5m?: number | null
          stats_history?: Json | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          player_name?: string
          rank?: number | null
          glicko_hard?: number | null
          glicko_rd_hard?: number | null
          glicko_clay?: number | null
          glicko_rd_clay?: number | null
          glicko_grass?: number | null
          glicko_rd_grass?: number | null
          p_serve_hard?: number | null
          p_serve_clay?: number | null
          p_serve_grass?: number | null
          p_return_hard?: number | null
          p_return_clay?: number | null
          p_return_grass?: number | null
          tsd_hard?: number | null
          tsd_clay?: number | null
          tsd_grass?: number | null
          bppi?: number | null
          map_hard?: number | null
          map_clay?: number | null
          map_grass?: number | null
          form?: string | null
          win_rate_td?: number | null
          win_rate_hard_td?: number | null
          win_rate_clay_td?: number | null
          win_rate_grass_td?: number | null
          momentum_td?: number | null
          breaks_won_td?: number | null
          breaks_lost_td?: number | null
          fatigue_72h?: number | null
          jours_repos?: number | null
          delta_rank_6m?: number | null
          last_match_date?: string | null
          win_rate_5m?: number | null
          stats_history?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      predictions: {
        Row: {
          id: string
          date_prediction: string | null
          date_match: string | null
          tournoi: string | null
          match: string | null
          favori: string | null
          bookmaker: string | null
          fr: string | null
          cote: number | null
          break_even: number | null
          prob_ia: number | null
          prob_book: number | null
          edge_pct: number | null
          ev_pct: number | null
          ev_ajuste_pct: number | null
          unites: number | null
          stars: string | null
          roi_profil: string | null
          forme_p1: string | null
          forme_p2: string | null
          h2h: string | null
          surface: string | null
          resultat: string | null
          profit_eur: number | null
          notes: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          date_prediction?: string | null
          date_match?: string | null
          tournoi?: string | null
          match?: string | null
          favori?: string | null
          bookmaker?: string | null
          fr?: string | null
          cote?: number | null
          break_even?: number | null
          prob_ia?: number | null
          prob_book?: number | null
          edge_pct?: number | null
          ev_pct?: number | null
          ev_ajuste_pct?: number | null
          unites?: number | null
          stars?: string | null
          roi_profil?: string | null
          forme_p1?: string | null
          forme_p2?: string | null
          h2h?: string | null
          surface?: string | null
          resultat?: string | null
          profit_eur?: number | null
          notes?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          date_prediction?: string | null
          date_match?: string | null
          tournoi?: string | null
          match?: string | null
          favori?: string | null
          bookmaker?: string | null
          fr?: string | null
          cote?: number | null
          break_even?: number | null
          prob_ia?: number | null
          prob_book?: number | null
          edge_pct?: number | null
          ev_pct?: number | null
          ev_ajuste_pct?: number | null
          unites?: number | null
          stars?: string | null
          roi_profil?: string | null
          forme_p1?: string | null
          forme_p2?: string | null
          h2h?: string | null
          surface?: string | null
          resultat?: string | null
          profit_eur?: number | null
          notes?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          id: string
          plan: string
          role: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          plan?: string
          role: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          plan?: string
          role?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      tracked_players: {
        Row: {
          id: string
          user_id: string
          player_name: string
          added_at: string
          locked_until: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          player_name: string
          added_at?: string
          locked_until: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          player_name?: string
          added_at?: string
          locked_until?: string
          created_at?: string
        }
        Relationships: []
      }
      tracked_players_history: {
        Row: {
          id: string
          user_id: string
          player_name: string
          action: string
          action_date: string
        }
        Insert: {
          id?: string
          user_id: string
          player_name: string
          action: string
          action_date?: string
        }
        Update: {
          id?: string
          user_id?: string
          player_name?: string
          action?: string
          action_date?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      unaccent: { Args: { "": string }; Returns: string }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
