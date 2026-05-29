"use client";

import { useState } from "react";
import styles from "./NotifySection.module.css";
import AnimateOnScroll from "./AnimateOnScroll";

export default function NotifySection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      if (!res.ok) {
        throw new Error("Failed to send request");
      }

      setSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className={styles.section} id="notify">
      <div className="container">
        <AnimateOnScroll>
          <div className={styles.card}>
            {/* Decoration */}
            <div className={styles.blob} aria-hidden="true" />

            <div className={styles.content}>
              <span className={styles.eyebrow}>Launching Soon</span>
              <h2 className={styles.title}>
                Bring <span className={styles.brandN}>n</span>exalaya<br />
                to your campus
              </h2>
              <p className={styles.subtitle}>
                Book a live demo for your institution or join the waitlist for
                early access. Be among the first campuses to go proxy-free.
              </p>

              {!submitted ? (
                <form onSubmit={handleSubmit} className={styles.form} id="notify-form">
                  <div className={styles.inputRow}>
                    <input
                      id="notify-name"
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className={styles.input}
                    />
                    <input
                      id="notify-email"
                      type="email"
                      placeholder="Enter your college email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className={styles.input}
                    />
                  </div>
                  <button type="submit" className={styles.btn} id="notify-submit-btn" disabled={loading}>
                    {loading ? "Sending..." : "Book a Demo"}
                  </button>
                </form>
              ) : (
                <div className={styles.success} id="notify-success">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                  <span>We&apos;ve sent a confirmation to your email. We&apos;ll be in touch soon.</span>
                </div>
              )}

              {error && (
                <p style={{ color: "#ff8a8a", fontSize: "0.9rem", marginTop: "-0.5rem", marginBottom: "1rem" }}>
                  {error}
                </p>
              )}

              <p className={styles.note}>
                🔒 Your email is safe. We don&apos;t share data.
              </p>

              {/* Trust signals */}
              <div className={styles.trustRow}>
                <span className={styles.trustItem}>✦ NAAC Criteria 2, 5, 6, 7</span>
                <span className={styles.trustDot} />
                <span className={styles.trustItem}>✦ IoT-Powered Classrooms</span>
                <span className={styles.trustDot} />
                <span className={styles.trustItem}>✦ Zero Proxy Guarantee</span>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
