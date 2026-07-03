import Link from "next/link";
import { AnalyticsSettingsButton } from "@/components/analytics-settings-button";
import { DataStatusBadge } from "@/components/data-status-badge";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/sources", label: "Sources" },
  { href: "/glossary", label: "Glossary" },
  { href: "mailto:info@plainpolitics.co.uk", label: "info@plainpolitics.co.uk" }
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-lg font-semibold">Plain Politics</p>
          <p className="mt-2 max-w-md text-sm leading-6 text-[var(--muted)]">
            UK politics, made easier to follow. Not affiliated with any political party, Parliament,
            government department or election authority.
          </p>
        </div>

        <div className="grid gap-4">
          <nav className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium">
            {footerLinks.map((item) =>
              item.href.startsWith("mailto:") ? (
                <a
                  className="text-[var(--accent)] hover:text-[var(--accent-strong)]"
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  className="text-[var(--accent)] hover:text-[var(--accent-strong)]"
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </Link>
              )
            )}
            <AnalyticsSettingsButton />
          </nav>
          <div>
            <DataStatusBadge />
          </div>

          <p className="max-w-3xl text-xs leading-5 text-[var(--muted)]">
            Uses public data from UK Parliament APIs and postcodes.io/ONS where displayed.
            Parliament data is available under the{" "}
            <a
              className="font-medium text-[var(--accent)] hover:text-[var(--accent-strong)]"
              href="https://www.parliament.uk/site-information/copyright-parliament/open-parliament-licence/"
              rel="noreferrer"
              target="_blank"
            >
              Open Parliament Licence
            </a>
            ; postcode and ONS boundary data under the{" "}
            <a
              className="font-medium text-[var(--accent)] hover:text-[var(--accent-strong)]"
              href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/"
              rel="noreferrer"
              target="_blank"
            >
              Open Government Licence
            </a>{" "}
            where applicable.
          </p>
        </div>
      </div>
    </footer>
  );
}
