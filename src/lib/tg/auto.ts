/**
 * Avtomatik ulaniş: sayt serveri işlayotganda har N daqiqada “Poytaxt yoşlari” kanalining sönggi
 * postlarini tekşiradi va yangilarini saytga yangilik sifatida qöşadi (instrumentation.ts dan işga tuşadi).
 */
import { getPayload } from 'payload'

import config from '@/payload.config'

import { syncLatest } from './sync'

let running = false

export function startTgSync(minutes: number) {
  const tick = async () => {
    if (running) return
    running = true
    try {
      const payload = await getPayload({ config })
      const r = await syncLatest(payload)
      if (r.created) payload.logger.info(`[telegram] ${r.created} ta yangi post saytga qöşildi`)
    } catch (err) {
      console.error('[telegram] ulanişda xato:', (err as Error).message)
    } finally {
      running = false
    }
  }
  setTimeout(tick, 60_000) // server işga tuşgaç 1 daqiqadan keyin
  setInterval(tick, minutes * 60_000)
}
