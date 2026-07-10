"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { getResource } from "@/lib/admin/resources";
import { getDelegate } from "@/lib/admin/db";
import { parseResourceForm, type FieldErrors } from "@/lib/admin/validation";
import { slugify, uniqueSlug } from "@/lib/slug";

export interface FormState {
  error?: string;
  fieldErrors?: FieldErrors;
}

/**
 * Resurs kaliti va yozuv id'si `action.bind(null, ...)` orqali emas, YASHIRIN
 * FORMA MAYDONLARI orqali uzatiladi (`__resource`, `__id`).
 *
 * Sabab: Next 16.2.9 da `.bind()` bilan bog'langan argumentli va qiymat
 * qaytaradigan (redirect qilmaydigan) action JavaScriptsiz forma yuborilganda
 * serverni cheksiz siklga tushiradi. Bu sinovda aniqlandi: aynan `.bind()` ni
 * olib tashlash muammoni yo'qotadi. Yashirin maydonlar bilan forma JS'siz ham
 * ishlaydi — rasmiy sayt uchun bu muhim.
 *
 * Xavfsizlik: yashirin maydonlarni foydalanuvchi o'zgartira oladi, lekin bu
 * imtiyoz bermaydi — har bir chaqiruv `requireRole()` dan o'tadi va rollar
 * barcha bo'limlarga bir xil huquqqa ega. `__id` Prisma `where` da ishlatiladi,
 * ya'ni mavjud bo'lmasa xato qaytadi.
 */
const RESOURCE_FIELD = "__resource";
const ID_FIELD = "__id";

/**
 * Kontent o'zgargach butun sayt keshini yangilaymiz.
 *
 * Aniqroq yo'llarni sanab chiqish mumkin edi, lekin bitta yangilik bosh
 * sahifada, ro'yxatda, axborot markazida va o'z sahifasida ko'rinadi — birortasi
 * unutilsa admin "nega o'zgarmadi?" deb qoladi. Sayt kichik, xarajat arzon.
 */
function revalidateSite(resourceKey: string) {
  revalidatePath("/", "layout");
  revalidatePath(`/admin/${resourceKey}`);
}

async function writeAudit(
  userId: string,
  username: string,
  action: "create" | "update" | "delete",
  entity: string,
  entityId: string,
  summary: string
) {
  await prisma.auditLog.create({
    data: { userId, username, action, entity, entityId, summary },
  });
}

/** Prisma'ning unique-constraint xatosini foydalanuvchi tiliga o'giradi. */
function friendlyError(e: unknown): string {
  const code = (e as { code?: string })?.code;
  if (code === "P2002") {
    const target = (e as { meta?: { target?: string[] } })?.meta?.target;
    const field = Array.isArray(target) ? target.join(", ") : "maydon";
    return `Bunday qiymat allaqachon mavjud (${field}). Boshqasini kiriting.`;
  }
  if (code === "P2025") {
    return "Yozuv topilmadi — ehtimol boshqa admin uni o'chirib yuborgan.";
  }
  console.error("Admin action xatosi:", e);
  return "Saqlashda kutilmagan xatolik yuz berdi.";
}

/** Yaratish yoki tahrirlash. `__id` bo'lmasa — yangi yozuv. */
export async function saveResource(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const session = await requireRole("ADMIN", "MODERATOR");
  if (!session) return { error: "Ruxsat yo'q." };

  const resourceKey = String(formData.get(RESOURCE_FIELD) ?? "");
  const rawId = formData.get(ID_FIELD);
  const id = rawId ? String(rawId) : null;

  const resource = getResource(resourceKey);
  const delegate = getDelegate(resourceKey);
  if (!resource || !delegate) return { error: "Noma'lum bo'lim." };

  const { data, errors } = parseResourceForm(resource, formData);
  if (Object.keys(errors).length > 0) {
    return { fieldErrors: errors };
  }

  // Slug: bo'sh qoldirilsa sarlavhadan yasaymiz. Tahrirlashda bo'sh bo'lsa
  // eskisini saqlab qolamiz — aks holda mavjud havolalar buziladi.
  if (resource.slugFrom) {
    if (!data.slug) {
      if (id) {
        delete data.slug;
      } else {
        const base = String(data[resource.slugFrom] ?? "");
        data.slug = await uniqueSlug(base, async (candidate) => {
          const existing = await delegate.findFirst({ where: { slug: candidate } });
          return existing !== null;
        });
      }
    } else {
      data.slug = slugify(String(data.slug));
    }
  }

  const title = String(data[resource.titleField] ?? id ?? "");
  let savedId: string;

  try {
    if (id) {
      const updated = await delegate.update({ where: { id }, data });
      savedId = updated.id;
    } else {
      const created = await delegate.create({ data });
      savedId = created.id;
    }
  } catch (e) {
    return { error: friendlyError(e) };
  }

  await writeAudit(
    session.user.id,
    session.user.name ?? "?",
    id ? "update" : "create",
    resourceKey,
    savedId,
    `${resource.label}: ${title}`
  );

  revalidateSite(resourceKey);
  // redirect() maxsus xato uloqtiradi — try/catch dan tashqarida bo'lishi shart.
  redirect(`/admin/${resourceKey}`);
}

export async function deleteResource(formData: FormData) {
  const session = await requireRole("ADMIN", "MODERATOR");
  if (!session) return;

  const resourceKey = String(formData.get(RESOURCE_FIELD) ?? "");
  const id = String(formData.get(ID_FIELD) ?? "");

  const resource = getResource(resourceKey);
  const delegate = getDelegate(resourceKey);
  if (!resource || !delegate || !id) return;

  const existing = await delegate.findUnique({ where: { id } });
  if (!existing) return;
  const title = String(existing[resource.titleField] ?? id);

  try {
    await delegate.delete({ where: { id } });
  } catch (e) {
    console.error("O'chirishda xatolik:", e);
    return;
  }

  await writeAudit(
    session.user.id,
    session.user.name ?? "?",
    "delete",
    resourceKey,
    id,
    `${resource.label}: ${title}`
  );

  revalidateSite(resourceKey);
  redirect(`/admin/${resourceKey}`);
}

// ===== MUROJAATLAR =====
// Murojaat admin tomonidan yaratilmaydi — faqat holati va javobi yangilanadi.

const APPEAL_STATUSES = ["Yangi", "Ko'rib chiqilmoqda", "Javob berildi"] as const;

export async function updateAppeal(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const session = await requireRole("ADMIN", "MODERATOR");
  if (!session) return { error: "Ruxsat yo'q." };

  const id = String(formData.get(ID_FIELD) ?? "");
  const status = String(formData.get("status") ?? "");
  const response = String(formData.get("response") ?? "").trim();

  if (!id) return { error: "Murojaat topilmadi." };
  if (!APPEAL_STATUSES.includes(status as (typeof APPEAL_STATUSES)[number])) {
    return { fieldErrors: { status: "Noto'g'ri holat" } };
  }
  if (response.length > 20_000) {
    return { fieldErrors: { response: "Javob juda uzun" } };
  }

  try {
    await prisma.appeal.update({
      where: { id },
      data: { status, response: response || null },
    });
  } catch (e) {
    return { error: friendlyError(e) };
  }

  await writeAudit(
    session.user.id,
    session.user.name ?? "?",
    "update",
    "murojaatlar",
    id,
    `Murojaat holati: ${status}`
  );

  revalidatePath("/admin/murojaatlar");
  redirect("/admin/murojaatlar");
}
