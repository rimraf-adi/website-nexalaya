"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [show, setShow] = useState(false);
  useEffect(() => setShow(true), []);

  return (
    <section id="about" style={{ paddingTop: 120, paddingBottom: 80, overflow: "hidden" }}>
      <div
        className="container"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}
      >
        {/* Left column */}
        <div
          style={{
            opacity: show ? 1 : 0,
            transform: show ? "none" : "translateY(20px)",
            transition: "all .6s cubic-bezier(.16,1,.3,1)",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#F0F3FF",
              border: "1px solid #C7D5FF",
              borderRadius: 999,
              padding: "6px 14px",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "#2F54FF",
              marginBottom: 24,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#2F54FF" }} />
            Prototype stage · Launching soon
          </div>

          <h1
            style={{
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontWeight: 700,
              lineHeight: 1.12,
              letterSpacing: "-0.03em",
              color: "#111827",
            }}
          >
            Attendance in <span style={{ color: "#2F54FF" }}>10</span> Seconds
            <br />
            <span style={{ color: "#2F54FF" }}>Automated.</span>
            <br />
            <span style={{ color: "#2F54FF" }}>Zero Paperwork.</span>
          </h1>

          <p
            style={{
              marginTop: 20,
              fontSize: "0.95rem",
              lineHeight: 1.7,
              color: "#6B7280",
              maxWidth: 420,
            }}
          >
            Reduce faculty workload, eliminate proxy attendance, and manage
            every classroom in real time in just a click
          </p>

          {/* CTA row */}
          <div style={{ marginTop: 28, display: "flex", gap: 12, alignItems: "center" }}>
            <a
              href="#notify"
              id="hero-demo-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#2F54FF",
                color: "#fff",
                fontSize: "0.875rem",
                fontWeight: 600,
                padding: "0.65rem 1.5rem",
                borderRadius: 999,
              }}
            >
              Book a Campus Demo
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="#how-it-works"
              id="hero-learn-btn"
              style={{
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "#2F54FF",
                padding: "0.65rem 1rem",
              }}
            >
              See how it works
            </a>
          </div>
        </div>

        {/* Right column — Phone mockup */}
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 520,
            opacity: show ? 1 : 0,
            transform: show ? "none" : "translateY(30px)",
            transition: "all .7s .15s cubic-bezier(.16,1,.3,1)",
          }}
        >
          {/* Blue glow behind phone */}
          <div
            style={{
              position: "absolute",
              width: 300,
              height: 380,
              background: "linear-gradient(135deg, #2F54FF, #3B82F6)",
              borderRadius: 32,
              transform: "rotate(6deg)",
              top: "8%",
              right: "8%",
              zIndex: 0,
            }}
          />

          {/* Main phone */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              width: 240,
              aspectRatio: "9/20",
              border: "6px solid #1F2937",
              borderRadius: 36,
              overflow: "hidden",
              background: "#000",
              boxShadow: "0 25px 60px rgba(0,0,0,.18)",
            }}
          >
            <img
              src="/ux/WhatsApp Image 2026-06-24 at 21.26.11.jpeg"
              alt="Professor Dashboard"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about .container { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
