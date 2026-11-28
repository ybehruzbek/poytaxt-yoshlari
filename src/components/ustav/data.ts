/**
 * Özbekiston yoşlar ittifoqining Ustavi — Adliya vazirligida 2017-yil 5-iyulda 653p-son bilan qayta
 * davlat röyxatiga olingan rasmiy matn (kirill yozuvidagi asl nusxadan lotinga ögirildi, imlo xatolari tuzatildi).
 */
export type Block = { x: string; li?: true }
export type Clause = { no?: string; blocks: Block[] }
export type Chapter = { n: string; t: string; items: Clause[] }

export const META: string[] = [
  'O‘zbekiston Respublikasi Adliya vazirligi tomonidan 2017-yil 5-iyulda 653p-son bilan qayta davlat ro‘yxatiga olingan',
  'O‘zbekiston “Kamolot” yoshlar ijtimoiy harakatining 2017-yil 30-iyundagi IV Qurultoyi bayoni qarori bilan tasdiqlangan',
]

export const CHAPTERS: Chapter[] = [
  {
    n: 'I',
    t: 'Umumiy qoidalar',
    items: [
      {
        no: '1.1.',
        blocks: [
          {
            x: 'O‘zbekiston yoshlar ittifoqi (keyingi o‘rinlarda – Ittifoq deb yuritiladi) jismonan sog‘lom, ma’nan yetuk va intellektual rivojlangan, mustaqil fikrlaydigan yosh avlodni shakllantirish, yoshlarni tashqi tahdidlar va “ommaviy madaniyat”ning zararli ta’siridan muhofaza qilish, yoshlarning huquq va qonuniy manfaatlarini himoya qilishga har tomonlama ko‘maklashish va shart-sharoitlarni yaratish maqsadida jismoniy shaxslar tomonidan ittifoq tashkiliy-huquqiy shaklida tuzilgan, O‘zbekiston yoshlarini birlashtiruvchi nodavlat notijorat tashkilotidir.',
          },
          {
            x: 'Ittifoq muqaddam O‘zbekiston “Kamolot” yoshlar ijtimoiy harakati nomi bilan 2012-yil 1-iyun kuni qayta ro‘yxatdan o‘tkazilgan va unga 653p-sonli guvohnoma berilgan.',
          },
          {
            x: 'Ittifoq O‘zbekiston “Kamolot” yoshlar ijtimoiy harakatining barcha huquq va majburiyati bo‘yicha huquqiy voris hisoblanadi.',
          },
        ],
      },
      {
        no: '1.2.',
        blocks: [
          {
            x: 'Ittifoq o‘z faoliyatini O‘zbekiston Respublikasi Konstitutsiyasi, O‘zbekiston Respublikasining “Nodavlat notijorat tashkilotlari to‘g‘risida”gi, “Nodavlat notijorat tashkilotlari faoliyatining kafolatlari to‘g‘risida”gi, “Yoshlarga oid davlat siyosati to‘g‘risida”gi qonunlari va nodavlat notijorat tashkilotlari faoliyatini tartibga soluvchi boshqa normativ-huquqiy hujjatlar hamda mazkur Ustavga muvofiq yuritadi.',
          },
        ],
      },
      {
        no: '1.3.',
        blocks: [
          {
            x: 'Ittifoq o‘z faoliyatini ixtiyoriylik, qonuniylik, oshkoralik, a’zolar (ishtirokchilar)ning teng huquqliligi va o‘zini o‘zi boshqarish tamoyillari asosida amalga oshiradi.',
          },
        ],
      },
      {
        no: '1.4.',
        blocks: [
          {
            x: 'Ittifoq davlat ro‘yxatidan o‘tkazilgan kundan boshlab yuridik shaxs maqomiga ega bo‘ladi va unda mol-mulkka ega bo‘lish huquqi mavjud bo‘lib, o‘z majburiyatlari bo‘yicha ana shu mol-mulk bilan javob beradi, o‘z nomidan mulkka oid yoki shaxsiy nomulkiy huquqlarga ega bo‘lishi va amalga oshirishi, majburiyatlarni o‘z zimmasiga olishi, sudda da’vogar yoki javobgar bo‘la olishi mumkin. Ittifoq davlat tilida o‘zining to‘liq rasmiy nomi tushirilgan yumaloq muhr, shtamp, blanklar hamda O‘zbekiston Respublikasi Adliya vazirligidan davlat ro‘yxatidan o‘tgan o‘z ramziga ega bo‘ladi.',
          },
        ],
      },
      {
        no: '1.5.',
        blocks: [
          {
            x: 'Ittifoq a’zolari Ittifoq majburiyatlari bo‘yicha javob bermaydi, o‘z navbatida Ittifoq ham o‘z a’zolarining majburiyatlari bo‘yicha javob bermaydi.',
          },
        ],
      },
      {
        no: '1.6.',
        blocks: [
          {
            x: 'Ittifoq qonun hujjatlariga muvofiq O‘zbekiston Respublikasi hududida yuridik shaxs maqomiga ega bo‘lgan, mazkur Ustav va hududiy tarkibiy tuzilmalar to‘g‘risidagi Nizomga asosan faoliyat yurituvchi alohida bo‘linmalarni, ya’ni Ittifoqning Qoraqalpog‘iston Respublikasi, viloyatlar va Toshkent shahar hududiy bo‘linmalarini (keyingi o‘rinlarda hududiy kengashlarni) hamda Ittifoqning shahar va tuman mahalliy bo‘linmalarini (keyingi o‘rinlarda mahalliy kengashlarni) tashkil etish huquqiga ega.',
          },
        ],
      },
      {
        no: '1.7.',
        blocks: [
          {
            x: 'Ittifoqning doimiy faoliyat ko‘rsatuvchi rahbar organi joylashgan joy (pochta manzili): Toshkent shahri, Shayxontohur tumani, A.Navoiy ko‘chasi, 11-uy.',
          },
        ],
      },
      {
        no: '1.8.',
        blocks: [
          {
            x: 'Ittifoq o‘z faoliyatini O‘zbekiston Respublikasi hududida amalga oshiradi.',
          },
        ],
      },
      {
        no: '1.9.',
        blocks: [
          {
            x: 'Ittifoqning to‘liq nomi:',
          },
          {
            x: 'davlat tilida kirill yozuvida – Ўзбекистон ёшлар иттифоқи;',
            li: true,
          },
          {
            x: 'davlat tilida lotin yozuvida – O‘zbekiston yoshlar ittifoqi;',
            li: true,
          },
          {
            x: 'rus tilida – Союз молодежи Узбекистана;',
            li: true,
          },
          {
            x: 'ingliz tilida – Youth union of Uzbekistan.',
            li: true,
          },
        ],
      },
    ],
  },
  {
    n: 'II',
    t: 'Ittifoqning maqsad va vazifalari',
    items: [
      {
        no: '2.1.',
        blocks: [
          {
            x: 'Ittifoqning asosiy maqsadi yoshlarni mamlakatda amalga oshirilayotgan demokratik, siyosiy va iqtisodiy islohotlarni yanada chuqurlashtirish, jamiyatda tinchlik va hamjihatlikni mustahkamlash, O‘zbekistonni jahonning rivojlangan mamlakatlari qatoriga kirishi jarayonlariga jalb qilish hamda yosh avlodning huquqlari, erkinliklari va qonuniy manfaatlarini samarali himoya qilishni ta’minlash, yigit-qizlarning ma’naviy va kasbiy saviyasini yuksaltirish, ularning intellektual va ijodiy salohiyatini ro‘yobga chiqarishga ko‘maklashishdan iborat.',
          },
        ],
      },
      {
        no: '2.2.',
        blocks: [
          {
            x: 'Ittifoqning asosiy vazifalari quyidagilardan iborat:',
          },
          {
            x: 'barkamol, mustaqil fikrlaydigan, o‘zining hayotiy pozitsiyasi va qat’iy e’tiqodiga ega, jamiyat hayotida munosib o‘rin egallash, mamlakatni isloh qilish, yangilash jarayonlarida hal qiluvchi kuch va tayanch bo‘lishga qodir yoshlarni shakllantirish, ularning siyosiy madaniyati, huquqiy savodxonligi va huquqiy ongini yuksaltirish;',
            li: true,
          },
          {
            x: 'yoshlarni, xususan uyushmagan yoshlarni ma’naviy-axloqiy jihatdan va harbiy vatanparvarlik ruhida tarbiyalash, ularda tarixiy xotira, milliy g‘urur va o‘zlikni anglash, ro‘y berayotgan voqealarga daxldorlik, milliy va umuminsoniy qadriyatlarga hurmat tuyg‘ularini shakllantirish;',
            li: true,
          },
          {
            x: 'yoshlarning huquq va qonuniy manfaatlarini himoya qilish, ularning zamonaviy kasblarni egallashga bo‘lgan intilishini qo‘llab-quvvatlash, tadbirkorlik faoliyatiga jalb qilish;',
            li: true,
          },
          {
            x: 'iste’dodli yoshlarni qo‘llab-quvvatlash, ular o‘z ijodiy va intellektual salohiyatini ro‘yobga chiqarishlari uchun shart-sharoitlar yaratish hamda ilmiy faoliyatga jalb qilish;',
            li: true,
          },
          {
            x: 'yoshlar, xususan uyushmagan yoshlar o‘rtasida sog‘lom turmush tarzi, ekologik madaniyatni shakllantirish, ularni jismoniy tarbiya va sport bilan muntazam shug‘ullanishga keng jalb qilish;',
            li: true,
          },
          {
            x: 'yoshlarni, xususan uyushmagan yoshlarni diniy-ekstremistik va boshqa buzg‘unchi g‘oyalar, tashkilotlar ta’siridan, chetdan “ommaviy madaniyat” niqobi ostida kirib kelayotgan salbiy ta’sir va tahdidlardan asrash, yoshlar o‘rtasida huquqbuzarlik va jinoyatchilikni profilaktika qilish va oldini olishga ko‘maklashish va boshqalar.',
            li: true,
          },
        ],
      },
      {
        no: '2.3.',
        blocks: [
          {
            x: 'Yuqorida sanab o‘tilgan vazifalarni amalga oshirish maqsadida Ittifoq o‘z faoliyatining turli yo‘nalishlari bo‘yicha tegishli chora-tadbirlar Dasturini qabul qilishi mumkin.',
          },
        ],
      },
    ],
  },
  {
    n: 'III',
    t: 'Ittifoqning huquq va majburiyatlari',
    items: [
      {
        no: '3.1.',
        blocks: [
          {
            x: 'Ittifoqning huquqlari quyidagilardan iborat:',
          },
          {
            x: 'jamiyat hayotining turli masalalari bo‘yicha tashabbus ko‘rsatish, davlat hokimiyati va boshqaruvi organlariga takliflar kiritish;',
            li: true,
          },
          {
            x: 'davlat hokimiyati va boshqaruvi organlarining qarorlarini ishlab chiqishda qonunchilikda o‘rnatilgan tartibda ishtirok etish;',
            li: true,
          },
          {
            x: 'o‘z faoliyatiga doir ma’lumotlarni tarqatish;',
            li: true,
          },
          {
            x: 'belgilangan tartibda ommaviy axborot vositalarini ta’sis etish, noshirlik va matbaa faoliyatlari bilan shug‘ullanish;',
            li: true,
          },
          {
            x: 'Ustavda ko‘rsatilgan vazifalarni bajarish maqsadida nodavlat notijorat tashkilotlari, tadbirkorlik sub’ektlari va boshqa turdagi yuridik shaxslarni tashkil qilish;',
            li: true,
          },
          {
            x: 'o‘z ramziy belgilarini va ko‘krak nishonini ta’sis etish;',
            li: true,
          },
          {
            x: 'o‘z faoliyati masalalari bo‘yicha yig‘ilishlar, majlislar, tadbirlar, anjumanlar, seminarlar va davra suhbatlarini o‘tkazish;',
            li: true,
          },
          {
            x: 'qonun hujjatlariga binoan respublika hududida o‘zining hududiy tuzilmalarini ochish.',
            li: true,
          },
          {
            x: 'Ittifoq qonunchilikda ko‘zda tutilgan boshqa huquqlarga ham ega bo‘lishi mumkin.',
          },
        ],
      },
      {
        no: '3.2.',
        blocks: [
          {
            x: 'Ittifoqning majburiyatlari quyidagilardan iborat:',
          },
          {
            x: 'qonun hujjatlarida belgilangan talablarga rioya qilish;',
            li: true,
          },
          {
            x: 'o‘z mol-mulki va pul mablag‘laridan foydalanish to‘g‘risidagi ma’lumotlar ochiqligini ta’minlash;',
            li: true,
          },
          {
            x: 'nodavlat notijorat tashkilotini ro‘yxatga oluvchi organga o‘zi o‘tkazayotgan tadbirlarda qatnashish imkonini berish;',
            li: true,
          },
          {
            x: 'ro‘yxatga oluvchi, soliq va statistika organlariga o‘z faoliyati to‘g‘risidagi hisobotlarni belgilangan tartibda taqdim etish.',
            li: true,
          },
          {
            x: 'Ittifoq zimmasida qonun hujjatlarida ko‘zda tutilgan boshqa majburiyatlar ham bo‘lishi mumkin.',
          },
        ],
      },
    ],
  },
  {
    n: 'IV',
    t: 'Ittifoqqa a’zolik',
    items: [
      {
        no: '4.1.',
        blocks: [
          {
            x: 'Ittifoqqa yuridik va jismoniy shaxslar ushbu Ustavda belgilangan tartibda a’zo bo‘lishi mumkin.',
          },
          {
            x: 'Yuridik va jismoniy shaxslar Ittifoqqa a’zolikka qabul qilinishi uchun tegishli mazmundagi arizani taqdim etadilar.',
          },
        ],
      },
      {
        no: '4.2.',
        blocks: [
          {
            x: 'Ittifoqning maqsadini qo‘llab-quvvatlash istagini bildirgan, 14 yoshga to‘lgan va 30 yoshdan oshmagan O‘zbekiston Respublikasining fuqarolari va O‘zbekiston Respublikasida muntazam yashab kelayotgan fuqaroligi bo‘lmagan jismoniy shaxslar Ittifoqning a’zosi bo‘lishi mumkin.',
          },
        ],
      },
      {
        no: '4.3.',
        blocks: [
          {
            x: 'Ittifoqning jismoniy shaxs bo‘lgan a’zosi Ittifoqning rahbar organlariga saylangan taqdirda unga nisbatan ushbu Ustavning 4.2.-bandida ko‘zda tutilgan yoshga oid cheklov qo‘llanilmaydi.',
          },
        ],
      },
      {
        no: '4.4.',
        blocks: [
          {
            x: 'Jismoniy shaxslarni Ittifoqqa a’zolikka qabul qilish va a’zolikdan chiqarish Ittifoq boshlang‘ich tashkilotining Umumiy yig‘ilishi tomonidan, shuningdek boshlang‘ich tashkilot Kengashining yig‘ilishi (boshlang‘ich tashkilotda Kengash shakllantirilgan taqdirda) tomonidan amalga oshiriladi.',
          },
        ],
      },
      {
        no: '4.5.',
        blocks: [
          {
            x: 'Jismoniy shaxslarni boshlang‘ich tashkilot tegishli rahbar organining a’zolikka qabul qilish va a’zolikdan chiqarish to‘g‘risidagi qarori yakuniy hisoblanadi va Ittifoqning yuqori organlari tomonidan tasdiqlanishi talab qilinmaydi.',
          },
        ],
      },
      {
        no: '4.6.',
        blocks: [
          {
            x: 'Jismoniy shaxslarning Ittifoqqa a’zoligi quyidagi hollarda bekor qilinishi mumkin:',
          },
          {
            x: 'Ittifoq a’zosi arizasiga ko‘ra;',
            li: true,
          },
          {
            x: 'Ittifoq a’zosining yoshi 30 yoshdan oshgach (Ittifoqning rahbar organlariga saylangan shaxslar bundan istisno);',
            li: true,
          },
          {
            x: 'Ittifoq a’zosi tomonidan ushbu Ustavga zid bo‘lgan xatti-harakatlarga yo‘l qo‘yilganda;',
            li: true,
          },
          {
            x: 'Ittifoq a’zosi boshqa chet davlatining fuqaroligini olgan bo‘lsa;',
            li: true,
          },
          {
            x: 'Ittifoq a’zosi sud tomonidan muomalaga layoqatsiz deb topilganda yoki vafot etganda;',
            li: true,
          },
          {
            x: 'Ittifoqning faoliyati tugatilganda.',
            li: true,
          },
        ],
      },
      {
        no: '4.7.',
        blocks: [
          {
            x: 'Yoshlar sohasidagi nodavlat notijorat tashkilotlari, korxona, muassasa va tashkilotlar, markazlar, klublar hamda ta’sis hujjatlari Ittifoqning Ustav maqsadlari, vazifalari va dasturiy hujjatlariga zid bo‘lmagan boshqa yuridik shaxslar Ittifoqqa a’zo bo‘lishi mumkin.',
          },
        ],
      },
      {
        no: '4.8.',
        blocks: [
          {
            x: 'Yuridik shaxslarni Ittifoq a’zoligiga qabul qilish va a’zolikdan chiqarish Ittifoq Markaziy Kengash Ijroiya qo‘mitasining qarori asosida amalga oshiriladi.',
          },
        ],
      },
      {
        no: '4.9.',
        blocks: [
          {
            x: 'Yuridik shaxslarning Ittifoqqa a’zoligi quyidagi hollarda bekor qilinishi mumkin:',
          },
          {
            x: 'Ittifoq a’zosi arizasiga ko‘ra;',
            li: true,
          },
          {
            x: 'Ittifoq a’zosi tomonidan ushbu Ustavga zid bo‘lgan xatti-harakatlarga yo‘l qo‘yilganda;',
            li: true,
          },
          {
            x: 'yuridik shaxs o‘z faoliyatini tugatganda;',
            li: true,
          },
          {
            x: 'Ittifoqning faoliyati tugatilganda.',
            li: true,
          },
        ],
      },
      {
        no: '4.10.',
        blocks: [
          {
            x: 'Ittifoq a’zolari quyidagi huquqlarga ega:',
          },
          {
            x: 'umumiy yig‘ilishlar, konferensiyalar, Qurultoy, Ittifoqning rahbar organlari yig‘ilishlari va Ittifoqning bosma davriy nashrlarida masalalarni muhokama qilish chog‘ida o‘z fikrini erkin ifoda etish;',
            li: true,
          },
          {
            x: 'shaxsan yoki o‘z vakili orqali Ittifoqning saylanadigan organlari qarorlarini ishlab chiqishda ishtirok etish;',
            li: true,
          },
          {
            x: 'Ittifoqning saylanadigan rahbar organlari va nazorat-taftish organlariga saylash va saylanish;',
            li: true,
          },
          {
            x: 'Ittifoq organlari faoliyati to‘g‘risida ma’lumotlar olish, o‘zlariga taalluqli bo‘lgan masalalarni muhokama qilishda Ittifoq organlari faoliyatida ishtirok etish va fikr bildirish;',
            li: true,
          },
          {
            x: 'Ittifoq faoliyatida Ustav doirasida ishtirok etish, Ittifoqning har qanday rahbar organiga ariza va takliflar bilan murojaat etish.',
            li: true,
          },
        ],
      },
      {
        no: '4.11.',
        blocks: [
          {
            x: 'Ittifoq a’zolarining asosiy majburiyatlari quyidagilardan iborat:',
          },
          {
            x: 'Ittifoqning Ustav maqsadlarini amalga oshirishda qatnashish;',
            li: true,
          },
          {
            x: 'yoshlar o‘rtasida va jamiyatda Ittifoqning ta’siri va nufuzini oshirish;',
            li: true,
          },
          {
            x: 'Ittifoq rahbar organlari, boshlang‘ich tashkilotlarning umumiy yig‘ilishlari, shuningdek Kengashi yig‘ilishlari qarorlarini bajarish;',
            li: true,
          },
          {
            x: 'Ittifoqning boshlang‘ich tashkiloti faoliyati va Ittifoqning barcha yo‘nalishlarida faol ishtirok etish.',
            li: true,
          },
        ],
      },
    ],
  },
  {
    n: 'V',
    t: 'Ittifoqning rahbar organlari va ularning vakolatlari',
    items: [
      {
        no: '5.1.',
        blocks: [
          {
            x: 'Ittifoqning rahbar organlariga quyidagilar kiradi:',
          },
          {
            x: 'Qurultoy;',
            li: true,
          },
          {
            x: 'Markaziy Kengash;',
            li: true,
          },
          {
            x: 'Markaziy Kengash Ijroiya qo‘mitasi;',
            li: true,
          },
          {
            x: 'Markaziy nazorat-taftish komissiyasi.',
            li: true,
          },
        ],
      },
      {
        no: '5.2.',
        blocks: [
          {
            x: 'Qurultoy Ittifoqning oliy rahbar organi hisoblanadi. Markaziy Kengash va Markaziy nazorat-taftish komissiyasi hisobotlarini tinglash, ular bo‘yicha qarorlar qabul qilish maqsadida hisobot Qurultoyi bir yilda kamida bir marta, mazkur Ustavda belgilangan boshqa vakolatlari yuzasidan vakolatli Qurultoy besh yilda kamida bir marta chaqiriladi. Qurultoyni chaqirish to‘g‘risidagi qaror Markaziy Kengash yig‘ilishi tomonidan qabul qilinadi. Qurultoyni chaqirish to‘g‘risidagi qaror Markaziy Kengash a’zolarining kamida uchdan ikki qismi uni yoqlab ovoz bergan taqdirda qabul qilingan deb hisoblanadi. Uni chaqirish to‘g‘risidagi qaror va kun tartibi Qurultoydan kamida ikki hafta oldin e’lon qilinadi.',
          },
        ],
      },
      {
        no: '5.3.',
        blocks: [
          {
            x: 'Qurultoyning navbatdan tashqari majlisi Markaziy Kengash yig‘ilishining qarori, shuningdek, Markaziy nazorat-taftish komissiyasi tomonidan yoki Ittifoq a’zolarining kamida o‘n foizi talabiga ko‘ra chaqirilishi mumkin.',
          },
        ],
      },
      {
        no: '5.4.',
        blocks: [
          {
            x: 'Qurultoy Ittifoq faoliyatiga daxldor bo‘lgan barcha masalalarni ko‘rib chiqish va ular bo‘yicha tegishli qarorlarni qabul qilish huquqiga ega.',
          },
          {
            x: 'Qurultoy vakolatiga quyidagilar kiradi:',
          },
          {
            x: 'Ittifoqning yangi tahrirdagi Ustavini tasdiqlash, unga o‘zgartish va qo‘shimchalar kiritish;',
            li: true,
          },
          {
            x: 'Ittifoqni qayta tashkil etish va faoliyatini tugatish to‘g‘risida qaror qabul qilish;',
            li: true,
          },
          {
            x: 'Markaziy Kengash va Markaziy nazorat-taftish komissiyasi hisobotlarini tinglash, ular bo‘yicha qarorlar qabul qilish;',
            li: true,
          },
          {
            x: 'Markaziy Kengash va Markaziy nazorat-taftish komissiyasi tarkibini saylash;',
            li: true,
          },
          {
            x: 'Markaziy Kengash raisi va Markaziy nazorat-taftish komissiyasi raisini besh yil muddatga saylash.',
            li: true,
          },
          {
            x: 'Ustavga o‘zgartish va qo‘shimchalar kiritish, Ittifoqni qayta tashkil etish va faoliyatini tugatish bo‘yicha qarorlar ular uchun Qurultoy delegatlarining uchdan ikki qismi ovoz berganda qabul qilingan deb hisoblanadi. Boshqa masalalar bo‘yicha qarorlar ular uchun Qurultoy delegatlarining ko‘pchiligi ovoz bergan taqdirda qabul qilingan deb hisoblanadi.',
          },
          {
            x: 'Qurultoy uning ishida saylangan delegatlarning uchdan ikki qismi qatnashgan taqdirda, qaror qabul qilishga vakolatli deb hisoblanadi.',
          },
          {
            x: 'Qurultoy delegatlari hududiy Kengashlar konferensiyalarida saylanadi. Qurultoyga saylanadigan delegatlarning vakillik normasi, saylash tartibi, Qurultoy kun tartibi va uning o‘tkazilish sanasi Markaziy Kengash yig‘ilishi tomonidan belgilanadi.',
          },
        ],
      },
      {
        no: '5.5.',
        blocks: [
          {
            x: 'Markaziy Kengash Qurultoylar oralig‘ida Ittifoqning rahbar organi hisoblanadi va oltmish bir kishidan kam bo‘lmagan tarkibda 5 yil muddatga saylanadi.',
          },
        ],
      },
      {
        no: '5.5.1.',
        blocks: [
          {
            x: 'Markaziy Kengash tarkibiga egallab turgan lavozimlariga muvofiq Markaziy Kengash raisi, uning o‘rinbosarlari, Markaziy Kengash apparati moliya-iqtisod, tashkiliy-kadrlar bo‘limi mudirlari, Yoshlar muammolarini o‘rganish va istiqbolli kadrlarni tayyorlash instituti direktori, Ittifoq muassisligidagi markaziy gazetalar bosh muharriri, O‘zbekiston milliy teleradiokompaniyasi “Yoshlar” teleradiokanali aksiyadorlik jamiyati direktori va hududiy kengashlarning raislari kiradi.',
          },
          {
            x: 'Markaziy Kengash tarkibi turli sohalarda, jumladan, ta’lim, fan, madaniyat va san’at, ommaviy axborot vositalari, ishlab chiqarish va xizmat ko‘rsatish, tadbirkorlik va fermerlik, sport, sog‘liqni saqlash va ekologiya sohalarida, Qurolli kuchlar, huquq-tartibot organlari va boshqa turli tashkilotlarda band bo‘lgan yoshlarni o‘z ichiga qamrab oluvchi yoshlarning turli toifalari hisobidan shakllantirilishi lozim. Shuningdek, Markaziy Kengash tarkibiga Ittifoqning hamkor tashkilotlari vakillari hamda katta tajribaga ega bo‘lgan shaxslar kiritilishi mumkin.',
          },
          {
            x: 'Markaziy Kengash tarkibiga har bir hududdan (Qoraqalpog‘iston Respublikasi, viloyatlar va Toshkent shahri) yoshlarning kamida ikki nafar vakili kiritilishi lozim.',
          },
        ],
      },
      {
        no: '5.5.2.',
        blocks: [
          {
            x: 'Markaziy Kengash:',
          },
          {
            x: 'Qurultoy qarorlarining bajarilishi, dasturiy maqsad va vazifalarning amalga oshirilishi, Ittifoq Ustavi talablariga rioya etilishini ta’minlaydi;',
            li: true,
          },
          {
            x: 'yuridik shaxslarning huquq va majburiyatlarini amalga oshirish uchun tashkilot nomidan faoliyat yuritadi;',
            li: true,
          },
          {
            x: 'Markaziy Kengash Ijroiya qo‘mitasi tarkibini saylaydi va uning a’zolari vakolatlarini muddatidan avval tugatadi;',
            li: true,
          },
          {
            x: 'Markaziy Kengash raisi, uning o‘rinbosarlarining yarim yillik va yil yakunlariga doir hisobotlarini tinglaydi, ular o‘rtasida ishlar yo‘nalishlarini taqsimlaydi, vakolatlarini muddatidan oldin tugatadi;',
            li: true,
          },
          {
            x: 'Ittifoq faoliyatining ustuvor yo‘nalishlari bo‘yicha komissiyalarni va ishchi guruhlarni tuzadi, vaqti-vaqti bilan ularning hisobotlarini tinglaydi, yakunlarga tayangan holda tegishli qarorlarni qabul qiladi;',
            li: true,
          },
          {
            x: 'Markaziy Kengashning yillik ish rejasini tasdiqlaydi hamda uning bajarilishi haqidagi hisobotni tinglaydi va hisobot yakunlariga tayangan holda tegishli qarorlarni qabul qiladi;',
            li: true,
          },
          {
            x: 'Ittifoqning umumlashtirilgan byudjetini, Markaziy apparat byudjetini tasdiqlaydi hamda ularning bajarilishi haqidagi hisobotni tinglaydi va hisobot yakunlariga tayangan holda tegishli qarorlarni qabul qiladi;',
            li: true,
          },
          {
            x: 'Ittifoq Markaziy apparati, hududiy hamda mahalliy kengashlar, Ittifoq tomonidan tashkil qilingan tadbirkorlik tuzilmalari, ommaviy axborot vositalari, shu jumladan, yuridik shaxs maqomiga ega bo‘lgan boshlang‘ich tashkilotlarning tashkiliy tuzilmasini va shtat birliklarini tasdiqlaydi, xodimlarning mehnatiga haq to‘lash va mukofotlash tartibini, shaklini va miqdorini belgilaydi;',
            li: true,
          },
          {
            x: 'Ittifoqning ichki me’yoriy hujjatlarini tasdiqlaydi;',
            li: true,
          },
          {
            x: 'Markaziy Kengash vakolatiga kiruvchi ba’zi vazifalarni Ijroiya qo‘mitasi ixtiyoriga havola etish haqida qarorlar qabul qiladi;',
            li: true,
          },
          {
            x: 'Qurultoylar oralig‘ida zimmasiga yuklatilgan vakolat va majburiyatlarni bajara olmagan Markaziy Kengash raisi va uning o‘rinbosarlarini lavozimdan ozod qiladi va navbatdagi Qurultoyga qadar Markaziy Kengash raisi va uning o‘rinbosarlarini saylaydi, shuningdek navbatdagi Qurultoyga qadar Kengash a’zolarini Kengash tarkibidan chiqaradi va Kengash a’zoligiga saylaydi.',
            li: true,
          },
          {
            x: 'Qonun hujjatlari, Ustav va Qurultoy qaroriga ko‘ra boshqa masalalarni hal qiladi.',
          },
        ],
      },
      {
        no: '5.5.3.',
        blocks: [
          {
            x: 'Markaziy Kengash yig‘ilishi har olti oyda kamida bir marta chaqiriladi va a’zolarning uchdan ikki qismi qatnashgan taqdirda qarorlar qabul qilish vakolatiga ega bo‘ladi. Markaziy Kengash a’zolarining ko‘pchiligi ovoz bergan taqdirda Markaziy Kengashning qarorlari qabul qilingan deb hisoblanadi.',
          },
        ],
      },
      {
        no: '5.6.',
        blocks: [
          {
            x: 'Ittifoq faoliyatini tashkil etish masalalari yuzasidan tezkor qarorlar qabul qilish uchun Markaziy Kengash o‘z a’zolari tarkibidan kamida o‘n besh kishidan iborat bo‘lgan Ijroiya qo‘mitasini besh yil muddatga saylaydi. Ijroiya qo‘mitasining tarkibiga egallab turgan lavozimiga ko‘ra Markaziy Kengash raisi, uning o‘rinbosarlari, Markaziy Kengash apparati moliya-iqtisod bo‘limi mudiri, tashkiliy-kadrlar bo‘limi mudiri, Yoshlar muammolarini o‘rganish va istiqbolli kadrlarni tayyorlash instituti direktori, O‘zbekiston milliy teleradiokompaniyasi “Yoshlar” teleradiokanali aksiyadorlik jamiyati direktori va boshqalar kiradi.',
          },
        ],
      },
      {
        no: '5.6.1.',
        blocks: [
          {
            x: 'Markaziy Kengash Ijroiya qo‘mitasi a’zolarining tarkibi Markaziy Kengash qarori bilan belgilanadi.',
          },
        ],
      },
      {
        no: '5.6.2.',
        blocks: [
          {
            x: 'Markaziy Kengash Ijroiya qo‘mitasi:',
          },
          {
            x: 'Ittifoqning hududiy va boshqa tashkiliy bo‘limlari, tadbirkorlik tuzilmalari, ommaviy axborot vositalari va uning to‘liq muassisligidagi yoki qoshidagi boshqa tashkilotlar faoliyatini muvofiqlashtirib boradi;',
            li: true,
          },
          {
            x: 'Markaziy Kengash vakolatiga kiritilmagan Ittifoq va uning alohida bo‘linmalari mol-mulkini tasarruf qilish bilan bog‘liq qarorlar qabul qiladi;',
            li: true,
          },
          {
            x: 'Ittifoq bo‘linmalarini tashkil qilish va tugatish hamda ularning ta’sis hujjatlarini tasdiqlashga oid qarorlar qabul qiladi;',
            li: true,
          },
          {
            x: 'tashkiliy masalalar yuzasidan tezkor qarorlar qabul qilinishini ta’minlaydi, joriy ish rejasini tuzadi, rejalar va qarorlar ijrosi o‘rganilishini tashkillashtiradi, ijrochilar hisobotlarini tinglaydi, yakunlarga tayangan holda tegishli qarorlarni qabul qiladi;',
            li: true,
          },
          {
            x: 'Ittifoqning Dasturida belgilab qo‘yilgan turli yo‘nalishdagi ishlar bo‘yicha loyihalarni amalga oshirish yuzasidan qarorlar qabul qiladi;',
            li: true,
          },
          {
            x: 'xorijiy va xalqaro tashkilotlar bilan hamkorlik aloqalarini o‘rnatish, delegatsiyalarni jo‘natish va qabul qilish yuzasidan qarorlar qabul qiladi;',
            li: true,
          },
          {
            x: 'Markaziy Kengash yig‘ilishlarini chaqiradi, kun tartibini belgilaydi;',
            li: true,
          },
          {
            x: 'Ittifoqning hududiy kengashlari byudjetlari loyihalarini ko‘rib chiqadi va ularni tasdiqlash uchun tavsiya qiladi, ularning ijrosi haqidagi hisobotlarni tinglaydi, yakunlarga tayangan holda tegishli qarorlarni qabul qiladi;',
            li: true,
          },
          {
            x: 'Ittifoqning saylanadigan rahbarlik organlari shtatidagi apparat xodimlarini intizomiy javobgarlikka tortadi;',
            li: true,
          },
          {
            x: 'ichki mehnat tartib-qoidalarini, xodimlarning lavozim yo‘riqnomalarini tasdiqlaydi;',
            li: true,
          },
          {
            x: 'Ittifoqning ichki faoliyatini tartibga soluvchi hujjatlarni tasdiqlaydi;',
            li: true,
          },
          {
            x: 'Ittifoq va uning bo‘linmalari mulkini, mablag‘larini taqsimlash va tasarruf qilish (ushbu yo‘nalishda Markaziy Kengash vakolatiga kiritilgan masalalardan tashqari) hamda grant, tender va boshqa tanlovlarni o‘tkazish, shuningdek, quyi tashkilotlar faoliyatini tekshirish yuzasidan qaror qabul qiladi;',
            li: true,
          },
          {
            x: 'Ittifoqning hududiy va mahalliy kengashlari rahbar organlari, Ijroiya qo‘mitasining qonun hujjatlari va Ustavga zid bo‘lgan qarorlarini bekor qiladi;',
            li: true,
          },
          {
            x: 'Ustav maqsadi va vazifalariga erishish uchun tadbirkorlik tuzilmalarini ta’sis etadi, ularning faoliyatini nazorat qiladi va rahbarlari tayyorlagan hisobotlarni tinglaydi, yakunlarga tayangan holda tegishli qarorlar qabul qiladi;',
            li: true,
          },
          {
            x: 'Markaziy Kengash apparatining ishlar boshqaruvchisi, bosh hisobchi, bo‘lim mudirlarini, Markaziy Kengash tadbirkorlik tuzilmalari, ommaviy axborot vositalari rahbarlari va bosh hisobchilarini lavozimiga tasdiqlaydi va lavozimidan ozod qiladi;',
            li: true,
          },
          {
            x: 'yuqori organlarning qarorlariga oid boshqa masalalarni hal etadi.',
            li: true,
          },
        ],
      },
      {
        no: '5.6.3.',
        blocks: [
          {
            x: 'Markaziy Kengash raisi Ijroiya qo‘mitasining yig‘ilishlarini chaqiradi va ushbu yig‘ilishlarga raislik qiladi.',
          },
          {
            x: 'Markaziy Kengash raisi o‘z majburiyatlarini bajara olmagan taqdirda, Markaziy Kengash Ijroiya qo‘mitasining qaroriga binoan uning vazifasini o‘rinbosarlaridan biri bajarib turadi.',
          },
        ],
      },
      {
        no: '5.6.4.',
        blocks: [
          {
            x: 'Markaziy Kengash raisining vazifalari hamda vakolati doirasiga quyidagilar kiradi:',
          },
          {
            x: 'Ittifoq Ustavi va Dasturi doirasidagi umumiy faoliyatni muvofiqlashtiradi;',
            li: true,
          },
          {
            x: 'Ittifoq va Markaziy Kengash nomidan ishonchnomasiz ish ko‘radi, barcha yuridik va jismoniy shaxslar, shuningdek, xorijiy tashkilotlar oldida Ittifoq manfaatlarini ifodalaydi;',
            li: true,
          },
          {
            x: 'Markaziy Kengash, uning Ijroiya qo‘mitasi, Markaziy Kengash raisi o‘rinbosarlari va apparatining faoliyatiga rahbarlik qiladi, apparat xodimlarini ishga qabul qiladi va egallab turgan lavozimidan ozod qiladi;',
            li: true,
          },
          {
            x: 'shartnomalar tuzadi, shu jumladan, mehnat shartnomalarini tuzadi, ishonchnomalarni beradi, banklarda hisob raqamlari va boshqa hisoblarni ochadi, bank, moliya va boshqa hujjatlarga birinchi imzo huquqidan foydalanadi, barcha xodimlar uchun majburiy bo‘lgan farmoyish beruvchi hujjatlarni chiqaradi;',
            li: true,
          },
          {
            x: 'o‘zining ayrim vakolatlarini Markaziy Kengash Ijroiya qo‘mitasi qarori bilan belgilangan tartibda yo‘nalishlar bo‘yicha Markaziy Kengash raisi o‘rinbosarlariga yuklatadi;',
            li: true,
          },
          {
            x: 'Ittifoq faoliyati doirasidagi Markaziy Kengash va uning Ijroiya qo‘mitasining vakolatiga kirmaydigan boshqa masalalarni hal qiladi.',
            li: true,
          },
        ],
      },
      {
        no: '5.7.',
        blocks: [
          {
            x: 'Markaziy nazorat-taftish komissiyasi Ittifoqning markaziy nazorat qiluvchi organi hisoblanadi.',
          },
        ],
      },
      {
        no: '5.7.1.',
        blocks: [
          {
            x: 'Markaziy nazorat-taftish komissiyasi Qurultoy tomonidan 5 yil muddatga kamida o‘n bir kishidan iborat tarkibda saylanadi va unga hisobot beradi.',
          },
          {
            x: 'Mahalliy (hududiy) tuzilmalarning nazorat-taftish komissiyalari tegishli hisobot-saylov konferensiyalari tomonidan kamida besh kishidan iborat tarkibda saylanadi va unga hisobot beradi.',
          },
          {
            x: 'Bunda Ittifoqning Markaziy nazorat-taftish komissiyasi Ittifoqning va uning hududiy kengashlari, tadbirkorlik tuzilmalari va Ittifoqning ommaviy axborot vositalari faoliyatini nazorat va taftish qilish huquqiga ega. Tekshirishlar natijalariga ko‘ra, u o‘tkazilgan tekshiruv haqida hisobot tuzadi va ko‘rib chiqish hamda tegishli qaror qabul qilish uchun Markaziy Kengash yig‘ilishiga taqdim etadi.',
          },
        ],
      },
      {
        no: '5.7.2.',
        blocks: [
          {
            x: 'Ittifoqning Markaziy nazorat-taftish komissiyasi vakolatlari doirasiga quyidagilar kiradi:',
          },
          {
            x: 'byudjet ijrosini, Ittifoq va uning tuzilmalarining moliyaviy-xo‘jalik faoliyatini tekshirish;',
            li: true,
          },
          {
            x: 'mazkur Ustav qoidalariga rioya qilinishini nazorat qilish;',
            li: true,
          },
          {
            x: 'Ittifoq faoliyatining moliyaviy, tadbirkorlik va boshqa sohalarida qonun hujjatlari buzilish holatlarini oldini olish;',
            li: true,
          },
          {
            x: 'ushbu Ustavga yoki Ittifoq Qurultoyi qarorlariga mos bo‘lmagan hollarda Ittifoqning Markaziy Kengashi, quyi saylanadigan organlari va nazorat-taftish komissiyalarining qarorlarini to‘xtatish haqida tavsiyalar berish;',
            li: true,
          },
          {
            x: 'Ittifoq a’zolari murojaatlarini ko‘rib chiqish;',
            li: true,
          },
          {
            x: 'Ittifoqning moliyaviy-xo‘jalik faoliyatida aniqlangan kamchiliklarni bartaraf etish bo‘yicha takliflar kiritish;',
            li: true,
          },
          {
            x: 'Qurultoy qarorlariga binoan boshqa vakolatlarni bajarish.',
            li: true,
          },
        ],
      },
      {
        no: '5.7.3.',
        blocks: [
          {
            x: 'Moliyaviy-xo‘jalik faoliyati tekshirilganda barcha mansabdor shaxslar va shtatdagi xodimlar Markaziy nazorat-taftish komissiyasi talabiga binoan unga zarur hujjatlarni taqdim etadi.',
          },
        ],
      },
      {
        no: '5.7.4.',
        blocks: [
          {
            x: 'Nazorat-taftish komissiyalari a’zolari Ittifoqning tegishli saylanadigan rahbar organi a’zosi bo‘la olmaydilar. Ittifoqning tegishli saylanadigan rahbar organlari a’zolari ayni paytda nazorat-taftish komissiyasi a’zosi bo‘la olmaydilar.',
          },
        ],
      },
      {
        no: '5.7.5.',
        blocks: [
          {
            x: 'Markaziy nazorat-taftish komissiyasi a’zolari Ittifoq rahbar organlarining barcha darajadagi yig‘ilishlarida maslahat ovozi bilan ishtirok etish huquqiga ega.',
          },
        ],
      },
      {
        no: '5.7.6.',
        blocks: [
          {
            x: 'Markaziy nazorat-taftish komissiyasi o‘z faoliyatini mazkur Ustav, Qurultoy qarorlari va Markaziy nazorat-taftish komissiyasi to‘g‘risidagi Nizom asosida amalga oshiradi.',
          },
        ],
      },
    ],
  },
  {
    n: 'VI',
    t: 'Ittifoqning tuzilmasi',
    items: [
      {
        no: '6.1.',
        blocks: [
          {
            x: 'Ittifoqning tuzilmasiga quyidagilar kiradi:',
          },
          {
            x: 'Ittifoqning Markaziy apparati;',
            li: true,
          },
          {
            x: 'Ittifoqning hududiy tuzilmalari;',
            li: true,
          },
          {
            x: 'Ittifoqning mahalliy tuzilmalari;',
            li: true,
          },
          {
            x: 'Ittifoqning boshlang‘ich tashkilotlari;',
            li: true,
          },
          {
            x: 'Ittifoqning to‘liq muassisligidagi yoki qoshidagi korxona, tashkilot va muassasalar, shu jumladan ommaviy axborot vositalari.',
            li: true,
          },
          {
            x: 'Shuningdek, Ittifoq va uning alohida bo‘linmalari qoshida tegishli ravishda bolalar yo‘nalishi bo‘yicha faoliyat olib boruvchi “Kamalak” sho‘balari (keyingi o‘rinlarda “Kamalak” bolalar tashkiloti va uning bo‘linmalari deb ataladi) tashkil qilinadi. “Kamalak” bolalar tashkiloti va uning bo‘linmalari Ittifoqning alohida bo‘linmasi hisoblanmaydi. Ular Ittifoq va uning alohida bo‘linmalarining sho‘basi hisoblanadi.',
          },
          {
            x: 'Ittifoq belgilangan tartibda o‘zining davriy nashrlari, noshirlik-matbaa korxonalari, kadrlar malakasini oshirish markazlari, tadbirkorlik tuzilmalarini hamda o‘zining ta’sis hujjatlari asosida faoliyat yuritadigan boshqa muassasalarni tashkil etishi mumkin.',
          },
        ],
      },
      {
        no: '6.2.',
        blocks: [
          {
            x: 'Mahalliy va hududiy kengashlar O‘zbekiston Respublikasining ma’muriy-hududiy bo‘linishiga muvofiq tuziladi.',
          },
        ],
      },
      {
        no: '6.2.1.',
        blocks: [
          {
            x: 'Ittifoqning yakka tartibdagi a’zolari ish, o‘qish va xizmat joylarida tuzilishi mumkin bo‘lgan Ittifoqning boshlang‘ich tashkilotlariga birlashadilar.',
          },
        ],
      },
      {
        no: '6.2.2.',
        blocks: [
          {
            x: 'Ittifoqning boshlang‘ich tashkilotlari kamida besh nafar Ittifoq a’zosi (xayrixoh yoshlar) mavjud bo‘lganda, ularning yig‘ilishi qaroriga ko‘ra tuman yoki shahar kengashlari roziligi bilan tuziladi.',
          },
        ],
      },
      {
        no: '6.2.3.',
        blocks: [
          {
            x: 'Markaziy Kengash Ijroiya qo‘mitasi qarori bilan Ittifoqning boshlang‘ich tashkilotlariga yuridik shaxs maqomi berilishi mumkin. Mazkur masalani ko‘rib chiqishda birinchi navbatda uning moliyaviy va boshqa imkoniyatlari hisobga olinadi.',
          },
          {
            x: 'Boshlang‘ich tashkilotlarga yuridik shaxs maqomini berish tartibi alohida lokal me’yoriy-huquqiy hujjat bilan belgilanadi.',
          },
        ],
      },
      {
        no: '6.2.4.',
        blocks: [
          {
            x: 'Ittifoq boshlang‘ich tashkilotining boshlang‘ich tashkilot miqyosidagi yuqori rahbar organi unda hisobda turgan tegishli a’zolarning Umumiy yig‘ilishi yoki Hisobot-saylov yig‘ilishi hisoblanadi.',
          },
          {
            x: 'Umumiy yig‘ilish tegishli boshlang‘ich tashkilotdagi Ittifoq a’zolari soni yuz nafardan oshmagan boshlang‘ich tashkilotlarda bir yilda kamida ikki marotaba o‘tkaziladi hamda unda boshlang‘ich tashkilot hisobida turgan a’zolarning uchdan ikki qismi ishtirok etsa, vakolatli hisoblanadi.',
          },
          {
            x: 'Hisobot-saylov yig‘ilishi Ittifoq a’zolari soni yuz nafardan oshgan boshlang‘ich tashkilotlarda bir yilda bir marotaba o‘tkazilib (oliy ta’lim muassasalari bundan mustasno), unda boshlang‘ich tashkilot hisobida turgan Ittifoq a’zolari orasidan saylangan vakillar (delegatlar) ishtirok etadi.',
          },
          {
            x: 'Oliy ta’lim muassasalaridagi boshlang‘ich tashkilotlarda hisobot-saylov yig‘ilishi kamida ikki yarim yilda bir marotaba o‘tkaziladi.',
          },
        ],
      },
      {
        no: '6.2.5.',
        blocks: [
          {
            x: 'Umumiy yig‘ilish vakolatlari quyidagilardan iborat:',
          },
          {
            x: 'boshlang‘ich tashkilot umumiy faoliyatiga oid qarorlar qabul qilish;',
            li: true,
          },
          {
            x: 'boshlang‘ich tashkilotning yarim yillik va yillik umumiy faoliyati bo‘yicha hisobotini eshitish va baholash;',
            li: true,
          },
          {
            x: 'boshlang‘ich tashkilot yetakchisini ikki yarim yil muddatga saylash;',
            li: true,
          },
          {
            x: 'boshlang‘ich tashkilotning yillik ish rejasini tasdiqlash;',
            li: true,
          },
          {
            x: 'jismoniy shaxslarni Ittifoq a’zoligiga qabul qilish va a’zolikdan chiqarish;',
            li: true,
          },
          {
            x: 'Ittifoqning yuqori tashkilotlari belgilagan kvotaga asosan ularning konferensiyalariga delegatlar saylash;',
            li: true,
          },
          {
            x: 'boshlang‘ich tashkilot faoliyatini tugatish to‘g‘risida qaror qabul qilish.',
            li: true,
          },
        ],
      },
      {
        no: '6.2.6.',
        blocks: [
          {
            x: 'Hisobot-saylov yig‘ilishi vakolatlari quyidagilardan iborat:',
          },
          {
            x: 'boshlang‘ich tashkilotning o‘tgan davrdagi umumiy faoliyati bo‘yicha hisobotini eshitish va baholash;',
            li: true,
          },
          {
            x: 'boshlang‘ich tashkilot Kengashi a’zolari va yetakchisini ikki yarim yil muddatga saylash;',
            li: true,
          },
          {
            x: 'boshlang‘ich tashkilotning yillik ish rejasini tasdiqlash;',
            li: true,
          },
          {
            x: 'Ittifoqning yuqori tashkilotlari belgilagan kvotaga asosan ularning konferensiyalariga delegatlar saylash;',
            li: true,
          },
          {
            x: 'boshlang‘ich tashkilot faoliyatini tugatish to‘g‘risida qaror qabul qilish.',
            li: true,
          },
        ],
      },
      {
        no: '6.2.7.',
        blocks: [
          {
            x: 'Yuz nafardan ortiq a’zosi mavjud bo‘lgan boshlang‘ich tashkilotda uning Hisobot-saylov yig‘ilishi tomonidan kamida yetti kishidan iborat tarkibda Kengash saylanadi. Kengash majlislari ikki oyda kamida bir marta o‘tkaziladi.',
          },
        ],
      },
      {
        no: '6.2.8.',
        blocks: [
          {
            x: 'Boshlang‘ich tashkilot Kengashi vakolatlari va vazifalari doirasiga quyidagilar kiradi:',
          },
          {
            x: 'hisobot-saylov yig‘ilishini chaqirish, uning qarorlari ijrosini ta’minlash;',
            li: true,
          },
          {
            x: 'yuqori tashkilotlardan kelgan topshiriq va tavsiyalarni ko‘rib chiqish va ijrosini ta’minlash;',
            li: true,
          },
          {
            x: 'Kengash a’zolari o‘rtasida majburiyatlarni taqsimlash va hisobotlarini tinglash;',
            li: true,
          },
          {
            x: 'boshlang‘ich tashkilotning quyi tuzilmalarini tashkil etish, faoliyatini muvofiqlashtirib borish;',
            li: true,
          },
          {
            x: 'jismoniy shaxslarni Ittifoq a’zoligiga qabul qilish va a’zolikdan chiqarish;',
            li: true,
          },
          {
            x: 'boshlang‘ich tashkilot ish rejasi va kundalik faoliyatiga oid masalalarni ko‘rib chiqish va qarorlar qabul qilish;',
            li: true,
          },
          {
            x: 'a’zolarning qonuniy manfaatlarini himoya qilishga doir masalalarni ko‘rib chiqish hamda muassasa rahbariyati va yuqori tashkilotlarga takliflar bildirish;',
            li: true,
          },
          {
            x: 'muayyan muvaffaqiyatlarga erishgan a’zolar va sardorlarni moddiy va ma’naviy rag‘batlantirish;',
            li: true,
          },
          {
            x: 'boshlang‘ich tashkilot a’zolari o‘rtasida ko‘rik-tanlovlar, musobaqalar va boshqa tadbirlarni tashkil etish.',
            li: true,
          },
        ],
      },
      {
        no: '6.2.9.',
        blocks: [
          {
            x: 'Boshlang‘ich tashkilot faoliyatiga yetakchi rahbarlik qilib, uning vakolatlari quyidagilardan iborat:',
          },
          {
            x: 'boshlang‘ich tashkilotga rahbarlik qilish;',
            li: true,
          },
          {
            x: 'boshlang‘ich tashkilotdagi a’zolari orasidan yo‘nalish sardorlari (koordinatorlar)ni tayinlash;',
            li: true,
          },
          {
            x: 'ta’lim muassasasi (tashkilot, korxona) ma’muriyati, davlat organlari, fuqarolarning o‘zini o‘zi boshqarish organlari, kasaba uyushmasi tashkilotlari va boshqa jamoat tashkilotlari hamda fuqarolar bilan o‘zaro munosabatlarda boshlang‘ich tashkilot nomidan ish yuritish.',
            li: true,
          },
        ],
      },
      {
        no: '6.2.10.',
        blocks: [
          {
            x: 'Yuridik shaxs maqomiga ega boshlang‘ich tashkilotning yetakchisi – rahbari quyidagi huquqlarga ega:',
          },
          {
            x: 'boshlang‘ich tashkilot nomidan ishonchnomasiz harakat qilish;',
            li: true,
          },
          {
            x: 'boshlang‘ich tashkilotning mol-mulkini vakolati doirasida boshqarish;',
            li: true,
          },
          {
            x: 'boshlang‘ich tashkilot nomidan shartnomalar, shu jumladan, xo‘jalik shartnomalari va mehnat shartnomalarini tuzish;',
            li: true,
          },
          {
            x: 'ishonchnomalar berish;',
            li: true,
          },
          {
            x: 'banklarda hisob raqamlari yoki boshqa raqamlar ochish, barcha bank, moliyaviy va boshqa hujjatlarga birinchi imzo huquqidan foydalanish;',
            li: true,
          },
          {
            x: 'boshlang‘ich tashkilot shtatidagi barcha xodimlar uchun majburiy bo‘lgan ko‘rsatmalar berish, farmoyishlar qabul qilish;',
            li: true,
          },
          {
            x: 'vakolati doirasida O‘zbekiston Respublikasi qonunchiligiga va mazkur Ustavga zid bo‘lmagan harakatlarni amalga oshirish.',
            li: true,
          },
        ],
      },
      {
        no: '6.3.',
        blocks: [
          {
            x: 'Ittifoq mahalliy va hududiy Kengashining tegishli hudud miqyosidagi yuqori rahbar organi ikki yarim yilda kamida bir marta o‘tkaziladigan Konferensiya hisoblanadi. Konferensiya tegishli mahalliy yoki hududiy Kengash yig‘ilishi tomonidan chaqiriladi. Konferensiyalarga saylanadigan delegatlarning vakillik normasi, saylash tartibi va muddatlari Ittifoqning tegishli kengashlari yig‘ilishi tomonidan belgilanadi.',
          },
          {
            x: 'Hududiy Kengash konferensiyasi qatnashchilari-delegatlari tarkibi mahalliy Kengash Konferensiyasi tomonidan saylangan delegatlar va hududiy Kengash yig‘ilishi tomonidan a’zolikka qabul qilingan yuridik shaxslar vakillaridan iborat bo‘ladi. Bunda, hududiy Kengash yig‘ilishi tomonidan a’zolikka qabul qilingan yuridik shaxslar vakillari me’yori hududiy Kengash yig‘ilishi tomonidan belgilanadi.',
          },
          {
            x: 'Mahalliy Kengash konferensiyasi qatnashchilari-delegatlari tarkibi boshlang‘ich tashkilotning yuqori rahbar organi tomonidan saylangan delegatlar va mahalliy Kengash yig‘ilishi tomonidan a’zolikka qabul qilingan yuridik shaxslar vakillaridan iborat bo‘ladi. Bunda, mahalliy Kengash yig‘ilishi tomonidan a’zolikka qabul qilingan yuridik shaxslar vakillari me’yori mahalliy Kengash yig‘ilishi tomonidan belgilanadi.',
          },
        ],
      },
      {
        no: '6.3.1.',
        blocks: [
          {
            x: 'Mahalliy yoki hududiy Kengash Konferensiyasi:',
          },
          {
            x: 'tegishli Kengashning hisobot davri uchun hisobotini tinglaydi va tasdiqlaydi;',
            li: true,
          },
          {
            x: 'tegishli Kengashning kelajakdagi faoliyatining asosiy yo‘nalishlarini belgilaydi;',
            li: true,
          },
          {
            x: 'tegishli Nazorat-taftish komissiyasining hisobotini tinglaydi va tasdiqlaydi;',
            li: true,
          },
          {
            x: 'tegishli Kengash yig‘ilishining kamida yigirma bir nafar kishidan iborat va nazorat-taftish komissiyasining kamida besh kishidan iborat tarkiblarini ikki yarim yil muddatga saylaydi;',
            li: true,
          },
          {
            x: 'tegishli Kengash raisi va uning o‘rinbosarlarini ikki yarim yil muddatga saylaydi;',
            li: true,
          },
          {
            x: 'vakolati doirasiga kiradigan boshqa masalalarni ko‘rib chiqadi.',
            li: true,
          },
        ],
      },
      {
        no: '6.3.2.',
        blocks: [
          {
            x: 'Ittifoqning hududiy va mahalliy Kengashiga Konferensiyalar oralig‘idagi davrga saylanadigan tegishli Kengash yig‘ilishi rahbarlik qiladi.',
          },
          {
            x: 'Kengashning yig‘ilishlari olti oyda kamida bir marta o‘tkazilib, tegishli Kengash raisi tomonidan chaqiriladi.',
          },
        ],
      },
      {
        no: '6.3.3.',
        blocks: [
          {
            x: 'Ittifoqning mahalliy yoki hududiy kengashlari yig‘ilishining vakolatlari va vazifalari quyidagilardan iborat:',
          },
          {
            x: 'yuqori turuvchi organlar tomonidan berilgan topshiriqlar ijrosini ta’minlash yuzasidan qarorlar qabul qilish;',
            li: true,
          },
          {
            x: 'tegishli Kengash faoliyatini muvofiqlashtirish va ishini tashkil etish maqsadida o‘z a’zolari tarkibidan komissiyalar va ishchi guruhlar tuzish, o‘z a’zolari o‘rtasida faoliyat yo‘nalishlarini taqsimlash, ularning ijrosi bo‘yicha hisobotlar eshitish hamda yakunlari yuzasidan tegishli qarorlar qabul qilish;',
            li: true,
          },
          {
            x: 'Ittifoq markaziy apparati bilan kelishgan holda tegishli mahalliy yoki hududiy kengashlar raislarini zarurat bo‘lganda konferensiyalar oralig‘ida saylash;',
            li: true,
          },
          {
            x: 'Ittifoq markaziy apparati bilan kelishgan holda tegishli Kengash apparati bo‘limlari mudirlarini, Ittifoq qaramog‘idagi tashkilotlar (korxonalar, muassasalar) rahbarlarini lavozimiga tasdiqlash va lavozimidan ozod qilish;',
            li: true,
          },
          {
            x: 'Kengashning yillik ish rejasini va uning ijrosi to‘g‘risidagi hisobotni tasdiqlash, tegishli qarorlarni qabul qilish;',
            li: true,
          },
          {
            x: 'Kengash byudjetini va uning ijrosi to‘g‘risidagi hisobotni tasdiqlash, tegishli qarorlarni qabul qilish;',
            li: true,
          },
          {
            x: 'Ittifoqqa jamoa tarzida a’zolarni qabul qilish va a’zolikdan chiqarish;',
            li: true,
          },
          {
            x: 'yuqori turuvchi organlar qaroriga muvofiq vakolati doirasiga kiritilgan boshqa masalalarni hal qilish.',
            li: true,
          },
        ],
      },
      {
        no: '6.3.4.',
        blocks: [
          {
            x: 'Ittifoqning alohida bo‘linmalari huquq va majburiyatlari, mol-mulkni boshqarish borasidagi huquqlari, ularni tashkil etish va tugatish tartibi hamda rahbar organlari bo‘yicha qoidalar ularning Nizomida batafsil ravishda qayd qilinadi.',
          },
        ],
      },
      {
        no: '6.3.5.',
        blocks: [
          {
            x: 'Ittifoqning mahalliy yoki hududiy Kengashi yig‘ilishiga tegishli Kengash raisi rahbarlik qiladi.',
          },
        ],
      },
    ],
  },
  {
    n: 'VII',
    t: 'Ittifoqning mulki va pul mablag‘lari, ularni shakllantirish tartibi',
    items: [
      {
        no: '7.1.',
        blocks: [
          {
            x: 'Ittifoq o‘z tasarrufida binolar, inshootlar, uy-joylar, uskunalar, anjomlar, milliy va xorijiy valyutadagi pul mablag‘lari, qimmatli qog‘ozlar, intellektual mulk va mualliflik huquqlari ob’ektlari, tashkilotlarga (korxona va muassasalarga) va ushbu Ustavda ko‘zda tutilgan faoliyatni moddiy ta’minlash uchun zarur bo‘lgan va o‘z mablag‘lari hisobidan barpo etiladigan boshqa mol-mulkka ega bo‘lishi mumkin.',
          },
        ],
      },
      {
        no: '7.2.',
        blocks: [
          {
            x: 'Ittifoq va uning alohida bo‘linmalari mulkini shakllantirish manbalari quyidagilar hisoblanadi:',
          },
          {
            x: 'jismoniy va yuridik, shu jumladan, xorijiy shaxslarning ixtiyoriy mulkiy badallari va ehsonlari;',
            li: true,
          },
          {
            x: 'tadbirkorlik faoliyatidan olingan va faqat Ustav maqsadlarini bajarish uchun sarflanadigan daromadlar (foyda);',
            li: true,
          },
          {
            x: 'grant, subsidiya, ijtimoiy buyurtma ko‘rinishidagi davlat organlari, jamoat tashkilotlari, shu jumladan, xorijiy va xalqaro tashkilotlar tomonidan yoshlarga oid dastur va loyihalarni amalga oshirish uchun maqsadli kelib tushadigan mablag‘lar;',
            li: true,
          },
          {
            x: 'Ittifoqning bosma nashrlaridan tushadigan mablag‘lar;',
            li: true,
          },
          {
            x: 'qonun hujjatlarida taqiqlanmagan boshqa tushumlar.',
            li: true,
          },
        ],
      },
      {
        no: '7.3.',
        blocks: [
          {
            x: 'Ittifoqning va u tuzgan tuzilmalarning tadbirkorlik hamda boshqa faoliyatidan olingan daromadlari faqat Ustavda belgilangan faoliyatga sarflanadi va Ittifoq a’zolari, ishtirokchilari va xodimlari o‘rtasida taqsimlanmaydi.',
          },
        ],
      },
      {
        no: '7.4.',
        blocks: [
          {
            x: 'Ittifoqning mulki bo‘linmasdir. Ittifoq nomidan mulkka egalik qilish huquqini Markaziy Kengash o‘zining Ijroiya qo‘mitasi orqali amalga oshiradi. Ittifoqning mahalliy va hududiy kengashlari, yuridik shaxs huquqiga ega bo‘lgan boshlang‘ich tashkilotlari, qaramog‘idagi tashkilotlar (korxona va muassasalar) Ittifoqning mol-mulkini o‘z tasarrufidan Markaziy Kengash Ijroiya qo‘mitasining tegishli qarorisiz mustaqil ravishda chiqarishga haqli emas.',
          },
        ],
      },
      {
        no: '7.5.',
        blocks: [
          {
            x: 'Ittifoqning mahalliy va hududiy kengashlari o‘zlariga Markaziy Kengash tomonidan biriktirib qo‘yilgan mulkni operativ boshqarish huquqini amalga oshiradi.',
          },
        ],
      },
    ],
  },
  {
    n: 'VIII',
    t: 'Ittifoqda hisob va hisobot',
    items: [
      {
        no: '8.1.',
        blocks: [
          {
            x: 'Ittifoqning mahalliy kengashlari belgilangan shaklda har oylik moliyaviy hisobot va tasdiqlangan ish rejaning bajarilishi yuzasidan hisobotni keyingi oyning 10-sanasiga qadar hududiy kengashlarga berib boradilar.',
          },
        ],
      },
      {
        no: '8.2.',
        blocks: [
          {
            x: 'Ittifoqning hududiy kengashlari belgilangan tartibda Ittifoqning Markaziy Kengashi apparatiga har choraklik moliyaviy hisobot va tasdiqlangan ish rejaning bajarilishi yuzasidan hisobotni keyingi chorak birinchi oyining 15-sanasiga qadar berib boradilar.',
          },
        ],
      },
      {
        no: '8.3.',
        blocks: [
          {
            x: 'Ittifoq o‘z faoliyati natijalarini hisobga olib boradi va ularni belgilangan tartibda ro‘yxatga oluvchi, soliq va statistika organlariga taqdim etadi.',
          },
        ],
      },
    ],
  },
  {
    n: 'IX',
    t: 'Ittifoq Ustaviga o‘zgartirish va qo‘shimchalar kiritish tartibi',
    items: [
      {
        no: '9.1.',
        blocks: [
          {
            x: 'Ittifoq Ustaviga Qurultoy qarori asosida o‘zgartirish va qo‘shimchalar kiritilishi mumkin.',
          },
        ],
      },
      {
        no: '9.2.',
        blocks: [
          {
            x: 'Ustavga o‘zgartirish va qo‘shimchalar kiritilgandan so‘ng, Ittifoq O‘zbekiston Respublikasi Adliya vazirligi tomonidan qayta davlat ro‘yxatidan o‘tkazilishi lozim.',
          },
        ],
      },
    ],
  },
  {
    n: 'X',
    t: 'Ittifoqni qayta tashkil etish va tugatish tartibi',
    items: [
      {
        no: '10.1.',
        blocks: [
          {
            x: 'Ittifoqni qayta tashkil etish Qurultoy yoki sudning qaroriga muvofiq qo‘shilish, birlashish, bo‘linish, ajralib chiqish va o‘zgarish yo‘li bilan amalga oshiriladi.',
          },
        ],
      },
      {
        no: '10.2.',
        blocks: [
          {
            x: 'Ittifoqni tugatish Qurultoy yoki sudning qaroriga binoan amalga oshiriladi.',
          },
        ],
      },
      {
        no: '10.3.',
        blocks: [
          {
            x: 'Ittifoqni tugatish qonun hujjatlarida nazarda tutilgan tartibda amalga oshiriladi.',
          },
        ],
      },
      {
        no: '10.4.',
        blocks: [
          {
            x: 'Ittifoq tugatilgan taqdirda kreditorlar bilan hisob-kitob yakunlangandan so‘ng, ortib qolgan mol-mulk ushbu Ustav maqsad va vazifalari yo‘lida, xayriya maqsadida yoki qonun hujjatlarida belgilangan boshqa maqsadlarda sarflanadi.',
          },
        ],
      },
    ],
  },
]
