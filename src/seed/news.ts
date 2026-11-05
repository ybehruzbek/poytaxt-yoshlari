/**
 * NAMUNA yangiliklarni bazaga yozadi (lokal ishlab chiqish uchun).
 * Ishga tushirish:  pnpm seed:news
 * Takror ishga tushirilsa, mavjud yangiliklar (slug bo'yicha) qayta yaratilmaydi.
 */
import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'

import config from '../payload.config'
import { slugifyUz } from '../lib/slugify'

type Cat = 'kengash' | 'boshlangich' | 'imkoniyat' | 'tadbir'
const ITEMS: Array<{ title: string; cat: Cat; img: string; excerpt: string; body: string[] }> = [
  {
    title: 'Oliy ta’lim muassasalarida talabalar bilan ochiq muloqot o‘tkazildi',
    cat: 'kengash',
    img: 'hero-tk.jpg',
    excerpt: 'Uchrashuvda talabalarning taklif va tashabbuslari tinglanib, ularni qiziqtirgan savollarga javob berildi. Boshlang‘ich tashkilot koordinatorlariga ishonch yorliqlari topshirildi.',
    body: [
      'Kengash rahbariyati poytaxt oliy ta’lim muassasalarida talabalar bilan ochiq muloqot o‘tkazdi.',
      'Uchrashuv davomida yoshlarning tashabbuslarini qo‘llab-quvvatlash va talabalar hayotidagi faol ishtirokini kengaytirish masalalari muhokama qilindi.',
    ],
  },
  {
    title: 'Boshlang‘ich tashkilot yetakchilari uchun o‘quv-seminar bo‘lib o‘tdi',
    cat: 'boshlangich',
    img: 'about-1.jpg',
    excerpt: 'Seminarda yetakchilik, loyiha boshqaruvi va yoshlar bilan ishlash bo‘yicha amaliy mashg‘ulotlar o‘tkazildi.',
    body: ['Seminar ishtirokchilari amaliy mashg‘ulotlarda tajriba almashdilar.'],
  },
  {
    title: 'Yoshlar tashabbuslari uchun yangi grant dasturiga hujjatlar qabuli boshlandi',
    cat: 'imkoniyat',
    img: 'opp-grant.jpg',
    excerpt: 'Ijtimoiy, ta’limiy va ekologik loyihalar uchun ariza topshirish muddati va talablar e’lon qilindi.',
    body: ['Arizalar elektron shaklda qabul qilinadi.'],
  },
  {
    title: 'Harbiy qismlarda kitobxonlik tanlovi yakunlandi',
    cat: 'boshlangich',
    img: 'news-1.jpg',
    excerpt: 'Tanlov g‘oliblari esdalik sovg‘alari va faxriy yorliqlar bilan taqdirlandi.',
    body: ['Tanlovda harbiy qismlardagi boshlang‘ich tashkilotlar a’zolari ishtirok etdi.'],
  },
  {
    title: 'Eng faol volontyorlar taqdirlandi',
    cat: 'tadbir',
    img: 'news-3.jpg',
    excerpt: 'Yil davomida poytaxt tadbirlarida faol qatnashgan volontyorlarga minnatdorchilik bildirildi.',
    body: ['Taqdirlash marosimi Kengash tashabbusi bilan o‘tkazildi.'],
  },
  {
    title: 'Talabalar uchun kasbga yo‘naltirish haftaligi start oldi',
    cat: 'kengash',
    img: 'about-2.jpg',
    excerpt: 'Hafta davomida talabalar ish beruvchilar bilan uchrashib, amaliyot va bandlik imkoniyatlari bilan tanishadi.',
    body: ['Haftalik hamkor tashkilotlar bilan birgalikda tashkil etildi.'],
  },
  {
    title: 'Iqtidorli yoshlar uchun stipendiya tanlovi e’lon qilindi',
    cat: 'imkoniyat',
    img: 'opp-stip.jpg',
    excerpt: 'Fan olimpiadalari va tanlov g‘oliblari, faol talabalar stipendiya uchun ariza topshirishlari mumkin.',
    body: ['Tanlov shartlari va muddatlari e’lon qilindi.'],
  },
  {
    title: 'Poytaxtda yoshlar forumi bo‘lib o‘tdi',
    cat: 'tadbir',
    img: 'hero-uz.jpg',
    excerpt: 'Forumda yoshlar siyosati, ta’lim va bandlik masalalari bo‘yicha panel muhokamalar o‘tkazildi.',
    body: ['Forum ishtirokchilari tashabbuslar bo‘yicha takliflar bildirdi.'],
  },
  {
    title: 'OTM boshlang‘ich tashkilotlari koordinatorlari bilan yig‘ilish',
    cat: 'boshlangich',
    img: 'about-3.jpg',
    excerpt: 'Yig‘ilishda yangi o‘quv yili uchun ish rejasi va ustuvor vazifalar belgilab olindi.',
    body: ['Koordinatorlarga uslubiy tavsiyalar berildi.'],
  },
  {
    title: 'Volontyorlik dasturiga ro‘yxatdan o‘tish davom etmoqda',
    cat: 'imkoniyat',
    img: 'opp-vol.jpg',
    excerpt: 'Shahar miqyosidagi tadbirlarda ko‘ngilli bo‘lishni istagan yoshlar onlayn ro‘yxatdan o‘tishi mumkin.',
    body: ['Volontyorlarga sertifikat beriladi.'],
  },
  {
    title: 'Yosh dasturchilar uchun bepul o‘quv kursi boshlanmoqda',
    cat: 'imkoniyat',
    img: 'news-2.jpg',
    excerpt: 'Kurs davomida ishtirokchilar veb-dasturlash asoslarini o‘rganib, real loyiha ustida ishlaydi.',
    body: ['Kursga yozilish onlayn amalga oshiriladi.'],
  },
  {
    title: 'Kengash yilning faol yoshlarini taqdirlashga tayyorgarlik ko‘rmoqda',
    cat: 'kengash',
    img: 'opp-grant.jpg',
    excerpt: 'Turli yo‘nalishlarda o‘zini ko‘rsatgan yoshlar nomzodlari qabul qilinmoqda.',
    body: ['Nomzodlar ro‘yxati boshlang‘ich tashkilotlar tavsiyasi asosida shakllantiriladi.'],
  },
]

