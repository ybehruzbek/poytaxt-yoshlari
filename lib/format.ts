/** Sana-vaqtni o'zbekcha ko'rinishga keltirish yordamchilari. */

export const UZ_MONTHS = [
  "yanvar",
  "fevral",
  "mart",
  "aprel",
  "may",
  "iyun",
  "iyul",
  "avgust",
  "sentabr",
  "oktabr",
  "noyabr",
  "dekabr",
] as const;

export const UZ_MONTHS_SHORT = [
  "Yan",
  "Fev",
  "Mar",
  "Apr",
  "May",
  "Iyn",
  "Iyl",
  "Avg",
  "Sen",
  "Okt",
  "Noy",
  "Dek",
] as const;

/** "15-oktabr, 2026" */
export function uzDate(d: Date): string {
  return `${d.getDate()}-${UZ_MONTHS[d.getMonth()]}, ${d.getFullYear()}`;
}

/** "10:00" */
export function uzTime(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/** "15-oktabr, 2026 · 10:00" */
export function uzDateTime(d: Date): string {
  return `${uzDate(d)} · ${uzTime(d)}`;
}
