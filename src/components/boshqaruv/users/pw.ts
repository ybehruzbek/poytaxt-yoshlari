/** Taşkilot xodimiga beriladigan vaqtinçalik parol: 14 belgi, adaşadigan belgilarsiz (0/O, 1/l/I) */
export function makePassword(n = 14) {
  const abc = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789'
  const a = new Uint32Array(n)
  crypto.getRandomValues(a)
  let s = Array.from(a, (x) => abc[x % abc.length]).join('')
  if (!/\d/.test(s)) s = `${s.slice(0, -1)}7`
  return s
}
