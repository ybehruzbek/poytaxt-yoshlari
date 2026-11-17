import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import { notFound } from 'next/navigation'
import React from 'react'

import { Footer } from '@/components/site/Footer'
import { Header } from '@/components/site/Header'
import { LoopGuard } from '@/components/site/LoopGuard'
import { PageMotion } from '@/components/site/PageMotion'
import { ScrollRail } from '@/components/site/ScrollRail'
import { TextErrorReport } from '@/components/site/TextErrorReport'
import { Typograf } from '@/components/site/Typograf'
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
import '../hamkorlar.css'
import '../faq.css'
import '../a11y.css'
import '../theme.css'
import '../motion.css'
import '../reveal.css'
import '../skeleton.css'
import { MiqdorProvider } from '@/components/site/MiqdorProvider'
import { getMiqdorlar } from '@/lib/cms/miqdorlar'

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

/**
 * Kuçsiz qurilma yoki “trafikni tejaş” rejimi: sahifa çizilişidan oldin <html data-lite> qöyiladi —
 * skroll animatsiyalari, cheksiz lentalar va şişa (blur) effektlari öçadi, mazmun darhol körinadi.
 * Mezon: tejaş rejimi, 2 GB gaça xotira yoki 2 ta yadro, yoki 4 GB va 4 yadrogaça birga.
 */
const LITE = `try{var n=navigator,c=n.connection,m=n.deviceMemory,h=n.hardwareConcurrency;if((c&&c.saveData)||(m&&m<=2)||(h&&h<=2)||(m&&h&&m<=4&&h<=4))document.documentElement.setAttribute('data-lite','')}catch(e){}`

/**
 * Yuklanmagan (singan) rasm: brauzerning singan rasm belgisi va alt matni örniga rasm örni
 * (kartaning rangli foni) qoladi. Tinglovçi sahifa çizilişidan oldin qöyiladi — birinçi rasmlarni ham ushlaydi.
 */
const IMG_ERR = `document.addEventListener('error',function(e){var t=e.target;if(t&&t.tagName==='IMG')t.setAttribute('data-broken','')},true)`

const SITE_NAME = 'Özbekiston yoşlar ittifoqi Toşkent şahar hududiy Kengaşi'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'),
  title: SITE_NAME,
  description:
    'Özbekiston yoşlar ittifoqi Toşkent şahar hududiy Kengaşining rasmiy veb-sayti: Kengaş faoliyati, boşlanğiç taşkilotlar, yoşlar uçun imkoniyatlar, hujjatlar va yangiliklar.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32 48x48' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: '/apple-touch-icon.png',
  },
  // ijtimoiy tarmoqlarda ulaşilganda: sahifa öz sarlavhasi va tavsifini beradi, rasm — Kengaş logotipi
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'uz_UZ',
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: { card: 'summary_large_image' },
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
  // pul miqdorlari (BHM, stipendiya) — brauzerdagi kalkulyatorlar ham admin paneldagi joriy qiymatdan hisoblaydi
  const miqdor = await getMiqdorlar(locale)

  return (
    // data-scroll-behavior: sahifa almaşganda Next.js silliq aylantirişni vaqtinça öçiradi — yangi sahifa tepadan oçiladi
    <html
      lang={locale}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${head.variable} ${body.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: LITE }} />
        <script dangerouslySetInnerHTML={{ __html: IMG_ERR }} />
      </head>
      <body>
        <Header locale={locale} />
        <MiqdorProvider value={miqdor}>
          <main>{props.children}</main>
        </MiqdorProvider>
        <Footer locale={locale} />
        <ScrollRail />
        <PageMotion locale={locale} />
        <LoopGuard />
        <Typograf />
        <TextErrorReport />
      </body>
    </html>
  )
}
