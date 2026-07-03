import { AlertTriangle, CheckCircle2, CircleAlert, ExternalLink } from "lucide-react";
import Link from "next/link";
import { StructuredData } from "@/components/structured-data";
import {
  buildBreadcrumbJsonLd,
  buildWebPageJsonLd,
  createMetadata,
  getRouteMetadata
} from "@/lib/seo";
import {
  type DataCheckOutcome,
  type DataHealthState,
  type DataSourceFamilyStatus,
  formatDataStatusLabel,
  getDataStatusReport
} from "@/status/data-status";

export const dynamic = "force-dynamic";

const pageMetadata = getRouteMetadata("/status");

export const metadata = createMetadata(pageMetadata);

const sourceLinks = {
  "postcodes-ons": "https://api.postcodes.io/",
  "static-glossary": "https://www.parliament.uk/site-information/glossary/",
  "uk-parliament-commons-votes": "https://commonsvotes-api.parliament.uk/",
  "uk-parliament-members": "https://members-api.parliament.uk/",
  "uk-parliament-whatson": "https://whatson-api.parliament.uk/calendar/events/list.json"
} as const;

export default async function StatusPage() {
  const report = await getDataStatusReport();

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <StructuredData
        data={[
          buildWebPageJsonLd(pageMetadata),
          buildBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Data status", path: "/status" }
          ])
        ]}
      />
      <Link className="text-sm font-medium text-[var(--accent)]" href="/">
        Back to dashboard
      </Link>

      <section className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(18rem,0.45fr)]">
        <div>
          <h1 className="text-4xl font-semibold">Data status</h1>
          <p className="mt-4 max-w-3xl leading-7 text-[var(--muted)]">
            Plain Politics checks whether public sources are reachable, parseable, fresh enough for
            the page they support, shaped as expected, and free from obvious sanity problems.
          </p>
        </div>

        <aside className={`rounded-lg border p-5 ${statusPanelClasses(report.overall)}`}>
          <div className="flex items-center gap-3">
            <StatusIcon state={report.overall} />
            <div>
              <p className="text-sm font-semibold uppercase">Overall</p>
              <p className="mt-1 text-2xl font-semibold">{formatDataStatusLabel(report.overall)}</p>
            </div>
          </div>
          <dl className="mt-5 grid gap-3 text-sm">
            <StatusTime label="Last attempted check" value={report.lastAttemptedCheckAt} />
            <StatusTime label="Last successful check" value={report.lastSuccessfulCheckAt} />
          </dl>
        </aside>
      </section>

      <section className="mt-8 grid gap-4">
        {report.sources.map((source) => (
          <SourceStatusCard key={source.id} source={source} />
        ))}
      </section>

      <section className="mt-8 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
        <h2 className="text-xl font-semibold">How to read this</h2>
        <div className="mt-4 grid gap-4 text-sm leading-6 text-[var(--muted)] md:grid-cols-3">
          <p>
            <strong className="text-[var(--foreground)]">Healthy</strong> means every public check
            passed.
          </p>
          <p>
            <strong className="text-[var(--foreground)]">Degraded</strong> means the site can still
            show useful data, but at least one source failed or looked suspicious.
          </p>
          <p>
            <strong className="text-[var(--foreground)]">Offline</strong> is reserved for critical
            user journeys, such as postcode-to-current-MP lookup, when the required source cannot be
            trusted right now.
          </p>
        </div>
      </section>
    </main>
  );
}

