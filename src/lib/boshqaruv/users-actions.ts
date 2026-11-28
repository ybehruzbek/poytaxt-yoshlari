'use server'

import { revalidatePath } from 'next/cache'

import { getPayloadClient, getUser } from './auth'
import { isId, str } from './guard'
import type { Role } from './menu'

type R = { ok: boolean; message: string; id?: number }
const ROLES: Role[] = ['admin', 'muharrir', 'operator']
const MIN_PW = 10

const pwProblem = (pw: string) =>
  pw.length < MIN_PW ? `Parol kamida ${MIN_PW} belgi bo‘lsin.` : !/[A-Za-zА-Яа-я]/.test(pw) || !/\d/.test(pw) ? 'Parolda harf ham, raqam ham bo‘lsin.' : null

async function admin() {
  const u = await getUser()
  return u?.role === 'admin' ? u : null
}

const refresh = () => revalidatePath('/boshqaruv/foydalanuvchilar', 'layout')

/** Kamida bitta administrator qolişi kerak — aks holda panelni boşqaradigan odam qolmaydi */
async function adminsLeft(exceptId: number) {
  const payload = await getPayloadClient()
  const r = await payload.count({ collection: 'users', where: { and: [{ role: { equals: 'admin' } }, { id: { not_equals: exceptId } }] }, overrideAccess: true })
  return r.totalDocs
}

export async function createUser(dIn: { name: string; email: string; role: string; password: string }): Promise<R> {
  const d = { name: str(dIn?.name, 200), email: str(dIn?.email, 200), role: str(dIn?.role, 20), password: str(dIn?.password, 200) }
  const user = await admin()
  if (!user) return { ok: false, message: 'Faqat administrator foydalanuvchi qo‘sha oladi.' }
  const name = d.name.trim()
  const email = d.email.trim().toLowerCase()
  if (!name) return { ok: false, message: 'Ism-familiyani yozing.' }
  if (!/^\S+@\S+\.\S+$/.test(email)) return { ok: false, message: 'Elektron pochta noto‘g‘ri.' }
  if (!ROLES.includes(d.role as Role)) return { ok: false, message: 'Rolni tanlang.' }
  const p = pwProblem(d.password)
  if (p) return { ok: false, message: p }
  const payload = await getPayloadClient()
  try {
    const doc = await payload.create({ collection: 'users', data: { name, email, role: d.role as Role, password: d.password }, user, overrideAccess: false })
    refresh()
    return { ok: true, message: 'Foydalanuvchi qo‘shildi', id: doc.id }
  } catch (e) {
    const m = e instanceof Error ? e.message : ''
    return { ok: false, message: /unique|already|registered/i.test(m) ? 'Bu elektron pochta bilan hisob allaqachon bor.' : 'Qo‘shib bo‘lmadi.' }
  }
}

export async function updateUser(id: number, d: { name: string; role: string }): Promise<R> {
  if (!isId(id)) return { ok: false, message: 'Noto‘g‘ri so‘ro‘v.' }
  const user = await admin()
  if (!user) return { ok: false, message: 'Bu amal uchun ruxsat yo‘q.' }
  if (!ROLES.includes(d?.role as Role) || !str(d?.name).trim()) return { ok: false, message: 'Ism va rolni tekshiring.' }
  if (d.role !== 'admin' && (await adminsLeft(id)) === 0) return { ok: false, message: 'Bu yagona administrator — rolini o‘zgartirib bo‘lmaydi.' }
  const payload = await getPayloadClient()
  try {
    await payload.update({ collection: 'users', id, data: { name: d.name.trim(), role: d.role as Role }, user, overrideAccess: false })
    refresh()
    return { ok: true, message: 'Saqlandi' }
  } catch {
    return { ok: false, message: 'Saqlab bo‘lmadi.' }
  }
}

/** Administrator xodimga yangi parol beradi (xodim parolini unutganda) va bloklangan bölsa oçadi */
export async function setUserPassword(id: number, password: string): Promise<R> {
  if (!isId(id)) return { ok: false, message: 'Noto‘g‘ri so‘ro‘v.' }
  const user = await admin()
  if (!user) return { ok: false, message: 'Bu amal uchun ruxsat yo‘q.' }
  const p = pwProblem(str(password, 200))
  if (p) return { ok: false, message: p }
  const payload = await getPayloadClient()
  try {
    await payload.update({ collection: 'users', id, data: { password, loginAttempts: 0, lockUntil: null } as never, user, overrideAccess: false })
    refresh()
    return { ok: true, message: 'Yangi parol o‘rnatildi' }
  } catch {
    return { ok: false, message: 'Parolni o‘zgartirib bo‘lmadi.' }
  }
}

