import { ArrowRight, BookOpenText, Landmark, MapPin, Scale } from "lucide-react";
import Link from "next/link";
import { EvidenceDisclosure, type EvidenceDisclosureProps } from "@/components/evidence-disclosure";
import { PageHeader } from "@/components/page-header";
import { SourceLinkList } from "@/components/source-link-list";
import { StructuredData } from "@/components/structured-data";
import { formatUkDate } from "@/lib/format";
import { buildBreadcrumbJsonLd, buildWebPageJsonLd, createMetadata } from "@/lib/seo";

const SOURCE_REVIEWED_AT = "2026-07-22T12:00:00.000Z";

const pageMetadata = {
  description:
    "Parliament and Government are connected but not the same. A plain-English, source-backed guide to what each does, who belongs to each, and what manifestos, votes, Acts and implemented policy really prove.",
  path: "/explainers/parliament-vs-government",
  title: "Parliament versus Government - Plain Politics"
} as const;

export const metadata = createMetadata(pageMetadata);

const sharedEvidence = {
  checkedAt: SOURCE_REVIEWED_AT,
  checkedAtLabel: "Editorial source review completed",
  sourceTier: "Tier 1 — official public source"
} as const;

const sources = {
  cabinetManual: {
    name: "Cabinet Office — The Cabinet Manual",
    url: "https://assets.publishing.service.gov.uk/media/5a79d5d7e5274a18ba50f2b6/cabinet-manual.pdf"
  },
  civilServiceCode: {
    name: "GOV.UK — The Civil Service Code",
    url: "https://www.gov.uk/government/publications/civil-service-code/the-civil-service-code"
  },
  electoralCommissionCampaigning: {
    name: "Electoral Commission — Campaigning",
    url: "https://www.electoralcommission.org.uk/resources/welcome-your-vote/campaigning"
  },
  electoralCommissionElections: {
    name: "Electoral Commission — UK Parliament elections",
    url: "https://www.electoralcommission.org.uk/voting-and-elections/how-elections-work/types-elections/uk-parliament"
  },
  howGovernmentWorks: {
    name: "GOV.UK — How government works",
    url: "https://www.gov.uk/government/how-government-works"
  },
  howParliamentWorks: {
    name: "UK Parliament — How Parliament works",
    url: "https://www.parliament.uk/about/how/"
  },
  legislation: {
    name: "legislation.gov.uk — Understanding legislation",
    url: "https://www.legislation.gov.uk/understanding-legislation"
  },
  parliamentAndGovernment: {
    name: "UK Parliament — Parliament and the Government",
    url: "https://www.parliament.uk/about/how/role/relations-with-other-institutions/parliament-government/"
  },
  partySystem: {
    name: "UK Parliament — MPs and political parties",
    url: "https://www.parliament.uk/about/mps-and-lords/members/partysystem/"
  }
} as const;

const comparisonRows = [
  {
    aspect: "What it is",
    government:
      "The Prime Minister, ministers and the departments they lead, supported by the Civil Service.",
    parliament: "The Commons, the Lords and the Crown, meeting to represent, decide and make law."
  },
  {
    aspect: "Main job",
    government:
      "Runs national administration, develops policy, proposes taxation and spending, and introduces much of the legislation.",
    parliament:
      "Debates issues, scrutinises the Government, approves taxation and spending, and considers legislation."
  },
  {
    aspect: "Who is in it",
    government:
      "Ministers, who are normally MPs or members of the Lords, plus impartial civil servants.",
    parliament:
      "All MPs and members of the Lords, including backbenchers and the Opposition — most of whom are not ministers."
  },
  {
    aspect: "What it produces",
    government: "Policies, departmental decisions, public services and bills it introduces.",
    parliament: "Debates, committee reports, recorded votes and, ultimately, Acts of Parliament."
  },
  {
    aspect: "How it is held to account",
    government:
      "Answerable to Parliament, which can question, scrutinise and withdraw its confidence.",
    parliament:
      "Its elected MPs answer to voters at general elections; the Lords and the Crown are not elected."
  }
] as const;

