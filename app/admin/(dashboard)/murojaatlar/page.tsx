import { prisma } from "@/lib/prisma";

export default async function AdminAppealsPage() {
  const appeals = await prisma.appeal.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1 style={{ fontSize: "24px", color: "var(--blue-deep)" }}>Murojaatlar</h1>
      </div>

      <div style={{ backgroundColor: "#fff", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.03)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ backgroundColor: "var(--bg)", color: "var(--text-secondary)", fontSize: "14px" }}>
              <th style={{ padding: "15px 20px", fontWeight: 600 }}>ID / Sana</th>
              <th style={{ padding: "15px 20px", fontWeight: 600 }}>F.I.SH.</th>
              <th style={{ padding: "15px 20px", fontWeight: 600 }}>Aloqa</th>
              <th style={{ padding: "15px 20px", fontWeight: 600 }}>Turi / Tuman</th>
              <th style={{ padding: "15px 20px", fontWeight: 600 }}>Xabar</th>
              <th style={{ padding: "15px 20px", fontWeight: 600 }}>Holat</th>
            </tr>
          </thead>
          <tbody>
            {appeals.length > 0 ? (
              appeals.map((item) => (
                <tr key={item.id} style={{ borderBottom: "1px solid var(--border)", fontSize: "14px" }}>
                  <td style={{ padding: "15px 20px" }}>
                    <div style={{ color: "var(--blue-deep)", fontWeight: 500, fontSize: "12px" }}>
                      {item.id.slice(-6).toUpperCase()}
                    </div>
                    <div style={{ color: "var(--text-secondary)", fontSize: "12px", marginTop: "4px" }}>
                      {new Date(item.createdAt).toLocaleDateString("uz-UZ")}
                    </div>
                  </td>
                  <td style={{ padding: "15px 20px", fontWeight: 500, color: "var(--blue-deep)" }}>
                    {item.fullName}
                  </td>
                  <td style={{ padding: "15px 20px", color: "var(--text-secondary)" }}>
                    {item.phone}
                  </td>
                  <td style={{ padding: "15px 20px" }}>
                    <span style={{ 
                      display: "inline-block", padding: "4px 8px", borderRadius: "4px",
                      backgroundColor: "var(--blue-pale)", color: "var(--blue)", fontSize: "12px", fontWeight: 500, marginBottom: "4px"
                    }}>
                      {item.type}
                    </span>
                    <div style={{ color: "var(--text-secondary)", fontSize: "12px" }}>{item.district}</div>
                  </td>
                  <td style={{ padding: "15px 20px", maxWidth: "250px" }}>
                    <p style={{ 
                      margin: 0, color: "var(--text-secondary)", 
                      display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden"
                    }}>
                      {item.message}
                    </p>
                  </td>
                  <td style={{ padding: "15px 20px" }}>
                    <span style={{ 
                      display: "inline-block", padding: "6px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 600,
                      backgroundColor: item.status === "Yangi" ? "#FEE2E2" : 
                                       item.status === "Ko'rib chiqilmoqda" ? "#FEF3C7" : "#DCFCE7",
                      color: item.status === "Yangi" ? "#EF4444" : 
                             item.status === "Ko'rib chiqilmoqda" ? "#D97706" : "#16A34A"
                    }}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ padding: "40px", textAlign: "center", color: "var(--text-muted)" }}>
                  Murojaatlar topilmadi.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
