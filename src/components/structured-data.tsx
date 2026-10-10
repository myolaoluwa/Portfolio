import { siteUrl } from "@/lib/site-config";

export function StructuredData({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function OrganizationData() {
  return <StructuredData data={{ "@context": "https://schema.org", "@type": "Organization", "@id": new URL("/#organization", siteUrl).href, name: "DelighTech", url: siteUrl.href, logo: new URL("/delightech-logo.png", siteUrl).href, email: "hello@delightech.net", description: "DelighTech designs and builds websites, web applications, and mobile apps for businesses." }} />;
}

export function BreadcrumbData({ name, path }: { name: string; path: string }) {
  return <StructuredData data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "DelighTech", item: siteUrl.href },
    { "@type": "ListItem", position: 2, name, item: new URL(path, siteUrl).href },
  ] }} />;
}
