# TEXNIK TOPSHIRIQ (TZ)

## Telegram bot orqali online chatga ro'yxatdan o'tish va avtomatik eslatma tizimi

**Buyurtmachi:** O'zbekiston Yoshlar ittifoqi Toshkent shahar hududiy Kengashi
**Loyiha nomi:** Online chat ishtirokchilarini ro'yxatga olish boti
**Bot manzili:** @yoshlaruchuntanlov_bot
**Hujjat sanasi:** "\_\_" \_\_\_\_\_\_\_\_\_ 2026-yil
**Hujjat raqami:** № \_\_\_\_\_\_\_

---

## 1. UMUMIY MA'LUMOT

### 1.1. Loyihaning maqsadi

Toshkent shahar hududiy Kengashining Telegram kanalida e'lon qilinadigan online chat tadbiriga yoshlarni avtomatlashtirilgan tarzda ro'yxatga olish, ularning kontakt ma'lumotlarini yig'ish va tadbir boshlanishidan oldin bosqichma-bosqich eslatmalar yuborish tizimini ishga tushirish.

### 1.2. Tadbir haqida ma'lumot

| Parametr | Qiymat |
|----------|--------|
| Tadbir turi | Online chat (Telegram) |
| Sana | 2026-yil 9-avgust (yakshanba) |
| Boshlanish vaqti | 20:00 (Toshkent vaqti, UTC+5) |
| Ro'yxatdan o'tish kanali | @yoshlaruchuntanlov_bot |
| E'lon joylashtiriladigan platforma | Kengashning rasmiy Telegram kanali |

### 1.3. Asosiy terminlar

- **Bot** — @yoshlaruchuntanlov_bot Telegram roboti;
- **Kanal** — Kengashning rasmiy Telegram kanali;
- **Deep link** — kanaldagi tugma bosilganda foydalanuvchini botga yo'naltiruvchi maxsus havola;
- **Ishtirokchi** — ro'yxatdan o'tish jarayonini to'liq yakunlagan foydalanuvchi;
- **Eslatma** — tizim tomonidan belgilangan vaqtda avtomatik yuboriladigan xabar;
- **Admin panel** — tashkilotchilar uchun boshqaruv va statistika bo'limi.

---

## 2. TIZIMNING UMUMIY ISHLASH SXEMASI

```
[Kanaldagi e'lon]
        │
        │ "Ishtirok etish uchun ro'yxatdan o'ting" tugmasi
        ▼
[Bot ochiladi — /start (deep link bilan)]
        │
        ▼
[Tanishtiruv xabari + "Ro'yxatdan o'tish" tugmasi]
        │
        ▼
[1-bosqich: Ism va familiya kiritish]
        │
        ▼
[2-bosqich: Telefon raqam yuborish]
        │
        ▼
[3-bosqich: Chat vaqti eslatiladi + "Ishtirok etaman" tugmasi]
        │
        ▼
[Ro'yxatdan o'tish yakunlandi — ma'lumot bazaga saqlanadi]
        │
        ▼
[Avtomatik eslatmalar: 1 kun → 10 soat → 1 soat oldin]
        │
        ▼
[Chat boshlanadi — havola/kirish yuboriladi]
```

---

## 3. FUNKSIONAL TALABLAR

### 3.1. Kanaldagi e'lon (F-01)

**Talab:** Kanalda joylashtiriladigan postga inline-tugma biriktirilishi shart.

- Tugma matni: **«📝 Ishtirok etish uchun ro'yxatdan o'ting»**
- Tugma turi: URL-tugma (inline keyboard)
- Havola formati: `https://t.me/yoshlaruchuntanlov_bot?start=chat_09aug`
- Tugma bosilganda foydalanuvchi hech qanday qo'shimcha amalsiz botga o'tishi va bot avtomatik ishga tushishi kerak;
- `start` parametri (`chat_09aug`) orqali tizim foydalanuvchi qaysi manbadan kelganini qayd etadi (UTM-hisobot uchun).

**E'lon matni namunasi (buyurtmachi tomonidan tasdiqlanadi):**

