/**
 * «Toşkent şahar hududiy Kengaşi» sahifasi mazmuni.
 * Manba: Kengaş apparatining axborot doskalari (Claude Design loyihasi, 2026-yil noyabr) va
 * Ittifoq Markaziy Kengaşi Ijroiya qömitasining 2024-yil 29-maydagi 01-04/947-sonli qaroriga 7-ilova.
 * Keyinçalik admin paneldan boşqariladi.
 */

export const BASIS =
  'Ittifoq Markaziy Kengaşi Ijroiya qömitasining 2024-yil 29-maydagi 01-04/947-sonli qaroriga 7-ilova asosida'

export type Social = { net: 'Telegram' | 'Instagram' | 'Facebook'; handle: string; href: string }

export type Person = {
  name: string
  role: string
  img: string
  /** şaxsiy aloqa; bölmasa — Kengaşning umumiy telefoni va poçtasi körsatiladi */
  phone?: string
  email?: string
  socials?: Social[]
  /** xodimning xizmat (funksional) vazifalari; bölmasa — bölim vazifalari körsatiladi */
  duties?: string[]
}

export const CHAIR = {
  name: 'Anvarov Şukurulloxon Maqsudxon öğli',
  role: 'Toşkent şahar hududiy Kengaşi raisi',
  img: '/img/hududiy/xodimlar/anvarov.jpg',
  room: '11-xona',
  reception: 'Duşanba · 14:00 — 17:00',
  duties: [
    'Hududiy Kengaş faoliyatiga rahbarlik qiladi, yoşlar manfaatlari va huquqlarini himoya etadi',
    'Kollegial organlar qarorlari, iş rejasi va farmoyişlar ijrosini taşkil etadi va nazorat qiladi',
    'Idora, muassasa va taşkilotlarda Ittifoqning vakolatli vakili sifatida iş yuritadi',
  ],
  socials: <Social[]>[
    {
      net: 'Telegram',
      handle: '@Shukurulloxon_Official',
      href: 'https://t.me/Shukurulloxon_Official',
    },
    {
      net: 'Instagram',
      handle: '@shukurulloxon.anvarov',
      href: 'https://www.instagram.com/shukurulloxon.anvarov/',
    },
    {
      net: 'Facebook',
      handle: '@shukurulloxon.anvarov',
      href: 'https://www.facebook.com/shukurulloxon.anvarov',
    },
  ],
}

export type Dept = {
  key: string
  /** qisqa nom (kartalar, jadval) */
  short: string
  /** rasmiy töliq nom */
  t: string
  room: string
  tasks: string[]
  staff: Person[]
}

const P = (f: string) => `/img/hududiy/xodimlar/${f}.jpg`

