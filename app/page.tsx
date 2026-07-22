import { ArrowRight, Landmark, Vote } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { EvidenceDisclosure, type EvidenceDisclosureProps } from "@/components/evidence-disclosure";
import { StructuredData } from "@/components/structured-data";
import { formatUkDate, formatUkDateTime, maxIsoDate } from "@/lib/format";
import { buildWebPageJsonLd, createMetadata, getRouteMetadata } from "@/lib/seo";
import { cleanOptionalText } from "@/lib/text";
import {
  type CommonsDivision,
  getCommonsPartySeatCounts,
  getRecentCommonsDivisions,
  getUpcomingParliamentEvents,
  PARLIAMENT_SOURCE_REVALIDATE_SECONDS,
  type ParliamentEvent,
  type PartySeatCount,
  type SourceRecord
} from "@/sources/uk-parliament";
import { commonsDivisionRecordUrl } from "@/sources/upstream-endpoints";

const pageMetadata = getRouteMetadata("/");

export const metadata = createMetadata(pageMetadata);

const primaryJourneys = [
  {
    cta: "Find my MP",
    description: "Postcode to constituency, MP and public records.",
    href: "/my-area",
    number: "01",
    title: "Start where you live"
  },
  {
    cta: "Open glossary",
    description: "Plain-English cards for the words people keep using.",
    href: "/glossary",
    number: "02",
    title: "Decode the jargon"
  },
  {
    cta: "See Parliament",
    description: "Votes and upcoming business from public records.",
    href: "/parliament",
    number: "03",
    title: "Watch what happens"
  }
] as const;

const normalQuestions = [
  {
    cta: "See the map",
    description: "Distinguish your MP, Parliament, Government, parties and elections.",
    eyebrow: "Start here",
    href: "/how-politics-works",
    question: "How does UK politics fit together?"
  },
  {
    cta: "Read votes",
    description: "Open recent Commons votes, then go to the original record.",
    eyebrow: "Commons votes",
    href: "/parliament",
    question: "Who voted for this?"
  },
  {
    cta: "Decode it",
    description: "Get the plain-English version before the deeper read.",
    eyebrow: "Plain English",
    href: "/glossary",
    question: "What does this word mean?"
  },
  {
    cta: "Open receipts",
    description: "See where the public records and page facts come from.",
    eyebrow: "Public records",
    href: "/sources",
    question: "Where did this come from?"
  }
] as const;

const quickReads = [
  {
    description: "The weekly Commons session where MPs question the Prime Minister.",
    href: "/explainers/what-is-pmqs" as Route,
    label: "2 min",
    title: "What is PMQs?"
  },
  {
    description: "The party discipline system that shapes how MPs vote.",
    href: "/explainers/what-does-a-whip-do" as Route,
    label: "2 min",
    title: "What does a whip do?"
  },
  {
    description: "Why some votes are called divisions, and what ayes and noes mean.",
    href: "/explainers/how-commons-votes-work" as Route,
    label: "3 min",
    title: "How do Commons votes work?"
  }
] as const;

