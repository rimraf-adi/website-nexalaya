import styles from "./HowItWorks.module.css";

const steps = [
  {
    step: "01",
    title: "Professor taps \"Start Attendance\"",
    description:
      "One tap on the nexalaya app activates the IoT module — no internet, no delay.",
    image: "/images/step1.png",
  },
  {
    step: "02",
    title: "Face scan appears only in-range",
    description:
      "The facial recognition prompt appears only for students physically inside the classroom.",
    image: "/images/step2.png",
  },
  {
    step: "03",
    title: "Done in 10 seconds. Synced everywhere.",
    description:
      "Every verified face is marked instantly. Reports are generated automatically — zero paperwork.",
    image: "/images/step3.png",
  },
];

export default function HowItWorks() {
  return (
    <section className={styles.section} id="how-it-works">
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.eyebrow}>How It Works</span>
          <h2 className={styles.title}>
            Three taps<br />
            <span className={styles.accent}>Ten seconds</span>
          </h2>
          <p className={styles.subtitle}>
            No complex setup. No dedicated hardware room. The IoT module plugs
            directly into any classroom — and your entire college goes smart.
          </p>
        </div>

        {/* Steps */}
        <div className={styles.steps}>
          {steps.map((s, i) => (
            <div key={s.step} className={styles.stepCard}>
              {/* Image area */}
              <div className={styles.stepImageWrap}>
                <img
                  src={s.image}
                  alt={s.title}
                  className={styles.stepImage}
                  loading="lazy"
                />
              </div>

              {/* Text content */}
              <div className={styles.stepBody}>
                <div className={styles.stepNumberRow}>
                  <span className={styles.stepNumber}>{s.step}</span>
                  {i < steps.length - 1 && (
                    <div className={styles.connector} aria-hidden="true" />
                  )}
                </div>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepDesc}>{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
