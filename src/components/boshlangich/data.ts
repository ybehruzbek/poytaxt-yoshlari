/**
 * “Boşlanğiç taşkilotlar” sahifasi: Toşkent şahridagi oliy taʼlim taşkilotlari (99 ta) va ulardagi
 * Ittifoq boşlanğiç taşkilotlari yoşlar yetakçilari (surat, F.I.Ş., aloqa). Manba: Kengaş apparatining röyxatlari (2026-yil noyabr).
 * Şaxsiy maʼlumotlar (pasport, manzil, tuğilgan sana, şaxsiy telefon) ataylab kiritilmagan.
 * Keyinçalik admin paneldan boşqariladi.
 */

export type OtmType = 'davlat' | 'xorijiy' | 'nodavlat'
/**
 * Aloqa maydonlari — ŞABLON: qiymatni yozsangiz kartada tegişli tugma özi faollaşadi.
 * phone — faqat taşkilotning rasmiy iş telefoni (şaxsiy mobil raqam yozilmaydi), masalan '+998 71 123-45-67'; email: 'nom@pochta.uz', telegram / instagram / facebook: töliq havola (https://…).
 */
export type Contacts = {
  phone: string
  email: string
  telegram: string
  instagram: string
  facebook: string
}
/**
 * Yetakçi sahifasi uçun qöşimça maydonlar — ŞABLON (böş bölsa sahifada “Maʼlumot kiritilmoqda”):
 * about — faoliyati haqida qisqa matn; elected — yetakçi etib saylangan sana (masalan, '15.09.2025');
 * members — boşlanğiç taşkilot aʼzolari soni; reception — qabul kunlari; achievements — yutuqlar röyxati.
 */
export type Profile = {
  about: string
  elected: string
  members: string
  reception: string
  achievements: string[]
}
/** slug — sahifa manzili (/…/oliy-talim/{slug}); role — lavozimi yoki kursi; spec — mutaxassisligi */
export type Leader = {
  slug: string
  name: string
  img: string
  role: string
  spec: string
} & Contacts &
  Profile
export type Otm = { otm: string; type: OtmType; leader?: Leader }

export const TYPE_LABEL: Record<OtmType, string> = {
  davlat: 'Davlat oliy ta’lim tashkiloti',
  xorijiy: 'Xorijiy oliy ta’lim tashkilotining filiali',
  nodavlat: 'Nodavlat oliy ta’lim tashkiloti',
}

