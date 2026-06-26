"use client";

import { useTheme } from "@/providers/ThemeProvider";
import { useEffect, useState } from "react";

const themes = ["hero", "about", "directions", "projects", "news", "default"] as const;

export default function BackgroundTheme() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevents hydration mismatch
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="global-bg-layers">
      {themes.map((t) => (
        <div
          key={t}
          className={`bg-layer bg-${t}`}
          style={{ opacity: theme === t ? 1 : 0 }}
        />
      ))}
    </div>
  );
}
