import { getTranslations, type Locale } from '@/lib/i18n'
import { enUnsubscribe, frUnsubscribe, esUnsubscribe } from '@/lib/i18n/dictionaries'
import UnsubscribeForm from '@/components/unsubscribe/UnsubscribeForm'

const SUPPORTED: Locale[] = ['fr', 'en']

const dictionaries = {
  en: enUnsubscribe,
  fr: frUnsubscribe,
  es: esUnsubscribe,
}

interface UnsubscribePageProps {
  params: Promise<{ locale: string }>
}

export default async function UnsubscribePage({ params }: UnsubscribePageProps) {
  const { locale: rawLocale } = await params

  const locale = (SUPPORTED.includes(rawLocale as Locale) ? rawLocale : 'en') as Locale

  const dict = dictionaries[locale]

  return <UnsubscribeForm dict={dict} />
}