/** Rasmiy röyxat tartibida: davlat, xorijiy, nodavlat */
export const OTMS: Otm[] = [
  {
    otm: 'Botir Zokirov nomidagi Milliy estrada san’ati instituti',
    type: 'davlat',
    leader: {
      slug: 'xoltoyeva-shaxlo',

      name: 'Xoltoyeva Shaxlo Shuxrat qizi',

      img: '/img/yetakchilar/10.jpg',

      role: '2-kurs magistranti',

      spec: 'Estrada orkestri dirijyorligi',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'Geologiya fanlari universiteti',
    type: 'davlat',
    leader: {
      slug: 'toxtayev-ulugbek',

      name: 'To‘xtayev Ulug‘bek Husniddin o‘g‘li',

      img: '/img/yetakchilar/11.jpg',

      role: 'Talabalar turar joyi tarbiyachi-uslubchisi (O‘zbekiston Milliy universiteti 2-kurs magistranti)',

      spec: 'Geologiya (faoliyat sohasi bo‘yicha)',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'Jahon iqtisodiyoti va diplomatiya universiteti',
    type: 'davlat',
    leader: {
      slug: 'nodirov-bexzod',

      name: 'Nodirov Bexzod Baxodirovich',

      img: '/img/yetakchilar/27.jpg',

      role: '3-kurs talabasi',

      spec: 'Iqtisodiyot',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'Kamoliddin Behzod Milliy rassomlik va dizayn instituti',
    type: 'davlat',
    leader: {
      slug: 'risqiboyev-shahzodbek',

      name: 'Risqiboyev Shahzodbek Olimbek o‘g‘li',

      img: '/img/yetakchilar/24.jpg',

      role: 'Iqtidorli talabalarning ilmiy-tadqiqot faoliyatini tashkil etish bo‘limi boshlig‘i',

      spec: 'Tarixchi',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'O‘zbekiston davlat jahon tillari universiteti',
    type: 'davlat',
    leader: {
      slug: 'islomova-sevinch',

      name: 'Islomova Sevinch Botirjon qizi',

      img: '/img/yetakchilar/22.jpg',

      role: '3-kurs talabasi',

      spec: 'Xorijiy til va adabiyoti (ingliz tili)',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'O‘zbekiston davlat konservatoriyasi',
    type: 'davlat',
    leader: {
      slug: 'turajanova-nilufar',

      name: 'Turajanova Nilufar Elmurod qizi',

      img: '/img/yetakchilar/09.jpg',

      role: '2-kurs magistranti',

      spec: 'Akademik xor dirijyorligi',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'O‘zbekiston davlat san’at va madaniyat instituti',
    type: 'davlat',
    leader: {
      slug: 'tursunpolatov-izzatullo',

      name: 'Tursunpo‘latov Izzatullo Ibrohimjon o‘g‘li',

      img: '/img/yetakchilar/13.jpg',

      role: '2-kurs magistranti',

      spec: 'Xalq ijodiyoti (folklor va etnografiya)',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'O‘zbekiston davlat xoreografiya akademiyasi',
    type: 'davlat',
    leader: {
      slug: 'mirsoliyev-jamshidbek',

      name: 'Mirsoliyev Jamshidbek Sohibjon o‘g‘li',

      img: '/img/yetakchilar/12.jpg',

      role: '1-kurs magistranti',

      spec: 'San’atshunoslik',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'O‘zbekiston jurnalistika va ommaviy kommunikatsiyalar universiteti',
    type: 'davlat',
    leader: {
      slug: 'anvarova-muqaddasxon',

      name: 'Anvarova Muqaddasxon Xomidjon qizi',

      img: '/img/yetakchilar/21.jpg',

      role: '1-kurs magistranti',

      spec: 'Xalqaro jurnalistika',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'Nizomiy nomidagi O‘zbekiston milliy pedagogika universiteti',
    type: 'davlat',
    leader: {
      slug: 'abdulatipov-azamat',

      name: 'Abdulatipov Azamat Abdulaziz o‘g‘li',

      img: '/img/yetakchilar/28.jpg',

      role: '2-kurs talabasi',

      spec: 'Milliy g‘oya, ma’naviyat asoslari va huquq ta’limi',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'Mirzo Ulug‘bek nomidagi O‘zbekiston Milliy universiteti',
    type: 'davlat',
    leader: {
      slug: 'safarov-daler',

      name: 'Safarov Daler Shuhrat o‘g‘li',

      img: '/img/yetakchilar/01.jpg',

      role: '2-kurs magistranti',

      spec: 'Geologiya (faoliyat sohasi bo‘yicha)',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'O‘zbekiston xalqaro islomshunoslik akademiyasi',
    type: 'davlat',
    leader: {
      slug: 'xakimov-abdufattoh',

      name: 'Xakimov Abdufattoh Abdujalil o‘g‘li',

      img: '/img/yetakchilar/25.jpg',

      role: '1-kurs magistranti',

      spec: 'Xalqaro munosabatlar',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'Samarqand davlat veterinariya meditsinasi, chorvachilik va biotexnologiyalar universiteti Toshkent filiali',
    type: 'davlat',
    leader: {
      slug: 'anarbayeva-gulsara',

      name: 'Anarbayeva Gulsara Dilshod qizi',

      img: '/img/yetakchilar/18.jpg',

      role: '1-kurs magistranti',

      spec: 'Qishloq xo‘jaligi hayvonlarining seleksiyasi va naslchilik',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'Toshkent arxitektura-qurilish universiteti',
    type: 'davlat',
    leader: {
      slug: 'mirzaxmedov-shoxruh',

      name: 'Mirzaxmedov Shoxruh Anvarovich',

      img: '/img/yetakchilar/03.jpg',

      role: 'Yoshlar masalalari va ma’naviy-ma’rifiy ishlar boshqarmasi yetakchi mutaxassisi',

      spec: 'Uy-joy kommunal xo‘jaligini tashkil etish va boshqarish',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'Muhammad al-Xorazmiy nomidagi Toshkent axborot texnologiyalari universiteti',
    type: 'davlat',
    leader: {
      slug: 'qochqarov-urolboy',

      name: 'Qo‘chqarov Urolboy Xolmurod o‘g‘li',

      img: '/img/yetakchilar/14.jpg',

      role: 'Ma’naviyat va ma’rifat bo‘limi xodimi',

      spec: 'Mobil aloqa tizimlari',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'Toshkent davlat iqtisodiyot universiteti',
    type: 'davlat',
    leader: {
      slug: 'abduraxmanov-abdulaziz',

      name: 'Abduraxmanov Abdulaziz Xujamurot o‘g‘li',

      img: '/img/yetakchilar/06.jpg',

      role: '2-kurs magistranti',

      spec: 'Iqtisodiyot (tarmoqlar va sohalar bo‘yicha)',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'Toshkent davlat o‘zbek tili va adabiyoti universiteti',
    type: 'davlat',
    leader: {
      slug: 'eshbayeva-sevinchbonu',

      name: 'Eshbayeva Sevinchbonu Olim qizi',

      img: '/img/yetakchilar/07.jpg',

      role: '4-kurs talabasi',

      spec: 'Matnshunoslik va adabiy manbashunoslik',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'Toshkent davlat sharqshunoslik universiteti',
    type: 'davlat',
    leader: {
      slug: 'sobitov-mirshod',

      name: 'Sobitov Mirshod Isoqjon o‘g‘li',

      img: '/img/yetakchilar/05.jpg',

      role: '4-kurs talabasi',

      spec: 'Antropologiya',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'Islom Karimov nomidagi Toshkent davlat texnika universiteti',
    type: 'davlat',
    leader: {
      slug: 'zokirjonov-muhammadzoir',

      name: 'Zokirjonov Muhammadzoir Zoxidjon o‘g‘li',

      img: '/img/yetakchilar/20.jpg',

      role: '3-kurs talabasi',

      spec: 'Menejment',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'Toshkent davlat tibbiyot universiteti',
    type: 'davlat',
    leader: {
      slug: 'boboyev-jahongir',

      name: 'Boboyev Jahongir Mirsodiq o‘g‘li',

      img: '/img/yetakchilar/15.jpg',

      role: '2-kurs magistranti',

      spec: 'Travmatologiya, ortopediya va harbiy-dala jarrohligi',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'Toshkent davlat transport universiteti',
    type: 'davlat',
    leader: {
      slug: 'eshmatov-alisher',

      name: 'Eshmatov Alisher Shavkat o‘g‘li',

      img: '/img/yetakchilar/17.jpg',

      role: '1-kurs magistranti',

      spec: 'Uchish apparatlari dvigatellari va energetik qurilmalari',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'Toshkent davlat yuridik universiteti',
    type: 'davlat',
    leader: {
      slug: 'sobirov-umarjon',

      name: 'Sobirov Umarjon Umid o‘g‘li',

      img: '/img/yetakchilar/23.jpg',

      role: 'Tyutor',

      spec: 'Yurist',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'Toshkent farmatsevtika instituti',
    type: 'davlat',
    leader: {
      slug: 'xusanxonov-azizxon',

      name: 'Xusanxonov Azizxon Azimxon o‘g‘li',

      img: '/img/yetakchilar/19.jpg',

      role: '3-kurs talabasi',

      spec: 'Sanoat farmatsiyasi',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: '“Toshkent irrigatsiya va qishloq xo‘jaligini mexanizatsiyalash muhandislari instituti” milliy tadqiqot universiteti',
    type: 'davlat',
    leader: {
      slug: 'tursunkulov-elbek',

      name: 'Tursunkulov Elbek Oybek o‘g‘li',

      img: '/img/yetakchilar/02.jpg',

      role: '3-kurs talabasi',

      spec: 'Yurisprudensiya',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'Toshkent kimyo-texnologiya instituti',
    type: 'davlat',
    leader: {
      slug: 'boriyev-murodjon',

      name: 'Bo‘riyev Murodjon Ibragim o‘g‘li',

      img: '/img/yetakchilar/08.jpg',

      role: 'Yoshlar bilan ishlash, ma’naviyat va ma’rifat bo‘limi uslubchisi',

      spec: 'Texnolog',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'Toshkent to‘qimachilik va yengil sanoat instituti',
    type: 'davlat',
    leader: {
      slug: 'xojamurodov-surxonbek',

      name: 'Xo‘jamurodov Surxonbek Xusan o‘g‘li',

      img: '/img/yetakchilar/16.jpg',

      role: '4-kurs talabasi',

      spec: 'Tikuv buyumlari texnologiyasi',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: '“Yangi O‘zbekiston” universiteti',
    type: 'davlat',
    leader: {
      slug: 'muminov-islomjon',

      name: 'Muminov Islomjon Nozimjonovich',

      img: '/img/yetakchilar/30.jpg',

      role: '3-kurs talabasi',

      spec: 'Iqtisodiyot va ma’lumotlar tahlili',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'Yunus Rajabiy nomidagi o‘zbek milliy musiqa san’ati instituti',
    type: 'davlat',
    leader: {
      slug: 'shaymardonov-shahboz',

      name: 'Shaymardonov Shahboz Iskandar o‘g‘li',

      img: '/img/yetakchilar/04.jpg',

      role: 'Talabalar amaliyoti bo‘limi bosh mutaxassisi',

      spec: 'Aktyorlik san’ati (qo‘g‘irchoq teatri aktyorligi)',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'O‘zbekiston davlat sport akademiyasi',
    type: 'davlat',
    leader: {
      slug: 'sufyanov-daler',

      name: 'Sufyanov Daler Ravshanovich',

      img: '/img/yetakchilar/29.jpg',

      role: '3-kurs talabasi',

      spec: 'Sport faoliyati (suzish)',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'Markaziy Osiyo atrof-muhit va iqlim o‘zgarishini o‘rganish universiteti (Green University)',
    type: 'davlat',
    leader: {
      slug: 'sultonaliyev-xusanboy',

      name: 'Sultonaliyev Xusanboy Sultonali o‘g‘li',

      img: '/img/yetakchilar/26.jpg',

      role: '3-kurs talabasi',

      spec: 'Ekologiya va davlat boshqaruvi',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  { otm: 'O‘zbekiston Respublikasi Huquqni muhofaza qilish akademiyasi', type: 'davlat' },
  { otm: 'Tashkent Tech universiteti', type: 'davlat' },
  {
    otm: 'Soliq oliy maktabi',
    type: 'davlat',
    leader: {
      slug: 'olimbayev-muhammadaziz',

      name: 'Olimbayev Muhammadaziz G‘ulomjon o‘g‘li',

      img: '/img/yetakchilar/31.jpg',

      role: '1-kurs talabasi',

      spec: 'Soliqlar va soliqqa tortish',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  { otm: 'Xalqaro moda akademiyasi', type: 'davlat' },
  {
    otm: 'D.I.Mendeleev nomidagi Rossiya kimyo-texnologiya universitetining Toshkent filiali',
    type: 'xorijiy',
    leader: {
      slug: 'mamasoatov-asliddin',

      name: 'Mamasoatov Asliddin Xasanovich',

      img: '/img/yetakchilar/32.jpg',

      role: 'Monitoring va ichki nazorat sektori bosh mutaxassisi',

      spec: 'Ta’lim muassasalarini boshqarish',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'G.V.Plexanov nomli Rossiya iqtisodiyot universitetining Toshkent filiali',
    type: 'xorijiy',
    leader: {
      slug: 'gordiyenko-anastasiya',

      name: 'Gordiyenko Anastasiya Aleksandrovna',

      img: '/img/yetakchilar/33.jpg',

      role: '3-kurs talabasi',

      spec: 'Jahon iqtisodiyoti va jahon savdosi',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'I.M.Gubkin nomidagi Rossiya davlat neft va gaz universitetining Toshkent filiali',
    type: 'xorijiy',
    leader: {
      slug: 'nuraliyeva-malika',

      name: 'Nuraliyeva Malika Nizomjonovna',

      img: '/img/yetakchilar/34.jpg',

      role: 'Matbuot kotibi',

      spec: 'Filologiya (lingvistika)',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'MEI milliy tadqiqot universitetining Toshkent filiali',
    type: 'xorijiy',
    leader: {
      slug: 'irisaliyeva-kamola',

      name: 'Irisaliyeva Kamola Otabekovna',

      img: '/img/yetakchilar/35.jpg',

      role: '3-kurs talabasi',

      spec: 'Iqtisodiyot',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'MMFI milliy tadqiqot yadro universitetining Toshkent filiali',
    type: 'xorijiy',
    leader: {
      slug: 'raximov-doston',

      name: 'Raximov Doston Doniyor o‘g‘li',

      img: '/img/yetakchilar/36.jpg',

      role: '4-kurs talabasi',

      spec: 'Issiqlik energetikasi va issiqlik texnikasi',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'M.V.Lomonosov nomidagi Moskva davlat universitetining Toshkent filiali',
    type: 'xorijiy',
    leader: {
      slug: 'tilyayev-timofey',

      name: 'Tilyayev Timofey Timurovich',

      img: '/img/yetakchilar/37.jpg',

      role: '3-kurs talabasi',

      spec: 'Psixologiya',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'N.I.Pirogov nomidagi Rossiya milliy tadqiqot tibbiyot universitetining Toshkent filiali',
    type: 'xorijiy',
  },
  { otm: 'Toshkent shahridagi Italiyaning Piza universiteti filiali', type: 'xorijiy' },
  {
    otm: 'Rossiya Federatsiyasi Tashqi ishlar vazirligining Moskva davlat xalqaro munosabatlar instituti (MGIMO) Toshkent filiali',
    type: 'xorijiy',
  },
  { otm: 'Sankt-Peterburg davlat universitetining Toshkent filiali', type: 'xorijiy' },
  {
    otm: 'Toshkent shahridagi Adju universiteti',
    type: 'xorijiy',
    leader: {
      slug: 'abduvoxidov-abduazim',

      name: 'Abduvoxidov Abduazim Abdubori o‘g‘li',

      img: '/img/yetakchilar/38.jpg',

      role: '4-kurs talabasi',

      spec: 'Elektrotexnika va kompyuter muhandisligi',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'Toshkent shahridagi A.I.Gersen nomidagi Rossiya davlat pedagogika universiteti filiali',
    type: 'xorijiy',
    leader: {
      slug: 'dalibayeva-shaxzoda',

      name: 'Dalibayeva Shaxzoda Oralboy qizi',

      img: '/img/yetakchilar/43.jpg',

      role: 'Yoshlar bilan ishlash, ma’naviyat va ma’rifat bo‘limi uslubchisi',

      spec: 'Filologiya va tillarni o‘qitish (rus tili)',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'Toshkent shahridagi Amiti universiteti',
    type: 'xorijiy',
    leader: {
      slug: 'abdisalomova-rano',

      name: 'Abdisalomova Ra’no Komil qizi',

      img: '/img/yetakchilar/45.jpg',

      role: '2-kurs talabasi',

      spec: 'Iqtisodiyot',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'Toshkent shahridagi Inha universiteti',
    type: 'xorijiy',
    leader: {
      slug: 'najmiddinov-xondamir',

      name: 'Najmiddinov Xondamir Kamoliddinovich',

      img: '/img/yetakchilar/39.jpg',

      role: '3-kurs talabasi',

      spec: 'Kompyuter va dasturiy injiniring',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'Toshkent shahridagi Puchon universiteti',
    type: 'xorijiy',
    leader: {
      slug: 'kustikov-ruslan',

      name: 'Kustikov Ruslan Zabixillayevich',

      img: '/img/yetakchilar/44.jpg',

      role: '3-kurs talabasi',

      spec: 'Menejment',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'Toshkent shahridagi S.A.Gerasimov nomidagi Butunrossiya davlat kinematografiya instituti filiali',
    type: 'xorijiy',
    leader: {
      slug: 'mogoch-tamila',

      name: 'Mogoch Tamila Sergeyevna',

      img: '/img/yetakchilar/46.jpg',

      role: '3-kurs talabasi',

      spec: 'Kinooperator',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'Toshkent shahridagi Singapur Menejmentni rivojlantirish instituti',
    type: 'xorijiy',
    leader: {
      slug: 'abdurasulov-javoxirxon',

      name: 'Abdurasulov Javoxirxon Buzruk o‘g‘li',

      img: '/img/yetakchilar/41.jpg',

      role: '4-kurs talabasi',

      spec: 'Bank ishi va moliya',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'Toshkent shahridagi Turin politexnika universiteti',
    type: 'xorijiy',
    leader: {
      slug: 'toxirjonov-baxrom',

      name: 'Toxirjonov Baxrom Baxtiyorjonovich',

      img: '/img/yetakchilar/47.jpg',

      role: '2-kurs talabasi',

      spec: 'Aviatsiya muhandisligi',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'Toshkent shahridagi Turkiyaning Iqtisodiyot va texnologiyalar universiteti filiali',
    type: 'xorijiy',
    leader: {
      slug: 'qaxramonov-ogabek',

      name: 'Qaxramonov Og‘abek Sanjar o‘g‘li',

      img: '/img/yetakchilar/42.jpg',

      role: '3-kurs talabasi',

      spec: 'Iqtisodiyot',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'Toshkent Xalqaro Vestminster universiteti',
    type: 'xorijiy',
    leader: {
      slug: 'imomqulov-jabborbek',

      name: 'Imomqulov Jabborbek Jalol o‘g‘li',

      img: '/img/yetakchilar/40.jpg',

      role: 'Yoshlar masalalari bo‘yicha bo‘lim bosh mutaxassisi',

      spec: 'Moliya',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'Toshkent shahridagi Vebster universitetining ta’lim dasturlarini amalga oshirish Markazi',
    type: 'xorijiy',
    leader: {
      slug: 'irisboyev-islombek',

      name: 'Irisboyev Islombek Otabek o‘g‘li',

      img: '/img/yetakchilar/48.jpg',

      role: '3-kurs talabasi',

      spec: 'Iqtisodiyot',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  { otm: 'O‘zbek-Fransuz universiteti', type: 'xorijiy' },
  {
    otm: 'N.E.Bauman nomidagi Moskva davlat texnika universitetining Toshkent shahridagi filiali',
    type: 'xorijiy',
  },
  {
    otm: 'Toshkent kimyo xalqaro universiteti',
    type: 'nodavlat',
    leader: {
      slug: 'raxmatova-aylin',

      name: 'Raxmatova Aylin Maxamatvaliyevna',

      img: '/img/yetakchilar/63.jpg',

      role: '3-kurs talabasi',

      spec: 'Kosmetologiya',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'Japan Digital University',
    type: 'nodavlat',
    leader: {
      slug: 'qayumjonov-faridun',

      name: 'Qayumjonov Faridun Oxunjonovich',

      img: '/img/yetakchilar/64.jpg',

      role: '2-kurs talabasi',

      spec: 'Grafik dizayner',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'Central Asian University',
    type: 'nodavlat',
    leader: {
      slug: 'muhammadov-mustafo',

      name: 'Muhammadov Mustafo Ma’rufovich',

      img: '/img/yetakchilar/83.jpg',

      role: '2-kurs talabasi',

      spec: 'Xalqaro biznes',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'Tashkent International University',
    type: 'nodavlat',
    leader: {
      slug: 'kurbanaliyev-sardor',

      name: 'Kurbanaliyev Sardor Alidjonovich',

      img: '/img/yetakchilar/84.jpg',

      role: '3-kurs talabasi',

      spec: 'Yurisprudensiya',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'British Management University',
    type: 'nodavlat',
    leader: {
      slug: 'ziyadullayeva-diyora',

      name: 'Ziyadullayeva Diyora Xasanovna',

      img: '/img/yetakchilar/75.jpg',

      role: '3-kurs talabasi',

      spec: 'Menejment',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  { otm: 'TEAM University', type: 'nodavlat' },
  {
    otm: 'Tashkent International University of Education',
    type: 'nodavlat',
    leader: {
      slug: 'halimov-humoyun',

      name: 'Halimov Humoyun Shavkatjon o‘g‘li',

      img: '/img/yetakchilar/65.jpg',

      role: '1-kurs talabasi',

      spec: 'Kiberxavfsizlik',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'Mehnat va ijtimoiy munosabatlar akademiyasi',
    type: 'nodavlat',
    leader: {
      slug: 'ikromov-husan',

      name: 'Ikromov Husan Ali o‘g‘li',

      img: '/img/yetakchilar/76.jpg',

      role: '3-kurs talabasi',

      spec: 'Yurisprudensiya',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'Oriental universiteti',
    type: 'nodavlat',
    leader: {
      slug: 'mehmonqoziyev-murodjon',

      name: 'Mehmonqo‘ziyev Murodjon Ahadjon o‘g‘li',

      img: '/img/yetakchilar/50.jpg',

      role: '4-kurs talabasi',

      spec: 'Filologiya va tillarni o‘qitish (arab tili)',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'Millat umidi universiteti',
    type: 'nodavlat',
    leader: {
      slug: 'iskandarov-yusufbek',

      name: 'Iskandarov Yusufbek Ravshanbekovich',

      img: '/img/yetakchilar/79.jpg',

      role: '2-kurs talabasi',

      spec: 'Xalqaro biznes va moliya',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  { otm: 'STARS International University', type: 'nodavlat' },
  {
    otm: 'TMC Instituti',
    type: 'nodavlat',
    leader: {
      slug: 'badriddinova-nurixon',

      name: 'Badriddinova Nurixon Badriddin qizi',

      img: '/img/yetakchilar/72.jpg',

      role: 'Yoshlar masalalari va ma’naviy-ma’rifiy ishlar bo‘limi mutaxassisi',

      spec: 'Boshlang‘ich ta’lim o‘qituvchisi',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  { otm: 'EMU University', type: 'nodavlat' },
  {
    otm: 'Farmatsevtika ta’lim va tadqiqot instituti',
    type: 'nodavlat',
    leader: {
      slug: 'mahmudjonov-muhammad',

      name: 'Mahmudjonov Muhammad Ali Shuhratjon o‘g‘li',

      img: '/img/yetakchilar/60.jpg',

      role: '3-kurs talabasi',

      spec: 'Sanoat farmatsiyasi',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'International School of Finance Technology and Science',
    type: 'nodavlat',
    leader: {
      slug: 'mamadaliyev-anvarjon',

      name: 'Mamadaliyev Anvarjon Abduqahhor o‘g‘li',

      img: '/img/yetakchilar/53.jpg',

      role: '4-kurs talabasi',

      spec: 'Filologiya va tillarni o‘qitish (ingliz tili)',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'Diplomat University',
    type: 'nodavlat',
    leader: {
      slug: 'rasulov-javoxirbek',

      name: 'Rasulov Javoxirbek Yaxyobek o‘g‘li',

      img: '/img/yetakchilar/66.jpg',

      role: '2-kurs talabasi',

      spec: 'Xalqaro munosabatlar',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'Toshkent amaliy fanlar universiteti',
    type: 'nodavlat',
    leader: {
      slug: 'jamolov-asadbek',

      name: 'Jamolov Asadbek Jo‘rabek o‘g‘li',

      img: '/img/yetakchilar/78.jpg',

      role: '1-kurs magistranti',

      spec: 'Xorijiy til va adabiyoti',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  { otm: 'Profi University', type: 'nodavlat' },
  {
    otm: 'Yangi asr universiteti',
    type: 'nodavlat',
    leader: {
      slug: 'olimjonov-azizbek',

      name: 'Olimjonov Azizbek Oybek o‘g‘li',

      img: '/img/yetakchilar/71.jpg',

      role: '1-kurs talabasi',

      spec: 'Tarix',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'PDP University',
    type: 'nodavlat',
    leader: {
      slug: 'maxamadaminov-shohijahon',

      name: 'Maxamadaminov Shohijahon Ulug‘bek o‘g‘li',

      img: '/img/yetakchilar/81.jpg',

      role: '2-kurs talabasi',

      spec: 'Dasturiy ta’minot ishlab chiqish va dasturlash',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'Fan va texnologiyalar universiteti',
    type: 'nodavlat',
    leader: {
      slug: 'jalilov-abdulvosidxon',

      name: 'Jalilov Abdulvosidxon Muhammad o‘g‘li',

      img: '/img/yetakchilar/55.jpg',

      role: '3-kurs talabasi',

      spec: 'Xorijiy til va adabiyoti',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'Raqamli iqtisodiyot va agrotexnologiyalar universiteti',
    type: 'nodavlat',
    leader: {
      slug: 'meymonova-ruxshona',

      name: 'Meymonova Ruxshona Xudoyberdiyevna',

      img: '/img/yetakchilar/73.jpg',

      role: '3-kurs talabasi',

      spec: 'Biznes',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'Xalqaro Nordik universiteti',
    type: 'nodavlat',
    leader: {
      slug: 'saidanvarxojayeva-farzona',

      name: 'Saidanvarxo‘jayeva Farzona Saydiabror qizi',

      img: '/img/yetakchilar/49.jpg',

      role: '3-kurs talabasi',

      spec: 'Xorijiy til va adabiyoti',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'Alfraganus universiteti',
    type: 'nodavlat',
    leader: {
      slug: 'xabibullayev-boburmirzo',

      name: 'Xabibullayev Boburmirzo Baxtiyor o‘g‘li',

      img: '/img/yetakchilar/51.jpg',

      role: '2-kurs talabasi',

      spec: 'Xalqaro munosabatlar',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'Toshkent ijtimoiy innovatsiya universiteti',
    type: 'nodavlat',
    leader: {
      slug: 'ismoilov-abduvali',

      name: 'Ismoilov Abduvali Xasanboy o‘g‘li',

      img: '/img/yetakchilar/62.jpg',

      role: '3-kurs talabasi',

      spec: 'Moliya va moliyaviy texnologiyalar',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'Digital University',
    type: 'nodavlat',
    leader: {
      slug: 'usmonov-zuxriddin',

      name: 'Usmonov Zuxriddin Jaxongirovich',

      img: '/img/yetakchilar/56.jpg',

      role: '2-kurs talabasi',

      spec: 'Kiberxavfsizlik',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'Toshkent menejment va iqtisodiyot instituti',
    type: 'nodavlat',
    leader: {
      slug: 'sultonov-abdurahmon',

      name: 'Sultonov Abdurahmon Abduqodirovich',

      img: '/img/yetakchilar/59.jpg',

      role: '3-kurs talabasi',

      spec: 'Menejment',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'Perfect University',
    type: 'nodavlat',
    leader: {
      slug: 'qilichev-bunyod',

      name: 'Qilichev Bunyod Ziyodulla o‘g‘li',

      img: '/img/yetakchilar/69.jpg',

      role: '3-kurs talabasi',

      spec: 'Dasturiy injiniring',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'Vatan universiteti',
    type: 'nodavlat',
    leader: {
      slug: 'obidov-mustafojon',

      name: 'Obidov Mustafojon Qurbonzoda',

      img: '/img/yetakchilar/52.jpg',

      role: '1-kurs talabasi',

      spec: 'Iqtisodiyot',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'Toshkent Xalqaro moliyaviy boshqaruv va texnologiyalar universiteti',
    type: 'nodavlat',
    leader: {
      slug: 'pulatov-shaxzodjon',

      name: 'Pulatov Shaxzodjon Siyovush o‘g‘li',

      img: '/img/yetakchilar/54.jpg',

      role: '4-kurs talabasi',

      spec: 'Bank ishi va audit',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'Afrasiab university',
    type: 'nodavlat',
    leader: {
      slug: 'nusrattillayev-abdurahmon',

      name: 'Nusrattillayev Abdurahmon Abduraufovich',

      img: '/img/yetakchilar/74.jpg',

      role: '3-kurs talabasi',

      spec: 'Ingliz tili filologiyasi',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'Renessans ta’lim universiteti',
    type: 'nodavlat',
    leader: {
      slug: 'ashurov-akobir',

      name: 'Ashurov Akobir Raxmat o‘g‘li',

      img: '/img/yetakchilar/82.jpg',

      role: '4-kurs talabasi',

      spec: 'Xalqaro munosabatlar',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'Toshkent iqtisodiyot va texnologiyalar universiteti',
    type: 'nodavlat',
    leader: {
      slug: 'maxammadjonov-oyatillo',

      name: 'Maxammadjonov Oyatillo Dilshod o‘g‘li',

      img: '/img/yetakchilar/57.jpg',

      role: '1-kurs talabasi',

      spec: 'Kompyuter injiniringi',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'Oxus universiteti',
    type: 'nodavlat',
    leader: {
      slug: 'hamidov-abdullo',

      name: 'Hamidov Abdullo Abduqodir o‘g‘li',

      img: '/img/yetakchilar/80.jpg',

      role: '3-kurs talabasi',

      spec: 'Kompyuter ilmlari',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'Tashkent Metropolitan University',
    type: 'nodavlat',
    leader: {
      slug: 'ashirbayev-avazbek',

      name: 'Ashirbayev Avazbek Asanovich',

      img: '/img/yetakchilar/70.jpg',

      role: '2-kurs talabasi',

      spec: 'Huquqshunoslik',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'Sarbon universiteti',
    type: 'nodavlat',
    leader: {
      slug: 'mamatov-sherxon',

      name: 'Mamatov Sherxon Nurali o‘g‘li',

      img: '/img/yetakchilar/58.jpg',

      role: '1-kurs talabasi',

      spec: 'Yurisprudensiya',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'Amerika texnologiyalar universiteti',
    type: 'nodavlat',
    leader: {
      slug: 'nasirova-asilbegim',

      name: 'Nasirova Asilbegim Jura’tovna',

      img: '/img/yetakchilar/61.jpg',

      role: '2-kurs talabasi',

      spec: 'Xalqaro savdo',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  { otm: 'Turkiy davlatlar xalqaro universiteti', type: 'nodavlat' },
  {
    otm: 'Toshkent gumanitar fanlar universiteti',
    type: 'nodavlat',
    leader: {
      slug: 'nosirjonov-muxammadamin',

      name: 'Nosirjonov Muxammadamin Sunnatjon o‘g‘li',

      img: '/img/yetakchilar/67.jpg',

      role: '3-kurs talabasi',

      spec: 'Filologiya va tillarni o‘qitish (arab tili)',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  {
    otm: 'University of Business and Science',
    type: 'nodavlat',
    leader: {
      slug: 'abduraximov-ehsonjon',

      name: 'Abduraximov Ehsonjon Abdulazizzoda',

      img: '/img/yetakchilar/68.jpg',

      role: '3-kurs talabasi',

      spec: 'Filologiya va tillarni o‘qitish (ingliz tili)',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
  { otm: 'IT Park University', type: 'nodavlat' },
  {
    otm: 'Xalqaro ijtimoiy innovatsiyalar universiteti',
    type: 'nodavlat',
    leader: {
      slug: 'baxodirov-shavkatjon',

      name: 'Baxodirov Shavkatjon Toxirjon o‘g‘li',

      img: '/img/yetakchilar/77.jpg',

      role: '1-kurs talabasi',

      spec: 'Yurisprudensiya',
      phone: '',
      email: '',
      telegram: '',
      instagram: '',
      facebook: '',
      about: '',
      elected: '',
      members: '',
      reception: '',
      achievements: [],
    },
  },
]
