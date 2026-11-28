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
          <h1 className="h2 pg-title">Harbiy qismlar va muassasalardagi boshlang‘ich tashkilotlar</h1>
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
              <h2>Ro‘yxat tayyorlanmoqda</h2>
              <p>
                Harbiy qismlar va muassasalardagi boshlang‘ich tashkilotlar hamda ularning yoshlar
                yetakchilari ro‘yxati tayyorlangach shu sahifada e’lon qilinadi.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
