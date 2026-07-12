import Link from "next/link";
import { prisma } from "@/lib/prisma";
import styles from "@/components/admin/Admin.module.css";
import { Eye } from "@phosphor-icons/react/ssr";

export const metadata = { title: "Murojaatlar | Admin Panel" };

const STATUS_COLORS: Record<string, { bg: string; fg: string }> = {
  "Yangi": { bg: "#FEE2E2", fg: "#EF4444" },
  "Ko'rib chiqilmoqda": { bg: "#FEF3C7", fg: "#D97706" },
  "Javob berildi": { bg: "#DCFCE7", fg: "#16A34A" },
};

export default async function AdminAppealsPage() {
  const appeals = await prisma.appeal.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Murojaatlar</h1>
        <span style={{ color: "var(--text-muted)", fontSize: "var(--fs-sm)" }}>
          Jami: {appeals.length}
        </span>
      </div>

      <div className={`${styles.card} ${styles.tableWrap}`}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID / Sana</th>
              <th>F.I.Sh.</th>
              <th>Aloqa</th>
              <th>Turi / Tuman</th>
              <th>Xabar</th>
              <th>Holat</th>
              <th style={{ textAlign: "right" }}>Amallar</th>
            </tr>
          </thead>
          <tbody>
            {appeals.length === 0 ? (
              <tr>
                <td colSpan={7} className={styles.empty}>Murojaatlar topilmadi.</td>
              </tr>
            ) : (
              appeals.map((item) => {
                const color = STATUS_COLORS[item.status] ?? STATUS_COLORS["Yangi"];
                return (
                  <tr key={item.id}>
                    <td>
                      <div style={{ color: "var(--blue-deep)", fontWeight: 500, fontSize: "var(--fs-xs)" }}>
                        {item.id.slice(-6).toUpperCase()}
                      </div>
                      <div style={{ color: "var(--text-secondary)", fontSize: "var(--fs-xs)", marginTop: "4px" }}>
                        {item.createdAt.toISOString().slice(0, 10)}
                      </div>
                    </td>
                    <td style={{ fontWeight: 500, color: "var(--blue-deep)" }}>{item.fullName}</td>
                    <td style={{ color: "var(--text-secondary)" }}>{item.phone}</td>
                    <td>
                      <span className={styles.badge} style={{ background: "var(--blue-pale)", color: "var(--blue)" }}>
                        {item.type}
                      </span>
                      <div style={{ color: "var(--text-secondary)", fontSize: "var(--fs-xs)", marginTop: "4px" }}>
                        {item.district ?? "—"}
                      </div>
                    </td>
                    <td className={styles.cellTruncate} style={{ color: "var(--text-secondary)" }}>
                      {item.message}
                    </td>
                    <td>
                      <span className={styles.badge} style={{ background: color.bg, color: color.fg }}>
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <div className={styles.rowActions}>
                        <Link
                          href={`/admin/murojaatlar/${item.id}`}
                          className={`${styles.btn} ${styles.btnGhost}`}
                        >
                          <Eye weight="duotone" /> Ko&apos;rish
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
