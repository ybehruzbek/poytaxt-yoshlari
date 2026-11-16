import type { ReactNode } from 'react'

import { BtList } from './BtList'
import { getOtts } from '@/lib/cms/biz'


/**
 * «Boşlanğiç taşkilotlar» sahifasi: yöl va sarlavha, raqamlar, OTT turi böyiça saralaş va qidiruv,
 * yetakçilar kartalari (surat, F.I.Ş., OTT, aloqa şabloni), oxirida vakant OTTlar.
 */
export async function BoshlangichPage({ crumbs, base, locale = 'uz' }: { crumbs: ReactNode; base: string; locale?: string }) {
  const OTMS = await getOtts(locale)
  const LED = OTMS.filter((o) => o.leader).length
  return (
    <div className="bt">
      <header className="pg-head">
        <div className="wrap">
          {crumbs}
          <h1 className="h2 pg-title">Oliy taʼlim taşkilotlaridagi boşlanğiç taşkilotlar</h1>
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
              <dt>Yetakçi lavozimi vakant</dt>
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
