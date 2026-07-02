import { ArrowRight, BookOpenCheck, CalendarDays, Landmark, MapPin, Vote } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { StarterProgress } from "@/components/starter-progress";
import {
  type CommonsDivision,
  getCommonsPartySeatCounts,
  getRecentCommonsDivisions,
  getUpcomingParliamentEvents,
  type ParliamentEvent,
  type PartySeatCount
} from "@/sources/uk-parliament";

const primaryJourneys = [
  {
    cta: "Find my MP",
    description:
      "Use a postcode to make Westminster local: your seat, current MP and recent public records.",
    href: "/my-area",
    icon: <MapPin aria-hidden="true" size={22} />,
    label: "Local",
    title: "Start where you live",
    tone: "red"
  },
  {
    cta: "Open glossary",
    description:
      "Quick plain-English cards for the words that make politics feel harder than it is.",
    href: "/glossary",
    icon: <BookOpenCheck aria-hidden="true" size={22} />,
    label: "Basics",
    title: "Decode the jargon",
    tone: "blue"
  },
  {
    cta: "See Parliament",
    description: "Follow seats, upcoming business and recent Commons votes from public records.",
    href: "/parliament",
    icon: <Landmark aria-hidden="true" size={22} />,
    label: "Today",
    title: "Watch what happens",
    tone: "navy"
  }
] as const;

const quickReads = [
  {
    description: "The weekly Commons session where MPs question the Prime Minister.",
    href: "/glossary#traditions",
    label: "2 min",
    title: "What is PMQs?"
  },
  {
    description: "The party discipline system that shapes how MPs vote.",
    href: "/glossary#parliament",
    label: "2 min",
    title: "What does a whip do?"
  },
  {
    description: "Why some votes are called divisions, and what ayes and noes mean.",
    href: "/glossary#parliament",
    label: "3 min",
    title: "How do Commons votes work?"
  }
] as const;

export default async function HomePage() {
  const snapshot = await getHeroSnapshot();

  return (
    <main className="min-h-screen">
      <section className="border-b border-[var(--border)] bg-[linear-gradient(180deg,#ffffff_0%,var(--background)_100%)]">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(21rem,0.85fr)] lg:py-14">
          <div>
            <p className="inline-flex rounded-md bg-[var(--accent-red-soft)] px-3 py-1 text-sm font-semibold text-[var(--accent-red)]">
              Start here
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight tracking-normal text-[var(--accent-strong)] md:text-6xl">
              British politics, without the fog.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg sm:leading-8">
              Find your MP, understand the words people keep using, and see what Parliament is doing
              today.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {primaryJourneys.map((topic) => (
                <JourneyCard
                  cta={topic.cta}
                  description={topic.description}
                  href={topic.href}
                  icon={topic.icon}
                  key={topic.href}
                  label={topic.label}
                  title={topic.title}
                  tone={topic.tone}
                />
              ))}
            </div>
          </div>

          <aside className="self-start rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-soft)]">
            <div className="border-b border-[var(--border)] pb-4">
              <p className="text-xs font-semibold uppercase text-[var(--muted)]">Official feed</p>
              <div className="mt-2 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold">Today in Parliament</h2>
                  <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                    Two quick public-record pointers. The fuller table lives on the Parliament page.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-3 grid gap-1">
              {snapshot.todayItems.map((item) => (
                <TodayRow
                  detail={item.detail}
                  href={item.href}
                  icon={item.icon}
                  key={item.label}
                  label={item.label}
                  title={item.title}
                />
              ))}
            </div>
            <dl className="mt-5 grid gap-3 border-t border-[var(--border)] pt-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="font-semibold">Commons seats</dt>
                <dd className="mt-1 text-[var(--muted)]">{snapshot.seatCountLabel}</dd>
              </div>
              <div>
                <dt className="font-semibold">Source</dt>
                <dd className="mt-1 text-[var(--muted)]">UK Parliament</dd>
              </div>
            </dl>
            <Link
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] transition hover:text-[var(--accent-strong)]"
              href="/parliament"
            >
              Open Parliament view
              <ArrowRight aria-hidden="true" size={15} />
            </Link>
          </aside>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-[0.78fr_1.22fr]">
        <StarterProgress />
        <div>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Quick explainers</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">
                Short, plain-English reads for the moments when politics starts throwing new words
                at you.
              </p>
            </div>
            <Link
              className="hidden text-sm font-semibold text-[var(--accent)] transition hover:text-[var(--accent-strong)] sm:inline-flex"
              href="/glossary"
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
            <h2 className="text-xl font-semibold">Want the serious detail?</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              Sources, limits and corrections are there when you want them, without getting in the
              way of the first read.
            </p>
          </div>
          <Link
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)]"
            href="/about"
          >
            How Plain Politics works
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
  title
}: Readonly<{
  detail: string;
  href: Route;
  icon: ReactNode;
  label: string;
  title: string;
}>) {
  return (
    <Link
      className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-md px-2 py-3 transition hover:bg-[var(--surface-soft)]"
      href={href}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[var(--accent-soft)] text-[var(--accent-strong)]">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-xs font-semibold uppercase text-[var(--muted)]">{label}</span>
        <span
          className="mt-0.5 block truncate text-sm font-semibold text-[var(--foreground)]"
          title={title}
        >
          {title}
        </span>
        <span className="mt-1 block truncate text-sm text-[var(--muted)]" title={detail}>
          {detail}
        </span>
      </span>
      <ArrowRight
        aria-hidden="true"
        className="text-[var(--muted)] transition group-hover:translate-x-0.5 group-hover:text-[var(--accent)]"
        size={16}
      />
    </Link>
  );
}

