import type { ReactNode } from 'react'

import { DevSectionsPanel, type PanelSection } from '@/components/site/DevSectionsPanel'

import { TeamIxcham, TeamNamuna, TeamRangli } from './AltHkJamoa'

/** VAQTINCHA: «Jamoa» variantlari faqat işlab çiqiş rejimida */
const DEV = process.env.NODE_ENV !== 'production'
const PANEL: PanelSection[] = [{ name: 'hjm', label: 'Jamoa', count: 3 }]
const TEAMS = { a: TeamNamuna, b: TeamRangli, c: TeamIxcham }

/**
 * «Toşkent şahar hududiy Kengaşi» sahifasi — faqat Kengaş jamoasi
 * (mazmun: components/hududiy/data.ts).
 */
export function HududiyPage({ crumbs }: { crumbs: ReactNode }) {
  return (
    <div className="it hk">
      <div id="jamoa" className="hk-jamoa">
        <div className="wrap">
          <div className="hk-crumbs">{crumbs}</div>
        </div>
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
      {DEV && <DevSectionsPanel sections={PANEL} />}
    </div>
  )
}
