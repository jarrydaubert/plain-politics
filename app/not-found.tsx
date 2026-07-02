import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-sm font-semibold uppercase text-[var(--muted)]">404</p>
      <h1 className="mt-3 text-4xl font-semibold">Page not found</h1>
      <p className="mt-4 leading-7 text-[var(--muted)]">
        This page is not available. Start again from the homepage, glossary, or Parliament tracker.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          className="rounded-md bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-strong)]"
          href="/"
        >
          Home
        </Link>
        <Link
          className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-sm font-semibold transition hover:border-[var(--accent)]"
          href="/glossary"
        >
          Glossary
        </Link>
      </div>
    </main>
  );
}
