/**
 * Plan limits for the player tracking system.
 * Maps each plan to its maximum number of tracked players and whether
 * the removal lock (1-month cooldown) applies.
 *
 * trackedPlayers: max number of players the user can follow. Infinity means no limit.
 * lockDays: if true, removed players are locked until the first day of next month.
 *           if false, no lock applies (beta / enterprise).
 */

export type PlanKey = 'beta' | 'free' | 'pro' | 'enterprise'

export type PlanLimit = {
  trackedPlayers: number
  lockDays: boolean
}

export const PLAN_LIMITS: Record<PlanKey, PlanLimit> = {
  beta: {
    trackedPlayers: Infinity,
    lockDays: false,
  },
  free: {
    trackedPlayers: 1,
    lockDays: true,
  },
  pro: {
    trackedPlayers: 5,
    lockDays: true,
  },
  enterprise: {
    trackedPlayers: Infinity,
    lockDays: false,
  },
}
