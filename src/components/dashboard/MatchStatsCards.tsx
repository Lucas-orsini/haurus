import StatsCard from './StatsCard'
import {
  fetchMatchsduJour,
  fetchSpecialisteSurface,
  fetchMomentumExtreme,
  type MatchsJourData,
  type SpecialisteSurfaceData,
  type MomentumExtremeData,
} from '@/lib/dashboard/statsCards'

const SURFACE_BADGE: Record<string, { label: string; className: string }> = {
  Hard: {
    label: 'Hard',
    className: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  },
  Clay: {
    label: 'Clay',
    className: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  },
  Grass: {
    label: 'Grass',
    className: 'bg-green-500/10 text-green-400 border-green-500/20',
  },
}

function getSurfaceBadge(surface: string) {
  const info = SURFACE_BADGE[surface] ?? {
    label: surface,
    className: 'bg-white/[0.05] text-[var(--text-3)] border-[var(--border)]',
  }
  return (
    <span
      className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium border whitespace-nowrap ${info.className}`}
    >
      {info.label}
    </span>
  )
}

interface MatchsJourCardProps {
  data: MatchsJourData
}

function MatchsJourCard({ data }: MatchsJourCardProps) {
  if (data.count === 0) {
    return (
      <StatsCard title="Matchs du jour" mainValue="Aucun match prévu" />
    )
  }

  return (
    <StatsCard
      title="Matchs du jour"
      mainValue={data.count.toString()}
      subtitle={`${data.count} match${data.count !== 1 ? 's' : ''} programmé${data.count !== 1 ? 's' : ''}`}
    >
      <div className="flex flex-col gap-0.5">
        {data.tournaments.map((t, i) => (
          <div key={i} className="flex items-center justify-between gap-2">
            <span className="text-[11px] text-[var(--text-2)] truncate">{t.tournoi}</span>
            <span className="shrink-0">{getSurfaceBadge(t.surface)}</span>
          </div>
        ))}
      </div>
    </StatsCard>
  )
}

interface SpecialisteSurfaceCardProps {
  data: SpecialisteSurfaceData | null
}

function SpecialisteSurfaceCard({ data }: SpecialisteSurfaceCardProps) {
  if (!data) {
    return (
      <StatsCard title="Spécialiste surface" mainValue="Données indisponibles" />
    )
  }

  const winRateFormatted = `${Math.round(data.winRate * 100)}%`

  return (
    <StatsCard
      title="Spécialiste surface"
      mainValue={data.playerName}
      subtitle={`${winRateFormatted} de victoire`}
    >
      <div className="flex items-center gap-2">
        {getSurfaceBadge(data.surface)}
        <span className="text-[11px] text-[var(--text-2)]">
          vs {data.adversaire}
        </span>
      </div>
    </StatsCard>
  )
}

interface MomentumExtremeCardProps {
  data: MomentumExtremeData | null
}

function MomentumExtremeCard({ data }: MomentumExtremeCardProps) {
  if (!data) {
    return (
      <StatsCard title="Momentum extrême" mainValue="Données indisponibles" />
    )
  }

  const arrow = data.momentum >= 0 ? '↑' : '↓'
  const sign = data.momentum >= 0 ? '+' : '-'
  const absVal = Math.abs(data.momentum).toFixed(2)
  const momentumClass = data.momentum >= 0
    ? 'text-[var(--green)]'
    : 'text-[var(--red)]'

  return (
    <StatsCard title="Momentum extrême" mainValue={data.playerName}>
      <div className="flex items-center gap-1.5">
        <span className={`text-xs font-semibold tabular-nums ${momentumClass}`}>
          {arrow} {sign}{absVal}
        </span>
        <span className="text-[11px] text-[var(--text-3)]">vs {data.adversaire}</span>
      </div>
    </StatsCard>
  )
}

export default async function MatchStatsCards() {
  const [matchsJour, specialiste, momentum] = await Promise.all([
    fetchMatchsduJour(),
    fetchSpecialisteSurface(),
    fetchMomentumExtreme(),
  ])

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
      <MatchsJourCard data={matchsJour} />
      <SpecialisteSurfaceCard data={specialiste} />
      <MomentumExtremeCard data={momentum} />
    </div>
  )
}
