import { ArrowDown, ArrowRight, BookOpenText, Landmark, MapPin, SearchCheck } from "lucide-react";
import Link from "next/link";
import { EvidenceDisclosure, type EvidenceDisclosureProps } from "@/components/evidence-disclosure";
import { PageHeader } from "@/components/page-header";
import { StructuredData } from "@/components/structured-data";
import { formatUkDate } from "@/lib/format";
import {
  buildBreadcrumbJsonLd,
  buildWebPageJsonLd,
  createMetadata,
  getRouteMetadata
} from "@/lib/seo";

const pageMetadata = getRouteMetadata("/how-politics-works");

export const metadata = createMetadata(pageMetadata);

const SOURCE_REVIEWED_AT = "2026-07-22T12:00:00.000Z";

const sharedEvidence = {
  checkedAt: SOURCE_REVIEWED_AT,
  checkedAtLabel: "Editorial source review completed",
  sourceTier: "Tier 1 — official public source"
} as const;

const model = [
  {
    description: (
      <>
        At a UK general election, eligible voters in each constituency choose one candidate. The
        candidate with the most votes becomes that area&apos;s MP in the House of Commons.
      </>
    ),
    evidence: [
      {
        ...sharedEvidence,
        caveat:
          "This explains the constituency-to-MP relationship. It does not identify who currently holds your seat; use My Area for that current reference.",
        label: "Evidence for MPs and constituencies",
        rawRecordContext:
          "UK Parliament explains that eligible voters in a constituency select a candidate and that the candidate with the most votes becomes its MP.",
        sourceName: "UK Parliament — How MPs are elected",
        sourceUrl: "https://www.parliament.uk/about/mps-and-lords/members/electing-mps/"
      }
    ],
    kicker: "Representation",
    title: "Your MP and constituency"
  },
  {
    description: (
      <>
        Parliament and Government are connected, but they are not the same. Parliament includes the
        elected Commons and the House of Lords. It debates, scrutinises Government and makes laws.
      </>
    ),
    evidence: [
      {
        ...sharedEvidence,
        caveat:
          "This page keeps the first model short. The Crown also has a formal constitutional role in Parliament, and the Commons and Lords have different powers.",
        label: "Evidence for Parliament’s role",
        rawRecordContext:
          "UK Parliament distinguishes Parliament from Government and describes Parliament’s representative, scrutiny and law-making roles.",
        sourceName: "UK Parliament — Parliament and the Government",
        sourceUrl:
          "https://www.parliament.uk/about/how/role/relations-with-other-institutions/parliament-government/"
      }
    ],
    kicker: "Debate and scrutiny",
    title: "Parliament"
  },
  {
    description: (
      <>
        Government is the Prime Minister, ministers and the departments they lead, supported by
        civil servants. It runs national administration day to day and brings many policy and law
        proposals to Parliament.
      </>
    ),
    evidence: [
      {
        ...sharedEvidence,
        caveat:
          "This describes the UK Government at a high level. Devolved and local institutions are responsible for many services, so not every public decision belongs to the UK Government.",
        label: "Evidence for Government’s role",
        rawRecordContext:
          "UK Parliament describes Government as ministers supported by civil servants in departments, responsible for running the country and managing public administration.",
        sourceName: "UK Parliament — Parliament and the Government",
        sourceUrl:
          "https://www.parliament.uk/about/how/role/relations-with-other-institutions/parliament-government/"
      }
    ],
    kicker: "Executive power",
    title: "Government"
  },
  {
    description: (
      <>
        Political parties select candidates and campaign on policies. They try to win enough MPs to
        form or influence a Government; parties not in Government scrutinise it from opposition.
        Independent candidates can stand too.
      </>
    ),
    evidence: [
      {
        ...sharedEvidence,
        caveat:
          "This supports the candidate-selection point. Parties use different internal selection processes, and independent candidates can also stand.",
        label: "Evidence for party candidates",
        rawRecordContext:
          "UK Parliament explains that political parties select candidates to represent them at general elections.",
        sourceName: "UK Parliament — How MPs are elected",
        sourceUrl: "https://www.parliament.uk/about/mps-and-lords/members/electing-mps/"
      },
      {
        ...sharedEvidence,
        caveat:
          "Campaign material explains what a party or candidate wants voters to support. It is evidence of their published position, not proof that a proposal will happen.",
        label: "Evidence for party policies and campaigning",
        rawRecordContext:
          "The Electoral Commission explains that parties and candidates campaign by communicating policies and that parties publish election manifestos.",
        sourceName: "Electoral Commission — Campaigning",
        sourceUrl: "https://www.electoralcommission.org.uk/resources/welcome-your-vote/campaigning"
      },
      {
        ...sharedEvidence,
        caveat:
          "This is the usual party pattern, not a rule that one party must win a majority. More than one party may cooperate to support a Government.",
        label: "Evidence for Government and opposition parties",
        rawRecordContext:
          "UK Parliament explains that the party with the most MPs normally forms the Government, while parties outside Government sit in opposition and scrutinise its work.",
        sourceName: "UK Parliament — MPs and political parties",
        sourceUrl: "https://www.parliament.uk/about/mps-and-lords/members/partysystem/"
      }
    ],
    kicker: "Candidates and policies",
    title: "Political parties"
  },
  {
    description: (
      <>
        At a general election, voters choose an MP for their constituency. They do not directly
        elect the Prime Minister. After the result, the Sovereign appoints as Prime Minister the
        person best placed to command the confidence of the House of Commons. In plain terms, that
        person must be able to keep enough support from MPs to govern.
      </>
    ),
    evidence: [
      {
        ...sharedEvidence,
        caveat:
          "This supports the ballot-level distinction: a voter chooses a constituency candidate, not a Prime Minister. Government formation needs a separate constitutional source.",
        label: "Evidence for what voters elect",
        rawRecordContext:
          "The Electoral Commission explains that a general-election voter chooses a candidate to represent their constituency in the Commons.",
        sourceName: "Electoral Commission — UK Parliament elections",
        sourceUrl:
          "https://www.electoralcommission.org.uk/voting-and-elections/how-elections-work/types-elections/uk-parliament"
      },
      {
        ...sharedEvidence,
        caveat:
          "The confidence rule is a constitutional convention, not a claim that one party must always have a Commons majority. Coalitions and minority governments are possible.",
        label: "Evidence for Government formation",
        rawRecordContext:
          "Cabinet Manual chapter 2, paragraphs 2.7–2.10, describes Commons confidence as central to governing authority and explains the Sovereign’s appointment of a Prime Minister.",
        sourceName: "Cabinet Office — The Cabinet Manual",
        sourceUrl:
          "https://assets.publishing.service.gov.uk/media/5a79d5d7e5274a18ba50f2b6/cabinet-manual.pdf"
      }
    ],
    kicker: "Choosing representatives",
    title: "Elections and Government formation"
  }
] as const satisfies readonly {
  description: React.ReactNode;
  evidence: readonly EvidenceDisclosureProps[];
  kicker: string;
  title: string;
}[];

