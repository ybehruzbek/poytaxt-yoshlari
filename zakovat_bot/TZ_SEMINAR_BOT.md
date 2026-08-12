# TEXNIK TOPSHIRIQ

**@yoshlaruchuntanlov_bot Telegram-botiga tadbirga ro‘yxatdan o‘tish funksiyasini joriy etish bo‘yicha**

*Tuzilgan sana: 2026-yil 12-avgust*

---

## 1. UMUMIY MA’LUMOT

**1.1. Loyihaning maqsadi.** «Barqaror rivojlanish maqsadlari yoshlar nigohida» mavzusidagi seminar-treningga ishtirokchilarni **@yoshlaruchuntanlov_bot** Telegram-boti orqali ro‘yxatdan o‘tkazish funksiyasini ishlab chiqish va ishga tushirish.

**1.2. Tadbir haqida ma’lumot (bot xabarlarida ishlatiladi):**

| Parametr | Qiymat |
|---|---|
| Tadbir nomi | «Barqaror rivojlanish maqsadlari yoshlar nigohida» seminar-treningi |
| Sana | 2026-yil 13-avgust |
| Vaqt | 14:00 |
| Joy | «Ziyo Forum» |
| Manzil | Toshkent shahri, Yakkasaroy tumani, Qushbegi ko‘chasi, 8-uy, ZiyoForum Yoshlar markazi |
| Majburiy obuna kanali | `https://t.me/poytaxtyoshlari_yi` |

**1.3. MUHIM — MUDDAT:** tadbir **2026-yil 13-avgust** kuni bo‘lib o‘tadi, ya’ni funksiya **shu kunning o‘zida, 13-avgust soat 10:00 dan kechikmay** to‘liq ishlagan holda ishga tushirilishi shart. E’lon posti tayyor bo‘lishi bilan bot qabul qilishga tayyor turishi kerak.

---

## 2. KIRISH NUQTASI (DEEP LINK)

1. E’lon postidagi «Ro‘yxatdan o‘tish» tugmasi/havolasi foydalanuvchini to‘g‘ridan-to‘g‘ri botga olib o‘tishi kerak. Buning uchun deep link ishlatiladi: `https://t.me/yoshlaruchuntanlov_bot?start=brm_seminar`
2. Havola bosilganda Telegram botni ochadi va foydalanuvchi **«Start»** tugmasini bosishi bilan ro‘yxatdan o‘tish jarayoni avtomatik boshlanadi (qo‘shimcha buyruq talab qilinmasin).
3. `start` parametri (`brm_seminar`) bazada saqlansin — kelgusida bir bot orqali bir nechta tadbirga ro‘yxat olish imkoni bo‘lishi uchun ro‘yxatga olish aynan shu tadbir identifikatoriga bog‘lansin.
4. Foydalanuvchi deep link’siz, oddiy `/start` buyrug‘i bilan kirsa ham, ayni paytda faol tadbir bitta bo‘lgani uchun xuddi shu ro‘yxatdan o‘tish jarayoni boshlansin.

---

## 3. MAJBURIY OBUNA TEKSHIRUVI

**3.1.** Foydalanuvchi «Start» bosgach, ro‘yxatdan o‘tishdan **avval** uning `@poytaxtyoshlari_yi` kanaliga a’zoligi tekshirilsin (`getChatMember` metodi orqali; `member`, `administrator`, `creator` statuslari a’zo hisoblanadi).

**3.2. Texnik shart:** obunani tekshira olishi uchun bot **@poytaxtyoshlari_yi kanaliga administrator sifatida qo‘shilgan bo‘lishi shart**. Bu ishni kanal egasi bilan kelishib, ishga tushirishdan oldin bajarish dasturchi zimmasiga yuklatiladi.

**3.3.** Agar foydalanuvchi a’zo bo‘lmasa, quyidagi mazmundagi xabar chiqarilsin:

```
Assalomu alaykum! 👋

«Barqaror rivojlanish maqsadlari yoshlar nigohida» seminar-treningiga
ro‘yxatdan o‘tish uchun avval «Poytaxt yoshlari» kanaliga a’zo bo‘ling.

[ 📢 Kanalga a’zo bo‘lish ]   (URL tugma → https://t.me/poytaxtyoshlari_yi)
[ ✅ A’zo bo‘ldim ]           (callback tugma — qayta tekshiradi)
```

**3.4.** «A’zo bo‘ldim» tugmasi bosilganda a’zolik qayta tekshirilsin: a’zo bo‘lsa — ro‘yxatdan o‘tish boshlansin; a’zo bo‘lmasa — «Siz hali kanalga a’zo bo‘lmadingiz. Iltimos, avval kanalga a’zo bo‘ling» degan ogohlantirish chiqsin (xabarlar takror yuborilib chatni to‘ldirmasin — mavjud xabarni tahrirlash yoki callback-answer orqali).

