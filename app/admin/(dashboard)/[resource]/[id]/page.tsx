import { notFound } from "next/navigation";
import { getResource } from "@/lib/admin/resources";
import { getDelegate } from "@/lib/admin/db";
import ResourceForm from "@/components/admin/ResourceForm";
import styles from "@/components/admin/Admin.module.css";

export async function generateMetadata({ params }: { params: Promise<{ resource: string }> }) {
  const { resource } = await params;
  const def = getResource(resource);
  return { title: `${def?.singular ?? "Yozuv"} tahriri | Admin Panel` };
}

export default async function EditResourcePage({
  params,
}: {
  params: Promise<{ resource: string; id: string }>;
}) {
  const { resource, id } = await params;
  const def = getResource(resource);
  const delegate = getDelegate(resource);
  if (!def || !delegate) notFound();

  const item = await delegate.findUnique({ where: { id } });
  if (!item) notFound();

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>
          {String(item[def.titleField] ?? def.singular)}
        </h1>
      </div>
      <ResourceForm resource={def} item={item} />
    </div>
  );
}
