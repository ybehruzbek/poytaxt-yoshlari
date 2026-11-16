/** Boş sahifa matnlarini bazaga köçiradi. pnpm payload run scripts/seed/bosh-sahifa.ts */
import { getPayload } from 'payload'

import config from '../../src/payload.config'
import { OPP_TYPES } from '../../src/lib/opps'

const payload = await getPayload({ config })

/** “Ittifoq yoşlarga nima beradi” — boşlanğiç matn (keyin admin paneldan boşqariladi) */
const ROLES = [
  {
    id: 'faol',
    t: 'Faol aʼzo',
    h: 'Ittifoq safidagi faol yoşlarga',
    items: [
      'Ittifoq loyihalari, tanlovlari va forumlarida iştirok etiş, öz taşabbusini Kengaş kömagida amalga oşiriş',
      'Ittifoq tizimida ikki yil faoliyat yuritgan yoşlarga oliy taʼlimning pedagogika yönalişlariga test sinovlarisiz, davlat granti asosida qabul qilinişi uçun tavsiyanoma',
      'Vatan şaʼnini yuksaltirişga munosib hissa qöşgan yoşlarni “Özbekiston belgisi” kökrak nişoni bilan taqdirlaş',
    ],
    href: '/boglanish/azo-bolish',
    more: 'Ittifoqqa aʼzo böliş tartibi',
  },
  {
    id: 'yetakchi',
    t: 'Yoşlar yetakçisi',
    h: 'Boşlanğiç taşkilotning yoşlar yetakçisiga',
    items: [
      'Oliy taʼlim taşkiloti rahbarining yoşlar masalalari böyiça maslahatçisi sifatida talabalar hayotiga oid masalalarni hal etişda iştirok etiş',
      'Boşlanğiç taşkilot faoliyatini boşqariş, talabalar taşabbuslarini qöllab-quvvatlaş va jamoa bilan işlaş tajribasi',
      'Kengaş va hamkor taşkilotlar bilan bevosita hamkorlik, şahar miqyosidagi tadbirlarni taşkil etişda qatnaşiş',
    ],
    href: '/biz-haqimizda/boshlangich-tashkilotlar/oliy-talim',
    more: 'OTT yoşlar yetakçilari',
  },
  {
    id: 'volontyor',
    t: 'Volontyor',
    h: 'Kengaş volontyorlariga',
    items: [
      'Volontyorlik faoliyati töğrisida tavsiyanoma oliş',
      'Qonunda belgilangan tartibda xarajatlar örnini qoplatiş hamda hayot va soğliqni suğurta qildiriş',
      'Ijtimoiy yordam, ekologiya, ommaviy tadbirlar va boşqa yönalişlarda amaliy tajriba orttiriş',
    ],
    href: '/faoliyat/volontyorlik',
    more: 'Volontyorlik',
  },
  {
    id: 'himoya',
    t: 'Ijtimoiy himoya',
    h: 'Ittifoqning qöllab-quvvatlaş çoralari',
    items: [
      'Muddatli harbiy xizmatni ötab, tölov-kontrakt asosida öqiyotgan talabalar uçun kontrakt summasining 35 foizini tölab beriş',
      'Sudda javob berayotgan yoşlar uçun Ittifoq kafilligi; bunda Ittifoq bir yil davomida yoşning xulq-atvorini kuzatib boradi',
      'Huquqiy va ijtimoiy masalalar böyiça Kengaşga murojaat qiliş va maslahat oliş',
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
      lead: 'Saytda Kengaş faoliyati, loyihalar va tadbirlar, eʼlonlar hamda normativ hujjatlar bilan tanişiş, Ittifoqqa aʼzolik uçun ariza yoki Kengaşga elektron murojaat yuboriş mumkin.',
    },
    about: {
      title: 'Kengaş Toşkent şahridagi yoşlar bilan Özbekiston yoşlar ittifoqi Ustavi asosida işlaydi.',
      text: 'Saytda Kengaş faoliyati, OTT va harbiy qismlardagi boşlanğiç taşkilotlar, yoşlar uçun grant, stipendiya va tanlovlar, Ittifoq hujjatlari haqida rasmiy maʼlumotlar berib boriladi.',
      year: '2017',
      yearLabel: 'Ittifoq taşkil etilgan yil',
      ottLabel: 'OTTdagi boşlanğiç taşkilotlar',
      partnersLabel: 'Ittifoq hamkorlari',
    },
    opps: { title: 'Yoşlar uçun', accent: 'imkoniyatlar', grant: o('grant'), stip: o('stip'), vol: o('vol'), tanlov: o('tanlov') },
    benefits: {
      title: 'Ittifoq yoşlarga nima beradi',
      lead: 'Özbekiston yoşlar ittifoqi safida faol bölgan yoş öz taşabbusini amalga oşiriş, yetakçilik tajribasini orttiriş hamda qonun hujjatlari va Ittifoq qarorlarida belgilangan imtiyozlardan foydalaniş imkoniga ega böladi. Imkoniyatlar faoliyat yönalişiga qarab belgilanadi.',
      roles: ROLES.map((r) => ({ icon: r.id, t: r.t, h: r.h, items: r.items.map((t) => ({ t })), href: r.href, more: r.more })),
    },
    cta: {
      title: 'Ariza, taklif va şikoyatlar',
      text: 'Murojaatlar “Jismoniy va yuridik şaxslarning murojaatlari töğrisida”gi Qonunda belgilangan muddatlarda körib çiqiladi.',
      steps: [
        { t: 'Yuboriş', d: 'Murojaat şakli töldiriladi va masala bayon etiladi' },
        { t: 'Körib çiqiş', d: 'Murojaat masʼul xodim tomonidan örganiladi' },
        { t: 'Javob', d: 'Javob telefon yoki elektron poçta orqali beriladi' },
      ],
    },
    heads: { news: 'Sönggi yangiliklar', events: 'Yaqin tadbirlar', faq: 'Köp beriladigan savollar' },
  } as never,
})
console.log('boş sahifa matnlari: yangilandi')
process.exit(0)
