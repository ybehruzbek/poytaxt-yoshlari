import { prisma } from "@/lib/prisma";

/**
 * Resurs kaliti → Prisma delegati.
 *
 * Prisma'ning aniq tiplari generik CRUD bilan mos kelmaydi, shuning uchun
 * minimal interfeys orqali ishlaymiz. Kirish ma'lumotlari `lib/admin/validation.ts`
 * da zod bilan tekshirilgani uchun bu yerda tip xavfsizligini yo'qotish xavfsiz.
 */
export interface Delegate {
  findMany(args?: unknown): Promise<Record<string, unknown>[]>;
  findUnique(args: unknown): Promise<Record<string, unknown> | null>;
  findFirst(args: unknown): Promise<Record<string, unknown> | null>;
  count(args?: unknown): Promise<number>;
  create(args: unknown): Promise<{ id: string }>;
  update(args: unknown): Promise<{ id: string }>;
  delete(args: unknown): Promise<{ id: string }>;
}

const DELEGATES: Record<string, unknown> = {
  menyu: prisma.navLink,
  tadbirlar: prisma.event,
  yangiliklar: prisma.news,
  loyihalar: prisma.project,
  yonalishlar: prisma.direction,
  rahbariyat: prisma.leader,
  yetakchilar: prisma.youthLeader,
  hujjatlar: prisma.document,
  galereya: prisma.galleryImage,
  tumanlar: prisma.district,
  tarix: prisma.timelineEvent,
  statistika: prisma.stat,
  xarita: prisma.mapRegion,
};

export function getDelegate(resourceKey: string): Delegate | undefined {
  const delegate = DELEGATES[resourceKey];
  return delegate ? (delegate as Delegate) : undefined;
}
