import {
  ArrowRight,
  BookOpenCheck,
  FileText,
  Landmark,
  MapPin,
  Megaphone,
  Vote
} from "lucide-react";
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
      "Use your postcode to see your constituency, current MP and recent public records.",
    href: "/my-area",
    icon: <MapPin aria-hidden="true" size={22} />,
    number: "1",
    title: "Start where you live",
    tone: "mint"
  },
  {
    cta: "Open glossary",
    description:
      "Quick plain-English cards for the words that make politics feel harder than it is.",
    href: "/glossary",
    icon: <BookOpenCheck aria-hidden="true" size={22} />,
    number: "2",
    title: "Decode the jargon",
    tone: "sky"
  },
  {
    cta: "See Parliament",
    description: "Follow votes and upcoming business using public Parliament records.",
    href: "/parliament",
    icon: <Megaphone aria-hidden="true" size={22} />,
    number: "3",
    title: "Watch what happens",
    tone: "coral"
  }
] as const;

const starterPath = [
  {
    description: "See who represents you and how to contact them.",
    icon: <MapPin aria-hidden="true" size={19} />,
    title: "Find your MP"
  },
  {
    description: "Pick a word. Get a short, clear explanation.",
    icon: <BookOpenCheck aria-hidden="true" size={19} />,
    title: "Learn a term"
  },
  {
    description: "See how MPs voted and what the vote was about.",
    icon: <Vote aria-hidden="true" size={19} />,
    title: "Read a vote"
  },
  {
    description: "Go to the original record and read it for yourself.",
    icon: <FileText aria-hidden="true" size={19} />,
    title: "Open a record"
  }
] as const;

