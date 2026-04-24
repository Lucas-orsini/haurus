import { NextResponse, type NextRequest } from 'next/server'

const LOCALE_COOKIE = 'haurus-locale'
const LOCALE_HEADER = 'x-haurus-locale'
const LOCALES = ['en', 'fr'] as const
const DEFAULT_LOCALE = 'en'

const STATIC_PATTERNS = ['/_next', '/favicon', '/robots.txt', '/sitemap']

function isStaticAsset(pathname: string): boolean {
  return STATIC_PATTERNS.some((pattern) => pathname.startsWith(pattern))
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (isStaticAsset(pathname)) {
    return NextResponse.next()
  }

  let locale: (typeof LOCALES)[number] = DEFAULT_LOCALE

  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value
  if (cookieLocale && (LOCALES as readonly string[]).includes(cookieLocale)) {
    locale = cookieLocale as (typeof LOCALES)[number]
  }

  const response = NextResponse.next()
  response.headers.set(LOCALE_HEADER, locale)
  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
