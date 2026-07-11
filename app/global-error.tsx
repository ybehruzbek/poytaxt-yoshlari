"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error(error);

  // Root layout ishlamay qolganda chiqadi — html/body shu yerda bo'lishi shart,
  // globals.css ham yuklanmagan bo'lishi mumkin, shuning uchun faqat inline uslub.
  return (
    <html lang="uz">
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, -apple-system, sans-serif",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          textAlign: "center",
          padding: "40px 20px",
          background: "#fff",
          color: "#111",
        }}
      >
        <h1 style={{ fontSize: 48, fontWeight: 900, marginBottom: 16 }}>
          Tizimda xatolik
        </h1>
        <p style={{ fontSize: 17, color: "#555", marginBottom: 28, maxWidth: 440 }}>
          Saytda kutilmagan xatolik yuz berdi. Qayta urinib ko&apos;ring.
        </p>
        <button
          type="button"
          onClick={reset}
          style={{
            padding: "12px 28px",
            borderRadius: 10,
            border: "none",
            background: "#111",
            color: "#fff",
            fontSize: 15,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Qayta urinish
        </button>
      </body>
    </html>
  );
}