const normalQuestions = [
  {
    cta: "Find yours",
    description: "See your constituency and current MP before the Westminster machinery.",
    href: "/my-area",
    icon: <MapPin aria-hidden="true" size={20} />,
    question: "What does my MP actually do?"
  },
  {
    cta: "Read votes",
    description: "Open recent Commons votes, then go to the original record.",
    href: "/parliament",
    icon: <Vote aria-hidden="true" size={20} />,
    question: "Who voted for this?"
  },
  {
    cta: "Decode it",
    description: "Get the plain-English version before the deeper read.",
    href: "/glossary",
    icon: <BookOpenCheck aria-hidden="true" size={20} />,
    question: "What does this word mean?"
  },
  {
    cta: "Open receipts",
    description: "See where the public records and page facts come from.",
    href: "/sources",
    icon: <FileText aria-hidden="true" size={20} />,
    question: "Where did this come from?"
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
      <section className="relative overflow-hidden border-b border-[#d8d3c7] bg-[#fbf8ee]">
        <div className="absolute inset-x-0 top-0 h-[3px] bg-[#175bc7]" />
        <div
          aria-hidden="true"
          className="absolute left-0 top-0 hidden h-full w-40 border-r border-[#f09aa3] bg-[repeating-linear-gradient(180deg,rgba(23,91,199,0.16)_0,rgba(23,91,199,0.16)_1px,transparent_1px,transparent_28px)] opacity-70 lg:block"
        />
        <div className="relative mx-auto max-w-7xl px-6 py-10 lg:py-14">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(28rem,1.08fr)] lg:items-center">
            <div>
              <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-normal text-[#071f3a] md:text-6xl">
                British politics, without the fog.
              </h1>
              <span aria-hidden="true" className="mt-1 block h-3 w-full max-w-lg bg-[#ff767e]/55" />
              <p className="mt-7 max-w-xl text-base leading-7 text-[#24334d] sm:text-lg sm:leading-8">
                Start with where you live, decode the words people keep using, and see what
                Parliament did today.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-[#071f3a] px-5 py-3 text-sm font-semibold text-[#ffffff] shadow-[0_14px_28px_rgba(7,31,58,0.18)] transition hover:-translate-y-0.5 hover:bg-[#0d3158]"
                  href="/my-area"
                >
                  Start with my area
                  <ArrowRight aria-hidden="true" size={17} />
                </Link>
                <Link
                  className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-[#175bc7] bg-white/72 px-5 py-3 text-sm font-semibold text-[#071f3a] transition hover:-translate-y-0.5 hover:bg-white"
                  href="/glossary"
                >
                  Learn the basics
                </Link>
              </div>
              <p className="mt-6 inline-flex bg-[#dff3d5] px-3 py-1 font-mono text-sm text-[#123214]">
                No account. No pressure. You&apos;re in control.
              </p>
            </div>

            <aside className="relative overflow-hidden rounded-lg border border-[#ded7ca] bg-white/84 p-5 shadow-[0_22px_54px_rgba(7,31,58,0.12)]">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(rgba(23,91,199,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(23,91,199,0.03)_1px,transparent_1px)] bg-[length:28px_28px]"
              />
              <div className="relative">
                <div className="border-b border-[#ded7ca] pb-4">
                  <h2 className="inline bg-[#b8e5c9] px-2 text-2xl font-semibold leading-tight text-[#071f3a]">
                    Today, translated.
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-[#33425b]">
                    Live Parliament records, turned into plain English.
                  </p>
                </div>
                <div className="mt-2 divide-y divide-[#ded7ca]">
                  {snapshot.todayItems.map((item) => (
                    <TodayRow
                      detail={item.detail}
                      href={item.href}
                      icon={item.icon}
                      key={item.label}
                      label={item.label}
                      meaning={item.meaning}
                      title={item.title}
                    />
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
                  <span className="text-[#5a6678]">{snapshot.seatCountLabel}</span>
                  <Link
                    className="inline-flex items-center gap-2 font-semibold text-[#0756c7] transition hover:text-[#071f3a]"
                    href="/parliament"
                  >
                    See more in Parliament
                    <ArrowRight aria-hidden="true" size={15} />
                  </Link>
                </div>
              </div>
            </aside>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {primaryJourneys.map((topic) => (
              <JourneyCard
                cta={topic.cta}
                description={topic.description}
                href={topic.href}
                icon={topic.icon}
                key={topic.href}
                number={topic.number}
                title={topic.title}
                tone={topic.tone}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#ded7ca] bg-[#fffdf8]">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <h2 className="text-3xl font-semibold leading-tight text-[#071f3a]">
              No shame if you&apos;re starting from zero.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#536176]">
              A simple starter path. Do it in any order. Progress is saved only in this browser.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {starterPath.map((step, index) => (
                <StarterPathStep
                  description={step.description}
                  icon={step.icon}
                  key={step.title}
                  number={index + 1}
                  title={step.title}
                />
              ))}
            </div>
          </div>
          <StarterProgress compact />
        </div>
      </section>

      <section className="border-b border-[#ded7ca] bg-[#fbf8ee]">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-semibold leading-tight text-[#071f3a]">
                Start with a normal question.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#536176]">
                Politics is easier when the first step sounds like something a person would actually
                ask.
              </p>
            </div>
            <span className="max-w-48 bg-[#fff1a8] px-3 py-2 font-mono text-sm text-[#423600]">
              No stupid questions.
            </span>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {normalQuestions.map((item) => (
              <QuestionCard
                cta={item.cta}
                description={item.description}
                href={item.href}
                icon={item.icon}
                key={item.question}
                question={item.question}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
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
            <h2 className="text-xl font-semibold">Need the records?</h2>
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
      className="group grid gap-4 py-4 transition hover:bg-white/45 sm:grid-cols-[auto_minmax(0,1.1fr)_minmax(10rem,0.9fr)_auto] sm:items-center sm:px-2"
      href={href}
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#e7f1ff] text-[#071f3a]">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-xs font-semibold text-[#0756c7]">{label}</span>
        <span className="mt-1 block truncate text-sm font-semibold text-[#071f3a]" title={title}>
          {title}
        </span>
        <span className="mt-1 block truncate text-sm text-[#536176]" title={detail}>
          {detail}
        </span>
      </span>
      <span className="min-w-0">
        <span className="block text-xs font-semibold text-[#0756c7]">What it means</span>
        <span className="mt-1 block text-sm leading-5 text-[#24334d]">{meaning}</span>
      </span>
      <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#0756c7]">
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

function JourneyCard({
  cta,
  description,
  href,
  icon,
  number,
  title,
  tone
}: Readonly<{
  cta: string;
  description: string;
  href: Route;
  icon: ReactNode;
  number: string;
  title: string;
  tone: "mint" | "sky" | "coral";
}>) {
  const toneClasses = {
    coral: {
      bubble: "bg-[#ffd8d2] text-[#071f3a]",
      card: "border-[#ffaaa4] bg-[#fff8f5]",
      icon: "bg-[#ffe1dc] text-[#d82031]",
      link: "text-[#d82031]"
    },
    mint: {
      bubble: "bg-[#c6edcf] text-[#071f3a]",
      card: "border-[#96d7aa] bg-[#fbfffb]",
      icon: "bg-[#e0f5e2] text-[#0d6141]",
      link: "text-[#0d6141]"
    },
    sky: {
      bubble: "bg-[#d8ecff] text-[#071f3a]",
      card: "border-[#98c9ff] bg-[#f8fcff]",
      icon: "bg-[#e7f1ff] text-[#0756c7]",
      link: "text-[#0756c7]"
    }
  }[tone];

  return (
    <Link
      className={`group relative flex min-h-48 flex-col rounded-lg border p-5 shadow-[0_12px_28px_rgba(7,31,58,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(7,31,58,0.13)] ${toneClasses.card}`}
      href={href}
    >
      <span
        className={`absolute -left-2 -top-3 flex h-10 w-10 items-center justify-center rounded-full text-lg font-semibold ${toneClasses.bubble}`}
      >
        {number}
      </span>
      <div className="flex justify-end">
        <span
          className={`flex h-14 w-14 items-center justify-center rounded-lg ${toneClasses.icon}`}
        >
          {icon}
        </span>
      </div>
      <h3 className="mt-5 text-xl font-semibold leading-tight">{title}</h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-[var(--muted)]">{description}</p>
      <span
        className={`mt-5 inline-flex items-center gap-2 text-sm font-semibold ${toneClasses.link}`}
      >
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

function StarterPathStep({
  description,
  icon,
  number,
  title
}: Readonly<{
  description: string;
  icon: ReactNode;
  number: number;
  title: string;
}>) {
  return (
    <div className="grid min-h-32 grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-lg border border-[#ded7ca] bg-white p-4 shadow-[0_10px_24px_rgba(7,31,58,0.06)]">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#071f3a] text-sm font-semibold text-white">
        {number}
      </span>
      <div>
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#e7f1ff] text-[#0756c7]">
          {icon}
        </span>
        <h3 className="mt-3 text-sm font-semibold text-[#071f3a]">{title}</h3>
        <p className="mt-1 text-sm leading-5 text-[#536176]">{description}</p>
      </div>
    </div>
  );
}

function QuestionCard({
  cta,
  description,
  href,
  icon,
  question
}: Readonly<{
  cta: string;
  description: string;
  href: Route;
  icon: ReactNode;
  question: string;
}>) {
  return (
    <Link
      className="group flex min-h-48 flex-col rounded-lg border border-[#ded7ca] bg-white p-5 shadow-[0_10px_24px_rgba(7,31,58,0.06)] transition hover:-translate-y-0.5 hover:border-[#0756c7]"
      href={href}
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#e7f1ff] text-[#0756c7]">
        {icon}
      </span>
      <h3 className="mt-5 text-lg font-semibold leading-tight text-[#071f3a]">{question}</h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-[#536176]">{description}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#0756c7]">
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
      className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 transition hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-[var(--shadow-soft)]"
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
    seatCountLabel: totalSeats
      ? `${String(totalSeats)} Commons seats`
      : "Commons seat count unavailable",
    todayItems: [
      {
        detail: nextEvent
          ? formatEventDetail(nextEvent)
          : "No upcoming item returned in the next 7 days",
        href: "/parliament" as Route,
        icon: <Landmark aria-hidden="true" size={19} />,
        label: "Next in Parliament",
        meaning: nextEvent
          ? "A scheduled item is coming up in Parliament."
          : "The calendar did not return a next item.",
        title: nextEvent ? eventTitle(nextEvent) : "Quiet calendar"
      },
      {
        detail: recentDivision
          ? `${String(recentDivision.AyeCount)} ayes, ${String(recentDivision.NoCount)} noes`
          : "Recent division feed unavailable",
        href: "/parliament" as Route,
        icon: <Vote aria-hidden="true" size={19} />,
        label: "Recent vote",
        meaning: recentDivision
          ? "The record shows how the vote was counted."
          : "The vote feed did not return a recent result.",
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
