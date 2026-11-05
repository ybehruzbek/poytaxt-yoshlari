/** O'zbekcha matndan URL uchun qisqa nom (slug): "O‘quv-seminar bo‘lib o‘tdi" → "oquv-seminar-bolib-otdi" */
export function slugifyUz(input: string): string {
  return input
    .toLowerCase()
    .replace(/[ö]/g, 'o')
    .replace(/[ğ]/g, 'g')
    .replace(/ş/g, 'sh')
    .replace(/ç/g, 'ch')
    .replace(/[‘’ʻʼ'`]/g, '')
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}
