import { BookOpenText, Landmark } from "lucide-react";
import Link from "next/link";
import { MyAreaLookup } from "@/components/my-area-lookup";
import { PageHeader } from "@/components/page-header";
import { StructuredData } from "@/components/structured-data";
import {
  buildBreadcrumbJsonLd,
  buildWebPageJsonLd,
  createMetadata,
  getRouteMetadata
} from "@/lib/seo";

const pageMetadata = getRouteMetadata("/my-area");

export const metadata = createMetadata(pageMetadata);

export default function MyAreaPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <StructuredData
        data={[
          buildWebPageJsonLd(pageMetadata),
          buildBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "My area", path: "/my-area" }
          ])
        ]}
      />
      <section className="grid gap-8 xl:grid-cols-[0.85fr_1.15fr]">
        <PageHeader
          backHref="/"
          eyebrow="Your constituency"
          lede="Enter a postcode to find your Westminster constituency, current MP, recent votes and written questions."
          title="Start with your area"
        />

        <aside className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
          <h2 className="text-lg font-semibold">What you will see</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
            Your seat, your MP, a few recent public records and the words you might need to
            understand them.
          </p>
        </aside>
      </section>

      <section className="mt-10">
        <MyAreaLookup />
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-2">
        <Link
          className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 transition hover:border-[var(--accent)]"
          href="/glossary"
        >
          <BookOpenText aria-hidden="true" className="text-[var(--accent)]" size={22} />
          <h2 className="mt-4 text-lg font-semibold">Decode the terms</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
            Learn what constituency, division, written question, sitting and recess mean.
          </p>
        </Link>
        <Link
          className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 transition hover:border-[var(--accent)]"
          href="/parliament"
        >
          <Landmark aria-hidden="true" className="text-[var(--accent)]" size={22} />
          <h2 className="mt-4 text-lg font-semibold">See Parliament</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
            Browse Commons seats, upcoming business and recent votes.
          </p>
        </Link>
      </section>
    </main>
  );
}
