import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DelighTech | Web & App Development by Myolaoluwa",
  description:
    "DelighTech builds thoughtful web and mobile apps, product experiences, and software for work, markets, and everyday life.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
