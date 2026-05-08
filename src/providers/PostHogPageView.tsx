'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { usePostHog } from 'posthog-js/react'

/**
 * Emits a $pageview event on every navigation.
 * Wrapped in Suspense (fallback null) in layout.tsx because
 * useSearchParams requires a Suspense boundary in Next.js 15 App Router static builds.
 */
export function PostHogPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const posthog = usePostHog()

  useEffect(() => {
    if (!pathname || !posthog) return

    let url = window.origin + pathname
    const search = searchParams?.toString()
    if (search) url = `${url}?${search}`

    posthog.capture('$pageview', { $current_url: url })
  }, [pathname, searchParams, posthog])

  return null
}
