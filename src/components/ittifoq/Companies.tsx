import { CoLogo } from './CompaniesParts'
import type { IttifoqData } from '@/lib/cms/sahifalar'
import { ShowMore } from './ShowMore'

const TITLE = 'Media, naşriyot va xizmat taşkilotlari'
const LEAD =
  'Ittifoq uluşi bölgan taşkilotlar yoşlar uçun teleradio, matbuot, naşriyot, turizm va dam oliş xizmatlarini taqdim etadi.'
const KIND_TITLE = {
  Media: 'Teleradio va media',
  Naşriyot: 'Matbuot va naşriyot',
  Xizmat: 'Turizm va xizmatlar',
} as const

/** “Media, naşriyot va xizmat taşkilotlari”: çapda yirik logotip, öngda nomi, yönalişi, faoliyat turi va Ittifoq uluşi */
export function CompaniesA({ D }: { D: IttifoqData }) {
  const { COMPANIES } = D
  return (
    <section className="sec">
      <div className="wrap">
        <div className="co-head">
          <h2 className="h2">{TITLE}</h2>
          <p>{LEAD}</p>
        </div>
        <ul className="cm3-b" id="media-royxat">
          {COMPANIES.map((c) => (
            <li key={c.t}>
              <CoLogo c={c} className="cm3-logo cm3-logo-xl" />
              <div className="cm3-b-bd">
                <h3>{c.t}</h3>
                <small>{KIND_TITLE[c.kind]}</small>
                <p>{c.d}</p>
                <b>Ittifoq uluşi: {c.share}</b>
              </div>
            </li>
          ))}
        </ul>
        <ShowMore target="media-royxat" noun="taşkilot" />
      </div>
    </section>
  )
}
