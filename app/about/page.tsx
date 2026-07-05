import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { StructuredData } from "@/components/structured-data";
import {
  buildBreadcrumbJsonLd,
  buildWebPageJsonLd,
  createMetadata,
  getRouteMetadata
} from "@/lib/seo";

const pageMetadata = getRouteMetadata("/about");

export const metadata = createMetadata(pageMetadata);

const principles = [
  "No source means no factual claim.",
  "Public records are shown carefully, without guessing motive or local impact.",
  "The site does not predict elections or tell people how to vote.",
  "Postcode lookups are not stored by default.",
  "Source problems and missing evidence can be reported."
];

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <StructuredData
        data={[
          buildWebPageJsonLd(pageMetadata),
          buildBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" }
          ])
        ]}
      />
      <PageHeader
        backHref="/"
        eyebrow="Plain Politics"
        lede="Plain Politics is a plain-English starter for people who want to understand UK politics without spin, predictions or voting advice."
        title="About this site"
      />
      <section className="mt-8 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
        <h2 className="font-serif text-xl font-semibold">How to read it</h2>
        <p className="mt-3 leading-7 text-[var(--muted)]">
          Start with a local question, then follow the words, public records and source links as far
          as you want to go. When the site cannot verify something from public evidence, it says so.
        </p>
      </section>
      <ul className="mt-6 grid gap-3">
        {principles.map((principle) => (
          <li
            className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4"
            key={principle}
          >
            {principle}
          </li>
        ))}
      </ul>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <section className="border-t border-[var(--border)] pt-5">
          <h2 className="font-serif text-xl font-semibold">Independent and unaffiliated</h2>
          <p className="mt-3 leading-7 text-[var(--muted)]">
            Plain Politics is an independent information project. It is not affiliated with a
            political party, Parliament, a government department or an election authority.
          </p>
        </section>

        <section className="border-t border-[var(--border)] pt-5">
          <h2 className="font-serif text-xl font-semibold">Sources and update times</h2>
          <p className="mt-3 leading-7 text-[var(--muted)]">
            Live panels identify their public source and show when data was checked through the app
            cache. Parliament responses may be cached for up to five minutes.
          </p>
          <div className="mt-3 flex flex-wrap gap-4 text-sm font-semibold">
            <Link className="text-[var(--accent)]" href="/sources">
              Browse sources
            </Link>
            <Link className="text-[var(--accent)]" href="/status">
              Check data health
            </Link>
          </div>
        </section>

        <section className="border-t border-[var(--border)] pt-5">
          <h2 className="font-serif text-xl font-semibold">Corrections and contact</h2>
          <p className="mt-3 leading-7 text-[var(--muted)]">
            Report a source problem, unclear explanation or correction by emailing{" "}
            <a
              className="font-semibold text-[var(--accent)]"
              href="mailto:info@plainpolitics.co.uk"
            >
              info@plainpolitics.co.uk
            </a>
            . Include the page URL and the public record that appears wrong where possible.
          </p>
        </section>

        <section className="border-t border-[var(--border)] pt-5">
          <h2 className="font-serif text-xl font-semibold">Privacy</h2>
          <p className="mt-3 leading-7 text-[var(--muted)]">
            Postcode lookup runs in the browser and is not stored by Plain Politics. Analytics
            choices and third-party source requests are explained in the privacy notice.
          </p>
          <Link
            className="mt-3 inline-flex text-sm font-semibold text-[var(--accent)]"
            href="/privacy"
          >
            Read the privacy notice
          </Link>
        </section>
      </div>
    </main>
  );
}
