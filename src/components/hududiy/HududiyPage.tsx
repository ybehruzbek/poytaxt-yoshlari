import type { ReactNode } from 'react'

import { DevSectionsPanel } from '@/components/site/DevSectionsPanel'

import { TeamNamuna } from './AltHkJamoa'
import { TeamOld } from './OldTeam'

/**
 * “Toşkent şahar hududiy Kengaşi” sahifasi — yöl va Kengaş jamoasi
 * (mazmun: components/hududiy/data.ts).
 */
export function HududiyPage({ crumbs }: { crumbs: ReactNode }) {
  return (
    <div className="it hk">
      <div id="jamoa" className="hk-jamoa pg-head">
        <div className="wrap">{crumbs}</div>
        <div className="vx" data-v="hk-a">
          <TeamNamuna />
        </div>
        <div className="vx" data-v="hk-b">
          <TeamOld />
        </div>
        {(['c', 'd', 'e', 'f'] as const).map((k) => (
          <div key={k} className="vx" data-v={`hk-${k}`}>
            <TeamNamuna card={k} ids={`v${k}`} />
          </div>
        ))}
      </div>
      {/* VAQTINÇA: yangi va oldingi körinişni solişiriş (panel faqat işlab çiqiş rejimida) */}
      <DevSectionsPanel
        sections={[
          {
            name: 'hk',
            label: 'Kengaş jamoasi',
            count: 6,
            hints: ['Yangi', 'Oldingi', 'Portret', 'Maʼlumotnoma', 'Töq karta', 'Bölimlar böyiça'],
          },
        ]}
      />
    </div>
  )
}
