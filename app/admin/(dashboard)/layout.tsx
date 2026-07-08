import "@/app/globals.css";
import React from "react";
import AdminSidebar from "@/components/AdminSidebar/AdminSidebar";

export const metadata = {
  title: "Admin Panel | Poytaxt Yoshlari",
  description: "Boshqaruv paneli",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
            <span style={{ fontWeight: 600, color: "var(--blue-deep)" }}>Admin</span>
            <div style={{ 
              width: "40px", height: "40px", borderRadius: "50%", 
              backgroundColor: "var(--blue-pale)", color: "var(--blue)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "18px"
            }}>
              <i className="fas fa-user"></i>
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