function SourceStatusCard({ source }: Readonly<{ source: DataSourceFamilyStatus }>) {
  return (
    <article className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]">
      <div className="grid gap-4 border-b border-[var(--border)] p-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-xl font-semibold">{source.name}</h2>
            <span
              className={`rounded-sm px-2 py-1 text-xs font-semibold ${statusChipClasses(source.state)}`}
            >
              {formatDataStatusLabel(source.state)}
            </span>
            {source.critical ? (
              <span className="rounded-sm bg-[var(--surface-soft)] px-2 py-1 text-xs font-semibold text-[var(--muted)]">
                Critical path
              </span>
            ) : null}
          </div>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{source.summary}</p>
        </div>

        <a
          aria-label={`Open official source for ${source.name}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)]"
          href={sourceLinks[source.id]}
          rel="noreferrer"
          target="_blank"
        >
          Open source
          <ExternalLink aria-hidden="true" size={16} />
        </a>
      </div>

      <div className="grid gap-5 p-5 lg:grid-cols-[18rem_minmax(0,1fr)]">
        <dl className="grid content-start gap-3 text-sm">
          <StatusTime label="Last attempted check" value={source.lastAttemptedCheckAt} />
          <StatusTime label="Last successful check" value={source.lastSuccessfulCheckAt} />
        </dl>

        <div className="max-w-full overflow-x-auto">
          <table className="w-full min-w-[680px] border-collapse text-left text-sm">
            <caption className="sr-only">Data quality checks for {source.name}</caption>
            <thead className="bg-[var(--surface-soft)]">
              <tr>
                <th className="px-4 py-3 font-semibold" scope="col">
                  Check
                </th>
                <th className="px-4 py-3 font-semibold" scope="col">
                  Result
                </th>
                <th className="px-4 py-3 font-semibold" scope="col">
                  What happened
                </th>
              </tr>
            </thead>
            <tbody>
              {source.checks.map((check) => (
                <tr
                  className="border-t border-[var(--border)]"
                  key={`${source.id}-${check.kind}-${check.label}`}
                >
                  <td className="px-4 py-3 font-medium">{check.label}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-sm px-2 py-1 text-xs font-semibold ${checkClasses(check.outcome)}`}
                    >
                      {checkLabel(check.outcome)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[var(--muted)]">{check.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </article>
  );
}

function StatusTime({ label, value }: Readonly<{ label: string; value: string | null }>) {
  return (
    <div className="border-t border-[var(--border)] pt-3">
      <dt className="font-semibold">{label}</dt>
      <dd className="mt-1 text-[var(--muted)]">
        {value ? formatDateTime(value) : "No successful check yet"}
      </dd>
    </div>
  );
}

function StatusIcon({ state }: Readonly<{ state: DataHealthState }>) {
  if (state === "healthy") {
    return <CheckCircle2 aria-hidden="true" className="text-[#0d6141]" size={28} />;
  }

  if (state === "offline") {
    return <CircleAlert aria-hidden="true" className="text-[#9f1230]" size={28} />;
  }

  return <AlertTriangle aria-hidden="true" className="text-[#755000]" size={28} />;
}

function statusPanelClasses(state: DataHealthState) {
  if (state === "healthy") {
    return "border-[#9dd3aa] bg-[#e7f6e9]";
  }

  if (state === "offline") {
    return "border-[#f0a0aa] bg-[#fff0f2]";
  }

  return "border-[#e3c46f] bg-[#fff7d6]";
}

function statusChipClasses(state: DataHealthState) {
  if (state === "healthy") {
    return "bg-[#e7f6e9] text-[#0d6141]";
  }

  if (state === "offline") {
    return "bg-[#fff0f2] text-[#9f1230]";
  }

  return "bg-[#fff7d6] text-[#755000]";
}

function checkClasses(outcome: DataCheckOutcome) {
  if (outcome === "pass") {
    return "bg-[#e7f6e9] text-[#0d6141]";
  }

  if (outcome === "fail") {
    return "bg-[#fff0f2] text-[#9f1230]";
  }

  return "bg-[#fff7d6] text-[#755000]";
}

function checkLabel(outcome: DataCheckOutcome) {
  if (outcome === "pass") {
    return "Passed";
  }

  if (outcome === "fail") {
    return "Failed";
  }

  return "Needs attention";
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/London"
  }).format(new Date(value));
}
