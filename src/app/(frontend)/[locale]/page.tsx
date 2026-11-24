import { FaqBlock } from '@/components/faq/FaqBlock'
import { PartnersStrip } from '@/components/hamkorlar/PartnersStrip'
import { About } from '@/components/site/About'
import { Benefits } from '@/components/site/Benefits'
import { Cta } from '@/components/site/Cta'
import { Events } from '@/components/site/Events'
import { Hero } from '@/components/site/Hero'
import { HomeMotion } from '@/components/site/HomeMotion'
import { News } from '@/components/site/News'
import { Opportunities } from '@/components/site/Opportunities'
import { SocialPhones } from '@/components/site/SocialPhones'
import type { Locale } from '@/i18n/config'
import { bashMeta } from '@/lib/seo'

import '../odamlar.css'

/** Boş sahifaning yagona rasmiy manzili (yoshkent.uz ham şu yerga yönaltiriladi) */
export const metadata = bashMeta()

/** Bosh sahifa har 60 soniyada yangilanadi (yangi yangiliklar shu orqali ko'rinadi) */
export const revalidate = 60

/**
 * Bosh sahifa (landing). Bo'limlar ittifoq/ prototipidan ko'chirilgan.
 * Hozircha matnlar statik (namuna) — 3-bosqichda admin paneldan (Payload) keladi.
 */
export default async function Home(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  return (
    <>
      <Hero locale={locale} />
      <News locale={locale} />
      <Events locale={locale} />
      <Opportunities locale={locale} />
      <About locale={locale} />
      <Benefits locale={locale} />
      <FaqBlock pick="home" base={`/${locale}`} />
      <Cta locale={locale} />
      <SocialPhones />
      <PartnersStrip locale={locale} />
      <HomeMotion />
    </>
  )
}
