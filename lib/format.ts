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

/** "Seshanba|10:00 - 13:00" qatorlarini {day, time} jadvaliga aylantiradi. */
export function parseReceptionDays(raw: string | null | undefined) {
  if (!raw) return [];
  return raw
    .split("\n")
    .map((line) => line.split("|").map((s) => s.trim()))
    .filter((parts) => parts.length === 2)
    .map(([day, time]) => ({ day, time }));
}
