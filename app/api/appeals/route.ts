import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

/**
 * Oddiy in-memory rate-limit: bitta IP dan soatiga ko'pi bilan 5 ta murojaat.
 * Ilova bitta jarayonda ishlaydi (standalone VPS) — yuklama oshsa Redis'ga
 * o'tiladi (PLAN.md, Faza 1). Turnstile captcha ham Faza 1 da qo'shiladi.
 */
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 10_000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
  return false;
}

const appealSchema = z.object({
  ism: z.string().trim().min(2, "Ism juda qisqa").max(100, "Ism juda uzun"),
  familiya: z
    .string()
    .trim()
    .min(2, "Familiya juda qisqa")
    .max(100, "Familiya juda uzun"),
  tel: z
    .string()
    .trim()
    .regex(/^\+?[\d\s()-]{7,20}$/, "Telefon raqami noto'g'ri formatda"),
  tuman: z.string().trim().min(2, "Tuman tanlanmagan").max(100, "Tuman nomi juda uzun"),
  turi: z
    .string()
    .trim()
    .min(2, "Murojaat turi tanlanmagan")
    .max(100, "Murojaat turi juda uzun"),
  xabar: z
    .string()
    .trim()
    .min(10, "Xabar kamida 10 belgidan iborat bo'lishi kerak")
    .max(5000, "Xabar 5000 belgidan oshmasligi kerak"),
});

export async function POST(req: Request) {
  try {
    const ip =
      (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() ||
      "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Juda ko'p murojaat yuborildi. Birozdan keyin qayta urinib ko'ring." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    const parsed = appealSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Ma'lumotlar noto'g'ri to'ldirilgan" },
        { status: 400 }
      );
    }

    const { ism, familiya, tel, tuman, turi, xabar } = parsed.data;
    await prisma.appeal.create({
      data: {
        fullName: `${ism} ${familiya}`.trim(),
        phone: tel,
        district: tuman,
        type: turi,
        message: xabar,
        status: "Yangi",
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Murojaat saqlashda xatolik:", error);
    return NextResponse.json(
      { error: "Ichki server xatosi yuz berdi" },
      { status: 500 }
    );
  }
}
