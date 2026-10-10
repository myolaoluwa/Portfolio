import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./service-page.module.css";

export function InsightsShell({ children }: { children: ReactNode }) {
  return <div className={styles.page}>
    <a className={styles.skip} href="#insights-main">Skip to insights</a>
    <header className={styles.header}>
      <Link className={styles.brand} href="/">DelighTech</Link>
      <Link href="/#services">Explore our services</Link>
    </header>
    <main id="insights-main" className={styles.main}>{children}</main>
    <footer className={styles.footer}>
      <span>© 2026 DelighTech</span><Link href="/insights">Insights</Link><Link href="/privacy">Privacy notice</Link>
    </footer>
  </div>;
}
