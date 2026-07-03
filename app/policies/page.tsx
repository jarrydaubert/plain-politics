import Link from "next/link";
import { createMetadata, getRouteMetadata } from "@/lib/seo";

const pageMetadata = getRouteMetadata("/policies");

export const metadata = createMetadata(pageMetadata);

export default function PoliciesPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <Link className="text-sm font-medium text-[var(--accent)]" href="/">
        Back to dashboard
      </Link>
      <h1 className="mt-6 text-4xl font-semibold">Policies</h1>
      <p className="mt-4 max-w-2xl leading-7 text-[var(--muted)]">
        Policy comparison is planned for a feature branch after v1.0.0. It should publish only when
        each plain-English summary is backed by reviewed source excerpts.
      </p>
      <section className="mt-8 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
        <h2 className="text-xl font-semibold">Not in the launch version</h2>
        <p className="mt-3 leading-7 text-[var(--muted)]">
          The first public version is deliberately smaller: understand the basics, find your MP,
          follow Parliament records, and check sources. Party-policy comparison comes next.
        </p>
      </section>
    </main>
  );
}
