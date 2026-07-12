# O'zgarishlar jurnali

> Loyihadagi barcha muhim ishlar shu yerda yoziladi — eng yangisi tepada.
> Har yozuvda: nima qilindi, nega qilindi, va bilish kerak bo'lgan eslatmalar.
> Batafsil reja: [PLAN.md](PLAN.md). Texnik topshiriq: `poytaxt_yoshlari_TZ.md`.

---

## [0.9.13] — 2026-07-12 · Missiya sahifasi qayta dizayn: seam bug, o'lik CSS, brend tokenlari

**Seam (tikuv) bug tuzatildi:** `/tashkilot/missiya` `<main>`ga inline
`background: var(--bg-light)` berilgan, `MissiyaValues` seksiyasi ham
`var(--bg-light)` fonda edi. `--bg-light` (#F3F6FA) sahifa tanasidagi `--bg`
(#F6F8FC) dan boshqa deyarli-oq rang — natijada seksiyalar orasida ko'rinadigan
gorizontal chiziq paydo bo'lardi. Ikkalasi ham olib tashlandi (`main` fonsiz,
seksiya `transparent`) — endi butun sahifa yagona `--bg` fonida.

**716 qatorlik o'lik CSS o'chirildi:** `app/tashkilot/missiya/Missiya.module.css`
hech qayerda import qilinmagan orphan fayl edi (grep bilan tasdiqlandi) — o'chirildi.

**Begona Tailwind palitrasi brend tokenlariga ko'chdi:** `MissiyaValues`dagi
6 ta hardcode hex (`#0ea5e9, #10b981, #f59e0b, #8b5cf6, #ef4444, #0f172a`)
brend tokenlari bilan almashtirildi (`--blue, --green-check, --amber, --teal,
--accent-orange, --blue-deep`). Butun missiya modullaridagi noto'g'ri fallback
hexlar (`var(--blue, #0ea5e9)` va h.k.) tozalandi. `MissiyaPrinciples` va
`MissiyaHero`dagi slate gradientlari (rgba 15,23,42) va qora soyalar
(rgba 0,0,0) navy'ga (rgba 15,37,71) yoki `--shadow-*` tokenlariga ko'chirildi;
`MissiyaCTA`dagi begona emerald blob (rgba 16,185,129) brend-yashilga
(rgba 108,162,60) o'zgardi.

**Soxta "Batafsil →" olib tashlandi:** `MissiyaValues` kartalaridagi
o'q-strelkali "Batafsil" matni havolasiz `<div` ustidagi bosib bo'lmaydigan
dekorativ element edi — o'chirildi, karta endi sof ma'lumot kartasi.

**Girih naqsh urg'ulari qo'shildi:** qadriyatlar bentosining birinchi (urg'uli)
kartasiga yulduz-girih (opacity 0.06, yuqori-o'ng burchakda, matnga tegmaydi),
CTA qutisiga esa oq rozetka burchak urg'usi (opacity 0.08, bitta uzluksiz
radial gradient bilan so'nadi — qattiq halqasiz).

**CTA sarlavhasi serif-lede'ga aylandi:** Cormorant Garamond italic
(ChairmanMessage/yetakchi-profil tili bilan bir xil). CTA tugmasi lokal
`!important`li CSS'dan global `.btn-hero-secondary` (to'q fon uchun oq-kontur)
klassiga ko'chdi, ortiqcha lokal tugma CSS'i o'chirildi.

**Hero'ga `divider-romb` qo'shildi** (matn tekislanishiga mos — chapda, to'q
fonda oq-shaffof chiziqlar) va `loading.tsx` skeleton qo'shildi (qardosh
route'lardagi konvensiya: `variant="grid" cards={6}`).

**Verifikatsiyada topilgan 2 ta mobil hero bug tuzatildi** (qayta dizayndan
oldin ham bor edi):
- Sarlavha 375px'da o'ngdan kesilardi ("QADRIYATLA...") — `clamp()` minimumi
  48px tor ekran uchun juda katta; mobilda `clamp(32px, 9.5vw, 48px)`.
- Kartaning qat'iy `height: 600px`i uzun kontentni tepadan kesib
  (`overflow: hidden`), breadcrumbs ko'rinmay qolardi — `min-height: 600px;
  height: auto` (kontent sig'masa karta o'zi cho'ziladi).

---

## [0.9.12] — 2026-07-12 · Yetakchilar sahifalari qayta dizayn: qidiruv, filtr, navy hero-profil

**Ro'yxat sahifasi (/yetakchilar) — qidiruv va filtr qo'shildi:**
Sahifa loyihalar patterniga o'tdi: `page.tsx` yupqa server qobiq (metadata,
fetch, PageHeader, naqsh fon), butun grid va filtrlar yangi
`YetakchilarClient.tsx`ga ko'chdi (LoyihalarGrid andozasi).
- **Jonli qidiruv** — ism/joy/kategoriya bo'yicha, o'zbekcha apostrof
  normalizatsiyasi bilan: `'`, `'`, `ʻ`, `` ` `` belgilari bitta belgiga
  keltiriladi — "o'zbekiston" deb oddiy apostrof bilan yozsangiz ham
  ma'lumotdagi tipografik `ʻ` topiladi (brauzerda tasdiqlandi).
- **Kategoriya pill-filtrlari** — `category` erkin matn bo'lgani uchun
  hardcode emas, ma'lumotdan `Set` bilan olinadi.
- **Natija soni** ("N ta yetakchi") va **bo'sh holat** ("Filtrlarni tozalash"
  tugmasi bilan).
- **Soxta ijtimoiy tugmalar haqiqiy havolaga aylandi:** hover'dagi
  Telegram/Instagram ikonkalari bosib bo'lmaydigan `<span>` edi. Endi
  stretched-link patterni (karta `<div>`, detalga absolut qatlam-havola,
  ijtimoiy `<a>`lar yuqori z-index'da) — ichma-ich `<a>` yaroqsiz HTML'siz.
  Ko'rinmas holatda `pointer-events:none` — bosishni karta havolasidan
  "o'g'irlamaydi". Havolasi yo'q yetakchida ikonka umuman chiqmaydi.
- Kartalarga ScrollReveal stagger va `:active` bosim effekti qo'shildi.
- Bug: `.location i` o'lik selektor edi (ikonka `svg`) — joy pin'i mo'ljallangan
  yashil rangni hech qachon olmagan. Tuzatildi.

**Detal sahifasi (/yetakchilar/[id]) — to'liq yangi dizayn:**
Umumiy `ProfileDetail`dan chiqdi (u rahbariyat bilan bo'lishilgan — unga
tegilmadi, regressiya tekshirildi). Yangi to'q navy gradient hero-karta:
portret, oq ism, kategoriya badge o'z brend rangida, girih rozetka burchakda
(uzluksiz radial so'nish, qattiq chegarasiz), bio'ning birinchi xatboshisi
Cormorant serif italic lede sifatida hero ichida, qolgani "Faoliyati"
bo'limida, yakunda CTA. Ijtimoiy havolalar faqat mavjud bo'lsa chiqadi.

**Kategoriya ranglari umumiy modulga ko'chdi (`app/yetakchilar/accent.ts`):**
har kategoriya uchun uch ton — och fon matni / to'q fon badge to'ldirishi /
badge ustidagi matn rangi (NavigationCards'dagi kontrast saboqlari:
bitta rang ikkala fonda ham o'qiladi degan taxmin xato edi).

**PageHeader (30+ sahifa umumiy):**
- Sarlavhadan tashqari elementlar (breadcrumbs, label, tavsif, divider)
  animatsiyasiz edi — endi ScrollReveal kaskadi bilan chiqadi (sarlavhaning
  TextReveal so'z-niqob animatsiyasi bilan sinxron).
- `divider-romb` chapga yopishib qolardi (`margin: ... 0`) — endi sahifa
  markazida (`margin: ... auto`).

---

## [0.9.11] — 2026-07-12 · Tashkilot sahifasi qayta dizayn + sitewide bug tuzatishlar

**Footer ikonkalari ko'rinmayotgan edi:** `Footer.tsx` FontAwesome sinflaridan
(`fab`, `fas`) foydalanardi, lekin loyihada FontAwesome hech qachon ulanmagan
— butun sayt `@phosphor-icons/react` ishlatadi (`Contact.tsx`dagi kabi).
Ikonkalar Phosphor komponentlariga almashtirildi va o'lchami kattalashtirildi
(ijtimoiy tarmoq ikonkalari 16px→20px, aloqa ro'yxati 14px→19px).

**Backdrop-filter sitewide bug:** Turbopack/Lightning CSS `backdrop-filter`
xususiyatini butunlay tashlab yuborar edi, agar undan keyin qo'lda yozilgan
`-webkit-backdrop-filter` qatori kelsa (ikkalasi ham yo'qolardi). Shu sababli
"Biz Kimmiz?" pillasi va yana 8 ta joyda blur/glass effekt umuman
ko'rinmasdi: `TashkilotHeroSlider`, `Yetakchilar`, `YouthLeaders` (2 joy),
`Gallery`, `Appeals`, `Directions`, `Districts`, `Stats`, `NavigationCards`.
Ortiqcha `-webkit-` qatori olib tashlandi — barcha joyda backdrop-filter
endi ishlaydi.

**ChairmanMessage (Rahbar so'zi) qayta dizayn:**
- Sarlavha shrifti `--font-heading` (Jost, italic) dan `--font-serif`ga
  (Cormorant Garamond) o'tkazildi — bu shrift `layout.tsx`da "iqtibos uchun"
  deb alohida ajratilgan edi, lekin hech qayerda ishlatilmagan; endi
  `SardorlarEditorial` bilan bir xil pull-quote uslubida.
  * Ikkita alohida qatorni `<blockquote>`ga birlashtirdik, chapdan ingichka
  chiziq va haqiqiy tipografik qo'shtirnoq (" ") bilan.
- Qo'lda yasalgan, ko'rinmas "massive watermark quote" (`"` belgisi,
  `overflow:hidden` bilan kesilib qolgan) o'chirildi, o'rniga mavjud
  naqsh-kit (`naqsh-rozetka`) portret orqasida ko'rinadigan medalyon bilan
  almashtirildi.
- **Haqiqiy bug tuzatildi:** mobil/planshetda (<1024px) `.imageCol` 0×0
  o'lchamga qulab tushar, portret rasm butunlay ko'rinmas edi — grid
  elementining aniq `width` yo'qligi va `imageWrapper`ning
  `width:100% + aspect-ratio` kombinatsiyasi orasidagi CSS
  circular-sizing muammosi. `.imageCol`ga `width:100%; min-width:0;`
  qo'shib tuzatildi.

**Naqsh-kit ko'proq joyda, lekin "bilinar-bilinmas" darajada:**
`TashkilotValues`dagi "Vatanparvarlik" fotokartasida (tepa qismida, matnga
tegmaydigan joyda) va `TashkilotStructure` ("Tashkilot Arxitekturasi") fon
teksturasi sifatida qo'shildi. Opacity va gradient bir necha marta
moslashtirildi: birinchi urinish juda kuchli chiqib matnni o'qib bo'lmas
darajaga keldi, keyin radial-gradient mask bilan "faqat bir burchakda
ko'rinsin" qilindi, so'ng gradientdagi qattiq "core→fade" chegarasi olib
tashlanib (bitta uzluksiz gradient), ko'zga tashlanadigan halqa/chegara
yo'qotildi.

**Bo'limlar orasidagi ko'rinadigan chegaralar (seam) tuzatildi:**
`ChairmanMessage`, `TashkilotTimelinePreview` va `NavigationCards` uchtasi
ham o'z bo'limiga qo'lda `var(--bg-light)` fon rangi qo'ygan edi — qo'shni
bo'limlar esa sahifaning umumiy `var(--bg)` foniga tayanadi (`transparent`).
Ikkala rang deyarli bir xil (`#F3F6FA` vs `#F6F8FC`), lekin katta tekis
maydonda bu farq ko'zga aniq chiziq bo'lib ko'rinardi. Barchasi
`transparent`ga o'tkazilib, butun pastki yarim sahifa uzluksiz fonga keldi.

**NavigationCards ("Davom etish / Batafsil tanishing") qayta dizayn:**
Har bir qatorga o'z brend rangi (och ko'k / yashil / amber) — raqam, faol
holatdagi urg'u chizig'i va strelka tugmasi shu rangda. Faol qatorda
yumshoq highlight panel, strelka tugmasida scale+rang mos soya, fon
rasmi overlay'i tekis rangdan gradientga o'zgartirildi. Yo'lda topilgan
kontrast xatolar tuzatildi: `var(--blue)` (to'q navy) qorong'i overlay
fonida deyarli ko'rinmasdi (och ko'k bilan almashtirildi), keyin oq
strelka belgisi shu och ko'k to'ldirish ustida ko'rinmay qoldi (har bir
rang uchun alohida ikonka rangi — sky/amber uchun to'q ko'k, yashil uchun
oq — qo'shildi).

---

## [0.9.10] — 2026-07-11 · Naqsh-kit haqiqiy girih fayllari bilan almashtirildi

**Muammo:** Paket 6'da qo'lda chizilgan "naqsh-yulduz"/"naqsh-romb"/"naqsh-panjara"
aslida girih yoki o'zbek naqsh qurilish qoidalariga asoslanmagan, shunchaki
umumiy geometrik shakllar edi (foydalanuvchi to'g'ri payqadi — "haqiqiy
o'zbekona naqshlar emas"). O'zim qayta qurishga urinib ko'rdim (ikki
bir-biriga qo'yilgan kvadrat = haqiqiy girih yulduz konstruksiyasi;
36°/144° girih rombi) — birinchisi to'g'ri chiqdi, lekin "bodom" va
"offset romb" urinishlari o'zim tekshirganda buzuq chiqdi (brauzerda
skrinshot bilan tasdiqladim, ular ishlatilmadi).

**Yechim:** Foydalanuvchi 3 ta professional, haqiqiy girih SVG fayl berdi
(`public/pattern/`):
- **`girih-tile.svg`** (asli `s2.svg`, 2.8MB → svgo bilan 1.7MB'ga
  optimallashtirildi) — Registan uslubidagi o'zaro kesishgan interlaced
  strapwork tessellatsiya. Fon to'ldirilgan rangi (`fill:#79bcd7`) olib
  tashlandi, faqat oq strapwork qoldirildi — endi `mask-image` +
  `currentColor` texnikasi bilan istalgan rangga moslashadi.
- **`rozetka.svg`** (asli `ss.svg`, 40KB) — bitta o'nqirrali girih
  gul-medalyon, markaziy motiv sifatida (`.naqsh-rozetka` klassi).
- **`footer.svg`** (171KB) — gorizontal yulduz-zanjir lentasi, footer
  ornamenti uchun tayyor (o'z rangi/opacity'si bilan).

**O'zgargan joylar:**
- `.naqsh-yulduz` endi `girih-tile.svg`ga ishora qiladi (data-URI o'rniga
  `url("/pattern/...")` — fayl hajmi tufayli endi tashqi so'rov, brauzer
  keshlaydi). 404/error sahifalari avtomatik yangi naqshni oldi.
- Footer'dagi qo'lda yasalgan 5 ta rangli nuqta ornament o'chirildi,
  o'rniga haqiqiy `footer.svg` lentasi (`background-image`, chunki fayl
  o'z rangi/opacity'sini o'zida saqlaydi — mask texnikasi kerak emas).
- Ishlatilmagan/tasdiqlanmagan `.naqsh-romb`, `.naqsh-panjara`,
  `.naqsh-burchak` klasslari globals.css'dan olib tashlandi.

**Eslatma:** `girih-tile.svg` 1.7MB — bitta murakkab strapwork asar
uchun katta, lekin faqat tanlangan "wow" joylarda ishlatiladi va birinchi
yuklanishdan keyin brauzer keshida qoladi. Production'da gzip/brotli bilan
haqiqiy tarmoq hajmi ancha kichik bo'ladi.

---

## [0.9.9] — 2026-07-11 · Naqsh poydevori + real a11y/UX tuzatishlar (Paket 6)

**Yangi naqsh-kit — o'zbek girih naqshlarini fon teksturasi sifatida ishlatish
tizimi (`app/globals.css`):**
- `.naqsh-yulduz` (sakkiz qirrali yulduz to'ri), `.naqsh-romb`, `.naqsh-panjara`,
  `.naqsh-burchak` — barchasi `mask-image` bilan chiziladi, rangi elementning
  `color` xususiyatidan (currentColor) keladi, shuning uchun hech qanday hex
  yozilmaydi va istalgan fonga moslashadi. Faqat dekorativ fon, opacity past.
- `.divider-romb` — footer ornamentining bir rangli, ingichka varianti;
  endi **`PageHeader`ning har bir sahifasida** sarlavha ostida chiqadi
  (30+ sahifa avtomatik yangilandi, bitta joyda o'zgartirilgani uchun).

**Real accessibility bug tuzatildi:**
- **`framer-motion` animatsiyalari (TextReveal — har bir sahifa sarlavhasi,
  Stats) OS darajasidagi "harakatni kamaytirish" sozlamasini butunlay
  e'tiborsiz qoldirardi.** `ScrollReveal` buni JS orqali o'zi tekshirardi,
  lekin `motion/react` animatsiyalari uchun `MotionConfig` wrapper yo'q edi.
  `providers/ThemeProvider.tsx`ga `<MotionConfig reducedMotion="user">`
  qo'shildi — endi butun sayt bo'ylab bitta joydan hal qilinadi.

**Soxta UI olib tashlandi:**
- **Til almashtirgich (UZ/RU/EN)** navbardan olib tashlandi — bosilganda
  faqat yorliq o'zgarardi, hech qanday tarjima ishlamasdi (4-til rejasi
  hali Faza 6, TZ §14). Foydalanuvchini chalg'itish o'rniga to'liq
  yashirildi; real tarjima qo'shilgach qaytariladi.

**Brendlangan 404/500 va yuklanish holatlari:**
- `not-found.tsx` va `error.tsx` yangi ulashiladigan `ErrorState`
  komponentiga o'tdi — naqsh-yulduz fon, izchil token-asosli tipografika
  (ilgari qo'lda yozilgan inline style obyektlari edi).
- **18 ta `loading.tsx`** qo'shildi (barcha async DB-fetch qiluvchi
  sahifalarga: ro'yxat sahifalarida karta-to'r skeleton, detail
  sahifalarda maqola skeleton). Yangi `Skeleton`/`PageSkeleton`
  komponentlari — shimmer animatsiyasi `prefers-reduced-motion`ni
  hurmat qiladi. Streaming SSR orqali tekshirildi: sahifa 3+ soniya
  kutsa ham, birinchi bayt ichida skeleton keladi (oq ekran yo'q).

**Eslatma:** `tashkilot/missiya` va `tashkilot/tarix` sahifalari async
DB-fetch qilmaydi (statik kontent) — `loading.tsx` ularga ta'sir
qilmasdi, shuning uchun qo'shilmadi.

---

## [0.9.8] — 2026-07-11 · Huquqiy sahifalar kontenti yozildi (Paket 5)

**`/maxfiylik-siyosati` va `/foydalanish-shartlari` — "tayyorlanmoqda" placeholder
matni real kontent bilan almashtirildi (TZ §19.1):**
- Maxfiylik siyosati: 9 bo'lim — qanday ma'lumot to'planadi (murojaat va tadbirga
  ro'yxatdan o'tish formalaridagi haqiqiy maydonlar asosida), foydalanish maqsadi,
  uchinchi shaxslarga berilmasligi, saqlash/xavfsizlik, cookie holati (hozircha
  faqat admin sessiyasi — ommaviy sahifalarda kuzatuv cookie'si yo'q), foydalanuvchi
  huquqlari, bog'lanish.
- Foydalanish shartlari: 9 bo'lim — platforma maqsadi, foydalanuvchi majburiyatlari,
  intellektual mulk, tashqi havolalar, xizmat uzluksizligi, shaxsiy ma'lumotlarga
  havola, bog'lanish.
- Ikkala sahifa yangi `components/ui/LegalPage/` ulashiladigan qatlamidan
  foydalanadi (PageHeader + "oxirgi yangilanish" sanasi + izchil h2/p/ul
  tipografikasi) — ilgari ikkalasida ham bitta qo'lda yozilgan `<p style={{...}}>`
  bor edi.

**Eslatma:** matn haqiqiy tashkiliy ma'lumotlarga (manzil, telefon, email — Footer
bilan bir xil) asoslangan qoralama. Yuridik xizmat tomonidan tasdiqlanishi tavsiya
etiladi, ayniqsa "Shaxsiy ma'lumotlar to'g'risida"gi Qonunga muvofiqlik bo'yicha.

---

## [0.9.7] — 2026-07-11 · Editorial sahifalar tozalandi (Paket 4)

**Ikkita real bug tuzatildi (dizayndan tashqari):**
- **`/tashkilot` statistikasi endi bazadan** — "12 ta", "300+", "50,000+", "80+" qo'lda
  yozilgan raqamlar edi. Loyihada allaqachon shu aniq maqsad uchun tayyorlangan
  `MiniStats` komponenti va `Stat` jadvalining `"mini"` guruhi bor edi — lekin hech
  qayerda ishlatilmagan (500 000+ a'zo, 14 filial, 1200+ loyiha, 33+ yil). Endi
  ulangan; raqamlar admin panel > Statistika bo'limidan boshqariladi.
- **`/rahbariyat` ro'yxatidagi kontakt ma'lumotlari endi haqiqiy** — har bir
  rahbar kartasida bir xil matn qattiq yozilgan edi ("Qabul kunlari: Seshanba,
  Payshanba 10:00-12:00", "info@yoshlartoshkent.uz" — hammasiga bittadan).
  `Leader` jadvalida `receptionDays` va `email` maydonlari mavjud va detail
  sahifada ishlatiladi edi — ro'yxat sahifasi ularni e'tiborsiz qoldirib
  o'zining qo'lda yozilgan matnini ko'rsatardi. Endi har bir karta o'z
  rahbarining haqiqiy qabul kunini ko'rsatadi va butun karta uning profiliga
  havola (`Link`) bo'ldi (ilgari faqat rasm bosiladigan emas edi).
- `parseReceptionDays()` yordamchisi `lib/format.ts`ga ko'chirildi — ilgari
  faqat `rahbariyat/[id]` sahifasida yozilgan edi, endi ro'yxat sahifasi ham
  ishlatadi (ikki joyda bir xil kodni saqlash o'rniga).

**Dizayn izchilligi:**
- `/tashkilot/tarix` — 5 ta tarixiy voqea rasmi xom `<img>` tegi bilan
  chizilardi (`next/image` optimallashtirishisiz, hydration ogohlantirishisiz
  emas). Endi `next/image fill` bilan.
- `/tashkilot/tarix` — sahifada ishlatilmagan, `TarixStats` komponenti ichida
  aynan takrorlangan o'lik `stats` massivi o'chirildi.
- `/faoliyat` — o'zining lokal `sectionLabel`/`sectionTitle` klasslari (yashil
  rang, ALL CAPS majburlangan) global `.section-label`/`.section-title`
  klasslariga almashtirildi — endi landing bilan bir xil tipografik til
  (to'q-sariq eyebrow chiziq bilan, Title Case sarlavha).

**Eslatma — qolgan ish:** yana 9 ta komponentda (`RahbariyatApparat`,
`MissiyaDirections`, `SardorlarEditorial`, `TashkilotStructure` va h.k.) o'z
lokal eyebrow/label uslubi bor. Bular PLAN.md dizayn tizimi bo'limida
"maxsus wow joylar" sifatida qoldirilishi mumkin bo'lgan bespoke editorial
bo'limlar — to'liq unifikatsiya alohida qaror talab qiladi.

---

## [0.9.6] — 2026-07-11 · 4 ta detail sahifa qayta qurildi (Paket 3)

**Eng eskicha 4 sahifa — dizayn tizimidan butunlay tashqarida edi:**
`rahbariyat/[id]`, `yetakchilar/[id]`, `loyihalar/[slug]`, `yangiliklar/[slug]` — har birida
CSS moduli yo'q, hammasi qo'lda yozilgan `style={{...}}` obyektlari edi (jami ~60 ta inline
style: hardcode `fontSize:'40px'`, `boxShadow:'0 20px 40px rgba(0,0,0,0.1)'`, non-pill
`borderRadius:'8px'` tugma, ikkita joyda so'zma-so'z takrorlangan `socialBtn` obyekti).

**Ikkita ulashiladigan komponent yaratildi:**
- `components/ui/ProfileDetail/` — rahbariyat va yetakchilar profil sahifalari uchun umumiy
  qatlam (rasm + badge + sarlavha + ijtimoiy tugmalar + kontent). Ikkalasi bir xil vizual
  strukturaga ega edi, faqat kontent farq qilardi.
- `components/ui/ArticleDetail/` — loyiha va yangilik sahifalari uchun umumiy qatlam
  (badge/meta qatori + sarlavha + banner rasm + matn).
- `components/ui/BackLink/` — "← Ortga qaytish" havolasi, 4 joyda so'zma-so'z takrorlangan edi.

**Natija:** har bir sahifa endi CSS Modules tokenlaridan foydalanadi (`--radius`,
`--shadow-xl`, `--sp-*`), "Ariza topshirish" tugmasi global `.btn-primary` pill uslubiga
o'tdi (ilgari tekis `borderRadius:8px` edi). Qabul kunlari jadvalidagi oxirgi qatorning
border yo'qligi endi CSS `:last-child` bilan hal qilinadi — JS ichida qo'lda `i < length - 1`
shart yozish shart emas.

---

## [0.9.5] — 2026-07-11 · PageHeader yagonalashtirildi (Paket 2)

**Bosh sahifadan tashqari sahifalarni bitta dizayn tiliga keltirish:**
- **`PageHeader` endi navbar bo'shlig'ini o'zi hisoblaydi** — sahifalarda qo'lda yozilgan `style={{paddingTop:'70px'}}` yoki `'160px'` inline qiymatlar o'rniga komponent `--nav-h`/`--nav-top` tokenlaridan foydalanadi. Pastki bo'shliq uchun yangi global `.page-body` utility klassi.
- **3 ta sahifaga sarlavha qo'shildi** — `hududlar`, `axborot-markazi`, `murojaat` ilgari to'g'ridan-to'g'ri bo'lim bilan boshlanardi (breadcrumb yo'q, `<h1>` yo'q). Endi barchasida `PageHeader` (label + sarlavha + tavsif + breadcrumb).
- **PageHeader tipografikasi landing bilan bittalashtirildi** — o'zining alohida `font-size`/`color` qiymatlari o'rniga endi `.section-title` bilan bir xil token (`--fs-4xl`, `--blue-deep`, Manrope).
- **Sarlavha takrorlanishi olib tashlandi** — `hududlar` va `murojaat` sahifalarida yangi `PageHeader` sarlavhasi ostidagi bo'lim ham deyarli bir xil matn yozardi («Ovozingizni eshitamiz», «Toshkent shahar tumanlari»); ikkinchi darajali sarlavhalar farqlantirildi.
- **Yangiliklar ro'yxati (`/yangiliklar`) qayta yozildi** — ilgari `News.module.css`'ni tashqi inline style bilan bosib qayta ishlatardi (`position:absolute` rasm to'liq ekran bo'lib chiqib ketardi). Endi mustaqil `Yangiliklar.module.css` bilan grid kartochkalar, hardcode inline style yo'q.

**Eslatma:** 4 ta detail sahifa (`rahbariyat/[id]`, `yetakchilar/[id]`, `loyihalar/[slug]`, `yangiliklar/[slug]`) hali ham inline style bilan yozilgan — Paket 3 da qayta quriladi.

---

## [0.9.4] — 2026-07-11 · Singan havolalar tuzatildi, FAQ bo'limi qo'shildi

**Sayt bo'ylab link auditi o'tkazildi (Paket 1):**
- **4 ta singan mega-menyu havolasi tuzatildi**: `/faoliyat/grantlar` (bunday yo'nalish yo'q edi) → «Tadbirlar» havolasi bilan almashtirildi; `/faoliyat/talabalar` → to'g'ri slug `/faoliyat/talaba-yoshlari`; mavjud bo'lmagan `/axborot-markazi/video` va `/axborot-markazi/press-reliz` → bitta «Media markaz» (`/axborot-markazi`) havolasiga birlashtirildi.
- **5 ta ishlamaydigan anchor tuzatildi**: footer'dagi `/tashkilot#tashkilot`, `#hujjatlar`, `#rahbariyat` endi to'g'ridan-to'g'ri sahifalarga boradi; `/faoliyat#yonalishlar` va `#loyihalar` uchun faoliyat sahifasiga mos `id` lar qo'shildi.
- **Yangi FAQ bo'limi** — `/murojaat#savol-javob` havolasi bor edi, bo'limning o'zi yo'q edi. 6 savolli accordion qo'shildi (`components/Faq/`): server komponent, `<details>` asosida — JS talab qilmaydi, landing dizayn tilida (`.section-label`, tokenlar).
- **O'lik kod o'chirildi**: `components/CTA/` hech qayerda ishlatilmasdi (ichida `href="#"` placeholder ham bor edi).

**Eslatma:** ijtimoiy tarmoq havolalari (Telegram/Instagram/YouTube/Facebook) hali ham `#` — buyurtmachidan rasmiy sahifa URL'lari kutilmoqda.

---

## [0.9.3] — 2026-07-11 · Footer logo oq siluэt + yangiliklar lentasi to'ldirildi

**Foydalanuvchi fikri asosida:**
- **Footer logotipi endi o'zi oq** — oldingi oq kartacha yechim o'rniga CSS `filter: brightness(0) invert(1)` bilan logotipning o'zi bir rangli oq silуэtga aylantirildi (shaffoflik saqlanadi).
- **Yangiliklar lentasidagi bo'sh joy to'ldirildi** — bazada atigi 6 ta yangilik bor edi (3 tasi aylanishda, faqat 3 tasi lentaga yetardi, 4-o'rin bo'sh qolardi). 2 ta yangi yangilik qo'shildi («IT Park bilan hamkorlik», «Yosh tadbirkor tanlovi») — endi lenta to'liq.

---

## [0.9.2] — 2026-07-11 · Footer qayta ishlandi: to'q navy, o'lik havolalar tuzatildi

**Nima qilindi:**
- **Footer fon rangi oqdan to'q navy'ga** (`--blue-deep`) — sayt hero'dan boshlanib, navy footer bilan "yopiladi"; yumshoq yashil glow va romb-ornament qatori hero bilan bitta vizual tilda.
- **Logo oq kartachaga o'ralди** — logotipning matni och-ko'k, to'q fonda yo'qolib qolardi.
- **Ijtimoiy tarmoq ikonkalari** — eski `translateY` sakrash-hover olib tashlandi, endi faqat rang o'zgaradi (yashilga to'ladi) — tugmalar tizimi bilan bir xil mantiq.
- **2 ta o'lik havola tuzatildi**: «Maxfiylik siyosati» va «Foydalanish shartlari» `href="#"` edi — endi haqiqiy sahifalarga (`/maxfiylik-siyosati`, `/foydalanish-shartlari`) olib boradi, TZ §19.1 talabiga muvofiq placeholder matn bilan.
- Footer navigatsiyasiga **«Tadbirlar»** havolasi qo'shildi (yangi bo'lim, ilgari yo'q edi).

---

## [0.9.1] — 2026-07-11 · Aylanadigan yangiliklar qaytdi + navbar zichlashdi

**Nima qilindi:**
- **Yangiliklar aylanishi qaytdi** — eski hero slayderi ruhida, endi «So'nggi voqealar» bo'limidagi katta kartada: eng so'nggi 3 yangilik 6 soniyada yumshoq krossfeyd bilan almashadi, rasm ustida bosiladigan nuqtalar bor. O'ngdagi lenta esa keyingi 4 yangilikni ko'rsatadi (takrorlanish yo'q).
- **Navbar bo'shliqlari yo'qotildi** — pill 1400px, ichki qator esa 1300px edi: har chetda 50px bo'sh joy shundan qolardi. Endi kontent pill chetlarigacha boradi; pill kengligi 1240px'ga ixchamlashdi.

---

## [0.9.0] — 2026-07-11 · Navbar: bazadan boshqariladi, ixcham, login menyu ichida

**Nima qilindi:**
- **Navbar havolalari endi bazadan** — admin panelda yangi **«Menyu»** bo'limi: nom, havola, tartib raqami, ko'rinadi/yo'q. Ko'rinadigan birinchi 5 tasi navbar qatorida chiqadi, tartibni sudrab emas, raqam bilan boshqarasiz. (Yangi `NavLink` jadvali, migratsiya `add_nav_links`.)
- **Balandlik ixchamlashdi**: desktop 80→66px, mobil 64→58px; logo mosravishda kichraydi.
- **«Tizimga kirish» asosiy qatordan olib tashlandi** — endi burger-menyu ichida, kontakt bloki ostida sokin kulrang havola (hover'da navy). Asosiy qator endi faqat: logo · havolalar · til · burger.

**Eslatma:** menyuga yangi havola qo'shish — Admin → Menyu → «Yangi havola». Dev serverda yangi jadval qo'shilgandan keyin server qayta ishga tushirilishi kerak (eski Prisma klienti xotirada qoladi).

---

## [0.8.3] — 2026-07-11 · Tugmalar: minimal, faqat rang bilan ishlaydigan hover

**Foydalanuvchi fikri asosida:** tugma hoverlar "sakraydigan" va notekis edi.

**Nima qilindi:**
- Barcha global tugmalardan (`btn-primary`, `btn-secondary`, `btn-view-all`, `nav-cta`, hero tugmalari) **ko'tarilish, scale va soya-sakrashlar olib tashlandi**.
- Yangi tizim — faqat sokin rang o'tishlari (0.35s ease): primary navy→chuqur navy; secondary och-ko'k bir tonna quyuqlashadi; «Barchasi» konturli tugma hover'da yumshoq och-ko'kka to'ladi (faqat ichidagi strelka 4px siljiydi); bosishda yengil opacity.
- Tadbir ro'yxatdan o'tish formasi tugmasi ham shu tizimga o'tdi (pill shakl).
- Karta hoverlari (ko'tarilish) atayin qoldirildi — muammo tugmalarda edi; ichki sahifalardagi qolgan tugmalar ichki-sahifa dizayn bosqichida tekislanadi.
- **Qo'shimcha tuzatish (fikrdan keyin):** hover ranglari juda och edi — endi konturli tugma hover'da **to'liq navy'ga to'ladi** (oq matn), secondary ham navy bo'ladi, navbar CTA yanada quyuqlashadi. Konturli tugmaning default foni shaffof emas — **oq**.

---

## [0.8.2] — 2026-07-11 · Kartalar yakuniy: progress olib tashlandi, yangiliklar «digest»

**Foydalanuvchi fikri asosida:**
- **Loyihalar kartasidan foiz/progress-chiziq olib tashlandi** — landing kartada ortiqcha ma'lumot edi (gradient ham ketdi). Endi: rasm + kategoriya + sarlavha + tavsif + «Batafsil».
- **Tadbir kartalariga oq fon qaytdi** — loyihalar bilan bir xil karta yuzasi (oq, 24px radius, hover'da ko'tarilish).
- **Yangiliklar butunlay yangi «digest» maketida**: chapda bitta katta bosh yangilik (rasm + sarlavha + qisqacha + «O'qish»), o'ngda 4 ta ixcham gorizontal qator (kichik rasm + teg + sana + sarlavha) — gazeta lentasi uslubi. Hover'da qatorlar o'ngga siljiydi. Har bo'lim endi o'z xarakteriga ega: loyihalar — grid, tadbirlar — grid, yangiliklar — lenta.

---

## [0.8.1] — 2026-07-11 · Tinchlantirish: ranglar soddalashdi, silliqlik tuzatildi

**Foydalanuvchi fikri asosida:** juda rang-barang bo'lib ketgan edi, scroll silliq emasdi, loyiha kartalariga o'z foni kerak edi.

**Nima qilindi:**
- **Ranglar soddalashdi**: har bo'limda boshqa rang almashinuvi o'rniga bitta xotirjam juftlik (yashil + amber, past opacity) — bo'limlar orasida rang emas, faqat yengil siljish.
- **Silliqlik tuzatildi** (scroll jank sabablari): `background-attachment: fixed` olib tashlandi (har kadrda qayta chizdirardi); glow qatlamlari kichraytirildi (40vw → 30vw) va blur yengillashtirildi (150px → 90-100px) — GPU yuki keskin kamaydi; rang-transition o'rniga faqat transform.
- **Loyihalar kartalariga o'z foni qaytdi**: oq karta ichida rasm (baraka uslubi), kategoriya + jonli progress-chiziq + sarlavha; umumiy bo'lim foni yo'q.

---

## [0.8.0] — 2026-07-11 · Chegarasiz oqim: landing to'liq ochiq uslubga o'tdi

**Foydalanuvchi fikri asosida:** ark radiuslar kartalardan olib tashlandi, bo'lim orasidagi barcha "quti" fonlar yo'qotildi — hero'dagi ochiq-havodor his endi butun sahifada.

**Nima qilindi:**
- **Bo'lim chegaralari yo'qoldi**: band'lar (krem/havorang), Events oq oroli, Projects kulrang bloki — hammasi olib tashlandi. Sahifa endi bitta uzluksiz oqim.
- **Ambient fon kuchaytirildi**: har bo'limda brend ranglari (yashil, amber, teal, navy) yumshoq dog' bo'lib 1.5s'da almashadi — "sahna" endi chegara bilan emas, rang bilan ajraladi.
- **Loyihalar kartalari butunlay yangi**: quti yo'q — rasm (16px radius, hover'da sekin zoom + jonlanish), kategoriya yorlig'i + jonli progress-chiziq + foiz, sarlavha (hover'da teal), tavsif, «Batafsil →». Editorial-jurnalcha uslub.
- **Yangiliklar kartalari ham shu tilda**: pastel qutilar va ark olib tashlandi — rasm + sana + sarlavha ochiq turadi, featured yangilik katta rasm bilan.
- **Tadbirlar kartalari (bosh sahifa)** ham qutisiz qilindi — uchala bo'lim bitta vizual oilada.

---

## [0.7.0] — 2026-07-11 · Matn animatsiyalari va kartalar (dizayn 2-bosqich)

**Nima qilindi:**
- **TextReveal komponenti** — sarlavha so'zlari niqob ostidan birma-bir ko'tarilib chiqadi (premium "mask reveal" effekti). Bosh sahifadagi barcha bo'lim sarlavhalari + barcha ichki sahifalar sarlavhalari (PageHeader) shu animatsiya bilan chiqadi. Skrinriderlar uchun to'liq matn saqlangan.
- **Yangiliklar kartalari qayta ishlandi** — baraka uslubida: har karta o'z pastel-gradient olamida (krem / havorang / yashil, almashinib), rasmlar **ark-tepali** (gumbaz shakli), hero arki bilan bitta vizual til.
- **Loyihalar kartalari** — har ikkinchi karta ark shaklida, qator "mozaika" ritmini oldi.
- **Hamma bo'lim animatsiyalari yagona tilga o'tdi** — 1s, `cubic-bezier(0.65, 0, 0.35, 1)` (Events, Projects, News, Stats).
- **Tizimli bug tuzatildi: FontAwesome JS → CSS versiyasi.** JS versiyasi `<i>` teglarni `<svg>` ga almashtirib React hydration'ni buzardi (151 joyda, PLAN Faza 4 muammosi). CSS versiyada bu muammo yo'q — hydration xatolari butunlay yo'qoldi.

---

## [0.6.0] — 2026-07-11 · Baraka-uslub dizayn tizimi (1-bosqich)

**Yo'nalish:** baraka.gov.uz tahlil qilindi (skrinshot + CSS'dan o'lchab olindi) va uning "premium his" beruvchi elementlari o'zimizga moslashtirildi — nusxa emas, yoshlar identiteti bilan.

**Nima qilindi:**
- **Shrift: Manrope → Jost** (baraka sarlavha shrifti; kirillchasi bor — 4 til rejasiga ham mos).
- **Reveal animatsiyalar sekinlashtirildi**: 0.6s → 1s, baraka'dan o'lchangan `cubic-bezier(0.65, 0, 0.35, 1)` easing — "og'ir, qimmat" his shu yerdan keladi.
- **Yangi Hero (TZ FR-HOME-01..03)**: «YOSHLAR — KELAJAK BUNYODKORI!» shiori (urg'u so'z yashil), qo'shimcha shior, «Tadbirga yozilish» + «Murojaat yuborish» CTA'lari, **ark-maskali rasm** (o'zbek me'moriy arkasi), romb-ornament separator. Eski yangiliklar-slayderi olib tashlandi (yangiliklar quyida o'z bo'limida bor).
- **Rang-blokli seksiyalar**: About — krem band, News — havorang band; Events oq orol bilan birga scroll'da «sahna almashinuvi» ritmi hosil bo'ldi.
- **Yangi global utility'lar**: `.arch-mask`, `.band-*` (cream/sky/green-pale/navy), `.giant-text` (fon dekorativ matn), `.img-lively` (hover'da filter), `.accent-word`.

**Keyingi dizayn bosqichi:** ichki sahifalar (tadbirlar, yangiliklar, rahbariyat) shu tilga o'tadi; PageHero yagonalashuvi; FontAwesome → SVG.

---

## [0.5.0] — 2026-07-11 · Tadbirlar moduli (TZ §9)

**Nima qilindi:**
- **Yangi `/tadbirlar` sahifasi** — bo'lajak va o'tgan tadbirlar, tur bo'yicha filtr (Tanlov, Seminar, Forum, Uchrashuv, Sport, Volontyorlik). Navbar'ga havola qo'shildi.
- **Tadbir sahifasi** (`/tadbirlar/[slug]`) — banner, to'liq ma'lumot paneli (sana, joy + xarita havolasi, tashkilotchi, hamkorlar), band o'rinlar progress-bar'i, yakunlangan tadbirda natijalar bloki, Google uchun JSON-LD Event schema.
- **Onlayn ro'yxatdan o'tish** — F.I.Sh., telefon, Telegram, OTM/muassasa, maxfiylik roziligi. Himoya: zod validatsiya, IP bo'yicha soatiga 10 ta cheklov, limit to'lganda avtomatik yopilish, bitta telefon bir tadbirga bir marta. Jonli tekshirildi: ro'yxatdan o'tish ✅, takror urinish rad etildi ✅, hisoblagich yangilandi ✅.
- **Admin: Tadbirlar CRUD** — mavjud konfiguratsiya tizimiga qo'shildi, yangi `datetime` maydon turi bilan (sana-vaqt tanlash).
- **Admin: Ishtirokchilar bo'limi** — har tadbir bo'yicha ro'yxat + **CSV yuklab olish** (Excel'da kirillcha to'g'ri ochiladi).
- **Bosh sahifa Events bloki endi bazadan** — 3 ta eng yaqin tadbirni ko'rsatadi (avval qotib qolgan mock edi); tadbir bo'lmasa bo'lim yashirinadi.
- Baza: `Event` + `EventRegistration` jadvallari (migratsiya `add_events`), seed'da 4 namunaviy tadbir.

**Eslatma:** Tadbir qo'shish — Admin panel → Tadbirlar → «Yangi tadbir». «Nashr etilgan» belgilanmagunicha saytda ko'rinmaydi. Ishtirokchilar ro'yxati — Admin → Ishtirokchilar.

---

## [0.4.0] — 2026-07-11 · PostgreSQL'ga ko'chish

**Nima qilindi:**
- SQLite → **PostgreSQL 16** (Docker Compose, `postgres:16-alpine`).
- Dev bazasi **5433** portda (bu kompyuterda 5432 da lokal Postgres bor — konflikt bo'lmasin deb).
- Prisma `@prisma/adapter-pg` ga o'tdi; `better-sqlite3` butunlay olib tashlandi.
- **Migratsiya tartibi joriy**: sxema o'zgarishlari endi `prisma/migrations/` da versiyalanadi (`db push` o'rniga). Yangi skriptlar: `db:migrate`, `db:deploy`, `db:reset`.
- `.env.example` repoga qo'shildi (gitignore'da istisno qilindi).

**Endi dev muhitni ishga tushirish:**
```
docker compose up -d      # Postgres (bir marta; keyin o'zi ko'tariladi)
npm run dev
```

**Mac'da birinchi marta pull qilgandan keyin:**
1. `.env` ga `.env.example` dagi kalitlarni to'ldirish (`POSTGRES_PASSWORD`, `DATABASE_URL`, `NEXTAUTH_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`)
2. `docker compose up -d && npx prisma migrate dev && npm run db:seed && npm run db:seed:admin`

---

## [0.3.0] — 2026-07-11 · Xavfsizlik va SEO poydevori

**Nima qilindi:**
- **URL validatsiyasi** (`lib/admin/validation.ts`) — admin formalardagi URL maydonlar faqat `https://` yoki `/` bilan boshlanadi. `javascript:` orqali stored-XSS yo'li yopildi (branch tahlilida topilgan yagona ochiq teshik edi).
- **`/api/appeals` himoyalandi** — zod validatsiya (xabar 10–5000 belgi, telefon format) + bitta IP'dan **soatiga 5 ta murojaat** cheklovi. Avval hech qanday cheklov yo'q edi.
- `error.tsx`, `global-error.tsx`, `loading.tsx` — xatolikda oq ekran o'rniga "Qayta urinish" tugmali sahifa.
- `sitemap.xml` (barcha sahifa + yangilik/loyiha/yo'nalish sluglari bazadan) va `robots.txt` (`/admin`, `/api` yopiq), `metadataBase`.
- Kechagi branch'dan qolgan 2 ta **yashirin production-build xatosi** tuzatildi (dev'da bilinmasdi): `SectionTheme` tip ro'yxati provider bilan sinxron emas edi; 5 komponentda `motion` `Variants` tiplari xato.

---

## [0.2.1] — 2026-07-11 · Merge, master-reja, lokal baza tiklash

**Nima qilindi:**
- `feat/db-single-source-admin-crud` branch **main'ga merge qilindi** va push qilindi. (Kechagi Mac'dagi ish main'ga emas, shu branch'ga push qilingan ekan — hech narsa yo'qolmagan.)
- **PLAN.md master-reja v2** ga kengaytirildi: yakuniy stack, sayt xaritasi (6 yangi sahifa: tadbirlar, tashkilotlar, imkoniyatlar, reyting, qidiruv, kabinet), sahifama-sahifa spetsifikatsiya, rollar matritsasi, dizayn-mezonlar, yangi g'oyalar (QR check-in, Telegram Mini App, murojaat kuzatish kodi, OG-rasm avtogeneratsiya...), 7 faza.
- Qabul qilingan qarorlar: **VPS + Docker** hosting; **sxema 4 tilga tayyor**, kontent lotin; funksional + dizayn **parallel**.
- Lokal baza yangi sxemaga to'g'irlandi (`db:reset` + seed) — merge'dan keyingi `News.slug does not exist` xatosi shu bilan ketdi.
- Admin hisobi endi `.env` dan: login `admin`, parol `.env` dagi `ADMIN_PASSWORD` qatorida.

---

## [0.2.0] — 2026-07-10 · Baza — yagona manba + admin CRUD *(Mac, feature branch)*

**Faza 0 — «qon to'xtatish»:**
- Build umuman ishlamasdi (`prisma generate` yo'q edi) — tuzatildi.
- Git'da ochiq yotgan `NEXTAUTH_SECRET` zaxira kaliti olib tashlandi (`lib/env.ts` — endi yo'q bo'lsa build yiqiladi).
- `/admin` endi **rolni tekshiradi** (avval istalgan login qilgan foydalanuvchi kirardi) + admin layout'da ikkinchi qavat himoya.
- `admin/admin123` standart parol o'chirildi — endi `.env` dan, kamida 12 belgi, bcrypt cost 12.
- Login'dagi timing-attack yopildi; NextAuth tiplari (`as any` o'rniga augmentatsiya).
- GitHub Pages deploy o'chirildi (server kod u yerda ishlamaydi).

**Faza 2 — yagona haqiqat manbai:**
- Butun kontent `lib/data.ts` dan **bazaga ko'chdi**; `lib/queries.ts` o'qish qatlami.
- URL'lar `[id]` → `[slug]` (o'zbekcha slugify: `Ta'lim` → `talim`).
- Tuzatilgan bug: ro'yxat bazadan, detal sahifa statik fayldan o'qirdi — **har qanday yangilik/loyihaga bosish 404 berardi**.
- Admin panelda **11 resurs uchun to'liq CRUD** (konfiguratsiya asosida), zod validatsiya, **audit log** (kim nimani o'zgartirgani), murojaat holati/javobi tahriri, `published` bayrog'i.
- Seed **idempotent** — to'ldirilgan jadvalga tegmaydi, admin kiritgan kontent o'chmaydi.
- Topilgan Next 16.2.9 bug: `.bind()` li server action no-JS formada cheksiz sikl — yechim `lib/admin/actions.ts` da izohlangan.
- Landing sayqallari: ambient scroll fonlar, floating kartalar, Events komponenti.

---

## [0.1.0] — 2026-07-07…08 · Frontend poydevor *(tarixiy)*

- 15 ta ommaviy sahifa premium UI bilan: bosh sahifa, tashkilot/missiya/tarix, rahbariyat, faoliyat, loyihalar, yangiliklar, hududlar, yetakchilar, hujjatlar, galereya, murojaat, axborot markazi.
- CSS Modules + dizayn tokenlari, ScrollReveal animatsiyalar, GSAP sticky-scroll effektlar.
- Birinchi admin dashboard + SQLite + NextAuth (keyinchalik 0.2.0 da qayta ishlandi).

---

## Joriy holat (2026-07-11)

| Nima | Holat |
|---|---|
| Baza | PostgreSQL 16 (Docker, port 5433), migratsiyalar bilan |
| Admin | `/admin` — login `admin`, parol `.env` da |
| Tadbirlar | ✅ To'liq ishlaydi: ro'yxat, filtr, ro'yxatdan o'tish, admin CRUD, CSV eksport |
| Deploy | Hali yo'q — VPS/domen kutilmoqda (PLAN.md, ochiq savollar) |
| Keyingi ish | Fayl yuklash (1.6), Dockerfile+CI (1.10), yoki bosh sahifani TZ §5.2 ga moslash (shior + 3 CTA) |
