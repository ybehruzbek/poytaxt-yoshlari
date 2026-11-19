/** Server action argumentlari brauzerdan keladi — TS turiga işonib bölmaydi */
export const isId = (x: unknown): x is number => typeof x === 'number' && Number.isInteger(x) && x > 0 && x < 2 ** 31
export const ids = (x: unknown): number[] => (Array.isArray(x) ? x.filter(isId).slice(0, 200) : [])
export const str = (x: unknown, max = 10000) => (typeof x === 'string' ? x.slice(0, max) : '')