**3.5.** Ro‘yxatdan o‘tishning har bir keyingi bosqichida a’zolik qaytadan tekshirilishi shart emas — faqat boshlanishda bir marta tekshirilsa kifoya.

---

## 4. RO‘YXATDAN O‘TISH JARAYONI (BOSQICHMA-BOSQICH)

### 4.1-bosqich. F.I.Sh. so‘rash

```
Ajoyib! ✅ Ro‘yxatdan o‘tishni boshlaymiz.

Iltimos, familiya, ism va sharifingizni to‘liq kiriting:
Masalan: Karimov Aziz Baxtiyorovich
```

- **Validatsiya:** kamida 2 ta so‘z, faqat harflar, apostrof (’, ‘) va defis qabul qilinsin; raqam yoki emoji kiritilsa — «Iltimos, F.I.Sh.ni to‘g‘ri kiriting» xabari bilan qayta so‘ralsin.

### 4.2-bosqich. Telefon raqamini so‘rash

```
Rahmat! Endi telefon raqamingizni yuboring.

Quyidagi tugmani bosing yoki raqamni qo‘lda kiriting:
Masalan: +998901234567

[ 📱 Raqamni yuborish ]   (reply keyboard, request_contact = true)
```

- «Raqamni yuborish» tugmasi orqali kelgan kontaktdan raqam avtomatik olinsin (faqat foydalanuvchining o‘z kontakti qabul qilinsin — `contact.user_id == from.id` tekshiruvi).
- **Qo‘lda kiritishda validatsiya:** `+998XXXXXXXXX` yoki `998XXXXXXXXX` yoki `XXXXXXXXX` (9 raqam) formatlari qabul qilinsin; bazaga yagona `+998XXXXXXXXX` ko‘rinishida keltirilib saqlansin. Noto‘g‘ri format — qayta so‘ralsin.

### 4.3-bosqich. Tadbir ma’lumotlari va yakuniy tasdiqlash

F.I.Sh. va telefon qabul qilingach, botga quyidagi xabar chiqarilsin:

```
📋 Ma’lumotlaringiz qabul qilindi!

👤 F.I.Sh.: {fish}
📞 Telefon: {telefon}

📌 Tadbir: «Barqaror rivojlanish maqsadlari yoshlar nigohida»
    seminar-treningi
📅 Sana: 2026-yil 13-avgust
🕑 Vaqt: 14:00
📍 Manzil: Toshkent shahri, Yakkasaroy tumani,
    Qushbegi ko‘chasi, 8-uy, ZiyoForum Yoshlar markazi

[ ✅ Ishtirok etaman ]   (inline tugma)
[ ✏️ Ma’lumotlarni o‘zgartirish ]
```

- «Ishtirok etaman» bosilgandagina yozuv bazada **«tasdiqlangan»** maqomini oladi va ro‘yxatdan o‘tish yakunlanadi.
- «Ma’lumotlarni o‘zgartirish» bosilsa — jarayon F.I.Sh. bosqichidan qayta boshlansin.

### 4.4-bosqich. Yakuniy xabar

```
🎉 Tabriklaymiz! Siz seminar-treningga muvaffaqiyatli
ro‘yxatdan o‘tdingiz.

📅 13-avgust, soat 14:00 | 📍 ZiyoForum Yoshlar markazi
(Qushbegi ko‘chasi, 8-uy, Yakkasaroy tumani)

⏰ Iltimos, tadbir boshlanishidan kamida 20–25 daqiqa oldin
yetib keling — ro‘yxatni tekshirish va joylashish uchun.

Sizni tadbirda kutib qolamiz! 🤝
```

---

## 5. MAXSUS HOLATLAR

1. **Takroriy urinish:** avval ro‘yxatdan o‘tgan foydalanuvchi qayta «Start» bossa — «Siz allaqachon ro‘yxatdan o‘tgansiz ✅» xabari va tadbir ma’lumotlari ko‘rsatilsin; yangi yozuv yaratilmasin (bir `telegram_id` — bir yozuv).
2. **Jarayonni yarim yo‘lda tashlab ketish:** foydalanuvchi holati (state) saqlanib, keyinroq qaytganda jarayon uzilgan bosqichdan davom ettirilsin yoki «Start» orqali boshidan boshlash imkoni berilsin.
3. **Kutilmagan xabarlar:** jarayondan tashqarida yuborilgan istalgan matnga bot tushunarli javob qaytarsin (masalan, «Ro‘yxatdan o‘tish uchun /start buyrug‘ini bosing»).
4. **/help buyrug‘i:** qisqacha yo‘riqnoma va tashkilotchi bilan bog‘lanish uchun kontakt (mas’ul shaxs kontakti buyurtmachi tomonidan beriladi).

