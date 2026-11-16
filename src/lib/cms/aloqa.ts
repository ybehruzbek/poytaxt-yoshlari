import 'server-only'

import { getPayload } from 'payload'
import { cache } from 'react'

import config from '@payload-config'
import type { Faq } from '@/components/faq/data'

import { getHududiy } from './biz'

/** Aloqa maʼlumotlari va FAQ bazadan; avvalgi components/boglanish/data.ts bilan bir xil nomlar va şakl */
type Doc = Record<string, unknown>
const str = (v: unknown) => (typeof v === 'string' ? v : '')
const vs = (v: unknown) => ((v as { v?: string }[]) ?? []).map((x) => x.v ?? '').filter(Boolean)

const tel = (v: string) => `tel:${v.replace(/[^\d+]/g, '')}`

export const getAloqa = cache(async (locale = 'uz') => {
  const payload = await getPayload({ config })
  const g = (await payload.findGlobal({ slug: 'aloqa', locale: locale as 'uz', fallbackLocale: 'uz', depth: 0 })) as unknown as Doc
  const a = (g.address as Doc) ?? {}
  const c = (g.coords as { lat?: number; lon?: number }) ?? {}
  const h = (g.hours as Doc) ?? {}
  const pr = (g.press as Doc) ?? {}
  const law = (g.law as Doc) ?? {}
  const LAT = c.lat ?? 41.35214
  const LON = c.lon ?? 69.20496
  const PHONES = vs(g.phones).map((v) => ({ v, href: tel(v) }))
  const EMAILS = vs(g.emails)
  const HOURS = { days: str(h.days), time: str(h.time), off: str(h.off) }
  const ADDRESS = {
    full: str(a.full),
    line: str(a.line),
    city: str(a.city),
    street: str(a.street),
    landmark: str(a.landmark),
    metro: { station: str(a.metro), walk: str(a.walk) },
  }
  const SOCIALS = ((g.socials as Doc[]) ?? []).map((s) => ({ net: s.net as 'Telegram' | 'Instagram' | 'Facebook', handle: str(s.handle), href: str(s.href) }))
  const { RECEPTION } = await getHududiy(locale)
  const position = (dept: string) => (dept === 'Kengaş raisi' ? dept : `${dept}${dept.endsWith('bölimi') ? '' : ' bölimi'} boşliği`)
  return {
    ORG: 'Özbekiston yoşlar ittifoqi Toşkent şahar hududiy Kengaşi',
    ADDRESS,
    MAPS: {
      yandexEmbed: `https://yandex.uz/map-widget/v1/?ll=${LON}%2C${LAT}&z=17&pt=${LON},${LAT},pm2rdl`,
      googleEmbed: `https://www.google.com/maps?q=${LAT},${LON}&z=17&output=embed`,
      yandex: `https://yandex.uz/maps/?ll=${LON}%2C${LAT}&z=18&pt=${LON},${LAT},pm2rdl`,
      google: `https://www.google.com/maps/search/?api=1&query=${LAT},${LON}`,
    },
    PHONES,
    EMAIL: EMAILS[0] ?? '',
    EMAILS,
    HOURS,
    SOCIALS,
    RECEPTIONS: RECEPTION.map((r) => ({ day: r.day, time: r.time.replace(/\s*—\s*/, '–'), room: `${Number(r.room)}-xona`, name: r.name, dept: position(r.dept) })),
    LAW: {
      title: str(law.title),
      href: str(law.href),
      terms: ((law.terms as Doc[]) ?? []).map((t) => ({ v: str(t.v), t: str(t.t) })),
      types: ((law.types as Doc[]) ?? []).map((t) => ({ t: str(t.t), d: str(t.d) })),
    },
    PRESS_CONTACT: {
      unit: str(pr.unit),
      phone: { v: str(pr.phone), href: tel(str(pr.phone)) },
      email: { v: str(pr.email), href: `mailto:${str(pr.email)}` },
      telegram: { v: str(pr.telegram), href: `https://t.me/${str(pr.telegram).replace(/^@/, '')}` },
    },
    /** hududiy Kengaş sahifasidagi qisqa aloqa bloki */
    CONTACT: {
      address: ADDRESS.line,
      map: `https://yandex.uz/maps/?ll=${LON}%2C${LAT}&z=18&pt=${LON},${LAT},pm2rdl`,
      phone: PHONES[0]?.v ?? '',
      phoneHref: PHONES[0]?.href ?? '',
      email: EMAILS[0] ?? '',
      hours: `${HOURS.days} · ${HOURS.time}`,
      socials: SOCIALS,
    },
  }
})
export type AloqaData = Awaited<ReturnType<typeof getAloqa>>
export type PressContactT = AloqaData['PRESS_CONTACT']

/** FAQ: javobdagi {TELEFONLAR}, {POÇTA}, {MANZIL}, {MÖLJAL}, {IŞ_VAQTI} — joriy aloqa maʼlumotlari */
export const getFaqs = cache(async (locale = 'uz'): Promise<{ all: Faq[]; home: Faq[]; azolik: Faq[] }> => {
  const payload = await getPayload({ config })
  const [r, A] = await Promise.all([
    payload.find({ collection: 'faqs', locale: locale as 'uz', fallbackLocale: 'uz', sort: '_order', depth: 0, pagination: false, overrideAccess: false }),
    getAloqa(locale),
  ])
  const fill = (s: string) =>
    s
      .replace(/\{TELEFONLAR\}/g, A.PHONES.map((p) => p.v).join(', '))
      .replace(/\{PO(?:Ç|CH)TA\}/g, A.EMAIL)
      .replace(/\{MANZIL\}/g, A.ADDRESS.line)
      .replace(/\{M(?:Ö|O)LJAL\}/g, A.ADDRESS.landmark)
      .replace(/\{I(?:Ş|SH)_VAQTI\}/g, `${A.HOURS.days.toLowerCase()}, ${A.HOURS.time}. ${A.HOURS.off}`)
  const docs = r.docs as unknown as Doc[]
  const all: (Faq & { home: boolean; azolik: boolean })[] = docs.map((f) => {
    const li = ((f.li as { t?: string }[]) ?? []).map((x) => fill(x.t ?? '')).filter(Boolean)
    const more = (f.more as { href?: string; label?: string }) ?? {}
    return {
      id: str(f.slug),
      cat: f.cat as Faq['cat'],
      q: str(f.q),
      a: ((f.a as { t?: string }[]) ?? []).map((x) => fill(x.t ?? '')).filter(Boolean),
      ...(li.length ? { li } : {}),
      ...(more.href && more.label ? { more: { href: more.href, label: more.label } } : {}),
      home: !!f.home,
      azolik: !!f.azolik,
    }
  })
  return { all, home: all.filter((f) => f.home), azolik: all.filter((f) => f.azolik) }
})
