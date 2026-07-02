import { ExternalLink } from "lucide-react";
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
    <main className="mx-auto max-w-7xl px-6 py-10">
      <Link className="text-sm font-medium text-[var(--accent)]" href="/">
        Back to dashboard
      </Link>

      <div className="mt-6 grid gap-8 xl:grid-cols-[minmax(18rem,0.55fr)_minmax(0,1.45fr)]">
        <section className="min-w-0">
          <h1 className="text-4xl font-semibold">Parliament</h1>
          <p className="mt-4 leading-7 text-[var(--muted)]">
            A public-record view of Commons seats, current members, upcoming business and recent
            votes.
          </p>
          <div className="mt-6 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
            <div className="text-3xl font-semibold">{totalSeats}</div>
            <div className="mt-1 text-sm text-[var(--muted)]">
              Commons seats represented in source response
            </div>
          </div>
        </section>

        <section className="min-w-0 overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]">
          <div className="border-b border-[var(--border)] p-5">
            <h2 className="text-xl font-semibold">State of the parties</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">Official UK Parliament Members API.</p>
          </div>
          <div className="max-w-full overflow-x-auto">
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

      <section className="mt-8 min-w-0 overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]">
        <div className="border-b border-[var(--border)] p-5">
          <h2 className="text-xl font-semibold">Current Commons members sample</h2>
          <p className="mt-1 text-sm text-[var(--muted)]">Official UK Parliament Members API.</p>
        </div>
        <div className="max-w-full overflow-x-auto">
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

      <section className="mt-8 min-w-0 overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]">
        <div className="border-b border-[var(--border)] p-5">
          <h2 className="text-xl font-semibold">Upcoming parliamentary business</h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Official UK Parliament calendar API, next seven days.
          </p>
        </div>
        <div className="max-w-full overflow-x-auto">
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

      <section className="mt-8 min-w-0 overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]">
        <div className="border-b border-[var(--border)] p-5">
          <h2 className="text-xl font-semibold">Recent Commons divisions</h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Official UK Parliament Commons Votes API.
          </p>
        </div>
        <div className="max-w-full overflow-x-auto">
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

      <section className="mt-8 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
        <h2 className="text-xl font-semibold">Official source links</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <SourceLink label="Party seat counts" url={seatCounts.sourceDocument.url} />
          <SourceLink label="Current Commons members" url={members.sourceDocument.url} />
          <SourceLink label="Upcoming business" url={upcomingEvents.sourceDocument.url} />
          <SourceLink label="Commons divisions" url={divisions.sourceDocument.url} />
        </div>
      </section>
    </main>
  );
}

function SourceLink({ label, url }: Readonly<{ label: string; url: string }>) {
  return (
    <a
      className="flex items-center justify-between gap-4 border-t border-[var(--border)] pt-3 text-sm font-medium text-[var(--accent)] transition hover:text-[var(--accent-strong)]"
      href={url}
      rel="noreferrer"
      target="_blank"
    >
      <span>{label}</span>
      <ExternalLink aria-hidden="true" size={16} />
    </a>
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
