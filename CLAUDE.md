# Loyiha qoidalari

## Imlo — qatʼiy
Barça özbekça yozuv yangi alifboda: Ö Ğ Ş Ç, tutuq belgisi faqat ʼ (U+02BC). Töliq qoida: [docs/imlo.md](docs/imlo.md).
- Matn qöşgan yoki özgartirgandan keyin `pnpm imlo` ötishi şart (`pnpm lint` uni özi işga tuşiradi).
- Havola, slug, domen, kod qiymatlari ASCII qoladi.
- Admin kontenti uçun yangi matn maydonlariga `imloMatn` / `imloRichText` hook'i qöşiladi.

## Commit
Kiçik va tez-tez, konvensional (`fix(murojaat): …`), xabar yangi alifbodagi özbekçada. `git push` faqat foydalanuvçi aytganda (push Dokploy deploy'ni boşlaydi).

## Yöl (breadcrumbs) — qatʼiy
Yuqori menyudan oçiladigan har bir sahifaning boşida yöl kapsulasi turadi: «Boş sahifa / {menyu guruhi} / {sahifa}».
- Faqat `<PageCrumbs locale path />` (`src/components/site/PageCrumbs.tsx`) işlatiladi; yöl `config/nav.ts` dagi menyudan quriladi, qöl bilan yozilmaydi.
- Menyuda yöq içki daraja (masalan, yangilik sarlavhasi) `extra` orqali qöşiladi.
- Yangi sahifa yasalganda yöl birinçi qöşiladigan narsa; foydalanuvçi buni har safar eslatmaydi.