const flowSteps = [
  "People elect MPs",
  "MPs make up the House of Commons",
  "A Government is formed that can command the Commons",
  "Government runs departments and proposes policy",
  "Parliament debates, scrutinises and makes laws"
] as const;

const nextSteps = [
  {
    description: "Use your postcode to find your Westminster constituency and current MP.",
    href: "/my-area",
    icon: MapPin,
    label: "Find my MP"
  },
  {
    description: "See current Commons seats, upcoming business and recent recorded votes.",
    href: "/parliament",
    icon: Landmark,
    label: "Open Parliament records"
  },
  {
    description: "Look up a political word, procedure or tradition without leaving the trail.",
    href: "/glossary",
    icon: BookOpenText,
    label: "Use the glossary"
  }
] as const;

export default function HowPoliticsWorksPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <StructuredData
        data={[
          buildWebPageJsonLd(pageMetadata),
          buildBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "How UK politics works", path: "/how-politics-works" }
          ])
        ]}
      />

      <PageHeader
        backHref="/"
        className="max-w-4xl"
        eyebrow="Politics basics"
        lede="You elect an MP for your local constituency. MPs sit in the House of Commons. A Government needs the confidence of the Commons to govern. Parliament and Government are connected, but they are not the same thing."
        title="How UK politics fits together"
      >
        <p className="font-mono text-xs leading-5 text-[var(--muted)]">
          Evergreen system explanation · Sources reviewed {formatUkDate(SOURCE_REVIEWED_AT)}
        </p>
      </PageHeader>

      <section aria-labelledby="five-parts-heading" className="mt-10">
        <div className="max-w-3xl">
          <h2 className="font-serif text-3xl font-semibold" id="five-parts-heading">
            Five parts, different jobs
          </h2>
          <p className="mt-3 leading-7 text-[var(--muted)]">
            Start with the distinction, then open the evidence or follow a deeper link only when you
            need it.
          </p>
        </div>

        <div className="mt-6 divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {model.map((item, index) => (
            <article
              className="grid gap-5 py-7 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-8"
              key={item.title}
            >
              <div>
                <p className="font-mono text-xs font-semibold uppercase text-[var(--stop-red)]">
                  {String(index + 1).padStart(2, "0")} · {item.kicker}
                </p>
              </div>
              <div className="min-w-0">
                <h3 className="font-serif text-2xl font-semibold">{item.title}</h3>
                <p className="mt-3 max-w-3xl text-base leading-7 text-[var(--ink-soft)]">
                  {item.description}
                </p>
                <div className="mt-2 flex flex-col items-start gap-0">
                  {item.evidence.map((evidence) => (
                    <EvidenceDisclosure {...evidence} key={evidence.sourceName + evidence.label} />
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="simplified-flow-heading"
        className="ground-ink mt-12 rounded-lg border border-[var(--ink-border)] p-6 sm:p-8"
      >
        <div className="max-w-3xl">
          <p className="font-mono text-xs font-semibold uppercase text-[var(--stop-red)]">
            Simplified flow
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold" id="simplified-flow-heading">
            From a vote to governing
          </h2>
          <p className="mt-3 leading-7 text-[var(--muted-on-ink)]">
            This is a useful first map, not every constitutional detail. “Can command the Commons”
            matters because a majority is common, but not the only way a Government can hold
            confidence.
          </p>
        </div>

        <ol className="mt-7 grid gap-3 lg:grid-cols-5">
          {flowSteps.map((step, index) => (
            <li className="relative flex min-w-0 flex-col" key={step}>
              <div className="flex min-h-28 flex-1 flex-col rounded-md border border-[var(--ink-border)] bg-[var(--ink-panel)] p-4">
                <span className="font-mono text-xs font-semibold text-[var(--focus-on-ink)]">
                  Step {String(index + 1)}
                </span>
                <span className="mt-3 text-sm font-semibold leading-6 text-[var(--paper-on-ink)]">
                  {step}
                </span>
              </div>
              {index < flowSteps.length - 1 ? (
                <>
                  <ArrowDown
                    aria-hidden="true"
                    className="mx-auto my-1 text-[var(--focus-on-ink)] lg:hidden"
                    size={18}
                  />
                  <ArrowRight
                    aria-hidden="true"
                    className="absolute -right-3 top-12 z-10 hidden rounded-full bg-[var(--ink-bg)] text-[var(--focus-on-ink)] lg:block"
                    size={20}
                  />
                </>
              ) : null}
            </li>
          ))}
        </ol>
      </section>

      <section
        aria-labelledby="deeper-heading"
        className="mt-12 border-t border-[var(--border)] pt-8"
      >
        <h2 className="font-serif text-2xl font-semibold" id="deeper-heading">
          What this first map leaves out
        </h2>
        <p className="mt-3 max-w-4xl leading-7 text-[var(--muted)]">
          The full system also includes the House of Lords, the Crown&apos;s constitutional role,
          devolved institutions, local government, coalitions and minority governments, and several
          stages before a bill becomes law. Go deeper with the published explanations for the{" "}
          <Link className="font-semibold text-[var(--accent)]" href="/glossary/house-of-lords">
            House of Lords
          </Link>
          ,{" "}
          <Link className="font-semibold text-[var(--accent)]" href="/glossary/hung-parliament">
            hung Parliaments
          </Link>{" "}
          and{" "}
          <Link className="font-semibold text-[var(--accent)]" href="/explainers/what-is-a-bill">
            bills
          </Link>
          .
        </p>
      </section>

      <section aria-labelledby="next-heading" className="mt-12">
        <div className="flex items-start gap-3">
          <SearchCheck aria-hidden="true" className="mt-1 text-[var(--accent)]" size={24} />
          <div>
            <h2 className="font-serif text-3xl font-semibold" id="next-heading">
              Where should I go next?
            </h2>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              Choose the next question you actually have. There is no course to complete.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {nextSteps.map((step) => {
            const Icon = step.icon;

            return (
              <Link
                className="group rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 transition hover:border-[var(--record-blue)]"
                href={step.href}
                key={step.href}
              >
                <Icon aria-hidden="true" className="text-[var(--accent)]" size={22} />
                <h3 className="mt-4 font-serif text-xl font-semibold">{step.label}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{step.description}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--record-blue)]">
                  Continue
                  <ArrowRight
                    aria-hidden="true"
                    className="transition group-hover:translate-x-0.5"
                    size={15}
                  />
                </span>
              </Link>
            );
          })}
        </div>

        <p className="mt-6 text-sm leading-6 text-[var(--muted)]">
          Want to inspect how evidence is selected and maintained?{" "}
          <Link className="font-semibold text-[var(--accent)]" href="/sources">
            Browse the source directory
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
