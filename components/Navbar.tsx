import styles from "./Navbar.module.css";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>
            <span className={styles.logoN}>n</span>exalaya
          </span>
        </Link>

        {/* Links */}
        <ul className={styles.links}>
          <li><a href="#about" className={styles.link}>Home</a></li>
          <li><a href="#how-it-works" className={styles.link}>How it works</a></li>
          <li><a href="#features" className={styles.link}>Features</a></li>
          <li><a href="#impact" className={styles.link}>Impact</a></li>
        </ul>

        {/* CTA */}
        <a href="#notify" className={styles.ctaBtn}>
          Book a Campus Demo
        </a>
      </nav>
    </header>
  );
}
