'use client'

import { useEffect } from 'react'
import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'

/**
 * PostHog client-side provider.
 * Initialises PostHog with:
 * - autocapture: true (clicks, form submits, page changes — auto-captured)
 * - capture_pageview: false (managed manually via PostHogPageView to avoid duplicates)
 * - Guard on missing env vars to avoid runtime crash
 *
 * Must wrap the entire app in src/app/layout.tsx.
 */
export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST

    if (!key || !host) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(
          '[PostHog] NEXT_PUBLIC_POSTHOG_KEY or NEXT_PUBLIC_POSTHOG_HOST not set — analytics disabled'
        )
      }
      return
    }

    posthog.init(key, {
      api_host: host,
      capture_pageview: false, // Managed manually via PostHogPageView
      capture_pageleave: true,
      autocapture: true,
      loaded: (ph) => {
        if (process.env.NODE_ENV === 'development') ph.debug()
      },
    })
  }, [])

  return <PHProvider client={posthog}>{children}</PHProvider>
}
