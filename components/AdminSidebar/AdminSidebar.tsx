"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { RESOURCES } from "@/lib/admin/resources";

const FIXED_TOP = [
  { name: "Dashboard", icon: "fa-chart-pie", path: "/admin" },
  { name: "Murojaatlar", icon: "fa-envelope-open-text", path: "/admin/murojaatlar" },
];

const FIXED_BOTTOM = [
  { name: "Audit log", icon: "fa-clipboard-list", path: "/admin/audit" },
];

// Menyu resurs konfiguratsiyasidan yig'iladi — yangi bo'lim qo'shsangiz
// `lib/admin/resources.ts` ga yozsangiz kifoya.
const MENU = [
  ...FIXED_TOP,
  ...RESOURCES.map((r) => ({ name: r.label, icon: r.icon, path: `/admin/${r.key}` })),
  ...FIXED_BOTTOM,
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside style={{
      width: "260px",
      flexShrink: 0,
      backgroundColor: "var(--blue-deep)",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      boxShadow: "4px 0 15px rgba(0,0,0,0.05)"
    }}>
      <div style={{ padding: "24px 24px 20px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, margin: 0, color: "#fff" }}>
          Poytaxt <span style={{ color: "var(--green)" }}>Yoshlari</span>
        </h2>
        <p style={{ margin: "5px 0 0", fontSize: "11px", opacity: 0.6, letterSpacing: "1px", textTransform: "uppercase" }}>
          Admin Panel
        </p>
      </div>

      <nav style={{ flex: 1, padding: "16px 12px", overflowY: "auto" }}>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "4px" }}>
          {MENU.map((item) => {
            const isActive =
              pathname === item.path ||
              (item.path !== "/admin" && pathname.startsWith(`${item.path}/`));
            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  aria-current={isActive ? "page" : undefined}
                  style={{
                    display: "flex", alignItems: "center", gap: "12px",
                    padding: "10px 16px", borderRadius: "10px",
                    textDecoration: "none",
                    fontSize: "14px",
                    color: isActive ? "#fff" : "rgba(255,255,255,0.6)",
                    backgroundColor: isActive ? "rgba(255,255,255,0.1)" : "transparent",
                    fontWeight: isActive ? 600 : 400
                  }}
                >
                  <i className={`fas ${item.icon}`} style={{ width: "18px", textAlign: "center", color: isActive ? "var(--green)" : "inherit" }} />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div style={{ padding: "16px 12px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <Link
          href="/"
          style={{
            display: "flex", alignItems: "center", gap: "12px",
            padding: "10px 16px", borderRadius: "10px",
            textDecoration: "none", fontSize: "14px",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          <i className="fas fa-arrow-up-right-from-square" style={{ width: "18px", textAlign: "center" }} />
          Saytni ochish
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          style={{
            width: "100%", display: "flex", alignItems: "center", gap: "12px",
            padding: "10px 16px", borderRadius: "10px",
            border: "none", background: "rgba(239, 68, 68, 0.1)",
            color: "#ef4444", cursor: "pointer", fontWeight: 600, fontSize: "14px",
            textAlign: "left", marginTop: "4px"
          }}
        >
          <i className="fas fa-sign-out-alt" style={{ width: "18px", textAlign: "center" }} />
          Tizimdan chiqish
        </button>
      </div>
    </aside>
  );
}
