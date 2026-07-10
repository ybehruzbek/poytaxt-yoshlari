/**
 * Admin panelning resurs konfiguratsiyasi.
 *
 * Bu fayl SOF konfiguratsiya — Prisma import qilmaydi, chunki uni klient
 * formalar ham o'qiydi. Prisma delegatlari `lib/admin/db.ts` da.
 *
 * Yangi resurs qo'shish: shu yerga bitta yozuv qo'shing. Ro'yxat, forma,
 * yaratish/tahrirlash/o'chirish sahifalari avtomatik ishlaydi.
 */

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "checkbox"
  | "select"
  | "url";

export interface Field {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: readonly string[];
  help?: string;
  /** number maydonlar uchun: butun sonmi yoki kasrmi */
  float?: boolean;
}

export interface ResourceDef {
  /** URL segmenti: /admin/<key> */
  key: string;
  /** Menyu va sarlavhalarda: "Yangiliklar" */
  label: string;
  /** "Yangi <singular>" da: "yangilik" */
  singular: string;
  icon: string;
  fields: Field[];
  /** Ro'yxat jadvalidagi ustunlar (field nomlari) */
  listColumns: string[];
  /** Audit log va ro'yxatda sarlavha sifatida ishlatiladi */
  titleField: string;
  /** Bo'sh qoldirilsa shu maydondan slug yasaladi */
  slugFrom?: string;
  orderBy: Record<string, "asc" | "desc">;
}

const TAG_CLASSES = ["tag-blue", "tag-green", "tag-orange"] as const;