---

## 6. MA’LUMOTLAR BAZASI

Har bir ro‘yxatdan o‘tish bo‘yicha quyidagi ma’lumotlar saqlansin (SQLite/PostgreSQL — dasturchi tanloviga havola, lekin ma’lumot yo‘qolmasligi kafolatlansin):

| Maydon | Turi | Izoh |
|---|---|---|
| `id` | butun son, PK | Avtomatik |
| `event_id` | matn | Deep link parametri (`brm_seminar`) |
| `telegram_id` | butun son | Foydalanuvchining Telegram ID’si (unikal) |
| `username` | matn | @username (bo‘lsa) |
| `fish` | matn | F.I.Sh. |
| `phone` | matn | +998XXXXXXXXX formatida |
| `is_subscribed` | mantiqiy | Ro‘yxatdan o‘tish paytidagi obuna holati |
| `status` | matn | «tasdiqlangan» / «tugallanmagan» |
| `created_at` | sana-vaqt | Ro‘yxatdan o‘tgan vaqt (Toshkent vaqti) |

---

## 7. ADMINISTRATOR FUNKSIYALARI

Quyidagi funksiyalar faqat oldindan belgilangan admin `telegram_id`’lar uchun ishlasin:

1. `/stat` — jami ro‘yxatdan o‘tganlar soni (tasdiqlanganlar / tugallanmaganlar kesimida).
2. `/export` — ro‘yxatni Excel (.xlsx) faylida yuklab olish: №, F.I.Sh., telefon, username, ro‘yxatdan o‘tgan vaqt ustunlari bilan.
3. `/send` — barcha tasdiqlangan ishtirokchilarga xabar (broadcast) yuborish imkoni. Tadbir kuni ertalab eslatma yuborish uchun ishlatiladi. Imkon bo‘lsa, 13-avgust soat 09:00 da avtomatik eslatma ham sozlansin: «Bugun soat 14:00 da seminar-trening bo‘lib o‘tadi. Iltimos, kamida 20–25 daqiqa oldin yetib keling. Manzil: ...».

---

## 8. TEXNIK TALABLAR

- Telegram Bot API asosida; dasturlash tili/freymvork dasturchi ixtiyorida (tavsiya: Python — aiogram, yoki Node.js — grammY/Telegraf).
- Bot 24/7 uzluksiz ishlashi ta’minlansin (server/hosting va bot tokeni buyurtmachi tomonidan taqdim etiladi yoki dasturchi bilan kelishiladi).
- Bir vaqtning o‘zida kamida 200–300 foydalanuvchi murojaatiga bemalol xizmat ko‘rsata olsin.
- Barcha bot matnlari o‘zbek tilida (lotin yozuvida), yuqoridagi namunalarga muvofiq bo‘lsin; matnlarni kod ichiga «qattiq» yozmasdan, alohida konfiguratsiya faylida saqlash tavsiya etiladi (keyingi tadbirlarda oson o‘zgartirish uchun).
- Shaxsiy ma’lumotlar (F.I.Sh., telefon) uchinchi shaxslarga berilmasin; bazaga faqat adminlar kira olsin.
- Xatoliklar log faylga yozilsin; bot yiqilib qolsa avtomatik qayta ishga tushirish (systemd/pm2 va h.k.) sozlansin.

---

## 9. ISHNI QABUL QILISH MEZONLARI (TEST SSENARIYLARI)

1. E’lon postidagi havola bosilganda bot ochiladi; «Start» bosilishi bilan jarayon avtomatik boshlanadi.
2. Kanalga a’zo bo‘lmagan foydalanuvchi ro‘yxatdan o‘ta olmaydi; a’zo bo‘lib «A’zo bo‘ldim» bosgach jarayon davom etadi.
3. F.I.Sh. va telefon validatsiyadan o‘tadi; «Raqamni yuborish» tugmasi ishlaydi.
4. Yakunda tadbir sanasi, vaqti va manzili hamda **20–25 daqiqa oldin kelish haqidagi eslatma** ko‘rsatilib, «Ishtirok etaman» bosilgach ma’lumotlar bazaga tushadi.
5. Takror kirgan foydalanuvchiga qayta ro‘yxat ochilmaydi.
6. `/stat` va `/export` admin buyruqlari to‘g‘ri ishlaydi; eksport faylida barcha yozuvlar mavjud.
7. Bot 13-avgust soat 10:00 gacha ishchi holatda topshiriladi va e’lon chiqqach real oqimda sinovdan o‘tkaziladi.

---

**Eslatma:** bot xabarlaridagi matnlar namuna sifatida berilgan — dasturchi ularni aynan shu mazmunda, lekin texnik jihatdan qulay shaklda joriy etishi mumkin. Mazmuniy o‘zgartirishlar buyurtmachi bilan kelishiladi.
