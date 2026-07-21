# TEXNIK TOPSHIRIQ (TZ)
## «Yoshlar uchun imkoniyatlar» Telegram-botini rivojlantirish

**Kanallar bazasi, admin-panel, ommaviy tarqatish, monitoring va ommaviy funksiyalarni avtomatlashtirish**

---

TASDIQLAYMAN
_______________________________
"____" _______________ 2026-yil

---

## Mundarija

**I QISM — Asosiy tizim**
1. Umumiy ma'lumot
2. Ustuvor blok: Kanallar bazasi va admin-panel
3. Ma'lumotlar bazasi tuzilmasi
4. Tarqatishni avtomatlashtirish
5. Statistika va hisobotlar
6. Zakovat (viktorina) blokini kuchaytirish
7. Nofunksional talablar
8. Ishlarni bosqichlarga bo'lish (I qism)
9. Ishni qabul qilish mezonlari

**II QISM — Monitoring va ommaviy funksiyalar**
10. OTT kanallari faoliyati monitoringi (analitika moduli)
11. Botni ommaviy qilish (foydalanuvchilar uchun qatlam)
12. Qiziqarli va jalb qiluvchi funksiyalar (qo'shimcha g'oyalar)
13. Muvaffaqiyat ko'rsatkichlari (KPI)
14. Yangilangan ish bosqichlari (II qism)

---

# I QISM — ASOSIY TIZIM

## 1. Umumiy ma'lumot

