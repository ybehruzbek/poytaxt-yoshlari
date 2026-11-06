/* eslint-disable @next/next/no-img-element -- president.uz suratlari; CMS ulanganda next/image ga o'tadi */
import { IMG, QUOTE } from './data'

const CREDIT = 'Surat: Özbekiston Respublikasi Prezidentining matbuot xizmati'

/** D — keng surat, ustida pastki öngda oq iqtibos kartasi */
export function QuoteD() {
  return (
    <section className="sec">
      <div className="wrap">
        <figure className="iq-d">
          <img src={IMG.presYouth1} alt="Prezident Şavkat Mirziyoyev yoşlar bilan uçraşuvda" />
          <blockquote>
            <p>«{QUOTE.text}»</p>
            <footer>
              <b>{QUOTE.author}</b>
              <span>{QUOTE.role}</span>
            </footer>
          </blockquote>
          <figcaption>{CREDIT}</figcaption>
        </figure>
      </div>
    </section>
  )
}

/** E — töq bölim: çapda iqtibos, öngda surat (Prezident surat öng tomonida) */
export function QuoteE() {
  return (
    <section className="sec iq-e-sec">
      <div className="wrap iq-e">
        <blockquote>
          <span className="iq-e-mark" aria-hidden="true">
            «
          </span>
          <p>{QUOTE.text}</p>
          <footer>
            <b>{QUOTE.author}</b>
            <span>{QUOTE.role}</span>
          </footer>
        </blockquote>
        <figure>
          <img src={IMG.presYouth2} alt="Prezident Şavkat Mirziyoyev talabalar bilan suhbatlaşmoqda" />
          <figcaption>{CREDIT}</figcaption>
        </figure>
      </div>
    </section>
  )
}
