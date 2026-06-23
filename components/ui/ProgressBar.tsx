"use client";

import { useEffect, useRef, useState } from "react";

interface ProgressBarProps {
  value: number;
  className?: string;
}

export default function ProgressBar({ value, className = "" }: ProgressBarProps) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setWidth(value);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className={className} style={{ height: 4, background: "var(--border-light)", borderRadius: 2, overflow: "hidden" }}>
      <div
        style={{
          height: "100%",
          background: "var(--green)",
          borderRadius: 2,
          width: `${width}%`,
          transition: "width 1s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
    </div>
  );
}
