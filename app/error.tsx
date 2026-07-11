"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        textAlign: "center",
        padding: "40px 20px",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(60px, 10vw, 110px)",
          fontWeight: 900,
          color: "var(--text)",
          lineHeight: 1,
          marginBottom: 16,
        }}
      >
        Xatolik
      </h1>
      <p
        style={{
          fontSize: 18,
          color: "var(--text-muted)",
          marginBottom: 32,
          maxWidth: 440,
        }}
      >
        Kutilmagan xatolik yuz berdi. Qayta urinib ko&apos;ring — muammo
        davom etsa, birozdan keyin qaytib keling.
      </p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
        <button type="button" className="btn-primary" onClick={reset}>
          Qayta urinish
        </button>
        <Link href="/" className="btn-secondary">
          Bosh sahifaga qaytish
        </Link>
      </div>
    </div>
  );
}
