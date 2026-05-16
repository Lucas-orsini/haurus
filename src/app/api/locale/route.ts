import { NextResponse, type NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { LOCALE_COOKIE_NAME, LOCALE_COOKIE_OPTIONS } from '@/lib/i18n/config'
import { isSupportedLocale, type SupportedLocale } from '@/lib/i18n/config'

export async function POST(request: NextRequest) {
  const { locale } = await request.json()

  if (!isSupportedLocale(locale)) {
    return NextResponse.json({ error: 'Unsupported locale' }, { status: 400 })
  }

  const cookieStore = await cookies()
  cookieStore.set(LOCALE_COOKIE_NAME, locale, {
    maxAge: LOCALE_COOKIE_OPTIONS.maxAge,
    sameSite: LOCALE_COOKIE_OPTIONS.sameSite,
    path: LOCALE_COOKIE_OPTIONS.path,
  })

  return NextResponse.json({ ok: true })
}
