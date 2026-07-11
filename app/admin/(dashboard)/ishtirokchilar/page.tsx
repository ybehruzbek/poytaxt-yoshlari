import Link from "next/link";
import { prisma } from "@/lib/prisma";
import styles from "@/components/admin/Admin.module.css";

export const metadata = { title: "Ishtirokchilar | Admin Panel" };

/** Tadbirlar kesimida ro'yxatdan o'tganlar soni. */
export default async function IshtirokchilarPage() {
  const events = await prisma.event.findMany({
    orderBy: { startsAt: "desc" },
    include: { _count: { select: { registrations: true } } },
  });

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Tadbir ishtirokchilari</h1>
      </div>

      <div className={`${styles.card} ${styles.tableWrap}`}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Tadbir</th>
              <th>Sana</th>
              <th>Holat</th>
              <th>Ro&apos;yxatdan o&apos;tganlar</th>
              <th style={{ textAlign: "right" }}>Amallar</th>
            </tr>
          </thead>
          <tbody>
            {events.length === 0 ? (
              <tr>
                <td colSpan={5} className={styles.empty}>
                  Hozircha tadbir yo&apos;q.
                </td>
              </tr>
            ) : (
              events.map((event) => (
                <tr key={event.id}>
                  <td className={styles.cellTruncate}>{event.title}</td>
                  <td>
                    {event.startsAt.toLocaleString("uz-UZ", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td>{event.status}</td>
                  <td>
                    {event._count.registrations}
                    {event.capacity > 0 && ` / ${event.capacity}`}
                  </td>
                  <td>
                    <div className={styles.rowActions}>
                      <Link
                        href={`/admin/ishtirokchilar/${event.id}`}
                        className={`${styles.btn} ${styles.btnGhost}`}
                      >
                        <i className="fas fa-users" /> Ro&apos;yxat
                      </Link>
                    </div>
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
