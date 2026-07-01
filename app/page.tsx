import { ArrowRight, DatabaseZap, MapPin, ShieldCheck } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

const launchMetrics = [
  { label: "Live Parliament hooks", value: "4" },
  { label: "Glossary terms", value: "21" },
  { label: "Primary source families", value: "3" },
  { label: "Accounts needed", value: "0" }
];

const sourceReferences = [
  {
    publisher: "UK Parliament",
    tier: "Tier 1",
    title: "UK Parliament Members API",
    url: "https://members-api.parliament.uk/"
  },
  {
    publisher: "UK Parliament",
    tier: "Tier 1",
    title: "UK Parliament Commons Votes API",
    url: "https://commonsvotes-api.parliament.uk/"
  },
  {
    publisher: "postcodes.io",
    tier: "Public civic data",
    title: "Postcode lookup API",
    url: "https://api.postcodes.io/"
  },
  {
    publisher: "UK Parliament",
    tier: "Tier 1",
    title: "UK Parliament What's On API",
    url: "https://whatson-api.parliament.uk/calendar/events/list.json"
  }
];

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
        <div className="flex flex-col justify-center">
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-normal text-[var(--foreground)] md:text-6xl">
            Know nothing about UK politics? Start with where you live.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            Find your MP, decode the words, see live public records and check the sources without
            needing an account or a politics degree.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              className="inline-flex items-center gap-2 rounded-md bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-strong)]"
              href="/my-area"
            >
              Start with my area
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
            <Link
              className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-sm font-semibold transition hover:border-[var(--accent)]"
              href="/glossary"
            >
              Open glossary
            </Link>
          </div>
        </div>

        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-md bg-[var(--accent)] text-white">
            <MapPin aria-hidden="true" size={23} />
          </div>
          <h2 className="mt-5 text-2xl font-semibold">The v1.0.0 path</h2>
          <div className="mt-5 grid gap-3">
            {[
              "Enter postcode",
              "Find constituency and current MP",
              "Read recent public records",
              "Open glossary and source links"
            ].map((step, index) => (
              <div
                className="flex items-center gap-3 border-t border-[var(--border)] pt-3"
                key={step}
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-soft)] text-sm font-semibold text-[var(--accent-strong)]">
                  {index + 1}
                </span>
                <span className="text-sm font-medium">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 py-6 md:grid-cols-4">
          {launchMetrics.map((item) => (
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
            <h2 className="text-2xl font-semibold">Barebones public launch</h2>
            <p className="mt-3 max-w-xl leading-7 text-[var(--muted)]">
              The first version is deliberately narrow: help a beginner start locally, understand
              the terms, inspect public records and see where the information came from.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <LaunchCard
              description="Resolve postcode to constituency and current MP using public sources."
              href="/my-area"
              title="My area"
            />
            <LaunchCard
              description="Plain-English terms for votes, sessions, PMQs, Black Rod and more."
              href="/glossary"
              title="Glossary"
            />
            <LaunchCard
              description="Live official hooks for Commons party state, members, business and divisions."
              href="/parliament"
              title="Parliament"
            />
            <LaunchCard
              description="A transparent source catalogue for what is live, candidate or under review."
              href="/sources"
              title="Sources"
            />
          </div>
        </div>
      </section>

      <section className="bg-[var(--surface-soft)]">
        <div className="mx-auto grid max-w-7xl gap-5 px-6 py-12 md:grid-cols-3">
          <InfoPanel
            description="The first version starts with a postcode because local relevance beats abstract categories."
            href="/my-area"
            icon={<MapPin aria-hidden="true" size={22} />}
            title="Start locally"
          />
          <InfoPanel
            description="Every public fact should point back to an official source or show a clear gap."
            href="/sources"
            icon={<DatabaseZap aria-hidden="true" size={22} />}
            title="Show the source"
          />
          <InfoPanel
            description="No predictions, no tactical voting advice, no ideological scoring and no accounts for launch."
            href="/parliament"
            icon={<ShieldCheck aria-hidden="true" size={22} />}
            title="Stay neutral"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
            <h2 className="text-xl font-semibold">Coming after v1.0.0</h2>
            <div className="mt-4 grid gap-3">
              {[
                "First policy area on a feature branch",
                "Manifesto and party policy ingestion",
                "Polling tracker once source rules are settled",
                "Change feed and subscriptions"
              ].map((item) => (
                <div
                  className="flex items-center justify-between border-t border-[var(--border)] pt-3"
                  key={item}
                >
                  <span className="font-medium">{item}</span>
                  <span className="text-sm text-[var(--muted)]">Later</span>
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

function LaunchCard({
  description,
  href,
  title
}: Readonly<{
  description: string;
  href: Route;
  title: string;
}>) {
  return (
    <Link
      className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 transition hover:border-[var(--accent)]"
      href={href}
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{description}</p>
    </Link>
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
