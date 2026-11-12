import type { ReactNode } from 'react'

import type { YnItem } from './data'
import { YnList } from './YnList'

/** “Yangiliklar” sahifasi: sarlavha + yangiliklar röyxati (rubrikalar, asosiy yangilik, yiğilib-oçiladigan röyxat, öngda lenta) */
export function YangiliklarPage({
  items,
  crumbs,
  locale,
  title = 'Yangiliklar',
}: {
  items: YnItem[]
  crumbs: ReactNode
  locale: string
  /** sahifa sarlavhasi (teg sahifasida — “#Teg”) */
  title?: string
}) {
  const L = `/${locale}/yangiliklar`

  return (
    <div className="yn">
      <header className="pg-head">
        <div className="wrap">
          {crumbs}
          <h1 className="h2 pg-title">{title}</h1>
        </div>
      </header>

      {items.length === 0 ? (
        <section className="sec">
          <div className="wrap">
            <div className="yn-empty" role="status">
              <b>Hozirça yangiliklar yöq</b>
              <p>Kengaş yangiliklari eʼlon qilinişi bilan şu sahifada körsatiladi.</p>
            </div>
          </div>
        </section>
      ) : (
        <YnList items={items} L={L} />
      )}
    </div>
  )
}
