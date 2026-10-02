import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DelighTech | Web & App Development",
  description:
    "DelighTech builds thoughtful web and mobile products. Led by CEO Olaoluwa Moshood.",
  metadataBase: new URL("https://delightech.net"),
  icons: {
    icon: "/delightech-mark.svg",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "DelighTech",
    title: "DelighTech | Thoughtful software, built for real life",
    description:
      "Product-minded web and app development by DelighTech CEO Olaoluwa Moshood. From market intelligence to tools for work and everyday life.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "DelighTech: thoughtful software for web, mobile, and everyday life.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DelighTech | Thoughtful software, built for real life",
    description:
      "Product-minded web and app development by DelighTech CEO Olaoluwa Moshood. From market intelligence to tools for work and everyday life.",
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
