import { ReactNode } from "react";
import Image from "next/image";
import BackLink from "@/components/ui/BackLink/BackLink";
import styles from "./ArticleDetail.module.css";

interface ArticleDetailProps {
  backHref: string;
  backLabel: string;
  badge: string;
  badgeVariant?: "blue" | "green";
  meta?: ReactNode;
  title: string;
  description?: string;
  image: string;
  imageAlt: string;
  children?: ReactNode;
}

export default function ArticleDetail({
  backHref,
  backLabel,
  badge,
  badgeVariant = "blue",
  meta,
  title,
  description,
  image,
  imageAlt,
  children,
}: ArticleDetailProps) {
  return (
    <div className={`container page-body ${styles.page}`}>
      <BackLink href={backHref} label={backLabel} />

      <div className={styles.metaRow}>
        <span className={`${styles.badge} ${styles[badgeVariant]}`}>{badge}</span>
        {meta}
      </div>

      <h1 className={styles.title}>{title}</h1>
      {description && <p className={styles.description}>{description}</p>}

      <div className={styles.banner}>
        <Image src={image} alt={imageAlt} fill style={{ objectFit: "cover" }} priority />
      </div>

      <div className={styles.body}>{children}</div>
    </div>
  );
}
