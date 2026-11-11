/**
 * Özbekiston yoşlar ittifoqining Ustavi — Adliya vazirligida 2017-yil 5-iyulda 653p-son bilan qayta
 * davlat röyxatiga olingan rasmiy matn (kirill yozuvidagi asl nusxadan lotinga ögirildi, imlo xatolari tuzatildi).
 */
export type Block = { x: string; li?: true }
export type Clause = { no?: string; blocks: Block[] }
export type Chapter = { n: string; t: string; items: Clause[] }

export const META: string[] = [
  'Özbekiston Respublikasi Adliya vazirligi tomonidan 2017 yil 5 iyulda 653p-son bilan qayta davlat röyxatiga olingan',
  'Özbekiston “Kamolot” yoşlar ijtimoiy harakatining 2017 yil 30 iyundagi IV Qurultoyi bayoni qarori bilan tasdiqlangan',
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
            x: 'Özbekiston yoşlar ittifoqi (keyingi örinlarda – Ittifoq deb yuritiladi) jismonan soğlom, maʼnan yetuk va intellektual rivojlangan, mustaqil fikrlaydigan yoş avlodni şakllantiriş, yoşlarni taşqi tahdidlar va “ommaviy madaniyat”ning zararli taʼsiridan muhofaza qiliş, yoşlarning huquq va qonuniy manfaatlarini himoya qilişga har tomonlama kömaklaşiş va şart-şaroitlarni yaratiş maqsadida jismoniy şaxslar tomonidan ittifoq taşkiliy-huquqiy şaklida tuzilgan, Özbekiston yoşlarini birlaştiruvçi nodavlat notijorat taşkilotidir.',
          },
          {
            x: 'Ittifoq muqaddam Özbekiston “Kamolot” yoşlar ijtimoiy harakati nomi bilan 2012 yil 1 iyun kuni qayta röyxatdan ötkazilgan va unga 653p-sonli guvohnoma berilgan.',
          },
          {
            x: 'Ittifoq Özbekiston “Kamolot” yoşlar ijtimoiy harakatining barça huquq va majburiyati böyiça huquqiy voris hisoblanadi.',
          },
        ],
      },
      {
        no: '1.2.',
        blocks: [
          {
            x: 'Ittifoq öz faoliyatini Özbekiston Respublikasi Konstitutsiyasi, Özbekiston Respublikasining “Nodavlat notijorat taşkilotlari töğrisida”gi, “Nodavlat notijorat taşkilotlari faoliyatining kafolatlari töğrisida”gi, “Yoşlarga oid davlat siyosati töğrisida”gi qonunlari va nodavlat notijorat taşkilotlari faoliyatini tartibga soluvçi boşqa normativ-huquqiy hujjatlar hamda mazkur Ustavga muvofiq yuritadi.',
          },
        ],
      },
      {
        no: '1.3.',
        blocks: [
          {
            x: 'Ittifoq öz faoliyatini ixtiyoriylik, qonuniylik, oşkoralik, aʼzolar (iştirokçilar)ning teng huquqliligi va özini özi boşqariş tamoyillari asosida amalga oşiradi.',
          },
        ],
      },
      {
        no: '1.4.',
        blocks: [
          {
            x: 'Ittifoq davlat röyxatidan ötkazilgan kundan boşlab yuridik şaxs maqomiga ega böladi va unda mol-mulkka ega böliş huquqi mavjud bölib, öz majburiyatlari böyiça ana şu mol-mulk bilan javob beradi, öz nomidan mulkka oid yoki şaxsiy nomulkiy huquqlarga ega bölişi va amalga oşirişi, majburiyatlarni öz zimmasiga olişi, sudda daʼvogar yoki javobgar böla olişi mumkin. Ittifoq davlat tilida özining töliq rasmiy nomi tuşirilgan yumaloq muhr, ştamp, blanklar hamda Özbekiston Respublikasi Adliya vazirligidan davlat röyxatidan ötgan öz ramziga ega böladi.',
          },
        ],
      },
      {
        no: '1.5.',
        blocks: [
          {
            x: 'Ittifoq aʼzolari Ittifoq majburiyatlari böyiça javob bermaydi, öz navbatida Ittifoq ham öz aʼzolarining majburiyatlari böyiça javob bermaydi.',
          },
        ],
      },
      {
        no: '1.6.',
        blocks: [
          {
            x: 'Ittifoq qonun hujjatlariga muvofiq Özbekiston Respublikasi hududida yuridik şaxs maqomiga ega bölgan, mazkur Ustav va hududiy tarkibiy tuzilmalar töğrisidagi Nizomga asosan faoliyat yurituvçi alohida bölinmalarni, yaʼni Ittifoqning Qoraqalpoğiston Respublikasi, viloyatlar va Toşkent şahar hududiy bölinmalarini (keyingi örinlarda hududiy kengaşlarni) hamda Ittifoqning şahar va tuman mahalliy bölinmalarini (keyingi örinlarda mahalliy kengaşlarni) taşkil etiş huquqiga ega.',
          },
        ],
      },
      {
        no: '1.7.',
        blocks: [
          {
            x: 'Ittifoqning doimiy faoliyat körsatuvçi rahbar organi joylaşgan joy (poçta manzili): Toşkent şahri, Şayxontohur tumani, A.Navoiy köçasi, 11-uy.',
          },
        ],
      },
      {
        no: '1.8.',
        blocks: [
          {
            x: 'Ittifoq öz faoliyatini Özbekiston Respublikasi hududida amalga oşiradi.',
          },
        ],
      },
      {
        no: '1.9.',
        blocks: [
          {
            x: 'Ittifoqning töliq nomi:',
          },
          {
            x: 'davlat tilida kirill yozuvida – Ўзбекистон ёшлар иттифоқи;',
            li: true,
          },
          {
            x: 'davlat tilida lotin yozuvida – Özbekiston yoşlar ittifoqi;',
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
            x: 'Ittifoqning asosiy maqsadi yoşlarni mamlakatda amalga oşirilayotgan demokratik, siyosiy va iqtisodiy islohotlarni yanada çuqurlaştiriş, jamiyatda tinçlik va hamjihatlikni mustahkamlaş, Özbekistonni jahonning rivojlangan mamlakatlari qatoriga kirişi jarayonlariga jalb qiliş hamda yoş avlodning huquqlari, erkinliklari va qonuniy manfaatlarini samarali himoya qilişni taʼminlaş, yigit-qizlarning maʼnaviy va kasbiy saviyasini yuksaltiriş, ularning intellektual va ijodiy salohiyatini röyobga çiqarişga kömaklaşişdan iborat.',
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
            x: 'barkamol, mustaqil fikrlaydigan, özining hayotiy pozitsiyasi va qatʼiy eʼtiqodiga ega, jamiyat hayotida munosib örin egallaş, mamlakatni isloh qiliş, yangilaş jarayonlarida hal qiluvçi kuç va tayanç bölişga qodir yoşlarni şakllantiriş, ularning siyosiy madaniyati, huquqiy savodxonligi va huquqiy ongini yuksaltiriş;',
            li: true,
          },
          {
            x: 'yoşlarni, xususan uyuşmagan yoşlarni maʼnaviy-axloqiy jihatdan va harbiy vatanparvarlik ruhida tarbiyalaş, ularda tarixiy xotira, milliy ğurur va özlikni anglaş, röy berayotgan voqealarga daxldorlik, milliy va umuminsoniy qadriyatlarga hurmat tuyğularini şakllantiriş;',
            li: true,
          },
          {
            x: 'yoşlarning huquq va qonuniy manfaatlarini himoya qiliş, ularning zamonaviy kasblarni egallaşga bölgan intilişini qöllab-quvvatlaş, tadbirkorlik faoliyatiga jalb qiliş;',
            li: true,
          },
          {
            x: 'isteʼdodli yoşlarni qöllab-quvvatlaş, ular öz ijodiy va intellektual salohiyatini röyobga çiqarişlari uçun şart-şaroitlar yaratiş hamda ilmiy faoliyatga jalb qiliş;',
            li: true,
          },
          {
            x: 'yoşlar, xususan uyuşmagan yoşlar örtasida soğlom turmuş tarzi, ekologik madaniyatni şakllantiriş, ularni jismoniy tarbiya va sport bilan muntazam şuğullanişga keng jalb qiliş;',
            li: true,
          },
          {
            x: 'yoşlarni, xususan uyuşmagan yoşlarni diniy-ekstremistik va boşqa buzğunçi ğoyalar, taşkilotlar taʼsiridan, çetdan “ommaviy madaniyat” niqobi ostida kirib kelayotgan salbiy taʼsir va tahdidlardan asraş, yoşlar örtasida huquqbuzarlik va jinoyatçilikni profilaktika qiliş va oldini olişga kömaklaşiş va boşqalar.',
            li: true,
          },
        ],
      },
      {
        no: '2.3.',
        blocks: [
          {
            x: 'Yuqorida sanab ötilgan vazifalarni amalga oşiriş maqsadida Ittifoq öz faoliyatining turli yönalişlari böyiça tegişli çora-tadbirlar Dasturini qabul qilişi mumkin.',
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
            x: 'jamiyat hayotining turli masalalari böyiça taşabbus körsatiş, davlat hokimiyati va boşqaruvi organlariga takliflar kiritiş;',
            li: true,
          },
          {
            x: 'davlat hokimiyati va boşqaruvi organlarining qarorlarini işlab çiqişda qonunçilikda örnatilgan tartibda iştirok etiş;',
            li: true,
          },
          {
            x: 'öz faoliyatiga doir maʼlumotlarni tarqatiş;',
            li: true,
          },
          {
            x: 'belgilangan tartibda ommaviy axborot vositalarini taʼsis etiş, noşirlik va matbaa faoliyatlari bilan şuğullaniş;',
            li: true,
          },
          {
            x: 'Ustavda körsatilgan vazifalarni bajariş maqsadida nodavlat notijorat taşkilotlari, tadbirkorlik subʼektlari va boşqa turdagi yuridik şaxslarni taşkil qiliş;',
            li: true,
          },
          {
            x: 'öz ramziy belgilarini va kökrak nişonini taʼsis etiş;',
            li: true,
          },
          {
            x: 'öz faoliyati masalalari böyiça yiğilişlar, majlislar, tadbirlar, anjumanlar, seminarlar va davra suhbatlarini ötkaziş;',
            li: true,
          },
          {
            x: 'qonun hujjatlariga binoan respublika hududida özining hududiy tuzilmalarini oçiş.',
            li: true,
          },
          {
            x: 'Ittifoq qonunçilikda közda tutilgan boşqa huquqlarga ham ega bölişi mumkin.',
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
            x: 'qonun hujjatlarida belgilangan talablarga rioya qiliş;',
            li: true,
          },
          {
            x: 'öz mol-mulki va pul mablağlaridan foydalaniş töğrisidagi maʼlumotlar oçiqligini taʼminlaş;',
            li: true,
          },
          {
            x: 'nodavlat notijorat taşkilotini röyxatga oluvçi organga özi ötkazayotgan tadbirlarda qatnaşiş imkonini beriş;',
            li: true,
          },
          {
            x: 'röyxatga oluvçi, soliq va statistika organlariga öz faoliyati töğrisidagi hisobotlarni belgilangan tartibda taqdim etiş.',
            li: true,
          },
          {
            x: 'Ittifoq zimmasida qonun hujjatlarida közda tutilgan boşqa majburiyatlar ham bölişi mumkin.',
          },
        ],
      },
    ],
  },
  {
    n: 'IV',
    t: 'Ittifoqqa aʼzolik',
    items: [
      {
        no: '4.1.',
        blocks: [
          {
            x: 'Ittifoqqa yuridik va jismoniy şaxslar uşbu Ustavda belgilangan tartibda aʼzo bölişi mumkin.',
          },
          {
            x: 'Yuridik va jismoniy şaxslar Ittifoqqa aʼzolikka qabul qilinişi uçun tegişli mazmundagi arizani taqdim etadilar.',
          },
        ],
      },
      {
        no: '4.2.',
        blocks: [
          {
            x: 'Ittifoqning maqsadini qöllab-quvvatlaş istagini bildirgan, 14 yoşga tölgan va 30 yoşdan oşmagan Özbekiston Respublikasining fuqarolari va Özbekiston Respublikasida muntazam yaşab kelayotgan fuqaroligi bölmagan jismoniy şaxslar Ittifoqning aʼzosi bölişi mumkin.',
          },
        ],
      },
      {
        no: '4.3.',
        blocks: [
          {
            x: 'Ittifoqning jismoniy şaxs bölgan aʼzosi Ittifoqning rahbar organlariga saylangan taqdirda unga nisbatan uşbu Ustavning 4.2.-bandida közda tutilgan yoşga oid çeklov qöllanilmaydi.',
          },
        ],
      },
      {
        no: '4.4.',
        blocks: [
          {
            x: 'Jismoniy şaxslarni Ittifoqqa aʼzolikka qabul qiliş va aʼzolikdan çiqariş Ittifoq boşlanğiç taşkilotining Umumiy yiğilişi tomonidan, şuningdek boşlanğiç taşkilot Kengaşining yiğilişi (boşlanğiç taşkilotda Kengaş şakllantirilgan taqdirda) tomonidan amalga oşiriladi.',
          },
        ],
      },
      {
        no: '4.5.',
        blocks: [
          {
            x: 'Jismoniy şaxslarni boşlanğiç taşkilot tegişli rahbar organining aʼzolikka qabul qiliş va aʼzolikdan çiqariş töğrisidagi qarori yakuniy hisoblanadi va Ittifoqning yuqori organlari tomonidan tasdiqlanişi talab qilinmaydi.',
          },
        ],
      },
      {
        no: '4.6.',
        blocks: [
          {
            x: 'Jismoniy şaxslarning Ittifoqqa aʼzoligi quyidagi hollarda bekor qilinişi mumkin:',
          },
          {
            x: 'Ittifoq aʼzosi arizasiga köra;',
            li: true,
          },
          {
            x: 'Ittifoq aʼzosining yoşi 30 yoşdan oşgaç (Ittifoqning rahbar organlariga saylangan şaxslar bundan istisno);',
            li: true,
          },
          {
            x: 'Ittifoq aʼzosi tomonidan uşbu Ustavga zid bölgan xatti-harakatlarga yöl qöyilganda;',
            li: true,
          },
          {
            x: 'Ittifoq aʼzosi boşqa çet davlatining fuqaroligini olgan bölsa;',
            li: true,
          },
          {
            x: 'Ittifoq aʼzosi sud tomonidan muomalaga layoqatsiz deb topilganda yoki vafot etganda;',
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
            x: 'Yoşlar sohasidagi nodavlat notijorat taşkilotlari, korxona, muassasa va taşkilotlar, markazlar, klublar hamda taʼsis hujjatlari Ittifoqning Ustav maqsadlari, vazifalari va dasturiy hujjatlariga zid bölmagan boşqa yuridik şaxslar Ittifoqqa aʼzo bölişi mumkin.',
          },
        ],
      },
      {
        no: '4.8.',
        blocks: [
          {
            x: 'Yuridik şaxslarni Ittifoq aʼzoligiga qabul qiliş va aʼzolikdan çiqariş Ittifoq Markaziy Kengaş Ijroiya qömitasining qarori asosida amalga oşiriladi.',
          },
        ],
      },
      {
        no: '4.9.',
        blocks: [
          {
            x: 'Yuridik şaxslarning Ittifoqqa aʼzoligi quyidagi hollarda bekor qilinişi mumkin:',
          },
          {
            x: 'Ittifoq aʼzosi arizasiga köra;',
            li: true,
          },
          {
            x: 'Ittifoq aʼzosi tomonidan uşbu Ustavga zid bölgan xatti-harakatlarga yöl qöyilganda;',
            li: true,
          },
          {
            x: 'yuridik şaxs öz faoliyatini tugatganda;',
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
            x: 'Ittifoq aʼzolari quyidagi huquqlarga ega:',
          },
          {
            x: 'umumiy yiğilişlar, konferensiyalar, Qurultoy, Ittifoqning rahbar organlari yiğilişlari va Ittifoqning bosma davriy naşrlarida masalalarni muhokama qiliş çoğida öz fikrini erkin ifoda etiş;',
            li: true,
          },
          {
            x: 'şaxsan yoki öz vakili orqali Ittifoqning saylanadigan organlari qarorlarini işlab çiqişda iştirok etiş;',
            li: true,
          },
          {
            x: 'Ittifoqning saylanadigan rahbar organlari va nazorat-taftiş organlariga saylaş va saylaniş;',
            li: true,
          },
          {
            x: 'Ittifoq organlari faoliyati töğrisida maʼlumotlar oliş, özlariga taalluqli bölgan masalalarni muhokama qilişda Ittifoq organlari faoliyatida iştirok etiş va fikr bildiriş;',
            li: true,
          },
          {
            x: 'Ittifoq faoliyatida Ustav doirasida iştirok etiş, Ittifoqning har qanday rahbar organiga ariza va takliflar bilan murojaat etiş.',
            li: true,
          },
        ],
      },
      {
        no: '4.11.',
        blocks: [
          {
            x: 'Ittifoq aʼzolarining asosiy majburiyatlari quyidagilardan iborat:',
          },
          {
            x: 'Ittifoqning Ustav maqsadlarini amalga oşirişda qatnaşiş;',
            li: true,
          },
          {
            x: 'yoşlar örtasida va jamiyatda Ittifoqning taʼsiri va nufuzini oşiriş;',
            li: true,
          },
          {
            x: 'Ittifoq rahbar organlari, boşlanğiç taşkilotlarning umumiy yiğilişlari, şuningdek Kengaşi yiğilişlari qarorlarini bajariş;',
            li: true,
          },
          {
            x: 'Ittifoqning boşlanğiç taşkiloti faoliyati va Ittifoqning barça yönalişlarida faol iştirok etiş.',
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
            x: 'Markaziy Kengaş;',
            li: true,
          },
          {
            x: 'Markaziy Kengaş Ijroiya qömitasi;',
            li: true,
          },
          {
            x: 'Markaziy nazorat-taftiş komissiyasi.',
            li: true,
          },
        ],
      },
      {
        no: '5.2.',
        blocks: [
          {
            x: 'Qurultoy Ittifoqning oliy rahbar organi hisoblanadi. Markaziy Kengaş va Markaziy nazorat-taftiş komissiyasi hisobotlarini tinglaş, ular böyiça qarorlar qabul qiliş maqsadida hisobot Qurultoyi bir yilda kamida bir marta, mazkur Ustavda belgilangan boşqa vakolatlari yuzasidan vakolatli Qurultoy beş yilda kamida bir marta çaqiriladi. Qurultoyni çaqiriş töğrisidagi qaror Markaziy Kengaş yiğilişi tomonidan qabul qilinadi. Qurultoyni çaqiriş töğrisidagi qaror Markaziy Kengaş aʼzolarining kamida uçdan ikki qismi uni yoqlab ovoz bergan taqdirda qabul qilingan deb hisoblanadi. Uni çaqiriş töğrisidagi qaror va kun tartibi Qurultoydan kamida ikki hafta oldin eʼlon qilinadi.',
          },
        ],
      },
      {
        no: '5.3.',
        blocks: [
          {
            x: 'Qurultoyning navbatdan taşqari majlisi Markaziy Kengaş yiğilişining qarori, şuningdek, Markaziy nazorat-taftiş komissiyasi tomonidan yoki Ittifoq aʼzolarining kamida ön foizi talabiga köra çaqirilişi mumkin.',
          },
        ],
      },
      {
        no: '5.4.',
        blocks: [
          {
            x: 'Qurultoy Ittifoq faoliyatiga daxldor bölgan barça masalalarni körib çiqiş va ular böyiça tegişli qarorlarni qabul qiliş huquqiga ega.',
          },
          {
            x: 'Qurultoy vakolatiga quyidagilar kiradi:',
          },
          {
            x: 'Ittifoqning yangi tahrirdagi Ustavini tasdiqlaş, unga özgartiş va qöşimçalar kiritiş;',
            li: true,
          },
          {
            x: 'Ittifoqni qayta taşkil etiş va faoliyatini tugatiş töğrisida qaror qabul qiliş;',
            li: true,
          },
          {
            x: 'Markaziy Kengaş va Markaziy nazorat-taftiş komissiyasi hisobotlarini tinglaş, ular böyiça qarorlar qabul qiliş;',
            li: true,
          },
          {
            x: 'Markaziy Kengaş va Markaziy nazorat-taftiş komissiyasi tarkibini saylaş;',
            li: true,
          },
          {
            x: 'Markaziy Kengaş raisi va Markaziy nazorat-taftiş komissiyasi raisini beş yil muddatga saylaş.',
            li: true,
          },
          {
            x: 'Ustavga özgartiş va qöşimçalar kiritiş, Ittifoqni qayta taşkil etiş va faoliyatini tugatiş böyiça qarorlar ular uçun Qurultoy delegatlarining uçdan ikki qismi ovoz berganda qabul qilingan deb hisoblanadi. Boşqa masalalar böyiça qarorlar ular uçun Qurultoy delegatlarining köpçiligi ovoz bergan taqdirda qabul qilingan deb hisoblanadi.',
          },
          {
            x: 'Qurultoy uning işida saylangan delegatlarning uçdan ikki qismi qatnaşgan taqdirda, qaror qabul qilişga vakolatli deb hisoblanadi.',
          },
          {
            x: 'Qurultoy delegatlari hududiy Kengaşlar konferensiyalarida saylanadi. Qurultoyga saylanadigan delegatlarning vakillik normasi, saylaş tartibi, Qurultoy kun tartibi va uning ötkaziliş sanasi Markaziy Kengaş yiğilişi tomonidan belgilanadi.',
          },
        ],
      },
      {
        no: '5.5.',
        blocks: [
          {
            x: 'Markaziy Kengaş Qurultoylar oraliğida Ittifoqning rahbar organi hisoblanadi va oltmiş bir kişidan kam bölmagan tarkibda 5 yil muddatga saylanadi.',
          },
        ],
      },
      {
        no: '5.5.1.',
        blocks: [
          {
            x: 'Markaziy Kengaş tarkibiga egallab turgan lavozimlariga muvofiq Markaziy Kengaş raisi, uning örinbosarlari, Markaziy Kengaş apparati moliya-iqtisod, taşkiliy-kadrlar bölimi mudirlari, Yoşlar muammolarini örganiş va istiqbolli kadrlarni tayyorlaş instituti direktori, Ittifoq muassisligidagi markaziy gazetalar boş muharriri, Özbekiston milliy teleradiokompaniyasi “Yoşlar” teleradiokanali aksiyadorlik jamiyati direktori va hududiy kengaşlarning raislari kiradi.',
          },
          {
            x: 'Markaziy Kengaş tarkibi turli sohalarda, jumladan, taʼlim, fan, madaniyat va sanʼat, ommaviy axborot vositalari, işlab çiqariş va xizmat körsatiş, tadbirkorlik va fermerlik, sport, soğliqni saqlaş va ekologiya sohalarida, Qurolli kuçlar, huquq-tartibot organlari va boşqa turli taşkilotlarda band bölgan yoşlarni öz içiga qamrab oluvçi yoşlarning turli toifalari hisobidan şakllantirilişi lozim. Şuningdek, Markaziy Kengaş tarkibiga Ittifoqning hamkor taşkilotlari vakillari hamda katta tajribaga ega bölgan şaxslar kiritilişi mumkin.',
          },
          {
            x: 'Markaziy Kengaş tarkibiga har bir hududdan (Qoraqalpoğiston Respublikasi, viloyatlar va Toşkent şahri) yoşlarning kamida ikki nafar vakili kiritilişi lozim.',
          },
        ],
      },
      {
        no: '5.5.2.',
        blocks: [
          {
            x: 'Markaziy Kengaş:',
          },
          {
            x: 'Qurultoy qarorlarining bajarilişi, dasturiy maqsad va vazifalarning amalga oşirilişi, Ittifoq Ustavi talablariga rioya etilişini taʼminlaydi;',
            li: true,
          },
          {
            x: 'yuridik şaxslarning huquq va majburiyatlarini amalga oşiriş uçun taşkilot nomidan faoliyat yuritadi;',
            li: true,
          },
          {
            x: 'Markaziy Kengaş Ijroiya qömitasi tarkibini saylaydi va uning aʼzolari vakolatlarini muddatidan avval tugatadi;',
            li: true,
          },
          {
            x: 'Markaziy Kengaş raisi, uning örinbosarlarining yarim yillik va yil yakunlariga doir hisobotlarini tinglaydi, ular örtasida işlar yönalişlarini taqsimlaydi, vakolatlarini muddatidan oldin tugatadi;',
            li: true,
          },
          {
            x: 'Ittifoq faoliyatining ustuvor yönalişlari böyiça komissiyalarni va işçi guruhlarni tuzadi, vaqti-vaqti bilan ularning hisobotlarini tinglaydi, yakunlarga tayangan holda tegişli qarorlarni qabul qiladi;',
            li: true,
          },
          {
            x: 'Markaziy Kengaşning yillik iş rejasini tasdiqlaydi hamda uning bajarilişi haqidagi hisobotni tinglaydi va hisobot yakunlariga tayangan holda tegişli qarorlarni qabul qiladi;',
            li: true,
          },
          {
            x: 'Ittifoqning umumlaştirilgan byudjetini, Markaziy apparat byudjetini tasdiqlaydi hamda ularning bajarilişi haqidagi hisobotni tinglaydi va hisobot yakunlariga tayangan holda tegişli qarorlarni qabul qiladi;',
            li: true,
          },
          {
            x: 'Ittifoq Markaziy apparati, hududiy hamda mahalliy kengaşlar, Ittifoq tomonidan taşkil qilingan tadbirkorlik tuzilmalari, ommaviy axborot vositalari, şu jumladan, yuridik şaxs maqomiga ega bölgan boşlanğiç taşkilotlarning taşkiliy tuzilmasini va ştat birliklarini tasdiqlaydi, xodimlarning mehnatiga haq tölaş va mukofotlaş tartibini, şaklini va miqdorini belgilaydi;',
            li: true,
          },
          {
            x: 'Ittifoqning içki meʼyoriy hujjatlarini tasdiqlaydi;',
            li: true,
          },
          {
            x: 'Markaziy Kengaş vakolatiga kiruvçi baʼzi vazifalarni Ijroiya qömitasi ixtiyoriga havola etiş haqida qarorlar qabul qiladi;',
            li: true,
          },
          {
            x: 'Qurultoylar oraliğida zimmasiga yuklatilgan vakolat va majburiyatlarni bajara olmagan Markaziy Kengaş raisi va uning örinbosarlarini lavozimdan ozod qiladi va navbatdagi Qurultoyga qadar Markaziy Kengaş raisi va uning örinbosarlarini saylaydi, şuningdek navbatdagi Qurultoyga qadar Kengaş aʼzolarini Kengaş tarkibidan çiqaradi va Kengaş aʼzoligiga saylaydi.',
            li: true,
          },
          {
            x: 'Qonun hujjatlari, Ustav va Qurultoy qaroriga köra boşqa masalalarni hal qiladi.',
          },
        ],
      },
      {
        no: '5.5.3.',
        blocks: [
          {
            x: 'Markaziy Kengaş yiğilişi har olti oyda kamida bir marta çaqiriladi va aʼzolarning uçdan ikki qismi qatnaşgan taqdirda qarorlar qabul qiliş vakolatiga ega böladi. Markaziy Kengaş aʼzolarining köpçiligi ovoz bergan taqdirda Markaziy Kengaşning qarorlari qabul qilingan deb hisoblanadi.',
          },
        ],
      },
      {
        no: '5.6.',
        blocks: [
          {
            x: 'Ittifoq faoliyatini taşkil etiş masalalari yuzasidan tezkor qarorlar qabul qiliş uçun Markaziy Kengaş öz aʼzolari tarkibidan kamida ön beş kişidan iborat bölgan Ijroiya qömitasini beş yil muddatga saylaydi. Ijroiya qömitasining tarkibiga egallab turgan lavozimiga köra Markaziy Kengaş raisi, uning örinbosarlari, Markaziy Kengaş apparati moliya-iqtisod bölimi mudiri, taşkiliy-kadrlar bölimi mudiri, Yoşlar muammolarini örganiş va istiqbolli kadrlarni tayyorlaş instituti direktori, Özbekiston milliy teleradiokompaniyasi “Yoşlar” teleradiokanali aksiyadorlik jamiyati direktori va boşqalar kiradi.',
          },
        ],
      },
      {
        no: '5.6.1.',
        blocks: [
          {
            x: 'Markaziy Kengaş Ijroiya qömitasi aʼzolarining tarkibi Markaziy Kengaş qarori bilan belgilanadi.',
          },
        ],
      },
      {
        no: '5.6.2.',
        blocks: [
          {
            x: 'Markaziy Kengaş Ijroiya qömitasi:',
          },
          {
            x: 'Ittifoqning hududiy va boşqa taşkiliy bölimlari, tadbirkorlik tuzilmalari, ommaviy axborot vositalari va uning töliq muassisligidagi yoki qoşidagi boşqa taşkilotlar faoliyatini muvofiqlaştirib boradi;',
            li: true,
          },
          {
            x: 'Markaziy Kengaş vakolatiga kiritilmagan Ittifoq va uning alohida bölinmalari mol-mulkini tasarruf qiliş bilan boğliq qarorlar qabul qiladi;',
            li: true,
          },
          {
            x: 'Ittifoq bölinmalarini taşkil qiliş va tugatiş hamda ularning taʼsis hujjatlarini tasdiqlaşga oid qarorlar qabul qiladi;',
            li: true,
          },
          {
            x: 'taşkiliy masalalar yuzasidan tezkor qarorlar qabul qilinişini taʼminlaydi, joriy iş rejasini tuzadi, rejalar va qarorlar ijrosi örganilişini taşkillaştiradi, ijroçilar hisobotlarini tinglaydi, yakunlarga tayangan holda tegişli qarorlarni qabul qiladi;',
            li: true,
          },
          {
            x: 'Ittifoqning Dasturida belgilab qöyilgan turli yönalişdagi işlar böyiça loyihalarni amalga oşiriş yuzasidan qarorlar qabul qiladi;',
            li: true,
          },
          {
            x: 'xorijiy va xalqaro taşkilotlar bilan hamkorlik aloqalarini örnatiş, delegatsiyalarni jönatiş va qabul qiliş yuzasidan qarorlar qabul qiladi;',
            li: true,
          },
          {
            x: 'Markaziy Kengaş yiğilişlarini çaqiradi, kun tartibini belgilaydi;',
            li: true,
          },
          {
            x: 'Ittifoqning hududiy kengaşlari byudjetlari loyihalarini körib çiqadi va ularni tasdiqlaş uçun tavsiya qiladi, ularning ijrosi haqidagi hisobotlarni tinglaydi, yakunlarga tayangan holda tegişli qarorlarni qabul qiladi;',
            li: true,
          },
          {
            x: 'Ittifoqning saylanadigan rahbarlik organlari ştatidagi apparat xodimlarini intizomiy javobgarlikka tortadi;',
            li: true,
          },
          {
            x: 'içki mehnat tartib-qoidalarini, xodimlarning lavozim yöriqnomalarini tasdiqlaydi;',
            li: true,
          },
          {
            x: 'Ittifoqning içki faoliyatini tartibga soluvçi hujjatlarni tasdiqlaydi;',
            li: true,
          },
          {
            x: 'Ittifoq va uning bölinmalari mulkini, mablağlarini taqsimlaş va tasarruf qiliş (uşbu yönalişda Markaziy Kengaş vakolatiga kiritilgan masalalardan taşqari) hamda grant, tender va boşqa tanlovlarni ötkaziş, şuningdek, quyi taşkilotlar faoliyatini tekşiriş yuzasidan qaror qabul qiladi;',
            li: true,
          },
          {
            x: 'Ittifoqning hududiy va mahalliy kengaşlari rahbar organlari, Ijroiya qömitasining qonun hujjatlari va Ustavga zid bölgan qarorlarini bekor qiladi;',
            li: true,
          },
          {
            x: 'Ustav maqsadi va vazifalariga erişiş uçun tadbirkorlik tuzilmalarini taʼsis etadi, ularning faoliyatini nazorat qiladi va rahbarlari tayyorlagan hisobotlarni tinglaydi, yakunlarga tayangan holda tegişli qarorlar qabul qiladi;',
            li: true,
          },
          {
            x: 'Markaziy Kengaş apparatining işlar boşqaruvçisi, boş hisobçi, bölim mudirlarini, Markaziy Kengaş tadbirkorlik tuzilmalari, ommaviy axborot vositalari rahbarlari va boş hisobçilarini lavozimiga tasdiqlaydi va lavozimidan ozod qiladi;',
            li: true,
          },
          {
            x: 'yuqori organlarning qarorlariga oid boşqa masalalarni hal etadi.',
            li: true,
          },
        ],
      },
      {
        no: '5.6.3.',
        blocks: [
          {
            x: 'Markaziy Kengaş raisi Ijroiya qömitasining yiğilişlarini çaqiradi va uşbu yiğilişlarga raislik qiladi.',
          },
          {
            x: 'Markaziy Kengaş raisi öz majburiyatlarini bajara olmagan taqdirda, Markaziy Kengaş Ijroiya qömitasining qaroriga binoan uning vazifasini örinbosarlaridan biri bajarib turadi.',
          },
        ],
      },
      {
        no: '5.6.4.',
        blocks: [
          {
            x: 'Markaziy Kengaş raisining vazifalari hamda vakolati doirasiga quyidagilar kiradi:',
          },
          {
            x: 'Ittifoq Ustavi va Dasturi doirasidagi umumiy faoliyatni muvofiqlaştiradi;',
            li: true,
          },
          {
            x: 'Ittifoq va Markaziy Kengaş nomidan işonçnomasiz iş köradi, barça yuridik va jismoniy şaxslar, şuningdek, xorijiy taşkilotlar oldida Ittifoq manfaatlarini ifodalaydi;',
            li: true,
          },
          {
            x: 'Markaziy Kengaş, uning Ijroiya qömitasi, Markaziy Kengaş raisi örinbosarlari va apparatining faoliyatiga rahbarlik qiladi, apparat xodimlarini işga qabul qiladi va egallab turgan lavozimidan ozod qiladi;',
            li: true,
          },
          {
            x: 'şartnomalar tuzadi, şu jumladan, mehnat şartnomalarini tuzadi, işonçnomalarni beradi, banklarda hisob raqamlari va boşqa hisoblarni oçadi, bank, moliya va boşqa hujjatlarga birinçi imzo huquqidan foydalanadi, barça xodimlar uçun majburiy bölgan farmoyiş beruvçi hujjatlarni çiqaradi;',
            li: true,
          },
          {
            x: 'özining ayrim vakolatlarini Markaziy Kengaş Ijroiya qömitasi qarori bilan belgilangan tartibda yönalişlar böyiça Markaziy Kengaş raisi örinbosarlariga yuklatadi;',
            li: true,
          },
          {
            x: 'Ittifoq faoliyati doirasidagi Markaziy Kengaş va uning Ijroiya qömitasining vakolatiga kirmaydigan boşqa masalalarni hal qiladi.',
            li: true,
          },
        ],
      },
      {
        no: '5.7.',
        blocks: [
          {
            x: 'Markaziy nazorat-taftiş komissiyasi Ittifoqning markaziy nazorat qiluvçi organi hisoblanadi.',
          },
        ],
      },
      {
        no: '5.7.1.',
        blocks: [
          {
            x: 'Markaziy nazorat-taftiş komissiyasi Qurultoy tomonidan 5 yil muddatga kamida ön bir kişidan iborat tarkibda saylanadi va unga hisobot beradi.',
          },
          {
            x: 'Mahalliy (hududiy) tuzilmalarning nazorat-taftiş komissiyalari tegişli hisobot-saylov konferensiyalari tomonidan kamida beş kişidan iborat tarkibda saylanadi va unga hisobot beradi.',
          },
          {
            x: 'Bunda Ittifoqning Markaziy nazorat-taftiş komissiyasi Ittifoqning va uning hududiy kengaşlari, tadbirkorlik tuzilmalari va Ittifoqning ommaviy axborot vositalari faoliyatini nazorat va taftiş qiliş huquqiga ega. Tekşirişlar natijalariga köra, u ötkazilgan tekşiruv haqida hisobot tuzadi va körib çiqiş hamda tegişli qaror qabul qiliş uçun Markaziy Kengaş yiğilişiga taqdim etadi.',
          },
        ],
      },
      {
        no: '5.7.2.',
        blocks: [
          {
            x: 'Ittifoqning Markaziy nazorat-taftiş komissiyasi vakolatlari doirasiga quyidagilar kiradi:',
          },
          {
            x: 'byudjet ijrosini, Ittifoq va uning tuzilmalarining moliyaviy-xöjalik faoliyatini tekşiriş;',
            li: true,
          },
          {
            x: 'mazkur Ustav qoidalariga rioya qilinişini nazorat qiliş;',
            li: true,
          },
          {
            x: 'Ittifoq faoliyatining moliyaviy, tadbirkorlik va boşqa sohalarida qonun hujjatlari buziliş holatlarini oldini oliş;',
            li: true,
          },
          {
            x: 'uşbu Ustavga yoki Ittifoq Qurultoyi qarorlariga mos bölmagan hollarda Ittifoqning Markaziy Kengaşi, quyi saylanadigan organlari va nazorat-taftiş komissiyalarining qarorlarini töxtatiş haqida tavsiyalar beriş;',
            li: true,
          },
          {
            x: 'Ittifoq aʼzolari murojaatlarini körib çiqiş;',
            li: true,
          },
          {
            x: 'Ittifoqning moliyaviy-xöjalik faoliyatida aniqlangan kamçiliklarni bartaraf etiş böyiça takliflar kiritiş;',
            li: true,
          },
          {
            x: 'Qurultoy qarorlariga binoan boşqa vakolatlarni bajariş.',
            li: true,
          },
        ],
      },
      {
        no: '5.7.3.',
        blocks: [
          {
            x: 'Moliyaviy-xöjalik faoliyati tekşirilganda barça mansabdor şaxslar va ştatdagi xodimlar Markaziy nazorat-taftiş komissiyasi talabiga binoan unga zarur hujjatlarni taqdim etadi.',
          },
        ],
      },
      {
        no: '5.7.4.',
        blocks: [
          {
            x: 'Nazorat-taftiş komissiyalari aʼzolari Ittifoqning tegişli saylanadigan rahbar organi aʼzosi böla olmaydilar. Ittifoqning tegişli saylanadigan rahbar organlari aʼzolari ayni paytda nazorat-taftiş komissiyasi aʼzosi böla olmaydilar.',
          },
        ],
      },
      {
        no: '5.7.5.',
        blocks: [
          {
            x: 'Markaziy nazorat-taftiş komissiyasi aʼzolari Ittifoq rahbar organlarining barça darajadagi yiğilişlarida maslahat ovozi bilan iştirok etiş huquqiga ega.',
          },
        ],
      },
      {
        no: '5.7.6.',
        blocks: [
          {
            x: 'Markaziy nazorat-taftiş komissiyasi öz faoliyatini mazkur Ustav, Qurultoy qarorlari va Markaziy nazorat-taftiş komissiyasi töğrisidagi Nizom asosida amalga oşiradi.',
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
            x: 'Ittifoqning boşlanğiç taşkilotlari;',
            li: true,
          },
          {
            x: 'Ittifoqning töliq muassisligidagi yoki qoşidagi korxona, taşkilot va muassasalar, şu jumladan ommaviy axborot vositalari.',
            li: true,
          },
          {
            x: 'Şuningdek, Ittifoq va uning alohida bölinmalari qoşida tegişli ravişda bolalar yönalişi böyiça faoliyat olib boruvçi “Kamalak” şöbalari (keyingi örinlarda “Kamalak” bolalar taşkiloti va uning bölinmalari deb ataladi) taşkil qilinadi. “Kamalak” bolalar taşkiloti va uning bölinmalari Ittifoqning alohida bölinmasi hisoblanmaydi. Ular Ittifoq va uning alohida bölinmalarining şöbasi hisoblanadi.',
          },
          {
            x: 'Ittifoq belgilangan tartibda özining davriy naşrlari, noşirlik-matbaa korxonalari, kadrlar malakasini oşiriş markazlari, tadbirkorlik tuzilmalarini hamda özining taʼsis hujjatlari asosida faoliyat yuritadigan boşqa muassasalarni taşkil etişi mumkin.',
          },
        ],
      },
      {
        no: '6.2.',
        blocks: [
          {
            x: 'Mahalliy va hududiy kengaşlar Özbekiston Respublikasining maʼmuriy-hududiy bölinişiga muvofiq tuziladi.',
          },
        ],
      },
      {
        no: '6.2.1.',
        blocks: [
          {
            x: 'Ittifoqning yakka tartibdagi aʼzolari iş, öqiş va xizmat joylarida tuzilişi mumkin bölgan Ittifoqning boşlanğiç taşkilotlariga birlaşadilar.',
          },
        ],
      },
      {
        no: '6.2.2.',
        blocks: [
          {
            x: 'Ittifoqning boşlanğiç taşkilotlari kamida beş nafar Ittifoq aʼzosi (xayrixoh yoşlar) mavjud bölganda, ularning yiğilişi qaroriga köra tuman yoki şahar kengaşlari roziligi bilan tuziladi.',
          },
        ],
      },
      {
        no: '6.2.3.',
        blocks: [
          {
            x: 'Markaziy Kengaş Ijroiya qömitasi qarori bilan Ittifoqning boşlanğiç taşkilotlariga yuridik şaxs maqomi berilişi mumkin. Mazkur masalani körib çiqişda birinçi navbatda uning moliyaviy va boşqa imkoniyatlari hisobga olinadi.',
          },
          {
            x: 'Boşlanğiç taşkilotlarga yuridik şaxs maqomini beriş tartibi alohida lokal meʼyoriy-huquqiy hujjat bilan belgilanadi.',
          },
        ],
      },
      {
        no: '6.2.4.',
        blocks: [
          {
            x: 'Ittifoq boşlanğiç taşkilotining boşlanğiç taşkilot miqyosidagi yuqori rahbar organi unda hisobda turgan tegişli aʼzolarning Umumiy yiğilişi yoki Hisobot-saylov yiğilişi hisoblanadi.',
          },
          {
            x: 'Umumiy yiğiliş tegişli boşlanğiç taşkilotdagi Ittifoq aʼzolari soni yuz nafardan oşmagan boşlanğiç taşkilotlarda bir yilda kamida ikki marotaba ötkaziladi hamda unda boşlanğiç taşkilot hisobida turgan aʼzolarning uçdan ikki qismi iştirok etsa, vakolatli hisoblanadi.',
          },
          {
            x: 'Hisobot-saylov yiğilişi Ittifoq aʼzolari soni yuz nafardan oşgan boşlanğiç taşkilotlarda bir yilda bir marotaba ötkazilib (oliy taʼlim muassasalari bundan mustasno), unda boşlanğiç taşkilot hisobida turgan Ittifoq aʼzolari orasidan saylangan vakillar (delegatlar) iştirok etadi.',
          },
          {
            x: 'Oliy taʼlim muassasalaridagi boşlanğiç taşkilotlarda hisobot-saylov yiğilişi kamida ikki yarim yilda bir marotaba ötkaziladi.',
          },
        ],
      },
      {
        no: '6.2.5.',
        blocks: [
          {
            x: 'Umumiy yiğiliş vakolatlari quyidagilardan iborat:',
          },
          {
            x: 'boşlanğiç taşkilot umumiy faoliyatiga oid qarorlar qabul qiliş;',
            li: true,
          },
          {
            x: 'boşlanğiç taşkilotning yarim yillik va yillik umumiy faoliyati böyiça hisobotini eşitiş va baholaş;',
            li: true,
          },
          {
            x: 'boşlanğiç taşkilot yetakçisini ikki yarim yil muddatga saylaş;',
            li: true,
          },
          {
            x: 'boşlanğiç taşkilotning yillik iş rejasini tasdiqlaş;',
            li: true,
          },
          {
            x: 'jismoniy şaxslarni Ittifoq aʼzoligiga qabul qiliş va aʼzolikdan çiqariş;',
            li: true,
          },
          {
            x: 'Ittifoqning yuqori taşkilotlari belgilagan kvotaga asosan ularning konferensiyalariga delegatlar saylaş;',
            li: true,
          },
          {
            x: 'boşlanğiç taşkilot faoliyatini tugatiş töğrisida qaror qabul qiliş.',
            li: true,
          },
        ],
      },
      {
        no: '6.2.6.',
        blocks: [
          {
            x: 'Hisobot-saylov yiğilişi vakolatlari quyidagilardan iborat:',
          },
          {
            x: 'boşlanğiç taşkilotning ötgan davrdagi umumiy faoliyati böyiça hisobotini eşitiş va baholaş;',
            li: true,
          },
          {
            x: 'boşlanğiç taşkilot Kengaşi aʼzolari va yetakçisini ikki yarim yil muddatga saylaş;',
            li: true,
          },
          {
            x: 'boşlanğiç taşkilotning yillik iş rejasini tasdiqlaş;',
            li: true,
          },
          {
            x: 'Ittifoqning yuqori taşkilotlari belgilagan kvotaga asosan ularning konferensiyalariga delegatlar saylaş;',
            li: true,
          },
          {
            x: 'boşlanğiç taşkilot faoliyatini tugatiş töğrisida qaror qabul qiliş.',
            li: true,
          },
        ],
      },
      {
        no: '6.2.7.',
        blocks: [
          {
            x: 'Yuz nafardan ortiq aʼzosi mavjud bölgan boşlanğiç taşkilotda uning Hisobot-saylov yiğilişi tomonidan kamida yetti kişidan iborat tarkibda Kengaş saylanadi. Kengaş majlislari ikki oyda kamida bir marta ötkaziladi.',
          },
        ],
      },
      {
        no: '6.2.8.',
        blocks: [
          {
            x: 'Boşlanğiç taşkilot Kengaşi vakolatlari va vazifalari doirasiga quyidagilar kiradi:',
          },
          {
            x: 'hisobot-saylov yiğilişini çaqiriş, uning qarorlari ijrosini taʼminlaş;',
            li: true,
          },
          {
            x: 'yuqori taşkilotlardan kelgan topşiriq va tavsiyalarni körib çiqiş va ijrosini taʼminlaş;',
            li: true,
          },
          {
            x: 'Kengaş aʼzolari örtasida majburiyatlarni taqsimlaş va hisobotlarini tinglaş;',
            li: true,
          },
          {
            x: 'boşlanğiç taşkilotning quyi tuzilmalarini taşkil etiş, faoliyatini muvofiqlaştirib boriş;',
            li: true,
          },
          {
            x: 'jismoniy şaxslarni Ittifoq aʼzoligiga qabul qiliş va aʼzolikdan çiqariş;',
            li: true,
          },
          {
            x: 'boşlanğiç taşkilot iş rejasi va kundalik faoliyatiga oid masalalarni körib çiqiş va qarorlar qabul qiliş;',
            li: true,
          },
          {
            x: 'aʼzolarning qonuniy manfaatlarini himoya qilişga doir masalalarni körib çiqiş hamda muassasa rahbariyati va yuqori taşkilotlarga takliflar bildiriş;',
            li: true,
          },
          {
            x: 'muayyan muvaffaqiyatlarga erişgan aʼzolar va sardorlarni moddiy va maʼnaviy rağbatlantiriş;',
            li: true,
          },
          {
            x: 'boşlanğiç taşkilot aʼzolari örtasida körik-tanlovlar, musobaqalar va boşqa tadbirlarni taşkil etiş.',
            li: true,
          },
        ],
      },
      {
        no: '6.2.9.',
        blocks: [
          {
            x: 'Boşlanğiç taşkilot faoliyatiga yetakçi rahbarlik qilib, uning vakolatlari quyidagilardan iborat:',
          },
          {
            x: 'boşlanğiç taşkilotga rahbarlik qiliş;',
            li: true,
          },
          {
            x: 'boşlanğiç taşkilotdagi aʼzolari orasidan yönaliş sardorlari (koordinatorlar)ni tayinlaş;',
            li: true,
          },
          {
            x: 'taʼlim muassasasi (taşkilot, korxona) maʼmuriyati, davlat organlari, fuqarolarning özini özi boşqariş organlari, kasaba uyuşmasi taşkilotlari va boşqa jamoat taşkilotlari hamda fuqarolar bilan özaro munosabatlarda boşlanğiç taşkilot nomidan iş yuritiş.',
            li: true,
          },
        ],
      },
      {
        no: '6.2.10.',
        blocks: [
          {
            x: 'Yuridik şaxs maqomiga ega boşlanğiç taşkilotning yetakçisi – rahbari quyidagi huquqlarga ega:',
          },
          {
            x: 'boşlanğiç taşkilot nomidan işonçnomasiz harakat qiliş;',
            li: true,
          },
          {
            x: 'boşlanğiç taşkilotning mol-mulkini vakolati doirasida boşqariş;',
            li: true,
          },
          {
            x: 'boşlanğiç taşkilot nomidan şartnomalar, şu jumladan, xöjalik şartnomalari va mehnat şartnomalarini tuziş;',
            li: true,
          },
          {
            x: 'işonçnomalar beriş;',
            li: true,
          },
          {
            x: 'banklarda hisob raqamlari yoki boşqa raqamlar oçiş, barça bank, moliyaviy va boşqa hujjatlarga birinçi imzo huquqidan foydalaniş;',
            li: true,
          },
          {
            x: 'boşlanğiç taşkilot ştatidagi barça xodimlar uçun majburiy bölgan körsatmalar beriş, farmoyişlar qabul qiliş;',
            li: true,
          },
          {
            x: 'vakolati doirasida Özbekiston Respublikasi qonunçiligiga va mazkur Ustavga zid bölmagan harakatlarni amalga oşiriş.',
            li: true,
          },
        ],
      },
      {
        no: '6.3.',
        blocks: [
          {
            x: 'Ittifoq mahalliy va hududiy Kengaşining tegişli hudud miqyosidagi yuqori rahbar organi ikki yarim yilda kamida bir marta ötkaziladigan Konferensiya hisoblanadi. Konferensiya tegişli mahalliy yoki hududiy Kengaş yiğilişi tomonidan çaqiriladi. Konferensiyalarga saylanadigan delegatlarning vakillik normasi, saylaş tartibi va muddatlari Ittifoqning tegişli kengaşlari yiğilişi tomonidan belgilanadi.',
          },
          {
            x: 'Hududiy Kengaş konferensiyasi qatnaşçilari-delegatlari tarkibi mahalliy Kengaş Konferensiyasi tomonidan saylangan delegatlar va hududiy Kengaş yiğilişi tomonidan aʼzolikka qabul qilingan yuridik şaxslar vakillaridan iborat böladi. Bunda, hududiy Kengaş yiğilişi tomonidan aʼzolikka qabul qilingan yuridik şaxslar vakillari meʼyori hududiy Kengaş yiğilişi tomonidan belgilanadi.',
          },
          {
            x: 'Mahalliy Kengaş konferensiyasi qatnaşçilari-delegatlari tarkibi boşlanğiç taşkilotning yuqori rahbar organi tomonidan saylangan delegatlar va mahalliy Kengaş yiğilişi tomonidan aʼzolikka qabul qilingan yuridik şaxslar vakillaridan iborat böladi. Bunda, mahalliy Kengaş yiğilişi tomonidan aʼzolikka qabul qilingan yuridik şaxslar vakillari meʼyori mahalliy Kengaş yiğilişi tomonidan belgilanadi.',
          },
        ],
      },
      {
        no: '6.3.1.',
        blocks: [
          {
            x: 'Mahalliy yoki hududiy Kengaş Konferensiyasi:',
          },
          {
            x: 'tegişli Kengaşning hisobot davri uçun hisobotini tinglaydi va tasdiqlaydi;',
            li: true,
          },
          {
            x: 'tegişli Kengaşning kelajakdagi faoliyatining asosiy yönalişlarini belgilaydi;',
            li: true,
          },
          {
            x: 'tegişli Nazorat-taftiş komissiyasining hisobotini tinglaydi va tasdiqlaydi;',
            li: true,
          },
          {
            x: 'tegişli Kengaş yiğilişining kamida yigirma bir nafar kişidan iborat va nazorat-taftiş komissiyasining kamida beş kişidan iborat tarkiblarini ikki yarim yil muddatga saylaydi;',
            li: true,
          },
          {
            x: 'tegişli Kengaş raisi va uning örinbosarlarini ikki yarim yil muddatga saylaydi;',
            li: true,
          },
          {
            x: 'vakolati doirasiga kiradigan boşqa masalalarni körib çiqadi.',
            li: true,
          },
        ],
      },
      {
        no: '6.3.2.',
        blocks: [
          {
            x: 'Ittifoqning hududiy va mahalliy Kengaşiga Konferensiyalar oraliğidagi davrga saylanadigan tegişli Kengaş yiğilişi rahbarlik qiladi.',
          },
          {
            x: 'Kengaşning yiğilişlari olti oyda kamida bir marta ötkazilib, tegişli Kengaş raisi tomonidan çaqiriladi.',
          },
        ],
      },
      {
        no: '6.3.3.',
        blocks: [
          {
            x: 'Ittifoqning mahalliy yoki hududiy kengaşlari yiğilişining vakolatlari va vazifalari quyidagilardan iborat:',
          },
          {
            x: 'yuqori turuvçi organlar tomonidan berilgan topşiriqlar ijrosini taʼminlaş yuzasidan qarorlar qabul qiliş;',
            li: true,
          },
          {
            x: 'tegişli Kengaş faoliyatini muvofiqlaştiriş va işini taşkil etiş maqsadida öz aʼzolari tarkibidan komissiyalar va işçi guruhlar tuziş, öz aʼzolari örtasida faoliyat yönalişlarini taqsimlaş, ularning ijrosi böyiça hisobotlar eşitiş hamda yakunlari yuzasidan tegişli qarorlar qabul qiliş;',
            li: true,
          },
          {
            x: 'Ittifoq markaziy apparati bilan kelişgan holda tegişli mahalliy yoki hududiy kengaşlar raislarini zarurat bölganda konferensiyalar oraliğida saylaş;',
            li: true,
          },
          {
            x: 'Ittifoq markaziy apparati bilan kelişgan holda tegişli Kengaş apparati bölimlari mudirlarini, Ittifoq qaramoğidagi taşkilotlar (korxonalar, muassasalar) rahbarlarini lavozimiga tasdiqlaş va lavozimidan ozod qiliş;',
            li: true,
          },
          {
            x: 'Kengaşning yillik iş rejasini va uning ijrosi töğrisidagi hisobotni tasdiqlaş, tegişli qarorlarni qabul qiliş;',
            li: true,
          },
          {
            x: 'Kengaş byudjetini va uning ijrosi töğrisidagi hisobotni tasdiqlaş, tegişli qarorlarni qabul qiliş;',
            li: true,
          },
          {
            x: 'Ittifoqqa jamoa tarzida aʼzolarni qabul qiliş va aʼzolikdan çiqariş;',
            li: true,
          },
          {
            x: 'yuqori turuvçi organlar qaroriga muvofiq vakolati doirasiga kiritilgan boşqa masalalarni hal qiliş.',
            li: true,
          },
        ],
      },
      {
        no: '6.3.4.',
        blocks: [
          {
            x: 'Ittifoqning alohida bölinmalari huquq va majburiyatlari, mol-mulkni boşqariş borasidagi huquqlari, ularni taşkil etiş va tugatiş tartibi hamda rahbar organlari böyiça qoidalar ularning Nizomida batafsil ravişda qayd qilinadi.',
          },
        ],
      },
      {
        no: '6.3.5.',
        blocks: [
          {
            x: 'Ittifoqning mahalliy yoki hududiy Kengaşi yiğilişiga tegişli Kengaş raisi rahbarlik qiladi.',
          },
        ],
      },
    ],
  },
  {
    n: 'VII',
    t: 'Ittifoqning mulki va pul mablağlari, ularni şakllantiriş tartibi',
    items: [
      {
        no: '7.1.',
        blocks: [
          {
            x: 'Ittifoq öz tasarrufida binolar, inşootlar, uy-joylar, uskunalar, anjomlar, milliy va xorijiy valyutadagi pul mablağlari, qimmatli qoğozlar, intellektual mulk va mualliflik huquqlari obʼektlari, taşkilotlarga (korxona va muassasalarga) va uşbu Ustavda közda tutilgan faoliyatni moddiy taʼminlaş uçun zarur bölgan va öz mablağlari hisobidan barpo etiladigan boşqa mol-mulkka ega bölişi mumkin.',
          },
        ],
      },
      {
        no: '7.2.',
        blocks: [
          {
            x: 'Ittifoq va uning alohida bölinmalari mulkini şakllantiriş manbalari quyidagilar hisoblanadi:',
          },
          {
            x: 'jismoniy va yuridik, şu jumladan, xorijiy şaxslarning ixtiyoriy mulkiy badallari va ehsonlari;',
            li: true,
          },
          {
            x: 'tadbirkorlik faoliyatidan olingan va faqat Ustav maqsadlarini bajariş uçun sarflanadigan daromadlar (foyda);',
            li: true,
          },
          {
            x: 'grant, subsidiya, ijtimoiy buyurtma körinişidagi davlat organlari, jamoat taşkilotlari, şu jumladan, xorijiy va xalqaro taşkilotlar tomonidan yoşlarga oid dastur va loyihalarni amalga oşiriş uçun maqsadli kelib tuşadigan mablağlar;',
            li: true,
          },
          {
            x: 'Ittifoqning bosma naşrlaridan tuşadigan mablağlar;',
            li: true,
          },
          {
            x: 'qonun hujjatlarida taqiqlanmagan boşqa tuşumlar.',
            li: true,
          },
        ],
      },
      {
        no: '7.3.',
        blocks: [
          {
            x: 'Ittifoqning va u tuzgan tuzilmalarning tadbirkorlik hamda boşqa faoliyatidan olingan daromadlari faqat Ustavda belgilangan faoliyatga sarflanadi va Ittifoq aʼzolari, iştirokçilari va xodimlari örtasida taqsimlanmaydi.',
          },
        ],
      },
      {
        no: '7.4.',
        blocks: [
          {
            x: 'Ittifoqning mulki bölinmasdir. Ittifoq nomidan mulkka egalik qiliş huquqini Markaziy Kengaş özining Ijroiya qömitasi orqali amalga oşiradi. Ittifoqning mahalliy va hududiy kengaşlari, yuridik şaxs huquqiga ega bölgan boşlanğiç taşkilotlari, qaramoğidagi taşkilotlar (korxona va muassasalar) Ittifoqning mol-mulkini öz tasarrufidan Markaziy Kengaş Ijroiya qömitasining tegişli qarorisiz mustaqil ravişda çiqarişga haqli emas.',
          },
        ],
      },
      {
        no: '7.5.',
        blocks: [
          {
            x: 'Ittifoqning mahalliy va hududiy kengaşlari özlariga Markaziy Kengaş tomonidan biriktirib qöyilgan mulkni operativ boşqariş huquqini amalga oşiradi.',
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
            x: 'Ittifoqning mahalliy kengaşlari belgilangan şaklda har oylik moliyaviy hisobot va tasdiqlangan iş rejaning bajarilişi yuzasidan hisobotni keyingi oyning 10-sanasiga qadar hududiy kengaşlarga berib boradilar.',
          },
        ],
      },
      {
        no: '8.2.',
        blocks: [
          {
            x: 'Ittifoqning hududiy kengaşlari belgilangan tartibda Ittifoqning Markaziy Kengaşi apparatiga har çoraklik moliyaviy hisobot va tasdiqlangan iş rejaning bajarilişi yuzasidan hisobotni keyingi çorak birinçi oyining 15-sanasiga qadar berib boradilar.',
          },
        ],
      },
      {
        no: '8.3.',
        blocks: [
          {
            x: 'Ittifoq öz faoliyati natijalarini hisobga olib boradi va ularni belgilangan tartibda röyxatga oluvçi, soliq va statistika organlariga taqdim etadi.',
          },
        ],
      },
    ],
  },
  {
    n: 'IX',
    t: 'Ittifoq Ustaviga özgartiriş va qöşimçalar kiritiş tartibi',
    items: [
      {
        no: '9.1.',
        blocks: [
          {
            x: 'Ittifoq Ustaviga Qurultoy qarori asosida özgartiriş va qöşimçalar kiritilişi mumkin.',
          },
        ],
      },
      {
        no: '9.2.',
        blocks: [
          {
            x: 'Ustavga özgartiriş va qöşimçalar kiritilgandan söng, Ittifoq Özbekiston Respublikasi Adliya vazirligi tomonidan qayta davlat röyxatidan ötkazilişi lozim.',
          },
        ],
      },
    ],
  },
  {
    n: 'X',
    t: 'Ittifoqni qayta taşkil etiş va tugatiş tartibi',
    items: [
      {
        no: '10.1.',
        blocks: [
          {
            x: 'Ittifoqni qayta taşkil etiş Qurultoy yoki sudning qaroriga muvofiq qöşiliş, birlaşiş, böliniş, ajralib çiqiş va özgariş yöli bilan amalga oşiriladi.',
          },
        ],
      },
      {
        no: '10.2.',
        blocks: [
          {
            x: 'Ittifoqni tugatiş Qurultoy yoki sudning qaroriga binoan amalga oşiriladi.',
          },
        ],
      },
      {
        no: '10.3.',
        blocks: [
          {
            x: 'Ittifoqni tugatiş qonun hujjatlarida nazarda tutilgan tartibda amalga oşiriladi.',
          },
        ],
      },
      {
        no: '10.4.',
        blocks: [
          {
            x: 'Ittifoq tugatilgan taqdirda kreditorlar bilan hisob-kitob yakunlangandan söng, ortib qolgan mol-mulk uşbu Ustav maqsad va vazifalari yölida, xayriya maqsadida yoki qonun hujjatlarida belgilangan boşqa maqsadlarda sarflanadi.',
          },
        ],
      },
    ],
  },
]
