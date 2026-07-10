import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AppealForm from "@/components/admin/AppealForm";
import styles from "@/components/admin/Admin.module.css";

export const metadata = { title: "Murojaat | Admin Panel" };

export default async function AppealDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const appeal = await prisma.appeal.findUnique({ where: { id } });
  if (!appeal) notFound();

  const facts: [string, string][] = [
    ["F.I.Sh.", appeal.fullName],
    ["Telefon", appeal.phone],
    ["Email", appeal.email ?? "—"],
    ["Turi", appeal.type],
    ["Tuman", appeal.district ?? "—"],
    ["Yuborilgan", appeal.createdAt.toISOString().slice(0, 16).replace("T", " ")],
  ];

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Murojaat #{appeal.id.slice(-6).toUpperCase()}</h1>
      </div>

      <div className={styles.card} style={{ padding: "var(--sp-6)" }}>
        <dl style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: "var(--sp-3)", margin: 0 }}>
          {facts.map(([label, value]) => (
            <div key={label} style={{ display: "contents" }}>
              <dt style={{ color: "var(--text-muted)", fontSize: "var(--fs-sm)" }}>{label}</dt>
              <dd style={{ margin: 0, color: "var(--text)" }}>{value}</dd>
            </div>
          ))}
        </dl>

        <h2 style={{ fontSize: "var(--fs-lg)", color: "var(--blue-deep)", margin: "var(--sp-6) 0 var(--sp-3)" }}>
          Xabar
        </h2>
        <p style={{ margin: 0, lineHeight: 1.7, whiteSpace: "pre-wrap", color: "var(--text-secondary)" }}>
          {appeal.message}
        </p>
      </div>

      <AppealForm appeal={appeal} />
    </div>
  );
}
