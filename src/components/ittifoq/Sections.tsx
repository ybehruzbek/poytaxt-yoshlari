/* eslint-disable @next/next/no-img-element -- taqdimotdan olingan suratlar; CMS ulanganda next/image ga o'tadi */
import type { Award } from '@/components/mukofotlar/data'
import { getAwards } from '@/lib/cms/imkoniyatlar'
import { getMiqdorlar } from '@/lib/cms/miqdorlar'
import { More } from '@/components/site/MoreBtn'
import { type Miqdorlar, rateSum, som } from '@/lib/miqdorlar'

import { AWARDEES } from './data'
import type { IttifoqData } from '@/lib/cms/sahifalar'
import { FlagsMarquee } from './FlagsMarquee'

/* ======================= Mukofot va imtiyozlar ======================= */

/** Davlat mukofotlari bilan taqdirlanganlar kollaji: markazda umumiy surat, atrofida mukofot topşiriş lahzalari */
function Awardees() {
  return (
    <figure className="pv-col">
      <div className="pv-col-grid">
        <img
          src={AWARDEES.center}
          alt="“Yangi O‘zbekistonni yoshlar quradi”: davlat mukofotlari bilan taqdirlangan yoshlar Prezident bilan"
          className="center"
          loading="lazy"
          decoding="async"
        />
        {AWARDEES.around.map((src) => (
          <img key={src} src={src} alt="" loading="lazy" />
        ))}
      </div>
      <figcaption>
        “Mard o‘g‘lon” davlat mukofoti va “Kelajak bunyodkori” medali bilan taqdirlangan yoshlar ·
        Surat: O‘zbekiston Respublikasi Prezidentining matbuot xizmati
      </figcaption>
    </figure>
  )
}

const GROUPS = [
  { key: 'ittifoq' as const, t: 'Ittifoq beradigan imtiyozlar' },
  { key: 'davlat' as const, t: 'Ittifoq taklifi bilan ta’sis etilgan davlat mukofotlari' },
]

/**
 * “Mukofot va imtiyozlar”: ikki guruh — Ittifoq beradigan imtiyozlar va Ittifoq taklifi bilan taʼsis etilgan davlat mukofotlari.
 * Har bir karta: surat (davlat mukofotlarida — mukofotning rasmiy tasviri) va asosiy raqam, nom, matn, izoh.
 * Davlat mukofotlari ostida taqdirlangan yoşlar kollaji.
 */
export async function PrivilegesB({ awardsHref, locale = 'uz', D }: { awardsHref: string; locale?: string; D: IttifoqData }) {
  const { PRIVILEGES } = D
  const [awards, M] = await Promise.all([getAwards(locale), getMiqdorlar(locale)])
  const by = (g: 'ittifoq' | 'davlat') => PRIVILEGES.filter((p) => p.group === g)
  return (
    <div className="pv-c">
      {GROUPS.map((g) => (
        <div key={g.key}>
          <h3 className="ip-grp">{g.t}</h3>
          {g.key === 'davlat' ? (
            <StateAwards items={by('davlat')} awardsHref={awardsHref} awards={awards} M={M} />
          ) : (
            <ul>
              {by(g.key).map((p) => (
                <li key={p.t} className={p.badge ? 'badge' : undefined}>
                  <div className="pv-c-ph">
                    <img src={p.img} alt="" loading="lazy" decoding="async" />
                    <span>{p.num}</span>
                  </div>
                  <div className="pv-c-bd">
                    <h4>{p.t}</h4>
                    <p>{p.text}</p>
                    <small>{p.fact}</small>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {g.key === 'davlat' && <Awardees />}
        </div>
      ))}
    </div>
  )
}

/** Mukofotlar sahifasiga havolali panel: mukofotlar röyxati va pul mukofotlari */
function AwardsPanel({ awardsHref, awards: AWARDS, M }: { awardsHref: string; awards: Award[]; M: Miqdorlar }) {
  return (
    <div className="sa-panel">
      <h4>Yoshlar uchun davlat mukofotlari</h4>
      <p>
        Yoshlarga beriladigan davlat mukofotlarining nizomlari, nomzodlarga qo‘yiladigan talablar,
        saralash bosqichlari va muddatlari alohida sahifada keltirilgan.
      </p>
      <ul>
        {AWARDS.map((a) => (
          <li key={a.id}>
            <span>
              {a.t}
              <small>{a.short}</small>
            </span>
            <b>{som(rateSum(a.prize, M))}</b>
          </li>
        ))}
      </ul>
      <a className="more-btn" href={awardsHref}>
        <More />
      </a>
    </div>
  )
}

/**
 * Ittifoq taklifi bilan taʼsis etilgan davlat mukofotlari — töq vitrina: çapda medallar asl ölçamida (1567×2000)
 * va qisqa izoh, öngda mukofotlar sahifasiga havolali panel.
 */
function StateAwards({ items, awardsHref, awards, M }: { items: IttifoqData['PRIVILEGES']; awardsHref: string; awards: Award[]; M: Miqdorlar }) {
  return (
    <div className="sa">
      <div className="sa-c">
        <div className="sa-c-medals">
          {items.map((p) => (
            <figure key={p.t}>
              <img src={p.medal} alt={`${p.t} tasviri`} loading="lazy" decoding="async" />
              <figcaption>
                <h4>{p.t}</h4>
                <p>{p.text}</p>
              </figcaption>
            </figure>
          ))}
        </div>
        <AwardsPanel awardsHref={awardsHref} awards={awards} M={M} />
      </div>
    </div>
  )
}

/* ======================= Xalqaro hamkorlik ======================= */

/** B — çapda matn va raqamlar, öngda oq kartada hamkorlar; pastda bayroqlar lentasi */
export function IntlB({ D }: { D: IttifoqData }) {
  const { INTL } = D
  return (
    <div className="ix-b">
      <div className="ix-b-top">
        <div>
          <h2 className="h2">Xalqaro hamkorlik</h2>
          <p>{INTL.text}</p>
          <ul>
            {INTL.forms.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <div className="ix-b-n">
            {INTL.facts.map((f) => (
              <div key={f.l}>
                <b>{f.v}</b>
                <span>{f.l}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="ix-b-card">
          <span>Hamkor tashkilotlar</span>
          <img src={INTL.partners} alt="Hamkor xalqaro tashkilotlar logotiplari" loading="lazy" decoding="async" />
          <p>{INTL.assoc}</p>
        </div>
      </div>
      <FlagsMarquee />
    </div>
  )
}
