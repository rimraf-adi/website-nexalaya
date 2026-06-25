"use client";

import AnimateOnScroll from "./AnimateOnScroll";

const features = [
  {
    icon: "⚡",
    title: "10-Second Attendance",
    description:
      "What takes 10 minutes manually now takes 10 seconds. Professor taps once — every student in the classroom is marked in real time.",
  },
  {
    icon: "🌐",
    title: "IoT Local Network",
    description:
      "A wireless module plugged into the classroom creates a secure local network. Face scan activates only within classroom range.",
  },
  {
    icon: "🧠",
    title: "Proxy-Proof Face Recognition",
    description:
      "AI-powered liveness detection ensures only the real, physically present student gets marked. Photos and spoofing attempts are rejected instantly.",
  },
  {
    icon: "🚨",
    title: "At-Risk Student Alerts",
    description:
      "When a student's attendance drops below threshold, professors and parents are notified automatically — reducing dropouts before they happen.",
  },
  {
    icon: "📊",
    title: "Real-Time Administration Dashboard",
    description:
      "College administration gets a live, bird's-eye view of attendance across every department, batch, and classroom — all from one dashboard.",
  },
  {
    icon: "🎓",
    title: "NAAC Criteria 2, 5, 6, 7 Ready",
    description:
      "Built to support Teaching-Learning (2), Student Support (5), Governance (6), and Institutional Values (7) — making NAAC documentation effortless.",
  },
];

export default function Features() {
  return (
    <section id="features" style={{ padding: "80px 0" }}>
      <div className="container">
        <AnimateOnScroll>
          <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 48px" }}>
            <p
              style={{
                fontSize: "0.8125rem",
                fontWeight: 600,
                color: "#2F54FF",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: 8,
              }}
            >
              Why <span style={{ fontWeight: 700 }}>nexalaya</span>
            </p>
            <h2
              style={{
                fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "#111827",
              }}
            >
              One system.{" "}
              <span style={{ color: "#2F54FF" }}>Every advantage.</span>
            </h2>
            <p
              style={{
                marginTop: 12,
                fontSize: "0.95rem",
                color: "#6B7280",
                lineHeight: 1.7,
              }}
            >
              Designed around how Indian colleges actually work —{" "}
              <strong style={{ color: "#374151" }}>not a generic SaaS</strong> bolted
              onto your campus, but a{" "}
              <strong style={{ color: "#374151" }}>purpose-built solution for your exact pain points</strong>.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Features Uniform Grid */}
        <div className="features-grid">
          {features.map((f, i) => (
            <AnimateOnScroll key={f.title} delay={i * 80}>
              <div className="feature-card">
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: "#F0F3FF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.25rem",
                    flexShrink: 0,
                  }}
                >
                  {f.icon}
                </div>
                <h3
                  style={{
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    color: "#111827",
                    marginTop: 18,
                    marginBottom: 8,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "#6B7280",
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {f.description}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>

      <style>{`
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .feature-card {
          background: #ffffff;
          border: 1px solid #E5E7EB;
          border-radius: 24px;
          padding: 32px;
          transition: box-shadow 0.25s, transform 0.25s;
          cursor: default;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .feature-card:hover {
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
          transform: translateY(-2px);
        }

        @media (max-width: 991px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
        }

        @media (max-width: 768px) {
          .features-grid {
            grid-template-columns: 1fr !important;
            gap: 16px;
          }
          .feature-card {
            padding: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
