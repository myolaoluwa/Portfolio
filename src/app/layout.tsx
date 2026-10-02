import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DelighTech | Web & App Development by Myolaoluwa",
  description:
    "DelighTech builds thoughtful web and mobile apps, product experiences, and software for work, markets, and everyday life.",
  metadataBase: new URL("https://portfolio-three-beta-l9pbmwprkk.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "DelighTech",
    title: "DelighTech | Thoughtful software, built for real life",
    description:
      "Product-minded web and app development by Myolaoluwa. From market intelligence to tools for work and everyday life.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "DelighTech by Myolaoluwa: thoughtful software for web, mobile, and everyday life.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DelighTech | Thoughtful software, built for real life",
    description:
      "Product-minded web and app development by Myolaoluwa. From market intelligence to tools for work and everyday life.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
