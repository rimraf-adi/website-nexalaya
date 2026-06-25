"use client";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#FFFFFF",
        borderTop: "1px solid #E5E7EB",
        padding: "48px 0",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 32,
        }}
      >
        {/* Left — Brand */}
        <div style={{ display: "flex", flexDirection: "column", minWidth: 240 }}>
          <span style={{ fontWeight: 700, fontSize: "1.15rem", letterSpacing: "-0.02em", color: "#111827" }}>
            <span style={{ color: "#2F54FF" }}>n</span>exalaya
          </span>
          <p style={{ fontSize: "0.875rem", color: "#6B7280", marginTop: 8 }}>
            Where Campus Connects
          </p>
          <p style={{ fontSize: "0.8rem", color: "#9CA3AF", marginTop: 16 }}>
            © {new Date().getFullYear()} nexalaya. All rights reserved.
          </p>
        </div>

        {/* Right — Links */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <a
            href="mailto:hello@nexalaya.com"
            style={{
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "#6B7280",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#2F54FF")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
          >
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
}
