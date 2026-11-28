/**
 * Admin foydalanuvçisi parolini terminaldan yangilaydi (parol unutilganda yoki serverga köçirilgandan keyin).
 *   pnpm parol                     — yagona admin hisobi uçun
 *   pnpm parol -- xodim@yoshlar.uz — körsatilgan hisob uçun
 * Parol ekranda körinmaydi va heç qayerga yozilmaydi; ikki marta kiritiladi.
 */
import config from '@payload-config'
import { getPayload } from 'payload'
import readline from 'node:readline'

/** Terminaldan yaşirin satr öqiydi (kiritilgan belgilar ekranga çiqmaydi) */
function yashirin(sorov: string): Promise<string> {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true })
    const r = rl as unknown as { _writeToOutput: (s: string) => void; output: NodeJS.WriteStream }
    let boshlandi = false
    r._writeToOutput = (s: string) => {
      if (!boshlandi) r.output.write(s)
    }
    rl.question(sorov, (javob) => {
      rl.close()
      process.stdout.write('\n')
      resolve(javob)
    })
    boshlandi = true
  })
}

const payload = await getPayload({ config })
const email = process.argv.slice(2).find((a) => a.includes('@'))

const topildi = await payload.find({
  collection: 'users',
  where: email ? { email: { equals: email.toLowerCase() } } : { role: { equals: 'admin' } },
  limit: 2,
  overrideAccess: true,
})

if (topildi.totalDocs === 0) {
  console.error(email ? `Hisob topilmadi: ${email}` : 'Admin hisobi topilmadi')
  process.exit(1)
}
if (!email && topildi.totalDocs > 1) {
  console.error('Bir nechta admin bor — elektron pochtani ko‘rsating: pnpm parol -- xodim@yoshlar.uz')
  process.exit(1)
}

const user = topildi.docs[0]
console.log(`Hisob: ${user.email} (${user.role})`)

const p1 = await yashirin('Yangi parol (kamida 10 belgi): ')
if (p1.length < 10) {
  console.error('Parol juda qisqa — kamida 10 belgi bo‘lsin')
  process.exit(1)
}
const p2 = await yashirin('Yana bir bor: ')
if (p1 !== p2) {
  console.error('Parollar mos kelmadi')
  process.exit(1)
}

await payload.update({
  collection: 'users',
  id: user.id,
  data: { password: p1, loginAttempts: 0, lockUntil: null } as never,
  overrideAccess: true,
})
console.log('Parol yangilandi. Endi /admin sahifasidan shu parol bilan kirish mumkin.')
process.exit(0)
