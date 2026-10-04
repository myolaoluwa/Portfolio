import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/case-studies";
import { siteUrl } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "/",
    "/privacy",
    ...Object.values(caseStudies).map(({ slug }) => `/work/${slug}`),
  ].map((path) => ({ url: new URL(path, siteUrl).href }));
}
