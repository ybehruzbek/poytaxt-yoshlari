import { ReactNode } from "react";
import PageHeader from "@/components/ui/PageHeader";
import styles from "./LegalPage.module.css";

interface LegalPageProps {
  label: string;
  title: string;
  breadcrumbLabel: string;
  updatedAt: string;
  children: ReactNode;
}

export default function LegalPage({ label, title, breadcrumbLabel, updatedAt, children }: LegalPageProps) {
  return (
    <div className="page-body">
      <PageHeader
        label={label}
        title={title}
        breadcrumbs={[{ label: "Bosh sahifa", href: "/" }, { label: breadcrumbLabel }]}
      />
      <div className={`container ${styles.wrap}`}>
        <p className={styles.updated}>Oxirgi yangilanish: {updatedAt}</p>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
}
