import type { MetadataRoute } from "next";
import { getDirections, getNewsSlugs, getProjectSlugs } from "@/lib/queries";

const BASE =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://poytaxtyoshlari.uz";

const STATIC_PATHS = [
  "",
  "/tashkilot",
  "/tashkilot/missiya",
  "/tashkilot/tarix",
  "/rahbariyat",
  "/faoliyat",
  "/loyihalar",
  "/yangiliklar",
  "/hududlar",
  "/yetakchilar",
  "/hujjatlar",
  "/galereya",
  "/murojaat",
  "/axborot-markazi",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [news, projects, directions] = await Promise.all([
    getNewsSlugs(),
    getProjectSlugs(),
    getDirections(),
  ]);

  return [
    ...STATIC_PATHS.map((path) => ({
      url: `${BASE}${path}`,
      changeFrequency: (path === "" || path === "/yangiliklar"
        ? "daily"
        : "weekly") as "daily" | "weekly",
      priority: path === "" ? 1 : 0.7,
    })),
    ...news.map(({ slug }) => ({
      url: `${BASE}/yangiliklar/${slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...projects.map(({ slug }) => ({
      url: `${BASE}/loyihalar/${slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...directions.map(({ slug }) => ({
      url: `${BASE}/faoliyat/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
