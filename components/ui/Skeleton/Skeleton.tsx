import styles from "./Skeleton.module.css";

interface SkeletonProps {
  width?: string;
  height?: string;
  radius?: string;
  className?: string;
}

export default function Skeleton({ width = "100%", height = "16px", radius = "8px", className = "" }: SkeletonProps) {
  return (
    <span
      className={`${styles.block} ${className}`}
      style={{ width, height, borderRadius: radius }}
      aria-hidden="true"
    />
  );
}
