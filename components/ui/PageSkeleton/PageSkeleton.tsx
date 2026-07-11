import Skeleton from "@/components/ui/Skeleton/Skeleton";
import styles from "./PageSkeleton.module.css";

interface PageSkeletonProps {
  /** grid — kartalar to'ri (ro'yxat sahifalari); article — bitta maqola ustuni (detail sahifalar) */
  variant?: "grid" | "article";
  cards?: number;
}

function HeaderSkeleton() {
  return (
    <div className={styles.header}>
      <Skeleton width="140px" height="13px" />
      <Skeleton width="55%" height="40px" radius="10px" className={styles.title} />
      <Skeleton width="70%" height="17px" />
    </div>
  );
}

export default function PageSkeleton({ variant = "grid", cards = 6 }: PageSkeletonProps) {
  return (
    <div className={`container ${styles.page}`}>
      <HeaderSkeleton />

      {variant === "grid" ? (
        <div className={styles.grid}>
          {Array.from({ length: cards }).map((_, i) => (
            <div key={i} className={styles.card}>
              <Skeleton height="160px" radius="16px" />
              <Skeleton width="40%" height="12px" className={styles.gap} />
              <Skeleton width="85%" height="18px" className={styles.gap} />
              <Skeleton width="60%" height="14px" />
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.article}>
          <Skeleton height="320px" radius="24px" />
          <Skeleton width="50%" height="14px" className={styles.gap} />
          <Skeleton width="90%" height="16px" />
          <Skeleton width="80%" height="16px" />
          <Skeleton width="70%" height="16px" />
        </div>
      )}
    </div>
  );
}