### 1.1. Loyihaning maqsadi
Amaldagi «Yoshlar uchun imkoniyatlar» Telegram-boti funksionalligini kengaytirish, inson omilini (qo'lda bajariladigan amallarni) kamaytirish va ommaviy tarqatish jarayonini to'liq avtomatlashtirish. Ustuvor vazifa — har safar Excel-fayl yuborish tartibini bekor qilib, uni bot ichidagi doimiy kanallar bazasi va admin-panel bilan almashtirish.

### 1.2. Botning hozirgi holati (mavjud funksiyalar)
- Zakovat (viktorina) savollarini kanalga «javob yozish» tugmasi bilan birga yuborish;
- Manba kanaldagi postni Excel-faylda keltirilgan oliy ta'lim tashkilotlari (OTT) Telegram-kanallariga ommaviy («bir tugma bilan») tarqatish;
- Tarqatish yakunida «nechta kanalga yetkazildi / yetkazilmadi» ko'rinishidagi statistikani berish.

**Amaldagi kamchilik:** har bir tarqatishdan oldin adminlar kanallar linklari yig'ilgan Excel-faylni qo'lda tayyorlab botga yuborishi shart. Bu vaqt talab qiladi, xatoliklarga (noto'g'ri/eskirgan link, dublikat) olib keladi va jarayonni bir necha kishiga bog'lab qo'yadi.

### 1.3. Texnologik stek

| Komponent | Talab |
|---|---|
| Dasturlash tili | Python 3.11+ |
| Bot kutubxonasi | aiogram 3.x (afzal) yoki pyTelegramBotAPI — mavjud kod bazasiga mos holda |
| Ma'lumotlar bazasi | PostgreSQL 14+ (afzal) yoki SQLite (kichik hajm uchun) |
| Navbat / rejalashtirish | APScheduler yoki Celery + Redis (rejalashtirilgan yuborish uchun) |
| Joylashuv (hosting) | VPS (Ubuntu 22.04), systemd xizmati sifatida doimiy ishlash |
| Versiya nazorati | Git (yopiq repozitoriy) |

---

## 2. Ustuvor blok: Kanallar bazasi va admin-panel

> **Ushbu blok — buyurtmaning asosiy va birinchi navbatda bajarilishi shart bo'lgan qismi.** Maqsad: Excel-fayl yuborish tartibini butunlay bekor qilib, kanallar ro'yxatini bot ma'lumotlar bazasida doimiy saqlash va uni admin-panel orqali boshqarish.

### 2.1. Kanallarni boshqarish (CRUD)
Admin-panelda quyidagi amallar tugmalar orqali bajarilishi kerak:

- **Kanal qo'shish** — kanal `@username` yoki ID, bog'liq OTT nomi, OTT turi (Davlat/Xorijiy/Nodavlat), holati (faol/nofaol). Bot avtomatik tekshiradi: o'zi shu kanalda administrator ekanligini va post yuborish huquqi borligini.
- **Kanalni tahrirlash** — mavjud yozuvning istalgan maydonini o'zgartirish.
- **Kanalni o'chirish / vaqtincha o'chirish** — ro'yxatdan olib tashlash yoki «nofaol» holatiga o'tkazish (tarqatishda ishtirok etmaydi, lekin tarix saqlanadi).
- **Ro'yxatni ko'rish** — barcha kanallar sahifalab (pagination) ko'rsatiladi; OTT turi va holati bo'yicha filtr.
- **Guruhlash (teglar)** — kanallarni toifalarga ajratish (masalan: «Davlat», «Xorijiy», «Nodavlat» yoki maxsus ro'yxatlar). Tarqatishda faqat tanlangan guruhga yuborish imkoniyati.

### 2.2. Excel bilan ishlashning yangi roli (majburiy emas, yordamchi)
Excel butunlay yo'qolmaydi, balki faqat bazani ommaviy yangilash vositasiga aylanadi:

- **«Excel'dan import»** tugmasi — yuklangan fayldagi kanallar bazaga qo'shiladi yoki yangilanadi (mavjudlari ustiga yozilmaydi, dublikat aniqlanadi);
- **«Bazani Excel'ga eksport»** tugmasi — joriy ro'yxatni istalgan vaqtda zaxira (backup) yoki hisobot sifatida yuklab olish;
- Import vaqtida xatolik bo'lgan qatorlar (noto'g'ri link, bo'sh maydon) alohida hisobotda ko'rsatiladi.

### 2.3. Kirish huquqlari va rollar

| Rol | Huquqlar |
|---|---|
| **Bosh admin (Super-admin)** | Barcha funksiyalar; boshqa adminlarni qo'shish/olib tashlash; sozlamalar. |
| **Admin (Operator)** | Post tarqatish, zakovat yuborish, statistikani ko'rish. Kanal qo'shish/o'chirish — Bosh admin ruxsati bilan. |
| **Kuzatuvchi (ixtiyoriy)** | Faqat statistika va hisobotlarni ko'rish huquqi. |

Har bir adminning harakatlari jurnal (log)ga yoziladi: kim, qachon, qaysi amalni bajardi (audit-jurnal).

---

## 3. Ma'lumotlar bazasi tuzilmasi (tavsiya etilgan)
Quyidagi jadvallar minimal talab hisoblanadi; dasturchi zaruratga qarab kengaytirishi mumkin.

### 3.1. `channels` — kanallar jadvali

| Maydon | Turi | Izoh |
|---|---|---|
| id | BIGINT PK | Ichki identifikator |
| chat_id | BIGINT | Telegram kanal ID (masalan -100...) |
| username | VARCHAR | @username (ixtiyoriy) |
| ott_name | VARCHAR | Bog'liq OTT rasmiy nomi |
| ott_type | VARCHAR | Davlat / Xorijiy / Nodavlat |
| is_active | BOOLEAN | Faol holati (tarqatishda ishtirok etadimi) |
| bot_is_admin | BOOLEAN | Bot shu kanalda admin va post yubora oladimi (avtomatik tekshiriladi) |
| added_at | TIMESTAMP | Qo'shilgan sana |

### 3.2. `broadcasts` — tarqatishlar jurnali

| Maydon | Turi | Izoh |
|---|---|---|
| id | BIGINT PK | Tarqatish identifikatori |
| source_msg | VARCHAR/JSON | Manba post havolasi yoki nusxasi |
| admin_id | BIGINT | Kim ishga tushirdi |
| status | VARCHAR | rejalashtirilgan / jarayonda / yakunlangan |
| scheduled_at | TIMESTAMP | Rejalashtirilgan vaqt (agar bo'lsa) |
| created_at | TIMESTAMP | Yaratilgan vaqt |

### 3.3. `broadcast_results` — har bir kanal bo'yicha natija

| Maydon | Turi | Izoh |
|---|---|---|
| broadcast_id | BIGINT FK | Qaysi tarqatishga tegishli |
| channel_id | BIGINT FK | Qaysi kanal |
| status | VARCHAR | yetkazildi / xato |
| error_reason | VARCHAR | Xato sababi (bot admin emas, flood-limit va h.k.) |
| message_id | BIGINT | Yuborilgan post ID (views o'qish uchun) |
| sent_at | TIMESTAMP | Yuborilgan vaqt |

---

## 4. Tarqatishni avtomatlashtirish

### 4.1. Yaxshilangan ommaviy tarqatish
- **Manbani tanlash** — postni botga forward qilish YOKI kanal + post havolasini kiritish orqali.
- **Qabul qiluvchilarni tanlash** — barcha faol kanallar YOKI teg/tur bo'yicha guruh (masalan «faqat davlat OTTlari»).
- **Oldindan ko'rish (preview)** — yuborishdan oldin post ko'rinishi va nechta kanalga ketishi tasdiqlash uchun ko'rsatiladi.
- **Flood-limitni hisobga olish** — Telegram cheklovlariga rioya qilish uchun xabarlar orasida avtomatik pauza (rate-limiting), aks holda bot bloklanishi mumkin.
- **Avtomatik qayta urinish** — vaqtinchalik xatoliklarda (network, flood-wait) 2–3 marta qayta urinish.

### 4.2. Rejalashtirilgan yuborish
Adminlar postni kelajakdagi aniq sana va vaqtga rejalashtira olishi kerak (masalan, ertaga 09:00). Bot belgilangan vaqtda avtomatik tarqatadi — jonli turib tugma bosish shart emas. Rejalashtirilgan tarqatishlarni ko'rish, tahrirlash va bekor qilish imkoniyati bo'lishi kerak.

---

## 5. Statistika va hisobotlar
- **Tarqatish yakuni bo'yicha hisobot** — yetkazildi / yetkazilmadi soni; yetkazilmaganlar ro'yxati sababi bilan (masalan: «Falon OTT kanali — bot admin emas»).
- **Ko'rishlar (views) statistikasi** — post yuborilgandan bir muddat keyin har bir kanaldagi ko'rishlar sonini yig'ish va umumiy qamrovni ko'rsatish.
- **«Muammoli» kanallar ro'yxati** — doimiy ravishda post qabul qilmayotgan (bot admin bo'lmagan) kanallarni avtomatik ajratib, adminni ogohlantirish.
- **Hisobotni eksport qilish** — har bir tarqatish yoki davr bo'yicha statistikani Excel/PDF ko'rinishida yuklab olish.

---

## 6. Zakovat (viktorina) blokini kuchaytirish (ixtiyoriy)
- Savollarni oldindan navbatga qo'yish va belgilangan vaqtda avtomatik e'lon qilish;
- Foydalanuvchilar javoblarini yig'ish va to'g'ri javob berganlar reytingini (leaderboard) avtomatik shakllantirish;
- Davr yakunida g'oliblar ro'yxatini avtomatik e'lon qilish;
- Savollar bazasini admin-panel orqali boshqarish (qo'shish/tahrirlash/o'chirish).

---

## 7. Nofunksional talablar
- **Ishonchlilik** — bot uzluksiz ishlashi (systemd auto-restart); ishlamay qolganda ma'lumotlar yo'qolmasligi.
- **Xavfsizlik** — bot tokeni va bazaga kirish ma'lumotlari `.env` faylda, kodda ochiq saqlanmasligi; faqat ruxsat berilgan adminlar panelga kira olishi.
- **Zaxiralash (backup)** — ma'lumotlar bazasining muntazam (kunlik) avtomatik zaxira nusxasi.
- **Logging** — barcha muhim amallar va xatoliklar jurnalga yozilishi (keyinchalik tahlil uchun).
- **Kengaytiriluvchanlik** — yangi funksiya qo'shishni osonlashtiruvchi modulli tuzilma; kod izohlangan (commented) bo'lishi.

---

## 8. Ishlarni bosqichlarga bo'lish (I qism)

| Bosqich | Mazmuni | Natija |
|---|---|---|
| 1-bosqich | Kanallar bazasi + admin-panel (CRUD, Excel import/eksport, rollar) | Excel yuborish tartibi bekor qilinadi |
| 2-bosqich | Yaxshilangan va rejalashtirilgan tarqatish | Avtomatik, xavfsiz broadcast |
| 3-bosqich | Kengaytirilgan statistika va hisobotlar | Views, muammoli kanallar, eksport |
| 4-bosqich | Zakovat/reyting tizimi (ixtiyoriy) | Avtomatik viktorina va leaderboard |

---

## 9. Ishni qabul qilish mezonlari
- Excel-fayl yubormasdan, admin-panel orqali kanal qo'shish/o'chirish va postni barcha faol kanallarga tarqatish to'liq ishlashi;
- Tarqatishdan so'ng aniq statistika (yetkazildi/yetkazilmadi + sabab) chiqishi;
- Rejalashtirilgan post belgilangan vaqtda avtomatik yuborilishi;
- Bot admin bo'lmagan kanallar avtomatik aniqlanib, hisobotda ko'rsatilishi;
- Kod Git-repozitoriyda topshirilishi, o'rnatish va ishga tushirish bo'yicha qisqa qo'llanma (README) bilan birga.

---

# II QISM — MONITORING VA OMMAVIY FUNKSIYALAR

## 10. OTT kanallari faoliyati monitoringi (analitika moduli)

### 10.1. Maqsad
Botga ulangan barcha oliy ta'lim tashkilotlari (OTT) Telegram-kanallarining faoliyatini markazlashtirilgan tarzda kuzatib borish. Tizim har bir kanal qanday faollik bilan yuritilayotganini — post soni, jalb qilingan reaksiya va izohlar, ko'rishlar, obunachilar o'sishini — ko'rsatadi hamda haftalik va oylik hisobotlar shaklida taqdim etadi. Bu yetakchilar faoliyatini ob'ektiv baholash va sog'lom raqobat muhitini yaratish imkonini beradi.

### 10.2. Kuzatiladigan ko'rsatkichlar (metrikalar)

| Ko'rsatkich | Izoh |
|---|---|
| Post soni | Har bir kanalda kun/hafta/oy davomida chiqarilgan postlar soni |
| Reaksiyalar | Postlarga qo'yilgan reaksiyalar (like va b.) umumiy soni |
| Izohlar (komentariyalar) | Kanalga bog'langan muhokama guruhidagi izohlar soni |
| Ko'rishlar (views) | Postlarning o'rtacha va umumiy ko'rishlar soni |
| Obunachilar | Joriy obunachilar soni va davr bo'yicha o'sish/kamayish |
| Faollik indeksi | Yuqoridagi ko'rsatkichlardan hisoblanadigan umumiy reyting bali |
| Oxirgi faollik | Kanalda oxirgi post qachon chiqqani (nofaol kanallarni aniqlash) |

### 10.3. MUHIM texnik izoh: ma'lumot yig'ishning texnik cheklovlari

> **Diqqat!** Telegram **Bot API** orqali bot faqat o'zi **administrator** bo'lgan kanallardan ma'lumot ola oladi va bu ma'lumotlar cheklangan: post soni, reaksiyalar (Bot API 7.0+), izohlar (muhokama guruhi orqali) va joriy obunachilar soni olinadi. Ammo **postlarning ko'rishlar (views) sonini Bot API bermaydi.**

Shu sababli monitoring modulini qurishning ikki varianti mavjud. Dasturchi bilan kelishilgan holda biri tanlanadi:

| Variant | Yechim | Imkoniyat va cheklov |
|---|---|---|
| **A variant (oddiy)** | Faqat Bot API. Bot barcha OTT kanallarida admin bo'ladi va muhokama guruhlariga qo'shiladi. | Post soni, reaksiyalar, izohlar, obunachilar soni olinadi. **Ko'rishlar (views) OLINMAYDI.** Tez va arzon. |
| **B variant (to'liq)** | Bot API + qo'shimcha «userbot» komponenti (Telethon/Pyrogram, admin user-akkaunt bilan MTProto orqali). | Yuqoridagilarga qo'shimcha **ko'rishlar (views)** va Telegramning ichki batafsil statistikasi ham olinadi. Ko'proq ish talab qiladi. |

> **Tavsiya:** Bot allaqachon OTT kanallariga post tarqatish uchun ularda admin bo'lishi kerak — demak monitoring uchun qo'shimcha ruxsat deyarli talab qilinmaydi. Ko'rishlar (views) statistikasi siz uchun muhim bo'lsa — B variant tanlanadi.

### 10.4. Hisobotlar va ko'rinishlar
- **Har bir kanal bo'yicha alohida panel** — tanlangan kanalning barcha ko'rsatkichlari va dinamika grafigi.
- **Kanallar reytingi (leaderboard)** — barcha OTT kanallari faollik indeksi bo'yicha saralanadi. Eng faol va eng sust kanallar aniq ko'rinadi.
- **Haftalik va oylik avtomatik hisobot** — belgilangan vaqtda (masalan, har dushanba) adminlarga umumiy hisobot avtomatik yuboriladi; xohishga ko'ra har bir OTT yetakchisiga o'z kanali bo'yicha shaxsiy hisobot yuboriladi.
- **Nofaollik ogohlantirishi** — kanal belgilangan muddat (masalan, 5-7 kun) post chiqarmasa, bot avtomatik ogohlantiradi.
- **Taqqoslash** — ikki yoki undan ortiq kanalni yoki davrlarni (masalan, o'tgan oy va shu oy) yonma-yon solishtirish.
- **Eksport** — istalgan hisobotni Excel yoki PDF ko'rinishida yuklab olish.

### 10.5. Ma'lumotlar bazasiga qo'shimcha: `channel_stats` jadvali

| Maydon | Turi | Izoh |
|---|---|---|
| channel_id | BIGINT FK | Qaysi kanal |
| date | DATE | Statistika sanasi (kunlik snapshot) |
| posts_count | INT | Shu kundagi postlar soni |
| reactions | INT | Reaksiyalar soni |
| comments | INT | Izohlar soni |
| views | INT | Ko'rishlar (B variantda) |
| subscribers | INT | Kun oxiridagi obunachilar soni |

Kunlik snapshot yig'ib borilgani uchun istalgan davr (hafta, oy, chorak) bo'yicha dinamika va o'sishni hisoblash mumkin bo'ladi.

---

## 11. Botni ommaviy qilish (foydalanuvchilar uchun qatlam)
Hozirgi bot asosan adminlar uchun (tarqatish vositasi). Uni ommaviy qilish uchun oddiy foydalanuvchilar — talabalar va yoshlar uchun mo'ljallangan alohida qatlam qo'shiladi. Natijada bot ikki tomonlama bo'ladi:

| Foydalanuvchi qatlami (yoshlar) | Admin qatlami (yetakchilar) |
|---|---|
| Imkoniyatlarni ko'rish, qidirish, obuna bo'lish, zakovatda qatnashish | Tarqatish, kanallar bazasi, monitoring, statistika |

### 11.1. Imkoniyatlar katalogi
Botning o'zagi — «Yoshlar uchun imkoniyatlar» nomiga mos ravishda grantlar, stipendiyalar, tanlovlar, stajirovkalar, treninglar, xorijda ta'lim va tadbirlar to'plami. Har bir imkoniyat kategoriya, yo'nalish, muddat (deadline) va havola bilan saqlanadi.

- Kategoriya va yo'nalish bo'yicha filtr (masalan: IT grantlari, tibbiyot stipendiyalari, xorijda ta'lim);
- Kalit so'z bo'yicha qidiruv;
- Muddati yaqinlashayotgan imkoniyatlarni alohida ko'rsatish.

### 11.2. Shaxsiylashtirilgan obuna va bildirishnomalar
- Foydalanuvchi o'z qiziqishlarini (yo'nalish, OTT, hudud) tanlaydi;
- Yangi mos imkoniyat qo'shilganda bot avtomatik shaxsiy bildirishnoma yuboradi;
- Deadline eslatmasi — imkoniyat muddati tugashidan oldin (masalan, 3 kun qolganda) bot eslatadi.

### 11.3. Foydalanuvchi kontenti va moderatsiya
- Foydalanuvchilar o'z imkoniyat/tadbirlarini taklif qilishi mumkin;
- Takliflar admin tomonidan tasdiqlangach (moderatsiya) katalogga chiqadi — bu sifatni saqlaydi.

### 11.4. Ko'p tillilik
Bot kamida o'zbek (lotin), rus va ingliz tillarini qo'llab-quvvatlashi kerak — bu xorijiy OTT talabalari va rus tilli auditoriyani ham qamrab olishga imkon beradi. Til foydalanuvchi tomonidan tanlanadi.

---

## 12. Qiziqarli va jalb qiluvchi funksiyalar (qo'shimcha g'oyalar)
Quyidagilar tavsiyalar — botni yanada mukammal, qiziqarli va ommaviy qilish uchun:

### 12.1. Geymifikatsiya (ballar va nishonlar)
- Faollik uchun ball: zakovatda to'g'ri javob, do'stni taklif qilish, imkoniyatni ulashish uchun ballar beriladi;
- Darajalar va nishonlar (badge): to'plangan ballga qarab foydalanuvchi «Faol», «Zakovatchi», «Yetakchi» kabi darajalarga ko'tariladi;
- Umumiy va OTT ichidagi reyting jadvali — talabalar o'rtasida sog'lom raqobat.

### 12.2. Referal (taklif) tizimi
Har bir foydalanuvchiga shaxsiy taklif havolasi beriladi. Do'stini taklif qilgan foydalanuvchi ball yoki maxsus imtiyoz oladi. Bu botning ommaviy tarqalishining eng samarali yo'li — foydalanuvchilar botni o'zlari targ'ib qiladi.

### 12.3. Zakovat reytingi va avtomatik g'oliblar
- Zakovat savollariga javoblar avtomatik yig'iladi va reyting shakllanadi;
- Hafta/oy yakunida g'oliblar avtomatik e'lon qilinadi;
- Sertifikat yoki ramziy sovrin tizimini ulash mumkin.

### 12.4. Haftalik shaxsiy dayjest
Har bir foydalanuvchiga hafta yakunida uning qiziqishlariga mos «Shu hafta siz uchun» dayjesti avtomatik yuboriladi: yangi imkoniyatlar, yaqinlashayotgan deadline'lar, uning zakovatdagi natijasi.

### 12.5. AI-yordamchi (kelajakdagi bosqich)
Foydalanuvchi tabiiy tilda so'rov yozadi (masalan: «menga IT bo'yicha xorijda magistratura grantlari kerak»), bot esa katalogdan mos imkoniyatlarni topib beradi. Bu qidiruvni ancha qulaylashtiradi va botni «aqlli yordamchi»ga aylantiradi.

### 12.6. Telegram Mini App (Web App)
Bot ichida ishlaydigan mini-ilova — imkoniyatlar katalogini qulay vizual interfeysda ko'rish, kanallar reytingini grafik ko'rinishda kuzatish, shaxsiy profilni boshqarish uchun. Bu botni oddiy «tugmali menyu»dan zamonaviy ilovaga aylantiradi.

---

## 13. Muvaffaqiyat ko'rsatkichlari (KPI)
Botning ommaviyligi va samaradorligini o'lchash uchun quyidagilar kuzatiladi:

- Kunlik va oylik faol foydalanuvchilar soni (DAU / MAU);
- Yangi foydalanuvchilar o'sishi va referal orqali kelganlar ulushi;
- Foydalanuvchining qaytib kelishi (retention) — botda qolib faoliyat yuritishi;
- Imkoniyatlarga o'tishlar (havola bosishlar) soni;
- Zakovatda qatnashish darajasi;
- OTT kanallarining o'rtacha faollik indeksi o'sishi.

---

## 14. Yangilangan ish bosqichlari (II qism)

| Bosqich | Mazmuni | Natija |
|---|---|---|
| 5-bosqich | OTT kanallari monitoringi (A yoki B variant), leaderboard, haftalik/oylik hisobot | Faoliyatni ob'ektiv baholash |
| 6-bosqich | Foydalanuvchi qatlami: imkoniyatlar katalogi, obuna, bildirishnoma, ko'p tillilik | Bot ommaviy bo'ladi |
| 7-bosqich | Geymifikatsiya, referal, zakovat reytingi, dayjest | Jalb qilish va o'sish |
| 8-bosqich | AI-yordamchi va Telegram Mini App | Zamonaviy, aqlli ilova |

---

**Umumiy eslatma:** ushbu texnik topshiriq boshlang'ich variant bo'lib, dasturchi bilan kelishilgan holda aniqlashtirilishi va to'ldirilishi mumkin. Bosqichlar ketma-ket yoki muhimlik darajasiga qarab qayta tartiblanishi mumkin. Muddat va byudjet alohida shartnomada belgilanadi. Ustuvorlik tartibi: **1-bosqich (baza + panel)** → **5-bosqich (monitoring)** → **6-bosqich (ommaviy qatlam)**.
