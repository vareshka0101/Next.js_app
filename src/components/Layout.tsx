"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <nav
        style={{
          backgroundColor: "#8B0000",
          padding: "16px",
          borderBottom: "1px solid #660000",
          marginBottom: "20px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <Link
            href="/"
            style={{
              textDecoration: "none",
              color: "white",
              fontSize: "24px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            👑 Game of Thrones Characters
          </Link>

          <div
            style={{
              display: "flex",
              gap: "24px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/characters"
              style={{
                textDecoration: "none",
                color: pathname === "/characters" ? "#FFD700" : "white",
                fontWeight: pathname === "/characters" ? "bold" : "normal",
                padding: "8px 16px",
                borderRadius: "6px",
                backgroundColor:
                  pathname === "/characters"
                    ? "rgba(255, 215, 0, 0.2)"
                    : "transparent",
                transition: "all 0.2s ease",
              }}
            >
              Characters
            </Link>
            <Link
              href="/create-character"
              style={{
                textDecoration: "none",
                color: pathname === "/create-character" ? "#FFD700" : "white",
                fontWeight:
                  pathname === "/create-character" ? "bold" : "normal",
                padding: "8px 16px",
                borderRadius: "6px",
                backgroundColor:
                  pathname === "/create-character"
                    ? "rgba(255, 215, 0, 0.2)"
                    : "transparent",
                transition: "all 0.2s ease",
              }}
            >
              Create Character
            </Link>
          </div>
        </div>
      </nav>

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px" }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
