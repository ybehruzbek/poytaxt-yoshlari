import { prisma } from "@/lib/prisma";
import styles from "@/components/admin/Admin.module.css";

export const metadata = { title: "Audit log | Admin Panel" };

const ACTION_LABEL: Record<string, string> = {
  create: "Yaratdi",
  update: "Tahrirladi",
  delete: "O'chirdi",
};

export default async function AuditPage() {
  // TZ §19 SEC-05: admin amallari tarixi. Oxirgi 200 ta yozuv.
  const logs = await prisma.auditLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Audit log</h1>
      </div>

      <div className={`${styles.card} ${styles.tableWrap}`}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Vaqt</th>
              <th>Foydalanuvchi</th>
              <th>Amal</th>
              <th>Bo&apos;lim</th>
              <th>Nima</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td colSpan={5} className={styles.empty}>Hozircha yozuv yo&apos;q.</td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log.id}>
                  <td style={{ whiteSpace: "nowrap" }}>
                    {log.createdAt.toISOString().slice(0, 16).replace("T", " ")}
                  </td>
                  <td>{log.username}</td>
                  <td>{ACTION_LABEL[log.action] ?? log.action}</td>
                  <td>{log.entity}</td>
                  <td className={styles.cellTruncate}>{log.summary ?? log.entityId}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
