import { AlertCircle, ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { SourceDataNote } from "@/components/source-data-note";
import { StructuredData } from "@/components/structured-data";
import { formatUkDateTime } from "@/lib/format";
import {
  buildBreadcrumbJsonLd,
  buildWebPageJsonLd,
  createMetadata,
  getRouteMetadata
} from "@/lib/seo";
import { getCommonsPartySeatCounts, type PartySeatCount } from "@/sources/uk-parliament";

export const revalidate = 300;

const pageMetadata = getRouteMetadata("/parties");

export const metadata = createMetadata(pageMetadata);

export default async function PartiesPage() {
  const snapshot = await getPartySnapshot();

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <StructuredData
        data={[
          buildWebPageJsonLd(pageMetadata),
          buildBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Parties", path: "/parties" }
          ])
        ]}
      />
      <PageHeader
        backHref="/"
        className="max-w-3xl"
        eyebrow="Commons snapshot"
        lede="A beginner view of the current House of Commons party balance. This is not a policy profile or a prediction; it is a live public-record snapshot from UK Parliament."
        title="Parties"
      />

      {snapshot.status === "available" ? (
        <>
          <section className="mt-8 min-w-0 overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]">
            <div className="relative max-w-full overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                <caption className="sr-only">Current House of Commons party seat counts</caption>
                <thead className="bg-[var(--surface-soft)]">
                  <tr>
                    <th className="px-4 py-3 font-semibold" scope="col">
                      Party
                    </th>
                    <th className="px-4 py-3 font-semibold" scope="col">
                      Commons seats
                    </th>
                    <th className="px-4 py-3 font-semibold" scope="col">
                      What this means
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {snapshot.parties.map((party) => (
                    <tr className="border-t border-[var(--border)]" key={party.party.id}>
                      <td className="px-4 py-3 font-medium">
                        {party.party.name}
                        {party.party.abbreviation ? (
                          <span className="ml-2 text-xs text-[var(--muted)]">
                            {party.party.abbreviation}
                          </span>
                        ) : null}
                      </td>
                      <td className="px-4 py-3 text-2xl font-semibold text-[var(--accent-strong)]">
                        {party.total}
                      </td>
                      <td className="px-4 py-3 text-[var(--muted)]">
                        {party.total === 1
                          ? "One MP in the Commons"
                          : "MPs currently recorded in the Commons"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-6 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
            <h2 className="text-xl font-semibold">Source</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
              Checked through the app cache {formatUkDateTime(snapshot.retrievedAt)} from the UK
              Parliament Members API. Source responses may be cached for up to five minutes. Party
              policies are outside this page; it reports current Commons seat counts only.
            </p>
            <SourceDataNote status={snapshot.dataStatus} />
            <a
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)]"
              href={snapshot.sourceUrl}
              rel="noreferrer"
              target="_blank"
            >
              Open official source
              <ExternalLink aria-hidden="true" size={16} />
            </a>
          </section>
        </>
      ) : (
        <section className="mt-8 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
          <div className="flex items-start gap-3">
            <AlertCircle aria-hidden="true" className="mt-1 text-[var(--danger)]" size={22} />
            <div>
              <h2 className="text-xl font-semibold">Party data unavailable</h2>
              <p className="mt-3 leading-7 text-[var(--muted)]">
                The UK Parliament Members API did not return the party balance. Try again later or
                use the Parliament page for other live public records.
              </p>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

async function getPartySnapshot() {
  try {
    const record = await getCommonsPartySeatCounts();

    return {
      parties: record.data.filter((party) => party.total > 0),
      dataStatus: record.dataStatus,
      retrievedAt: record.sourceDocument.retrievedAt,
      sourceUrl: record.sourceDocument.url,
      status: "available" as const
    };
  } catch {
    return {
      parties: [] as PartySeatCount[],
      status: "unavailable" as const
    };
  }
}
