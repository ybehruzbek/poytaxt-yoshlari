/* eslint-disable @next/next/no-img-element -- kanal suratlari; CMS ulanganda next/image ga o'tadi */
/**
 * “Faoliyat yönalişlari” röyxati — “Vitrina”: çapda 11 ta rasmiy nom, öngda tanlangan yönaliş:
 * sarlavha, suratlar mozaikasi, yaxlit rasmiy matn (loyihalar matn içida), tadbir/loyiha soni.
 */
import Link from 'next/link'

import { DirsShowcase } from './DirsClient'
import { DirText } from './FaViews'
import { More } from '@/components/site/MoreBtn'
import { dirProjects, type Faoliyat } from '@/lib/cms/faoliyat'

const pad = (i: number) => String(i + 1).padStart(2, '0')

/** Har yönaliş uçun: suratlar (loyiha muqovalari, keyin tadbir suratlari), sonlar */
function dirsData(f: Faoliyat, nPics: number) {
  return f.directions.map((d, i) => {
    const evs = f.events.filter((e) => e.dir === d.slug)
    const projs = dirProjects(f, d.slug)
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

/** Umumiy sonlar: 11 yönaliş · N tadbir · N loyiha */
function Sum({ all }: { all: ReturnType<typeof dirsData> }) {
  return (
    <div className="vy-sum">
      <span>
        <b>{all.length}</b> yo‘nalish
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

type P = { f: Faoliyat; base: string; projBase: string }

/* Çapda 11 ta rasmiy nom, öngda tanlangan yönalişning paneli: katta surat, ikki kiçik surat, matn.
 * Barça panellar serverda çiziladi (qidiruv tizimlari uçun), körinmaydiganlari `hidden`.
 */
export function DirsShow({ f, base, projBase }: P) {
  const all = dirsData(f, 3)
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
                <DirText f={f} slug={d.slug} projBase={projBase} className="vy-prose" lead />
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