const structureGroups = [
  {
    items: [
      {
        description:
          "The elected chamber. MPs debate, scrutinise the Government and vote on legislation.",
        href: "/glossary/house-of-commons",
        name: "House of Commons"
      },
      {
        description:
          "The second chamber. Its members examine and revise legislation and question ministers.",
        href: "/glossary/house-of-lords",
        name: "House of Lords"
      },
      {
        description:
          "The formal constitutional role of the monarch: opening Parliament and giving Royal Assent.",
        href: "/glossary/crown",
        name: "The Crown"
      }
    ],
    title: "Parliament is made up of"
  },
  {
    items: [
      {
        description:
          "Members of the Government, normally MPs or members of the Lords, who lead departments and policy.",
        href: "/glossary/minister",
        name: "Ministers"
      },
      {
        description:
          "The organisations that run public administration and deliver services day to day.",
        href: null,
        name: "Departments"
      },
      {
        description:
          "Politically impartial officials who serve the government of the day, administer services and help develop and deliver lawful policy.",
        href: null,
        name: "The Civil Service"
      }
    ],
    title: "Government is made up of"
  },
  {
    items: [
      {
        description:
          "Elected to represent a constituency. Only some MPs are ministers; many are backbenchers or sit in opposition.",
        href: "/glossary/mp",
        name: "MPs"
      },
      {
        description:
          "MPs and parties that are not in government. They challenge ministers, debate bills and set out alternatives.",
        href: "/glossary/opposition",
        name: "The Opposition"
      }
    ],
    title: "People across both"
  }
] as const;

const evidenceLadder = [
  {
    doesNotProve: "That the commitment has been adopted as government policy or will happen.",
    evidence: {
      ...sharedEvidence,
      caveat:
        "A manifesto is evidence of a party's published position at an election. It is not proof that a commitment becomes government policy or law.",
      label: "Evidence for what a manifesto is",
      rawRecordContext:
        "The Electoral Commission explains that parties campaign by publishing manifestos setting out what they would do.",
      sourceName: sources.electoralCommissionCampaigning.name,
      sourceUrl: sources.electoralCommissionCampaigning.url
    },
    proves: "What a party told voters it wanted to do.",
    record: "Manifesto",
    whatItIs: "A party's published set of commitments for an election."
  },
  {
    doesNotProve: "That Parliament has agreed it, or that it has become law.",
    evidence: {
      ...sharedEvidence,
      caveat:
        "A government publication shows the Government's stated intention or analysis. It does not by itself change the law or guarantee delivery.",
      label: "Evidence for government publications",
      rawRecordContext:
        "GOV.UK explains that departments publish policy papers, plans and guidance describing what the Government intends to do.",
      sourceName: sources.howGovernmentWorks.name,
      sourceUrl: sources.howGovernmentWorks.url
    },
    proves: "The Government's stated plan, decision or analysis on a topic.",
    record: "Government publication",
    whatItIs: "A policy paper, plan or guidance published by a department."
  },
  {
    doesNotProve: "That it is law. A bill can be amended, rejected or dropped.",
    evidence: {
      ...sharedEvidence,
      caveat:
        "A bill is a proposal under consideration. It only becomes law if it passes both Houses and receives Royal Assent.",
      label: "Evidence for what a bill is",
      rawRecordContext:
        "legislation.gov.uk explains that a bill is a proposal for a law that Parliament debates before it can become an Act.",
      sourceName: sources.legislation.name,
      sourceUrl: sources.legislation.url
    },
    proves: "That a proposal is formally before Parliament.",
    record: "Bill",
    whatItIs: "A proposal for a new law, or a change to the law, before Parliament."
  },
  {
    doesNotProve: "That a new law was made. Many votes decide other questions, not legislation.",
    evidence: {
      ...sharedEvidence,
      caveat:
        "A recorded vote (division) shows how members voted on one specific question. Not every vote creates law, and it does not prove why anyone voted.",
      label: "Evidence for parliamentary votes",
      rawRecordContext:
        "UK Parliament explains that a division is a formal recorded vote on the question before the House at that moment.",
      sourceName: sources.howParliamentWorks.name,
      sourceUrl: sources.howParliamentWorks.url
    },
    proves: "How members voted on one specific question at one moment.",
    record: "Parliamentary vote",
    whatItIs: "A recorded division counted as ayes and noes."
  },
  {
    doesNotProve: "That every part of it is already in force or already affecting people.",
    evidence: {
      ...sharedEvidence,
      caveat:
        "An Act is law that has passed both Houses and received Royal Assent. Royal Assent does not mean every provision is already in force.",
      label: "Evidence for what an Act is",
      rawRecordContext:
        "legislation.gov.uk explains that an Act has completed its passage and received Royal Assent, but its provisions may commence later.",
      sourceName: sources.legislation.name,
      sourceUrl: sources.legislation.url
    },
    proves: "That Parliament has passed a law and it has received Royal Assent.",
    record: "Act",
    whatItIs: "A bill that has passed both Houses and received Royal Assent."
  },
  {
    doesNotProve: "That the whole Act is live. Provisions can commence at different times.",
    evidence: {
      ...sharedEvidence,
      caveat:
        "Commencement is when provisions come into force. This can be a set date or a later date set by regulations, not automatically at Royal Assent.",
      label: "Evidence for commencement",
      rawRecordContext:
        "legislation.gov.uk explains that provisions of an Act come into force through commencement, which may be delayed after Royal Assent.",
      sourceName: sources.legislation.name,
      sourceUrl: sources.legislation.url
    },
    proves: "When a specific provision of an Act actually takes legal effect.",
    record: "Commencement",
    whatItIs: "The point at which provisions of an Act come into force."
  },
  {
    doesNotProve:
      "That a manifesto, vote or Act alone made it happen — implementation needs its own evidence.",
    evidence: {
      ...sharedEvidence,
      caveat:
        "Implemented policy is what is actually operating in practice. Showing it needs its own evidence, separate from any promise, vote or Act.",
      label: "Evidence for implemented policy",
      rawRecordContext:
        "GOV.UK explains that departments are responsible for putting policy into practice and running the services people use.",
      sourceName: sources.howGovernmentWorks.name,
      sourceUrl: sources.howGovernmentWorks.url
    },
    proves: "That a rule or service is actually operating in practice.",
    record: "Implemented policy",
    whatItIs: "A policy that is genuinely in effect and running."
  }
] as const satisfies readonly {
  doesNotProve: string;
  evidence: EvidenceDisclosureProps;
  proves: string;
  record: string;
  whatItIs: string;
}[];

