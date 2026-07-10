/**
 * Muhit o'zgaruvchilarini bitta joyda tekshiramiz.
 *
 * Sabab: ilgari `process.env.NEXTAUTH_SECRET || "super-secret-default-key..."`
 * yozilgan edi. Kalit .env da bo'lmasa, kod jimgina git'dagi ochiq kalitga
 * o'tib ketardi va sessiya tokenlarini istalgan odam yasay olardi.
 * Endi kalit yo'q bo'lsa — ilova ishga tushmaydi.
 */

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Muhit o'zgaruvchisi topilmadi: ${name}. ` +
        `.env.example dan nusxa oling: cp .env.example .env`
    );
  }
  return value;
}

export const NEXTAUTH_SECRET = required("NEXTAUTH_SECRET");
