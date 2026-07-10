"use client";

import { useEffect } from "react";
import { useTheme } from "@/providers/ThemeProvider";

export default function BackgroundController() {
  const { theme } = useTheme();

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="ambient-background">
      <div className="ambient-glow glow-1" />
      <div className="ambient-glow glow-2" />
    </div>
  );
}
