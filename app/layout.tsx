import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Suspense } from "react";
import { AnalyticsConsentBanner } from "@/components/analytics-consent-banner";
import { GoogleAnalytics } from "@/components/google-analytics";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StructuredData } from "@/components/structured-data";
import "./globals.css";

const siteUrl = "https://plainpolitics.co.uk";
const siteDescription =
  "A beginner-friendly UK politics starter for finding your MP, learning Parliament terms, and checking public sources.";

const websiteJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    description: siteDescription,
    inLanguage: "en-GB",
    name: "Plain Politics",
    publisher: {
      "@type": "Organization",
      name: "Plain Politics",
      url: siteUrl
    },
    url: siteUrl
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Plain Politics",
    url: siteUrl
  }
];

export const metadata: Metadata = {
  title: "Plain Politics",
  description: siteDescription,
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" }
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }]
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    description: siteDescription,
    images: [
      {
        alt: "Plain Politics - British politics, without the fog",
        height: 630,
        url: "/og-image.png",
        width: 1200
      }
    ],
    locale: "en_GB",
    siteName: "Plain Politics",
    title: "Plain Politics",
    type: "website",
    url: "/"
  },
  twitter: {
    card: "summary_large_image",
    description: siteDescription,
    images: ["/og-image.png"],
    title: "Plain Politics"
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const analyticsEnabled = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS !== "false";

  return (
    <html lang="en-GB">
      <body>
        <StructuredData data={websiteJsonLd} />
        {analyticsEnabled ? <VercelAnalytics /> : null}
        <Suspense fallback={null}>{analyticsEnabled ? <GoogleAnalytics /> : null}</Suspense>
        <SiteHeader />
        {children}
        <SiteFooter />
        <AnalyticsConsentBanner />
      </body>
    </html>
  );
}
