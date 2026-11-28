/** Boş sahifa matnlarini bazaga köçiradi. pnpm payload run scripts/seed/bosh-sahifa.ts */
import { getPayload } from 'payload'

import config from '../../src/payload.config'
import { OPP_TYPES } from '../../src/lib/opps'

const payload = await getPayload({ config })

/** “Ittifoq yoşlarga nima beradi” — boşlanğiç matn (keyin admin paneldan boşqariladi) */
const ROLES = [
  {
    id: 'faol',
    t: 'Faol a’zo',
    h: 'Ittifoq safidagi faol yoshlarga',
    items: [
      'Ittifoq loyihalari, tanlovlari va forumlarida ishtirok etish, o‘z tashabbusini Kengash ko‘magida amalga oshirish',
      'Ittifoq tizimida ikki yil faoliyat yuritgan yoshlarga oliy ta’limning pedagogika yo‘nalishlariga test sinovlarisiz, davlat granti asosida qabul qilinishi uchun tavsiyanoma',
      'Vatan sha’nini yuksaltirishga munosib hissa qo‘shgan yoshlarni “O‘zbekiston belgisi” ko‘krak nishoni bilan taqdirlash',
    ],
    href: '/boglanish/azo-bolish',
    more: 'Ittifoqqa a’zo bo‘lish tartibi',
  },
  {
    id: 'yetakchi',
    t: 'Yoshlar yetakchisi',
    h: 'Boshlang‘ich tashkilotning yoshlar yetakchisiga',
    items: [
      'Oliy ta’lim tashkiloti rahbarining yoshlar masalalari bo‘yicha maslahatchisi sifatida talabalar hayotiga oid masalalarni hal etishda ishtirok etish',
      'Boshlang‘ich tashkilot faoliyatini boshqarish, talabalar tashabbuslarini qo‘llab-quvvatlash va jamoa bilan ishlash tajribasi',
      'Kengash va hamkor tashkilotlar bilan bevosita hamkorlik, shahar miqyosidagi tadbirlarni tashkil etishda qatnashish',
    ],
    href: '/biz-haqimizda/boshlangich-tashkilotlar/oliy-talim',
    more: 'OTT yoshlar yetakchilari',
  },
  {
    id: 'volontyor',
    t: 'Volontyor',
    h: 'Kengash volontyorlariga',
    items: [
      'Volontyorlik faoliyati to‘g‘risida tavsiyanoma olish',
      'Qonunda belgilangan tartibda xarajatlar o‘rnini qoplatish hamda hayot va sog‘liqni sug‘urta qildirish',
      'Ijtimoiy yordam, ekologiya, ommaviy tadbirlar va boshqa yo‘nalishlarda amaliy tajriba orttirish',
    ],
    href: '/faoliyat/volontyorlik',
    more: 'Volontyorlik',
  },
  {
    id: 'himoya',
    t: 'Ijtimoiy himoya',
    h: 'Ittifoqning qo‘llab-quvvatlash choralari',
    items: [
      'Muddatli harbiy xizmatni o‘tab, to‘lov-kontrakt asosida o‘qiyotgan talabalar uchun kontrakt summasining 35 foizini to‘lab berish',
      'Sudda javob berayotgan yoshlar uchun Ittifoq kafilligi; bunda Ittifoq bir yil davomida yoshning xulq-atvorini kuzatib boradi',
      'Huquqiy va ijtimoiy masalalar bo‘yicha Kengashga murojaat qilish va maslahat olish',
    ],
    href: '/biz-haqimizda/ittifoq',
    more: 'Ittifoq imtiyozlari',
  },
]

const o = (k: string) => {
  const x = OPP_TYPES.find((t) => t.key === k)!
  return { lead: x.lead, desc: x.desc }
}

await payload.updateGlobal({
  slug: 'bosh-sahifa',
  locale: 'uz',
  overrideAccess: true,
  data: {
    hero: {
      kicker: 'Rasmiy veb-sayt',
      lead: 'Saytda Kengash faoliyati, loyihalar va tadbirlar, e’lonlar hamda normativ hujjatlar bilan tanishish, Ittifoqqa a’zolik uchun ariza yoki Kengashga elektron murojaat yuborish mumkin.',
    },
    about: {
      title: 'O‘zbekiston yoshlar ittifoqi poytaxtda Toshkent shahar hududiy Kengashi orqali faoliyat yuritadi.',
      text: 'Kengash Ittifoq Ustavi asosida ishlaydi: oliy ta’lim tashkilotlari va harbiy qismlardagi boshlang‘ich tashkilotlar orqali poytaxt yoshlari bilan ishlaydi, ularga grant, stipendiya va tanlovlar haqida rasmiy ma’lumot beradi.',
      year: '2017',
      yearLabel: 'Ittifoq tashkil etilgan yil',
      ottLabel: 'OTTdagi boshlang‘ich tashkilotlar',
      partnersLabel: 'Ittifoq hamkorlari',
    },
    opps: { title: 'Yoshlar uchun', accent: 'imkoniyatlar', grant: o('grant'), stip: o('stip'), vol: o('vol'), tanlov: o('tanlov') },
    benefits: {
      title: 'Ittifoq yoshlarga nima beradi',
      lead: 'O‘zbekiston yoshlar ittifoqi safida faol bo‘lgan yosh o‘z tashabbusini amalga oshirish, yetakchilik tajribasini orttirish hamda qonun hujjatlari va Ittifoq qarorlarida belgilangan imtiyozlardan foydalanish imkoniga ega bo‘ladi. Imkoniyatlar faoliyat yo‘nalishiga qarab belgilanadi.',
      roles: ROLES.map((r) => ({ icon: r.id, t: r.t, h: r.h, items: r.items.map((t) => ({ t })), href: r.href, more: r.more })),
    },
    cta: {
      title: 'Ariza, taklif va shikoyatlar',
      text: 'Murojaatlar “Jismoniy va yuridik shaxslarning murojaatlari to‘g‘risida”gi Qonunda belgilangan muddatlarda ko‘rib chiqiladi.',
      steps: [
        { t: 'Yuborish', d: 'Murojaat shakli to‘ldiriladi va masala bayon etiladi' },
        { t: 'Ko‘rib chiqish', d: 'Murojaat mas’ul xodim tomonidan o‘rganiladi' },
        { t: 'Javob', d: 'Javob telefon yoki elektron pochta orqali beriladi' },
      ],
    },
    heads: { news: 'So‘nggi yangiliklar', events: 'Yaqin tadbirlar', faq: 'Ko‘p beriladigan savollar' },
  } as never,
})
console.log('bosh sahifa matnlari: yangilandi')
process.exit(0)
