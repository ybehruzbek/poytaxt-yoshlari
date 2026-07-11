import { cache } from "react";
import { prisma } from "@/lib/prisma";

/**
 * Saytdagi barcha kontent shu yerdan o'qiladi. `lib/data.ts` da faqat
 * navigatsiya va footer kabi tuzilma qoldi.
 *
 * `cache()` bir renderdagi takroriy chaqiruvlarni bitta so'rovga birlashtiradi:
 * bosh sahifada ham Hero, ham News yangiliklarni so'rasa, baza bir marta o'qiladi.
 */

// ===== YANGILIKLAR =====
export const getNews = cache(async () =>
  prisma.news.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  })
);

export const getNewsBySlug = cache(async (slug: string) =>
  prisma.news.findFirst({ where: { slug, published: true } })
);

/** `generateStaticParams` uchun — nashr etilmaganlari ham kerak emas. */
export const getNewsSlugs = cache(async () =>
  prisma.news.findMany({
    where: { published: true },
    select: { slug: true },
  })
);

// ===== LOYIHALAR =====
export const getProjects = cache(async () =>
  prisma.project.findMany({
    where: { published: true },
    orderBy: { createdAt: "asc" },
  })
);

export const getProjectBySlug = cache(async (slug: string) =>
  prisma.project.findFirst({ where: { slug, published: true } })
);

export const getProjectSlugs = cache(async () =>
  prisma.project.findMany({
    where: { published: true },
    select: { slug: true },
  })
);

// ===== YO'NALISHLAR =====
export const getDirections = cache(async () =>
  prisma.direction.findMany({
    orderBy: { createdAt: "asc" },
    include: { stats: true, goals: true },
  })
);

export const getDirectionBySlug = cache(async (slug: string) =>
  prisma.direction.findUnique({
    where: { slug },
    include: { stats: true, goals: true },
  })
);

// ===== RAHBARIYAT =====
export const getLeaders = cache(async () =>
  prisma.leader.findMany({ orderBy: { order: "asc" } })
);

export const getLeaderById = cache(async (id: string) =>
  prisma.leader.findUnique({ where: { id } })
);

// ===== YOSH YETAKCHILAR =====
export const getYouthLeaders = cache(async () =>
  prisma.youthLeader.findMany({ orderBy: { createdAt: "asc" } })
);

export const getYouthLeaderById = cache(async (id: string) =>
  prisma.youthLeader.findUnique({ where: { id } })
);

// ===== TUMANLAR =====
export const getDistricts = cache(async () =>
  prisma.district.findMany({ orderBy: { name: "asc" } })
);

// ===== HUJJATLAR =====
export const getDocuments = cache(async () =>
  prisma.document.findMany({ orderBy: { createdAt: "asc" } })
);

// ===== GALEREYA =====
export const getGalleryImages = cache(async () =>
  prisma.galleryImage.findMany({ orderBy: { order: "asc" } })
);

// ===== TARIX =====
export const getTimeline = cache(async () =>
  prisma.timelineEvent.findMany({ orderBy: { order: "asc" } })
);

// ===== STATISTIKA =====
/** `group`: "full" — Stats bloki, "mini" — hero ostidagi qator. */
export const getStats = cache(async (group: "full" | "mini") =>
  prisma.stat.findMany({ where: { group }, orderBy: { order: "asc" } })
);

// ===== TADBIRLAR =====
/** Bo'lajak tadbirlar — bosh sahifa va ro'yxat tepasi uchun. */
export const getUpcomingEvents = cache(async (limit?: number) =>
  prisma.event.findMany({
    where: {
      published: true,
      status: "E'lon qilingan",
      startsAt: { gte: new Date() },
    },
    orderBy: { startsAt: "asc" },
    take: limit,
    include: { _count: { select: { registrations: true } } },
  })
);

/** O'tgan/yakunlangan tadbirlar — arxiv bo'limi uchun. */
export const getPastEvents = cache(async () =>
  prisma.event.findMany({
    where: {
      published: true,
      OR: [{ startsAt: { lt: new Date() } }, { status: { not: "E'lon qilingan" } }],
    },
    orderBy: { startsAt: "desc" },
  })
);

export const getEventBySlug = cache(async (slug: string) =>
  prisma.event.findFirst({
    where: { slug, published: true },
    include: { _count: { select: { registrations: true } } },
  })
);

export const getEventSlugs = cache(async () =>
  prisma.event.findMany({
    where: { published: true },
    select: { slug: true },
  })
);

// ===== XARITA HUDUDLARI =====
export const getMapRegions = cache(async () =>
  prisma.mapRegion.findMany({ orderBy: { createdAt: "asc" } })
);
