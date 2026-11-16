/* eslint-disable @next/next/no-img-element -- taqdimotdan olingan logotiplar */
import type { Company } from './data'

export const KINDS: Company['kind'][] = ['Media', 'Naşriyot', 'Xizmat']
export const KIND_COLOR: Record<Company['kind'], string> = {
  Media: 'var(--blue)',
  Naşriyot: 'var(--green)',
  Xizmat: 'var(--yellow)',
}

export function CoLogo({ c, className }: { c: Company; className: string }) {
  return (
    <span className={className}>
      <img src={c.logo} alt={`${c.t} logotipi`} loading="lazy" />
    </span>
  )
}