> 🗣 **ONLINE CHAT**
>
> O'zbekiston Yoshlar ittifoqi Toshkent shahar hududiy Kengashi bilan ochiq muloqot!
>
> 📅 Sana: 9-avgust, yakshanba
> 🕗 Vaqt: 20:00
> 📍 Format: Telegram online chat
>
> Ishtirok etish uchun quyidagi tugma orqali ro'yxatdan o'ting. Ro'yxatdan o'tganlarga chat boshlanishidan oldin eslatma yuboriladi.
>
> [📝 Ishtirok etish uchun ro'yxatdan o'ting]

### 3.2. Botga kirish va tanishtiruv (F-02)

Foydalanuvchi botga birinchi marta kirganda quyidagi xabar chiqadi:

> Assalomu alaykum, {ism}! 👋
>
> Siz O'zbekiston Yoshlar ittifoqi Toshkent shahar hududiy Kengashining **online chat** tadbiriga ro'yxatdan o'tish botidasiz.
>
> 📅 **9-avgust, yakshanba**
> 🕗 **Soat 20:00**
>
> Ro'yxatdan o'tish 1 daqiqadan kam vaqt oladi. Boshlash uchun quyidagi tugmani bosing.
>
> [✅ Ro'yxatdan o'tish]

**Talablar:**
- Tugma — reply keyboard yoki inline keyboard (ishlab chiquvchi tanlovi, lekin butun bot bo'ylab yagona uslub saqlanadi);
- Agar foydalanuvchi allaqachon ro'yxatdan o'tgan bo'lsa, «Ro'yxatdan o'tish» tugmasi o'rniga uning holati ko'rsatiladi (3.7-band).

### 3.3. 1-bosqich: Ism va familiya (F-03)

> ✍️ **Ism va familiyangizni kiriting**
>
> Namuna: *Aliyev Sardor*

**Validatsiya qoidalari:**

| Qoida | Tavsif |
|-------|--------|
| Minimal uzunlik | 5 belgi |
| Maksimal uzunlik | 60 belgi |
| Ruxsat etilgan belgilar | Lotin va kirill harflari, bo'sh joy, apostrof (`'`), defis (`-`) |
| Taqiqlangan | Raqamlar, emoji, maxsus belgilar, havolalar |
| Kamida ikki so'z | Ism va familiya alohida so'z bo'lishi shart |

Xatolik yuz berganda:
> ⚠️ Iltimos, ism va familiyangizni to'g'ri kiriting. Faqat harflardan foydalaning.
>
> Namuna: *Aliyev Sardor*

### 3.4. 2-bosqich: Telefon raqam (F-04)

> 📱 **Telefon raqamingizni yuboring**
>
> Quyidagi tugma orqali yuborishingiz yoki qo'lda kiritishingiz mumkin.
>
> Format: +998 XX XXX XX XX
>
> [📲 Raqamni yuborish]  ← `request_contact: true`

**Talablar:**
- `request_contact` tugmasi orqali yuborilgan raqam ustuvor hisoblanadi;
- Qo'lda kiritilgan raqam quyidagi regex bo'yicha tekshiriladi:
  `^(\+?998)?[\s\-]?(9[0-9]|33|55|77|88|20)[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$`
- Barcha raqamlar bazaga yagona normallashtirilgan formatda saqlanadi: `+998XXXXXXXXX`;
- Bir xil telefon raqam bilan takroriy ro'yxatdan o'tishga yo'l qo'yilmaydi (dublikat nazorati).

Xatolik yuz berganda:
> ⚠️ Telefon raqam noto'g'ri kiritildi. Iltimos, quyidagi formatda yuboring: **+998901234567**

### 3.5. 3-bosqich: Yakuniy tasdiqlash (F-05)

Ushbu bosqichda foydalanuvchiga kiritilgan ma'lumotlar va chat vaqti eslatilgan holda tasdiqlash so'raladi:

> ✅ **Ma'lumotlaringiz qabul qilindi**
>
> 👤 Ism-familiya: **{ism_familiya}**
> 📱 Telefon: **{telefon}**
>
> ━━━━━━━━━━━━━━━━━━
>
> 🗓 **Online chat vaqti:**
> **9-avgust, yakshanba — soat 20:00**
> (Toshkent vaqti)
>
> Chat boshlanishidan **1 kun**, **10 soat** va **1 soat** oldin sizga eslatma yuboriladi.
>
> Ro'yxatdan o'tishni yakunlash uchun quyidagi tugmani bosing:
>
> [🙋 Ishtirok etaman]  [✏️ Ma'lumotni o'zgartirish]

**«Ishtirok etaman» bosilgandan keyin:**

> 🎉 **Tabriklaymiz! Siz ro'yxatdan o'tdingiz.**
>
> Ro'yxat raqamingiz: **#{id}**
>
> 9-avgust kuni soat 20:00 da online chatda ko'rishguncha! Eslatmalarni o'tkazib yubormaslik uchun botni blokdan chiqarmang. 🤝

**«Ma'lumotni o'zgartirish» bosilganda** — jarayon 1-bosqichdan qayta boshlanadi.

### 3.6. Avtomatik eslatmalar (F-06)

Tizim ro'yxatdan o'tgan har bir ishtirokchiga quyidagi jadval bo'yicha avtomatik xabar yuboradi:

| № | Eslatma | Yuborish vaqti | Holat |
|---|---------|----------------|-------|
| 1 | 1 kun oldin | **8-avgust, 20:00** | Majburiy |
| 2 | 10 soat oldin | **9-avgust, 10:00** | Majburiy |
| 3 | 1 soat oldin | **9-avgust, 19:00** | Majburiy |
| 4 | Chat boshlandi | **9-avgust, 20:00** | Qo'shimcha (tavsiya etiladi) |

**Eslatma matnlari:**

**1-eslatma (1 kun oldin):**
> ⏰ **Eslatma: 1 kun qoldi**
>
> Hurmatli {ism}, ertaga — **9-avgust, soat 20:00** da online chat bo'lib o'tadi.
>
> Savollaringizni oldindan tayyorlab qo'ying! 📝

**2-eslatma (10 soat oldin):**
> ⏰ **Eslatma: bugun soat 20:00**
>
> Hurmatli {ism}, bugun kechqurun **soat 20:00** da online chat boshlanadi.
>
> Vaqtida qatnashishni unutmang! 🕗

**3-eslatma (1 soat oldin):**
> 🔔 **Chatga 1 soat qoldi!**
>
> Hurmatli {ism}, online chat **soat 20:00** da boshlanadi.
>
> Tayyor bo'ling — bir necha daqiqadan so'ng kirish havolasi yuboriladi. 🚀

**4-xabar (chat boshlanishi):**
> 🟢 **Online chat boshlandi!**
>
> Quyidagi havola orqali qo'shiling:
> {chat_havolasi}

**Texnik talablar:**
- Eslatmalar rejalashtiruvchi (scheduler) orqali yuboriladi: APScheduler, Celery Beat yoki cron;
- Vaqt mintaqasi qat'iy `Asia/Tashkent` (UTC+5) bo'yicha hisoblanadi;
- **Idempotentlik:** har bir ishtirokchiga har bir eslatma faqat **bir marta** yuborilishi kafolatlanadi (`reminders_log` jadvali orqali nazorat);
- **Kechikkan ro'yxatdan o'tish:** agar foydalanuvchi eslatma vaqti o'tib ketganidan keyin ro'yxatdan o'tsa, o'tib ketgan eslatmalar unga yuborilmaydi, faqat keyingi eslatmalar yuboriladi;
- **Throttling:** Telegram API cheklovlarini hisobga olib, ommaviy yuborishda sekundiga 25–30 tadan ortiq xabar yuborilmaydi;
- **Xatoliklarni qayta ishlash:** `403 Forbidden` (bot bloklangan) holatida foydalanuvchi `is_blocked = true` deb belgilanadi va keyingi urinishlar to'xtatiladi; `429 Too Many Requests` holatida `retry_after` bo'yicha kutib qayta yuboriladi;
- Yuborilmagan xabarlar 3 martagacha qayta urinib ko'riladi (interval: 1, 5, 15 daqiqa).

### 3.7. Takroriy murojaat (F-07)

Ro'yxatdan o'tgan foydalanuvchi botga qayta kirsa:

> ℹ️ Siz allaqachon ro'yxatdan o'tgansiz.
>
> 👤 {ism_familiya}
> 📱 {telefon}
> 🎫 Ro'yxat raqami: #{id}
>
> 📅 Online chat: **9-avgust, soat 20:00**
>
> [✏️ Ma'lumotni yangilash]  [❌ Ishtirokni bekor qilish]

### 3.8. Admin panel (F-08)

Bot ichida admin huquqiga ega foydalanuvchilar uchun `/admin` buyrug'i orqali kiriladigan bo'lim:

| Funksiya | Tavsif |
|----------|--------|
| 📊 Statistika | Jami ro'yxatdan o'tganlar, bugungi ro'yxat, botni bloklaganlar, eslatma yetkazilganlik foizi |
| 📥 Eksport | Ishtirokchilar ro'yxatini `.xlsx` formatida yuklab olish (№, ism-familiya, telefon, Telegram ID, username, ro'yxatdan o'tgan sana-vaqt) |
| 📨 Ommaviy xabar | Barcha ishtirokchilarga qo'lda xabar yuborish (matn, rasm, havola) |
| ⏰ Eslatmalar holati | Har bir eslatma bo'yicha yuborilgan/yuborilmagan xabarlar soni |
| ⚙️ Sozlamalar | Tadbir sanasi va vaqti, chat havolasini o'zgartirish |

**Talab:** Admin ID'lari `.env` faylida yoki bazadagi `admins` jadvalida saqlanadi. Adminlar ro'yxatiga kirmagan foydalanuvchiga `/admin` buyrug'i hech qanday javob bermaydi.

---

## 4. MA'LUMOTLAR BAZASI STRUKTURASI

### 4.1. `users` jadvali

| Maydon | Tur | Tavsif |
|--------|-----|--------|
| `id` | SERIAL PK | Ichki identifikator (ro'yxat raqami) |
| `telegram_id` | BIGINT UNIQUE | Telegram foydalanuvchi ID'si |
| `username` | VARCHAR(64) | Telegram username (bo'lishi shart emas) |
| `full_name` | VARCHAR(60) | Ism va familiya |
| `phone` | VARCHAR(20) UNIQUE | Normallashtirilgan telefon raqam |
| `source` | VARCHAR(32) | Deep link parametri (`chat_09aug`) |
| `status` | VARCHAR(16) | `pending` / `registered` / `cancelled` |
| `is_blocked` | BOOLEAN | Bot bloklanganligi belgisi |
| `created_at` | TIMESTAMP | Ro'yxatdan o'tgan vaqt |
| `updated_at` | TIMESTAMP | Oxirgi yangilanish |

### 4.2. `reminders_log` jadvali

| Maydon | Tur | Tavsif |
|--------|-----|--------|
| `id` | SERIAL PK | Identifikator |
| `user_id` | INT FK → users.id | Ishtirokchi |
| `reminder_type` | VARCHAR(16) | `1day` / `10hours` / `1hour` / `start` |
| `status` | VARCHAR(16) | `sent` / `failed` / `blocked` |
| `attempts` | SMALLINT | Urinishlar soni |
| `error_message` | TEXT | Xatolik matni (agar mavjud bo'lsa) |
| `sent_at` | TIMESTAMP | Yuborilgan vaqt |

**Cheklov:** `UNIQUE (user_id, reminder_type)` — takroriy yuborishning oldini oladi.

### 4.3. `events` jadvali (kengaytirish uchun)

| Maydon | Tur | Tavsif |
|--------|-----|--------|
| `id` | SERIAL PK | Tadbir identifikatori |
| `title` | VARCHAR(255) | Tadbir nomi |
| `start_at` | TIMESTAMPTZ | Boshlanish vaqti |
| `chat_link` | TEXT | Chat havolasi |
| `is_active` | BOOLEAN | Faollik holati |

---

## 5. TEXNIK TALABLAR

### 5.1. Texnologiyalar stеki

| Komponent | Tavsiya etilgan yechim |
|-----------|------------------------|
| Dasturlash tili | Python 3.11+ |
| Bot kutubxonasi | aiogram 3.x (yoki Node.js — Telegraf 4.x) |
| Ma'lumotlar bazasi | PostgreSQL 14+ |
| Rejalashtiruvchi | APScheduler / Celery Beat |
| Kesh va navbat | Redis |
| Joylashtirish | Docker + Docker Compose, VPS (Ubuntu 22.04 LTS) |
| Jarayon nazorati | systemd yoki Docker restart policy |

### 5.2. Umumiy texnik talablar

1. Bot **24/7** uzluksiz ishlashi va serverni qayta ishga tushirilganda avtomatik tiklanishi shart;
2. Barcha vaqt hisob-kitoblari `Asia/Tashkent` (UTC+5) mintaqasida amalga oshiriladi;
3. Bot token, baza parollari va admin ID'lari faqat `.env` faylida saqlanadi, kodda ochiq ko'rinishda yozilmaydi;
4. Har bir foydalanuvchi holati FSM (Finite State Machine) orqali boshqariladi;
5. Barcha xatoliklar log faylga (`logs/bot.log`) yoziladi, kritik xatoliklar admin chatiga yuboriladi;
6. Ma'lumotlar bazasining avtomatik zaxira nusxasi kuniga 1 marta olinadi;
7. Bot bir vaqtning o'zida kamida **10 000** foydalanuvchiga xizmat ko'rsata olishi kerak;
8. Ommaviy yuborish 5 000 ta ishtirokchiga **10 daqiqadan** ortiq vaqt olmasligi lozim.

### 5.3. Xavfsizlik va shaxsiy ma'lumotlar

1. Foydalanuvchilarning shaxsiy ma'lumotlari (ism-familiya, telefon raqam) O'zbekiston Respublikasining 2019-yil 2-iyuldagi «Shaxsga doir ma'lumotlar to'g'risida»gi ЎРҚ-547-son Qonuni talablariga muvofiq qayta ishlanadi;
2. Ro'yxatdan o'tishning birinchi bosqichida foydalanuvchiga ma'lumotlari faqat mazkur tadbir doirasida ishlatilishi haqida xabar beriladi;
3. Ma'lumotlar bazasi tashqi tarmoqdan bevosita ochiq bo'lmasligi kerak;
4. Barcha ma'lumotlar O'zbekiston Respublikasi hududida joylashgan serverda saqlanadi;
5. Ma'lumotlarni eksport qilish huquqi faqat adminlarga beriladi va har bir eksport qayd etiladi (audit log).

---

## 6. TESTLASH VA QABUL QILISH MEZONLARI

### 6.1. Test ssenariylari

| № | Ssenariy | Kutilayotgan natija |
|---|----------|---------------------|
| T-01 | Kanaldagi tugma bosiladi | Bot ochiladi va tanishtiruv xabari chiqadi |
| T-02 | To'g'ri ism-familiya kiritiladi | Keyingi bosqichga o'tadi |
| T-03 | Raqamli/noto'g'ri ism kiritiladi | Xatolik xabari chiqadi, bosqich takrorlanadi |
| T-04 | Kontakt tugmasi orqali raqam yuboriladi | Raqam qabul qilinadi va normallashtiriladi |
| T-05 | Noto'g'ri formatdagi raqam kiritiladi | Xatolik xabari chiqadi |
| T-06 | «Ishtirok etaman» bosiladi | Ma'lumot bazaga saqlanadi, tasdiq xabari chiqadi |
| T-07 | Ro'yxatdan o'tgan foydalanuvchi qayta kiradi | Holati ko'rsatiladi, takroriy yozuv yaratilmaydi |
| T-08 | Eslatma vaqti keladi | Barcha ishtirokchilarga xabar yetib boradi |
| T-09 | Foydalanuvchi botni bloklaydi | `is_blocked = true`, xatolik ushlanadi, bot ishdan chiqmaydi |
| T-10 | Eslatma vaqtidan keyin ro'yxatdan o'tiladi | O'tib ketgan eslatma yuborilmaydi |
| T-11 | Scheduler ikki marta ishga tushadi | Takroriy xabar yuborilmaydi |
| T-12 | Admin `/admin` buyrug'ini kiritadi | Panel ochiladi; oddiy foydalanuvchida javob yo'q |
| T-13 | 1 000 ta test foydalanuvchisiga ommaviy yuborish | Xatoliksiz, throttling bilan yakunlanadi |

### 6.2. Qabul qilish mezonlari

Loyiha quyidagi shartlar bajarilganda qabul qilinadi:

- [ ] Barcha funksional talablar (F-01 – F-08) to'liq amalga oshirilgan;
- [ ] Barcha test ssenariylari (T-01 – T-13) muvaffaqiyatli o'tgan;
- [ ] Eslatmalar belgilangan vaqtdan ±2 daqiqa aniqlik bilan yuborilgan;
- [ ] Bot matnlari imlo xatolarisiz, o'zbek adabiy tili normalariga muvofiq;
- [ ] Admin panel ishlaydi va `.xlsx` eksport to'g'ri shakllanadi;
- [ ] Loyiha manba kodi va texnik hujjatlari buyurtmachiga topshirilgan;
- [ ] Server sozlamalari va kirish ma'lumotlari buyurtmachiga topshirilgan.

---

## 7. ISH BOSQICHLARI VA MUDDATLAR

| № | Bosqich | Muddat | Natija |
|---|---------|--------|--------|
| 1 | TZ tasdiqlash, matnlarni kelishish | 1-kun | Tasdiqlangan TZ |
| 2 | Baza strukturasi va bot skeleti | 2-kun | Ishlaydigan `/start` |
| 3 | Ro'yxatdan o'tish oqimi (F-02 – F-05) | 3-kun | To'liq ro'yxat oqimi |
| 4 | Eslatmalar tizimi (F-06) | 4-kun | Ishlaydigan scheduler |
| 5 | Admin panel (F-08) | 5-kun | Statistika va eksport |
| 6 | Testlash va xatoliklarni tuzatish | 6-kun | Test hisoboti |
| 7 | Serverga joylashtirish va topshirish | 7-kun | Ishga tushirilgan bot |

**Muhim:** Tizim **2026-yil 7-avgust soat 12:00** gacha to'liq ishga tushirilgan va sinovdan o'tkazilgan bo'lishi shart, chunki birinchi eslatma **8-avgust soat 20:00** da avtomatik yuborilishi kerak.

---

## 8. TOPSHIRILADIGAN MATERIALLAR

1. Loyihaning to'liq manba kodi (Git repozitoriysi);
2. `.env.example` fayli va sozlash bo'yicha yo'riqnoma;
3. Ma'lumotlar bazasi migratsiya fayllari;
4. Docker Compose konfiguratsiyasi;
5. Admin uchun foydalanuvchi qo'llanmasi (PDF yoki Markdown);
6. Test hisoboti;
7. Server kirish ma'lumotlari va bot tokeni.

---

## 9. QO'SHIMCHA SHARTLAR

1. Ishlab chiquvchi tomonidan tizim topshirilgandan so'ng **30 kun** davomida bepul texnik qo'llab-quvvatlash ta'minlanadi;
2. TZ doirasidan tashqari qo'shimcha funksiyalar alohida kelishuv asosida amalga oshiriladi;
3. Bot matnlari va e'lon matnlari buyurtmachi tomonidan yakuniy tasdiqlanadi;
4. Loyiha doirasida yig'ilgan barcha ma'lumotlar buyurtmachining mulki hisoblanadi.

---

**Buyurtmachi tomonidan tasdiqlandi:**

| Lavozim | Imzo | F.I.O. | Sana |
|---------|------|--------|------|
| \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ | \_\_\_\_\_\_\_\_ | \_\_\_\_\_\_\_\_\_\_\_\_\_\_ | \_\_\_\_\_\_\_\_ |

**Ijrochi tomonidan qabul qilindi:**

| Lavozim | Imzo | F.I.O. | Sana |
|---------|------|--------|------|
| \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ | \_\_\_\_\_\_\_\_ | \_\_\_\_\_\_\_\_\_\_\_\_\_\_ | \_\_\_\_\_\_\_\_ |
