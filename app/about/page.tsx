import Link from "next/link";
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
  "Corrections and missing evidence should be visible."
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
      <Link className="text-sm font-medium text-[var(--accent)]" href="/">
        Back to dashboard
      </Link>
      <h1 className="mt-6 text-4xl font-semibold">About this site</h1>
      <p className="mt-4 leading-7 text-[var(--muted)]">
        Plain Politics is a plain-English starter for people who want to understand UK politics
        without spin, predictions or voting advice.
      </p>
      <div className="mt-8 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
        <h2 className="text-xl font-semibold">How to read it</h2>
        <p className="mt-3 leading-7 text-[var(--muted)]">
          Start with a local question, then follow the words, public records and source links as far
          as you want to go. When the site cannot verify something from public evidence, it should
          say so.
        </p>
      </div>
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
    </main>
  );
}
