import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: "UK Policy Explainer",
  description:
    "A beginner-friendly UK politics starter for finding your MP, learning Parliament terms, and checking public sources."
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
