import { ReactNode } from "react";
import styles from "./ErrorState.module.css";

interface ErrorStateProps {
  /** Katta raqam (masalan "404") — faqat 3-4 belgigacha, katta shriftda chiqadi. */
  code?: string;
  /** Raqam o'rniga ikon (masalan xatolik uchun) — code bilan birga ishlatilmaydi. */
  icon?: string;
  title: string;
  message: string;
  actions: ReactNode;
}

export default function ErrorState({ code, icon, title, message, actions }: ErrorStateProps) {
  return (
    <div className={`${styles.wrap} naqsh naqsh-yulduz`}>
      <div className={styles.content}>
        {code && <div className={styles.code}>{code}</div>}
        {icon && (
          <div className={styles.iconWrap}>
            <i className={icon} />
          </div>
        )}
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.message}>{message}</p>
        <div className={styles.actions}>{actions}</div>
      </div>
    </div>
  );
}
