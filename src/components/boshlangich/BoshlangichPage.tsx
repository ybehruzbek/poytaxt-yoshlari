import type { ReactNode } from 'react'

import { BtList } from './BtList'
import { OTMS } from './data'

const LED = OTMS.filter((o) => o.leader).length

/**
 * «Boşlanğiç taşkilotlar» sahifasi: yöl va sarlavha, raqamlar, OTT turi böyiça saralaş va qidiruv,
 * yetakçilar kartalari (surat, F.I.Ş., OTT, aloqa şabloni), oxirida vakant OTTlar.
 */
export function BoshlangichPage({ crumbs, base }: { crumbs: ReactNode; base: string }) {
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
          <BtList otms={OTMS} base={base} />
        </div>
      </section>
    </div>
  )
}