const lexical = (paras: string[]) => ({
  root: {
    type: 'root',
    format: '' as const,
    indent: 0,
    version: 1,
    direction: 'ltr' as const,
    children: paras.map((text) => ({
      type: 'paragraph',
      format: '' as const,
      indent: 0,
      version: 1,
      direction: 'ltr' as const,
      textFormat: 0,
      children: [{ type: 'text', text, format: 0, detail: 0, mode: 'normal', style: '', version: 1 }],
    })),
  },
})

const payload = await getPayload({ config })
const imgDir = path.resolve(process.cwd(), 'public/img')
const mediaIds = new Map<string, number>()

const now = new Date('2026-11-05T10:00:00+05:00').getTime()
let created = 0

for (const [i, it] of ITEMS.entries()) {
  const slug = slugifyUz(it.title)
  const exists = await payload.find({ collection: 'news', where: { slug: { equals: slug } }, limit: 1, draft: true })
  if (exists.docs.length) continue

  if (!mediaIds.has(it.img)) {
    const found = await payload.find({ collection: 'media', where: { filename: { like: it.img.replace('.jpg', '') } }, limit: 1 })
    if (found.docs.length) mediaIds.set(it.img, found.docs[0].id as number)
    else {
      const file = fs.readFileSync(path.join(imgDir, it.img))
      const media = await payload.create({
        collection: 'media',
        data: { alt: it.title },
        file: { data: file, mimetype: 'image/jpeg', name: it.img, size: file.length },
      })
      mediaIds.set(it.img, media.id as number)
    }
  }

  await payload.create({
    collection: 'news',
    data: {
      title: it.title,
      slug,
      category: it.cat,
      publishedAt: new Date(now - i * 2.5 * 24 * 3600 * 1000).toISOString(),
      image: mediaIds.get(it.img)!,
      excerpt: it.excerpt,
      content: lexical(it.body),
      _status: 'published',
    },
  })
  created++
}

payload.logger.info(`Yangiliklar: ${created} ta yaratildi, jami ${(await payload.count({ collection: 'news' })).totalDocs} ta.`)
process.exit(0)
