/**
 * Yangi boşqaruv paneli menyusi. Guruhlar xodimning işi böyiça: kiruvçi xabarlar, sayt kontenti, sahifa matnlari, tizim.
 * Yangi panelda hali qurilmagan bölimlar vaqtinça eski panelga (/admin) oçiladi — `eski: true`.
 * `roles` — bandni köradigan rollar; berilmasa, hamma körinadi.
 */
import type { IconName } from '@/components/boshqaruv/Icon'

/** Menyu yiğilgani cookie'da saqlanadi: server sahifani darhol şu holatda çizadi (oçilişda “sakraş” yöq) */
export const COLLAPSE_COOKIE = 'bq-collapsed'

export type Role = 'admin' | 'muharrir' | 'operator'
export type CountKey = 'appeals' | 'memberships' | 'volunteers' | 'text-errors'

export type MenuLink = { t: string; href: string; eski?: boolean }
export type MenuItem = MenuLink & { icon: IconName; roles?: Role[]; count?: CountKey; sub?: never }
export type MenuFolder = { t: string; icon: IconName; roles?: Role[]; sub: MenuLink[]; href?: never }
export type MenuGroup = { t?: string; roles?: Role[]; items: (MenuItem | MenuFolder)[] }

const KONTENT: Role[] = ['admin', 'muharrir']
const KIRUVCHI: Role[] = ['admin', 'operator']


export const MENU: MenuGroup[] = [
  {
    items: [
      { t: 'Boşqaruv paneli', href: '/boshqaruv', icon: 'home' },
      { t: 'Statistika', href: '/boshqaruv/statistika', icon: 'chart' },
    ],
  },
  {
    t: 'Kiruvçi xabarlar',
    roles: KIRUVCHI,
    items: [
      { t: 'Murojaatlar', href: '/boshqaruv/kiruvchi/murojaatlar', icon: 'inbox', count: 'appeals' },
      { t: 'Aʼzolik arizalari', href: '/boshqaruv/kiruvchi/azolik', icon: 'user-plus', count: 'memberships' },
      { t: 'Volontyorlik arizalari', href: '/boshqaruv/kiruvchi/volontyorlik', icon: 'heart', count: 'volunteers' },
      { t: 'Matn xatolari', href: '/boshqaruv/kiruvchi/matn-xatolari', icon: 'type', count: 'text-errors' },
    ],
  },
  {
    t: 'Sayt kontenti',
    roles: KONTENT,
    items: [
      { t: 'Yangiliklar', href: '/boshqaruv/yangiliklar', icon: 'news' },
      {
        t: 'Faoliyat',
        icon: 'flag',
        sub: [
          { t: 'Yönalişlar', href: '/boshqaruv/bolim/directions' },
          { t: 'Loyihalar', href: '/boshqaruv/bolim/projects' },
          { t: 'Tadbirlar', href: '/boshqaruv/bolim/events' },
          { t: 'Grantlar', href: '/boshqaruv/bolim/grants' },
          { t: 'Stipendiyalar', href: '/boshqaruv/bolim/stipends' },
          { t: 'Tanlovlar', href: '/boshqaruv/bolim/contests' },
          { t: 'Imtiyozlar', href: '/boshqaruv/bolim/benefits' },
          { t: 'Davlat mukofotlari', href: '/boshqaruv/bolim/awards' },
          { t: 'Volontyorlik yönalişlari', href: '/boshqaruv/bolim/vol-directions' },
        ],
      },
      {
        t: 'Axborot xizmati',
        icon: 'image',
        sub: [
          { t: 'Fotoalbomlar', href: '/boshqaruv/bolim/albums' },
          { t: 'Videolar', href: '/boshqaruv/bolim/videos' },
          { t: 'Press-relizlar', href: '/boshqaruv/bolim/press' },
          { t: 'OAVda Kengaş haqida', href: '/boshqaruv/bolim/oav' },
        ],
      },
      {
        t: 'Biz haqimizda',
        icon: 'users',
        sub: [
          { t: 'OTT boşlanğiç taşkilotlari', href: '/boshqaruv/bolim/otts' },
          { t: 'Kengaş bölimlari', href: '/boshqaruv/bolim/departments' },
          { t: 'Kengaş xodimlari', href: '/boshqaruv/bolim/staff' },
          { t: 'Hamkorlar', href: '/boshqaruv/bolim/partners' },
        ],
      },
      {
        t: 'Hujjatlar',
        icon: 'file',
        sub: [
          { t: 'Normativ hujjatlar', href: '/boshqaruv/bolim/acts' },
          { t: 'Hujjatlar guruhlari', href: '/boshqaruv/bolim/act-groups' },
          { t: 'Kengaş hujjatlari', href: '/boshqaruv/bolim/kengash-docs' },
          { t: 'Hujjat namunalari', href: '/boshqaruv/bolim/templates' },
        ],
      },
      { t: 'Savol va javoblar', href: '/boshqaruv/bolim/faqs', icon: 'help' },
      { t: 'Mualliflar', href: '/boshqaruv/bolim/authors', icon: 'pen' },
    ],
  },
  {
    t: 'Sahifa matnlari',
    roles: KONTENT,
    items: [
      {
        t: 'Sahifalar',
        icon: 'layout',
        sub: [
          { t: 'Boş sahifa', href: '/boshqaruv/sahifa/bosh-sahifa' },
          { t: 'Ittifoq haqida', href: '/boshqaruv/sahifa/ittifoq-sahifa' },
          { t: 'Markaziy Kengaş', href: '/boshqaruv/sahifa/markaziy-kengash' },
          { t: 'Aʼzo böliş', href: '/boshqaruv/sahifa/azolik-sahifa' },
          { t: 'Volontyorlik', href: '/boshqaruv/sahifa/volontyorlik-sahifa' },
          { t: 'Natijalar va hisobotlar', href: '/boshqaruv/sahifa/natijalar' },
        ],
      },
      {
        t: 'Sayt sozlamalari',
        icon: 'settings',
        sub: [
          { t: 'Aloqa maʼlumotlari', href: '/boshqaruv/sahifa/aloqa' },
          { t: 'Ijtimoiy tarmoqlar', href: '/boshqaruv/sahifa/socials' },
          { t: 'Miqdorlar (BHM, stipendiya)', href: '/boshqaruv/sahifa/miqdorlar' },
        ],
      },
    ],
  },
  {
    t: 'Tizim',
    items: [
      { t: 'Rasmlar', href: '/boshqaruv/kutubxona', icon: 'folder', roles: KONTENT },
      { t: 'Hujjat fayllari', href: '/boshqaruv/kutubxona?tur=fayl', icon: 'file', roles: KONTENT },
      { t: 'Foydalanuvçilar', href: '/boshqaruv/foydalanuvchilar', icon: 'shield', roles: ['admin'] },
    ],
  },
]

