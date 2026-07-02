import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  robots: {
    follow: false,
    index: false
  }
};

export default function PollsPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <Link className="text-sm font-medium text-[var(--accent)]" href="/">
        Back to dashboard
      </Link>
      <h1 className="mt-6 text-4xl font-semibold">Polling and popularity</h1>
      <p className="mt-4 max-w-2xl leading-7 text-[var(--muted)]">
        Polling is planned after v1.0.0. Plain Politics will not publish polling charts until the
        source, licence, fieldwork dates, sample size and polling-methodology notes are ready.
      </p>
      <section className="mt-8 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
        <h2 className="text-xl font-semibold">Not in the launch version</h2>
        <p className="mt-3 leading-7 text-[var(--muted)]">
          The launch version focuses on local MP lookup, glossary terms, Parliament records and
          source links. Polling comes later because it needs careful freshness and inclusion rules.
        </p>
      </section>
    </main>
  );
}
