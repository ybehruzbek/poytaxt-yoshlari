"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { MotionConfig } from "motion/react";

export type Theme = "hero" | "about" | "directions" | "projects" | "news" | "leadership" | "youthleaders" | "documents" | "gallery" | "appeals" | "contact" | "default" | "events" | "stats";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("hero");
  // motion/react'ning o'z "user" detektori `matchMedia("(prefers-reduced-motion)")`
  // ni qiymatsiz chaqiradi — bu deyarli har doim true qaytaradi (brauzer shu
  // xususiyatni qo'llab-quvvatlasa bas), foydalanuvchi haqiqiy sozlamasidan
  // qat'i nazar. Shu sabab butun sayt animatsiyasiz ko'rinardi. To'g'ri
  // qiymat bilan (": reduce") o'zimiz tekshirib, natijani beramiz.
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    query.addEventListener("change", listener);
    return () => query.removeEventListener("change", listener);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <MotionConfig reducedMotion={reducedMotion ? "always" : "never"}>{children}</MotionConfig>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
