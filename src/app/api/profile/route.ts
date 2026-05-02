/**
 * API route for profile mutations.
 *
 * NOTE: The primary mutation path for self-service profile editing is
 * `supabase.auth.updateUser()` called directly from Client Components
 * (no API hop needed — Supabase Auth handles it).
 *
 * This route exists to centralise server-side validation and to serve
 * future requirements such as email-change via OTP or admin-initiated
 * profile updates that require server-side credential checks.
 *
 * Supported methods:
 *   PATCH  — update name and/or password for the authenticated user
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import {
  validateName,
  validatePassword,
  type AuthUser,
} from '@/lib/auth'

// ── Shared helpers ─────────────────────────────────────────────────────────────

/**
 * Build a JSON error response with the expected shape.
 */
function jsonError(message: string, status: number): NextResponse {
  return NextResponse.json({ error: message }, { status })
}

// ── PATCH /api/profile ────────────────────────────────────────────────────────

export async function PATCH(request: NextRequest) {
  // ── 1. Auth check ───────────────────────────────────────────────────────────
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return jsonError('Unauthorized', 401)
  }

  // ── 2. Parse & validate body ────────────────────────────────────────────────
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return jsonError('Invalid JSON body', 400)
  }

  if (
    typeof body !== 'object' ||
    body === null ||
    Array.isArray(body)
  ) {
    return jsonError('Request body must be a JSON object', 400)
  }

  const { name, password } = body as Record<string, unknown>

  // Name is optional but if provided must pass validation
  if (name !== undefined) {
    const nameError = validateName(String(name))
    if (nameError) {
      return jsonError(nameError, 400)
    }
  }

  // Password is optional but if provided must pass validation
  if (password !== undefined) {
    if (typeof password !== 'string') {
      return jsonError('Password must be a string', 400)
    }
    const passwordError = validatePassword(password)
    if (passwordError) {
      return jsonError(passwordError, 400)
    }
  }

  // At least one field must be provided
  if (name === undefined && (password === undefined || password === '')) {
    return jsonError('Provide at least one field to update (name or password)', 400)
  }

  // ── 3. Execute mutations via Supabase Auth ─────────────────────────────────
  const updates: Parameters<typeof supabase.auth.updateUser>[0] = {}

  if (name !== undefined) {
    updates.data = { name: String(name).trim() }
  }

  if (password !== undefined && password !== '') {
    updates.password = password
  }

  const { error: updateError } = await supabase.auth.updateUser(updates)

  if (updateError) {
    return jsonError(updateError.message, 500)
  }

  // ── 4. Return updated AuthUser ─────────────────────────────────────────────
  const {
    data: { user: updatedUser },
  } = await supabase.auth.getUser()

  if (!updatedUser) {
    return jsonError('Session invalid after update. Please sign in again.', 500)
  }

  const authUser: AuthUser = {
    id: updatedUser.id,
    name: updatedUser.user_metadata?.name ?? '',
    email: updatedUser.email ?? '',
  }

  return NextResponse.json(authUser, { status: 200 })
}

// ── Method not allowed ───────────────────────────────────────────────────────────

export async function GET() {
  return jsonError('Method not allowed', 405)
}

export async function POST() {
  return jsonError('Method not allowed', 405)
}

export async function DELETE() {
  return jsonError('Method not allowed', 405)
}