function JourneyCard({
  cta,
  description,
  href,
  icon,
  label,
  title,
  tone
}: Readonly<{
  cta: string;
  description: string;
  href: Route;
  icon: ReactNode;
  label: string;
  title: string;
  tone: "red" | "blue" | "navy";
}>) {
  const toneClass = {
    blue: "bg-[#e6f5ff] text-[var(--accent-strong)]",
    navy: "bg-[var(--accent-soft)] text-[var(--accent-strong)]",
    red: "bg-[var(--accent-red-soft)] text-[var(--accent-red)]"
  }[tone];

  return (
    <Link
      className="group flex min-h-52 flex-col rounded-lg border border-[var(--border)] bg-[var(--surface-pop)] p-5 transition hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-[var(--shadow-soft)]"
      href={href}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-semibold uppercase text-[var(--muted)]">{label}</span>
        <span className={`flex h-10 w-10 items-center justify-center rounded-md ${toneClass}`}>
          {icon}
        </span>
      </div>
      <h3 className="mt-5 text-xl font-semibold leading-tight">{title}</h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-[var(--muted)]">{description}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)]">
        {cta}
        <ArrowRight
          aria-hidden="true"
          className="transition group-hover:translate-x-0.5"
          size={16}
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
      className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 transition hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-[var(--shadow-soft)]"
      href={href}
    >
      <span className="inline-flex rounded-md bg-[var(--surface-soft)] px-2.5 py-1 font-mono text-xs font-semibold text-[var(--muted)]">
        {label}
      </span>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
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

  return {
    seatCountLabel: totalSeats ? `${String(totalSeats)} in source response` : "Checking feed",
    todayItems: [
      {
        detail: nextEvent
          ? formatEventDetail(nextEvent)
          : "No upcoming item returned in the next 7 days",
        href: "/parliament" as Route,
        icon: <CalendarDays aria-hidden="true" size={17} />,
        label: "Next up",
        title: nextEvent ? eventTitle(nextEvent) : "Quiet calendar"
      },
      {
        detail: recentDivision
          ? `${String(recentDivision.AyeCount)} ayes, ${String(recentDivision.NoCount)} noes`
          : "Recent division feed unavailable",
        href: "/parliament" as Route,
        icon: <Vote aria-hidden="true" size={17} />,
        label: "Recent vote",
        title: recentDivision ? truncateText(recentDivision.Title, 48) : "Checking recent votes"
      }
    ]
  };
}

function getSettledRecord<T>(
  result: PromiseSettledResult<{ data: T; sourceDocument: { retrievedAt: string } }>
) {
  return result.status === "fulfilled" ? result.value : undefined;
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
