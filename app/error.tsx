"use client";

import Link from "next/link";

export default function ErrorPage({
  reset
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-sm font-semibold uppercase text-[var(--danger)]">Something went wrong</p>
      <h1 className="mt-3 text-4xl font-semibold">This page could not load</h1>
      <p className="mt-4 leading-7 text-[var(--muted)]">
        One of the public data sources may be unavailable. Try again, or use another section while
        the source recovers.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          className="rounded-md bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-strong)]"
          onClick={reset}
          type="button"
        >
          Try again
        </button>
        <Link
          className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-sm font-semibold transition hover:border-[var(--accent)]"
          href="/"
        >
          Home
        </Link>
      </div>
    </main>
  );
}
