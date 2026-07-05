import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Atkinson_Hyperlegible_Next, IBM_Plex_Mono, Literata } from "next/font/google";
import type { ReactNode } from "react";
import { Suspense } from "react";
import { AnalyticsConsentBanner } from "@/components/analytics-consent-banner";
import { GoogleAnalytics } from "@/components/google-analytics";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StructuredData } from "@/components/structured-data";
import { buildSiteIdentityJsonLd, createMetadata, getRouteMetadata, SITE_URL } from "@/lib/seo";
import "./globals.css";

const fontSans = Atkinson_Hyperlegible_Next({
  // Next has no fallback-metrics entry for this face yet; disable adjustment to
  // avoid a build warning per page and declare the fallback stack explicitly.
  adjustFontFallback: false,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
  subsets: ["latin"],
  variable: "--font-atkinson"
});

const fontSerif = Literata({
  subsets: ["latin"],
  variable: "--font-literata",
  weight: ["400", "600"]
});

const fontMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["400", "600"]
});

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
    <html
      className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable}`}
      lang="en-GB"
    >
      <body>
        <StructuredData data={buildSiteIdentityJsonLd()} />
        <a
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-[var(--paper-on-ink)] focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-[var(--ink-bg)]"
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
