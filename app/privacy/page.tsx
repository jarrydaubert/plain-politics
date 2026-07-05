import { PageHeader } from "@/components/page-header";
import { StructuredData } from "@/components/structured-data";
import {
  buildBreadcrumbJsonLd,
  buildWebPageJsonLd,
  createMetadata,
  getRouteMetadata
} from "@/lib/seo";

const pageMetadata = getRouteMetadata("/privacy");

export const metadata = createMetadata(pageMetadata);

const privacySections = [
  {
    body: "Postcodes are used in your browser to ask postcodes.io for your Westminster constituency, then the UK Parliament Members API for the current MP. Plain Politics does not store postcode lookups on its own server.",
    title: "Postcode lookups"
  },
  {
    body: "Optional Google Analytics only loads after you choose to allow analytics. Vercel Web Analytics may provide broad, cookieless page-use measurements. Analytics must not include postcodes, raw searches, quiz answers or political opinion signals.",
    title: "Analytics"
  },
  {
    body: "When live public records are displayed, your browser or the app may request data from UK Parliament APIs and postcodes.io. Vercel hosts the site. Google receives analytics data only if analytics are allowed.",
    title: "Processors and public sources"
  },
  {
    body: "The site stores analytics preference in local storage. If Google Analytics is allowed, Google may set _ga cookies. Choosing Essential only turns analytics storage off and removes existing _ga cookies that the browser allows the site to clear.",
    title: "Cookies and local storage"
  },
  {
    body: "You can ask for privacy information or raise a correction request by emailing info@plainpolitics.co.uk. Plain Politics does not currently store accounts, quiz answers or political preference data.",
    title: "Rights and contact"
  }
];

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <StructuredData
        data={[
          buildWebPageJsonLd(pageMetadata),
          buildBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Privacy", path: "/privacy" }
          ])
        ]}
      />
      <PageHeader
        backHref="/"
        eyebrow="Your data"
        lede="Plain Politics is designed to avoid collecting sensitive political signals by default. The current site has no accounts, does not store postcode lookups, and keeps analytics optional."
        title="Privacy"
      />

      <div className="mt-8 grid gap-4">
        {privacySections.map((section) => (
          <section
            className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5"
            key={section.title}
          >
            <h2 className="font-serif text-xl font-semibold">{section.title}</h2>
            <p className="mt-3 leading-7 text-[var(--muted)]">{section.body}</p>
          </section>
        ))}
      </div>

      <section className="mt-8 rounded-lg border border-[var(--border)] bg-[var(--surface-soft)] p-5">
        <h2 className="font-serif text-xl font-semibold">What the site does not collect</h2>
        <p className="mt-3 leading-7 text-[var(--muted)]">
          Plain Politics does not currently offer accounts or store personalisation, quiz answers or
          political opinion signals. Those categories require a documented privacy assessment,
          retention rules and deletion controls before they could be introduced.
        </p>
      </section>
    </main>
  );
}
