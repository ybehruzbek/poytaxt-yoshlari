import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import { notFound } from 'next/navigation'
import React from 'react'

import { DevVariantSwitch } from '@/components/site/DevVariantSwitch'
import { Footer } from '@/components/site/Footer'
import { Header } from '@/components/site/Header'
import { isLocale, locales } from '@/i18n/config'
import '../styles.css'
import '../site.css'
import '../buttons.css'
import '../nav.css'
import '../news.css'
import '../events.css'
import '../opps.css'
import '../cta.css'
import '../footer.css'
import '../social.css'

// Shriftlar build paytida yuklab olinadi va o'z serverimizdan beriladi (Google'ga so'rov ketmaydi).
// latin-ext: Ö Ğ Ş Ç ’ (yangi alifbo); cyrillic: rus tili.
const head = Montserrat({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['500', '600', '700', '800'],
  variable: '--f-head',
  display: 'swap',
})
const body = Inter({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--f-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Özbekiston Yoşlar Ittifoqi — Toşkent şahar hududiy kengaşi',
  description:
    'Özbekiston Yoşlar Ittifoqi Toşkent şahar hududiy kengaşining rasmiy veb-sayti: kengaş faoliyati, boşlanğiç taşkilotlar hayoti, yoşlar uçun imkoniyatlar va yangiliklar.',
  icons: { icon: '/img/logo-toshkent.png' },
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout(props: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await props.params
  if (!isLocale(locale)) notFound()

  return (
    <html lang={locale} data-ft="a" suppressHydrationWarning className={`${head.variable} ${body.variable}`}>
      <body>
        <Header locale={locale} />
        <main>{props.children}</main>
        <Footer locale={locale} />
        {/* VAQTINCHA (faqat dev): footer variantlarini ko'rib chiqish */}
        {process.env.NODE_ENV !== 'production' && (
          <DevVariantSwitch name="ft" label="Footer" titles={['A · Şior bilan (B2)', 'B · Katta söz', 'C · Rasmiy']} />
        )}
      </body>
    </html>
  )
}
