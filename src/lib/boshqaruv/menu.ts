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

const c = (slug: string) => `/admin/collections/${slug}`
const g = (slug: string) => `/admin/globals/${slug}`
const old = (t: string, href: string): MenuLink => ({ t, href, eski: true })

export const MENU: MenuGroup[] = [
  { items: [{ t: 'Boşqaruv paneli', href: '/boshqaruv', icon: 'home' }] },
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
          old('Yönalişlar', c('directions')),
          old('Loyihalar', c('projects')),
          old('Tadbirlar', c('events')),
          old('Grantlar', c('grants')),
          old('Stipendiyalar', c('stipends')),
          old('Tanlovlar', c('contests')),
          old('Imtiyozlar', c('benefits')),
          old('Davlat mukofotlari', c('awards')),
          old('Volontyorlik yönalişlari', c('vol-directions')),
        ],
      },
      {
        t: 'Axborot xizmati',
        icon: 'image',
        sub: [
          old('Fotoalbomlar', c('albums')),
          old('Videolar', c('videos')),
          old('Press-relizlar', c('press')),
          old('OAVda Kengaş haqida', c('oav')),
        ],
      },
      {
        t: 'Biz haqimizda',
        icon: 'users',
        sub: [
          old('OTT boşlanğiç taşkilotlari', c('otts')),
          old('Kengaş bölimlari', c('departments')),
          old('Kengaş xodimlari', c('staff')),
          old('Hamkorlar', c('partners')),
        ],
      },
      {
        t: 'Hujjatlar',
        icon: 'file',
        sub: [
          old('Normativ hujjatlar', c('acts')),
          old('Hujjatlar guruhlari', c('act-groups')),
          old('Kengaş hujjatlari', c('kengash-docs')),
          old('Hujjat namunalari', c('templates')),
        ],
      },
      { t: 'Savol va javoblar', href: c('faqs'), eski: true, icon: 'help' },
      { t: 'Mualliflar', href: c('authors'), eski: true, icon: 'pen' },
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
          old('Boş sahifa', g('bosh-sahifa')),
          old('Ittifoq haqida', g('ittifoq-sahifa')),
          old('Markaziy Kengaş', g('markaziy-kengash')),
          old('Aʼzo böliş', g('azolik-sahifa')),
          old('Volontyorlik', g('volontyorlik-sahifa')),
          old('Natijalar va hisobotlar', g('natijalar')),
        ],
      },
      {
        t: 'Sayt sozlamalari',
        icon: 'settings',
        sub: [
          old('Aloqa maʼlumotlari', g('aloqa')),
          old('Ijtimoiy tarmoqlar', g('socials')),
          old('Miqdorlar (BHM, stipendiya)', g('miqdorlar')),
        ],
      },
    ],
  },
  {
    t: 'Tizim',
    items: [
      { t: 'Rasmlar', href: c('media'), eski: true, icon: 'folder', roles: KONTENT },
      { t: 'Fayllar', href: c('files'), eski: true, icon: 'file', roles: KONTENT },
      { t: 'Foydalanuvçilar', href: c('users'), eski: true, icon: 'shield', roles: ['admin'] },
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
  { t: 'Boş sahifa matnlari', href: g('bosh-sahifa'), eski: true, color: 'yellow', roles: KONTENT },
  { t: 'Tadbirlar', href: c('events'), eski: true, color: 'green', roles: KONTENT },
  { t: 'Aloqa maʼlumotlari', href: g('aloqa'), eski: true, color: 'blue', roles: KONTENT },
  { t: 'Murojaatlar', href: '/boshqaruv/kiruvchi/murojaatlar', color: 'orange', roles: ['operator'] },
]
export const pinnedFor = (role: Role) => PINNED.filter((p) => ok(p.roles, role))
