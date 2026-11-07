import type { ReactNode } from 'react'

import { TeamNamuna } from './AltHkJamoa'

/**
 * «Toşkent şahar hududiy Kengaşi» sahifasi — yöl va Kengaş jamoasi
 * (mazmun: components/hududiy/data.ts).
 */
export function HududiyPage({ crumbs }: { crumbs: ReactNode }) {
  return (
    <div className="it hk">
      <div id="jamoa" className="hk-jamoa">
        <div className="wrap">
          <div className="hk-crumbs">{crumbs}</div>
        </div>
        <TeamNamuna />
      </div>
    </div>
  )
}