export const RESOURCES: ResourceDef[] = [
  {
    key: "yangiliklar",
    label: "Yangiliklar",
    singular: "yangilik",
    icon: "fa-newspaper",
    titleField: "title",
    slugFrom: "title",
    orderBy: { createdAt: "desc" },
    listColumns: ["title", "tag", "date", "published"],
    fields: [
      { name: "title", label: "Sarlavha", type: "text", required: true },
      { name: "slug", label: "Slug (URL)", type: "text", help: "Bo'sh qoldirsangiz sarlavhadan avtomatik yasaladi. Tahrirlashda o'zgartirsangiz eski havolalar ishlamay qoladi." },
      { name: "excerpt", label: "Qisqa mazmun", type: "textarea" },
      { name: "content", label: "To'liq matn", type: "textarea", help: "Paragraflarni bo'sh qator bilan ajrating." },
      { name: "date", label: "Sana (matn)", type: "text", required: true, help: "Masalan: 15 Noyabr 2024" },
      { name: "tag", label: "Teg", type: "text", required: true },
      { name: "tagClass", label: "Teg rangi", type: "select", options: TAG_CLASSES, required: true },
      { name: "image", label: "Rasm manzili", type: "url", required: true },
      { name: "featured", label: "Bosh sahifada katta blokda ko'rsatilsin", type: "checkbox" },
      { name: "published", label: "Nashr etilgan", type: "checkbox" },
    ],
  },
  {
    key: "loyihalar",
    label: "Loyihalar",
    singular: "loyiha",
    icon: "fa-diagram-project",
    titleField: "title",
    slugFrom: "title",
    orderBy: { createdAt: "asc" },
    listColumns: ["title", "category", "status", "progress", "published"],
    fields: [
      { name: "title", label: "Nomi", type: "text", required: true },
      { name: "slug", label: "Slug (URL)", type: "text", help: "Bo'sh qoldirsangiz nomdan avtomatik yasaladi." },
      { name: "desc", label: "Qisqa tavsif", type: "textarea", required: true },
      { name: "content", label: "To'liq matn", type: "textarea" },
      { name: "image", label: "Rasm manzili", type: "url", required: true },
      { name: "progress", label: "Bajarilish (%)", type: "number" },
      { name: "status", label: "Holat", type: "select", options: ["Yangi", "Faol", "Yakunlangan"], required: true },
      { name: "category", label: "Kategoriya", type: "text", required: true },
      { name: "published", label: "Nashr etilgan", type: "checkbox" },
    ],
  },
  {
    key: "yonalishlar",
    label: "Yo'nalishlar",
    singular: "yo'nalish",
    icon: "fa-compass",
    titleField: "title",
    orderBy: { createdAt: "asc" },
    listColumns: ["title", "slug"],
    fields: [
      { name: "title", label: "Nomi", type: "text", required: true },
      { name: "slug", label: "Slug (URL)", type: "text", required: true },
      { name: "desc", label: "Qisqa tavsif", type: "textarea", required: true },
      { name: "fullDesc", label: "To'liq tavsif", type: "textarea", required: true },
      { name: "icon", label: "FontAwesome ikonka", type: "text", required: true, help: "Masalan: fa-graduation-cap" },
      { name: "iconBg", label: "Ikonka foni", type: "text", required: true, help: "var(--blue-pale) yoki #FEE2E2" },
      { name: "iconColor", label: "Ikonka rangi", type: "text", required: true },
      { name: "image", label: "Rasm manzili", type: "url", required: true },
    ],
  },
  {
    key: "rahbariyat",
    label: "Rahbariyat",
    singular: "rahbar",
    icon: "fa-user-tie",
    titleField: "name",
    orderBy: { order: "asc" },
    listColumns: ["name", "position", "order"],
    fields: [
      { name: "name", label: "F.I.Sh.", type: "text", required: true },
      { name: "position", label: "Lavozim", type: "text", required: true },
      { name: "image", label: "Rasm manzili", type: "url", required: true },
      { name: "order", label: "Tartib raqami", type: "number" },
      { name: "bio", label: "Biografiya", type: "textarea", help: "Paragraflarni bo'sh qator bilan ajrating." },
      { name: "receptionDays", label: "Qabul kunlari", type: "textarea", help: "Har qator: Kun|Vaqt — masalan: Seshanba|10:00 - 13:00" },
      { name: "telegram", label: "Telegram havolasi", type: "url" },
      { name: "instagram", label: "Instagram havolasi", type: "url" },
      { name: "email", label: "Email", type: "text" },
    ],
  },
  {
    key: "yetakchilar",
    label: "Yosh yetakchilar",
    singular: "yetakchi",
    icon: "fa-user-graduate",
    titleField: "name",
    orderBy: { createdAt: "asc" },
    listColumns: ["name", "place", "category"],
    fields: [
      { name: "name", label: "F.I.Sh.", type: "text", required: true },
      { name: "place", label: "Joy", type: "text", required: true },
      { name: "image", label: "Rasm manzili", type: "url", required: true },
      { name: "category", label: "Toifa", type: "select", options: ["Oliygoh", "Mahalla", "Maktab"], required: true },
      { name: "bio", label: "Faoliyati", type: "textarea" },
      { name: "telegram", label: "Telegram havolasi", type: "url" },
      { name: "instagram", label: "Instagram havolasi", type: "url" },
    ],
  },
  {
    key: "hujjatlar",
    label: "Hujjatlar",
    singular: "hujjat",
    icon: "fa-file-lines",
    titleField: "title",
    orderBy: { createdAt: "asc" },
    listColumns: ["title", "type", "size", "date"],
    fields: [
      { name: "title", label: "Sarlavha", type: "text", required: true },
      { name: "type", label: "Format", type: "select", options: ["PDF", "DOCX", "XLSX"], required: true },
      { name: "size", label: "Hajmi", type: "text", required: true, help: "Masalan: 2.4 MB" },
      { name: "date", label: "Sana (matn)", type: "text", required: true },
      { name: "icon", label: "FontAwesome ikonka", type: "text", required: true },
      { name: "iconBg", label: "Ikonka foni", type: "text", required: true },
      { name: "iconColor", label: "Ikonka rangi", type: "text", required: true },
      { name: "fileUrl", label: "Fayl manzili", type: "url" },
    ],
  },
  {
    key: "galereya",
    label: "Galereya",
    singular: "rasm",
    icon: "fa-images",
    titleField: "alt",
    orderBy: { order: "asc" },
    listColumns: ["alt", "aspect", "order"],
    fields: [
      { name: "alt", label: "Tavsif (alt matn)", type: "text", required: true },
      { name: "src", label: "Kichik rasm manzili", type: "url", required: true },
      { name: "full", label: "Katta rasm manzili", type: "url", required: true },
      { name: "aspect", label: "Nisbat", type: "select", options: ["square", "tall", "wide"], required: true },
      { name: "order", label: "Tartib raqami", type: "number" },
    ],
  },
  {
    key: "tumanlar",
    label: "Tumanlar",
    singular: "tuman",
    icon: "fa-map-location-dot",
    titleField: "name",
    orderBy: { name: "asc" },
    listColumns: ["name", "youth"],
    fields: [
      { name: "name", label: "Nomi", type: "text", required: true },
      { name: "youth", label: "Yoshlar soni", type: "text", required: true, help: "Masalan: 95,000+" },
      { name: "lat", label: "Kenglik (lat)", type: "number", float: true, required: true },
      { name: "lng", label: "Uzunlik (lng)", type: "number", float: true, required: true },
      { name: "image", label: "Rasm manzili", type: "url", required: true },
    ],
  },
  {
    key: "tarix",
    label: "Tarix",
    singular: "tarix yozuvi",
    icon: "fa-clock-rotate-left",
    titleField: "year",
    orderBy: { order: "asc" },
    listColumns: ["year", "text", "order"],
    fields: [
      { name: "year", label: "Yil", type: "text", required: true },
      { name: "text", label: "Voqea", type: "textarea", required: true },
      { name: "order", label: "Tartib raqami", type: "number" },
    ],
  },
  {
    key: "statistika",
    label: "Statistika",
    singular: "ko'rsatkich",
    icon: "fa-chart-simple",
    titleField: "label",
    orderBy: { order: "asc" },
    listColumns: ["label", "target", "suffix", "group", "order"],
    fields: [
      { name: "label", label: "Nomi", type: "text", required: true },
      { name: "target", label: "Qiymati", type: "number", required: true },
      { name: "suffix", label: "Qo'shimcha belgi", type: "text", help: "Masalan: +" },
      { name: "group", label: "Guruh", type: "select", options: ["full", "mini"], required: true, help: "full — katta blok, mini — hero ostidagi qator" },
      { name: "order", label: "Tartib raqami", type: "number" },
    ],
  },
  {
    key: "xarita",
    label: "Xarita hududlari",
    singular: "hudud",
    icon: "fa-map",
    titleField: "name",
    orderBy: { createdAt: "asc" },
    listColumns: ["name", "head"],
    fields: [
      { name: "name", label: "Viloyat nomi", type: "text", required: true },
      { name: "head", label: "Filial rahbari", type: "text", required: true },
      { name: "desc", label: "Tavsif", type: "textarea", required: true },
      { name: "points", label: "SVG polygon nuqtalari", type: "textarea", required: true },
    ],
  },
];

export function getResource(key: string): ResourceDef | undefined {
  return RESOURCES.find((r) => r.key === key);
}
