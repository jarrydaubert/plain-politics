import { AlertCircle, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { StructuredData } from "@/components/structured-data";
import {
  buildBreadcrumbJsonLd,
  buildWebPageJsonLd,
  createMetadata,
  getRouteMetadata
} from "@/lib/seo";
import { getParliamentPageData, isPanelAvailable } from "@/parliament/page-data";
import type { SourceRecordStatus } from "@/sources/uk-parliament";

export const dynamic = "force-dynamic";

const pageMetadata = getRouteMetadata("/parliament");

export const metadata = createMetadata(pageMetadata);

export default async function ParliamentPage() {
  const parliamentData = await getParliamentPageData();
  const totalSeats = isPanelAvailable(parliamentData.seatCounts)
    ? parliamentData.seatCounts.record.data.reduce((sum, row) => sum + row.total, 0)
    : null;
  const sourceLinks = [
    isPanelAvailable(parliamentData.seatCounts)
      ? {
          label: "Party seat counts",
          url: parliamentData.seatCounts.record.sourceDocument.url
        }
      : null,
    isPanelAvailable(parliamentData.members)
      ? {
          label: "Current Commons members",
          url: parliamentData.members.record.sourceDocument.url
        }
      : null,
    isPanelAvailable(parliamentData.upcomingEvents)
      ? {
          label: "Upcoming business",
          url: parliamentData.upcomingEvents.record.sourceDocument.url
        }
      : null,
    isPanelAvailable(parliamentData.divisions)
      ? {
          label: "Commons divisions",
          url: parliamentData.divisions.record.sourceDocument.url
        }
      : null
  ].filter((item): item is { label: string; url: string } => Boolean(item));

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
            <div className="text-3xl font-semibold">
              {totalSeats === null ? "Unavailable" : totalSeats}
            </div>
            <div className="mt-1 text-sm text-[var(--muted)]">
              {totalSeats === null
                ? "Party seat count source did not return usable data"
                : "Commons seats represented in source response"}
            </div>
          </div>
        </section>

        {isPanelAvailable(parliamentData.seatCounts) ? (
          <section className="min-w-0 overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]">
            <div className="border-b border-[var(--border)] p-5">
              <h2 className="text-xl font-semibold">State of the parties</h2>
              <p className="mt-1 text-sm text-[var(--muted)]">
                Official UK Parliament Members API. Gender columns are returned by the source and
                are shown as record context, not as a judgement about representation.
              </p>
              <LastChecked value={parliamentData.seatCounts.record.sourceDocument.retrievedAt} />
              <SourceDataNote status={parliamentData.seatCounts.record.dataStatus} />
            </div>
            <div className="max-w-full overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                <caption className="sr-only">
                  Current House of Commons party seat counts from the UK Parliament Members API.
                  Columns: party name; party abbreviation; Commons seats; male MPs; female MPs;
                  non-binary MPs.
                </caption>
                <thead className="bg-[var(--surface-soft)]">
                  <tr>
                    <HeaderCell id="party-seat-party">Party name</HeaderCell>
                    <HeaderCell id="party-seat-abbreviation">Party abbreviation</HeaderCell>
                    <HeaderCell id="party-seat-total">Commons seats</HeaderCell>
                    <HeaderCell id="party-seat-male">Male MPs</HeaderCell>
                    <HeaderCell id="party-seat-female">Female MPs</HeaderCell>
                    <HeaderCell boundary={false} id="party-seat-non-binary">
                      Non-binary MPs
                    </HeaderCell>
                  </tr>
                </thead>
                <tbody>
                  {parliamentData.seatCounts.record.data.map((row) => (
                    <tr className="border-t border-[var(--border)]" key={row.party.id}>
                      <DataCell headers="party-seat-party">
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
                      </DataCell>
                      <DataCell className="text-[var(--muted)]" headers="party-seat-abbreviation">
                        {row.party.abbreviation ?? "-"}
                      </DataCell>
                      <DataCell className="font-semibold" headers="party-seat-total">
                        {row.total}
                      </DataCell>
                      <DataCell headers="party-seat-male">{row.male ?? "-"}</DataCell>
                      <DataCell headers="party-seat-female">{row.female ?? "-"}</DataCell>
                      <DataCell boundary={false} headers="party-seat-non-binary">
                        {row.nonBinary ?? "-"}
                      </DataCell>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : (
          <UnavailablePanel
            detail="The party seat count source did not return usable data. Other Parliament panels can still load."
            title="State of the parties unavailable"
          />
        )}
      </div>

      {isPanelAvailable(parliamentData.members) ? (
        <section className="mt-8 min-w-0 overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]">
          <div className="border-b border-[var(--border)] p-5">
            <h2 className="text-xl font-semibold">Current Commons members sample</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              A small source check from the official Members API, filtered to current House of
              Commons members. This is a sample, not a member search.
            </p>
            <LastChecked value={parliamentData.members.record.sourceDocument.retrievedAt} />
            <SourceDataNote status={parliamentData.members.record.dataStatus} />
          </div>
          <div className="max-w-full overflow-x-auto">
            <table className="w-full min-w-[780px] border-collapse text-left text-sm">
              <caption className="sr-only">
                Current House of Commons members sample from the official Members API. Columns:
                member name; party name; constituency; current Commons membership start date.
              </caption>
              <thead className="bg-[var(--surface-soft)]">
                <tr>
                  <HeaderCell id="current-member-name">Member name</HeaderCell>
                  <HeaderCell id="current-member-party">Party name</HeaderCell>
                  <HeaderCell id="current-member-constituency">Constituency</HeaderCell>
                  <HeaderCell boundary={false} id="current-member-start">
                    Current membership started
                  </HeaderCell>
                </tr>
              </thead>
              <tbody>
                {parliamentData.members.record.data.map((member) => (
                  <tr className="border-t border-[var(--border)]" key={member.id}>
                    <DataCell className="font-medium" headers="current-member-name">
                      {member.nameDisplayAs}
                    </DataCell>
                    <DataCell headers="current-member-party">
                      {cleanText(member.latestParty.name)}
                    </DataCell>
                    <DataCell headers="current-member-constituency">
                      {cleanText(member.latestHouseMembership.membershipFrom)}
                    </DataCell>
                    <DataCell boundary={false} headers="current-member-start">
                      {formatDateOnly(member.latestHouseMembership.membershipStartDate)}
                    </DataCell>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        <UnavailablePanel
          className="mt-8"
          detail="The current-member source did not return usable data. This does not affect the other panels."
          title="Current member sample unavailable"
        />
      )}

      {isPanelAvailable(parliamentData.upcomingEvents) ? (
        <section className="mt-8 min-w-0 overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]">
          <div className="border-b border-[var(--border)] p-5">
            <h2 className="text-xl font-semibold">Upcoming parliamentary business</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Official UK Parliament calendar API, next seven days. This shows scheduled business,
              not what the outcome will be.
            </p>
            <LastChecked value={parliamentData.upcomingEvents.record.sourceDocument.retrievedAt} />
            <SourceDataNote status={parliamentData.upcomingEvents.record.dataStatus} />
          </div>
          <div className="max-w-full overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-left text-sm">
              <caption className="sr-only">
                Upcoming parliamentary business from the UK Parliament calendar API. Columns: date;
                time; House; category; business description; bill link.
              </caption>
              <thead className="bg-[var(--surface-soft)]">
                <tr>
                  <HeaderCell id="upcoming-date">Date</HeaderCell>
                  <HeaderCell id="upcoming-time">Time</HeaderCell>
                  <HeaderCell id="upcoming-house">House</HeaderCell>
                  <HeaderCell id="upcoming-category">Category</HeaderCell>
                  <HeaderCell id="upcoming-business">Business description</HeaderCell>
                  <HeaderCell boundary={false} id="upcoming-bill">
                    Bill link
                  </HeaderCell>
                </tr>
              </thead>
              <tbody>
                {parliamentData.upcomingEvents.record.data.map((event) => (
                  <tr className="border-t border-[var(--border)]" key={event.Id}>
                    <DataCell headers="upcoming-date">{formatDateOnly(event.StartDate)}</DataCell>
                    <DataCell headers="upcoming-time">{formatEventTime(event.StartTime)}</DataCell>
                    <DataCell headers="upcoming-house">{cleanText(event.House) ?? "-"}</DataCell>
                    <DataCell headers="upcoming-category">
                      {cleanText(event.Category ?? event.Type) ?? "-"}
                    </DataCell>
                    <DataCell className="font-medium" headers="upcoming-business">
                      {cleanText(event.Description ?? event.Type) ?? "Scheduled business"}
                    </DataCell>
                    <DataCell boundary={false} headers="upcoming-bill">
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
                    </DataCell>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        <UnavailablePanel
          className="mt-8"
          detail="The parliamentary calendar source did not return usable data. Recent votes and other records may still load."
          title="Upcoming business unavailable"
        />
      )}

      {isPanelAvailable(parliamentData.divisions) ? (
        <section className="mt-8 min-w-0 overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]">
          <div className="border-b border-[var(--border)] p-5">
            <h2 className="text-xl font-semibold">Recent Commons divisions</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Official UK Parliament Commons Votes API. Divisions show how votes were counted; they
              do not explain each MP&apos;s motive by themselves.
            </p>
            <LastChecked value={parliamentData.divisions.record.sourceDocument.retrievedAt} />
            <SourceDataNote status={parliamentData.divisions.record.dataStatus} />
          </div>
          <div className="max-w-full overflow-x-auto">
            <table className="w-full min-w-[780px] border-collapse text-left text-sm">
              <caption className="sr-only">
                Recent House of Commons divisions from the official Commons Votes API. Columns:
                division date; division number; division title; ayes count; noes count.
              </caption>
              <thead className="bg-[var(--surface-soft)]">
                <tr>
                  <HeaderCell id="division-date">Division date</HeaderCell>
                  <HeaderCell id="division-number">Division number</HeaderCell>
                  <HeaderCell id="division-title">Division title</HeaderCell>
                  <HeaderCell id="division-ayes">Ayes count</HeaderCell>
                  <HeaderCell boundary={false} id="division-noes">
                    Noes count
                  </HeaderCell>
                </tr>
              </thead>
              <tbody>
                {parliamentData.divisions.record.data.map((division) => (
                  <tr className="border-t border-[var(--border)]" key={division.DivisionId}>
                    <DataCell headers="division-date">{formatDate(division.Date)}</DataCell>
                    <DataCell headers="division-number">{division.Number}</DataCell>
                    <DataCell className="font-medium" headers="division-title">
                      {cleanText(division.Title)}
                    </DataCell>
                    <DataCell headers="division-ayes">{division.AyeCount}</DataCell>
                    <DataCell boundary={false} headers="division-noes">
                      {division.NoCount}
                    </DataCell>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        <UnavailablePanel
          className="mt-8"
          detail="The Commons Votes source did not return usable data. Other Parliament records may still load."
          title="Recent divisions unavailable"
        />
      )}

      {sourceLinks.length > 0 ? (
        <section className="mt-8 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
          <h2 className="text-xl font-semibold">Official source links</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {sourceLinks.map((source) => (
              <SourceLink key={source.url} label={source.label} url={source.url} />
            ))}
          </div>
        </section>
      ) : null}
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

function UnavailablePanel({
  className,
  detail,
  title
}: Readonly<{ className?: string; detail: string; title: string }>) {
  return (
    <section
      className={`${className ?? ""} rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5`}
    >
      <div className="flex items-start gap-3">
        <AlertCircle aria-hidden="true" className="mt-1 text-[var(--danger)]" size={22} />
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{detail}</p>
        </div>
      </div>
    </section>
  );
}

function HeaderCell({
  boundary = true,
  children,
  id
}: Readonly<{
  boundary?: boolean;
  children: ReactNode;
  id: string;
}>) {
  return (
    <th className="px-4 py-3 font-semibold" id={id} scope="col">
      {children}
      {boundary ? <CrawlerBoundary /> : null}
    </th>
  );
}

function DataCell({
  boundary = true,
  children,
  className,
  headers
}: Readonly<{
  boundary?: boolean;
  children: ReactNode;
  className?: string;
  headers: string;
}>) {
  return (
    <td className={`px-4 py-3 ${className ?? ""}`} headers={headers}>
      {children}
      {boundary ? <CrawlerBoundary /> : null}
    </td>
  );
}

function CrawlerBoundary() {
  return (
    <span aria-hidden="true" className="sr-only">
      ;{" "}
    </span>
  );
}

function LastChecked({ value }: Readonly<{ value: string }>) {
  return (
    <p className="mt-2 text-xs font-medium text-[var(--muted)]">
      Checked through the app cache {formatCheckedAt(value)}. Source responses may be cached for up
      to five minutes.
    </p>
  );
}

function SourceDataNote({ status }: Readonly<{ status: SourceRecordStatus }>) {
  if (status.state === "fresh") {
    return null;
  }

  return (
    <p className="mt-3 rounded-md border border-[#e3c46f] bg-[#fff7d6] px-3 py-2 text-xs font-medium leading-5 text-[#755000]">
      Data note: showing an earlier successful copy from{" "}
      {formatCheckedAt(status.lastSuccessfulCheckAt)} after a failed check at{" "}
      {formatCheckedAt(status.lastAttemptedCheckAt)}. Durable last-good storage is not live yet.
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
