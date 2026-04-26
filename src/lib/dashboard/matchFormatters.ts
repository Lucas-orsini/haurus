export function formatDate(isoDate: string): string {
  const date = new Date(isoDate)
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export function formatMatch(player1: string, player2: string): string {
  return `${player1} vs ${player2}`
}
