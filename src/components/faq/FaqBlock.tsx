import Link from 'next/link'

import { More } from '@/components/site/MoreBtn'

import { pickFaq } from './data'
import { FaqItem } from './FaqItem'

/**
 * Qisqa FAQ bloki (bosh sahifa, Ittifoq sahifasi): sarlavha, tanlangan savollar va
 * “Barça savollar” tugmasi. `base` — til prefiksi (/uz).
 */
export function FaqBlock({
  ids,
  base,
  title = 'Köp beriladigan savollar',
  section = true,
}: {
  ids: string[]
  base: string
  title?: string
  /** false — tayyor bölim ičiga joylaş uçun (örovçi section'siz) */
  section?: boolean
}) {
  const body = (
    <div className="faq-block">
      <div className="faq-block-head">
        <h2 className="h2">{title}</h2>
        <Link href={`${base}/boglanish/savollar`} className="more-btn">
          <More>Barça savollar</More>
        </Link>
      </div>
      <div className="faq-list">
        {pickFaq(ids).map((f) => (
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
