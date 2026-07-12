"use client";

import { useEffect, useRef, useState, ReactNode, HTMLAttributes } from "react";

interface ScrollRevealProps extends Omit<HTMLAttributes<HTMLDivElement>, "className"> {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function ScrollReveal({ children, className = "", delay, ...rest }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  // React state (emas — classList.add) muhim: ota komponent qayta render
  // bo'lganda (masalan interaktiv holat o'zgarganda) React className'ni
  // qayta yozib, imperativ qo'shilgan "visible" klassini o'chirib
  // yuborardi — natijada allaqachon ko'ringan element birdan yo'qolardi.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const delayClass = delay ? `reveal-d${delay}` : "";

  return (
    <div
      ref={ref}
      className={`reveal ${delayClass} ${className} ${visible ? "visible" : ""}`}
      {...rest}
    >
      {children}
    </div>
  );
}
