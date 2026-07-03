import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { StructuredData } from "@/components/structured-data";
import {
  buildBreadcrumbJsonLd,
  buildWebPageJsonLd,
  createMetadata,
  getRouteMetadata
} from "@/lib/seo";
import {
  getCommonsMembersSample,
  getCommonsPartySeatCounts,
  getRecentCommonsDivisions,
  getUpcomingParliamentEvents,
  type SourceRecordStatus
} from "@/sources/uk-parliament";

export const dynamic = "force-dynamic";

const pageMetadata = getRouteMetadata("/parliament");

export const metadata = createMetadata(pageMetadata);

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
      <StructuredData
        data={[
          buildWebPageJsonLd(pageMetadata),
          buildBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Parliament", path: "/parliament" }
          ])
        ]}
      />
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
            <LastChecked value={seatCounts.sourceDocument.retrievedAt} />
            <SourceDataNote status={seatCounts.dataStatus} />
          </div>
          <div className="max-w-full overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <caption className="sr-only">
                Current House of Commons party seat counts by party and gender where returned
              </caption>
              <thead className="bg-[var(--surface-soft)]">
                <tr>
                  <th className="px-4 py-3 font-semibold" scope="col">
                    Party
                  </th>
                  <th className="px-4 py-3 font-semibold" scope="col">
                    Abbrev.
                  </th>
                  <th className="px-4 py-3 font-semibold" scope="col">
                    Seats
                  </th>
                  <th className="px-4 py-3 font-semibold" scope="col">
                    Male
                  </th>
                  <th className="px-4 py-3 font-semibold" scope="col">
                    Female
                  </th>
                  <th className="px-4 py-3 font-semibold" scope="col">
                    Non-binary
                  </th>
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
          <p className="mt-1 text-sm text-[var(--muted)]">
            Official UK Parliament Members API, filtered to current House of Commons members.
          </p>
          <LastChecked value={members.sourceDocument.retrievedAt} />
          <SourceDataNote status={members.dataStatus} />
        </div>
        <div className="max-w-full overflow-x-auto">
          <table className="w-full min-w-[780px] border-collapse text-left text-sm">
            <caption className="sr-only">
              Current House of Commons members sample from the official Members API
            </caption>
            <thead className="bg-[var(--surface-soft)]">
              <tr>
                <th className="px-4 py-3 font-semibold" scope="col">
                  Member
                </th>
                <th className="px-4 py-3 font-semibold" scope="col">
                  Party
                </th>
                <th className="px-4 py-3 font-semibold" scope="col">
                  Constituency
                </th>
                <th className="px-4 py-3 font-semibold" scope="col">
                  Current membership started
                </th>
              </tr>
            </thead>
            <tbody>
              {members.data.map((member) => (
                <tr className="border-t border-[var(--border)]" key={member.id}>
                  <td className="px-4 py-3 font-medium">{member.nameDisplayAs}</td>
                  <td className="px-4 py-3">{cleanText(member.latestParty.name)}</td>
                  <td className="px-4 py-3">
                    {cleanText(member.latestHouseMembership.membershipFrom)}
                  </td>
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
          <LastChecked value={upcomingEvents.sourceDocument.retrievedAt} />
          <SourceDataNote status={upcomingEvents.dataStatus} />
        </div>
        <div className="max-w-full overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-left text-sm">
            <caption className="sr-only">
              Upcoming parliamentary business from the UK Parliament calendar API
            </caption>
            <thead className="bg-[var(--surface-soft)]">
              <tr>
                <th className="px-4 py-3 font-semibold" scope="col">
                  Date
                </th>
                <th className="px-4 py-3 font-semibold" scope="col">
                  Time
                </th>
                <th className="px-4 py-3 font-semibold" scope="col">
                  House
                </th>
                <th className="px-4 py-3 font-semibold" scope="col">
                  Category
                </th>
                <th className="px-4 py-3 font-semibold" scope="col">
                  Business
                </th>
                <th className="px-4 py-3 font-semibold" scope="col">
                  Bill
                </th>
              </tr>
            </thead>
            <tbody>
              {upcomingEvents.data.map((event) => (
                <tr className="border-t border-[var(--border)]" key={event.Id}>
                  <td className="px-4 py-3">{formatDateOnly(event.StartDate)}</td>
                  <td className="px-4 py-3">{formatEventTime(event.StartTime)}</td>
                  <td className="px-4 py-3">{cleanText(event.House) ?? "-"}</td>
                  <td className="px-4 py-3">{cleanText(event.Category ?? event.Type) ?? "-"}</td>
                  <td className="px-4 py-3 font-medium">
                    {cleanText(event.Description ?? event.Type) ?? "Scheduled business"}
                  </td>
                  <td className="px-4 py-3">
                    {event.BillPageLink ? (
                      <a
                        className="font-medium text-[var(--accent)]"
                        href={event.BillPageLink}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {cleanText(event.BillName) || "Bill page"}
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
          <LastChecked value={divisions.sourceDocument.retrievedAt} />
          <SourceDataNote status={divisions.dataStatus} />
        </div>
        <div className="max-w-full overflow-x-auto">
          <table className="w-full min-w-[780px] border-collapse text-left text-sm">
            <caption className="sr-only">
              Recent House of Commons divisions from the official Commons Votes API
            </caption>
            <thead className="bg-[var(--surface-soft)]">
              <tr>
                <th className="px-4 py-3 font-semibold" scope="col">
                  Date
                </th>
                <th className="px-4 py-3 font-semibold" scope="col">
                  Division
                </th>
                <th className="px-4 py-3 font-semibold" scope="col">
                  Title
                </th>
                <th className="px-4 py-3 font-semibold" scope="col">
                  Ayes
                </th>
                <th className="px-4 py-3 font-semibold" scope="col">
                  Noes
                </th>
              </tr>
            </thead>
            <tbody>
              {divisions.data.map((division) => (
                <tr className="border-t border-[var(--border)]" key={division.DivisionId}>
                  <td className="px-4 py-3">{formatDate(division.Date)}</td>
                  <td className="px-4 py-3">{division.Number}</td>
                  <td className="px-4 py-3 font-medium">{cleanText(division.Title)}</td>
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

function LastChecked({ value }: Readonly<{ value: string }>) {
  return (
    <p className="mt-2 text-xs font-medium text-[var(--muted)]">
      Last checked {formatCheckedAt(value)}
    </p>
  );
}

function SourceDataNote({ status }: Readonly<{ status: SourceRecordStatus }>) {
  if (status.state === "fresh") {
    return null;
  }

  return (
    <p className="mt-3 rounded-md border border-[#e3c46f] bg-[#fff7d6] px-3 py-2 text-xs font-medium leading-5 text-[#755000]">
      Data note: showing the last successful check from{" "}
      {formatCheckedAt(status.lastSuccessfulCheckAt)}. Latest attempt was{" "}
      {formatCheckedAt(status.lastAttemptedCheckAt)}.
    </p>
  );
}

function formatDate(value: string) {
  if (isDefaultMidnight(value)) {
    return formatDateOnly(value);
  }

  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/London"
  }).format(new Date(value));
}

function formatDateOnly(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeZone: "Europe/London"
  }).format(new Date(value));
}

function formatCheckedAt(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/London"
  }).format(new Date(value));
}

function formatEventTime(value: string | null) {
  const time = value?.trim();

  if (!time || isMissingClockTime(time)) {
    return "Time not listed";
  }

  const timeMatch = /^(\d{1,2}):(\d{2})/.exec(time);

  if (!timeMatch) {
    return time;
  }

  const [, hours, minutes] = timeMatch;

  return `${hours.padStart(2, "0")}:${minutes}`;
}

function isDefaultMidnight(value: string) {
  return /T00:00(?::00(?:\.000)?)?(?:Z)?$/.test(value);
}

function isMissingClockTime(value: string) {
  return /^0?0:00(?::00)?$/.test(value);
}

function cleanText(value: string | null | undefined) {
  const cleaned = value?.replace(/\s+/g, " ").trim();

  return cleaned || undefined;
}
