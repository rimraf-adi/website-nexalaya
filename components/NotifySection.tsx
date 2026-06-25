"use client";

import { useState } from "react";
import AnimateOnScroll from "./AnimateOnScroll";

export default function NotifySection() {
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !org) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, org }),
      });

      if (!res.ok) throw new Error("Failed to send request");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="notify" style={{ padding: "80px 0" }}>
      <div className="container" style={{ maxWidth: 720 }}>
        <AnimateOnScroll>
          <div
            style={{
              background: "#fff",
              border: "1px solid #E5E7EB",
              borderRadius: 24,
              padding: "48px 36px",
              boxShadow: "0 10px 30px rgba(0,0,0,.03)",
            }}
          >
            {/* Heading info */}
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#2F54FF",
                  display: "block",
                  marginBottom: 12,
                }}
              >
                Launching Soon
              </span>
              <h2
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                  fontWeight: 700,
                  color: "#111827",
                  letterSpacing: "-0.02em",
                }}
              >
                Bring <span style={{ color: "#2F54FF" }}>n</span>exalaya
                <br />
                to your campus
              </h2>
              <p
                style={{
                  marginTop: 12,
                  fontSize: "0.95rem",
                  color: "#6B7280",
                  lineHeight: 1.7,
                }}
              >
                Book a live demo for your institution or join the waitlist for
                early access. Be among the first campuses to go proxy-free.
              </p>
            </div>

            {/* Form wrapper */}
            <div style={{ maxWidth: 480, margin: "0 auto" }}>
              {!submitted ? (
                <form
                  onSubmit={handleSubmit}
                  id="notify-form"
                  style={{ display: "flex", flexDirection: "column", gap: 14 }}
                >
                  <input
                    id="notify-email"
                    type="email"
                    placeholder="College email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      border: "1px solid #E5E7EB",
                      borderRadius: 10,
                      fontSize: "0.875rem",
                      outline: "none",
                      background: "#fff",
                      color: "#111827",
                    }}
                  />
                  <input
                    id="notify-org"
                    type="text"
                    placeholder="College / Organisation"
                    value={org}
                    onChange={(e) => setOrg(e.target.value)}
                    required
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      border: "1px solid #E5E7EB",
                      borderRadius: 10,
                      fontSize: "0.875rem",
                      outline: "none",
                      background: "#fff",
                      color: "#111827",
                    }}
                  />
                  <button
                    type="submit"
                    id="notify-submit-btn"
                    disabled={loading}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      background: "#2F54FF",
                      color: "#fff",
                      border: "none",
                      borderRadius: 10,
                      fontWeight: 600,
                      fontSize: "0.875rem",
                      cursor: loading ? "not-allowed" : "pointer",
                      opacity: loading ? 0.7 : 1,
                    }}
                  >
                    {loading ? "Sending..." : "Book a Demo"}
                  </button>
                </form>
              ) : (
                <div
                  id="notify-success"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    justifyContent: "center",
                    padding: "20px 0",
                    color: "#059669",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  We&apos;ve sent a confirmation to your email. We&apos;ll be in touch soon.
                </div>
              )}

              {error && (
                <p style={{ color: "#DC2626", fontSize: "0.85rem", marginTop: 10, textAlign: "center" }}>
                  {error}
                </p>
              )}

              <p style={{ textAlign: "center", fontSize: "0.72rem", color: "#9CA3AF", marginTop: 20, fontWeight: 500 }}>
                🔒 Your email is safe. We don&apos;t share data.
              </p>

              {/* Trust signals */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 16,
                  marginTop: 20,
                  flexWrap: "wrap",
                }}
              >
                {["✦ NAAC Criteria 2, 5, 6, 7", "✦ Zero Paperwork", "✦ Zero Proxy Guarantee"].map((t) => (
                  <span key={t} style={{ fontSize: "0.7rem", fontWeight: 600, color: "#9CA3AF" }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
