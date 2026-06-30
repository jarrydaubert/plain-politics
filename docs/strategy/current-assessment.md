# Current Product Assessment

Last updated: 2026-06-30

## Short Synopsis

UK Policy Explainer is a free, source-backed UK politics information tracker. It should help users understand what parties stand for, what their manifestos say, how popular they are, and what changed across polls, policies, donations, votes, and public records.

The strongest version is not a pundit, prediction engine, or campaign tool. It is a calm public reference layer over political evidence:

1. What does this party stand for?
2. What does its manifesto or official policy page say?
3. How popular is the party in public polling?
4. What changed recently?
5. Which source proves it?
6. How fresh is the evidence?
7. What evidence is missing?

## What The Repo Is Today

This is currently a planning and operating-standards repo. It contains product requirements, architecture direction, methodology, quality gates, and competitive research. It does not yet contain application code.

Not yet present:

1. `package.json`
2. Next.js app scaffold
3. Supabase schema or migrations
4. ingestion jobs
5. tests
6. CI configuration
7. deployed prototype

## What Is Already Well Specified

The trust and governance layer is stronger than a quick skim suggests.

Already specified:

1. Source tiers and required provenance fields in `docs/methodology/source-trust-framework.md`.
2. Source-reference expectations in `docs/methodology/citation-policy.md`.
3. Political neutrality standards in `docs/methodology/neutrality-standard.md`.
4. Privacy defaults, DPIA trigger points, and consent boundaries in `docs/methodology/privacy-baseline.md`.
5. Polling metadata and uncertainty rules in `docs/methodology/polling-methodology.md`.
6. Release gates and pre-build checks in `docs/quality/release-gates.md`.
7. Competitive gap and source standards in `docs/market/competitive-landscape.md`.
8. Product requirements and success metrics in `PRD_V2.md`.

The main problem is not lack of principles. The main problem is that these principles are not executable yet.

## Real Gaps

The highest-value gaps are implementation-grade specificity and proof:

1. No deployed product or working prototype.
2. No database schema, migrations, or source adapter contracts.
3. No named first source list with ingestion method, cadence, and legal/robots status.
4. No hard freshness thresholds by dataset.
5. No automated source-reference test harness.
6. No source excerpt validator.
7. No search benchmark dataset.
8. No editorial review state machine.
9. No reviewer workflow or correction UI.
10. No source panel UI showing exact source excerpts.
11. No public polling average methodology.
12. No product instrumentation plan tied to privacy constraints.

## Strategic Opportunity

The market is fragmented:

1. Polling trackers show who is up or down.
2. Parliament tools show votes, debates, and MPs.
3. Electoral Commission records show donations and political finance.
4. Fact-checkers explain selected claims.
5. Paid public-affairs tools monitor policy and stakeholders.

The opportunity is to connect those evidence streams into one free public information product.

The product should not try to be the deepest version of every category. It should be the clearest connective layer:

1. Party profiles in plain English.
2. Manifesto and policy summaries with source links.
3. Polling movement with uncertainty.
4. Donations with reporting-period context.
5. Votes and parliamentary records linked to party pages and policy areas.
6. Visible gaps where evidence is weak or missing.

## Product Bet

The killer feature is a calm, inspectable information state:

1. A user sees a party, policy, poll, vote, or donation.
2. The interface shows a plain-English summary, table, chart, or map.
3. Every material claim or datapoint links to a source.
4. Each source shows publisher, date, tier, freshness, and exact excerpt where possible.
5. If the system cannot verify something from public sources, it says so clearly.

That `cannot verify from available public sources` state should be treated as a first-class product feature, not a failure.

## Recommended First Build

Build one narrow vertical slice before expanding the full MVP.

Suggested proof-of-thesis slice:

1. One policy area, such as housing, NHS, immigration, or tax.
2. Four to five UK parties.
3. Two to three Tier 1 source types, such as manifesto pages, official party policy pages, Hansard, or Commons votes.
4. Party profile cards with plain-English source-backed summaries.
5. Compare view with coverage states.
6. Search and explainer pages over only the ingested corpus.
7. Source panel with exact excerpts.
8. Methodology page explaining source tiers, freshness, polling caveats, and uncertainty.

Polling belongs in the product vision, but it should not block Phase 0 unless source access and metadata are straightforward.

## What Would Make It Awesome

1. Every factual claim is expandable to the exact source excerpt.
2. Polling movement is shown with uncertainty, sample metadata, and fieldwork dates.
3. The dashboard distinguishes signal from noise.
4. Coverage gaps are visible and neutrally worded.
5. Users can search public political information without unsupported summaries.
6. Source freshness is visible at record and dataset level.
7. Corrections are public, dated, and linked to affected records.
8. Neutrality checks are part of QA, not an afterthought.
9. The product feels fast, clear, civic, and restrained.
10. The free public product remains distinct from lobbying or campaign workflows.

## Watch-Outs

1. Avoid starting with all PRD features at once.
2. Avoid automated prose that is not tied to reviewed structured records.
3. Avoid seat projections until methodology and uncertainty communication are solid.
4. Avoid storing political alignment signals before consent and retention are implemented.
5. Avoid broad source scraping before source trust, snapshots, and robots checks are real.
6. Avoid "who is winning" language that reads like horse-race hype without uncertainty.

## Current Strategic Read

The project is worth pursuing because the problem is not lack of political content. The problem is lack of verified, comparable, current, non-spin public information in one calm interface.

The repo has the right standards. The next milestone should turn those standards into a narrow, working proof.
