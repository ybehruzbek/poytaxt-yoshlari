import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";

/** CSV maydonida vergul/qo'shtirnoq bo'lsa ekranlaydi. */
function csvCell(value: string | null): string {
  const v = value ?? "";
  return /[",\n;]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
}

/**
 * Ishtirokchilar ro'yxatini CSV qilib beradi (TZ FR-EVENT-03/04).
 * Excel kirillcha/lotincha matnni to'g'ri ochishi uchun UTF-8 BOM qo'shiladi.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ eventId: string }> }
) {
  const session = await requireRole("ADMIN", "MODERATOR");
  if (!session) {
    return new Response("Ruxsat yo'q", { status: 403 });
  }

  const { eventId } = await params;
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: { registrations: { orderBy: { createdAt: "asc" } } },
  });
  if (!event) return new Response("Topilmadi", { status: 404 });

  const header = ["#", "F.I.Sh.", "Telefon", "Telegram", "Tashkilot", "Vaqti"];
  const rows = event.registrations.map((r, i) => [
    String(i + 1),
    csvCell(r.fullName),
    csvCell(r.phone),
    csvCell(r.telegram),
    csvCell(r.organization),
    r.createdAt.toISOString().replace("T", " ").slice(0, 16),
  ]);

  const csv =
    "﻿" + [header, ...rows].map((row) => row.join(",")).join("\r\n");

  const filename = `ishtirokchilar-${event.slug}.csv`;
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