export const DEPTS: Dept[] = [
  {
    key: 'kadr',
    short: 'Taşkiliy-kadrlar bölimi',
    t: 'Taşkiliy-kadrlar va boşlanğiç taşkilotlar faoliyatini muvofiqlaştiriş bölimi',
    room: '7 · 9-xona',
    tasks: [
      'Apparat faoliyatini taşkiliy jihatdan taʼminlaydi',
      'Kadrlar siyosatini muvofiqlaştiradi, zaxira kadrlar bazasini şakllantiradi',
      'Boşlanğiç taşkilotlarni röyxatga oladi va uslubiy qöllab-quvvatlaydi',
      'Yetakçilar hisobotlarini, yoşlarga oid axborot va statistikani umumlaştiradi',
      '«Ijro.gov.uz» va «E-xat» orqali hujjat almaşinuvini yuritadi',
      'Fuqarolar murojaatlari va qabullarini taşkil etadi, ijrosini nazorat qiladi',
    ],
    staff: [
      { name: 'Jöraboyev Mavlonbek Zafarjon öğli', role: 'Bölim boşliği', img: P('joraboyev') },
      { name: 'Xalilova Jasmina Davron qizi', role: 'Boş mutaxassis', img: P('xalilova') },
      { name: 'Raşidov Kamoliddin Sayfiddin öğli', role: 'Boş mutaxassis', img: P('rashidov') },
    ],
  },
  {
    key: 'harbiy',
    short: 'Harbiy-vatanparvarlik bölimi',
    t: 'Harbiy qismlar va muassasalardagi boşlanğiç taşkilotlar faoliyatini muvofiqlaştiriş hamda yoşlarni harbiy-vatanparvarlik ruhida tarbiyalaş bölimi',
    room: '8-xona',
    tasks: [
      'Harbiy qism va muassasalardagi boşlanğiç taşkilotlar bilan munosabatlarni örnatadi',
      'Harbiy qismlardagi yoşlar manfaatlarini himoya qiladi, aʼzolar hisobini yuritadi',
      'Yoşlarni harbiy-vatanparvarlik ruhida tarbiyalaş tadbirlarini amalga oşiradi',
      'Yetakçilar uçun öquvlar taşkil etadi, uslubiy qöllanma va tavsiyalar tayyorlaydi',
    ],
    staff: [
      {
        name: 'Ismoilov Sarvar Umar öğli',
        role: 'Bölim boşliği',
        img: P('ismoilov'),
        duties: [
          'Boşlanğiç taşkilotlar va ularning yetakçilariga oid maʼlumotlarni, aʼzolar hisobi va hisobotini yuritadi',
          'Harbiy-vatanparvarlik tarbiyasi böyiça çora-tadbirlarni amalga oşiradi',
          'Taşkilotlar faoliyatini örganadi, kamçiliklarni bartaraf etiş işlarini taşkil etadi va nazorat qiladi',
          'Öquvlarning tematik rejalarini işlab çiqadi, tajribali mutaxassislarni jalb etadi',
          'Xizmat doirasidagi maʼlumot va hujjatlar saqlanişiga javob beradi',
          'Bölimda yiğmajildlar nomenklaturasining töğri yuritilişiga masʼul',
        ],
      },
    ],
  },
  {
    key: 'buxgalteriya',
    short: 'Buxgalteriya bölimi',
    t: 'Buxgalteriya bölimi',
    room: '10-xona',
    tasks: [
      'Moliya-buxgalteriya faoliyatini qonunçilik va Ittifoq Ustavi asosida taşkil qiladi',
      'Yillik byudjet va xarajatlar smetasi loyihalarini tayyorlaydi, ijrosini taʼminlaydi',
      'Iş haqi va unga tenglaştirilgan tölovlarning öz vaqtida tölanişini taʼminlaydi',
      'Byudjetdan taşqari mablağlar jalb qiliş imkoniyatlarini izlaydi',
    ],
    staff: [
      {
        name: 'Temirov Dilşod Saloxiddin öğli',
        role: 'Bölim boşliği',
        img: P('d-temirov'),
        duties: [
          'Bölimga kelgan hujjat, xat, ariza va şikoyatlarni körib çiqadi, javob xatlarini tayyorlaydi',
          'Byudjet va smeta loyihalarini şakllantiradi, pul mablağlarining töğri sarflanişini nazorat qiladi',
          'Iş haqi va unga tenglaştirilgan tölovlarni hisoblaydi va tölanişini taʼminlaydi',
          'Moliyaviy hisobotlarni belgilangan muddatlarda tuzadi va topşiradi, boş jurnal kitobini yuritadi',
          'Inventarizatsiya natijalarini öz vaqtida rasmiylaştiradi',
          'Ştat, moliya va kassa intizomiga qatʼiy rioya etilişini taʼminlaydi',
          'Moliya-buxgalteriya hujjatlari konfidensialligini taʼminlaydi',
        ],
      },
      {
        name: 'Saidburxonov Saidabzal Toxirxon öğli',
        role: 'Bölim boşliği',
        img: P('saidburxonov'),
      },
    ],
  },
  {
    key: 'axborot',
    short: 'Axborot xizmati',
    t: 'Axborot xizmati bölimi',
    room: '12-xona',
    tasks: [
      'Ittifoq faoliyati haqida OAV va ijtimoiy tarmoqlar orqali muntazam, tezkor axborot beradi',
      'Axborot makonini kuzatadi va tahlil qiladi, axborot xurujlariga tezkor munosabat bildiradi',
      'Rasmiy veb-sayt va ijtimoiy tarmoqlardagi sahifalar işini muvofiqlaştiradi',
      'Matnli, foto, audio va videomateriallar bazasini yuritadi',
    ],
    staff: [
      {
        name: 'Temirov Oğabek Fazliddin öğli',
        role: 'Bölim boşliği, matbuot kotibi',
        img: P('o-temirov'),
        socials: [
          {
            net: 'Instagram',
            handle: '@temirov_ogabek.f',
            href: 'https://www.instagram.com/temirov_ogabek.f/',
          },
        ],
        duties: [
          'Tizimdagi OAV faoliyatini kuzatadi, tadbirlarni yoritişga OAVni jalb etadi',
          'Apparatning «Yoşlar press-klubi» faoliyatini muvofiqlaştiradi',
          'Rasmiy veb-sayt va ijtimoiy tarmoqlardagi sahifalar işini muvofiqlaştiradi',
          'Tadbir uçun masʼul şaxs bilan birgalikda press-xabarlar tayyorlaydi va tarqatadi',
        ],
      },
      { name: 'Yunusov Yusufjon Muxsin öğli', role: 'Bölim boşliği', img: P('yunusov') },
    ],
  },
]

