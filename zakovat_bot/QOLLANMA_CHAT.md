# Online chat boti — test va foydalanish qo'llanmasi

Bot: **@yoshlaruchuntanlov_bot** · Tadbir: 9-avgust 20:00 (Toshkent vaqti)

Test uchun ikkita Telegram akkaunt qulay: biri **admin** (SUPER_ADMIN_ID
kiritilgan), ikkinchisi **oddiy foydalanuvchi** (hamkasb telefoni ham bo'ladi).

---

## 1-qism. Oddiy foydalanuvchi testi

| № | Qadam | Kutilgan natija |
|---|---|---|
| 1 | Shu havolani oching: `https://t.me/yoshlaruchuntanlov_bot?start=chat_09aug` va **Start** bosing | Tanishtiruv xabari: sana/vaqt + «✅ Ro'yxatdan o'tish» tugmasi |
| 2 | Tugmani bosing | «✍️ Ism va familiyangizni kiriting» |
| 3 | Ataylab xato kiriting: `Sardor` (bitta so'z) | ⚠️ xato xabari, qayta so'raydi |
| 4 | Yana xato: `Ali123` (raqam bilan) | ⚠️ xato xabari |
| 5 | To'g'ri kiriting: `Aliyev Sardor` | Telefon bosqichi + «📞 Telefon raqamni yuborish» tugmasi |
| 6 | Ataylab xato: `12345` | ⚠️ «noto'g'ri kiritildi» |
| 7 | Tugma orqali kontakt yuboring (yoki qo'lda `+998901234567`) | Tasdiqlash ekrani: ism, raqam, chat vaqti, eslatmalar haqida |
| 8 | «🙋 Ishtirok etaman» bosing | 🎉 Tabrik + ro'yxat raqami `#N` |
| 9 | Qayta `/start` yozing | «ℹ️ Siz allaqachon ro'yxatdan o'tgansiz» + ma'lumotlar + 2 tugma |
| 10 | «✏️ Ma'lumotni yangilash» | Oqim qaytadan boshlanadi, saqlagach yana holat |
| 11 | «❌ Ishtirokni bekor qilish» | Bekor xabari; qayta `/start` → yana ro'yxatdan o'tish taklifi |
| 12 | **Boshqa akkauntdan** xuddi shu telefon raqam bilan o'ting | ⚠️ «Bu raqam bilan allaqachon ro'yxatdan o'tilgan» |

---

## 2-qism. Admin testi

`/admin` → **💬 Online chat** bo'limi.

| № | Qadam | Kutilgan natija |
|---|---|---|
| 1 | Oddiy (admin bo'lmagan) akkauntdan `/admin` yozing | Bot **umuman javob bermaydi** (TZ talabi) |
| 2 | Admin akkauntdan `/admin` → 💬 Online chat | Menyu: sana, havola, ro'yxatdan o'tganlar soni |
| 3 | **📊 Statistika** | Jami / bugungi / bloklaganlar / eslatma foizlari |
| 4 | **📥 Eksport (.xlsx)** | Excel fayl: №, ism, telefon, ID, username, sana |
| 5 | **⏰ Eslatmalar holati** | 4 eslatma vaqtlari bilan (🕓 kutilmoqda / ✅ yuborilgan) |
| 6 | **⚙️ Sozlamalar → 🔗 Chat havolasi** | Chat guruh/kanal havolasini kiriting — «Chat boshlandi» xabarida shu ketadi. **Buni albatta kiriting!** |
| 7 | **📨 Ishtirokchilarga xabar** → test matn yozing | Ro'yxatdan o'tganlarning hammasiga keladi (o'zingiz ham ro'yxatdan o'tgan bo'lsangiz — sizga ham) |

---

## 3-qism. Eslatmalarni kutmasdan sinash (ehtiyot bo'ling!)

⚠️ **Diqqat:** eslatma **barcha ro'yxatdan o'tganlarga** ketadi. Bu sinovni
faqat e'lon kanalga chiqmasdan OLDIN, ro'yxatda faqat o'zingiz/jamoa
bo'lganida qiling.

1. `⚙️ Sozlamalar → 📅 Sana/vaqt` ga hozirgi vaqtdan **50 daqiqa keyingi**
   vaqtni kiriting (masalan hozir 15:00 bo'lsa → `05.08.2026 15:50`).
2. 1 daqiqa ichida «🔔 Chatga 1 soat qoldi!» eslatmasi keladi (scheduler har
   30 soniyada tekshiradi).
3. Endi sanani hozirdan **2 daqiqa keyinga** qo'ying → vaqti kelganda
   «🟢 Online chat boshlandi!» + havola keladi (havola kiritilgan bo'lsa).
4. Takror kelmasligini tekshiring: hech narsa qilmang — xabarlar qayta
   kelmaydi (idempotentlik).
5. **MUHIM:** sinov tugagach sanani qaytarib qo'ying:
   `09.08.2026 20:00`.

Eslatma turi bir marta yuborilgani bazada qayd etiladi. Agar sinovdan keyin
xuddi shu ishtirokchiga «toza» eslatma sinovi kerak bo'lsa, ishtirokni bekor
qilib qayta ro'yxatdan o'ting (yangi yozuv ochiladi).

---

## 4-qism. Jonli ishga tushirish tartibi

1. Yuqoridagi barcha testlar o'tdi ✅
2. Sana `09.08.2026 20:00` va **chat havolasi kiritilgan** ✅
3. Kanalga e'lon joylang (TZ'dagi matn), postga URL-tugma qo'shing:
   - Matn: **«📝 Ishtirok etish uchun ro'yxatdan o'ting»**
   - Havola: `https://t.me/yoshlaruchuntanlov_bot?start=chat_09aug`
4. Avtomatik jadval: 8-avg 20:00 (1 kun) → 9-avg 10:00 (10 soat) →
   9-avg 19:00 (1 soat) → 9-avg 20:00 (havola).
5. Kuzatish: `/admin → 💬 Online chat → Statistika / Eslatmalar holati`.
