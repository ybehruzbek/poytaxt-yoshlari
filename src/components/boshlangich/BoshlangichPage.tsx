import type { ReactNode } from 'react'

import { DevSectionsPanel, type PanelSection } from '@/components/site/DevSectionsPanel'

import { BtList, type View } from './BtList'
import { OTMS } from './data'

const LED = OTMS.filter((o) => o.leader).length

/** VAQTINCHA: dizayn variantlari faqat işlab çiqiş rejimida */
const DEV = process.env.NODE_ENV !== 'production'
const PANEL: PanelSection[] = [{ name: 'btv', label: 'Sahifa körinişi', count: 4 }]
const VIEWS: View[] = ['a', 'b', 'c', 'd']

/**
 * «Boşlanğiç taşkilotlar» sahifasi: yöl va sarlavha, raqamlar, OTT turi böyiça saralaş va qidiruv,
 * yetakçilar kartalari (surat, F.I.Ş., OTT, aloqa şabloni), oxirida vakant OTTlar.
 */
export function BoshlangichPage({ crumbs }: { crumbs: ReactNode }) {
  return (
    <div className="bt">
      <header className="pg-head">
        <div className="wrap">
          {crumbs}
          <h1 className="h2 pg-title">Oliy taʼlim taşkilotlaridagi boşlanğiç taşkilotlar</h1>
          <p className="pg-lead">
            Toşkent şahridagi oliy taʼlim taşkilotlarida faoliyat yuritayotgan Özbekiston yoşlar
            ittifoqi boşlanğiç taşkilotlari va ularning yoşlar yetakçilari.
          </p>
          <dl className="bt-stats">
            <div>
              <dt>Oliy taʼlim taşkiloti</dt>
              <dd>{OTMS.length}</dd>
            </div>
            <div>
              <dt>Yoşlar yetakçisi</dt>
              <dd>{LED}</dd>
            </div>
            <div>
              <dt>Vakant</dt>
              <dd>{OTMS.length - LED}</dd>
            </div>
          </dl>
        </div>
      </header>
      <section className="sec bt-sec">
        <div className="wrap">
          {DEV ? (
            VIEWS.map((v) => (
              <div key={v} className="vx" data-v={`btv-${v}`}>
                <BtList otms={OTMS} view={v} />
              </div>
            ))
          ) : (
            <BtList otms={OTMS} />
          )}
        </div>
      </section>
      {DEV && <DevSectionsPanel sections={PANEL} />}
    </div>
  )
}
