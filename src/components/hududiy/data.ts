/**
 * “Toşkent şahar hududiy Kengaşi” sahifasi mazmuni.
 * Manba: Kengaş apparatining axborot doskalari (Claude Design loyihasi, 2026-yil noyabr) va
 * Ittifoq Markaziy Kengaşi Ijroiya qömitasining 2024-yil 29-maydagi 01-04/947-sonli qaroriga 7-ilova.
 * Keyinçalik admin paneldan boşqariladi.
 */

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
  name: 'Anvarov Shukurulloxon Maqsudxon o‘g‘li',
  role: 'Toshkent shahar hududiy Kengashi raisi',
  img: '/img/hududiy/xodimlar/anvarov.jpg',
  room: '11-xona',
  reception: 'Dushanba · 14:00 — 17:00',
  duties: [
    'Hududiy Kengash faoliyatiga rahbarlik qiladi, yoshlar manfaatlari va huquqlarini himoya etadi',
    'Kollegial organlar qarorlari, ish rejasi va farmoyishlar ijrosini tashkil etadi va nazorat qiladi',
    'Idora, muassasa va tashkilotlarda Ittifoqning vakolatli vakili sifatida ish yuritadi',
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
    short: 'Tashkiliy-kadrlar bo‘limi',
    t: 'Tashkiliy-kadrlar va boshlang‘ich tashkilotlar faoliyatini muvofiqlashtirish bo‘limi',
    room: '7 · 9-xona',
    tasks: [
      'Apparat faoliyatini tashkiliy jihatdan ta’minlaydi',
      'Kadrlar siyosatini muvofiqlashtiradi, zaxira kadrlar bazasini shakllantiradi',
      'Boshlang‘ich tashkilotlarni ro‘yxatga oladi va uslubiy qo‘llab-quvvatlaydi',
      'Yetakchilar hisobotlarini, yoshlarga oid axborot va statistikani umumlashtiradi',
      '“Ijro.gov.uz” va “E-xat” orqali hujjat almashinuvini yuritadi',
      'Fuqarolar murojaatlari va qabullarini tashkil etadi, ijrosini nazorat qiladi',
    ],
    staff: [
      { name: 'Jo‘raboyev Mavlonbek Zafarjon o‘g‘li', role: 'Bo‘lim boshlig‘i', img: P('joraboyev') },
      { name: 'Xalilova Jasmina Davron qizi', role: 'Bosh mutaxassis', img: P('xalilova') },
      { name: 'Rashidov Kamoliddin Sayfiddin o‘g‘li', role: 'Bosh mutaxassis', img: P('rashidov') },
    ],
  },
  {
    key: 'harbiy',
    short: 'Harbiy-vatanparvarlik bo‘limi',
    t: 'Harbiy qismlar va muassasalardagi boshlang‘ich tashkilotlar faoliyatini muvofiqlashtirish hamda yoshlarni harbiy-vatanparvarlik ruhida tarbiyalash bo‘limi',
    room: '8-xona',
    tasks: [
      'Harbiy qism va muassasalardagi boshlang‘ich tashkilotlar bilan munosabatlarni o‘rnatadi',
      'Harbiy qismlardagi yoshlar manfaatlarini himoya qiladi, a’zolar hisobini yuritadi',
      'Yoshlarni harbiy-vatanparvarlik ruhida tarbiyalash tadbirlarini amalga oshiradi',
      'Yetakchilar uchun o‘quvlar tashkil etadi, uslubiy qo‘llanma va tavsiyalar tayyorlaydi',
    ],
    staff: [
      {
        name: 'Ismoilov Sarvar Umar o‘g‘li',
        role: 'Bo‘lim boshlig‘i',
        img: P('ismoilov'),
        duties: [
          'Boshlang‘ich tashkilotlar va ularning yetakchilariga oid ma’lumotlarni, a’zolar hisobi va hisobotini yuritadi',
          'Harbiy-vatanparvarlik tarbiyasi bo‘yicha chora-tadbirlarni amalga oshiradi',
          'Tashkilotlar faoliyatini o‘rganadi, kamchiliklarni bartaraf etish ishlarini tashkil etadi va nazorat qiladi',
          'O‘quvlarning tematik rejalarini ishlab chiqadi, tajribali mutaxassislarni jalb etadi',
          'Xizmat doirasidagi ma’lumot va hujjatlar saqlanishiga javob beradi',
          'Bo‘limda yig‘majildlar nomenklaturasining to‘g‘ri yuritilishiga mas’ul',
        ],
      },
    ],
  },
  {
    key: 'buxgalteriya',
    short: 'Buxgalteriya bo‘limi',
    t: 'Buxgalteriya bo‘limi',
    room: '10-xona',
    tasks: [
      'Moliya-buxgalteriya faoliyatini qonunchilik va Ittifoq Ustavi asosida tashkil qiladi',
      'Yillik byudjet va xarajatlar smetasi loyihalarini tayyorlaydi, ijrosini ta’minlaydi',
      'Ish haqi va unga tenglashtirilgan to‘lovlarning o‘z vaqtida to‘lanishini ta’minlaydi',
      'Byudjetdan tashqari mablag‘lar jalb qilish imkoniyatlarini izlaydi',
    ],
    staff: [
      {
        name: 'Temirov Dilshod Saloxiddin o‘g‘li',
        role: 'Bo‘lim boshlig‘i',
        img: P('d-temirov'),
        duties: [
          'Bo‘limga kelgan hujjat, xat, ariza va shikoyatlarni ko‘rib chiqadi, javob xatlarini tayyorlaydi',
          'Byudjet va smeta loyihalarini shakllantiradi, pul mablag‘larining to‘g‘ri sarflanishini nazorat qiladi',
          'Ish haqi va unga tenglashtirilgan to‘lovlarni hisoblaydi va to‘lanishini ta’minlaydi',
          'Moliyaviy hisobotlarni belgilangan muddatlarda tuzadi va topshiradi, bosh jurnal kitobini yuritadi',
          'Inventarizatsiya natijalarini o‘z vaqtida rasmiylashtiradi',
          'Shtat, moliya va kassa intizomiga qat’iy rioya etilishini ta’minlaydi',
          'Moliya-buxgalteriya hujjatlari konfidensialligini ta’minlaydi',
        ],
      },
      {
        name: 'Saidburxonov Saidabzal Toxirxon o‘g‘li',
        role: 'Bo‘lim boshlig‘i',
        img: P('saidburxonov'),
      },
    ],
  },
  {
    key: 'axborot',
    short: 'Axborot xizmati',
    t: 'Axborot xizmati bo‘limi',
    room: '12-xona',
    tasks: [
      'Ittifoq faoliyati haqida OAV va ijtimoiy tarmoqlar orqali muntazam, tezkor axborot beradi',
      'Axborot makonini kuzatadi va tahlil qiladi, axborot xurujlariga tezkor munosabat bildiradi',
      'Rasmiy veb-sayt va ijtimoiy tarmoqlardagi sahifalar ishini muvofiqlashtiradi',
      'Matnli, foto, audio va videomateriallar bazasini yuritadi',
    ],
    staff: [
      {
        name: 'Temirov Og‘abek Fazliddin o‘g‘li',
        role: 'Bo‘lim boshlig‘i, matbuot kotibi',
        img: P('o-temirov'),
        socials: [
          {
            net: 'Instagram',
            handle: '@temirov_ogabek.f',
            href: 'https://www.instagram.com/temirov_ogabek.f/',
          },
        ],
        duties: [
          'Tizimdagi OAV faoliyatini kuzatadi, tadbirlarni yoritishga OAVni jalb etadi',
          'Apparatning “Yoshlar press-klubi” faoliyatini muvofiqlashtiradi',
          'Rasmiy veb-sayt va ijtimoiy tarmoqlardagi sahifalar ishini muvofiqlashtiradi',
          'Tadbir uchun mas’ul shaxs bilan birgalikda press-xabarlar tayyorlaydi va tarqatadi',
        ],
      },
      { name: 'Yunusov Yusufjon Muxsin o‘g‘li', role: 'Bo‘lim boshlig‘i', img: P('yunusov') },
    ],
  },
]

