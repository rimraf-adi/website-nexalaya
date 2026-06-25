"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: "rgba(250,250,250,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #E5E7EB",
      }}
    >
      <nav
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontWeight: 700, fontSize: "1.15rem", letterSpacing: "-0.02em", color: "#111827" }}>
            <span style={{ color: "#2F54FF" }}>n</span>exalaya
          </span>
        </Link>

        <ul
          style={{ display: "flex", gap: 32, listStyle: "none", margin: 0, padding: 0 }}
          className="hidden-mobile"
        >
          {[
            { label: "Home", href: "#about" },
            { label: "How it works", href: "#how-it-works" },
            { label: "Features", href: "#features" },
            { label: "Impact", href: "#impact" },
          ].map((l) => (
            <li key={l.label}>
              <a href={l.href} style={{ fontSize: "0.875rem", fontWeight: 500, color: "#6B7280" }}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <a
            href="#notify"
            className="navbar-cta-btn"
            style={{
              background: "#2F54FF",
              color: "#fff",
              fontSize: "0.8125rem",
              fontWeight: 600,
              padding: "0.5rem 1.25rem",
              borderRadius: 999,
              textDecoration: "none",
            }}
          >
            Book a Campus Demo
          </a>

          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="show-mobile"
            style={{ background: "none", border: "none", cursor: "pointer", display: "none" }}
          >
            <svg width="24" height="24" stroke="#111827" strokeWidth="2">
              {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div style={{ background: "#FAFAFA", borderBottom: "1px solid #E5E7EB", padding: "1rem 1.5rem 1.5rem" }}>
          {[
            { label: "Home", href: "#about" },
            { label: "How it works", href: "#how-it-works" },
            { label: "Features", href: "#features" },
            { label: "Impact", href: "#impact" },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={close}
              style={{ display: "block", padding: "0.75rem 0", fontWeight: 500, color: "#111827", borderBottom: "1px solid #E5E7EB" }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#notify"
            onClick={close}
            style={{ display: "inline-block", marginTop: "1rem", background: "#2F54FF", color: "#fff", fontWeight: 600, fontSize: "0.875rem", padding: "0.6rem 1.5rem", borderRadius: 999 }}
          >
            Book a Campus Demo
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (max-width: 480px) {
          .navbar-cta-btn {
            font-size: 0.75rem !important;
            padding: 0.4rem 0.85rem !important;
          }
        }
      `}</style>
    </header>
  );
}
