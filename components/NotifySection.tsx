"use client";

import { useState } from "react";
import styles from "./NotifySection.module.css";

export default function NotifySection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <section className={styles.section} id="notify">
      <div className="container">
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
                <input
                  id="notify-email"
                  type="email"
                  placeholder="Enter your college email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={styles.input}
                />
                <button type="submit" className={styles.btn} id="notify-submit-btn">
                  Book a Demo
                </button>
              </form>
            ) : (
              <div className={styles.success} id="notify-success">
                <span>✅</span>
                <span>We&apos;ll reach out to schedule your campus demo soon.</span>
              </div>
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
      </div>
    </section>
  );
}
