/**
 * “Normativ-huquqiy hujjatlar” sahifasi mazmuni (/hujjatlar/normativ).
 * Hujjatlar lex.uz va president.uz da tekşirilgan. Keyinçalik admin paneldan boşqariladi.
 */

export type ActKind = 'Qonun' | 'Farmon' | 'Qaror' | 'Ustav'
/** y — sana (Ustavda yöq), t — töliq nomi, kind — turi, org — qabul qilgan organ, no — raqami (Ustavda yöq), name — rasmiy nomi (bölsa) */
export type Act = {
  y?: string
  t: string
  d: string
  href?: string
  kind: ActKind
  org: string
  no?: string
  name?: string
}
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
        t: '“Yoşlarga oid davlat siyosati töğrisida”gi Qonun (ÖRQ-406)',
        d: 'Yoşlar siyosatining asosiy qonuni; yoşlar nodavlat taşkilotlarini davlat qöllab-quvvatlaşini belgilaydi.',
        href: 'https://lex.uz/docs/-3026246',
        kind: 'Qonun',
        org: 'Özbekiston Respublikasining Qonuni',
        no: 'ÖRQ-406',
        name: 'Yoşlarga oid davlat siyosati töğrisida',
      },
      {
        y: '30.06.2020',
        t: 'Prezidentning PF-6017-son Farmoni va PQ-4768-son qarori',
        d: 'Yoşlar işlari agentligi taşkil etildi: yoşlarga oid davlat siyosatini amalga oşiriş agentlikka ötdi, Ittifoq esa nodavlat notijorat taşkilot sifatida işini davom ettirmoqda.',
        href: 'https://lex.uz/docs/-4880189',
        kind: 'Farmon',
        org: 'Özbekiston Respublikasi Prezidentining Farmoni',
        no: 'PF-6017',
      },
      {
        y: '18.01.2021',
        t: 'Vazirlar Mahkamasining 23-son qarori',
        d: '2025-yilgaça yoşlar siyosati konsepsiyasi tasdiqlandi: huquqiy himoya, taʼlim, bandlik, soğliq va ijtimoiy faollik yönalişlari.',
        href: 'https://lex.uz/docs/-5234746',
        kind: 'Qaror',
        org: 'Vazirlar Mahkamasining qarori',
        no: '23',
        name: 'Özbekistonda yoşlarga oid davlat siyosatini 2025-yilgaça rivojlantiriş konsepsiyasini tasdiqlaş töğrisida',
      },
      {
        y: '03.02.2021',
        t: 'Prezidentning PF-6155-son Farmoni',
        d: '2021-yil yoşlarni qöllab-quvvatlaş yili deb belgilanib, yoşlarga oid çora-tadbirlarni öz içiga olgan davlat dasturi tasdiqlandi.',
        href: 'https://lex.uz/docs/-5260791',
        kind: 'Farmon',
        org: 'Özbekiston Respublikasi Prezidentining Farmoni',
        no: 'PF-6155',
        name: '2017-2021-yillarda Özbekiston Respublikasini rivojlantirişning beşta ustuvor yönalişi böyiça Harakatlar strategiyasini “Yoşlarni qöllab-quvvatlaş va aholi salomatligini mustahkamlaş yili”da amalga oşirişga oid davlat dasturi töğrisida',
      },
      {
        y: '21.02.2024',
        t: 'Prezidentning PF-37-son Farmoni',
        d: '2024-yil davlat dasturi: yoşlar bandligi, tadbirkorligi va taʼlimini qöllab-quvvatlaş vazifalari belgilandi.',
        href: 'https://lex.uz/docs/-6811936',
        kind: 'Farmon',
        org: 'Özbekiston Respublikasi Prezidentining Farmoni',
        no: 'PF-37',
        name: '“Özbekiston-2030” strategiyasini “Yoşlar va biznesni qöllab-quvvatlaş yili”da amalga oşirişga oid davlat dasturi töğrisida',
      },
      {
        y: '20.04.2026',
        t: 'Prezidentning PF-66-son Farmoni',
        d: '2026–2030-yillarga möljallangan birinçi kompleks yoşlar strategiyasi tasdiqlandi; yoş oilalar uçun imtiyozli ipoteka ham joriy etiladi.',
        href: 'https://lex.uz/docs/-8155028',
        kind: 'Farmon',
        org: 'Özbekiston Respublikasi Prezidentining Farmoni',
        no: 'PF-66',
        name: '“Yangi Özbekiston yoşlari-2030” strategiyasini tasdiqlaş hamda yoşlarni har tomonlama qöllab-quvvatlaş çora-tadbirlari töğrisida',
      },
      {
        y: '20.04.2026',
        t: 'Prezidentning PQ-148-son qarori',
        d: 'Strategiyani 2026–2027-yillarda amalga oşiriş dasturi va yoşlar bandligini taʼminlaş böyiça qöşimça çoralar tasdiqlandi.',
        href: 'https://lex.uz/docs/-8154679',
        kind: 'Qaror',
        org: 'Özbekiston Respublikasi Prezidentining qarori',
        no: 'PQ-148',
        name: '“Yangi Özbekiston yoşlari-2030” strategiyasini 2026-2027-yillarda amalga oşiriş hamda yoşlar bandligini taʼminlaş böyiça qöşimça çora-tadbirlar töğrisida',
      },
    ],
  },
  {
    id: 'ittifoq',
    t: 'Özbekiston yoşlar ittifoqi faoliyatiga doir normativ-huquqiy hujjatlar',
    lead: 'Ittifoqning taşkil etiliși, vakolatlari va faoliyatini takomillaştirişga doir hujjatlar.',
    acts: [
      {
        t: 'Özbekiston yoşlar ittifoqining Ustavi',
        d: 'Ittifoqning maqsad va vazifalari, aʼzolik, rahbar organlari, hududiy tuzilmalari, mulki va hisobotini belgilovçi asosiy hujjat. 10 bob, 16 bet.',
        href: '/hujjatlar/ittifoq-ustavi.pdf',
        kind: 'Ustav',
        org: 'Özbekiston yoşlar ittifoqi',
        name: 'Özbekiston yoşlar ittifoqining Ustavi',
      },
      {
        y: '05.07.2017',
        t: 'Prezidentning PF-5106-son Farmoni',
        d: 'Ittifoq taşkil etilgani qabul qilindi, 30-iyun “Yoşlar kuni” deb eʼlon qilindi, 12 ta ustuvor yönaliş belgilandi.',
        href: 'https://lex.uz/docs/-3255680',
        kind: 'Farmon',
        org: 'Özbekiston Respublikasi Prezidentining Farmoni',
        no: 'PF-5106',
        name: 'Yoşlarga oid davlat siyosati samaradorligini oşiriş va Özbekiston yoşlar ittifoqi faoliyatini qöllab-quvvatlaş töğrisida',
      },
      {
        y: '18.07.2017',
        t: 'Prezidentning PQ-3138-son qarori',
        d: 'Ittifoq faoliyatini takomillaştirişga doir kompleks çora-tadbirlar dasturi tasdiqlandi.',
        href: 'https://president.uz/oz/lists/view/795',
        kind: 'Qaror',
        org: 'Özbekiston Respublikasi Prezidentining qarori',
        no: 'PQ-3138',
      },
      {
        y: '14.11.2017',
        t: 'Vazirlar Mahkamasining 914-son qarori',
        d: 'Ittifoqning faol aʼzolariga oliy taʼlim muassasalariga imtiyozli qabul uçun tavsiyanoma beriş tartibi joriy etildi.',
        href: 'https://lex.uz/mact/-3409650',
        kind: 'Qaror',
        org: 'Vazirlar Mahkamasining qarori',
        no: '914',
      },
      {
        y: '10.01.2018',
        t: 'Oliy taʼlim va Moliya vazirliklarining qarori (röyxat raqami 2961)',
        d: 'Faol aʼzo talabalarning yillik kontrakt tölovining 35 foizini Ittifoq tölab beriş tartibi tasdiqlandi.',
        href: 'https://lex.uz/docs/-3497684',
        kind: 'Qaror',
        org: 'Oliy taʼlim va Moliya vazirliklarining qarori',
        no: '2961',
      },
      {
        y: '31.01.2020',
        t: 'Vazirlar Mahkamasining 59-son qarori',
        d: 'Nizomning 20¹-bandiga köra Ittifoq boşlanğiç taşkilotiga yetakçilik qilayotgan bakalavr va magistratura talabalariga har oy bazaviy stipendiyaning beş baravari miqdorida qöşimça tölov beriladi.',
        href: 'https://lex.uz/uz/docs/-4725554',
        kind: 'Qaror',
        org: 'Vazirlar Mahkamasining qarori',
        no: '59',
        name: 'Oliy taʼlim muassasalari talabalariga tölanadigan stipendiyalar miqdorlarini belgilaş hamda stipendiyalar tayinlaş va tölaş tartibini takomillaştiriş çora-tadbirlari töğrisida',
      },
      {
        y: '26.08.2020',
        t: 'Vazirlar Mahkamasining 517-son qarori',
        d: 'Nizomning 17¹-bandiga köra Ittifoq boşlanğiç taşkilotiga yetakçilik qilayotgan OTM professor-öqituvçi va xodimlariga har oy katta öqituvçi lavozim maoşining 50 foizi miqdorida qöşimça haq tölanadi.',
        href: 'https://lex.uz/uz/docs/-4969845',
        kind: 'Qaror',
        org: 'Vazirlar Mahkamasining qarori',
        no: '517',
        name: 'Respublika oliy taʼlim muassasalarining professor-öqituvçilari va boşqa toifadagi xodimlarini budjetdan taşqari mablağlar hisobidan moddiy rağbatlantiriş tartibi töğrisidagi nizomni tasdiqlaş haqida',
      },
      {
        y: '29.03.2023',
        t: 'Oliy taʼlim, fan va innovatsiyalar vazirligi hamda Özbekiston yoşlar ittifoqi Markaziy Kengaşining qöşma qarori',
        d: 'Barça oliy taʼlim muassasalarida Ittifoqning boşlanğiç taşkilotlari faoliyati yölga qöyiladi; Nizom, taşkiliy tuzilma, çora-tadbirlar rejasi va respublika komissiyasi tarkibi tasdiqlandi.',
        href: '/hujjatlar/qoshma-qaror-otm-2023.pdf',
        kind: 'Qaror',
        org: 'Oliy taʼlim, fan va innovatsiyalar vazirligi va Ittifoq Markaziy Kengaşining qöşma qarori',
        no: '6-Q/Q, 1-Q/Q',
        name: 'Özbekiston yoşlar ittifoqining oliy taʼlim muassasalaridagi boşlanğiç taşkilotlari faoliyatini takomillaştiriş çora-tadbirlari töğrisida',
      },
    ],
  },
  {
    id: 'imkoniyatlar',
    t: 'Yoşlarga yaratilgan imkoniyat va imtiyozlarga doir normativ-huquqiy hujjatlar',
    lead: 'Yoşlar uçun davlat miqyosida yaratilgan imkoniyatlar, imtiyozlar, mukofotlar va şart-şaroitlar.',
    acts: [
      {
        y: '10.06.1999',
        t: 'Prezidentning PF-2326-son Farmoni',
        d: 'Taʼlim, fan, sanʼat, sport va boşqa sohalarda yutuqqa erişgan 14–30 yoşli qizlar uçun Zulfiya nomidagi davlat mukofoti taʼsis etildi.',
        href: 'https://lex.uz/docs/-213812',
        kind: 'Farmon',
        org: 'Özbekiston Respublikasi Prezidentining Farmoni',
        no: 'PF-2326',
        name: 'Zulfiya nomidagi Davlat mukofotini taʼsis etiş böyiça takliflarni qöllab-quvvatlaş töğrisida',
      },
      {
        y: '21.11.2017',
        t: 'Prezidentning PQ-3402-son qarori',
        d: '“Mard öğlon” davlat mukofotini har yili har bir hududdan 2 nafar yigitga topşiriş haqidagi Ittifoq taklifi maʼqullandi.',
        href: 'https://lex.uz/docs/-3418697',
        kind: 'Qaror',
        org: 'Özbekiston Respublikasi Prezidentining qarori',
        no: 'PQ-3402',
        name: '“Mard öğlon” davlat mukofotini taʼsis etiş çora-tadbirlari töğrisida',
      },
      {
        y: '28.12.2017',
        t: 'ÖRQ-451-son Qonun',
        d: '14–30 yoşli faol yoşlar uçun “Kelajak bunyodkori” medali taʼsis etildi.',
        href: 'https://lex.uz/docs/-3479565',
        kind: 'Qonun',
        org: 'Özbekiston Respublikasining Qonuni',
        no: 'ÖRQ-451',
        name: '“Kelajak bunyodkori” medalini taʼsis etiş töğrisida',
      },
      {
        y: '20.04.2021',
        t: 'Prezidentning PF-6208-son Farmoni',
        d: '“Yoşlar daftari”dagilarga subsidiyalar, yoş tadbirkorlarga ijara imtiyozlari va talabalar uçun ijara kompensatsiyasi joriy etildi.',
        href: 'https://lex.uz/docs/-5382151',
        kind: 'Farmon',
        org: 'Özbekiston Respublikasi Prezidentining Farmoni',
        no: 'PF-6208',
        name: 'Yoşlarning tadbirkorlik faoliyatini qöllab-quvvatlaş va bandligiga kömaklaşiş, ularni ijtimoiy himoya qiliş hamda böş vaqtini mazmunli taşkil etişga oid qöşimça çora-tadbirlar töğrisida',
      },
      {
        y: '07.06.2022',
        t: 'Vazirlar Mahkamasining 312-son qarori',
        d: '“Yoşlar daftari” jamğarmalari nizomi va ulardan ijtimoiy yordam ajratiş böyiça davlat xizmati reglamenti tasdiqlandi.',
        href: 'https://lex.uz/docs/-6051791',
        kind: 'Qaror',
        org: 'Vazirlar Mahkamasining qarori',
        no: '312',
        name: 'Yoşlar muammolarini örganiş va hal etiş tizimini yanada takomillaştiriş çora-tadbirlari töğrisida',
      },
      {
        y: '14.02.2025',
        t: 'Prezidentning PQ-60-son qarori',
        d: 'Yoşlar tadbirkorligini rivojlantiriş davlat maqsadli jamğarmasi tuzildi; uning mablaği 100 mln dollar ekvivalentiga yetkaziladi.',
        href: 'https://lex.uz/docs/-7386867',
        kind: 'Qaror',
        org: 'Özbekiston Respublikasi Prezidentining qarori',
        no: 'PQ-60',
        name: 'Yoşlar tadbirkorligini hamda ularning bandligini taʼminlaşga qaratilgan biznes loyihalarni qöllab-quvvatlaş tizimini takomillaştiriş çora-tadbirlari töğrisida',
      },
      {
        y: '20.11.2025',
        t: 'Prezidentning PF-222-son Farmoni',
        d: 'Kontrakt summasining 50 foizigaça qoplanadi, haydovçilik kursi uçun subsidiya va eng faol 1000 yoşga har yili pul mukofoti beriladi.',
        href: 'https://lex.uz/docs/-7850416',
        kind: 'Farmon',
        org: 'Özbekiston Respublikasi Prezidentining Farmoni',
        no: 'PF-222',
        name: '“Yoşlar daftari” jamğarmalari orqali ijtimoiy yordam körsatiş tizimini yanada takomillaştiriş töğrisida',
      },
      {
        y: '01.06.2026',
        t: 'Prezidentning PQ-210-son qarori',
        d: '2026–2028-yillarda “Yoşlar biznesi” va “Kelajakka qadam” dasturlari orqali 31 yoşgaça bölganlarga imtiyozli kreditlar va startaplarga investitsiya beriladi.',
        href: 'https://lex.uz/docs/-8239691',
        kind: 'Qaror',
        org: 'Özbekiston Respublikasi Prezidentining qarori',
        no: 'PQ-210',
        name: 'Tadbirkorlik loyihalarini qöllab-quvvatlaş orqali yoşlar bandligini taʼminlaşga doir qöşimça çora-tadbirlar töğrisida',
      },
    ],
  },
]

export const NOTE =
  'Ittifoq faoliyati, şuningdek, Özbekiston Respublikasi Konstitutsiyasi, nodavlat notijorat taşkilotlari töğrisidagi qonunlar va Ittifoq Ustaviga asoslanadi.'
