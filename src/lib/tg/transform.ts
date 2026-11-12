/**
 * Telegram posti → sayt yangiligi: matn tozalanadi (emoji, kanal imzosi, heşteglar), yangi alifboga ögiriladi,
 * sarlavha, lid va xatboşilarga ajratiladi; heşteglar — teglarga, mazmuniga qarab turkum aniqlanadi.
 */
import { toYangiAlifbo } from '@/lib/alifbo'

import type { TgPost } from './channel'

export type Block = { p: string } | { h2: string } | { ul: string[] }
export type NewsCategory = 'kengash' | 'boshlangich' | 'imkoniyat' | 'tadbir'
export type NewsKind = 'yangilik' | 'elon' | 'tadbir' | 'tabrik' | 'skip'
export type Draft = {
  kind?: NewsKind
  eventDate?: string
  eventPlace?: string
  title: string
  excerpt: string
  blocks: Block[]
  tags: string[]
  category: NewsCategory
  caption?: string
  /** videoli post bölsa ham saytga olinsin (muqova surati bilan) — faqat qölda tasdiqlangan maqolalar uçun */
  video?: boolean
}

/** Kanal imzosi, obuna çaqiriqlari va texnik qatorlar */
const FOOTER = [
  /kuzati(sh|ş)(da)?\s*davom/i,
  /bizning sahifalarimiz/i,
  /ijtimoiy tarmoqlar(imiz)?ni kuzatib/i,
  /^(telegram|instagram|facebook|you\s?tube|youtube|x\.com)(\s*[|,]\s*(telegram|instagram|facebook|you\s?tube|youtube|x\.com))*$/i,
  /^@poytaxtyoshlari_yi$/i,
  /pinned a (photo|video|message)/i,
  /^bo(sh|ş)qa yangiliklar/i,
  /^(1|2|3)\s*(telegram|instagram|facebook)/i,
  /^kanalga obuna/i,
  /^temirov\.uz$/i,
]

/** Teg bölmaydigan umumiy heşteglar */
const SKIP_TAGS = new Set(
  ['poytaxt_yoshlari', 'poyaxt_yoshlari', 'poytaxtyoshlari', 'yoshlarittifoqi', 'yoshlar_ittifoqi', 'elon', 'foydali', 'tabrik', 'poytaxt'].map(
    (s) => s.toLowerCase(),
  ),
)

const EMOJI = /[\p{Extended_Pictographic}\u{FE0F}\u{FE0E}\u{20E3}\u{200D}\u{1F1E6}-\u{1F1FF}\u{1F3FB}-\u{1F3FF}\u{2B1B}\u{2B1C}\u{25AA}-\u{25FE}\u{23FA}]/gu
const startsWithMark = (l: string) => /^[\p{Extended_Pictographic}\u{2022}\-–—▪•►✔✅☑]/u.test(l)

/** Heşteg → teg: TDIU_yoshlari → “TDIU yoşlari”, AjdodlarIzidan → “Ajdodlar izidan” */
function tagFrom(h: string): string | null {
  const raw = h.replace(/^#/, '')
  if (SKIP_TAGS.has(raw.toLowerCase()) || raw.length < 3) return null
  const spaced = raw
    .replace(/_/g, ' ')
    .replace(/(\p{Ll})(\p{Lu})/gu, '$1 $2')
    .trim()
  const words = spaced.split(/\s+/)
  const t = words.map((w, i) => (i === 0 || /^\p{Lu}{2,}$/u.test(w) ? w : w.toLowerCase())).join(' ')
  return toYangiAlifbo(t.charAt(0).toUpperCase() + t.slice(1))
}

const clip = (s: string, n: number) => {
  if (s.length <= n) return s
  const cut = s.slice(0, n)
  return cut.slice(0, cut.lastIndexOf(' ') > n * 0.6 ? cut.lastIndexOf(' ') : n).replace(/[,;:\s–-]+$/, '') + '…'
}

/** Matnni gaplarga ajratiş (qisqartmalarni buzmasdan oddiy usulda) */
const sentences = (s: string) => s.match(/[^.!?…]+(?:[.!?…]+|$)/g)?.map((x) => x.trim()).filter(Boolean) ?? [s]

const fix = (s: string) =>
  toYangiAlifbo(
    s
      .replace(EMOJI, ' ')
      .replace(/"([^"\n]{1,200})"/g, '“$1”')
      .replace(/[ \t]{2,}/g, ' ')
      .replace(/\s+([,.!?;:])/g, '$1')
      .trim(),
  )

