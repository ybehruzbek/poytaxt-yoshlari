import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import styles from "@/components/admin/Admin.module.css";

export const metadata = { title: "Ishtirokchilar ro'yxati | Admin Panel" };

export default async function EventRegistrationsPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: {
      registrations: { orderBy: { createdAt: "asc" } },
    },
  });
  if (!event) notFound();

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>{event.title}</h1>
          <p style={{ margin: "6px 0 0", fontSize: 14, color: "var(--text-muted)" }}>
            {event.registrations.length} ta ishtirokchi
            {event.capacity > 0 && ` (limit: ${event.capacity})`}
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <a
            href={`/admin/ishtirokchilar/${event.id}/csv`}
            className={`${styles.btn} ${styles.btnPrimary}`}
          >
            <i className="fas fa-file-csv" /> CSV yuklab olish
          </a>
          <Link
            href="/admin/ishtirokchilar"
            className={`${styles.btn} ${styles.btnGhost}`}
          >
            Orqaga
          </Link>
        </div>
      </div>

      <div className={`${styles.card} ${styles.tableWrap}`}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>F.I.Sh.</th>
              <th>Telefon</th>
              <th>Telegram</th>
              <th>OTM / muassasa</th>
              <th>Vaqti</th>
            </tr>
          </thead>
          <tbody>
            {event.registrations.length === 0 ? (
              <tr>
                <td colSpan={6} className={styles.empty}>
                  Hali hech kim ro&apos;yxatdan o&apos;tmagan.
                </td>
              </tr>
            ) : (
              event.registrations.map((reg, i) => (
                <tr key={reg.id}>
                  <td>{i + 1}</td>
                  <td className={styles.cellTruncate}>{reg.fullName}</td>
                  <td>{reg.phone}</td>
                  <td>{reg.telegram ?? "—"}</td>
                  <td className={styles.cellTruncate}>{reg.organization ?? "—"}</td>
                  <td>
                    {reg.createdAt.toLocaleString("uz-UZ", {
                      day: "2-digit",
                      month: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
