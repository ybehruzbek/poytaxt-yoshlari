/**
 * Server işga tuşganda: “Poytaxt yoşlari” Telegram kanali bilan avtomatik ulaniş.
 * Production'da sukut böyiça yoqiq (har 15 daqiqada); TG_SYNC_MINUTES=0 — öçiriş.
 * Ishlab chiqişda faqat TG_SYNC=1 bölsa işlaydi.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return
  if (process.env.NODE_ENV !== 'production' && process.env.TG_SYNC !== '1') return
  const minutes = Number(process.env.TG_SYNC_MINUTES ?? 15)
  if (!minutes || minutes < 1) return
  const { startTgSync } = await import('./lib/tg/auto')
  startTgSync(minutes)
}
