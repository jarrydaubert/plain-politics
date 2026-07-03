import { DatabaseZap, ExternalLink, ListChecks } from "lucide-react";
import Link from "next/link";
import { StructuredData } from "@/components/structured-data";
import { datapointGroups, type SourceHook, sourceHooks } from "@/data/source-catalogue";
import {
  buildBreadcrumbJsonLd,
  buildWebPageJsonLd,
  createMetadata,
  getRouteMetadata
} from "@/lib/seo";

const pageMetadata = getRouteMetadata("/sources");

export const metadata = createMetadata(pageMetadata);

const statusLabels: Record<SourceHook["status"], string> = {
  candidate: "Candidate",
  hooked: "Hooked now",
  review: "Needs review"
};

export default function SourcesPage() {
  const hooked = sourceHooks.filter((source) => source.status === "hooked");
  const candidates = sourceHooks.filter((source) => source.status !== "hooked");

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
      <Link className="text-sm font-medium text-[var(--accent)]" href="/">
        Back to dashboard
      </Link>

      <section className="mt-6 grid gap-8 xl:grid-cols-[0.75fr_1.25fr]">
        <div>
          <h1 className="text-4xl font-semibold">Source directory</h1>
          <p className="mt-4 leading-7 text-[var(--muted)]">
            The public feeds Plain Politics uses now, plus the feeds to review before adding new
            features.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <MetricCard label="Used now" value={hooked.length.toString()} />
          <MetricCard label="To review" value={candidates.length.toString()} />
          <MetricCard label="Data areas" value={datapointGroups.length.toString()} />
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-4 flex items-center gap-2">
          <DatabaseZap aria-hidden="true" className="text-[var(--accent)]" size={22} />
          <h2 className="text-2xl font-semibold">Used now</h2>
        </div>
        <div className="grid gap-4 xl:grid-cols-3">
          {hooked.map((source) => (
            <SourceCard key={source.name} source={source} />
          ))}
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-4 flex items-center gap-2">
          <ListChecks aria-hidden="true" className="text-[var(--accent)]" size={22} />
          <h2 className="text-2xl font-semibold">To review</h2>
        </div>
        <div className="grid gap-4 xl:grid-cols-2">
          {candidates.map((source) => (
            <SourceCard key={source.name} source={source} />
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">What these sources can support</h2>
        <div className="mt-4 grid gap-4 xl:grid-cols-2">
          {datapointGroups.map((group) => (
            <article
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5"
              key={group.title}
            >
              <h3 className="text-lg font-semibold">{group.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{group.description}</p>
              <ul className="mt-4 grid gap-2 text-sm">
                {group.datapoints.map((datapoint) => (
                  <li className="border-t border-[var(--border)] pt-2" key={datapoint}>
                    {datapoint}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function MetricCard({ label, value }: Readonly<{ label: string; value: string }>) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
      <div className="text-3xl font-semibold">{value}</div>
      <div className="mt-1 text-sm text-[var(--muted)]">{label}</div>
    </div>
  );
}

function SourceCard({ source }: Readonly<{ source: SourceHook }>) {
  return (
    <article className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase text-[var(--muted)]">
            {statusLabels[source.status]}
          </p>
          <h3 className="mt-1 text-lg font-semibold">{source.name}</h3>
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
          <dt className="font-semibold">Can support</dt>
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
