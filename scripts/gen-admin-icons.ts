/**
 * src/admin/icons.ts dagi ikonkalardan admin uslublarini yasaydi: yon menyudagi havolalar (#nav-…,
 * #nav-global-…) va boş sahifa kartalari (#card-…) uçun CSS mask. Işga tuşiriş: pnpm tsx scripts/gen-admin-icons.ts
 */
import fs from 'fs'
import path from 'path'

import { ADMIN_ICONS } from '../src/admin/icons'

const svg = (inner: string, color = 'black') =>
  `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`,
  )}")`

let css = '/* AVTOMATIK YASALGAN: scripts/gen-admin-icons.ts — qölda tahrirlamang */\n'
for (const [k, inner] of Object.entries(ADMIN_ICONS)) {
  // --adm-ic — mask uçun (rang currentColor'dan), --adm-img — saytning jigarrang rangidagi tayyor rasm
  css += `#nav-${k},#nav-global-${k},#card-${k},#card-global-${k}{--adm-ic:${svg(inner)};--adm-img:${svg(inner, '#532822')}}\n`
}
const out = path.resolve('src/app/(payload)/admin-icons.scss')
fs.writeFileSync(out, css)
console.log('ikonkalar:', Object.keys(ADMIN_ICONS).length, '→', out)
