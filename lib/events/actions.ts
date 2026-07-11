"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { isRateLimited, clientIp } from "@/lib/rate-limit";

export interface RegisterState {
  ok?: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
}

const registrationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(5, "F.I.Sh. to'liq yozilishi kerak")
    .max(150, "F.I.Sh. juda uzun"),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[\d\s()-]{7,20}$/, "Telefon raqami noto'g'ri formatda"),
  telegram: z
    .string()
    .trim()
    .max(64, "Telegram username juda uzun")
    .optional()
    .or(z.literal("")),
  organization: z
    .string()
    .trim()
    .max(200, "Tashkilot nomi juda uzun")
    .optional()
    .or(z.literal("")),
});

/**
 * Tadbirga ro'yxatdan o'tish (TZ 9.2). Ochiq forma — sessiya talab qilinmaydi,
 * shuning uchun IP bo'yicha cheklov va qat'iy validatsiya bor.
 * Tadbir id yashirin `__event` maydonida (sabab: lib/admin/actions.ts dagi
 * `.bind()` muammosi bu yerda ham amal qiladi).
 */
export async function registerForEvent(
  _prev: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const ip = clientIp(await headers());
  if (isRateLimited("event-reg", ip, { windowMs: 60 * 60 * 1000, max: 10 })) {
    return { error: "Juda ko'p urinish. Birozdan keyin qayta urinib ko'ring." };
  }

  if (formData.get("consent") === null) {
    return {
      fieldErrors: { consent: "Maxfiylik siyosatiga rozilik majburiy" },
    };
  }

  const parsed = registrationSchema.safeParse({
    fullName: formData.get("fullName"),
    phone: formData.get("phone"),
    telegram: formData.get("telegram"),
    organization: formData.get("organization"),
  });
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { fieldErrors };
  }

  const eventId = String(formData.get("__event") ?? "");
  if (!eventId) return { error: "Tadbir topilmadi." };

  const { fullName, phone, telegram, organization } = parsed.data;

  try {
    const result = await prisma.$transaction(async (tx) => {
      const event = await tx.event.findUnique({
        where: { id: eventId },
        include: { _count: { select: { registrations: true } } },
      });

      if (!event || !event.published) return { error: "Tadbir topilmadi." };
      if (!event.regOpen || event.status !== "E'lon qilingan") {
        return { error: "Bu tadbirga ro'yxatdan o'tish yopilgan." };
      }
      if (event.startsAt < new Date()) {
        return { error: "Tadbir allaqachon boshlangan." };
      }
      if (event.capacity > 0 && event._count.registrations >= event.capacity) {
        return { error: "Afsuski, barcha o'rinlar band bo'ldi." };
      }

      await tx.eventRegistration.create({
        data: {
          eventId: event.id,
          fullName,
          phone,
          telegram: telegram || null,
          organization: organization || null,
        },
      });
      return { slug: event.slug };
    });

    if ("error" in result) return { error: result.error };
    revalidatePath(`/tadbirlar/${result.slug}`);
    return { ok: true };
  } catch (e) {
    if ((e as { code?: string })?.code === "P2002") {
      return {
        error: "Bu telefon raqami ushbu tadbirga allaqachon ro'yxatdan o'tgan.",
      };
    }
    console.error("Ro'yxatdan o'tishda xatolik:", e);
    return { error: "Kutilmagan xatolik yuz berdi. Qayta urinib ko'ring." };
  }
}