function category(text: string, tags: string[]): NewsCategory {
  const t = (text + ' ' + tags.join(' ')).toLowerCase()
  if (/(ariza(lar)? (qabul|topşir)|röyxatdan öt|qabul qilinadi|grant|stipendiya|bepul kurs|vakansiya|iştirok etiş uçun|ştirok etiş istagi|muddati|havola orqali)/.test(t))
    return 'imkoniyat'
  if (/(boşlanğiç taşkilot|universitet|instituti|akademiyasi|yoşlari\b|\bott\b|talabalar)/.test(t)) return 'boshlangich'
  if (/(festival|musobaqa|konsert|sayohat|turnir|zakovat|viktorina|kvest|forum|marafon|bellaşuv)/.test(t)) return 'tadbir'
  return 'kengash'
}

const MONTHS = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr']
const EVENT_WORDS = /(simpozium|forum|uçraşuv|festival|konsert|tadbir|seminar|trening|kvest|marafon|kecha|keça|şou|ko'rgazma|körgazma|ekskursiya|sayohat|bayram|turnir|musobaqa|kubogi)/
const FUTURE = /(bölib ötadi|ötkaziladi|ötadi\b|taşrif buyurmoqda|taklif etamiz|taklif qilamiz|kutamiz|kutib qolamiz|iştirok eting|qatnaşing|kelasiz|boşlanadi|kutyapmiz)/
const CALL = /(tanlov(i|iga|ga)? (start|eʼlon qilin|boşlan)|tanlov(da|ga)? (iştirok|qatnaş)|tanlov talablari|röyxatdan öt|ariza(lar)? (qabul|topşir|yubor)|qabul qilinadi|sinov testlari?|testlar(ni)? taqdim|bepul kurs|kursiga röyxat|grant(ga|iga)? (ariza|tanlov)|grant tanlovi|stipendiya(ga|siga)? (ariza|tanlov)|vakansiya|çellenj(ga|da)? (qatnaş|qöşiling))/

/**
 * Post turi: kelgusi tadbir (aniq sana posted sanasidan keyin, tadbir sözi va kelasi zamon), eʼlon (tanlov,
 * röyxatdan ötiş, ariza, kurs, test) yoki oddiy yangilik. Tadbir uçun sana va joy ham aniqlanadi.
 */
export function classify(text: string, postDate: string, cat: NewsCategory): Pick<Draft, 'kind' | 'eventDate' | 'eventPlace'> {
  const t = text.toLocaleLowerCase('uz')
  const DATE = `(\\d{1,2})(?:\\s*[–-]\\s*\\d{1,2})?\\s*-?\\s*(${MONTHS.join('|')})`
  // “Sana: 15-noyabr” qatori bölsa — şu, aks holda matndagi birinçi sana
  const m = t.match(new RegExp(`sana:?\\s*${DATE}`)) ?? t.match(new RegExp(DATE))
  if (m && postDate && EVENT_WORDS.test(t) && FUTURE.test(t)) {
    const posted = new Date(postDate)
    const mon = MONTHS.indexOf(m[2])
    let year = posted.getUTCFullYear()
    if (mon < posted.getUTCMonth() - 1) year++
    const time = t.match(/soat:?\s*(\d{1,2})[:.](\d{2})/) ?? t.match(/\b(\d{1,2}):(\d{2})\b/)
    const hh = time ? Number(time[1]) : 10
    const mm = time ? Number(time[2]) : 0
    // Toşkent vaqti (UTC+5)
    const when = new Date(Date.UTC(year, mon, Number(m[1]), hh - 5, mm))
    if (when.getTime() >= posted.getTime() - 86400000) {
      const labeled = text.match(/manzil:?[ \t]*([^\n!?]{3,120})/i)?.[1]?.replace(/\.$/, '')
      const found = text.match(/([\p{Lu}“][^.!?\n:]{2,80}?(?:saroyi|markazi|universiteti|instituti|akademiyasi|zali|oromgohi|parki|muzeyi|teatri|kutubxonasi|majmuasi|arenasi)(?:da|ida|dagi)?)/u)?.[1]
      const place = (labeled ?? found)
        ?.replace(/\s*\(https?:[^)]*\)/g, '')
        .replace(/^toşkent şahridagi,?\s*/i, '')
        .replace(/(i)(?:da|dagi)$/, '$1')
        .replace(/(?:da|dagi)$/, '')
        .trim()
      return { kind: 'tadbir', eventDate: when.toISOString(), eventPlace: place }
    }
  }
  void cat
  if (CALL.test(t)) return { kind: 'elon' }
  return { kind: 'yangilik' }
}

