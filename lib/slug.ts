/**
 * O'zbek lotin matnidan URL uchun slug yasaydi.
 *
 * Apostrof (o', g', ta'lim) shunchaki olib tashlanadi: "Ta'lim" → "talim".
 * Kirill harflar transliteratsiya qilinadi, qolgan belgilar defisga aylanadi.
 */

const CYRILLIC: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo", ж: "j", з: "z",
  и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r",
  с: "s", т: "t", у: "u", ф: "f", х: "x", ц: "ts", ч: "ch", ш: "sh",
  щ: "sh", ъ: "", ы: "i", ь: "", э: "e", ю: "yu", я: "ya",
  ў: "o", қ: "q", ғ: "g", ҳ: "h",
};

// Apostrofning barcha ko'rinishlari: ' ' ʻ ʼ ` ′ '
const APOSTROPHES = /[‘’ʻʼʾʿ`′']/g;

export function slugify(input: string): string {
  const lowered = input.toLowerCase().replace(APOSTROPHES, "");

  let out = "";
  for (const ch of lowered) {
    out += ch in CYRILLIC ? CYRILLIC[ch] : ch;
  }

  return out
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Slug band bo'lsa oxiriga raqam qo'shadi: `talim`, `talim-2`, `talim-3`.
 * `isTaken` — bazadan tekshiradigan funksiya.
 */
export async function uniqueSlug(
  base: string,
  isTaken: (slug: string) => Promise<boolean>
): Promise<string> {
  const root = slugify(base) || "sahifa";
  let candidate = root;
  let n = 2;
  while (await isTaken(candidate)) {
    candidate = `${root}-${n}`;
    n += 1;
  }
  return candidate;
}
