import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/case-studies";
import { siteUrl } from "@/lib/site-config";
import { serviceOffers } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "/",
    "/privacy",
    ...Object.values(caseStudies).map(({ slug }) => `/work/${slug}`),
    ...serviceOffers.map(({ slug }) => `/services/${slug}`),
  ].map((path) => ({ url: new URL(path, siteUrl).href }));
}
