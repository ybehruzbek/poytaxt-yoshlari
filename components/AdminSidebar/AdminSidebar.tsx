"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

export default function AdminSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", icon: "fa-chart-pie", path: "/admin" },
    { name: "Murojaatlar", icon: "fa-envelope-open-text", path: "/admin/murojaatlar" },
    { name: "Loyihalar", icon: "fa-project-diagram", path: "/admin/loyihalar" },
    { name: "Yangiliklar", icon: "fa-newspaper", path: "/admin/yangiliklar" },
  ];

  return (
    <aside style={{ 
      width: "280px", 
      backgroundColor: "var(--blue-deep)", 
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      boxShadow: "4px 0 15px rgba(0,0,0,0.05)"
    }}>
      <div style={{ padding: "30px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <h2 style={{ fontSize: "22px", fontWeight: 700, margin: 0, color: "#fff" }}>
          Poytaxt <span style={{ color: "var(--green)" }}>Yoshlari</span>
        </h2>
        <p style={{ margin: "5px 0 0", fontSize: "12px", opacity: 0.6, letterSpacing: "1px", textTransform: "uppercase" }}>
          Admin Panel
        </p>
      </div>

      <nav style={{ flex: 1, padding: "30px 15px" }}>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
          {menuItems.map((item) => {
            const isActive = pathname === item.path || (item.path !== "/admin" && pathname.startsWith(item.path));
            return (
              <li key={item.path}>
                <Link 
                  href={item.path}
                  style={{
                    display: "flex", alignItems: "center", gap: "15px",
                    padding: "12px 20px", borderRadius: "10px",
                    textDecoration: "none",
                    color: isActive ? "#fff" : "rgba(255,255,255,0.6)",
                    backgroundColor: isActive ? "rgba(255,255,255,0.1)" : "transparent",
                    transition: "all 0.3s ease",
                    fontWeight: isActive ? 600 : 400
                  }}
                >
                  <i className={`fas ${item.icon}`} style={{ width: "20px", textAlign: "center", color: isActive ? "var(--green)" : "inherit" }}></i>
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div style={{ padding: "30px 15px" }}>
        <button 
          onClick={() => signOut({ callbackUrl: '/' })}
          style={{
            width: "100%", display: "flex", alignItems: "center", gap: "15px",
            padding: "12px 20px", borderRadius: "10px",
            border: "none", background: "rgba(239, 68, 68, 0.1)",
            color: "#ef4444", cursor: "pointer", fontWeight: 600,
            transition: "all 0.3s ease", textAlign: "left"
          }}
        >
          <i className="fas fa-sign-out-alt" style={{ width: "20px", textAlign: "center" }}></i>
          Tizimdan chiqish
        </button>
      </div>
    </aside>
  );
}
