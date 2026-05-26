import styles from "./Impact.module.css";

const stats = [
  {
    before: "10 min",
    after: "10 sec",
    label: "per class attendance",
  },
  {
    before: "Undetectable",
    after: "0 proxies pass",
    label: "liveness detection, every mark",
  },
  {
    before: "Discovered late",
    after: "Real-time alerts",
    label: "for at-risk students",
  },
  {
    before: "Manual reports",
    after: "Auto-generated",
    label: "NAAC-ready documentation",
  },
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
    <section className={styles.section} id="impact">
      <div className="container">

        {/* Header */}
        <div className={styles.header}>
          <span className={styles.eyebrow}>The Impact</span>
          <h2 className={styles.title}>
            Why 10 seconds<br />
            <span className={styles.accent}>changes everything</span>
          </h2>
          <p className={styles.subtitle}>
            The numbers your administration will present to management —
            and the compliance your IQAC team has been waiting for.
          </p>
        </div>

        {/* Before / After grid */}
        <div className={styles.statsGrid}>
          {stats.map((s) => (
            <div key={s.label} className={styles.statCard}>
              <div className={styles.beforeAfterRow}>
                <div className={styles.beforeBlock}>
                  <span className={styles.beforeLabel}>Before</span>
                  <span className={styles.beforeValue}>{s.before}</span>
                </div>
                <div className={styles.arrow} aria-hidden="true">→</div>
                <div className={styles.afterBlock}>
                  <span className={styles.afterLabel}>After</span>
                  <span className={styles.afterValue}>{s.after}</span>
                </div>
              </div>
              <p className={styles.statDesc}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* NAAC Callout */}
        <div className={styles.naacBox}>
          <div className={styles.naacHeader}>
            <span className={styles.naacBadge}>NAAC 2.0</span>
            <h3 className={styles.naacTitle}>
              Built to fulfil NAAC criteria — out of the box
            </h3>
            <p className={styles.naacSub}>
              nexalaya automatically generates the attendance data, reports, and
              audit trails your IQAC team needs for the following criteria:
            </p>
          </div>
          <div className={styles.naacGrid}>
            {naac.map((n) => (
              <div key={n.code} className={styles.naacItem}>
                <span className={styles.naacCode}>Criterion {n.code}</span>
                <span className={styles.naacItemLabel}>{n.label}</span>
                <p className={styles.naacItemDesc}>{n.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
