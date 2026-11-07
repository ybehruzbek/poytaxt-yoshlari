/* eslint-disable @next/next/no-img-element -- Kengaş axborot xizmati suratlari; CMS ulanganda next/image ga o'tadi */
import Link from 'next/link'
import type { ReactNode } from 'react'

import { DevSectionsPanel, type PanelSection } from '@/components/site/DevSectionsPanel'
import { Arrow } from '@/components/site/SocialPhones'

import { TeamIxcham, TeamNamuna, TeamRangli } from './AltHkJamoa'
import { IMG, INTRO } from './data'

type P = { L: (h: string) => string; crumbs: ReactNode; siblings: ReactNode }

/** VAQTINCHA: «Jamoa» variantlari faqat işlab çiqiş rejimida  */
const DEV = process.env.NODE_ENV !== 'production'
const PANEL: PanelSection[] = [{ name: 'hjm', label: 'Jamoa', count: 3 }]
const TEAMS = { a: TeamNamuna, b: TeamRangli, c: TeamIxcham }

/**
 * «Toşkent şahar hududiy Kengaşi» sahifasi (mazmun: components/hududiy/data.ts):
 * hero va Kengaş jamoasi.
 */
export function HududiyPage({ L, crumbs, siblings }: P) {
  return (
    <div className="it hk">
      <section className="it-hero" data-head-dark>
        <img src={IMG.hero} alt="" />
        <div className="wrap">
          <div className="it-crumbs">{crumbs}</div>
          <h1 className="h1">Toşkent şahar hududiy Kengaşi</h1>
          <p className="lead">{INTRO}</p>
          <div className="it-btns">
            <Link href={L('/boglanish/murojaat')} className="btn btn-primary">
              Murojaat yuboriş{' '}
              <span className="ic">
                <Arrow />
              </span>
            </Link>
            <a href="#jamoa" className="btn btn-ghost">
              Kengaş jamoasi
            </a>
          </div>
        </div>
      </section>

      <div id="jamoa" className="hk-jamoa">
        {DEV ? (
          Object.entries(TEAMS).map(([k, Team]) => (
            <div key={k} className="vx" data-v={`hjm-${k}`}>
              <Team />
            </div>
          ))
        ) : (
          <TeamNamuna />
        )}
      </div>

      <section className="sec">
        <div className="wrap">{siblings}</div>
      </section>
      {DEV && <DevSectionsPanel sections={PANEL} />}
    </div>
  )
}
