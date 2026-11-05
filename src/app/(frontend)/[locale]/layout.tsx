import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import { notFound } from 'next/navigation'
import React from 'react'

import { AlphabetSwitch } from '@/components/site/AlphabetSwitch'
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
  title: 'O‘zbekiston Yoshlar Ittifoqi — Toshkent shahar hududiy kengashi',
  description:
    'O‘zbekiston Yoshlar Ittifoqi Toshkent shahar hududiy kengashining rasmiy veb-sayti: kengash faoliyati, boshlang‘ich tashkilotlar hayoti, yoshlar uchun imkoniyatlar va yangiliklar.',
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
    <html lang={locale} data-op="a" suppressHydrationWarning className={`${head.variable} ${body.variable}`}>
      <body>
        <Header locale={locale} />
        <main>{props.children}</main>
        <Footer locale={locale} />
        {/* Yangi alifbo faqat o'zbekcha matn uchun */}
        {locale === 'uz' && <AlphabetSwitch />}
        {/* VAQTINCHA: "Siz uchun imkoniyatlar" variantlarini ko'rib chiqish */}
        <DevVariantSwitch name="op" label="Imkoniyatlar" titles={['Rangli kartalar', 'Tablar', 'Muddat bo‘yicha']} />
      </body>
    </html>
  )
}
