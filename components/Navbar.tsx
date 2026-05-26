"use client";

import { useState } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>
            <span className={styles.logoN}>n</span>exalaya
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className={styles.links}>
          <li><a href="#about" className={styles.link}>Home</a></li>
          <li><a href="#how-it-works" className={styles.link}>How it works</a></li>
          <li><a href="#features" className={styles.link}>Features</a></li>
          <li><a href="#impact" className={styles.link}>Impact</a></li>
        </ul>

        {/* Desktop CTA */}
        <a href="#notify" className={styles.ctaBtn}>
          Book a Campus Demo
        </a>

        {/* Mobile hamburger */}
        <button
          className={`${styles.burger} ${open ? styles.burgerOpen : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`${styles.drawer} ${open ? styles.drawerOpen : ""}`}>
        <a href="#about" className={styles.drawerLink} onClick={close}>Home</a>
        <a href="#how-it-works" className={styles.drawerLink} onClick={close}>How it works</a>
        <a href="#features" className={styles.drawerLink} onClick={close}>Features</a>
        <a href="#impact" className={styles.drawerLink} onClick={close}>Impact</a>
        <a href="#notify" className={styles.drawerCta} onClick={close}>
          Book a Campus Demo
        </a>
      </div>
    </header>
  );
}
