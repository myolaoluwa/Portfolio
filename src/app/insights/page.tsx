import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { InsightsShell } from "@/components/insights-shell";
import { BreadcrumbData } from "@/components/structured-data";
import { getPublishedInsights, readingMinutes } from "@/lib/insights";
import { indexingEnabled } from "@/lib/site-config";
import styles from "@/components/service-page.module.css";

const articles = getPublishedInsights();
const title = "Insights — Software & Product Decisions | DelighTech";
const description = "Practical perspectives on planning websites, web applications and mobile products, from the DelighTech studio.";
export const metadata: Metadata = {
  title, description, alternates: { canonical: "/insights" },
  robots: { index: indexingEnabled && articles.length > 0, follow: indexingEnabled },
  openGraph: { title, description, url: "/insights", type: "website", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
};

export default function InsightsPage() {
  return <InsightsShell>
    <BreadcrumbData name="Insights" path="/insights" />
    <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">DelighTech</Link><span aria-hidden="true">/</span><span aria-current="page">Insights</span></nav>
    <section className={styles.hero} aria-labelledby="insights-title">
      <span className={styles.eyebrow}>DELIGHTECH / STUDIO NOTES</span>
      <h1 id="insights-title">Better decisions.<br />More useful software.</h1>
      <p>Practical perspectives on what to build, how to scope it, and what to consider before bringing a digital product to life.</p>
    </section>
    <section className={styles.section} aria-labelledby="articles-title">
      <h2 id="articles-title">From the studio.</h2>
      {articles.length ? <div className={styles.proof}>{articles.map(article => <article key={article.slug}>
        <span className={styles.eyebrow}>{article.category} / {readingMinutes(article)} MIN READ</span>
        <h3><Link href={`/insights/${article.slug}`}>{article.title} <ArrowUpRight size={18} aria-hidden="true" /></Link></h3>
        <p>{article.description}</p>
        <span className={styles.eyebrow}>{article.author} · <time dateTime={article.publishedAt!}>{article.publishedAt}</time></span>
      </article>)}</div> : <div className={styles.boundary}>
        <h3>Our first studio notes are on the way.</h3>
        <p>We’re preparing practical articles grounded in our work. In the meantime, explore the decisions behind our products and the services we offer.</p>
        <Link className={styles.inlineLink} href="/work/elara">Explore the Elara case study <ArrowRight size={16} aria-hidden="true" /></Link>
      </div>}
    </section>
    <section className={styles.close} aria-labelledby="insights-next-title">
      <span className={styles.eyebrow}>START WITH YOUR QUESTION</span><h2 id="insights-next-title">Working through a product decision?</h2>
      <p>Bring your goal, workflow and constraints. Let’s discuss what a useful next step could look like.</p>
      <div className={styles.actions}><a className={styles.primary} href="https://calendly.com/hello-delightech/30min" target="_blank" rel="noopener noreferrer">Book a discovery call <ArrowUpRight size={17} aria-hidden="true" /></a><Link href="/services/web-applications">Web application development <ArrowRight size={17} aria-hidden="true" /></Link></div>
    </section>
  </InsightsShell>;
}
