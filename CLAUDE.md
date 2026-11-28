# Loyiha qoidalari

## Imlo — qat’iy
Barcha o‘zbekcha yozuv JORIY lotin alifbosida: o‘ g‘ (U+2018), sh ch, tutuq faqat ’ (U+2019). Yangi alifbo (Ö Ğ Ş Ç) kodda va bazada saqlanmaydi — uni tashrif buyuruvchi til menyusidan tanlaydi va sahifa brauzerda o‘giriladi (`components/site/Alifbo.tsx`). To‘liq qoida: [docs/imlo.md](docs/imlo.md).
- Matn qo‘shgan yoki o‘zgartirgandan keyin `pnpm imlo` o‘tishi shart (`pnpm lint` uni o‘zi ishga tushiradi).
- Qo‘shtirnoq faqat “…” (U+201C/U+201D); ruscha «…» va „…“ taqiqlangan — `pnpm imlo` ushlaydi.
- Havola, slug, domen, kod qiymatlari ASCII qoladi.
- Admin kontenti uchun yangi matn maydonlariga `imloMatn` / `imloRichText` hook'i qo‘shiladi.

## Commit
Kichik va tez-tez, konvensional (`fix(murojaat): …`), xabar joriy alifbodagi o‘zbekchada. `git push` faqat foydalanuvchi aytganda (push Dokploy deploy'ni boshlaydi).

## Yo‘l (breadcrumbs) — qat’iy
Yuqori menyudan ochiladigan har bir sahifaning boshida yo‘l kapsulasi turadi: “Bosh sahifa / {menyu guruhi} / {sahifa}”.
- Faqat `<PageCrumbs locale path />` (`src/components/site/PageCrumbs.tsx`) ishlatiladi; yo‘l `config/nav.ts` dagi menyudan quriladi, qo‘l bilan yozilmaydi.
- Menyuda yo‘q ichki daraja (masalan, yangilik sarlavhasi) `extra` orqali qo‘shiladi.
- Yangi sahifa yasalganda yo‘l birinchi qo‘shiladigan narsa; foydalanuvchi buni har safar eslatmaydi.
