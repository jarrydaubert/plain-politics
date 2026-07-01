import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: "UK Policy Explainer",
  description:
    "A source-backed UK politics information tracker for parties, policies, polling, votes and donations."
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en-GB">
      <body>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
