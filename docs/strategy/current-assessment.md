# Current Product Assessment

Last updated: 2026-06-30

## Short Synopsis

UK Policy Explainer is a free, source-backed, beginner-friendly UK politics starter and information tracker. It should help users who know little or nothing about politics start from their postcode or an issue, understand who represents them, what parties stand for, how popular they are, and what changed across polls, policies, donations, votes, and public records.

The strongest version is not a pundit, prediction engine, or campaign tool. It is a calm public reference layer over political evidence:

1. Where do I start if I know nothing about politics?
2. Who is my MP and what constituency am I in?
3. What does this party stand for?
4. What does its manifesto or official policy page say?
5. How popular is the party in public polling?
6. What changed recently?
7. Which source proves it?
8. How fresh is the evidence?
9. What evidence is missing?

## What The Repo Is Today

This is now a planning, operating-standards, and early application repo. It contains product requirements, architecture direction, methodology, quality gates, competitive research, a Bun/Next.js scaffold, a Supabase migration, tests, and the first live UK Parliament source hooks.

Now present:

1. `package.json`
2. Next.js app scaffold
3. Supabase schema migration
4. Bun test and Playwright configuration
5. Typed source contracts
6. Official UK Parliament source hooks for Commons party seats, current member samples, and recent divisions
7. Source/datapoint catalogue pages and docs

Still not yet present:

1. Deployed prototype
2. Persistent ingestion jobs
3. Database-backed rendering from Supabase
4. CI configuration
5. Editorial/reviewer UI
6. Full source excerpt drawer
7. Real manifesto or polling ingestion

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

The main problem is no longer lack of scaffolding. The main problem is turning the first live hooks into persistent ingestion, stored provenance, and user-facing source inspection.

## Real Gaps

The highest-value gaps are implementation-grade specificity and proof:

1. No deployed product yet.
2. Live hooks render in memory; they do not yet persist through Supabase.
3. No scheduled ingestion jobs.
4. No hard freshness thresholds by dataset.
5. Source-reference tests exist for schemas, but not yet for rendered pages or all public claims.
6. No source excerpt validator for parsed text spans.
7. No search benchmark dataset.
8. No editorial review state machine.
9. No reviewer workflow or correction UI.
10. Source panels show provenance metadata, but not a full evidence drawer with exact highlighted spans.
11. No public polling average implementation.
12. No product instrumentation plan tied to privacy constraints.

## Strategic Opportunity

The market is fragmented:

1. Polling trackers show who is up or down.
2. Parliament tools show votes, debates, and MPs.
3. Electoral Commission records show donations and political finance.
4. Fact-checkers explain selected claims.
5. Paid public-affairs tools monitor policy and stakeholders.

The opportunity is to connect those evidence streams into one free public information product that feels approachable for beginners and useful for people who want to go deeper.

The product should not try to be the deepest version of every category. It should be the clearest connective layer:

1. A postcode-led `my area` starting point.
2. Plain-English guided paths for beginners.
3. Light gamification that rewards learning, source-checking, and exploration.
4. Party profiles in plain English.
5. Manifesto and policy summaries with source links.
6. Polling movement with uncertainty.
7. Donations with reporting-period context.
8. Votes and parliamentary records linked to party pages and policy areas.
9. Visible gaps where evidence is weak or missing.

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

1. Postcode to constituency/current MP using a reviewed public source.
2. A beginner `Start Here` path explaining the MP, constituency, party, and one or two recent public records.
3. One policy area, such as housing, NHS, immigration, or tax.
4. Four to five UK parties.
5. Two to three Tier 1 source types, such as manifesto pages, official party policy pages, Hansard, Commons votes, or written questions.
6. Party profile cards with plain-English source-backed summaries.
7. Compare view with coverage states.
8. Search and explainer pages over only the ingested corpus.
9. Source panel with exact excerpts.
10. Methodology page explaining source tiers, freshness, polling caveats, and uncertainty.

Polling belongs in the product vision, but it should not block Phase 0 unless source access and metadata are straightforward.

## What Would Make It Awesome

1. Every factual claim is expandable to the exact source excerpt.
2. Polling movement is shown with uncertainty, sample metadata, and fieldwork dates.
3. The dashboard distinguishes signal from noise.
4. Coverage gaps are visible and neutrally worded.
5. Users can start with their postcode, learn who represents them, and understand the public record without creating an account.
6. Users can search public political information without unsupported summaries.
7. Source freshness is visible at record and dataset level.
8. Corrections are public, dated, and linked to affected records.
9. Neutrality checks are part of QA, not an afterthought.
10. The product feels fast, clear, civic, and lightly rewarding to explore.
11. The free public product remains distinct from lobbying or campaign workflows.

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
