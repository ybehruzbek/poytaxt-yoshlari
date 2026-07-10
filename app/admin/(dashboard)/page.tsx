import Link from "next/link";
import { prisma } from "@/lib/prisma";
import styles from "@/components/admin/Admin.module.css";

export const metadata = { title: "Dashboard | Admin Panel" };

export default async function AdminDashboardPage() {
  const [newAppeals, totalAppeals, projectsCount, newsCount, recentLogs] =
    await Promise.all([
      prisma.appeal.count({ where: { status: "Yangi" } }),
      prisma.appeal.count(),
      prisma.project.count(),
      prisma.news.count(),
      prisma.auditLog.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    ]);

  const statCards = [
    { title: "Yangi murojaatlar", count: newAppeals, icon: "fa-envelope-open-text", color: "#EF4444", href: "/admin/murojaatlar" },
    { title: "Jami murojaatlar", count: totalAppeals, icon: "fa-inbox", color: "var(--blue)", href: "/admin/murojaatlar" },
    { title: "Loyihalar", count: projectsCount, icon: "fa-diagram-project", color: "var(--green)", href: "/admin/loyihalar" },
    { title: "Yangiliklar", count: newsCount, icon: "fa-newspaper", color: "var(--blue-deep)", href: "/admin/yangiliklar" },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Dashboard</h1>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
        {statCards.map((stat) => (
          <Link
            key={stat.title}
            href={stat.href}
            className={styles.card}
            style={{ padding: "20px", display: "flex", alignItems: "center", gap: "20px", textDecoration: "none" }}
          >
            <div style={{
              width: "50px", height: "50px", borderRadius: "10px", flexShrink: 0,
              backgroundColor: `color-mix(in srgb, ${stat.color} 12%, transparent)`, color: stat.color,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px"
            }}>
              <i className={`fas ${stat.icon}`} />
            </div>
            <div>
              <div style={{ fontSize: "24px", fontWeight: 700, color: "var(--blue-deep)" }}>{stat.count}</div>
              <div style={{ fontSize: "14px", color: "var(--text-secondary)" }}>{stat.title}</div>
            </div>
          </Link>
        ))}
      </div>

      <div className={styles.card} style={{ padding: "20px" }}>
        <h2 style={{ fontSize: "18px", color: "var(--blue-deep)", marginTop: 0, marginBottom: "15px" }}>
          So&apos;nggi amallar
        </h2>
        {recentLogs.length === 0 ? (
          <p style={{ color: "var(--text-muted)", margin: 0 }}>
            Hozircha hech qanday o&apos;zgarish qilinmagan.
          </p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
            {recentLogs.map((log) => (
              <li key={log.id} style={{ display: "flex", justifyContent: "space-between", gap: "16px", fontSize: "14px" }}>
                <span style={{ color: "var(--text)" }}>
                  <strong>{log.username}</strong> — {log.summary ?? log.entity}
                </span>
                <span style={{ color: "var(--text-muted)", whiteSpace: "nowrap" }}>
                  {log.createdAt.toISOString().slice(0, 16).replace("T", " ")}
                </span>
              </li>
            ))}
          </ul>
        )}
        <Link href="/admin/audit" style={{ display: "inline-block", marginTop: "16px", fontSize: "14px", color: "var(--blue)" }}>
          Barcha amallar →
        </Link>
      </div>
    </div>
  );
}
