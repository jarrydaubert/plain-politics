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
        <a
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-[var(--accent)] focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
          href="#main-content"
        >
          Skip to content
        </a>
        {analyticsEnabled ? <VercelAnalytics /> : null}
        <Suspense fallback={null}>{analyticsEnabled ? <GoogleAnalytics /> : null}</Suspense>
        <SiteHeader />
        <div id="main-content">{children}</div>
        <SiteFooter />
        <AnalyticsConsentBanner />
      </body>
    </html>
  );
}
