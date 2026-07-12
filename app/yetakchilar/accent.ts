// `category` admin panelda erkin matn sifatida kiritiladi (schema izohi:
// "Oliygoh, Mahalla, Maktab"), qat'iy enum emas — shu sababli taniqli
// turlarga brend rangi biriktiriladi, notanish qiymat index bo'yicha
// aylanadi. Ikki kontekst uchun alohida ton kerak (NavigationCards saboqlari):
//   light    — och/oq fon ustidagi matn rangi (ro'yxat badge'i);
//   dark     — to'q navy fon ustidagi to'ldirilgan badge foni (detal hero);
//   darkText — o'sha to'ldirilgan badge ustida o'qiladigan matn rangi.
export interface CategoryAccent {
  light: string;
  dark: string;
  darkText: string;
}

const categoryAccents: Record<string, CategoryAccent> = {
  "oliygoh": { light: "var(--blue)", dark: "#A9D8EB", darkText: "var(--blue-deep)" },
  "mahalla": { light: "var(--green-check)", dark: "var(--green-check)", darkText: "var(--white)" },
  "maktab": { light: "var(--accent-orange)", dark: "var(--amber)", darkText: "var(--blue-deep)" },
};

const fallbackAccents: CategoryAccent[] = [
  categoryAccents["oliygoh"],
  categoryAccents["mahalla"],
  categoryAccents["maktab"],
];

export function accentFor(category: string, idx: number): CategoryAccent {
  const key = category.trim().toLowerCase();
  return categoryAccents[key] ?? fallbackAccents[idx % fallbackAccents.length];
}
