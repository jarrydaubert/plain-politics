import Link from "next/link";
import { featuredParties } from "@/data/demo-politics";

export default function PartiesPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <Link className="text-sm font-medium text-[var(--accent)]" href="/">
        Back to dashboard
      </Link>
      <h1 className="mt-6 text-4xl font-semibold">Parties</h1>
      <p className="mt-4 max-w-2xl leading-7 text-[var(--muted)]">
        Starter profile cards for the first source-backed slice. Real content should only publish
        after source references and freshness checks are attached.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {featuredParties.map((party) => (
          <article
            className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5"
            key={party.slug}
          >
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold">{party.name}</h2>
              <span className="rounded-sm bg-[var(--accent-soft)] px-2 py-1 text-xs font-medium text-[var(--accent-strong)]">
                {party.coverage}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{party.summary}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
