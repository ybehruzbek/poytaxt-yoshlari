import type { ReactNode } from 'react'

/**
 * “Harbiy qismlar va muassasalardagi boşlanğiç taşkilotlar” sahifasi.
 * Röyxat hali berilmagan — kelganda OTT sahifasidagi kabi kartalar bilan töldiriladi.
 */
export function HarbiyPage({ crumbs }: { crumbs: ReactNode }) {
  return (
    <div className="bt">
      <header className="pg-head">
        <div className="wrap">
          {crumbs}
          <h1 className="h2 pg-title">Harbiy qismlar va muassasalardagi boşlanğiç taşkilotlar</h1>
          <p className="pg-lead">
            Toşkent şahridagi harbiy qismlar va muassasalarda faoliyat yuritayotgan Özbekiston
            yoşlar ittifoqi boşlanğiç taşkilotlari va ularning yoşlar yetakçilari.
          </p>
        </div>
      </header>
      <section className="sec bt-sec">
        <div className="wrap">
          <div className="bt-soon">
            <svg viewBox="0 0 120 150" aria-hidden="true">
              <circle cx="60" cy="48" r="28" />
              <path d="M8 150c0-34 23-58 52-58s52 24 52 58z" />
            </svg>
            <div>
              <h2>Röyxat tayyorlanmoqda</h2>
              <p>
                Harbiy qismlar va muassasalardagi boşlanğiç taşkilotlar hamda ularning yoşlar
                yetakçilari haqidagi maʼlumot tez orada şu yerda eʼlon qilinadi.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