/** Rahbariyat qabuli (axborot doskasidagi jadval) */
export type Reception = { day: string; time: string; room: string; name: string; dept: string }

export const RECEPTION: Reception[] = [
  {
    day: 'Dushanba',
    time: '14:00 — 17:00',
    room: '11',
    name: 'Anvarov Shukurulloxon Maqsudxon o‘g‘li',
    dept: 'Kengash raisi',
  },
  {
    day: 'Seshanba',
    time: '14:00 — 17:00',
    room: '08',
    name: 'Ismoilov Sarvar Umar o‘g‘li',
    dept: 'Harbiy-vatanparvarlik bo‘limi',
  },
  {
    day: 'Chorshanba',
    time: '14:00 — 17:00',
    room: '09',
    name: 'Jo‘raboyev Mavlonbek Zafarjon o‘g‘li',
    dept: 'Tashkiliy-kadrlar bo‘limi',
  },
  {
    day: 'Payshanba',
    time: '14:00 — 17:00',
    room: '10',
    name: 'Temirov Dilshod Saloxiddin o‘g‘li',
    dept: 'Buxgalteriya bo‘limi',
  },
  {
    day: 'Juma',
    time: '14:00 — 17:00',
    room: '12',
    name: 'Temirov Og‘abek Fazliddin o‘g‘li',
    dept: 'Axborot xizmati',
  },
]

export const CONTACT = {
  address: 'Toshkent shahri, Olmazor tumani, Universitet ko‘chasi, 4-uy',
  map: 'https://yandex.uz/maps/?text=Toshkent%2C%20Universitet%20ko%27chasi%2C%204',
  phone: '+998 71 246-10-70',
  phoneHref: 'tel:+998712461070',
  email: 'poytaxtyoshlari.yi@gmail.com',
  hours: 'Dushanba — juma · 09:00 — 18:00',
  socials: [
    { net: 'Telegram', handle: '@Poytaxtyoshlari_yi', href: 'https://t.me/poytaxtyoshlari_yi' },
    { net: 'Instagram', handle: '@yoshlar.uzb', href: 'https://www.instagram.com/yoshlar.uzb/' },
    {
      net: 'Facebook',
      handle: 'Poytaxt yoshlari',
      href: 'https://www.facebook.com/share/1DZFdJ2wTc/',
    },
  ],
}
