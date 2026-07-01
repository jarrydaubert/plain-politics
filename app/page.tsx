import {
  ArrowRight,
  BarChart3,
  BookOpenText,
  CalendarDays,
  Landmark,
  MapPin,
  Vote
} from "lucide-react";
import type { Route } from "next";
import Image from "next/image";
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

const beginnerTopics = [
  {
    description: "See what the main UK parties are, then open each profile as coverage grows.",
    href: "/parties",
    title: "Understand the parties"
  },
  {
    description: "Learn what words like division, sitting, recess, whip and PMQs mean.",
    href: "/glossary",
    title: "Learn the basics"
  },
  {
    description: "See Commons seats, upcoming business and recent votes in one place.",
    href: "/parliament",
    title: "See Parliament today"
  },
  {
    description: "Find your constituency, current MP, recent votes and written questions.",
    href: "/my-area",
    title: "Find my MP"
  }
] as const;

export default async function HomePage() {
  const snapshot = await getHeroSnapshot();

  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden bg-[var(--accent-strong)] text-white">
        <Image
          alt=""
          className="object-cover"
          fill
          priority
          sizes="100vw"
          src="/parliament-hero.webp"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,31,58,0.97)_0%,rgba(7,31,58,0.9)_42%,rgba(7,31,58,0.58)_74%,rgba(7,31,58,0.44)_100%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-6 py-10 sm:gap-10 sm:py-12 lg:grid-cols-[0.95fr_1.05fr] lg:py-16">
          <div className="flex max-w-3xl flex-col justify-center">
            <h1 className="text-4xl font-semibold leading-tight tracking-normal md:text-6xl">
              British politics, at a glance
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/82 sm:mt-6 sm:text-lg sm:leading-8">
              A plain-English snapshot of Parliament, parties, polls and public sources, updated as
              the evidence changes.
            </p>
            <div className="mt-7 flex flex-wrap gap-3 sm:mt-8">
              <Link
                className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-[var(--accent-strong)] transition hover:bg-[var(--surface-soft)]"
                href="/parties"
              >
                Understand the parties
                <ArrowRight aria-hidden="true" size={18} />
              </Link>
              <Link
                className="inline-flex items-center gap-2 rounded-md border border-white/34 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/18"
                href="/parliament"
              >
                See Parliament today
              </Link>
              <Link
                className="inline-flex items-center gap-2 rounded-md border border-white/24 bg-transparent px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/12"
                href="/glossary"
              >
                Learn the basics
              </Link>
            </div>
          </div>

          <div className="grid content-end gap-3 self-end lg:pt-12">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {snapshot.items.map((item, index) => (
                <SnapshotItem
                  detail={item.detail}
                  icon={item.icon}
                  isMobileSecondary={index > 3}
                  key={item.label}
                  label={item.label}
                  title={item.fullValue ?? item.value}
                  value={item.value}
                />
              ))}
            </div>
            <p className="hidden max-w-3xl text-sm leading-6 text-white/72 sm:block">
              Commons and calendar figures come from official UK Parliament APIs. Polling is shown
              only when a reviewed public source is connected.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <h2 className="text-2xl font-semibold">Start from the landscape, then go deeper.</h2>
            <p className="mt-3 max-w-xl leading-7 text-[var(--muted)]">
              Plain Politics is built for people who want the map before the maze: the parties, the
              Parliament rhythm, the terms, the sources, and then the local details.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {beginnerTopics.map((topic) => (
              <LaunchCard
                description={topic.description}
                href={topic.href}
                key={topic.href}
                title={topic.title}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-[0.75fr_1.25fr]">
        <StarterProgress />
        <div className="grid gap-5 md:grid-cols-3">
          <InfoPanel
            description="Use your postcode when you want politics to become local and concrete."
            href="/my-area"
            icon={<MapPin aria-hidden="true" size={22} />}
            title="Find your MP"
          />
          <InfoPanel
            description="Glossary entries explain the terms that make politics feel harder than it is."
            href="/glossary"
            icon={<BookOpenText aria-hidden="true" size={22} />}
            title="Decode the jargon"
          />
          <InfoPanel
            description="Upcoming business and recent votes help you follow the rhythm of Westminster."
            href="/parliament"
            icon={<CalendarDays aria-hidden="true" size={22} />}
            title="Follow what happens"
          />
        </div>
      </section>

      <section className="bg-[var(--surface-soft)]">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-12 lg:grid-cols-2">
          <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
            <h2 className="text-xl font-semibold">Popular explainers to add next</h2>
            <div className="mt-4 grid gap-3">
              {[
                "What happens at State Opening?",
                "What is PMQs?",
                "How does a general election work?",
                "What does it mean when Parliament is in recess?"
              ].map((item) => (
                <div
                  className="flex items-center justify-between border-t border-[var(--border)] pt-3"
                  key={item}
                >
                  <span className="font-medium">{item}</span>
                  <span className="text-sm text-[var(--muted)]">Planned</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
            <h2 className="text-xl font-semibold">What this site avoids</h2>
            <p className="mt-3 leading-7 text-[var(--muted)]">
              It does not predict elections, tell you how to vote, rank your politics, or pretend a
              public record proves more than it does.
            </p>
            <Link
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)]"
              href="/about"
            >
              Read more about the site
              <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function SnapshotItem({
  detail,
  icon,
  isMobileSecondary = false,
  label,
  title,
  value
}: Readonly<{
  detail: string;
  icon: ReactNode;
  isMobileSecondary?: boolean;
  label: string;
  title?: string;
  value: string;
}>) {
  return (
    <div
      className={`${
        isMobileSecondary ? "hidden sm:block" : ""
      } min-h-24 rounded-lg border border-white/28 bg-[rgba(7,31,58,0.78)] p-3 shadow-[0_18px_44px_rgba(2,8,23,0.2)] backdrop-blur-md sm:min-h-32 sm:p-4`}
    >
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-normal text-white/78">
        {icon}
        <span>{label}</span>
      </div>
      <p
        className="mt-3 text-xl font-semibold leading-tight text-white sm:mt-4 sm:text-2xl"
        title={title}
      >
        {value}
      </p>
      <p className="mt-2 hidden text-sm leading-6 text-white/82 sm:block">{detail}</p>
    </div>
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

async function getHeroSnapshot() {
  const [seatCountsResult, eventsResult, divisionsResult] = await Promise.allSettled([
    getCommonsPartySeatCounts(),
    getUpcomingParliamentEvents(7, 8),
    getRecentCommonsDivisions(1)
  ]);

  const seatCounts = getSettledData<PartySeatCount[]>(seatCountsResult);
  const events = getSettledData<ParliamentEvent[]>(eventsResult);
  const divisions = getSettledData<CommonsDivision[]>(divisionsResult);
  const checkedAt = getRetrievedAt(seatCountsResult) ?? getRetrievedAt(eventsResult);
  const topParty = seatCounts?.[0];
  const secondParty = seatCounts?.[1];
  const nextEvent = events?.[0];
  const recentDivision = divisions?.[0];

  return {
    items: [
      {
        detail: topParty
          ? `${String(topParty.total)} Commons seats from Parliament data`
          : "Waiting for official Commons data",
        icon: <Landmark aria-hidden="true" size={16} />,
        label: "Commons lead",
        value: topParty?.party.name ?? "Checking"
      },
      {
        detail: secondParty
          ? `${secondParty.party.name} is currently next by seat count`
          : "Official seat comparison pending",
        icon: <BarChart3 aria-hidden="true" size={16} />,
        label: "Commons balance",
        value:
          topParty && secondParty
            ? `${String(topParty.total)} / ${String(secondParty.total)}`
            : "Checking"
      },
      {
        detail: nextEvent
          ? formatEventDetail(nextEvent)
          : "No upcoming event returned in the next 7 days",
        icon: <CalendarDays aria-hidden="true" size={16} />,
        label: "Parliament today",
        value: nextEvent ? eventTitle(nextEvent) : "Quiet calendar"
      },
      {
        detail: recentDivision
          ? `${String(recentDivision.AyeCount)} ayes, ${String(recentDivision.NoCount)} noes`
          : "Recent division feed unavailable",
        icon: <Vote aria-hidden="true" size={16} />,
        label: "Recent vote",
        fullValue: recentDivision?.Title,
        value: recentDivision ? truncateText(recentDivision.Title, 34) : "Checking"
      },
      {
        detail: "No reviewed public polling feed is connected yet",
        icon: <BarChart3 aria-hidden="true" size={16} />,
        label: "Latest polling",
        value: "Planned"
      },
      {
        detail: checkedAt ? "UK Parliament API fetch time" : "Parliament feeds unavailable",
        icon: <CalendarDays aria-hidden="true" size={16} />,
        label: "Last checked",
        value: checkedAt ? formatUkTime(checkedAt) : "Unavailable"
      }
    ]
  };
}

function getSettledData<T>(result: PromiseSettledResult<{ data: T }>) {
  return result.status === "fulfilled" ? result.value.data : undefined;
}

function getRetrievedAt(result: PromiseSettledResult<{ sourceDocument: { retrievedAt: string } }>) {
  return result.status === "fulfilled" ? result.value.sourceDocument.retrievedAt : undefined;
}

function eventTitle(event: ParliamentEvent) {
  return truncateText(event.Category ?? event.Type ?? event.House ?? "Scheduled", 28);
}

function formatEventDetail(event: ParliamentEvent) {
  const date = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    timeZone: "Europe/London",
    weekday: "short"
  }).format(new Date(event.StartDate));
  const place = event.Location ?? event.House ?? "Parliament";

  return `${date} · ${place}`;
}

function formatUkTime(isoDate: string) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/London",
    timeZoneName: "short"
  }).format(new Date(isoDate));
}

function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength - 1).trim()}…`;
}
