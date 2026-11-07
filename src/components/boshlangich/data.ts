/**
 * “Boşlanğiç taşkilotlar” sahifasi: Toşkent şahridagi oliy taʼlim taşkilotlari (99 ta) va ulardagi
 * Ittifoq boşlanğiç taşkilotlari yoşlar yetakçilari (surat, F.I.Ş., aloqa). Manba: Kengaş apparatining röyxatlari (2026-yil noyabr).
 * Şaxsiy maʼlumotlar (pasport, manzil, tuğilgan sana, şaxsiy telefon) ataylab kiritilmagan.
 * Keyinçalik admin paneldan boşqariladi.
 */

export type OtmType = 'davlat' | 'xorijiy' | 'nodavlat'
/**
 * Aloqa maydonlari — ŞABLON: qiymatni yozsangiz kartada tegişli tugma özi faollaşadi.
 * phone: '+998 90 123-45-67', email: 'nom@pochta.uz', telegram / instagram / facebook: töliq havola (https://…).
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
  davlat: 'Davlat oliy taʼlim taşkiloti',
  xorijiy: 'Xorijiy oliy taʼlim taşkilotining filiali',
  nodavlat: 'Nodavlat oliy taʼlim taşkiloti',
}

/** Rasmiy röyxat tartibida: davlat, xorijiy, nodavlat */
export const OTMS: Otm[] = [
  {
    otm: 'Botir Zokirov nomidagi Milliy estrada sanʼati instituti',
    type: 'davlat',
    leader: {
      slug: 'xoltoyeva-shaxlo',

      name: 'Xoltoyeva Şaxlo Şuxrat qizi',

      img: '/img/yetakchilar/10.jpg',

      role: '2-kurs magistranti',

      spec: 'Estrada orkestri dirijyorligi',
      phone: '+998 93 121-44-55',
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

      name: 'Töxtayev Uluğbek Husniddin öğli',

      img: '/img/yetakchilar/11.jpg',

      role: 'Talabalar turar joyi tarbiyaçi-uslubçisi (Özbekiston Milliy universiteti 2-kurs magistranti)',

      spec: 'Geologiya (faoliyat sohasi böyiça)',
      phone: '+998 93 311-11-49',
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

      name: 'Nodirov Bexzod Baxodiroviç',

      img: '/img/yetakchilar/27.jpg',

      role: '3-kurs talabasi',

      spec: 'Iqtisodiyot',
      phone: '+998 94 954-90-54',
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

      name: 'Risqiboyev Şahzodbek Olimbek öğli',

      img: '/img/yetakchilar/24.jpg',

      role: 'Iqtidorli talabalarning ilmiy-tadqiqot faoliyatini taşkil etiş bölimi boşliği',

      spec: 'Tarixçi',
      phone: '+998 94 846-07-64',
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
    otm: 'Özbekiston davlat jahon tillari universiteti',
    type: 'davlat',
    leader: {
      slug: 'islomova-sevinch',

      name: 'Islomova Sevinç Botirjon qizi',

      img: '/img/yetakchilar/22.jpg',

      role: '3-kurs talabasi',

      spec: 'Xorijiy til va adabiyoti (ingliz tili)',
      phone: '+998 93 148-08-51',
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
    otm: 'Özbekiston davlat konservatoriyasi',
    type: 'davlat',
    leader: {
      slug: 'turajanova-nilufar',

      name: 'Turajanova Nilufar Elmurod qizi',

      img: '/img/yetakchilar/09.jpg',

      role: '2-kurs magistranti',

      spec: 'Akademik xor dirijyorligi',
      phone: '+998 88 333-51-13',
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
    otm: 'Özbekiston davlat sanʼat va madaniyat instituti',
    type: 'davlat',
    leader: {
      slug: 'tursunpolatov-izzatullo',

      name: 'Tursunpölatov Izzatullo Ibrohimjon öğli',

      img: '/img/yetakchilar/13.jpg',

      role: '2-kurs magistranti',

      spec: 'Xalq ijodiyoti (folklor va etnografiya)',
      phone: '+998 94 151-82-32',
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
    otm: 'Özbekiston davlat xoreografiya akademiyasi',
    type: 'davlat',
    leader: {
      slug: 'mirsoliyev-jamshidbek',

      name: 'Mirsoliyev Jamşidbek Sohibjon öğli',

      img: '/img/yetakchilar/12.jpg',

      role: '1-kurs magistranti',

      spec: 'Sanʼatşunoslik',
      phone: '+998 93 737-03-80',
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
    otm: 'Özbekiston jurnalistika va ommaviy kommunikatsiyalar universiteti',
    type: 'davlat',
    leader: {
      slug: 'anvarova-muqaddasxon',

      name: 'Anvarova Muqaddasxon Xomidjon qizi',

      img: '/img/yetakchilar/21.jpg',

      role: '1-kurs magistranti',

      spec: 'Xalqaro jurnalistika',
      phone: '+998 90 409-66-80',
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
    otm: 'Nizomiy nomidagi Özbekiston milliy pedagogika universiteti',
    type: 'davlat',
    leader: {
      slug: 'abdulatipov-azamat',

      name: 'Abdulatipov Azamat Abdulaziz öğli',

      img: '/img/yetakchilar/28.jpg',

      role: '2-kurs talabasi',

      spec: 'Milliy ğoya, maʼnaviyat asoslari va huquq taʼlimi',
      phone: '+998 93 517-49-39',
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
    otm: 'Mirzo Uluğbek nomidagi Özbekiston Milliy universiteti',
    type: 'davlat',
    leader: {
      slug: 'safarov-daler',

      name: 'Safarov Daler Şuhrat öğli',

      img: '/img/yetakchilar/01.jpg',

      role: '2-kurs magistranti',

      spec: 'Geologiya (faoliyat sohasi böyiça)',
      phone: '+998 94 261-01-08',
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
    otm: 'Özbekiston xalqaro islomşunoslik akademiyasi',
    type: 'davlat',
    leader: {
      slug: 'xakimov-abdufattoh',

      name: 'Xakimov Abdufattoh Abdujalil öğli',

      img: '/img/yetakchilar/25.jpg',

      role: '1-kurs magistranti',

      spec: 'Xalqaro munosabatlar',
      phone: '+998 33 001-85-23',
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
    otm: 'Samarqand davlat veterinariya meditsinasi, çorvaçilik va biotexnologiyalar universiteti Toşkent filiali',
    type: 'davlat',
    leader: {
      slug: 'anarbayeva-gulsara',

      name: 'Anarbayeva Gulsara Dilşod qizi',

      img: '/img/yetakchilar/18.jpg',

      role: '1-kurs magistranti',

      spec: 'Qişloq xöjaligi hayvonlarining seleksiyasi va naslçilik',
      phone: '+998 90 132-31-03',
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
    otm: 'Toşkent arxitektura-quriliş universiteti',
    type: 'davlat',
    leader: {
      slug: 'mirzaxmedov-shoxruh',

      name: 'Mirzaxmedov Şoxruh Anvaroviç',

      img: '/img/yetakchilar/03.jpg',

      role: 'Yoşlar masalalari va maʼnaviy-maʼrifiy işlar boşqarmasi yetakçi mutaxassisi',

      spec: 'Uy-joy kommunal xöjaligini taşkil etiş va boşqariş',
      phone: '+998 97 656-19-95',
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
    otm: 'Muhammad al-Xorazmiy nomidagi Toşkent axborot texnologiyalari universiteti',
    type: 'davlat',
    leader: {
      slug: 'qochqarov-urolboy',

      name: 'Qöçqarov Urolboy Xolmurod öğli',

      img: '/img/yetakchilar/14.jpg',

      role: 'Maʼnaviyat va maʼrifat bölimi xodimi',

      spec: 'Mobil aloqa tizimlari',
      phone: '+998 99 467-30-03',
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
    otm: 'Toşkent davlat iqtisodiyot universiteti',
    type: 'davlat',
    leader: {
      slug: 'abduraxmanov-abdulaziz',

      name: 'Abduraxmanov Abdulaziz Xujamurot öğli',

      img: '/img/yetakchilar/06.jpg',

      role: '2-kurs magistranti',

      spec: 'Iqtisodiyot (tarmoqlar va sohalar böyiça)',
      phone: '+998 94 794-68-86',
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
    otm: 'Toşkent davlat özbek tili va adabiyoti universiteti',
    type: 'davlat',
    leader: {
      slug: 'eshbayeva-sevinchbonu',

      name: 'Eşbayeva Sevinçbonu Olim qizi',

      img: '/img/yetakchilar/07.jpg',

      role: '4-kurs talabasi',

      spec: 'Matnşunoslik va adabiy manbaşunoslik',
      phone: '+998 99 107-75-17',
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
    otm: 'Toşkent davlat şarqşunoslik universiteti',
    type: 'davlat',
    leader: {
      slug: 'sobitov-mirshod',

      name: 'Sobitov Mirşod Isoqjon öğli',

      img: '/img/yetakchilar/05.jpg',

      role: '4-kurs talabasi',

      spec: 'Antropologiya',
      phone: '+998 90 813-07-73',
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
    otm: 'Islom Karimov nomidagi Toşkent davlat texnika universiteti',
    type: 'davlat',
    leader: {
      slug: 'zokirjonov-muhammadzoir',

      name: 'Zokirjonov Muhammadzoir Zoxidjon öğli',

      img: '/img/yetakchilar/20.jpg',

      role: '3-kurs talabasi',

      spec: 'Menejment',
      phone: '+998 90 798-79-90',
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
    otm: 'Toşkent davlat tibbiyot universiteti',
    type: 'davlat',
    leader: {
      slug: 'boboyev-jahongir',

      name: 'Boboyev Jahongir Mirsodiq öğli',

      img: '/img/yetakchilar/15.jpg',

      role: '2-kurs magistranti',

      spec: 'Travmatologiya, ortopediya va harbiy-dala jarrohligi',
      phone: '+998 77 008-96-96',
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
    otm: 'Toşkent davlat transport universiteti',
    type: 'davlat',
    leader: {
      slug: 'eshmatov-alisher',

      name: 'Eşmatov Alişer Şavkat öğli',

      img: '/img/yetakchilar/17.jpg',

      role: '1-kurs magistranti',

      spec: 'Uçiş apparatlari dvigatellari va energetik qurilmalari',
      phone: '+998 99 678-40-17',
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
    otm: 'Toşkent davlat yuridik universiteti',
    type: 'davlat',
    leader: {
      slug: 'sobirov-umarjon',

      name: 'Sobirov Umarjon Umid öğli',

      img: '/img/yetakchilar/23.jpg',

      role: 'Tyutor',

      spec: 'Yurist',
      phone: '+998 99 799-95-30',
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
    otm: 'Toşkent farmatsevtika instituti',
    type: 'davlat',
    leader: {
      slug: 'xusanxonov-azizxon',

      name: 'Xusanxonov Azizxon Azimxon öğli',

      img: '/img/yetakchilar/19.jpg',

      role: '3-kurs talabasi',

      spec: 'Sanoat farmatsiyasi',
      phone: '+998 93 726-00-56',
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
    otm: '“Toşkent irrigatsiya va qişloq xöjaligini mexanizatsiyalaş muhandislari instituti” milliy tadqiqot universiteti',
    type: 'davlat',
    leader: {
      slug: 'tursunkulov-elbek',

      name: 'Tursunkulov Elbek Oybek öğli',

      img: '/img/yetakchilar/02.jpg',

      role: '3-kurs talabasi',

      spec: 'Yurisprudensiya',
      phone: '+998 97 350-11-07',
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
    otm: 'Toşkent kimyo-texnologiya instituti',
    type: 'davlat',
    leader: {
      slug: 'boriyev-murodjon',

      name: 'Böriyev Murodjon Ibragim öğli',

      img: '/img/yetakchilar/08.jpg',

      role: 'Yoşlar bilan işlaş, maʼnaviyat va maʼrifat bölimi uslubçisi',

      spec: 'Texnolog',
      phone: '+998 99 804-85-40',
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
    otm: 'Toşkent töqimaçilik va yengil sanoat instituti',
    type: 'davlat',
    leader: {
      slug: 'xojamurodov-surxonbek',

      name: 'Xöjamurodov Surxonbek Xusan öğli',

      img: '/img/yetakchilar/16.jpg',

      role: '4-kurs talabasi',

      spec: 'Tikuv buyumlari texnologiyasi',
      phone: '+998 93 680-80-20',
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
    otm: '“Yangi Özbekiston” universiteti',
    type: 'davlat',
    leader: {
      slug: 'muminov-islomjon',

      name: 'Muminov Islomjon Nozimjonoviç',

      img: '/img/yetakchilar/30.jpg',

      role: '3-kurs talabasi',

      spec: 'Iqtisodiyot va maʼlumotlar tahlili',
      phone: '+998 99 888-51-45',
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
    otm: 'Yunus Rajabiy nomidagi özbek milliy musiqa sanʼati instituti',
    type: 'davlat',
    leader: {
      slug: 'shaymardonov-shahboz',

      name: 'Şaymardonov Şahboz Iskandar öğli',

      img: '/img/yetakchilar/04.jpg',

      role: 'Talabalar amaliyoti bölimi boş mutaxassisi',

      spec: 'Aktyorlik sanʼati (qöğirçoq teatri aktyorligi)',
      phone: '+998 93 248-14-45',
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
    otm: 'Özbekiston davlat sport akademiyasi',
    type: 'davlat',
    leader: {
      slug: 'sufyanov-daler',

      name: 'Sufyanov Daler Ravşanoviç',

      img: '/img/yetakchilar/29.jpg',

      role: '3-kurs talabasi',

      spec: 'Sport faoliyati (suziş)',
      phone: '+998 97 156-40-56',
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
    otm: 'Markaziy Osiyo atrof-muhit va iqlim özgarişini örganiş universiteti (Green University)',
    type: 'davlat',
    leader: {
      slug: 'sultonaliyev-xusanboy',

      name: 'Sultonaliyev Xusanboy Sultonali öğli',

      img: '/img/yetakchilar/26.jpg',

      role: '3-kurs talabasi',

      spec: 'Ekologiya va davlat boşqaruvi',
      phone: '+998 33 292-20-00',
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
  { otm: 'Özbekiston Respublikasi Huquqni muhofaza qiliş akademiyasi', type: 'davlat' },
  { otm: 'Taşkent Tech universiteti', type: 'davlat' },
  {
    otm: 'Soliq oliy maktabi',
    type: 'davlat',
    leader: {
      slug: 'olimbayev-muhammadaziz',

      name: 'Olimbayev Muhammadaziz Ğulomjon öğli',

      img: '/img/yetakchilar/31.jpg',

      role: '1-kurs talabasi',

      spec: 'Soliqlar va soliqqa tortiş',
      phone: '+998 95 755-60-40',
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
    otm: 'D.I.Mendeleev nomidagi Rossiya kimyo-texnologiya universitetining Toşkent filiali',
    type: 'xorijiy',
    leader: {
      slug: 'mamasoatov-asliddin',

      name: 'Mamasoatov Asliddin Xasanoviç',

      img: '/img/yetakchilar/32.jpg',

      role: 'Monitoring va içki nazorat sektori boş mutaxassisi',

      spec: 'Taʼlim muassasalarini boşqariş',
      phone: '+998 99 120-20-55',
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
    otm: 'G.V.Plexanov nomli Rossiya iqtisodiyot universitetining Toşkent filiali',
    type: 'xorijiy',
    leader: {
      slug: 'gordiyenko-anastasiya',

      name: 'Gordiyenko Anastasiya Aleksandrovna',

      img: '/img/yetakchilar/33.jpg',

      role: '3-kurs talabasi',

      spec: 'Jahon iqtisodiyoti va jahon savdosi',
      phone: '+998 90 130-09-12',
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
    otm: 'I.M.Gubkin nomidagi Rossiya davlat neft va gaz universitetining Toşkent filiali',
    type: 'xorijiy',
    leader: {
      slug: 'nuraliyeva-malika',

      name: 'Nuraliyeva Malika Nizomjonovna',

      img: '/img/yetakchilar/34.jpg',

      role: 'Matbuot kotibi',

      spec: 'Filologiya (lingvistika)',
      phone: '+998 90 283-80-75',
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
    otm: 'MEI milliy tadqiqot universitetining Toşkent filiali',
    type: 'xorijiy',
    leader: {
      slug: 'irisaliyeva-kamola',

      name: 'Irisaliyeva Kamola Otabekovna',

      img: '/img/yetakchilar/35.jpg',

      role: '3-kurs talabasi',

      spec: 'Iqtisodiyot',
      phone: '+998 93 788-87-15',
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
    otm: 'MMFI milliy tadqiqot yadro universitetining Toşkent filiali',
    type: 'xorijiy',
    leader: {
      slug: 'raximov-doston',

      name: 'Raximov Doston Doniyor öğli',

      img: '/img/yetakchilar/36.jpg',

      role: '4-kurs talabasi',

      spec: 'Issiqlik energetikasi va issiqlik texnikasi',
      phone: '+998 99 538-25-38',
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
    otm: 'M.V.Lomonosov nomidagi Moskva davlat universitetining Toşkent filiali',
    type: 'xorijiy',
    leader: {
      slug: 'tilyayev-timofey',

      name: 'Tilyayev Timofey Timuroviç',

      img: '/img/yetakchilar/37.jpg',

      role: '3-kurs talabasi',

      spec: 'Psixologiya',
      phone: '+998 90 810-14-92',
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
    otm: 'N.I.Pirogov nomidagi Rossiya milliy tadqiqot tibbiyot universitetining Toşkent filiali',
    type: 'xorijiy',
  },
  { otm: 'Toşkent şahridagi Italiyaning Piza universiteti filiali', type: 'xorijiy' },
  {
    otm: 'Rossiya Federatsiyasi Taşqi işlar vazirligining Moskva davlat xalqaro munosabatlar instituti (MGIMO) Toşkent filiali',
    type: 'xorijiy',
  },
  { otm: 'Sankt-Peterburg davlat universitetining Toşkent filiali', type: 'xorijiy' },
  {
    otm: 'Toşkent şahridagi Adju universiteti',
    type: 'xorijiy',
    leader: {
      slug: 'abduvoxidov-abduazim',

      name: 'Abduvoxidov Abduazim Abdubori öğli',

      img: '/img/yetakchilar/38.jpg',

      role: '4-kurs talabasi',

      spec: 'Elektrotexnika va kompyuter muhandisligi',
      phone: '+998 93 511-68-25',
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
    otm: 'Toşkent şahridagi A.I.Gersen nomidagi Rossiya davlat pedagogika universiteti filiali',
    type: 'xorijiy',
    leader: {
      slug: 'dalibayeva-shaxzoda',

      name: 'Dalibayeva Şaxzoda Oralboy qizi',

      img: '/img/yetakchilar/43.jpg',

      role: 'Yoşlar bilan işlaş, maʼnaviyat va maʼrifat bölimi uslubçisi',

      spec: 'Filologiya va tillarni öqitiş (rus tili)',
      phone: '+998 91 785-99-23',
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
    otm: 'Toşkent şahridagi Amiti universiteti',
    type: 'xorijiy',
    leader: {
      slug: 'abdisalomova-rano',

      name: 'Abdisalomova Raʼno Komil qizi',

      img: '/img/yetakchilar/45.jpg',

      role: '2-kurs talabasi',

      spec: 'Iqtisodiyot',
      phone: '+998 90 911-04-10',
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
    otm: 'Toşkent şahridagi Inha universiteti',
    type: 'xorijiy',
    leader: {
      slug: 'najmiddinov-xondamir',

      name: 'Najmiddinov Xondamir Kamoliddinoviç',

      img: '/img/yetakchilar/39.jpg',

      role: '3-kurs talabasi',

      spec: 'Kompyuter va dasturiy injiniring',
      phone: '+998 91 460-20-27',
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
    otm: 'Toşkent şahridagi Puçon universiteti',
    type: 'xorijiy',
    leader: {
      slug: 'kustikov-ruslan',

      name: 'Kustikov Ruslan Zabixillayeviç',

      img: '/img/yetakchilar/44.jpg',

      role: '3-kurs talabasi',

      spec: 'Menejment',
      phone: '+998 90 000-94-49',
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
    otm: 'Toşkent şahridagi S.A.Gerasimov nomidagi Butunrossiya davlat kinematografiya instituti filiali',
    type: 'xorijiy',
    leader: {
      slug: 'mogoch-tamila',

      name: 'Mogoç Tamila Sergeyevna',

      img: '/img/yetakchilar/46.jpg',

      role: '3-kurs talabasi',

      spec: 'Kinooperator',
      phone: '+998 90 124-32-79',
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
    otm: 'Toşkent şahridagi Singapur Menejmentni rivojlantiriş instituti',
    type: 'xorijiy',
    leader: {
      slug: 'abdurasulov-javoxirxon',

      name: 'Abdurasulov Javoxirxon Buzruk öğli',

      img: '/img/yetakchilar/41.jpg',

      role: '4-kurs talabasi',

      spec: 'Bank işi va moliya',
      phone: '+998 90 777-25-00',
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
    otm: 'Toşkent şahridagi Turin politexnika universiteti',
    type: 'xorijiy',
    leader: {
      slug: 'toxirjonov-baxrom',

      name: 'Toxirjonov Baxrom Baxtiyorjonoviç',

      img: '/img/yetakchilar/47.jpg',

      role: '2-kurs talabasi',

      spec: 'Aviatsiya muhandisligi',
      phone: '+998 90 131-58-55',
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
    otm: 'Toşkent şahridagi Turkiyaning Iqtisodiyot va texnologiyalar universiteti filiali',
    type: 'xorijiy',
    leader: {
      slug: 'qaxramonov-ogabek',

      name: 'Qaxramonov Oğabek Sanjar öğli',

      img: '/img/yetakchilar/42.jpg',

      role: '3-kurs talabasi',

      spec: 'Iqtisodiyot',
      phone: '+998 93 644-51-61',
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
    otm: 'Toşkent Xalqaro Vestminster universiteti',
    type: 'xorijiy',
    leader: {
      slug: 'imomqulov-jabborbek',

      name: 'Imomqulov Jabborbek Jalol öğli',

      img: '/img/yetakchilar/40.jpg',

      role: 'Yoşlar masalalari böyiça bölim boş mutaxassisi',

      spec: 'Moliya',
      phone: '+998 33 715-33-55',
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
    otm: 'Toşkent şahridagi Vebster universitetining taʼlim dasturlarini amalga oşiriş Markazi',
    type: 'xorijiy',
    leader: {
      slug: 'irisboyev-islombek',

      name: 'Irisboyev Islombek Otabek öğli',

      img: '/img/yetakchilar/48.jpg',

      role: '3-kurs talabasi',

      spec: 'Iqtisodiyot',
      phone: '+998 90 933-11-23',
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
  { otm: 'Özbek-Fransuz universiteti', type: 'xorijiy' },
  {
    otm: 'N.E.Bauman nomidagi Moskva davlat texnika universitetining Toşkent şahridagi filiali',
    type: 'xorijiy',
  },
  {
    otm: 'Toşkent kimyo xalqaro universiteti',
    type: 'nodavlat',
    leader: {
      slug: 'raxmatova-aylin',

      name: 'Raxmatova Aylin Maxamatvaliyevna',

      img: '/img/yetakchilar/63.jpg',

      role: '3-kurs talabasi',

      spec: 'Kosmetologiya',
      phone: '+998 97 101-86-68',
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

      name: 'Qayumjonov Faridun Oxunjonoviç',

      img: '/img/yetakchilar/64.jpg',

      role: '2-kurs talabasi',

      spec: 'Grafik dizayner',
      phone: '+998 95 642-44-47',
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

      name: 'Muhammadov Mustafo Maʼrufoviç',

      img: '/img/yetakchilar/83.jpg',

      role: '2-kurs talabasi',

      spec: 'Xalqaro biznes',
      phone: '+998 77 288-99-99',
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
    otm: 'Taşkent International University',
    type: 'nodavlat',
    leader: {
      slug: 'kurbanaliyev-sardor',

      name: 'Kurbanaliyev Sardor Alidjonoviç',

      img: '/img/yetakchilar/84.jpg',

      role: '3-kurs talabasi',

      spec: 'Yurisprudensiya',
      phone: '+998 90 451-53-05',
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
    otm: 'Britiş Management University',
    type: 'nodavlat',
    leader: {
      slug: 'ziyadullayeva-diyora',

      name: 'Ziyadullayeva Diyora Xasanovna',

      img: '/img/yetakchilar/75.jpg',

      role: '3-kurs talabasi',

      spec: 'Menejment',
      phone: '+998 91 827-88-81',
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
    otm: 'Taşkent International University of Education',
    type: 'nodavlat',
    leader: {
      slug: 'halimov-humoyun',

      name: 'Halimov Humoyun Şavkatjon öğli',

      img: '/img/yetakchilar/65.jpg',

      role: '1-kurs talabasi',

      spec: 'Kiberxavfsizlik',
      phone: '+998 70 122-09-05',
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

      name: 'Ikromov Husan Ali öğli',

      img: '/img/yetakchilar/76.jpg',

      role: '3-kurs talabasi',

      spec: 'Yurisprudensiya',
      phone: '+998 95 685-34-39',
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

      name: 'Mehmonqöziyev Murodjon Ahadjon öğli',

      img: '/img/yetakchilar/50.jpg',

      role: '4-kurs talabasi',

      spec: 'Filologiya va tillarni öqitiş (arab tili)',
      phone: '+998 90 013-32-33',
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

      name: 'Iskandarov Yusufbek Ravşanbekoviç',

      img: '/img/yetakchilar/79.jpg',

      role: '2-kurs talabasi',

      spec: 'Xalqaro biznes va moliya',
      phone: '+998 95 933-11-77',
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

      role: 'Yoşlar masalalari va maʼnaviy-maʼrifiy işlar bölimi mutaxassisi',

      spec: 'Boşlanğiç taʼlim öqituvçisi',
      phone: '+998 94 105-35-86',
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
    otm: 'Farmatsevtika taʼlim va tadqiqot instituti',
    type: 'nodavlat',
    leader: {
      slug: 'mahmudjonov-muhammad',

      name: 'Mahmudjonov Muhammad Ali Şuhratjon öğli',

      img: '/img/yetakchilar/60.jpg',

      role: '3-kurs talabasi',

      spec: 'Sanoat farmatsiyasi',
      phone: '+998 94 946-35-99',
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

      name: 'Mamadaliyev Anvarjon Abduqahhor öğli',

      img: '/img/yetakchilar/53.jpg',

      role: '4-kurs talabasi',

      spec: 'Filologiya va tillarni öqitiş (ingliz tili)',
      phone: '+998 94 300-51-21',
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

      name: 'Rasulov Javoxirbek Yaxyobek öğli',

      img: '/img/yetakchilar/66.jpg',

      role: '2-kurs talabasi',

      spec: 'Xalqaro munosabatlar',
      phone: '+998 91 610-45-95',
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
    otm: 'Toşkent amaliy fanlar universiteti',
    type: 'nodavlat',
    leader: {
      slug: 'jamolov-asadbek',

      name: 'Jamolov Asadbek Jörabek öğli',

      img: '/img/yetakchilar/78.jpg',

      role: '1-kurs magistranti',

      spec: 'Xorijiy til va adabiyoti',
      phone: '+998 77 577-55-05',
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

      name: 'Olimjonov Azizbek Oybek öğli',

      img: '/img/yetakchilar/71.jpg',

      role: '1-kurs talabasi',

      spec: 'Tarix',
      phone: '+998 93 775-00-69',
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

      name: 'Maxamadaminov Şohijahon Uluğbek öğli',

      img: '/img/yetakchilar/81.jpg',

      role: '2-kurs talabasi',

      spec: 'Dasturiy taʼminot işlab çiqiş va dasturlaş',
      phone: '+998 93 225-20-27',
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

      name: 'Jalilov Abdulvosidxon Muhammad öğli',

      img: '/img/yetakchilar/55.jpg',

      role: '3-kurs talabasi',

      spec: 'Xorijiy til va adabiyoti',
      phone: '+998 90 307-43-02',
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

      name: 'Meymonova Ruxşona Xudoyberdiyevna',

      img: '/img/yetakchilar/73.jpg',

      role: '3-kurs talabasi',

      spec: 'Biznes',
      phone: '+998 90 808-59-96',
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

      name: 'Saidanvarxöjayeva Farzona Saydiabror qizi',

      img: '/img/yetakchilar/49.jpg',

      role: '3-kurs talabasi',

      spec: 'Xorijiy til va adabiyoti',
      phone: '+998 99 346-29-06',
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

      name: 'Xabibullayev Boburmirzo Baxtiyor öğli',

      img: '/img/yetakchilar/51.jpg',

      role: '2-kurs talabasi',

      spec: 'Xalqaro munosabatlar',
      phone: '+998 90 695-17-05',
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
    otm: 'Toşkent ijtimoiy innovatsiya universiteti',
    type: 'nodavlat',
    leader: {
      slug: 'ismoilov-abduvali',

      name: 'Ismoilov Abduvali Xasanboy öğli',

      img: '/img/yetakchilar/62.jpg',

      role: '3-kurs talabasi',

      spec: 'Moliya va moliyaviy texnologiyalar',
      phone: '+998 97 999-64-00',
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

      name: 'Usmonov Zuxriddin Jaxongiroviç',

      img: '/img/yetakchilar/56.jpg',

      role: '2-kurs talabasi',

      spec: 'Kiberxavfsizlik',
      phone: '+998 20 006-33-06',
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
    otm: 'Toşkent menejment va iqtisodiyot instituti',
    type: 'nodavlat',
    leader: {
      slug: 'sultonov-abdurahmon',

      name: 'Sultonov Abdurahmon Abduqodiroviç',

      img: '/img/yetakchilar/59.jpg',

      role: '3-kurs talabasi',

      spec: 'Menejment',
      phone: '+998 90 069-60-79',
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

      name: 'Qiliçev Bunyod Ziyodulla öğli',

      img: '/img/yetakchilar/69.jpg',

      role: '3-kurs talabasi',

      spec: 'Dasturiy injiniring',
      phone: '+998 90 877-77-65',
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
      phone: '+998 90 954-54-99',
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
    otm: 'Toşkent Xalqaro moliyaviy boşqaruv va texnologiyalar universiteti',
    type: 'nodavlat',
    leader: {
      slug: 'pulatov-shaxzodjon',

      name: 'Pulatov Şaxzodjon Siyovuş öğli',

      img: '/img/yetakchilar/54.jpg',

      role: '4-kurs talabasi',

      spec: 'Bank işi va audit',
      phone: '+998 99 643-47-74',
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

      name: 'Nusrattillayev Abdurahmon Abduraufoviç',

      img: '/img/yetakchilar/74.jpg',

      role: '3-kurs talabasi',

      spec: 'Ingliz tili filologiyasi',
      phone: '+998 93 349-32-00',
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
    otm: 'Renessans taʼlim universiteti',
    type: 'nodavlat',
    leader: {
      slug: 'ashurov-akobir',

      name: 'Aşurov Akobir Raxmat öğli',

      img: '/img/yetakchilar/82.jpg',

      role: '4-kurs talabasi',

      spec: 'Xalqaro munosabatlar',
      phone: '+998 20 000-32-82',
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
    otm: 'Toşkent iqtisodiyot va texnologiyalar universiteti',
    type: 'nodavlat',
    leader: {
      slug: 'maxammadjonov-oyatillo',

      name: 'Maxammadjonov Oyatillo Dilşod öğli',

      img: '/img/yetakchilar/57.jpg',

      role: '1-kurs talabasi',

      spec: 'Kompyuter injiniringi',
      phone: '+998 94 007-24-59',
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

      name: 'Hamidov Abdullo Abduqodir öğli',

      img: '/img/yetakchilar/80.jpg',

      role: '3-kurs talabasi',

      spec: 'Kompyuter ilmlari',
      phone: '+998 94 009-36-27',
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
    otm: 'Taşkent Metropolitan University',
    type: 'nodavlat',
    leader: {
      slug: 'ashirbayev-avazbek',

      name: 'Aşirbayev Avazbek Asanoviç',

      img: '/img/yetakchilar/70.jpg',

      role: '2-kurs talabasi',

      spec: 'Huquqşunoslik',
      phone: '+998 99 468-25-35',
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

      name: 'Mamatov Şerxon Nurali öğli',

      img: '/img/yetakchilar/58.jpg',

      role: '1-kurs talabasi',

      spec: 'Yurisprudensiya',
      phone: '+998 95 534-41-41',
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

      name: 'Nasirova Asilbegim Juraʼtovna',

      img: '/img/yetakchilar/61.jpg',

      role: '2-kurs talabasi',

      spec: 'Xalqaro savdo',
      phone: '+998 97 725-48-50',
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
    otm: 'Toşkent gumanitar fanlar universiteti',
    type: 'nodavlat',
    leader: {
      slug: 'nosirjonov-muxammadamin',

      name: 'Nosirjonov Muxammadamin Sunnatjon öğli',

      img: '/img/yetakchilar/67.jpg',

      role: '3-kurs talabasi',

      spec: 'Filologiya va tillarni öqitiş (arab tili)',
      phone: '+998 99 500-05-10',
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

      spec: 'Filologiya va tillarni öqitiş (ingliz tili)',
      phone: '+998 77 701-80-83',
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

      name: 'Baxodirov Şavkatjon Toxirjon öğli',

      img: '/img/yetakchilar/77.jpg',

      role: '1-kurs talabasi',

      spec: 'Yurisprudensiya',
      phone: '+998 97 860-22-00',
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
