import { z } from "zod";
import type { Field, ResourceDef } from "@/lib/admin/resources";

/** Matn maydonlar uchun yuqori chegara — cheksiz kontent yozib bo'lmasin. */
const MAX_TEXT = 200;
const MAX_LONGTEXT = 20_000;

export type FieldErrors = Record<string, string>;

export interface ParseResult {
  data: Record<string, unknown>;
  errors: FieldErrors;
}

function schemaFor(field: Field): z.ZodTypeAny {
  switch (field.type) {
    case "number": {
      const base = field.float ? z.number() : z.number().int();
      return z.coerce.number({ message: `${field.label}: raqam kiriting` }).pipe(base);
    }
    case "checkbox":
      return z.boolean();
    case "select":
      return z.enum(field.options as [string, ...string[]], {
        message: `${field.label}: ro'yxatdan tanlang`,
      });
    case "textarea":
      return z.string().max(MAX_LONGTEXT, `${field.label}: matn juda uzun`);
    default:
      return z.string().max(MAX_TEXT, `${field.label}: matn juda uzun`);
  }
}

/**
 * FormData ni resurs maydonlariga qarab tekshiradi va Prisma uchun tayyor
 * obyektga aylantiradi. Bo'sh ixtiyoriy matn `null` bo'ladi.
 */
export function parseResourceForm(
  resource: ResourceDef,
  formData: FormData
): ParseResult {
  const data: Record<string, unknown> = {};
  const errors: FieldErrors = {};

  for (const field of resource.fields) {
    if (field.type === "checkbox") {
      // Belgilanmagan checkbox FormData ga umuman tushmaydi.
      data[field.name] = formData.get(field.name) !== null;
      continue;
    }

    const raw = formData.get(field.name);
    const value = typeof raw === "string" ? raw.trim() : "";

    if (!value) {
      if (field.required) {
        errors[field.name] = `${field.label} to'ldirilishi shart`;
      } else if (field.type === "number") {
        data[field.name] = 0;
      } else {
        data[field.name] = null;
      }
      continue;
    }

    const result = schemaFor(field).safeParse(value);
    if (!result.success) {
      errors[field.name] = result.error.issues[0]?.message ?? "Noto'g'ri qiymat";
      continue;
    }
    data[field.name] = result.data;
  }

  return { data, errors };
}
