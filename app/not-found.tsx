import Link from "next/link";

export default function NotFound() {
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
          fontSize: "clamp(80px, 12vw, 140px)",
          fontWeight: 900,
          color: "var(--text)",
          lineHeight: 1,
          marginBottom: 16,
        }}
      >
        404
      </h1>
      <p
        style={{
          fontSize: 18,
          color: "var(--text-muted)",
          marginBottom: 32,
          maxWidth: 400,
        }}
      >
        Kechirasiz, siz qidirayotgan sahifa topilmadi.
      </p>
      <Link href="/" className="btn-primary">
        <i className="fas fa-arrow-left" style={{ fontSize: 12 }} />
        Bosh sahifaga qaytish
      </Link>
    </div>
  );
}
