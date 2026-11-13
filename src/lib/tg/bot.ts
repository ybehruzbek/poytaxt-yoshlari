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

async function call<T>(method: string, body: Record<string, unknown>): Promise<T> {
  const res = await fetch(`https://api.telegram.org/bot${TOKEN()}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    cache: 'no-store',
    signal: AbortSignal.timeout(30_000),
  })
  const json = (await res.json()) as { ok: boolean; result?: T; description?: string; parameters?: { retry_after?: number } }
  if (!json.ok && json.parameters?.retry_after) {
    await new Promise((r) => setTimeout(r, (json.parameters!.retry_after! + 1) * 1000))
    return call(method, body)
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
  if (!f.file_path || (f.file_size ?? 0) > MAX_BYTES) return null
  const res = await fetch(`https://api.telegram.org/file/bot${TOKEN()}/${f.file_path}`, {
    cache: 'no-store',
    signal: AbortSignal.timeout(60_000),
  })
  if (!res.ok) return null
  const buf = Buffer.from(await res.arrayBuffer())
  return buf.length <= MAX_BYTES ? buf : null
}

/** Bitta xabardagi suratning asl nusxasi (xabarda surat bölmasa — null) */
export async function fullPhoto(messageId: number): Promise<Buffer | null> {
  if (!botEnabled()) return null
  const m = await peek(messageId)
  if (!m?.photo?.length) return null
  const best = [...m.photo].sort((a, b) => b.width * b.height - a.width * a.height)[0]
  return download(best.file_id)
}

/**
 * Post suratlarining asl nusxalari, albomdagi tartibda. Kanal sahifasida albom post ID si birinçi
 * suratning xabari, qolganlari ketma-ket ID larda turadi (…/7027?single, …/7028?single).
 * Birorta surat olinmasa null — import kanal sahifasidagi nusxalardan foydalanadi.
 */
export async function fullPhotos(postId: number, count: number): Promise<Buffer[] | null> {
  if (!botEnabled() || count < 1) return null
  try {
    const out: Buffer[] = []
    for (let k = 0; k < count; k++) {
      const buf = await fullPhoto(postId + k)
      if (!buf) return null
      out.push(buf)
    }
    return out
  } catch (err) {
    console.warn(`[tg-bot] #${postId} asl suratlari olinmadi:`, (err as Error).message)
    return null
  }
}
