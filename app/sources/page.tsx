import { DatabaseZap, ExternalLink } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { StructuredData } from "@/components/structured-data";
import { type SourceHook, sourceHooks } from "@/data/source-catalogue";
import {
  buildBreadcrumbJsonLd,
  buildWebPageJsonLd,
  createMetadata,
  getRouteMetadata
} from "@/lib/seo";

const pageMetadata = getRouteMetadata("/sources");

export const metadata = createMetadata(pageMetadata);

export default function SourcesPage() {
  const hooked = sourceHooks.filter((source) => source.status === "hooked");

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <StructuredData
        data={[
          buildWebPageJsonLd(pageMetadata),
          buildBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Sources", path: "/sources" }
          ])
        ]}
      />
      <PageHeader
        backHref="/"
        className="max-w-3xl"
        eyebrow="Public records"
        lede="These are the public sources used by features you can open on Plain Politics today. The directory lists reviewed public features, not internal source research."
        title="Source directory"
      >
        <Link
          className="inline-flex text-sm font-semibold text-[var(--accent)] hover:text-[var(--accent-strong)]"
          href="/status"
        >
          Check current data health
        </Link>
      </PageHeader>

      <section className="mt-10">
        <div className="mb-4 flex items-center gap-2">
          <DatabaseZap aria-hidden="true" className="text-[var(--accent)]" size={22} />
          <h2 className="font-serif text-2xl font-semibold">Used now</h2>
        </div>
        <div className="grid gap-4 xl:grid-cols-3">
          {hooked.map((source) => (
            <SourceCard key={source.name} source={source} />
          ))}
        </div>
      </section>

      <section className="mt-10 border-t border-[var(--border)] pt-8">
        <h2 className="font-serif text-2xl font-semibold">How Plain Politics uses sources</h2>
        <div className="mt-4 grid gap-4 text-sm leading-6 text-[var(--muted)] md:grid-cols-3">
          <p>
            Factual records link to the public source used to produce them. Primary official sources
            are preferred.
          </p>
          <p>
            Missing, stale or suspicious data is labelled rather than filled in with an unsupported
            answer.
          </p>
          <p>
            Source problems can be reported to{" "}
            <a
              className="font-semibold text-[var(--accent)]"
              href="mailto:info@plainpolitics.co.uk"
            >
              info@plainpolitics.co.uk
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}

function SourceCard({ source }: Readonly<{ source: SourceHook }>) {
  return (
    <article className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">{source.name}</h3>
          <p className="mt-1 text-sm text-[var(--muted)]">{source.publisher}</p>
        </div>
        <a
          aria-label={`Open official source for ${source.name}`}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[var(--border)] text-[var(--accent)] transition hover:border-[var(--accent)]"
          href={source.sourceUrl}
          rel="noreferrer"
          target="_blank"
        >
          <ExternalLink aria-hidden="true" size={17} />
        </a>
      </div>

      <dl className="mt-4 grid gap-3 text-sm">
        <div>
          <dt className="font-semibold">Access</dt>
          <dd className="mt-1 leading-6 text-[var(--muted)]">{source.access}</dd>
        </div>
        <div>
          <dt className="font-semibold">Used for</dt>
          <dd className="mt-1 leading-6 text-[var(--muted)]">{source.powers.join(", ")}</dd>
        </div>
      </dl>

      <div className="mt-4">
        <h4 className="text-sm font-semibold">Records</h4>
        <ul className="mt-2 grid gap-2 text-sm text-[var(--muted)]">
          {source.datapoints.map((datapoint) => (
            <li key={datapoint}>{datapoint}</li>
          ))}
        </ul>
      </div>

      <p className="mt-4 border-t border-[var(--border)] pt-4 text-sm leading-6 text-[var(--muted)]">
        {source.caveat}
      </p>
    </article>
  );
}
