import type { ReactNode } from 'react'

import { DevSectionsPanel } from '@/components/site/DevSectionsPanel'

import type { YnItem } from './data'
import { VariantA } from './VariantA'
import { VariantA2 } from './VariantA2'
import { VariantA3 } from './VariantA3'

/** VAQTINCHA: dizayn variantlari faqat işlab çiqiş rejimida (productionda faqat A1) */
const DEV = process.env.NODE_ENV !== 'production'

function V({ k, children }: { k: string; children: ReactNode }) {
  if (!DEV) return <>{children}</>
  return (
    <div className="vx" data-v={`yn-${k}`}>
      {children}
    </div>
  )
}

/** “Yangiliklar” sahifasi: sarlavha + yangiliklar röyxati (A uslubining 3 ta nusxasi) */
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
            <VariantA2 items={items} L={L} />
          </V>
          <V k="c">
            <VariantA3 items={items} L={L} />
          </V>
          <DevSectionsPanel
            sections={[
              {
                name: 'yn',
                label: 'Yangiliklar',
                count: 3,
                hints: [
                  'A1: asosiy yangilik + ixçam kartalar, lenta kunlar böyiça',
                  'A2: katta asosiy + 2 yordamçi, lentada sana va turkum',
                  'A3: rasm ustida sarlavha, 3 ustunli kartalar, vaqt çizigi',
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
