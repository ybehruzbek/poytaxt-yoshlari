import type { ReactNode } from 'react'

import { DevSectionsPanel } from '@/components/site/DevSectionsPanel'

import { catsOf, monthsOf, type YnItem } from './data'
import { VariantA } from './VariantA'
import { VariantB } from './VariantB'
import { VariantC } from './VariantC'

/** VAQTINCHA: dizayn variantlari faqat işlab çiqiş rejimida (productionda faqat A) */
const DEV = process.env.NODE_ENV !== 'production'

function V({ k, children }: { k: string; children: ReactNode }) {
  if (!DEV) return <>{children}</>
  return (
    <div className="vx" data-v={`yn-${k}`}>
      {children}
    </div>
  )
}

/** “Yangiliklar” sahifasi: sarlavha + yangiliklar röyxati (3 ta dizayn varianti) */
export function YangiliklarPage({
  items,
  crumbs,
  locale,
}: {
  items: YnItem[]
  crumbs: ReactNode
  locale: string
}) {
  const cats = catsOf(items)
  const months = monthsOf(items)
  const L = `/${locale}/yangiliklar`

  return (
    <div className="yn">
      <header className="pg-head">
        <div className="wrap">
          {crumbs}
          <h1 className="h2 pg-title">Yangiliklar</h1>
          <p className="pg-lead">
            Özbekiston yoşlar ittifoqi Toşkent şahar hududiy Kengaşi faoliyati, OTT boşlanğiç taşkilotlari,
            tadbirlar va yoşlar uçun imkoniyatlar haqidagi sönggi xabarlar.
          </p>
        </div>
      </header>

      {items.length === 0 ? (
        <section className="sec">
          <div className="wrap">
            <div className="yn-empty" role="status">
              <b>Hozirça yangiliklar yöq</b>
              <p>Tez orada şu yerda Kengaş yangiliklari paydo böladi.</p>
            </div>
          </div>
        </section>
      ) : DEV ? (
        <>
          <V k="a">
            <VariantA items={items} cats={cats} L={L} />
          </V>
          <V k="b">
            <VariantB items={items} cats={cats} months={months} L={L} />
          </V>
          <V k="c">
            <VariantC items={items} cats={cats} months={months} L={L} />
          </V>
          <DevSectionsPanel
            sections={[
              {
                name: 'yn',
                label: 'Yangiliklar',
                count: 3,
                hints: [
                  'Tahririyat: katta asosiy yangilik + tör',
                  'Lenta: oylar böyiça, yon panel',
                  'Jurnal arxivi: qidiruv va filtrlar',
                ],
              },
            ]}
          />
        </>
      ) : (
        <VariantA items={items} cats={cats} L={L} />
      )}
    </div>
  )
}
