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
    title: 'Oliy taʼlim muassasalarida talabalar bilan oçiq muloqot ötkazildi',
    cat: 'kengash',
    img: 'hero-tk.jpg',
    excerpt: 'Uçraşuvda talabalarning taklif va taşabbuslari tinglanib, ularni qiziqtirgan savollarga javob berildi. Boşlanğiç taşkilot koordinatorlariga işonç yorliqlari topşirildi.',
    body: [
      'Kengaş rahbariyati poytaxt oliy taʼlim muassasalarida talabalar bilan oçiq muloqot ötkazdi.',
      'Uçraşuv davomida yoşlarning taşabbuslarini qöllab-quvvatlaş va talabalar hayotidagi faol iştirokini kengaytiriş masalalari muhokama qilindi.',
    ],
  },
  {
    title: 'Boşlanğiç taşkilot yetakçilari uçun öquv-seminar bölib ötdi',
    cat: 'boshlangich',
    img: 'about-1.jpg',
    excerpt: 'Seminarda yetakçilik, loyiha boşqaruvi va yoşlar bilan işlaş böyiça amaliy maşğulotlar ötkazildi.',
    body: ['Seminar iştirokçilari amaliy maşğulotlarda tajriba almaşdilar.'],
  },
  {
    title: 'Yoşlar taşabbuslari uçun yangi grant dasturiga hujjatlar qabuli boşlandi',
    cat: 'imkoniyat',
    img: 'opp-grant.jpg',
    excerpt: 'Ijtimoiy, taʼlimiy va ekologik loyihalar uçun ariza topşiriş muddati va talablar eʼlon qilindi.',
    body: ['Arizalar elektron şaklda qabul qilinadi.'],
  },
  {
    title: 'Harbiy qismlarda kitobxonlik tanlovi yakunlandi',
    cat: 'boshlangich',
    img: 'news-1.jpg',
    excerpt: 'Tanlov ğoliblari esdalik sovğalari va faxriy yorliqlar bilan taqdirlandi.',
    body: ['Tanlovda harbiy qismlardagi boşlanğiç taşkilotlar aʼzolari iştirok etdi.'],
  },
  {
    title: 'Eng faol volontyorlar taqdirlandi',
    cat: 'tadbir',
    img: 'news-3.jpg',
    excerpt: 'Yil davomida poytaxt tadbirlarida faol qatnaşgan volontyorlarga minnatdorçilik bildirildi.',
    body: ['Taqdirlaş marosimi Kengaş taşabbusi bilan ötkazildi.'],
  },
  {
    title: 'Talabalar uçun kasbga yönaltiriş haftaligi start oldi',
    cat: 'kengash',
    img: 'about-2.jpg',
    excerpt: 'Hafta davomida talabalar iş beruvçilar bilan uçraşib, amaliyot va bandlik imkoniyatlari bilan tanişadi.',
    body: ['Haftalik hamkor taşkilotlar bilan birgalikda taşkil etildi.'],
  },
  {
    title: 'Iqtidorli yoşlar uçun stipendiya tanlovi eʼlon qilindi',
    cat: 'imkoniyat',
    img: 'opp-stip.jpg',
    excerpt: 'Fan olimpiadalari va tanlov ğoliblari, faol talabalar stipendiya uçun ariza topşirişlari mumkin.',
    body: ['Tanlov şartlari va muddatlari eʼlon qilindi.'],
  },
  {
    title: 'Poytaxtda yoşlar forumi bölib ötdi',
    cat: 'tadbir',
    img: 'hero-uz.jpg',
    excerpt: 'Forumda yoşlar siyosati, taʼlim va bandlik masalalari böyiça panel muhokamalar ötkazildi.',
    body: ['Forum iştirokçilari taşabbuslar böyiça takliflar bildirdi.'],
  },
  {
    title: 'OTM boşlanğiç taşkilotlari koordinatorlari bilan yiğiliş',
    cat: 'boshlangich',
    img: 'about-3.jpg',
    excerpt: 'Yiğilişda yangi öquv yili uçun iş rejasi va ustuvor vazifalar belgilab olindi.',
    body: ['Koordinatorlarga uslubiy tavsiyalar berildi.'],
  },
  {
    title: 'Volontyorlik dasturiga röyxatdan ötiş davom etmoqda',
    cat: 'imkoniyat',
    img: 'opp-vol.jpg',
    excerpt: 'Şahar miqyosidagi tadbirlarda köngilli bölişni istagan yoşlar onlayn röyxatdan ötişi mumkin.',
    body: ['Volontyorlarga sertifikat beriladi.'],
  },
  {
    title: 'Yoş dasturçilar uçun bepul öquv kursi boşlanmoqda',
    cat: 'imkoniyat',
    img: 'news-2.jpg',
    excerpt: 'Kurs davomida iştirokçilar veb-dasturlaş asoslarini örganib, real loyiha ustida işlaydi.',
    body: ['Kursga yoziliş onlayn amalga oşiriladi.'],
  },
  {
    title: 'Kengaş yilning faol yoşlarini taqdirlaşga tayyorgarlik körmoqda',
    cat: 'kengash',
    img: 'opp-grant.jpg',
    excerpt: 'Turli yönalişlarda özini körsatgan yoşlar nomzodlari qabul qilinmoqda.',
    body: ['Nomzodlar röyxati boşlanğiç taşkilotlar tavsiyasi asosida şakllantiriladi.'],
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
