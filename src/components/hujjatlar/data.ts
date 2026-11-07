/**
 * «Normativ-huquqiy hujjatlar» sahifasi mazmuni (/hujjatlar/normativ).
 * Hujjatlar lex.uz va president.uz da tekşirilgan. Keyinçalik admin paneldan boşqariladi.
 */

export type Act = { y: string; t: string; d: string; href?: string }
export type ActGroup = { id: string; t: string; lead: string; acts: Act[] }

export const INTRO =
  'Yoşlarga oid davlat siyosati, Özbekiston yoşlar ittifoqi faoliyati hamda yoşlarga yaratilgan imkoniyat va imtiyozlarga doir asosiy hujjatlar.'

export const GROUPS: ActGroup[] = [
  {
    id: 'davlat-siyosati',
    t: 'Yoşlarga oid davlat siyosatiga doir normativ-huquqiy hujjatlar',
    lead: 'Davlatning yoşlarga oid siyosati asoslari, maqsad va yönalişlarini belgilovçi qonun va farmonlar.',
    acts: [
      {
        y: '14.09.2016',
        t: '«Yoşlarga oid davlat siyosati töğrisida»gi Qonun (ÖRQ-406)',
        d: 'Yoşlar siyosatining asosiy qonuni; yoşlar nodavlat taşkilotlarini davlat qöllab-quvvatlaşini belgilaydi.',
        href: 'https://lex.uz/docs/-3026246',
      },
      {
        y: '30.06.2020',
        t: 'Prezidentning PF-6017-son Farmoni va PQ-4768-son qarori',
        d: 'Yoşlar işlari agentligi taşkil etildi: yoşlarga oid davlat siyosatini amalga oşiriş agentlikka ötdi, Ittifoq esa nodavlat notijorat taşkilot sifatida işini davom ettirmoqda.',
        href: 'https://lex.uz/docs/-4880189',
      },
    ],
  },
  {
    id: 'ittifoq',
    t: 'Özbekiston yoşlar ittifoqi faoliyatiga doir normativ-huquqiy hujjatlar',
    lead: 'Ittifoqning taşkil etiliși, vakolatlari va faoliyatini takomillaştirişga doir hujjatlar.',
    acts: [
      {
        y: '05.07.2017',
        t: 'Prezidentning PF-5106-son Farmoni',
        d: 'Ittifoq taşkil etilgani qabul qilindi, 30-iyun «Yoşlar kuni» deb eʼlon qilindi, 12 ta ustuvor yönaliş belgilandi.',
        href: 'https://lex.uz/docs/-3255680',
      },
      {
        y: '18.07.2017',
        t: 'Prezidentning PQ-3138-son qarori',
        d: 'Ittifoq faoliyatini takomillaştirişga doir kompleks çora-tadbirlar dasturi tasdiqlandi.',
        href: 'https://president.uz/oz/lists/view/795',
      },
      {
        y: '14.11.2017',
        t: 'Vazirlar Mahkamasining 914-son qarori',
        d: 'Ittifoqning faol aʼzolariga oliy taʼlim muassasalariga imtiyozli qabul uçun tavsiyanoma beriş tartibi joriy etildi.',
        href: 'https://lex.uz/mact/-3409650',
      },
      {
        y: '10.01.2018',
        t: 'Oliy taʼlim va Moliya vazirliklarining qarori (röyxat raqami 2961)',
        d: 'Faol aʼzo talabalarning yillik kontrakt tölovining 35 foizini Ittifoq tölab beriş tartibi tasdiqlandi.',
        href: 'https://lex.uz/docs/-3497684',
      },
    ],
  },
  {
    id: 'imkoniyatlar',
    t: 'Yoşlarga yaratilgan imkoniyat va imtiyozlarga doir normativ-huquqiy hujjatlar',
    lead: 'Yoşlar uçun davlat miqyosida yaratilgan imkoniyatlar, imtiyozlar, mukofotlar va şart-şaroitlar.',
    acts: [
      {
        y: '21.11.2017',
        t: 'Prezidentning PQ-3402-son qarori',
        d: '«Mard öğlon» davlat mukofotini har yili har bir hududdan 2 nafar yigitga topşiriş haqidagi Ittifoq taklifi maʼqullandi.',
        href: 'https://lex.uz/docs/-3418697',
      },
      {
        y: '28.12.2017',
        t: 'ZRU-451-son Qonun',
        d: '14–30 yoşli faol yoşlar uçun «Kelajak bunyodkori» medali taʼsis etildi.',
        href: 'https://lex.uz/docs/3479567',
      },
    ],
  },
]

export const NOTE =
  'Ittifoq faoliyati, şuningdek, Özbekiston Respublikasi Konstitutsiyasi, nodavlat notijorat taşkilotlari töğrisidagi qonunlar va Ittifoq Ustaviga asoslanadi.'
