import { notFound } from "next/navigation";
import { getResource } from "@/lib/admin/resources";
import ResourceForm from "@/components/admin/ResourceForm";
import styles from "@/components/admin/Admin.module.css";

export async function generateMetadata({ params }: { params: Promise<{ resource: string }> }) {
  const { resource } = await params;
  const def = getResource(resource);
  return { title: `Yangi ${def?.singular ?? "yozuv"} | Admin Panel` };
}

export default async function CreateResourcePage({
  params,
}: {
  params: Promise<{ resource: string }>;
}) {
  const { resource } = await params;
  const def = getResource(resource);
  if (!def) notFound();

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Yangi {def.singular}</h1>
      </div>
      <ResourceForm resource={def} item={null} />
    </div>
  );
}
