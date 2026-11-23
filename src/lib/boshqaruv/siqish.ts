/**
 * Rasmni serverga yuborişdan oldin brauzerning özida siqadi: uzun tomoni 2000 px gaça, WebP (Safari eski
 * versiyalarida JPEG), hajmi 2 MB dan oşmaydi. Telefon surati (5–10 MB) 300–900 KB ga tuşadi — yuboriş va
 * serverdagi qayta işlaş bir necha barobar tezlaşadi. Brauzer öqiy olmagan format (masalan, HEIC) asl holda qoladi.
 */
export const RASM_MAX = 2 * 1024 * 1024

const SIDES = [2000, 1600, 1280]
const QUALITIES = [0.86, 0.78, 0.7]
/** shu hajmdan kiçik va 2000 px dan oşmagan rasm qayta kodlanmaydi (sifat yöqotilmasin) */
const LIGHT = 600 * 1024
const SKIP = new Set(['image/gif', 'image/svg+xml'])

function encode(c: HTMLCanvasElement, type: string, q: number) {
  return new Promise<Blob | null>((r) => c.toBlob(r, type, q))
}

export async function siqish(file: File): Promise<File> {
  if (!file.type.startsWith('image/') || SKIP.has(file.type)) return file
  let bmp: ImageBitmap
  try {
    bmp = await createImageBitmap(file)
  } catch {
    return file
  }
  try {
    const long = Math.max(bmp.width, bmp.height)
    if (long <= SIDES[0] && file.size <= LIGHT) return file
    let type = 'image/webp'
    for (const side of SIDES) {
      const k = Math.min(1, side / long)
      const c = document.createElement('canvas')
      c.width = Math.round(bmp.width * k)
      c.height = Math.round(bmp.height * k)
      const ctx = c.getContext('2d')
      if (!ctx) return file
      ctx.drawImage(bmp, 0, 0, c.width, c.height)
      for (const q of QUALITIES) {
        let blob = await encode(c, type, q)
        // WebP kodlaşni bilmaydigan brauzer PNG qaytaradi — JPEG ga ötiladi
        if (blob && blob.type !== type) {
          type = 'image/jpeg'
          blob = await encode(c, type, q)
        }
        if (!blob) return file
        if (blob.size <= RASM_MAX) {
          // siqilgani kattaroq çiqsa va asli talabga mos bölsa — asli qoladi
          if (blob.size >= file.size && file.size <= RASM_MAX && long <= SIDES[0]) return file
          const ext = type === 'image/webp' ? 'webp' : 'jpg'
          const name = file.name.replace(/\.[a-z0-9]+$/i, '') + '.' + ext
          return new File([blob], name, { type, lastModified: Date.now() })
        }
      }
    }
    return file
  } finally {
    bmp.close()
  }
}
