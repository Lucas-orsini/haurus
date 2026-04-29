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
          bppi: number | null
          breaks_lost: number | null
          breaks_won: number | null
          glicko: number | null
          id: string
          momentum_td: number | null
          p_return: number | null
          p_serve: number | null
          surface: string | null
          tsd: number | null
          updated_at: string | null
          win_rate_td: number | null
        }
        Relationships: []
      }
      match_favorites: {
        Row: {
          created_at: string
          id: string
          match_id: string
          user_id: string
        }
        Relationships: []
      }
      match_results: {
        Row: {
          best_of: number | null
          created_at: string | null
          date_match: string
          id: string
          loser: string | null
          minutes: number | null
          player1: string
          player2: string
          rank_loser: number | null
          rank_winner: number | null
          round: string | null
          score: string | null
          surface: string | null
          tournoi: string | null
          winner: string | null
        }
        Relationships: []
        Insert: {
          best_of?: number | null
          created_at?: string | null
          date_match: string
          id?: string
          loser?: string | null
          minutes?: number | null
          player1: string
          player2: string
          rank_loser?: number | null
          rank_winner?: number | null
          round?: string | null
          score?: string | null
          surface?: string | null
          tournoi?: string | null
          winner?: string | null
        }
        Update: {
          best_of?: number | null
          created_at?: string | null
          date_match?: string
          id?: string
          loser?: string | null
          minutes?: number | null
          player1?: string
          player2?: string
          rank_loser?: number | null
          rank_winner?: number | null
          round?: string | null
          score?: string | null
          surface?: string | null
          tournoi?: string | null
          winner?: string | null
        }
      }
      match_stats: {
        Row: {
          best_of: number | null
          bppi_p1: number | null
          bppi_p2: number | null
          breaks_lost_td_p1: number | null
          breaks_lost_td_p2: number | null
          breaks_won_td_p1: number | null
          breaks_won_td_p2: number | null
          created_at: string | null
          date_match: string
          delta_rank_6m_p1: number | null
          delta_rank_6m_p2: number | null
          fatigue_72h_p1: number | null
          fatigue_72h_p2: number | null
          form_p1: string | null
          form_p2: string | null
          glicko_rating_p1: number | null
          glicko_rating_p2: number | null
          glicko_rd_p1: number | null
          glicko_rd_p2: number | null
          id: string
          jours_repos_p1: number | null
          jours_repos_p2: number | null
          map_p1: number | null
          map_p2: number | null
          momentum_td_p1: number | null
          momentum_td_p2: number | null
          p_return_p1: number | null
          p_return_p2: number | null
          p_serve_p1: number | null
          p_serve_p2: number | null
          player1: string
          player2: string
          rank_p1: number | null
          rank_p2: number | null
          surface: string | null
          tournoi: string | null
          tsd_p1: number | null
          tsd_p2: number | null
          win_rate_5m_p1: number | null
          win_rate_5m_p2: number | null
          win_rate_surf_td_p1: number | null
          win_rate_surf_td_p2: number | null
          win_rate_td_p1: number | null
          win_rate_td_p2: number | null
        }
        Relationships: []
      }
      model_performance: {
        Row: {
          accuracy: number | null
          auc: number | null
          created_at: string | null
          date: string | null
          id: string
          losses: number | null
          profit_total: number | null
          roi: number | null
          total_bets: number | null
          win_rate: number | null
          wins: number | null
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
        }
        Relationships: []
      }
      player_stats: {
        Row: {
          bppi: number | null
          breaks_lost_td: number | null
          breaks_won_td: number | null
          delta_rank_6m: number | null
          fatigue_72h: number | null
          form: string | null
          glicko_clay: number | null
          glicko_grass: number | null
          glicko_hard: number | null
          glicko_rd_clay: number | null
          glicko_rd_grass: number | null
          glicko_rd_hard: number | null
          id: string
          jours_repos: number | null
          last_match_date: string | null
          map_clay: number | null
          map_grass: number | null
          map_hard: number | null
          momentum_td: number | null
          p_return_clay: number | null
          p_return_grass: number | null
          p_return_hard: number | null
          p_serve_clay: number | null
          p_serve_grass: number | null
          p_serve_hard: number | null
          player_name: string
          rank: number | null
          stats_history: Json | null
          tsd_clay: number | null
          tsd_grass: number | null
          tsd_hard: number | null
          updated_at: string | null
          win_rate_5m: number | null
          win_rate_clay_td: number | null
          win_rate_grass_td: number | null
          win_rate_hard_td: number | null
          win_rate_td: number | null
        }
        Relationships: []
      }
      predictions: {
        Row: {
          bookmaker: string | null
          break_even: number | null
          cote: number | null
          created_at: string | null
          date_match: string | null
          date_prediction: string | null
          edge_pct: number | null
          ev_ajuste_pct: number | null
          ev_pct: number | null
          favori: string | null
          forme_p1: string | null
          forme_p2: string | null
          fr: string | null
          h2h: string | null
          id: string
          match: string | null
          notes: string | null
          prob_book: number | null
          prob_ia: number | null
          profit_eur: number | null
          resultat: string | null
          roi_profil: string | null
          stars: string | null
          surface: string | null
          tournoi: string | null
          unites: number | null
          updated_at: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          role: string
          updated_at: string
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
