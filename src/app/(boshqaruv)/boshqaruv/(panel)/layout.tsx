import { cookies } from 'next/headers'

import { Shell } from '@/components/boshqaruv/Shell'
import { requireUser } from '@/lib/boshqaruv/auth'
import { getCounts } from '@/lib/boshqaruv/counts'
import { COLLAPSE_COOKIE, menuFor, pinnedFor, ROLE_LABEL } from '@/lib/boshqaruv/menu'

export const dynamic = 'force-dynamic'

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w.replace(/^[^\p{L}]+/u, '')[0] ?? '')
    .join('')
    .toLocaleUpperCase('uz')

/** Kirgan xodim uçun karkas: rolga mos menyu va javob kutayotgan xabarlar soni */
export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser()
  const [counts, jar] = await Promise.all([getCounts(user.role), cookies()])
  return (
    <Shell
      initialCollapsed={jar.get(COLLAPSE_COOKIE)?.value === '1'}
      menu={menuFor(user.role)}
      pinned={pinnedFor(user.role)}
      counts={counts}
      user={{ name: user.name, initials: initials(user.name), role: ROLE_LABEL[user.role] ?? user.role }}
    >
      {children}
    </Shell>
  )
}
