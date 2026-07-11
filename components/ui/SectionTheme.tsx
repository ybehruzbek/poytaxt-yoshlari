"use client";

import { useTheme, type Theme } from "@/providers/ThemeProvider";
import { useEffect, useRef, ReactNode } from "react";

interface SectionThemeProps {
  theme: Theme;
  children: ReactNode;
  className?: string;
}

export default function SectionTheme({ theme, children, className = "" }: SectionThemeProps) {
  const { setTheme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTheme(theme);
          }
        });
      },
      { 
        // Trigger when 40% of the section is in view
        threshold: 0.4 
      } 
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [theme, setTheme]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