const relatedTerms = [
  { label: "Parliament", slug: "parliament" },
  { label: "Government", slug: "government" },
  { label: "House of Commons", slug: "house-of-commons" },
  { label: "House of Lords", slug: "house-of-lords" },
  { label: "The Crown", slug: "crown" },
  { label: "Minister", slug: "minister" },
  { label: "MP", slug: "mp" },
  { label: "Opposition", slug: "opposition" },
  { label: "Bill", slug: "bill" },
  { label: "Act", slug: "act" },
  { label: "Commencement", slug: "commencement" }
] as const;

const nextSteps = [
  {
    description: "Go back to the beginner map of how MPs, Parliament and Government fit together.",
    href: "/how-politics-works",
    icon: Landmark,
    label: "How UK politics works"
  },
  {
    description: "Use your postcode to find your Westminster constituency and current MP.",
    href: "/my-area",
    icon: MapPin,
    label: "Find my MP"
  },
  {
    description: "See current Commons seats, upcoming business and recent recorded votes.",
    href: "/parliament",
    icon: BookOpenText,
    label: "Open Parliament records"
  }
] as const;

const pageSources = [
  sources.parliamentAndGovernment,
  sources.howParliamentWorks,
  sources.howGovernmentWorks,
  sources.civilServiceCode,
  sources.cabinetManual,
  sources.partySystem,
  sources.electoralCommissionCampaigning,
  sources.electoralCommissionElections,
  sources.legislation
];

export default function ParliamentVsGovernmentPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <StructuredData
        data={[
          buildWebPageJsonLd(pageMetadata),
          buildBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Explainers", path: "/explainers" },
            { name: "Parliament versus Government", path: pageMetadata.path }
          ])
        ]}
      />

      <PageHeader
        backHref="/how-politics-works"
        backLabel="How UK politics works"
        eyebrow="Politics basics"
        lede="Parliament and Government are connected, but they are not the same institution. Knowing the difference is the key to reading political news: it tells you who is proposing something, who is deciding it, and what a headline actually proves."
        title="Parliament and Government: what's the difference?"
      >
        <p className="font-mono text-xs leading-5 text-[var(--muted)]">
          Evergreen explanation · Sources reviewed {formatUkDate(SOURCE_REVIEWED_AT)}
        </p>
      </PageHeader>

      <section aria-labelledby="why-heading" className="mt-10">
        <h2 className="font-serif text-3xl font-semibold" id="why-heading">
          Why the distinction matters
        </h2>
        <p className="mt-3 max-w-3xl leading-7 text-[var(--ink-soft)]">
          The Government proposes and runs things; Parliament debates, scrutinises and decides on
          laws. They share people and work closely together, but they have different jobs and are
          held to account in different ways. Treating them as one thing is the most common way a
          beginner misreads a story.
        </p>
        <EvidenceDisclosure
          {...sharedEvidence}
          caveat="This describes the constitutional relationship in plain terms. The Commons and Lords have different powers, and the Crown's role is largely formal and exercised on ministers' advice."
          label="Evidence for the distinction"
          rawRecordContext="UK Parliament explains that Parliament and the Government are separate, with Parliament representing people and scrutinising the Government, which runs the country."
          sourceName={sources.parliamentAndGovernment.name}
          sourceUrl={sources.parliamentAndGovernment.url}
        />
      </section>

      <section aria-labelledby="comparison-heading" className="mt-12">
        <h2 className="font-serif text-3xl font-semibold" id="comparison-heading">
          Parliament versus Government, side by side
        </h2>
        <p className="mt-3 max-w-3xl leading-7 text-[var(--muted)]">
          Same rows, two institutions. Read across to compare the same question for each.
        </p>

        <div className="mt-6 divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {comparisonRows.map((row) => (
            <div className="py-5" key={row.aspect}>
              <p className="font-mono text-xs font-semibold uppercase text-[var(--stop-red)]">
                {row.aspect}
              </p>
              <div className="mt-3 grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
                  <p className="text-xs font-semibold uppercase text-[var(--muted)]">Parliament</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">{row.parliament}</p>
                </div>
                <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
                  <p className="text-xs font-semibold uppercase text-[var(--muted)]">Government</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">{row.government}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-col gap-0">
          <EvidenceDisclosure
            {...sharedEvidence}
            caveat="This supports Parliament's representative, scrutiny and law-making roles. It does not claim the Commons alone is Parliament — the Lords and the Crown are also part of it."
            label="Evidence for Parliament's role"
            rawRecordContext="UK Parliament describes Parliament's roles as representing people, examining and challenging the Government, and making and shaping laws."
            sourceName={sources.howParliamentWorks.name}
            sourceUrl={sources.howParliamentWorks.url}
          />
          <EvidenceDisclosure
            {...sharedEvidence}
            caveat="This describes the UK Government at a high level. Devolved and local institutions run many services, so not every public decision belongs to the UK Government."
            label="Evidence for Government's role"
            rawRecordContext="GOV.UK explains that the Government is responsible for running the country, developing policy and delivering public services through departments led by ministers."
            sourceName={sources.howGovernmentWorks.name}
            sourceUrl={sources.howGovernmentWorks.url}
          />
        </div>
      </section>

      <section aria-labelledby="structure-heading" className="mt-12">
        <h2 className="font-serif text-3xl font-semibold" id="structure-heading">
          The parts that make up each
        </h2>
        <p className="mt-3 max-w-3xl leading-7 text-[var(--muted)]">
          A simple model of who and what belongs to each institution.
        </p>

        <div className="mt-6 grid gap-6">
          {structureGroups.map((group) => (
            <div key={group.title}>
              <h3 className="font-serif text-xl font-semibold">{group.title}</h3>
              <ul className="mt-3 grid gap-3">
                {group.items.map((item) => (
                  <li
                    className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4"
                    key={item.name}
                  >
                    <p className="font-semibold">
                      {item.href ? (
                        <Link className="text-[var(--accent)] hover:underline" href={item.href}>
                          {item.name}
                        </Link>
                      ) : (
                        item.name
                      )}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{item.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-col gap-0">
          <EvidenceDisclosure
            {...sharedEvidence}
            caveat="This supports the Civil Service's political impartiality and its duty to serve the government of the day. It is not a party-political body."
            label="Evidence for an impartial Civil Service"
            rawRecordContext="The Civil Service Code sets out that civil servants must be politically impartial and serve the elected government of the day, whichever party is in power."
            sourceName={sources.civilServiceCode.name}
            sourceUrl={sources.civilServiceCode.url}
          />
          <EvidenceDisclosure
            {...sharedEvidence}
            caveat="This supports the Opposition's distinct challenge-and-alternative role. Parliamentary scrutiny is broader than opposition activity, and backbenchers on all sides also scrutinise."
            label="Evidence for the Opposition and scrutiny"
            rawRecordContext="UK Parliament explains that parties not in government sit in opposition and scrutinise its work, while scrutiny across Parliament is wider than the Opposition alone."
            sourceName={sources.partySystem.name}
            sourceUrl={sources.partySystem.url}
          />
        </div>
      </section>

      <section aria-labelledby="overlap-heading" className="mt-12">
        <h2 className="font-serif text-3xl font-semibold" id="overlap-heading">
          Shared people, separate institutions
        </h2>
        <p className="mt-3 max-w-3xl leading-7 text-[var(--ink-soft)]">
          Ministers are normally members of the House of Commons or the House of Lords, so the same
          people sit in both Government and Parliament. But many parliamentarians are not ministers
          at all — most MPs are backbenchers or sit in opposition. Sharing some personnel does not
          make the two institutions the same: an MP acting as a minister is doing a Government job,
          and the same MP voting in the Commons is doing a Parliament job.
        </p>
        <p className="mt-3 max-w-3xl leading-7 text-[var(--ink-soft)]">
          It also explains a common myth: at a general election voters choose their local MP, not
          the Prime Minister directly. By constitutional convention, the Prime Minister is the
          person best placed to command the confidence of the House of Commons, whom the monarch
          then appoints.
        </p>
        <div className="mt-4 flex flex-col gap-0">
          <EvidenceDisclosure
            {...sharedEvidence}
            caveat="This is a constitutional convention describing where ministers usually sit. It does not mean every parliamentarian is a minister."
            label="Evidence for ministers in Parliament"
            rawRecordContext="The Cabinet Manual explains that ministers are normally drawn from, and accountable to, the House of Commons or the House of Lords."
            sourceName={sources.cabinetManual.name}
            sourceUrl={sources.cabinetManual.url}
          />
          <EvidenceDisclosure
            {...sharedEvidence}
            caveat="This is a constitutional convention, not a claim that one party must always hold a Commons majority. Coalitions and minority governments are possible."
            label="Evidence for how a Prime Minister is chosen"
            rawRecordContext="The Cabinet Manual describes Commons confidence as central to governing authority and explains that the monarch appoints as Prime Minister the person best placed to command that confidence."
            sourceName={sources.cabinetManual.name}
            sourceUrl={sources.cabinetManual.url}
          />
          <EvidenceDisclosure
            {...sharedEvidence}
            caveat="This supports the ballot-level point that a voter chooses a constituency candidate, not a Prime Minister. Government formation follows separately."
            label="Evidence for what voters elect"
            rawRecordContext="The Electoral Commission explains that a general-election voter chooses a candidate to represent their constituency in the House of Commons."
            sourceName={sources.electoralCommissionElections.name}
            sourceUrl={sources.electoralCommissionElections.url}
          />
        </div>
      </section>

      <section
        aria-labelledby="records-heading"
        className="ground-ink mt-12 rounded-lg border border-[var(--ink-border)] p-6 sm:p-8"
      >
        <p className="font-mono text-xs font-semibold uppercase text-[var(--stop-red)]">
          Evidence literacy
        </p>
        <h2 className="mt-3 font-serif text-3xl font-semibold" id="records-heading">
          What different records prove
        </h2>
        <p className="mt-3 max-w-3xl leading-7 text-[var(--muted-on-ink)]">
          A promise, a vote and a law are different kinds of evidence. Each one proves something
          specific — and does not prove the next step happened.
        </p>

        <ol className="mt-6 grid gap-3">
          {evidenceLadder.map((item, index) => (
            <li
              className="rounded-md border border-[var(--ink-border)] bg-[var(--ink-panel)] p-4"
              key={item.record}
            >
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-xs font-semibold text-[var(--focus-on-ink)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-serif text-lg font-semibold text-[var(--paper-on-ink)]">
                  {item.record}
                </h3>
              </div>
              <p className="mt-2 text-sm leading-6 text-[var(--muted-on-ink)]">{item.whatItIs}</p>
              <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-semibold uppercase text-[var(--focus-on-ink)]">
                    Proves
                  </dt>
                  <dd className="mt-1 leading-6 text-[var(--paper-on-ink)]">{item.proves}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase text-[var(--focus-on-ink)]">
                    Does not prove
                  </dt>
                  <dd className="mt-1 leading-6 text-[var(--muted-on-ink)]">{item.doesNotProve}</dd>
                </div>
              </dl>
              <EvidenceDisclosure {...item.evidence} tone="ink" />
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="terms-heading" className="mt-12">
        <h2 className="font-serif text-2xl font-semibold" id="terms-heading">
          Related glossary terms
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {relatedTerms.map((term) => (
            <Link
              className="rounded-md border border-[var(--border)] px-3 py-2 text-sm font-semibold transition hover:border-[var(--accent)]"
              href={`/glossary/${term.slug}`}
              key={term.slug}
            >
              {term.label}
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="next-heading" className="mt-12">
        <div className="flex items-start gap-3">
          <Scale aria-hidden="true" className="mt-1 text-[var(--accent)]" size={24} />
          <div>
            <h2 className="font-serif text-3xl font-semibold" id="next-heading">
              Where next?
            </h2>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              Follow the question you actually have. There is no course to complete.
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
      </section>

      <section
        aria-labelledby="sources-heading"
        className="mt-12 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5"
      >
        <h2 className="text-xl font-semibold" id="sources-heading">
          Sources for this explainer
        </h2>
        <SourceLinkList sources={pageSources} />
      </section>
    </main>
  );
}
