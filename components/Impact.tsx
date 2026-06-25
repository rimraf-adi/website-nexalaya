import AnimateOnScroll from "./AnimateOnScroll";

const stats = [
  { before: "10 min", after: "10 sec", label: "per class attendance" },
  { before: "Undetectable", after: "0 proxies pass", label: "liveness detection, every mark" },
  { before: "Discovered late", after: "Real-time alerts", label: "for at-risk students" },
  { before: "Manual reports", after: "Auto-generated", label: "NAAC-ready documentation" },
];

const naac = [
  {
    code: "2",
    label: "Teaching-Learning & Evaluation",
    desc: "Deliver tamper-proof, location-verified attendance logs that mathematically validate your continuous internal assessments and eliminate proxy fraud.",
  },
  {
    code: "5",
    label: "Student Support & Progression",
    desc: "Deploy an automated early-warning system that instantly alerts faculty mentors when at-risk students miss consecutive lectures.",
  },
  {
    code: "6",
    label: "E-Governance & Leadership",
    desc: "Arm your IQAC team with one-click, flawless E-Governance data exports, saving administration weeks of manual calculation.",
  },
  {
    code: "7",
    label: "Institutional Values & Practices",
    desc: "Slash your institutional carbon footprint by going 100% paperless, and claim 'Decentralized IoT Monitoring' as your official NAAC Best Practice.",
  },
];

export default function Impact() {
  return (
    <section id="impact" style={{ padding: "80px 0" }}>
      <div className="container">
        {/* Header */}
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
              The Impact
            </p>
            <h2
              style={{
                fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "#111827",
              }}
            >
              Why 10 seconds{" "}
              <span style={{ color: "#2F54FF" }}>changes everything</span>
            </h2>
            <p
              style={{
                marginTop: 12,
                fontSize: "0.95rem",
                color: "#6B7280",
                lineHeight: 1.7,
              }}
            >
              The numbers your administration will present to management —
              and the compliance your IQAC team has been waiting for.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Before / After grid */}
        <div className="stats-grid">
          {stats.map((s, i) => (
            <AnimateOnScroll key={s.label} delay={i * 100}>
              <div className="stat-card">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 12 }}>
                  <div>
                    <span style={{ fontSize: "0.65rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#9CA3AF" }}>Before</span>
                    <div style={{ fontSize: "0.85rem", fontWeight: 500, color: "#9CA3AF", textDecoration: "line-through" }}>{s.before}</div>
                  </div>
                  <span style={{ color: "#D1D5DB", fontSize: "1rem" }}>→</span>
                  <div>
                    <span style={{ fontSize: "0.65rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#2F54FF" }}>After</span>
                    <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#2F54FF" }}>{s.after}</div>
                  </div>
                </div>
                <div style={{ fontSize: "0.83rem", fontWeight: 600, color: "#475569", lineHeight: 1.4 }}>{s.label}</div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        {/* NAAC Callout */}
        <AnimateOnScroll>
          <div
            style={{
              marginTop: 56,
              background: "#fff",
              border: "1px solid #E5E7EB",
              borderRadius: 24,
              padding: "48px 40px",
              boxShadow: "0 4px 30px rgba(0,0,0,.02)",
            }}
          >
            <div style={{ marginBottom: 36 }}>
              <span
                style={{
                  display: "inline-block",
                  background: "#F0F3FF",
                  color: "#2F54FF",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  padding: "4px 12px",
                  borderRadius: 999,
                  marginBottom: 12,
                }}
              >
                NAAC 2.0
              </span>
              <h3 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#111827", letterSpacing: "-0.02em" }}>
                Built to fulfil NAAC criteria — out of the box
              </h3>
              <p style={{ marginTop: 8, fontSize: "0.92rem", color: "#6B7280", lineHeight: 1.6, maxWidth: 620 }}>
                nexalaya automatically generates the attendance data, reports, and
                audit trails your IQAC team needs for the following criteria:
              </p>
            </div>

            <div className="naac-grid">
              {naac.map((n) => (
                <div key={n.code} className="naac-card">
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <span className="naac-badge">
                      {n.code}
                    </span>
                    <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "#111827", letterSpacing: "-0.015em" }}>
                      {n.label}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.85rem", color: "#6B7280", lineHeight: 1.6, margin: 0 }}>
                    {n.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </AnimateOnScroll>
      </div>

      <style>{`
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .stat-card {
          background: #ffffff;
          border: 1px solid #E5E7EB;
          border-radius: 20px;
          padding: 28px 20px;
          text-align: center;
          transition: transform 0.22s, box-shadow 0.22s;
          height: 100%;
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.04);
        }

        .naac-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .naac-card {
          background: #FCFDFE;
          border: 1px solid #E5E7EB;
          border-radius: 18px;
          padding: 24px;
          transition: transform 0.22s, box-shadow 0.22s;
        }

        .naac-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.03);
        }

        .naac-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #F0F3FF;
          color: #2F54FF;
          font-weight: 700;
          font-size: 0.72rem;
          flex-shrink: 0;
        }

        @media (max-width: 991px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
          .naac-grid {
            gap: 16px;
          }
        }

        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
          .naac-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
