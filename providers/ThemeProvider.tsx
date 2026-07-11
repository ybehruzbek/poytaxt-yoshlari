"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { MotionConfig } from "motion/react";

export type Theme = "hero" | "about" | "directions" | "projects" | "news" | "leadership" | "youthleaders" | "documents" | "gallery" | "appeals" | "contact" | "default" | "events" | "stats";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("hero");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {/* framer-motion animatsiyalari (TextReveal, Stats va h.k.) OS darajasidagi
          "harakatni kamaytirish" sozlamasini hurmat qilishi uchun — ScrollReveal
          buni JS orqali o'zi tekshiradi, lekin motion/react animatsiyalari buni
          shu wrapper bo'lmasa butunlay e'tiborsiz qoldiradi. */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
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