/** Postni yangilik qoralamasiga aylantiradi; mazmuni yetarli bölmasa — null */
export function postToDraft(post: TgPost): Draft | null {
  const tags: string[] = []
  for (const h of post.text.match(/#[\p{L}\p{N}_]+/gu) ?? []) {
    const t = tagFrom(h)
    if (t && !tags.some((x) => x.toLowerCase() === t.toLowerCase())) tags.push(t)
  }

  // qatorlar: kanal imzosi va heşteg qatorlari olib taşlanadi
  const lines = post.text
    .replace(/#[\p{L}\p{N}_]+/gu, '')
    .split('\n')
    .map((l) => ({ raw: l.trim(), mark: startsWithMark(l.trim()) }))
    .map((l) => ({ ...l, txt: fix(l.raw) }))
    .filter((l) => !FOOTER.some((re) => re.test(l.txt) || re.test(l.raw.replace(EMOJI, '').trim())))

  // xatboşilar: böş qator bilan ajratilgan guruhlar
  const groups: Array<typeof lines> = [[]]
  for (const l of lines) {
    if (!l.txt) {
      if (groups[groups.length - 1].length) groups.push([])
    } else groups[groups.length - 1].push(l)
  }
  const paras = groups.filter((g) => g.length)
  const plain = paras.map((g) => g.map((l) => l.txt).join(' ')).join(' ')
  if (plain.replace(/\s/g, '').length < 40) return null

  // sarlavha: birinçi gap (juda qisqa bölsa — keyingisi bilan)
  const firstPara = paras[0].map((l) => l.txt).join(' ')
  const ss = sentences(firstPara)
  let title = ss[0] ?? firstPara
  let used = 1
  if (title.length < 25 && ss[1]) {
    title = `${title} ${ss[1]}`
    used = 2
  }
  const noUrl = (x: string) => x.replace(/\s*\(https?:[^)]*\)?/g, '').replace(/https?:\/\/\S+/g, '').trim()
  title = clip(noUrl(title).replace(/[.:;,]+$/, '').replace(/^[!?.\s]+/, ''), 140)
  const restFirst = ss.slice(used).join(' ').trim()

  // matn bloklari
  const blocks: Block[] = []
  if (restFirst) blocks.push({ p: restFirst })
  for (const g of paras.slice(1)) {
    const items = g.map((l) => l.txt).filter(Boolean)
    // bir nechta qisqa, belgi bilan boşlanğan qatorlar — röyxat
    if (items.length >= 2 && g.every((l) => l.mark) && items.every((x) => x.length < 220)) {
      blocks.push({ ul: items.map((x) => x.replace(/^[-–—•▪]\s*/, '')) })
    } else blocks.push({ p: items.join(' ') })
  }

  // lid: birinçi xatboşi (qisqa bölsa matndan olinadi, takrorlanmasin)
  let excerpt = title
  const first = blocks[0]
  if (first && 'p' in first) {
    if (first.p.length <= 300 && !/https?:/.test(first.p)) {
      excerpt = first.p
      blocks.shift()
    } else excerpt = clip(first.p.replace(/\s*\(https?:[^)]*\)?/g, ''), 280)
  }

  const cat = category(plain, tags)
  if (!excerpt.trim()) excerpt = title
  return { title, excerpt, blocks, tags: tags.slice(0, 6), category: cat, ...classify(lines.map((l) => l.txt).join('\n'), post.date, cat) }
}

/** Lexical (Payload richText) JSON */
export function blocksToLexical(blocks: Block[]) {
  const base = { format: '' as const, indent: 0, version: 1, direction: 'ltr' as const }
  const text = (t: string) => ({ type: 'text', text: t, format: 0, style: '', mode: 'normal' as const, detail: 0, version: 1 })
  return {
    root: {
      type: 'root',
      ...base,
      children: blocks.map((b) =>
        'h2' in b
          ? { type: 'heading', tag: 'h2', ...base, children: [text(b.h2)] }
          : 'ul' in b
            ? {
                type: 'list',
                listType: 'bullet',
                start: 1,
                tag: 'ul',
                ...base,
                children: b.ul.map((t, i) => ({ type: 'listitem', value: i + 1, ...base, children: [text(t)] })),
              }
            : { type: 'paragraph', ...base, textFormat: 0, textStyle: '', children: [text(b.p)] },
      ),
    },
  }
}
