import Link from "next/link";
import { notFound } from "next/navigation";
import { featuredParties, sourceReferences } from "@/data/demo-politics";

export function generateStaticParams() {
  return featuredParties.map((party) => ({ slug: party.slug }));
}

export default async function PartyDetailPage({
  params
}: Readonly<{ params: Promise<{ slug: string }> }>) {
  const { slug } = await params;
  const party = featuredParties.find((item) => item.slug === slug);

  if (!party) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <Link className="text-sm font-medium text-[var(--accent)]" href="/parties">
        Back to parties
      </Link>
      <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl font-semibold">{party.name}</h1>
          <p className="mt-4 max-w-2xl leading-7 text-[var(--muted)]">{party.summary}</p>
        </div>
        <span className="rounded-sm bg-[var(--accent-soft)] px-2 py-1 text-xs font-medium text-[var(--accent-strong)]">
          {party.coverage}
        </span>
      </div>

      <section className="mt-8 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
        <h2 className="text-xl font-semibold">Source panel pattern</h2>
        <p className="mt-3 leading-7 text-[var(--muted)]">
          Party pages should only replace this placeholder once summaries are mapped to source
          excerpts from official records.
        </p>
        <div className="mt-5 grid gap-3">
          {sourceReferences.map((source) => (
            <a
              className="block rounded-md border border-[var(--border)] p-4 transition hover:border-[var(--accent)]"
              href={source.url}
              key={source.url}
              rel="noreferrer"
              target="_blank"
            >
              <span className="block font-medium">{source.title}</span>
              <span className="mt-1 block text-sm text-[var(--muted)]">
                {source.publisher} - {source.tier}
              </span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
