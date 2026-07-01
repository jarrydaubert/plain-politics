import { ArrowRight, BookOpenText, CalendarDays, MapPin } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

const beginnerTopics = [
  {
    description: "Find your constituency, current MP, recent votes and written questions.",
    href: "/my-area",
    title: "Who represents me?"
  },
  {
    description: "Learn what words like division, sitting, recess, whip and PMQs mean.",
    href: "/glossary",
    title: "What does that word mean?"
  },
  {
    description: "See Commons seats, upcoming business and recent votes in one place.",
    href: "/parliament",
    title: "What is Parliament doing?"
  },
  {
    description: "Read what this site does, what it avoids, and how to report corrections.",
    href: "/methodology",
    title: "What is this site?"
  }
] as const;

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
        <div className="flex flex-col justify-center">
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-normal text-[var(--foreground)] md:text-6xl">
            Know nothing about UK politics? Start with where you live.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            Find your MP, learn the words people keep using, and see what Parliament is doing
            without needing an account or a politics degree.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              className="inline-flex items-center gap-2 rounded-md bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-strong)]"
              href="/my-area"
            >
              Start with my area
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
            <Link
              className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-sm font-semibold transition hover:border-[var(--accent)]"
              href="/glossary"
            >
              Open glossary
            </Link>
          </div>
        </div>

        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-md bg-[var(--accent)] text-white">
            <MapPin aria-hidden="true" size={23} />
          </div>
          <h2 className="mt-5 text-2xl font-semibold">A simple first route</h2>
          <div className="mt-5 grid gap-3">
            {[
              "Enter postcode",
              "Find constituency and current MP",
              "Read recent votes and questions",
              "Learn unfamiliar terms as you go"
            ].map((step, index) => (
              <div
                className="flex items-center gap-3 border-t border-[var(--border)] pt-3"
                key={step}
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-soft)] text-sm font-semibold text-[var(--accent-strong)]">
                  {index + 1}
                </span>
                <span className="text-sm font-medium">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="text-2xl font-semibold">Where do you want to start?</h2>
            <p className="mt-3 max-w-xl leading-7 text-[var(--muted)]">
              Choose a simple question. You can go deeper whenever something catches your interest.
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

      <section className="bg-[var(--surface-soft)]">
        <div className="mx-auto grid max-w-7xl gap-5 px-6 py-12 md:grid-cols-3">
          <InfoPanel
            description="Use your postcode to make politics feel less abstract."
            href="/my-area"
            icon={<MapPin aria-hidden="true" size={22} />}
            title="Start locally"
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

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-6 lg:grid-cols-2">
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
              href="/methodology"
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
