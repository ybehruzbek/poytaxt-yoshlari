/**
 * Kanal suratlarining asl (töliq) nusxasini Telegram Bot API orqali oliş.
 * Kanalning ommaviy sahifasi (t.me/s/…) suratni köpi bilan 800 px qilib beradi; bot esa asl faylni ola oladi.
 *
 * Qanday işlaydi: bot kanal xabarini yopiq “ombor” çatiga forward qiladi,
 * javobdagi eng katta suratning file_id si orqali faylni yuklab oladi, söng forward qilingan xabarni öçiradi.
 *
 * Sozlamalar (.env):
 *   TG_BOT_TOKEN       — @BotFather bergan token; bot kanalga admin qilib qöşilgan bölişi kerak
 *   TG_BOT_STASH_CHAT  — bot admin bölgan yopiq kanal yoki guruh ID si (masalan, -1001234567890)
 * Ikkalasi bölmasa, funksiyalar null qaytaradi va import avvalgiday kanal sahifasidagi suratni oladi.
 */
import { CHANNEL } from './channel'

type PhotoSize = { file_id: string; width: number; height: number; file_size?: number }
type Msg = { message_id: number; media_group_id?: string; photo?: PhotoSize[] }

const TOKEN = () => process.env.TG_BOT_TOKEN?.trim()
const STASH = () => process.env.TG_BOT_STASH_CHAT?.trim()
const MAX_BYTES = 20 * 1024 * 1024 // Bot API getFile çegarasi

export const botEnabled = () => Boolean(TOKEN() && STASH())

async function call<T>(method: string, body: Record<string, unknown>, attempt = 0): Promise<T> {
  const res = await fetch(`https://api.telegram.org/bot${TOKEN()}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    cache: 'no-store',
    signal: AbortSignal.timeout(30_000),
  })
  const json = (await res.json()) as { ok: boolean; result?: T; description?: string; parameters?: { retry_after?: number } }
  // “juda köp söröv” javobida kutib qayta urinadi, lekin 3 martadan oşmaydi (sinxronizatsiya qulfi uzoq ilinib qolmasin)
  if (!json.ok && json.parameters?.retry_after && attempt < 3) {
    await new Promise((r) => setTimeout(r, Math.min(json.parameters!.retry_after! + 1, 60) * 1000))
    return call(method, body, attempt + 1)
  }
  if (!json.ok) throw new Error(`Telegram ${method}: ${json.description}`)
  return json.result as T
}

/** Bot sozlamalari toğriligini tekşiriş: bot nomi, kanal va ombor çati */
export async function botCheck() {
  const me = await call<{ username: string }>('getMe', {})
  const ch = await call<{ title: string }>('getChat', { chat_id: `@${CHANNEL}` })
  const st = await call<{ title?: string }>('getChat', { chat_id: STASH() })
  return { bot: me.username, channel: ch.title, stash: st.title ?? STASH() }
}

/** Bitta xabarni ombor çatiga forward qilib, undagi suratlarni oladi va forward qilinganini darhol öçiradi */
async function peek(messageId: number): Promise<Msg | null> {
  const m = await call<Msg>('forwardMessage', {
    chat_id: STASH(),
    from_chat_id: `@${CHANNEL}`,
    message_id: messageId,
    disable_notification: true,
  }).catch(() => null)
  if (m) await call('deleteMessage', { chat_id: STASH(), message_id: m.message_id }).catch(() => {})
  return m
}

async function download(fileId: string): Promise<Buffer | null> {
  const f = await call<{ file_path?: string; file_size?: number }>('getFile', { file_id: fileId })
  if (!f.file_path || !f.file_size || f.file_size > MAX_BYTES) return null
  const res = await fetch(`https://api.telegram.org/file/bot${TOKEN()}/${f.file_path}`, {
    cache: 'no-store',
    redirect: 'error',
    signal: AbortSignal.timeout(60_000),
  })
  if (!res.ok || !res.body) return null
  if (Number(res.headers.get('content-length') || 0) > MAX_BYTES) return null
  // hajm çegarasi bilan öqiş: çegaradan oşsa darhol toxtatiladi
  const chunks: Uint8Array[] = []
  let size = 0
  const reader = res.body.getReader()
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    size += value.byteLength
    if (size > MAX_BYTES) {
      await reader.cancel()
      return null
    }
    chunks.push(value)
  }
  return Buffer.concat(chunks)
}

export type FullPhoto = { buf: Buffer; width: number; height: number; group?: string }

/** Bitta xabardagi suratning asl nusxasi (xabarda surat bölmasa — null) */
export async function fullPhoto(messageId: number): Promise<FullPhoto | null> {
  if (!botEnabled()) return null
  const m = await peek(messageId)
  if (!m?.photo?.length) return null
  const best = [...m.photo].sort((a, b) => b.width * b.height - a.width * a.height)[0]
  const buf = await download(best.file_id)
  return buf ? { buf, width: best.width, height: best.height, group: m.media_group_id } : null
}

/** Ikki suratning tomonlar nisbati bir xilmi (asl nusxa va kanal sahifasidagi kiçraytirilgani) */
export const sameShape = (w1: number, h1: number, w2: number, h2: number) =>
  w1 > 0 && h1 > 0 && w2 > 0 && h2 > 0 && Math.abs(w1 / h1 - w2 / h2) < 0.03

/**
 * Post suratlarining asl nusxalari, albomdagi tartibda. Kanal sahifasida albom post ID si birinçi
 * suratning xabari, qolganlari ketma-ket ID larda turadi (…/7027?single, …/7028?single).
 * Birorta surat olinmasa null — import kanal sahifasidagi nusxalardan foydalanadi.
 */
export async function fullPhotos(postId: number, count: number): Promise<Buffer[] | null> {
  if (!botEnabled() || count < 1) return null
  try {
    const out: Buffer[] = []
    let group: string | undefined
    for (let k = 0; k < count; k++) {
      const p = await fullPhoto(postId + k)
      if (!p) return null
      // albomdagi barça suratlar bitta guruhdan bölişi şart — aks holda boşqa postning surati tuşib qoladi
      if (k === 0) group = p.group
      else if (!group || p.group !== group) return null
      out.push(p.buf)
    }
    return out
  } catch (err) {
    console.warn(`[tg-bot] #${postId} asl suratlari olinmadi:`, (err as Error).message)
    return null
  }
}
