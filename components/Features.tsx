import styles from "./Features.module.css";

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
    <section className={styles.section} id="features">
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.eyebrow}>
            Why{" "}
            <span className={styles.eyebrowBrand}>nexalaya</span>
          </span>
          <h2 className={styles.title}>
            One system<br />
            <span className={styles.accent}>Every advantage</span>
          </h2>
          <p className={styles.subtitle}>
            Designed around how Indian colleges actually work —{" "}
            <span className={styles.subtitleHighlight}>not a generic SaaS</span>{" "}
            bolted onto your campus, but a{" "}
            <span className={styles.subtitleHighlight}>purpose-built solution for your exact pain points</span>.
          </p>
        </div>

        {/* Grid */}
        <div className={styles.grid}>
          {features.map((f) => (
            <div key={f.title} className={styles.card}>
              <div className={styles.iconBox}>{f.icon}</div>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <p className={styles.cardDesc}>{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
