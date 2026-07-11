import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { isRateLimited, clientIp } from "@/lib/rate-limit";

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
    const ip = clientIp(req.headers);
    // Turnstile captcha Faza 1 da qo'shiladi (PLAN.md)
    if (isRateLimited("appeals", ip, { windowMs: 60 * 60 * 1000, max: 5 })) {
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
