import Link from "next/link";
import { notFound } from "next/navigation";
import { getResource } from "@/lib/admin/resources";
import { getDelegate } from "@/lib/admin/db";
import DeleteButton from "@/components/admin/DeleteButton";
import styles from "@/components/admin/Admin.module.css";

export async function generateMetadata({ params }: { params: Promise<{ resource: string }> }) {
  const { resource } = await params;
  const def = getResource(resource);
  return { title: `${def?.label ?? "Bo'lim"} | Admin Panel` };
}

/** Jadval katagi uchun qiymatni ko'rinishga tayyorlaydi. */
function renderCell(value: unknown) {
  if (typeof value === "boolean") {
    return (
      <span className={`${styles.badge} ${value ? styles.badgeOn : styles.badgeOff}`}>
        {value ? "Ha" : "Yo'q"}
      </span>
    );
  }
  if (value === null || value === undefined || value === "") {
    return <span className={styles.badgeOff}>—</span>;
  }
  return String(value);
}

export default async function ResourceListPage({
  params,
}: {
  params: Promise<{ resource: string }>;
}) {
  const { resource } = await params;
  const def = getResource(resource);
  const delegate = getDelegate(resource);
  if (!def || !delegate) notFound();

  const items = await delegate.findMany({ orderBy: def.orderBy });

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>{def.label}</h1>
        <Link href={`/admin/${def.key}/yangi`} className={`${styles.btn} ${styles.btnPrimary}`}>
          <i className="fas fa-plus" /> Yangi {def.singular}
        </Link>
      </div>

      <div className={`${styles.card} ${styles.tableWrap}`}>
        <table className={styles.table}>
          <thead>
            <tr>
              {def.listColumns.map((col) => {
                const field = def.fields.find((f) => f.name === col);
                return <th key={col}>{field?.label ?? col}</th>;
              })}
              <th style={{ textAlign: "right" }}>Amallar</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={def.listColumns.length + 1} className={styles.empty}>
                  Hozircha yozuv yo&apos;q. &laquo;Yangi {def.singular}&raquo; tugmasini bosing.
                </td>
              </tr>
            ) : (
              items.map((item) => {
                const id = String(item.id);
                const title = String(item[def.titleField] ?? id);
                return (
                  <tr key={id}>
                    {def.listColumns.map((col) => (
                      <td key={col} className={styles.cellTruncate}>
                        {renderCell(item[col])}
                      </td>
                    ))}
                    <td>
                      <div className={styles.rowActions}>
                        <Link
                          href={`/admin/${def.key}/${id}`}
                          className={`${styles.btn} ${styles.btnGhost}`}
                        >
                          <i className="fas fa-pen" /> Tahrirlash
                        </Link>
                        <DeleteButton resourceKey={def.key} id={id} title={title} />
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