/** Rahbariyat qabuli (axborot doskasidagi jadval) */
export type Reception = { day: string; time: string; room: string; name: string; dept: string }

export const RECEPTION: Reception[] = [
  {
    day: 'Duşanba',
    time: '14:00 — 17:00',
    room: '11',
    name: 'Anvarov Şukurulloxon Maqsudxon öğli',
    dept: 'Kengaş raisi',
  },
  {
    day: 'Seşanba',
    time: '14:00 — 17:00',
    room: '08',
    name: 'Ismoilov Sarvar Umar öğli',
    dept: 'Harbiy-vatanparvarlik bölimi',
  },
  {
    day: 'Çorşanba',
    time: '14:00 — 17:00',
    room: '09',
    name: 'Jöraboyev Mavlonbek Zafarjon öğli',
    dept: 'Taşkiliy-kadrlar bölimi',
  },
  {
    day: 'Payşanba',
    time: '14:00 — 17:00',
    room: '10',
    name: 'Temirov Dilşod Saloxiddin öğli',
    dept: 'Buxgalteriya bölimi',
  },
  {
    day: 'Juma',
    time: '14:00 — 17:00',
    room: '12',
    name: 'Temirov Oğabek Fazliddin öğli',
    dept: 'Axborot xizmati',
  },
]

export const CONTACT = {
  address: 'Toşkent şahri, Universitet köçasi, 4-uy',
  map: 'https://yandex.uz/maps/?text=Toshkent%2C%20Universitet%20ko%27chasi%2C%204',
  phone: '+998 71 246-10-70',
  phoneHref: 'tel:+998712461070',
  email: 'poytaxtyoshlari.yi@gmail.com',
  hours: 'Duşanba — juma · 09:00 — 18:00',
  socials: [
    { net: 'Telegram', handle: '@Poytaxtyoshlari_yi', href: 'https://t.me/poytaxtyoshlari_yi' },
    { net: 'Instagram', handle: '@yoshlar.uzb', href: 'https://www.instagram.com/yoshlar.uzb/' },
    {
      net: 'Facebook',
      handle: 'Poytaxt yoşlari',
      href: 'https://www.facebook.com/share/1DZFdJ2wTc/',
    },
  ],
}
