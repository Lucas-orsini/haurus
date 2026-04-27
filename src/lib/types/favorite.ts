/**
 * FavoriteButton — props shared between DashboardOverview and the FavoriteButton component.
 * Used to render a star toggle for marking/unmarking a match as favorite.
 */
export interface FavoriteButtonProps {
  matchId: string
  isFavorite: boolean
  onToggle: (matchId: string, favorited: boolean) => void
}
