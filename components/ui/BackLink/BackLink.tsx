import Link from "next/link";
import styles from "./BackLink.module.css";

export default function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className={styles.link}>
      <i className="fas fa-arrow-left" /> {label}
    </Link>
  );
}
