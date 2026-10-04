import type { Metadata, Viewport } from "next";
import {
  DM_Mono,
  DM_Sans,
  Instrument_Serif,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";
import "./refinements.css";
import { indexingEnabled, siteUrl } from "@/lib/site-config";
import { AnalyticsPreferences } from "@/components/analytics-preferences";

const display = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const body = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const mono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  preload: false,
  variable: "--font-mono",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "DelighTech — Web & Mobile Software Studio | Olaoluwa, CEO",
  description:
    "Hire DelighTech for business websites, web applications, mobile apps, and ongoing product improvements. Meet Olaoluwa, CEO, and explore the studio’s work.",
  metadataBase: siteUrl,
  robots: { index: indexingEnabled, follow: indexingEnabled },
  authors: [{ name: "Olaoluwa Moshood", url: "https://github.com/myolaoluwa" }],
  creator: "DelighTech",
  keywords: [
    "software studio",
    "DelighTech",
    "web application development",
    "mobile app development",
    "web design",
    "mobile product",
    "Next.js",
    "Capacitor",
    "Nigeria",
  ],
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
    title: "DelighTech — Web & Mobile Software Studio",
    description:
      "Business websites, web applications, mobile apps, and product improvements from the DelighTech team, led by Olaoluwa, CEO.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "DelighTech software studio — led by Olaoluwa Moshood, CEO.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DelighTech — Web & Mobile Software Studio",
    description:
      "Business websites, web applications, mobile apps, and product improvements from the DelighTech team, led by Olaoluwa, CEO.",
    images: ["/opengraph-image"],
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#18211d",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} ${serif.variable}`}
    >
      <body>{children}<AnalyticsPreferences /></body>
    </html>
  );
}
