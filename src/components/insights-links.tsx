import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getPublishedInsights } from "@/lib/insights";
import styles from "./service-page.module.css";

export function InsightsLinks({ relatedTo }: { relatedTo?: string }) {
  const articles = getPublishedInsights().filter(article => !relatedTo || article.related.some(link => link.href === relatedTo)).slice(0, 3);
  if (!articles.length) return null;
  return <section id={relatedTo ? undefined : "studio-insights"} className={`${styles.section} ${styles.insights}`} aria-label="Practical studio insights">
    <span className={styles.eyebrow}>INSIGHTS / BEFORE YOU BUILD</span>
    <h2>Start with a better-informed decision.</h2>
    <div className={styles.proof}>{articles.map(article => <article key={article.slug}><h3><Link href={`/insights/${article.slug}`}>{article.title} <ArrowUpRight size={18} aria-hidden="true" /></Link></h3><p>{article.description}</p></article>)}</div>
    <Link className={styles.inlineLink} href="/insights">Explore all studio insights <ArrowUpRight size={16} aria-hidden="true" /></Link>
  </section>;
}
