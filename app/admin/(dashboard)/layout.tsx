import "@/app/globals.css";
import React from "react";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar/AdminSidebar";
import { requireRole } from "@/lib/auth";
import { User } from "@phosphor-icons/react/ssr";

export const metadata = {
  title: "Admin Panel | Poytaxt Yoshlari",
  description: "Boshqaruv paneli",
  robots: { index: false, follow: false },
};

// Panel jonli ma'lumot ko'rsatadi — hech qachon statik render qilinmasin.
export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireRole("ADMIN", "MODERATOR");
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "var(--bg)" }}>
      <AdminSidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <header style={{ 
          height: "70px", 
          backgroundColor: "#fff", 
          borderBottom: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          padding: "0 30px",
          justifyContent: "flex-end"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <span style={{ fontWeight: 600, color: "var(--blue-deep)" }}>
              {session.user.name}
            </span>
            <div style={{ 
              width: "40px", height: "40px", borderRadius: "50%", 
              backgroundColor: "var(--blue-pale)", color: "var(--blue)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "18px"
            }}>
              <User weight="duotone" />
            </div>
          </div>
        </header>
        <main style={{ padding: "30px", flex: 1, overflowY: "auto" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
