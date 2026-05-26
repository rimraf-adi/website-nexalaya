import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        {/* Left — Brand */}
        <div className={styles.brand}>
          <div className={styles.logoRow}>
            <span className={styles.logoText}><span className={styles.logoN}>n</span>exalaya</span>
          </div>
          <p className={styles.tagline}>Where Campus Connects</p>
          <p className={styles.copy}>© {new Date().getFullYear()} nexalaya. All rights reserved.</p>
        </div>

        {/* Right — Links */}
        <div className={styles.links}>
          <a href="mailto:hello@nexalaya.com" className={styles.link}>Contact Us</a>
        </div>
      </div>
    </footer>
  );
}
