/* eslint-disable @next/next/no-img-element -- kanal suratlari; CMS ulanganda next/image ga o'tadi */
/**
 * VAQTINCHA: “Faoliyat yönalişlari” röyxatining B va C dizayn variantlari (A — FaViews.tsx dagi DirsList).
 * Mazmun bir xil: rasmiy nom, yaxlit rasmiy matn (loyihalar matn içida), suratlar, tadbir/loyiha soni.
 */
import Link from 'next/link'

import { DIRECTIONS, dirProjects } from './data'
import { DirsToc } from './DirsClient'
import { EVENTS } from './events'
import { DirText } from './FaViews'
import { More } from '@/components/site/MoreBtn'

const pad = (i: number) => String(i + 1).padStart(2, '0')

/** Har yönaliş uçun: suratlar (loyiha muqovalari, keyin tadbir suratlari), sonlar */
function dirsData(nPics: number) {
  return DIRECTIONS.map((d, i) => {
    const evs = EVENTS.filter((e) => e.dir === d.slug)
    const projs = dirProjects(d.slug)
    const pics = [...projs.map((p) => p.cover), ...evs.map((e) => e.img), ...projs.flatMap((p) => p.gallery)]
      .filter(Boolean)
      .filter((x, k, arr) => arr.indexOf(x) === k)
      .slice(0, nPics)
    return { d, n: pad(i), nE: evs.length, nP: projs.length, pics }
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

/* ============ B — Mundarija va bölimlar ============
 * Çapda yopişqoq mundarija (11 ta rasmiy nom, ekrandagisi belgilanadi), öngda har yönaliş —
 * keng surat tasmasi, sarlavha va rasmiy matn. Rasmiy hujjat / hisobotga xos tartib: köz bilan izlaş oson.
 */
export function DirsB({ base, projBase }: { base: string; projBase: string }) {
  const all = dirsData(3)
  return (
    <section className="sec fa-sec">
      <div className="wrap vyb">
        <aside className="vyb-side">
          <DirsToc items={all.map(({ d, n }) => ({ slug: d.slug, n, title: d.title }))} />
        </aside>
        <div className="vyb-main">
          {all.map(({ d, n, nE, nP, pics }) => (
            <article key={d.slug} id={d.slug} className="vyb-sec">
              <header className="vyb-head">
                <span className="vyb-n">{n}</span>
                <h2>
                  <Link href={`${base}/${d.slug}`}>{d.title}</Link>
                </h2>
              </header>
              {pics.length > 0 && (
                <div className={`vyb-ph n${pics.length}`} aria-hidden="true">
                  {pics.map((src) => (
                    <img key={src} src={src} alt="" loading="lazy" />
                  ))}
                </div>
              )}
              <DirText slug={d.slug} projBase={projBase} className="vyb-txt" />
              <div className="vyb-foot">
                <Counts nE={nE} nP={nP} />
                <Link href={`${base}/${d.slug}`} className="more-btn">
                  <More />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============ C — Jurnal kartalari ============
 * Ikki ustunli kartalar: tepada bitta katta surat (raqam ustida), ostida sarlavha, rasmiy matn va
 * pastga yopişgan sonlar/“Batafsil”. Birinçi yönaliş — keng karta (ikki ustun), ritm beradi.
 */
export function DirsC({ base, projBase }: { base: string; projBase: string }) {
  const all = dirsData(1)
  return (
    <section className="sec fa-sec">
      <div className="wrap">
        <div className="vyc">
          {all.map(({ d, n, nE, nP, pics }, i) => (
            <article key={d.slug} id={d.slug} className={`vyc-card${i === 0 ? ' wide' : ''}`}>
              <Link href={`${base}/${d.slug}`} className="vyc-ph" tabIndex={-1} aria-hidden="true">
                {pics[0] && <img src={pics[0]} alt="" loading="lazy" />}
                <span className="vyc-n">{n}</span>
              </Link>
              <div className="vyc-bd">
                <h2>
                  <Link href={`${base}/${d.slug}`}>{d.title}</Link>
                </h2>
                <DirText slug={d.slug} projBase={projBase} className="vyc-txt" />
                <div className="vyc-foot">
                  <Counts nE={nE} nP={nP} />
                  <Link href={`${base}/${d.slug}`} className="more-btn">
                    <More />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
