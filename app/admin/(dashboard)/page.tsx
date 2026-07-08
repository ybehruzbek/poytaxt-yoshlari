import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const usersCount = await prisma.user.count();
  const appealsCount = await prisma.appeal.count();
  const projectsCount = await prisma.project.count();
  const newsCount = await prisma.news.count();

  const statCards = [
    { title: "Murojaatlar", count: appealsCount, icon: "fa-envelope-open-text", color: "var(--blue)" },
    { title: "Loyihalar", count: projectsCount, icon: "fa-project-diagram", color: "var(--green)" },
    { title: "Yangiliklar", count: newsCount, icon: "fa-newspaper", color: "var(--blue-deep)" },
    { title: "Foydalanuvchilar", count: usersCount, icon: "fa-users", color: "#F59E0B" },
  ];

  return (
    <div>
      <h1 style={{ fontSize: "24px", color: "var(--blue-deep)", marginBottom: "20px" }}>Dashboard</h1>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
        {statCards.map(stat => (
          <div key={stat.title} style={{ 
            backgroundColor: "#fff", padding: "20px", borderRadius: "12px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.03)", display: "flex", alignItems: "center", gap: "20px"
          }}>
            <div style={{ 
              width: "50px", height: "50px", borderRadius: "10px", 
              backgroundColor: `${stat.color}15`, color: stat.color,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px"
            }}>
              <i className={`fas ${stat.icon}`}></i>
            </div>
            <div>
              <div style={{ fontSize: "24px", fontWeight: 700, color: "var(--blue-deep)" }}>{stat.count}</div>
              <div style={{ fontSize: "14px", color: "var(--text-secondary)" }}>{stat.title}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "40px", backgroundColor: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.03)" }}>
        <h2 style={{ fontSize: "18px", color: "var(--blue-deep)", marginBottom: "15px" }}>Xush kelibsiz!</h2>
        <p style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>
          Bu yerda siz saytdagi barcha kontentni (murojaatlar, yangiliklar, loyihalar va boshqalar) boshqarishingiz mumkin. Chappdagi menyudan kerakli bo'limni tanlang.
        </p>
      </div>
    </div>
  );
}