const ok = (roles: Role[] | undefined, role: Role) => !roles || roles.includes(role)

/** Foydalanuvçi roliga mos menyu: körinmaydigan band va böş guruhlar olib taşlanadi */
export function menuFor(role: Role): MenuGroup[] {
  return MENU.filter((grp) => ok(grp.roles, role))
    .map((grp) => ({ ...grp, items: grp.items.filter((it) => ok(it.roles, role)) }))
    .filter((grp) => grp.items.length > 0)
}

export const ROLE_LABEL: Record<Role, string> = {
  admin: 'Administrator',
  muharrir: 'Muharrir',
  operator: 'Operator',
}

/** Menyu ostidagi “Mahkamlangan” bandlar: eng köp oçiladigan sahifalar, rangli harf belgisi bilan */
export type Pinned = MenuLink & { color: 'yellow' | 'orange' | 'green' | 'pink' | 'blue'; roles?: Role[] }
export const PINNED: Pinned[] = [
  { t: 'Boş sahifa matnlari', href: '/boshqaruv/sahifa/bosh-sahifa', color: 'yellow', roles: KONTENT },
  { t: 'Tadbirlar', href: '/boshqaruv/bolim/events', color: 'green', roles: KONTENT },
  { t: 'Aloqa maʼlumotlari', href: '/boshqaruv/sahifa/aloqa', color: 'blue', roles: KONTENT },
  { t: 'Murojaatlar', href: '/boshqaruv/kiruvchi/murojaatlar', color: 'orange', roles: ['operator'] },
]
export const pinnedFor = (role: Role) => PINNED.filter((p) => ok(p.roles, role))

/** Manzil qaysi menyu guruhiga tegişli (yöl uçun): “Faoliyat”, “Sahifa matnlari”… */
export function groupOf(href: string): string | null {
  for (const g of MENU)
    for (const it of g.items) {
      if (it.sub?.some((x) => x.href === href)) return it.t
      if (it.href === href) return g.t ?? null
    }
  return null
}