export default async function HomePage() {
  const snapshot = await getHeroSnapshot();

  return (
    <main className="min-h-screen">
      <StructuredData data={buildWebPageJsonLd(pageMetadata)} />
      <section className="ground-ink relative border-b border-[var(--border)]">
        <div className="absolute inset-x-0 top-0 h-[3px] bg-[var(--stop-red)]" />
        <div className="mx-auto max-w-7xl px-6 py-12 lg:py-14">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(30rem,1.18fr)] lg:items-center">
            <div>
              <h1 className="max-w-3xl font-serif text-4xl font-semibold leading-[1.05] text-[var(--paper-on-ink)] sm:text-5xl md:text-6xl">
                British politics, without the fog
                <span className="text-[var(--stop-red)]">.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-[var(--muted-on-ink)] sm:text-lg">
                Start with where you live, decode the words people keep using, and see what
                Parliament did today.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  className="inline-flex min-h-12 items-center gap-2 rounded-md bg-[var(--paper-on-ink)] px-5 py-3 text-sm font-semibold text-[var(--ink-bg)] transition hover:brightness-95"
                  href="/my-area"
                >
                  Start with my area
                  <ArrowRight aria-hidden="true" size={17} />
                </Link>
                <Link
                  className="inline-flex min-h-12 items-center gap-2 rounded-md border border-[var(--ink-border)] px-5 py-3 text-sm font-semibold text-[var(--paper-on-ink)] transition hover:bg-[var(--ink-panel)]"
                  href="/how-politics-works"
                >
                  Learn the basics
                </Link>
              </div>
              <p className="mt-5 font-mono text-sm text-[var(--muted-on-ink)]">
                No account. No pressure. You&apos;re in control
                <span className="text-[var(--stop-red)]">.</span>
              </p>
            </div>

            <aside className="rounded-lg border border-[var(--ink-border)] bg-[var(--ink-panel)] p-5 sm:p-6">
              <div>
                <div className="border-b border-[var(--ink-border)] pb-5">
                  <h2 className="font-serif text-2xl font-semibold leading-tight text-[var(--paper-on-ink)]">
                    Today, translated
                    <span className="text-[var(--stop-red)]">.</span>
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted-on-ink)]">
                    Live Parliament records, turned into plain English.
                  </p>
                  {snapshot.checkedAt ? (
                    <p className="mt-3 font-mono text-xs leading-5 text-[var(--muted-on-ink)]">
                      Checked through the app cache {formatUkDateTime(snapshot.checkedAt)}. Source
                      responses may be cached for up to{" "}
                      {formatCacheWindow(PARLIAMENT_SOURCE_REVALIDATE_SECONDS)}.
                    </p>
                  ) : null}
                  {snapshot.dataNote ? (
                    <p className="mt-3 rounded-md border border-[var(--warn-border)] bg-[var(--warn-bg)] px-3 py-2 text-xs font-medium leading-5 text-[var(--warn-ink)]">
                      {snapshot.dataNote}
                    </p>
                  ) : null}
                </div>
                <div className="mt-2 divide-y divide-[var(--ink-border)]">
                  {snapshot.todayItems.map((item) => (
                    <div key={item.label}>
                      <TodayRow
                        detail={item.detail}
                        href={item.href}
                        icon={item.icon}
                        label={item.label}
                        meaning={item.meaning}
                        title={item.title}
                      />
                      {item.evidence ? (
                        <div className="-mt-1 pb-4 sm:px-2">
                          <EvidenceDisclosure
                            {...item.evidence}
                            label="Evidence for this vote"
                            tone="ink"
                          />
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
                  <span className="font-mono text-xs text-[var(--muted-on-ink)]">
                    {snapshot.seatCountLabel}
                  </span>
                  <Link
                    className="inline-flex items-center gap-2 font-semibold text-[var(--focus-on-ink)] transition hover:text-[var(--paper-on-ink)]"
                    href="/parliament"
                  >
                    See more in Parliament
                    <ArrowRight aria-hidden="true" size={15} />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-serif text-3xl font-semibold leading-tight">
              Start with a normal question.
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">
              Politics is easier when the first step sounds like something a person would actually
              ask.
            </p>
          </div>
          <p className="font-mono text-sm text-[var(--muted)]">
            No stupid questions<span className="text-[var(--stop-red)]">.</span>
          </p>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {normalQuestions.map((item) => (
            <EditorialCard
              cta={item.cta}
              description={item.description}
              eyebrow={item.eyebrow}
              href={item.href}
              key={item.question}
              title={item.question}
            />
          ))}
        </div>

        <div className="mt-8 grid gap-4 border-t border-[var(--border)] pt-8 md:grid-cols-3">
          {primaryJourneys.map((journey) => (
            <EditorialCard
              cta={journey.cta}
              description={journey.description}
              eyebrow={`Route ${journey.number}`}
              href={journey.href}
              key={journey.href}
              title={journey.title}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl border-t border-[var(--border)] px-6 py-12">
        <div>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl font-semibold">Quick explainers</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">
                Short, plain-English reads for the moments when politics starts throwing new words
                at you.
              </p>
            </div>
            <Link
              className="hidden text-sm font-semibold text-[var(--accent)] transition hover:text-[var(--accent-strong)] sm:inline-flex"
              href="/explainers"
            >
              View all
            </Link>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {quickReads.map((read) => (
              <QuickReadCard
                description={read.description}
                href={read.href}
                key={read.title}
                label={read.label}
                title={read.title}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--border)] bg-[var(--surface-soft)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-serif text-xl font-semibold">Need the records?</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              Record links, limits and corrections are there when you want them, without getting in
              the way of the first read.
            </p>
          </div>
          <Link
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)]"
            href="/about"
          >
            How Plain Politics handles records
            <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}

function TodayRow({
  detail,
  href,
  icon,
  label,
  meaning,
  title
}: Readonly<{
  detail: string;
  href: Route;
  icon: ReactNode;
  label: string;
  meaning: string;
  title: string;
}>) {
  return (
    <Link
      className="group grid gap-3 rounded-md py-4 transition hover:bg-[var(--ink-bg)] sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center sm:px-2"
      href={href}
    >
      <span className="flex h-8 w-8 items-center justify-center text-[var(--focus-on-ink)]">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-xs font-semibold text-[var(--focus-on-ink)]">{label}</span>
        <span className="mt-1 block text-sm font-semibold text-[var(--paper-on-ink)]" title={title}>
          {title}
        </span>
        <span className="mt-1 block font-mono text-xs text-[var(--muted-on-ink)]" title={detail}>
          {detail}
        </span>
        <span className="mt-2 block text-sm leading-5 text-[var(--muted-on-ink)]">
          <span className="font-semibold text-[var(--paper-on-ink)]">What it means: </span>
          {meaning}
        </span>
      </span>
      <span className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--focus-on-ink)]">
        Open record
        <ArrowRight
          aria-hidden="true"
          className="transition group-hover:translate-x-0.5"
          size={15}
        />
      </span>
    </Link>
  );
}

function EditorialCard({
  cta,
  description,
  eyebrow,
  href,
  title
}: Readonly<{
  cta: string;
  description: string;
  eyebrow: string;
  href: Route;
  title: string;
}>) {
  return (
    <Link
      className="group flex min-h-44 flex-col rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 transition hover:border-[var(--record-blue)]"
      href={href}
    >
      <span className="font-mono text-xs font-semibold uppercase text-[var(--stop-red)]">
        {eyebrow}
      </span>
      <h3 className="mt-4 font-serif text-xl font-semibold leading-tight text-[var(--foreground)]">
        {title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-[var(--muted)]">{description}</p>
      <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--record-blue)]">
        {cta}
        <ArrowRight
          aria-hidden="true"
          className="transition group-hover:translate-x-0.5"
          size={15}
        />
      </span>
    </Link>
  );
}

function QuickReadCard({
  description,
  href,
  label,
  title
}: Readonly<{
  description: string;
  href: Route;
  label: string;
  title: string;
}>) {
  return (
    <Link
      className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 transition hover:border-[var(--accent)]"
      href={href}
    >
      <span className="inline-flex rounded-md bg-[var(--surface-soft)] px-2.5 py-1 font-mono text-xs font-semibold text-[var(--muted)]">
        {label}
      </span>
      <h3 className="mt-4 font-serif text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{description}</p>
    </Link>
  );
}

async function getHeroSnapshot() {
  const [seatCountsResult, eventsResult, divisionsResult] = await Promise.allSettled([
    getCommonsPartySeatCounts(),
    getUpcomingParliamentEvents(7, 8),
    getRecentCommonsDivisions(1)
  ]);

  const seatCountsRecord = getSettledRecord<PartySeatCount[]>(seatCountsResult);
  const eventsRecord = getSettledRecord<ParliamentEvent[]>(eventsResult);
  const divisionsRecord = getSettledRecord<CommonsDivision[]>(divisionsResult);
  const seatCounts = seatCountsRecord?.data;
  const events = eventsRecord?.data;
  const divisions = divisionsRecord?.data;
  const totalSeats = seatCounts?.reduce((sum, row) => sum + row.total, 0);
  const nextEvent = events?.[0];
  const recentDivision = divisions?.[0];
  const staleRecords = [seatCountsRecord, eventsRecord, divisionsRecord].filter(
    (record) => record?.dataStatus.state === "stale"
  );
  const checkedAt = maxIsoDate(
    [seatCountsRecord, eventsRecord, divisionsRecord]
      .map((record) => record?.sourceDocument.retrievedAt)
      .filter((value): value is string => Boolean(value))
  );
  const recentVoteEvidence: Omit<EvidenceDisclosureProps, "label" | "tone"> | null =
    divisionsRecord && recentDivision
      ? {
          caveat:
            "A division records how votes were counted on one question in the Commons. It does not by itself explain why an MP voted that way, or what happens to the issue next.",
          checkedAt: divisionsRecord.sourceDocument.retrievedAt,
          rawRecordContext: `Division ${String(recentDivision.Number)} on ${formatUkDate(recentDivision.Date)}: ${String(recentDivision.AyeCount)} ayes and ${String(recentDivision.NoCount)} noes, as returned by the source API.`,
          sourceName: divisionsRecord.sourceDocument.publisher,
          sourceUrl: commonsDivisionRecordUrl(recentDivision.DivisionId)
        }
      : null;

  return {
    checkedAt,
    dataNote:
      staleRecords.length > 0
        ? "Data note: showing an earlier successful copy of the data for one or more live panels. Durable last-good storage is not live yet."
        : null,
    seatCountLabel: totalSeats
      ? `${String(totalSeats)} Commons seats`
      : "Commons seat count unavailable",
    todayItems: [
      {
        detail: nextEvent
          ? formatEventDetail(nextEvent)
          : "No upcoming item returned in the next 7 days",
        evidence: null,
        href: "/parliament" as Route,
        icon: <Landmark aria-hidden="true" size={19} />,
        label: "Next in Parliament",
        meaning: nextEvent ? eventMeaning(nextEvent) : "The calendar did not return a next item.",
        title: nextEvent ? eventTitle(nextEvent) : "Quiet calendar"
      },
      {
        detail: recentDivision
          ? `${String(recentDivision.AyeCount)} ayes, ${String(recentDivision.NoCount)} noes`
          : "Recent division feed unavailable",
        evidence: recentVoteEvidence,
        href: "/parliament" as Route,
        icon: <Vote aria-hidden="true" size={19} />,
        label: "Recent vote",
        meaning: recentDivision
          ? divisionMeaning(recentDivision)
          : "The vote feed did not return a recent result.",
        title: recentDivision ? truncateText(recentDivision.Title, 48) : "Checking recent votes"
      }
    ]
  };
}

function getSettledRecord<T>(result: PromiseSettledResult<SourceRecord<T>>) {
  return result.status === "fulfilled" ? result.value : undefined;
}

function eventMeaning(event: ParliamentEvent) {
  const house = cleanOptionalText(event.House ?? event.LeadHouse) ?? "Parliament";
  const category = cleanOptionalText(event.Category ?? event.Type) ?? "business";

  return `${house} has ${category.toLowerCase()} scheduled. The listing is a timetable record, not an outcome.`;
}

function divisionMeaning(division: CommonsDivision) {
  if (division.AyeCount > division.NoCount) {
    return `The Aye side had more votes in this recorded division: ${String(division.AyeCount)} to ${String(division.NoCount)}.`;
  }

  if (division.NoCount > division.AyeCount) {
    return `The No side had more votes in this recorded division: ${String(division.NoCount)} to ${String(division.AyeCount)}.`;
  }

  return `The recorded vote was tied at ${String(division.AyeCount)} votes each side.`;
}

function formatCacheWindow(seconds: number) {
  if (seconds % 60 === 0) {
    return `${String(seconds / 60)} minutes`;
  }

  return `${String(seconds)} seconds`;
}

function eventTitle(event: ParliamentEvent) {
  return truncateText(event.Category ?? event.Type ?? event.House ?? "Scheduled business", 48);
}

function formatEventDetail(event: ParliamentEvent) {
  const date = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    timeZone: "Europe/London",
    weekday: "short"
  }).format(new Date(event.StartDate));
  const place = event.Location ?? event.House ?? "Parliament";

  return `${date} - ${place}`;
}

function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength - 1).trim()}...`;
}
