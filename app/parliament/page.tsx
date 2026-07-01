import Link from "next/link";
import {
  getCommonsMembersSample,
  getCommonsPartySeatCounts,
  getRecentCommonsDivisions,
  getUpcomingParliamentEvents
} from "@/sources/uk-parliament";

export const dynamic = "force-dynamic";

export default async function ParliamentPage() {
  const [seatCounts, members, divisions, upcomingEvents] = await Promise.all([
    getCommonsPartySeatCounts(),
    getCommonsMembersSample(8),
    getRecentCommonsDivisions(5),
    getUpcomingParliamentEvents(7, 8)
  ]);

  const totalSeats = seatCounts.data.reduce((sum, row) => sum + row.total, 0);

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <Link className="text-sm font-medium text-[var(--accent)]" href="/">
        Back to dashboard
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
        <section>
          <h1 className="text-4xl font-semibold">Parliament</h1>
          <p className="mt-4 leading-7 text-[var(--muted)]">
            Live source hook using UK Parliament APIs. The page builds source documents, snapshots,
            excerpts and displayed facts in memory before rendering the tables below.
          </p>
          <div className="mt-6 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
            <div className="text-3xl font-semibold">{totalSeats}</div>
            <div className="mt-1 text-sm text-[var(--muted)]">
              Commons seats represented in source response
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]">
          <div className="border-b border-[var(--border)] p-5">
            <h2 className="text-xl font-semibold">State of the parties</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Source: UK Parliament Members API, refreshed through Next server fetch cache.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <thead className="bg-[var(--surface-soft)]">
                <tr>
                  <th className="px-4 py-3 font-semibold">Party</th>
                  <th className="px-4 py-3 font-semibold">Abbrev.</th>
                  <th className="px-4 py-3 font-semibold">Seats</th>
                  <th className="px-4 py-3 font-semibold">Male</th>
                  <th className="px-4 py-3 font-semibold">Female</th>
                  <th className="px-4 py-3 font-semibold">Non-binary</th>
                </tr>
              </thead>
              <tbody>
                {seatCounts.data.map((row) => (
                  <tr className="border-t border-[var(--border)]" key={row.party.id}>
                    <td className="px-4 py-3">
                      <span
                        aria-hidden="true"
                        className="mr-2 inline-block h-3 w-3 rounded-full"
                        style={{
                          backgroundColor: row.party.backgroundColour
                            ? `#${row.party.backgroundColour}`
                            : "var(--border)"
                        }}
                      />
                      <span className="font-medium">{row.party.name}</span>
                    </td>
                    <td className="px-4 py-3 text-[var(--muted)]">
                      {row.party.abbreviation ?? "-"}
                    </td>
                    <td className="px-4 py-3 font-semibold">{row.total}</td>
                    <td className="px-4 py-3">{row.male ?? "-"}</td>
                    <td className="px-4 py-3">{row.female ?? "-"}</td>
                    <td className="px-4 py-3">{row.nonBinary ?? "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <section className="mt-8 overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]">
        <div className="border-b border-[var(--border)] p-5">
          <h2 className="text-xl font-semibold">Current Commons members sample</h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Source: UK Parliament Members API member search endpoint.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[780px] border-collapse text-left text-sm">
            <thead className="bg-[var(--surface-soft)]">
              <tr>
                <th className="px-4 py-3 font-semibold">Member</th>
                <th className="px-4 py-3 font-semibold">Party</th>
                <th className="px-4 py-3 font-semibold">Constituency</th>
                <th className="px-4 py-3 font-semibold">Started</th>
              </tr>
            </thead>
            <tbody>
              {members.data.map((member) => (
                <tr className="border-t border-[var(--border)]" key={member.id}>
                  <td className="px-4 py-3 font-medium">{member.nameDisplayAs}</td>
                  <td className="px-4 py-3">{member.latestParty.name}</td>
                  <td className="px-4 py-3">{member.latestHouseMembership.membershipFrom}</td>
                  <td className="px-4 py-3">
                    {formatDateOnly(member.latestHouseMembership.membershipStartDate)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]">
        <div className="border-b border-[var(--border)] p-5">
          <h2 className="text-xl font-semibold">Upcoming parliamentary business</h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Source: UK Parliament What's On API, showing scheduled business in the next seven days.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-left text-sm">
            <thead className="bg-[var(--surface-soft)]">
              <tr>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Time</th>
                <th className="px-4 py-3 font-semibold">House</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Business</th>
                <th className="px-4 py-3 font-semibold">Bill</th>
              </tr>
            </thead>
            <tbody>
              {upcomingEvents.data.map((event) => (
                <tr className="border-t border-[var(--border)]" key={event.Id}>
                  <td className="px-4 py-3">{formatDateOnly(event.StartDate)}</td>
                  <td className="px-4 py-3">{event.StartTime || "-"}</td>
                  <td className="px-4 py-3">{event.House ?? "-"}</td>
                  <td className="px-4 py-3">{event.Category ?? event.Type ?? "-"}</td>
                  <td className="px-4 py-3 font-medium">
                    {event.Description ?? event.Type ?? "Scheduled business"}
                  </td>
                  <td className="px-4 py-3">
                    {event.BillPageLink ? (
                      <a
                        className="font-medium text-[var(--accent)]"
                        href={event.BillPageLink}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {event.BillName || "Bill page"}
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]">
        <div className="border-b border-[var(--border)] p-5">
          <h2 className="text-xl font-semibold">Recent Commons divisions</h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Source: UK Parliament Commons Votes API.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[780px] border-collapse text-left text-sm">
            <thead className="bg-[var(--surface-soft)]">
              <tr>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Division</th>
                <th className="px-4 py-3 font-semibold">Title</th>
                <th className="px-4 py-3 font-semibold">Ayes</th>
                <th className="px-4 py-3 font-semibold">Noes</th>
              </tr>
            </thead>
            <tbody>
              {divisions.data.map((division) => (
                <tr className="border-t border-[var(--border)]" key={division.DivisionId}>
                  <td className="px-4 py-3">{formatDate(division.Date)}</td>
                  <td className="px-4 py-3">{division.Number}</td>
                  <td className="px-4 py-3 font-medium">{division.Title}</td>
                  <td className="px-4 py-3">{division.AyeCount}</td>
                  <td className="px-4 py-3">{division.NoCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <SourcePanel
          excerptCount={seatCounts.sourceExcerpts.length}
          facts={seatCounts.displayFacts.slice(0, 3).map((fact) => fact.summaryText)}
          sourceHash={seatCounts.sourceSnapshot.contentHash}
          title="Party seat-count source chain"
          url={seatCounts.sourceDocument.url}
        />
        <SourcePanel
          excerptCount={members.sourceExcerpts.length}
          facts={members.displayFacts.slice(0, 3).map((fact) => fact.summaryText)}
          sourceHash={members.sourceSnapshot.contentHash}
          title="Current Commons members source chain"
          url={members.sourceDocument.url}
        />
        <SourcePanel
          excerptCount={upcomingEvents.sourceExcerpts.length}
          facts={upcomingEvents.displayFacts.slice(0, 3).map((fact) => fact.summaryText)}
          sourceHash={upcomingEvents.sourceSnapshot.contentHash}
          title="Upcoming business source chain"
          url={upcomingEvents.sourceDocument.url}
        />
        <SourcePanel
          excerptCount={divisions.sourceExcerpts.length}
          facts={divisions.displayFacts.slice(0, 3).map((fact) => fact.summaryText)}
          sourceHash={divisions.sourceSnapshot.contentHash}
          title="Commons divisions source chain"
          url={divisions.sourceDocument.url}
        />
      </section>
    </main>
  );
}

function SourcePanel({
  excerptCount,
  facts,
  sourceHash,
  title,
  url
}: Readonly<{
  excerptCount: number;
  facts: string[];
  sourceHash: string;
  title: string;
  url: string;
}>) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
      <h2 className="text-lg font-semibold">{title}</h2>
      <a
        className="mt-3 block break-words text-sm font-medium text-[var(--accent)]"
        href={url}
        rel="noreferrer"
        target="_blank"
      >
        {url}
      </a>
      <dl className="mt-4 grid gap-3 text-sm">
        <div>
          <dt className="font-semibold">Snapshot hash</dt>
          <dd className="mt-1 break-all font-mono text-xs text-[var(--muted)]">{sourceHash}</dd>
        </div>
        <div>
          <dt className="font-semibold">Source excerpts</dt>
          <dd className="mt-1 text-[var(--muted)]">{excerptCount}</dd>
        </div>
      </dl>
      <div className="mt-4 border-t border-[var(--border)] pt-4">
        <h3 className="text-sm font-semibold">Displayed facts backed by excerpts</h3>
        <ul className="mt-2 grid gap-2 text-sm text-[var(--muted)]">
          {facts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}

function formatDateOnly(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium"
  }).format(new Date(value));
}
