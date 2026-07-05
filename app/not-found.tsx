import Link from "next/link";
import { PageHeader } from "@/components/page-header";

export default function NotFoundPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <PageHeader
        eyebrow="404"
        lede="This page is not available. Start again from the homepage, glossary, or Parliament tracker."
        title="Page not found"
      />
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
