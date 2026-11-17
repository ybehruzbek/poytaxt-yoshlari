/**
 * Server amalini (server action) xavfsiz çaqiriş: aloqa uzilsa, sayt qayta joylanayotgan bölsa yoki
 * javob kelmasa — xato sahifani buzmaydi, foydalanuvçiga xabar qaytadi, forma maʼlumotlari saqlanib qoladi.
 */
export const NET_ERR = 'Aloqa uzildi. Kiritilgan maʼlumotlar saqlangan, iltimos, qayta yuboring.'

export async function safeCall<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn()
  } catch (err) {
    console.error('[server amali]', err instanceof Error ? err.message : err)
    return fallback
  }
}
