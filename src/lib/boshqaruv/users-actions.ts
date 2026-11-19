'use server'

import { revalidatePath } from 'next/cache'

import { getPayloadClient, getUser } from './auth'
import { isId, str } from './guard'
import type { Role } from './menu'

type R = { ok: boolean; message: string; id?: number }
const ROLES: Role[] = ['admin', 'muharrir', 'operator']
const MIN_PW = 10

const pwProblem = (pw: string) =>
  pw.length < MIN_PW ? `Parol kamida ${MIN_PW} belgi bölsin.` : !/[A-Za-zА-Яа-я]/.test(pw) || !/\d/.test(pw) ? 'Parolda harf ham, raqam ham bölsin.' : null

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
  if (!user) return { ok: false, message: 'Faqat administrator foydalanuvçi qöşa oladi.' }
  const name = d.name.trim()
  const email = d.email.trim().toLowerCase()
  if (!name) return { ok: false, message: 'Ism-familiyani yozing.' }
  if (!/^\S+@\S+\.\S+$/.test(email)) return { ok: false, message: 'Elektron poçta notöğri.' }
  if (!ROLES.includes(d.role as Role)) return { ok: false, message: 'Rolni tanlang.' }
  const p = pwProblem(d.password)
  if (p) return { ok: false, message: p }
  const payload = await getPayloadClient()
  try {
    const doc = await payload.create({ collection: 'users', data: { name, email, role: d.role as Role, password: d.password }, user, overrideAccess: false })
    refresh()
    return { ok: true, message: 'Foydalanuvçi qöşildi', id: doc.id }
  } catch (e) {
    const m = e instanceof Error ? e.message : ''
    return { ok: false, message: /unique|already|registered/i.test(m) ? 'Bu elektron poçta bilan hisob allaqaçon bor.' : 'Qöşib bölmadi.' }
  }
}

export async function updateUser(id: number, d: { name: string; role: string }): Promise<R> {
  if (!isId(id)) return { ok: false, message: 'Notöğri söröv.' }
  const user = await admin()
  if (!user) return { ok: false, message: 'Bu amal uçun ruxsat yöq.' }
  if (!ROLES.includes(d?.role as Role) || !str(d?.name).trim()) return { ok: false, message: 'Ism va rolni tekşiring.' }
  if (d.role !== 'admin' && (await adminsLeft(id)) === 0) return { ok: false, message: 'Bu yagona administrator — rolini özgartirib bölmaydi.' }
  const payload = await getPayloadClient()
  try {
    await payload.update({ collection: 'users', id, data: { name: d.name.trim(), role: d.role as Role }, user, overrideAccess: false })
    refresh()
    return { ok: true, message: 'Saqlandi' }
  } catch {
    return { ok: false, message: 'Saqlab bölmadi.' }
  }
}

/** Administrator xodimga yangi parol beradi (xodim parolini unutganda) va bloklangan bölsa oçadi */
export async function setUserPassword(id: number, password: string): Promise<R> {
  if (!isId(id)) return { ok: false, message: 'Notöğri söröv.' }
  const user = await admin()
  if (!user) return { ok: false, message: 'Bu amal uçun ruxsat yöq.' }
  const p = pwProblem(str(password, 200))
  if (p) return { ok: false, message: p }
  const payload = await getPayloadClient()
  try {
    await payload.update({ collection: 'users', id, data: { password, loginAttempts: 0, lockUntil: null } as never, user, overrideAccess: false })
    refresh()
    return { ok: true, message: 'Yangi parol örnatildi' }
  } catch {
    return { ok: false, message: 'Parolni özgartirib bölmadi.' }
  }
}

export async function unlockUser(id: number): Promise<R> {
  if (!isId(id)) return { ok: false, message: 'Notöğri söröv.' }
  const user = await admin()
  if (!user) return { ok: false, message: 'Bu amal uçun ruxsat yöq.' }
  const payload = await getPayloadClient()
  try {
    await payload.update({ collection: 'users', id, data: { loginAttempts: 0, lockUntil: null } as never, overrideAccess: true })
    refresh()
    return { ok: true, message: 'Hisob bloklanişdan çiqarildi' }
  } catch {
    return { ok: false, message: 'Bajarib bölmadi.' }
  }
}

export async function deleteUser(id: number): Promise<R> {
  if (!isId(id)) return { ok: false, message: 'Notöğri söröv.' }
  const user = await admin()
  if (!user) return { ok: false, message: 'Bu amal uçun ruxsat yöq.' }
  if (id === user.id) return { ok: false, message: 'Öz hisobingizni öçirib bölmaydi.' }
  if ((await adminsLeft(id)) === 0) return { ok: false, message: 'Yagona administratorni öçirib bölmaydi.' }
  const payload = await getPayloadClient()
  try {
    await payload.delete({ collection: 'users', id, user, overrideAccess: false })
    refresh()
    return { ok: true, message: 'Öçirildi' }
  } catch {
    return { ok: false, message: 'Öçirib bölmadi.' }
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
    return { ok: false, message: 'Saqlab bölmadi.' }
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
    return { ok: false, message: /lock/i.test(m) ? 'Hisob köp marta notöğri parol kiritilgani uçun vaqtinça bloklandi.' : 'Joriy parol notöğri.' }
  }
  try {
    const me = (await payload.findByID({ collection: 'users', id: user.id, depth: 0, overrideAccess: true })) as unknown as { sessions?: { id: string }[] }
    const sessions = (me.sessions ?? []).filter((s) => s.id !== sid)
    await payload.update({ collection: 'users', id: user.id, data: { password: next, sessions } as never, overrideAccess: true })
    return { ok: true, message: 'Parol almaştirildi' }
  } catch {
    return { ok: false, message: 'Parolni almaştirib bölmadi.' }
  }
}
