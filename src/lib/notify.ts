import type { CollectionAfterChangeHook } from 'payload'

/**
 * Saytga yangi murojaat kelganda Kengaş xodimlariga elektron poçta orqali xabar beriş.
 * Qabul qiluvçi manzil(lar) — NOTIFY_EMAIL (vergul bilan bir neçta). Böş bölsa xabar yuborilmaydi.
 * Xatda arizaçining telefoni va poçtasi yozilmaydi: xodim töliq maʼlumotni admin paneldan köradi.
 */
const SITE = (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000').replace(/\/$/, '')

const esc = (s: string) =>
  s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c] as string)

type Line = [string, string | undefined | null]

/** Xatdagi havola yangi boşqaruv panelidagi xabarga oçiladi */
const PANEL: Record<string, string> = { appeals: 'murojaatlar', memberships: 'azolik', volunteers: 'volontyorlik', 'text-errors': 'matn-xatolari' }

export function notifyOnCreate(opts: {
  subject: (doc: Record<string, unknown>) => string
  lines: (doc: Record<string, unknown>) => Line[]
}): CollectionAfterChangeHook {
  return async ({ doc, operation, collection, req }) => {
    const to = process.env.NOTIFY_EMAIL?.trim()
    if (operation !== 'create' || !to) return doc
    const link = `${SITE}${PANEL[collection.slug] ? `/boshqaruv/kiruvchi/${PANEL[collection.slug]}?id=${doc.id}` : `/admin/collections/${collection.slug}/${doc.id}`}`
    const rows = opts.lines(doc).filter(([, v]) => v)
    const html = [
      '<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5;color:#1d2433">',
      `<p>${esc(opts.subject(doc))}.</p>`,
      '<table style="border-collapse:collapse">',
      ...rows.map(
        ([k, v]) =>
          `<tr><td style="padding:4px 16px 4px 0;color:#667085">${esc(k)}</td><td style="padding:4px 0">${esc(String(v))}</td></tr>`,
      ),
      '</table>',
      `<p><a href="${link}">Boşqaruv panelida oçiş</a></p>`,
      '<p style="color:#667085;font-size:13px">Bu xat saytdan avtomatik yuborildi.</p>',
      '</div>',
    ].join('')
    const text = [`${opts.subject(doc)}.`, ...rows.map(([k, v]) => `${k}: ${v}`), `Boşqaruv panelida oçiş: ${link}`].join('\n')
    // Xat yuborilmasa ham ariza saqlangan bölsin: xato faqat logga yoziladi
    req.payload
      .sendEmail({ to, subject: opts.subject(doc), html, text })
      .catch((err: unknown) => req.payload.logger.error({ err }, `[xabarnoma] ${collection.slug} #${doc.id} xati yuborilmadi`))
    return doc
  }
}
