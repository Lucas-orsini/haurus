import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { fetchMatchStats } from '@/lib/match-stats'
import DashboardClient from '@/components/dashboard/DashboardClient'

export default async function DashboardPage() {
  const session = await getSession()

  if (!session) {
    redirect('/login?redirectTo=/dashboard')
  }

  const matches = await fetchMatchStats()

  return <DashboardClient matches={matches} userName={session.name} />
}
