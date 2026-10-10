import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/case-studies";
import { siteUrl } from "@/lib/site-config";
import { serviceOffers } from "@/lib/services";
import { getPublishedInsights } from "@/lib/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getPublishedInsights();
  return [
    "/",
    "/privacy",
    ...Object.values(caseStudies).map(({ slug }) => `/work/${slug}`),
    ...serviceOffers.map(({ slug }) => `/services/${slug}`),
    ...(articles.length ? ["/insights", ...articles.map(article => `/insights/${article.slug}`)] : []),
  ].map((path) => {
    const article = articles.find(entry => path === `/insights/${entry.slug}`);
    return { url: new URL(path, siteUrl).href, ...(article ? { lastModified: article.updatedAt || article.publishedAt! } : {}) };
  });
}
