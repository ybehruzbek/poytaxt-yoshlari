/* eslint-disable @next/next/no-img-element -- kanal suratlari; CMS ulanganda next/image ga o'tadi */
/**
 * “Faoliyat yönalişlari” röyxati — VAQTINCHA uç dizayn varianti (tanlangaç bittasi qoladi):
 *  A — Qatorlar: raqamli qatorlar, bosilganda suratlar va matn oçiladi (bir vaqtda bittasi).
 *  B — Vitrina: çapda nomlar röyxati, öngda tanlangan yönalişning katta paneli.
 *  C — Tasmalar: har yönaliş — keng surat tasmasi, ustida nomi va maqsadi, ostida matn.
 * Mazmun bir xil: rasmiy nom, yaxlit rasmiy matn (loyihalar matn içida), suratlar, tadbir/loyiha soni.
 */
import Link from 'next/link'

import { DIRECTIONS, dirProjects } from './data'
import { DirsShowcase } from './DirsClient'
import { EVENTS } from './events'
import { DirText } from './FaViews'
import { More } from '@/components/site/MoreBtn'

const pad = (i: number) => String(i + 1).padStart(2, '0')

/** Har yönaliş uçun: suratlar (loyiha muqovalari, keyin tadbir suratlari), sonlar, maqsad jumlasi */
function dirsData(nPics: number) {
  return DIRECTIONS.map((d, i) => {
    const evs = EVENTS.filter((e) => e.dir === d.slug)
    const projs = dirProjects(d.slug)
    const pics = [...projs.map((p) => p.cover), ...evs.map((e) => e.img), ...projs.flatMap((p) => p.gallery)]
      .filter(Boolean)
      .filter((x, k, arr) => arr.indexOf(x) === k)
      .slice(0, nPics)
    const cut = d.about.indexOf(' Xususan, ')
    const aim = cut > 0 ? d.about.slice(0, cut) : d.about
    return { d, n: pad(i), nE: evs.length, nP: projs.length, pics, aim }
  })
}

/** “6 tadbir · 2 loyiha” — nol sonlar yozilmaydi */
function Counts({ nE, nP }: { nE: number; nP: number }) {
  return (
    <span className="vy-counts">
      {nE > 0 && (
        <>
          <b>{nE}</b> tadbir
        </>
      )}
      {nE > 0 && nP > 0 && ' · '}
      {nP > 0 && (
        <>
          <b>{nP}</b> loyiha
        </>
      )}
    </span>
  )
}

/** Umumiy sonlar: 11 yönaliş · N tadbir · N loyiha */
function Sum({ all }: { all: ReturnType<typeof dirsData> }) {
  return (
    <div className="vy-sum">
      <span>
        <b>{all.length}</b> yönaliş
      </span>
      <span>
        <b>{all.reduce((a, x) => a + x.nE, 0)}</b> tadbir
      </span>
      <span>
        <b>{all.reduce((a, x) => a + x.nP, 0)}</b> loyiha
      </span>
    </div>
  )
}

/** Suratlar: bitta katta, ostida ikkita */
function Pics({ pics, className }: { pics: string[]; className: string }) {
  return (
    <div className={className} aria-hidden="true">
      {pics.map((src) => (
        <img key={src} src={src} alt="" loading="lazy" />
      ))}
    </div>
  )
}

type P = { base: string; projBase: string }

/* ============ A — Qatorlar ============
 * Markaziy Kengaş “Boşqaruv tizimi” uslubida raqamli qatorlar. <details name> — JS'siz, bir vaqtda
 * bitta qator oçiq; birinçisi oçiq turadi. Oçiq qator sariq tasmada, ostida suratlar va matn.
 */
export function DirsRows({ base, projBase }: P) {
  const all = dirsData(3)
  return (
    <section className="sec fa-sec">
      <div className="wrap">
        <Sum all={all} />
        <div className="vyr">
          {all.map(({ d, n, nE, nP, pics }, i) => (
            <details key={d.slug} id={d.slug} className="vyr-it" name="yonalish" open={i === 0}>
              <summary>
                <span className="vyr-n">{n}</span>
                <h2>{d.title}</h2>
                <Counts nE={nE} nP={nP} />
                <span className="vyr-ic" aria-hidden="true" />
              </summary>
              <div className="vyr-bd">
                <Pics pics={pics} className="vyr-ph" />
                <div className="vyr-txt">
                  <DirText slug={d.slug} projBase={projBase} className="vy-prose" lead />
                  <Link href={`${base}/${d.slug}`} className="more-btn">
                    <More />
                  </Link>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============ B — Vitrina ============
 * Çapda 11 ta rasmiy nom, öngda tanlangan yönalişning paneli: katta surat, ikki kiçik surat, matn.
 * Barça panellar serverda çiziladi (qidiruv tizimlari uçun), körinmaydiganlari `hidden`.
 */
export function DirsShow({ base, projBase }: P) {
  const all = dirsData(3)
  return (
    <section className="sec fa-sec">
      <div className="wrap">
        <Sum all={all} />
        <DirsShowcase
          items={all.map(({ d, n }) => ({ slug: d.slug, n, title: d.title, short: d.short }))}
          panels={all.map(({ d, n, nE, nP, pics }) => (
            <article key={d.slug} className="vys-panel">
              <Pics pics={pics} className="vys-ph" />
              <div className="vys-bd">
                <span className="vys-n">{n}</span>
                <h2>
                  <Link href={`${base}/${d.slug}`}>{d.title}</Link>
                </h2>
                <DirText slug={d.slug} projBase={projBase} className="vy-prose" lead />
                <div className="vys-foot">
                  <Counts nE={nE} nP={nP} />
                  <Link href={`${base}/${d.slug}`} className="more-btn">
                    <More />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        />
      </div>
    </section>
  )
}

/* ============ C — Tasmalar ============
 * Har yönaliş — keng surat tasmasi: ustida raqam, rasmiy nom va maqsad jumlasi; ostida
 * qolgan matn (tadbirlar va loyihalar) va ikki qöşimça surat.
 */
export function DirsBands({ base, projBase }: P) {
  const all = dirsData(3)
  return (
    <section className="sec fa-sec">
      <div className="wrap">
        <Sum all={all} />
        <div className="vyt">
          {all.map(({ d, n, nE, nP, pics, aim }) => (
            <article key={d.slug} id={d.slug} className="vyt-it">
              <Link href={`${base}/${d.slug}`} className="vyt-hero">
                {pics[0] && <img src={pics[0]} alt="" loading="lazy" />}
                <span className="vyt-cap">
                  <span className="vyt-n">{n}</span>
                  <h2>{d.title}</h2>
                  <span className="vyt-aim">{aim}</span>
                </span>
              </Link>
              <div className="vyt-bd">
                <div>
                  <DirText slug={d.slug} projBase={projBase} className="vy-prose vyt-rest" rest />
                  <div className="vyt-foot">
                    <Counts nE={nE} nP={nP} />
                    <Link href={`${base}/${d.slug}`} className="more-btn">
                      <More />
                    </Link>
                  </div>
                </div>
                {pics.length > 1 && <Pics pics={pics.slice(1)} className="vyt-ph" />}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
