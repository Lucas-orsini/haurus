/**
 * Role-based limits for tracked players feature.
 *
 * Each role defines:
 *   - trackedPlayers: maximum number of players the user can follow
 *   - lockDays: whether the monthly lock applies (starter, analyste only)
 *
 * Fallback for unknown/null roles blocks all additions (trackedPlayers: 0).
 */

export type RoleLimits = {
  trackedPlayers: number | typeof Infinity
  lockDays: boolean
}

export type RoleKey = 'user' | 'starter' | 'analyste' | 'pro' | 'enterprise'

export const ROLE_LIMITS: Record<RoleKey, RoleLimits> = {
  user: {
    trackedPlayers: Infinity,
    lockDays: false,
  },
  starter: {
    trackedPlayers: 1,
    lockDays: true,
  },
  analyste: {
    trackedPlayers: 5,
    lockDays: true,
  },
  pro: {
    trackedPlayers: Infinity,
    lockDays: false,
  },
  enterprise: {
    trackedPlayers: Infinity,
    lockDays: false,
  },
}

const SECURE_FALLBACK: RoleLimits = {
  trackedPlayers: 0,
  lockDays: false,
}

/**
 * Returns the limit config for a given role.
 * Falls back to { trackedPlayers: 0, lockDays: false } for null or unknown roles —
 * this blocks any addition rather than silently granting unlimited access.
 */
export function getRoleLimits(role: string | null): RoleLimits {
  if (!role) return SECURE_FALLBACK

  const key = role as RoleKey
  if (key in ROLE_LIMITS) {
    return ROLE_LIMITS[key]
  }

  return SECURE_FALLBACK
}
