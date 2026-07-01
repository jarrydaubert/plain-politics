import { BookOpenText, DatabaseZap, MapPin } from "lucide-react";
import Link from "next/link";
import { MyAreaLookup } from "@/components/my-area-lookup";

export default function MyAreaPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <Link className="text-sm font-medium text-[var(--accent)]" href="/">
        Back to dashboard
      </Link>

      <section className="mt-6 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <div className="flex h-11 w-11 items-center justify-center rounded-md bg-[var(--accent)] text-white">
            <MapPin aria-hidden="true" size={23} />
          </div>
          <h1 className="mt-5 text-4xl font-semibold">Start with your area</h1>
          <p className="mt-4 max-w-2xl leading-7 text-[var(--muted)]">
            Enter a postcode to find the Westminster constituency, current MP and recent public
            parliamentary activity returned by official public sources.
          </p>
        </div>

        <aside className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
          <h2 className="text-lg font-semibold">What this page can and cannot say</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
            It can show official records. It cannot automatically prove local impact, motive or
            whether a promise was kept. Where the evidence is missing, the page should say so.
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
          href="/sources"
        >
          <DatabaseZap aria-hidden="true" className="text-[var(--accent)]" size={22} />
          <h2 className="mt-4 text-lg font-semibold">Check the sources</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
            See which public APIs and datasets power the first version of the site.
          </p>
        </Link>
      </section>
    </main>
  );
}
