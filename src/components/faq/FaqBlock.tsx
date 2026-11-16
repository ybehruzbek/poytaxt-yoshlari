import Link from 'next/link'

import { More } from '@/components/site/MoreBtn'

import { getFaqs } from '@/lib/cms/aloqa'
import { getBosh } from '@/lib/cms/sahifalar'
import { FaqItem } from './FaqItem'

/**
 * Qisqa FAQ bloki (bosh sahifa, Ittifoq sahifasi): sarlavha, tanlangan savollar va
 * “Barça savollar” tugmasi. `base` — til prefiksi (/uz).
 */
export async function FaqBlock({
  pick,
  base,
  title,
  section = true,
}: {
  /** qaysi savollar: admin paneldagi “Bosh sahifada” yoki “aʼzolik bölimida” belgisi */
  pick: 'home' | 'azolik'
  base: string
  title?: string
  /** false — tayyor bölim ičiga joylaş uçun (örovçi section'siz) */
  section?: boolean
}) {
  const loc = base.split('/')[1] || 'uz'
  const items = (await getFaqs(loc))[pick]
  const head = title ?? ((await getBosh(loc)).heads.faq || 'Köp beriladigan savollar')
  const body = (
    <div className="faq-block">
      <div className="faq-block-head">
        <h2 className="h2">{head}</h2>
        <Link href={`${base}/boglanish/savollar`} className="more-btn">
          <More>
            Batafsil<span className="sr-only">: Barça savollar</span>
          </More>
        </Link>
      </div>
      <div className="faq-list">
        {items.map((f) => (
          <FaqItem key={f.id} f={f} base={base} />
        ))}
      </div>
    </div>
  )
  if (!section) return body
  return (
    <section className="sec faq-sec">
      <div className="wrap">{body}</div>
    </section>
  )
}
