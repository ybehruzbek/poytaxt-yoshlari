export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
      }}
      aria-label="Yuklanmoqda"
      role="status"
    >
      <style>{`
        @keyframes py-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          border: "3px solid var(--border, #e5e7eb)",
          borderTopColor: "var(--primary, #2563eb)",
          animation: "py-spin 0.8s linear infinite",
        }}
      />
    </div>
  );
}
