import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Suspense } from "react";
import { AnalyticsConsentBanner } from "@/components/analytics-consent-banner";
import { GoogleAnalytics } from "@/components/google-analytics";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StructuredData } from "@/components/structured-data";
import { buildSiteIdentityJsonLd, createMetadata, getRouteMetadata, SITE_URL } from "@/lib/seo";
import "./globals.css";

const homeMetadata = getRouteMetadata("/");

export const metadata: Metadata = {
  ...createMetadata(homeMetadata),
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" }
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }]
  },
  manifest: "/site.webmanifest"
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const analyticsEnabled = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS !== "false";

  return (
    <html lang="en-GB">
      <body>
        <StructuredData data={buildSiteIdentityJsonLd()} />
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
