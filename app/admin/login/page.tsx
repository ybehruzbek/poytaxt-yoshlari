"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Login yoki parol noto'g'ri");
      setIsLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <div style={{ 
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      backgroundColor: "var(--bg-light)"
    }}>
      <div style={{
        width: "100%", maxWidth: "420px", padding: "40px",
        backgroundColor: "#fff", borderRadius: "16px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.05)"
      }}>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <div style={{ width: "80px", height: "80px", margin: "0 auto 15px", position: "relative" }}>
            <div style={{ 
              width: "100%", height: "100%", borderRadius: "50%", 
              background: "linear-gradient(135deg, var(--green), var(--blue))",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontSize: "32px"
            }}>
              <i className="fas fa-shield-alt"></i>
            </div>
          </div>
          <h1 style={{ fontSize: "24px", color: "var(--primary-dark)", margin: "0 0 5px" }}>Tizimga kirish</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px", margin: 0 }}>
            Faqat ma'murlar uchun
          </p>
        </div>

        {error && (
          <div style={{ 
            padding: "12px 15px", backgroundColor: "#FEE2E2", color: "#EF4444", 
            borderRadius: "8px", fontSize: "14px", marginBottom: "20px",
            display: "flex", alignItems: "center", gap: "10px"
          }}>
            <i className="fas fa-exclamation-circle"></i>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: 600, color: "var(--primary-dark)" }}>
              Login
            </label>
            <input 
              type="text" 
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              style={{ 
                width: "100%", padding: "12px 15px", borderRadius: "8px", 
                border: "1px solid var(--border-color)", fontSize: "15px",
                outline: "none", transition: "border-color 0.3s"
              }}
              placeholder="admin"
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: 600, color: "var(--primary-dark)" }}>
              Parol
            </label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{ 
                width: "100%", padding: "12px 15px", borderRadius: "8px", 
                border: "1px solid var(--border-color)", fontSize: "15px",
                outline: "none", transition: "border-color 0.3s"
              }}
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit" 
            disabled={isLoading}
            style={{ 
              width: "100%", padding: "14px", borderRadius: "8px",
              backgroundColor: "var(--blue)", color: "#fff",
              border: "none", fontSize: "16px", fontWeight: 600,
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.7 : 1,
              marginTop: "10px", transition: "all 0.3s"
            }}
          >
            {isLoading ? "Kirilmoqda..." : "Kirish"}
          </button>
        </form>
      </div>
    </div>
  );
}
