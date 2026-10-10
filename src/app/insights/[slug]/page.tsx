import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InsightsShell } from "@/components/insights-shell";
import { StructuredData } from "@/components/structured-data";
import { getInsight, getPublishedInsights, readingMinutes } from "@/lib/insights";
import { siteUrl } from "@/lib/site-config";
import styles from "@/components/service-page.module.css";

export const dynamicParams = false;
export function generateStaticParams() {
  return getPublishedInsights().map(article => ({ slug: article.slug }));
}
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getInsight((await params).slug);
  if (!article) notFound();
  const url = `/insights/${article.slug}`;
  const title = `${article.title} — DelighTech`;
  return {
    title, description: article.description, alternates: { canonical: url },
    openGraph: { title, description: article.description, url, type: "article", publishedTime: article.publishedAt!, modifiedTime: article.updatedAt || article.publishedAt!, images: ["/opengraph-image"] },
    twitter: { card: "summary_large_image", title, description: article.description, images: ["/opengraph-image"] },
  };
}

export default async function InsightPage({ params }: Props) {
  const article = getInsight((await params).slug);
  if (!article) notFound();
  const url = new URL(`/insights/${article.slug}`, siteUrl).href;
  return <InsightsShell>
    <StructuredData data={{ "@context": "https://schema.org", "@type": "Article", headline: article.title, description: article.description, mainEntityOfPage: url, inLanguage: "en", datePublished: article.publishedAt, dateModified: article.updatedAt || article.publishedAt, author: { "@type": "Organization", name: article.author, url: siteUrl.href }, publisher: { "@id": new URL("/#organization", siteUrl).href } }} />
    <StructuredData data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "DelighTech", item: siteUrl.href }, { "@type": "ListItem", position: 2, name: "Insights", item: new URL("/insights", siteUrl).href }, { "@type": "ListItem", position: 3, name: article.title, item: url }] }} />
    <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">DelighTech</Link><span aria-hidden="true">/</span><Link href="/insights">Insights</Link><span aria-hidden="true">/</span><span aria-current="page">{article.title}</span></nav>
    <article>
      <header className={styles.hero}><span className={styles.eyebrow}>{article.category.toUpperCase()} / {readingMinutes(article)} MIN READ</span><h1>{article.title}</h1><p>{article.description}</p><span className={styles.eyebrow}>{article.author} · <time dateTime={article.publishedAt!}>{article.publishedAt}</time>{article.updatedAt && <> · Updated <time dateTime={article.updatedAt}>{article.updatedAt}</time></>}</span></header>
      <nav className={styles.boundary} aria-label="Article contents"><h2>In this article</h2><ul>{article.sections.map((section, index) => <li key={section.heading}><a className={styles.inlineLink} href={`#section-${index + 1}`}>{section.heading}</a></li>)}</ul></nav>
      {article.sections.map((section, index) => <section className={styles.split} id={`section-${index + 1}`} key={section.heading}><h2>{section.heading}</h2><div>{section.paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}{section.points && <ul>{section.points.map(point => <li key={point}>{point}</li>)}</ul>}</div></section>)}
      {article.references && <section className={styles.section} aria-labelledby="references-title"><h2 id="references-title">Further reading</h2><ul>{article.references.map(reference => <li key={reference.href}><a className={styles.inlineLink} href={reference.href}>{reference.title}</a></li>)}</ul></section>}
    </article>
    <nav className={styles.related} aria-label="Related reading">{article.related.map(link => <Link key={link.href} href={link.href}>{link.title}</Link>)}</nav>
    <section className={styles.close}><h2>Put the thinking into practice.</h2><p>Discuss your project with the DelighTech team.</p><div className={styles.actions}><a className={styles.primary} href="https://calendly.com/hello-delightech/30min" target="_blank" rel="noopener noreferrer">Book a discovery call ↗</a><Link href="/insights">All insights</Link></div></section>
  </InsightsShell>;
}
