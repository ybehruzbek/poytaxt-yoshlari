import type { ReactNode } from 'react'

import { DevSectionsPanel } from '@/components/site/DevSectionsPanel'

import type { YnItem } from './data'
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
  const L = `/${locale}/yangiliklar`

  return (
    <div className="yn">
      <header className="pg-head">
        <div className="wrap">
          {crumbs}
          <h1 className="h2 pg-title">Yangiliklar</h1>
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
            <VariantA items={items} L={L} />
          </V>
          <V k="b">
            <VariantB items={items} L={L} />
          </V>
          <V k="c">
            <VariantC items={items} L={L} />
          </V>
          <DevSectionsPanel
            sections={[
              {
                name: 'yn',
                label: 'Yangiliklar',
                count: 3,
                hints: [
                  'Daryo.uz uslubi: asosiy yangilik + öngda vaqtli lenta',
                  'Gazeta.uz uslubi: kunlar böyiça zič lenta, sahifalaş',
                  'UzA uslubi: asosiy yangilik + rubrikalar',
                ],
              },
            ]}
          />
        </>
      ) : (
        <VariantA items={items} L={L} />
      )}
    </div>
  )
}
