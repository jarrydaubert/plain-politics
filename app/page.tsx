import { ArrowRight, DatabaseZap, FileText, LineChart, Scale } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { PollingChart } from "@/components/polling-chart";
import {
  coverageSummary,
  featuredParties,
  policyAreas,
  pollingSeries,
  sourceReferences
} from "@/data/demo-politics";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
        <div className="flex flex-col justify-center">
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-normal text-[var(--foreground)] md:text-6xl">
            Plain-English UK politics, tied back to public sources.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            Track what parties stand for, what their manifestos say, how public polling is moving,
            and which records support each summary.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              className="inline-flex items-center gap-2 rounded-md bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-strong)]"
              href="/parties"
            >
              View parties
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
            <Link
              className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-sm font-semibold transition hover:border-[var(--accent)]"
              href="/sources"
            >
              Source hooks
            </Link>
          </div>
        </div>

        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">Polling movement</h2>
              <p className="mt-1 text-sm text-[var(--muted)]">
                Demo data shape for future public polling ingestion.
              </p>
            </div>
            <LineChart aria-hidden="true" className="text-[var(--accent)]" size={24} />
          </div>
          <div className="mt-5 h-72">
            <PollingChart data={pollingSeries} />
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 py-6 md:grid-cols-4">
          {coverageSummary.map((item) => (
            <div key={item.label} className="py-2">
              <div className="text-3xl font-semibold">{item.value}</div>
              <div className="mt-1 text-sm text-[var(--muted)]">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="text-2xl font-semibold">Party profiles</h2>
            <p className="mt-3 max-w-xl leading-7 text-[var(--muted)]">
              Each party page starts with a concise, sourced summary, then links into policies,
              manifestos, polls, votes, donations and source history.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {featuredParties.map((party) => (
              <Link
                className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 transition hover:border-[var(--accent)]"
                href={`/parties/${party.slug}`}
                key={party.slug}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold">{party.name}</h3>
                  <span className="rounded-sm bg-[var(--accent-soft)] px-2 py-1 text-xs font-medium text-[var(--accent-strong)]">
                    {party.coverage}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{party.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--surface-soft)]">
        <div className="mx-auto grid max-w-7xl gap-5 px-6 py-12 md:grid-cols-3">
          <InfoPanel
            description="Compare party positions with identical fields, coverage states and source links."
            href="/policies"
            icon={<Scale aria-hidden="true" size={22} />}
            title="Compare policies"
          />
          <InfoPanel
            description="Store source snapshots and excerpts before rendering public summaries."
            href="/sources"
            icon={<DatabaseZap aria-hidden="true" size={22} />}
            title="Provenance first"
          />
          <InfoPanel
            description="Keep manifestos, policy pages, votes and donor records tied to public references."
            href="/parliament"
            icon={<FileText aria-hidden="true" size={22} />}
            title="Live Parliament hook"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
            <h2 className="text-xl font-semibold">Policy areas in the first slice</h2>
            <div className="mt-4 grid gap-3">
              {policyAreas.map((area) => (
                <div
                  className="flex items-center justify-between border-t border-[var(--border)] pt-3"
                  key={area.name}
                >
                  <span className="font-medium">{area.name}</span>
                  <span className="text-sm text-[var(--muted)]">{area.status}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
            <h2 className="text-xl font-semibold">Source references</h2>
            <div className="mt-4 grid gap-3">
              {sourceReferences.map((source) => (
                <a
                  className="block border-t border-[var(--border)] pt-3 transition hover:text-[var(--accent)]"
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
          </div>
        </div>
      </section>
    </main>
  );
}

function InfoPanel({
  description,
  href,
  icon,
  title
}: Readonly<{
  description: string;
  href: Route;
  icon: ReactNode;
  title: string;
}>) {
  return (
    <Link
      className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 transition hover:border-[var(--accent)]"
      href={href}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[var(--accent)] text-white">
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{description}</p>
    </Link>
  );
}
