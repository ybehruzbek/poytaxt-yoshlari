import Link from "next/link";
import styles from "./BackLink.module.css";
import { ArrowLeft } from "@phosphor-icons/react/ssr";

export default function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className={styles.link}>
      <ArrowLeft weight="duotone" /> {label}
    </Link>
  );
}