export async function unlockUser(id: number): Promise<R> {
  if (!isId(id)) return { ok: false, message: 'Noto‘g‘ri so‘ro‘v.' }
  const user = await admin()
  if (!user) return { ok: false, message: 'Bu amal uchun ruxsat yo‘q.' }
  const payload = await getPayloadClient()
  try {
    await payload.update({ collection: 'users', id, data: { loginAttempts: 0, lockUntil: null } as never, overrideAccess: true })
    refresh()
    return { ok: true, message: 'Hisob bloklanishdan chiqarildi' }
  } catch {
    return { ok: false, message: 'Bajarib bo‘lmadi.' }
  }
}

export async function deleteUser(id: number): Promise<R> {
  if (!isId(id)) return { ok: false, message: 'Noto‘g‘ri so‘ro‘v.' }
  const user = await admin()
  if (!user) return { ok: false, message: 'Bu amal uchun ruxsat yo‘q.' }
  if (id === user.id) return { ok: false, message: 'O‘z hisobingizni o‘chirib bo‘lmaydi.' }
  if ((await adminsLeft(id)) === 0) return { ok: false, message: 'Yagona administratorni o‘chirib bo‘lmaydi.' }
  const payload = await getPayloadClient()
  try {
    await payload.delete({ collection: 'users', id, user, overrideAccess: false })
    refresh()
    return { ok: true, message: 'O‘chirildi' }
  } catch {
    return { ok: false, message: 'O‘chirib bo‘lmadi.' }
  }
}

/* ---------- Hisobim: har bir xodim öz maʼlumotini özgartiradi ---------- */

export async function updateMyName(nameIn: string): Promise<R> {
  const name = str(nameIn, 200)
  const user = await getUser()
  if (!user) return { ok: false, message: 'Qayta kiring.' }
  if (!name.trim()) return { ok: false, message: 'Ism-familiyani yozing.' }
  const payload = await getPayloadClient()
  try {
    await payload.update({ collection: 'users', id: user.id, data: { name: name.trim() }, user, overrideAccess: false })
    revalidatePath('/boshqaruv', 'layout')
    return { ok: true, message: 'Saqlandi' }
  } catch {
    return { ok: false, message: 'Saqlab bo‘lmadi.' }
  }
}

/**
 * Parolni almaştiriş: joriy parol Payload'ning öz kiriş tekşiruvi bilan tasdiqlanadi (notöğri urinişlar hisoblanadi,
 * 5 tadan keyin hisob bloklanadi). Tekşiruv uçun oçilgan qöşimça sessiya darhol öçiriladi.
 */
export async function changeMyPassword(curIn: string, nextIn: string): Promise<R> {
  const current = str(curIn, 200)
  const next = str(nextIn, 200)
  const user = await getUser()
  if (!user) return { ok: false, message: 'Qayta kiring.' }
  const p = pwProblem(next)
  if (p) return { ok: false, message: p }
  if (current === next) return { ok: false, message: 'Yangi parol eskisidan farq qilsin.' }
  const payload = await getPayloadClient()
  let sid: string | undefined
  try {
    const r = await payload.login({ collection: 'users', data: { email: user.email, password: current } })
    sid = r.token ? (JSON.parse(Buffer.from(r.token.split('.')[1], 'base64url').toString()) as { sid?: string }).sid : undefined
  } catch (e) {
    const m = e instanceof Error ? e.message : ''
    return { ok: false, message: /lock/i.test(m) ? 'Hisob ko‘p marta noto‘g‘ri parol kiritilgani uchun vaqtincha bloklandi.' : 'Joriy parol noto‘g‘ri.' }
  }
  try {
    const me = (await payload.findByID({ collection: 'users', id: user.id, depth: 0, overrideAccess: true })) as unknown as { sessions?: { id: string }[] }
    const sessions = (me.sessions ?? []).filter((s) => s.id !== sid)
    await payload.update({ collection: 'users', id: user.id, data: { password: next, sessions } as never, overrideAccess: true })
    return { ok: true, message: 'Parol almashtirildi' }
  } catch {
    return { ok: false, message: 'Parolni almashtirib bo‘lmadi.' }
  }
}
