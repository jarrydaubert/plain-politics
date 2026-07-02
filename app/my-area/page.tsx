import { BookOpenText, Landmark, MapPin } from "lucide-react";
import Link from "next/link";
import { MyAreaLookup } from "@/components/my-area-lookup";

export default function MyAreaPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <Link className="text-sm font-medium text-[var(--accent)]" href="/">
        Back to dashboard
      </Link>

      <section className="mt-6 grid gap-8 xl:grid-cols-[0.85fr_1.15fr]">
        <div>
          <div className="flex h-11 w-11 items-center justify-center rounded-md bg-[var(--accent)] text-white">
            <MapPin aria-hidden="true" size={23} />
          </div>
          <h1 className="mt-5 text-4xl font-semibold">Start with your area</h1>
          <p className="mt-4 max-w-2xl leading-7 text-[var(--muted)]">
            Enter a postcode to find your Westminster constituency, current MP, recent votes and
            written questions.
          </p>
        </div>

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
