# Plain Politics v2 Product Requirements

Last updated: 2026-07-06

## 1) Product Objective

Build a neutral, source-first, beginner-friendly UK politics information tracker that helps users understand political basics, start from their postcode or an issue, see who represents them, what parties stand for, how popular they are, and how public political evidence changes over time.

The product is informational only. It uses public sources, structured data, plain-English editorial/template summaries, charts, maps, tables, and source links.

## 2) Problem Statement

Political information is fragmented across polling trackers, official publications, parliamentary records, donor registers, party websites, and media summaries. Many users also do not know the vocabulary or where to start. Users need one clear place to begin locally, understand parties, policies, popularity, donations, votes, and events in plain English with visible sources and freshness.

## 3) Target Users

1. Politics beginners and general voters.
2. Journalists and researchers.
3. Civics educators and students.
4. Policy professionals.

## 4) Jobs To Be Done

1. Start with my postcode and understand my constituency, current MP, and their public parliamentary record.
2. Learn political basics in plain English without being talked down to.
3. Understand what each party stands for in plain English.
4. Compare party positions by issue.
5. Read manifesto and policy summaries with links to originals.
6. Track polling movement and popularity without mistaking noise for certainty.
7. Understand who funds parties and when.
8. Check relevant votes, bills, debates, and public records.
9. See upcoming political events.
10. Export or share verified information with source links.

## 5) Scope

v1.0.0 barebones public launch:

1. Public Vercel deployment with Cloudflare DNS/domain and email aliases.
2. Home orientation page with a clear starting route, live Parliament panel, and beginner questions.
3. Postcode `my area` starter for constituency, current MP, and public parliamentary record.
4. Political glossary and core civic traditions.
5. Parliament tracker for selected live records.
6. Methodology, sources, visible limits, and correction/contact route.
7. Geographic scope: UK national public institutional sources where free/public access is available.

Post-v1 product scope:

1. Home orientation page with a clear starting route and live public-record context.
2. Postcode `my area` starter for constituency, current MP, and public parliamentary record.
3. Party profiles.
4. Polling and momentum tracker.
5. Compare view.
6. Policies and manifesto tracker.
7. Money and donor explorer.
8. Parliament tracker for selected votes, bills, and debates.
9. Calendar of key political events.
10. Anonymous-first alignment quiz or civic knowledge check, if retained.
11. Methodology and sources.
12. Geographic scope: UK national parties and UK public institutional sources for v1.

## 6) Out Of Scope

1. Election outcome prediction.
2. Tactical voting recommendations.
3. Campaign persuasion tooling.
4. Micro-targeted political advertising.
5. User accounts for v1.0.0.
6. Native mobile app.
7. Gamified persuasion, ideological scoring, or mechanics that nudge users toward a party.
8. Party policy comparison, manifesto ingestion, polling averages, donations, and alignment scoring for v1.0.0.

## 7) Compliance and Privacy Requirements

1. Use only public-facing sources.
2. Treat identifiable data as personal data even if public.
3. Keep the quiz anonymous by default.
4. Do not store political alignment without explicit consent.
5. Complete DPIA before enabling personalised profiling.
6. Provide access, deletion, correction, and export workflows before storing optional user data.
7. Publish lawful basis and retention policy in the privacy notice.
8. Prefer privacy-preserving analytics patterns.

## 8) Information Product Rules

1. Every factual page, table, chart, map, and summary must link back to public sources.
2. Plain-English summaries must be editorially written or template-rendered from structured records.
3. Missing or weak evidence must be shown as a coverage gap.
4. `Cannot verify from available public sources` is a first-class product state.
5. Source freshness must be visible where it affects interpretation.
6. Users must be able to reach the original public record from each material claim, figure, or datapoint.
7. Gamified flows must reward learning, source-checking, and exploration, never party preference or ideological movement.
8. Postcode lookups should be anonymous by default and should not imply local impact unless a source directly supports the local claim.

## 9) Success Metrics

Primary decision metrics:

1. Source-link click-through rate on evidence-backed pages.
2. Source coverage rate by party and policy area.
3. Freshness SLA adherence by dataset type.
4. Polling metadata completeness rate.
5. Return rate.

Secondary diagnostics:

1. WAU/MAU ratio.
2. Quiz engagement rate, if quiz remains in scope.
3. Privacy request SLA within policy threshold.
4. Correction rate and correction turnaround.
5. User trust signal: `this page was well sourced`.

## 10) Launch Gates

1. Data pipelines pass freshness checks.
2. Source-reference validation passes for public pages.
3. Security and abuse controls are enabled.
4. Legal sign-off is complete for privacy notice and DPIA scope.
5. Editorial sign-off is complete for neutrality and source standards.
6. Closed beta is completed with critical issues triaged.

## 11) Recommended Technical Baseline

1. Frontend: Next.js App Router with TypeScript.
2. UI: Tailwind CSS and accessible component primitives.
3. Data: Supabase Postgres as system of record.
4. Validation: Zod for source contracts and parsed records.
5. Ingestion: scheduled TypeScript jobs using official APIs, public data downloads, compliant scraping, or manual curation fallback.
6. Search: Postgres full-text search and structured filters.
7. Visualisation: chart and map libraries for tables, bars, trends, and constituency/geographic views.
8. Deployment: Vercel for web runtime and previews; GitHub Actions, Vercel Cron, or scheduled jobs for ingestion; Cloudflare for domain/DNS and email routing.
9. Observability: ingestion job logs, freshness monitors, parser drift checks, and broken-link checks.
10. Testing: Bun test or Vitest, Playwright, Biome, and source-reference validation.

## 12) Source Trust Framework

1. Tier 1 authoritative primary: legislation/parliament records, official party publications, Electoral Commission, GOV.UK.
2. Tier 2 institutional public: ONS, NAO, committee reports, regulator publications.
3. Tier 3 secondary context: major publishers or research organisations for context when primary evidence is unavailable.
4. Blocked by default: anonymous blogs, unverifiable social posts, unsupported domains, and sources with unclear provenance.
5. Pages and summaries must prefer the highest available source tier.
6. Polling records should store British Polling Council-style disclosure metadata where available: pollster, client, fieldwork dates, sample size, population, method, geography, question wording, and full tables link.

## 13) Canonical Data Model And Provenance

Core entities:

1. `Party`
2. `PartyProfile`
3. `PolicyArea`
4. `PolicyPosition`
5. `Manifesto`
6. `SourceDocument`
7. `SourceSnapshot`
8. `SourceExcerpt`
9. `SourceReference`
10. `DisplayFact`
11. `Donation`
12. `Event`
13. `VoteRecord`
14. `Bill`
15. `DebateRecord`
16. `Poll`
17. `PollResult`
18. `Pollster`
19. `PollingAverage`
20. `Constituency`
21. `IngestionRun`
22. `ParserVersion`

Required provenance fields for factual records:

1. `source_url`
2. `source_type`
3. `source_publisher`
4. `retrieved_at`
5. `published_at` when available
6. `content_hash`
7. `extract_method`
8. `source_excerpt_id`
9. `source_tier`
10. `parser_version`

The core provenance chain is:

`source_document -> source_snapshot -> source_excerpt -> display_fact/chart_datapoint/table_row`

## 14) Freshness and Verification Policy

1. Party policy pages: verify on scheduled recurring cadence.
2. Donations: refresh on source publication cadence with stale threshold monitoring.
3. Events/calendar: verify on scheduled recurring cadence.
4. Manifestos: static baseline with ad hoc re-check on detected updates.
5. Votes/parliamentary records: refresh per available session/data-feed cadence.
6. Polling records: refresh on source publication cadence and show fieldwork dates separately from publication/retrieval dates.
7. UI must show `last checked`, `last updated by source`, or stale badges where thresholds are exceeded.

## 15) Neutrality Standard

1. No persuasive or campaign-style language.
2. No motive inference or intent claims without direct evidence.
3. Uncertainty and source disagreement must be explicitly surfaced.
4. Comparative outputs must use a standardised format across parties.
5. Popularity and polling movement must be described with cautious, evidence-based language.

## 16) Editorial Review And Corrections Workflow

1. `Needs review` queue is triggered for low parser confidence, source conflicts, new domains, polling methodology changes, and parser anomalies.
2. Reviewer actions: approve, reject, correct, or escalate.
3. Corrections are logged with timestamp, reason, and affected records.
4. Public pages should link to relevant correction history when a correction changes interpretation.

## 17) Misuse And Abuse Controls

1. Apply rate limits and bot-abuse controls on public endpoints and forms.
2. Avoid tactical voting recommendations and campaign persuasion features.
3. Maintain product disclaimers for non-legal/non-campaign advice positioning.
4. Do not collect unnecessary political opinion signals.

## 18) Policy Taxonomy

1. Use canonical issue themes such as economy/tax, health, housing, immigration, education, crime/justice, climate/energy.
2. Maintain synonym mappings to canonical labels for search and comparison.
3. Version taxonomy updates and publish changes in methodology.
4. Track coverage by theme: strong, partial, no verified source.

## 19) Non-Functional Requirements

1. p75 page load <= 2.5s on core views.
2. Availability target: 99.5% monthly for public app endpoints.
3. Ingestion jobs are idempotent with retry handling.
4. Admin and editorial actions produce audit logs.
5. Core views meet keyboard navigation and screen-reader labelling requirements.
6. Charts and maps include accessible table or text equivalents.

## 20) Product Sequence Constraints

`docs/project/backlog.md` is the only authority for current phases, activation and unfinished delivery order. These are durable product constraints, not a parallel plan:

1. Beginner understanding precedes policy depth.
2. Public party and leadership context precedes source-led manifesto and policy discovery.
3. Shared comparison headings emerge from reviewed official sources rather than being chosen in advance.
4. Housing remains the first eventual comparison proof after its dependencies are met.
5. Data and platform work activates only when the current or imminent product phase requires it.
6. Polling, political finance, alignment scoring and stored political-opinion signals require their documented source, neutrality, consent and privacy gates before activation.

## 21) Ingestion Strategy

1. Source ingestion modes: official APIs where available, public data downloads, compliant scraping where allowed, and manual curation fallback.
2. Each source must record ingestion mode, robots.txt outcome where relevant, licence/terms notes, and parser version.
3. Pipeline stages: fetch -> snapshot -> parse -> normalize -> attach provenance -> quality checks -> publish.
4. Initial execution model is sequential scheduled jobs with idempotent retries.
5. Upgrade trigger to queue-backed workers: sustained threshold breach on failed retries, backlog, or repeated critical freshness breaches.
6. Policy/manifesto processing stores source excerpts sufficient to support each displayed summary.

---

# Engineering Ticket Set With Acceptance Criteria

These acceptance criteria are a requirements reference, not an implementation queue. Active delivery detail belongs in issues and PRs mapped to an outcome in `docs/project/backlog.md`.

## FEAT-001 Home Starter Dashboard

User story: As a beginner, I can land on the site, understand what it is for within ten seconds, and choose a clear first route.

Acceptance criteria:

1. Page leads with a plain-English promise for people who do not usually follow politics.
2. Page offers clear routes for local MP lookup, glossary basics, and Parliament today.
3. A compact Parliament panel shows two to three official public-record facts where available.
4. Page loads in <= 2.5s p75 on broadband baseline.
5. Empty states are shown when live source data is unavailable.
6. Dashboard layout is responsive and usable across mobile and desktop breakpoints.
7. Source confidence is present through small labels, timestamps, links, or evidence affordances rather than large methodology blocks.
8. No progress bars, badges, or unlock mechanics appear in the v1 homepage flow.
9. No prediction, winner/loser framing, party preference scoring, or campaign language appears on the homepage.

## FEAT-002 Compare View

User story: As a user, I can compare parties side-by-side on selected issues.

Acceptance criteria:

1. User can select at least two parties and one issue theme.
2. UI renders side-by-side policy positions per party.
3. Each position shows at least one primary source link or a clear coverage gap.
4. Plain-English comparison notes are editorially written or template-rendered from structured records.
5. If a party has no source data for a theme, UI displays `No verified source available`.
6. Issue selector is backed by canonical policy taxonomy labels.
7. Each row shows source recency and coverage status.
8. View supports shareable compare links with selected parties/theme encoded.
9. Phase 2 stretch: where voting records conflict with stated party policy text, UI shows discrepancy indicator with linked evidence.

## FEAT-003 Policies And Manifestos

User story: As a user, I can inspect manifesto positions and track policy changes over time.

Acceptance criteria:

1. System stores manifesto/policy documents with source URL and retrieved date.
2. Policy detail page shows current source-backed summary and original source links.
3. Change diff view highlights inserted and removed text when comparable snapshots exist.
4. Each policy card includes status labels: announced, voted, implemented, dropped, unknown.
5. All policy records retain source provenance metadata.
6. System stores source snapshots or immutable extracts for auditability and link-rot resilience.
7. Diff pipeline records parser confidence and routes low-confidence diffs to editorial review.
8. Authorized reviewers can apply manual corrections with audit logging.
9. `unknown` is the default status until evidence supports another lifecycle state.

## FEAT-004 Money Explorer

User story: As a user, I can analyse major party donors and donation trends.

Acceptance criteria:

1. User can filter by party, date range, and donation amount band.
2. Results include donor name, amount, date, recipient party, and source link.
3. Sort supports amount and date ascending/descending.
4. Top donors leaderboard updates from latest ingestion run.
5. Data export to CSV includes visible filtered fields.
6. Initial ingestion can run as curated read-only pipeline before full automation.
7. Donor entity-resolution rules are defined and applied for common name variants.
8. Each record exposes `data current as of` to reflect reporting/publication lag.

## FEAT-005 Calendar

User story: As a user, I can view and track upcoming political events.

Acceptance criteria:

1. Calendar includes conference dates and key public political events.
2. User can filter by party and event type.
3. Event detail page includes source link and last checked date.
4. User can export a single event as ICS conforming to iCalendar (`RFC 5545`).
5. Past events are archived and still searchable.

## FEAT-006 Guided Civic Check (Anonymous-First)

User story: As a user who does not know where to start, I can complete a guided civic check that teaches vocabulary and explains issues without creating an account.

Acceptance criteria:

1. Check supports anonymous completion.
2. First version is a civic learning path, not a party-alignment score.
3. Any later alignment scoring is post-v1 and requires explicit methodology, consent boundaries, and DPIA review.
4. Result or recap pages link to source-backed policy positions used for context or to coverage gaps.
5. No special-category data is persisted unless explicit consent is captured.
6. Consent capture event is logged with timestamp and policy version when opted in.
7. Results include cross-party agreement areas to reduce single-party framing.
8. Core scoring runs deterministically and can execute client-side for anonymous mode.
9. Gamified mechanics reward learning, checking sources, and completing modules, not party preference.

## FEAT-007 Search And Plain-English Explainers

User story: As a user, I can search topics and read clear, source-backed explainer pages.

Acceptance criteria:

1. Search supports parties, policy areas, source documents, votes, donations, events, and poll records.
2. Explainer pages are editorially written or template-rendered from reviewed structured records.
3. Each factual paragraph links to source references or a visible coverage gap.
4. Unsupported topics return `No verified source available` or the closest related source-backed pages.
5. Search filters include party, policy area, source type, date range, and coverage status.
6. Search result snippets never invent unsupported facts.
7. Explainer pages show `last checked`, source count, source tiers, and correction history where relevant.

## FEAT-007A Political Glossary And Traditions

User story: As a beginner, I can understand political jargon, parliamentary procedure, election terms, and traditions without leaving the site.

Acceptance criteria:

1. Glossary page is linked from global navigation.
2. Entries are grouped by Parliament, elections, parties, and traditions.
3. Each entry has a plain-English definition, why it matters, and a source link.
4. Glossary sources prioritize official UK Parliament, Electoral Commission, GOV.UK, and other approved civic sources.
5. Jargon-heavy pages link relevant terms inline or from nearby help text.
6. Glossary entries use neutral wording and avoid party-coded examples unless source context requires them.

## FEAT-007B Evergreen Civic Explainers

User story: As a beginner, I can read clear, source-backed explainers for recurring political events and traditions such as State Opening, PMQs, parliamentary sessions, recess, elections, and the Budget.

Acceptance criteria:

1. Explainers are linked from glossary, calendar, search, and relevant public-record pages.
2. Each explainer includes a plain-English summary, timeline, key terms, source links, and related records.
3. Annual explainers can show upcoming, live, and archived states.
4. Published dates and event status come from approved public sources.
5. Pages show `last checked` and `source updated` where available.
6. Explainers avoid prediction, partisan interpretation, and unsupported tradition lore.

## FEAT-008 Methodology And Sources

User story: As a user, I can understand how data and summaries are produced.

Acceptance criteria:

1. Methodology page documents ingestion, normalization, update frequency, and source tiers.
2. Scoring method for quiz is published in plain language if quiz remains in scope.
3. Source directory page lists all active source systems.
4. Each feature page links back to methodology.
5. Methodology changelog captures dated updates to scoring, sourcing, polling, and freshness policies.
6. Source inclusion/removal criteria and correction policy are published.
7. Architecture and product trade-off follow-ups are captured as unfinished outcomes in `docs/project/backlog.md`; implementation detail belongs in the relevant issue or PR.

## FEAT-009 Privacy, Consent, And Rights Workflows

User story: As a user, I can control my data and exercise privacy rights.

Acceptance criteria:

1. Privacy notice is accessible from footer on all pages.
2. Consent manager stores granular consent preferences if optional tracking or quiz storage exists.
3. User can submit access, deletion, and correction requests via form.
4. Admin process supports SLA tracking for rights requests.
5. Data retention jobs enforce deletion windows as configured.
6. Abuse controls include request throttling for form spam and scripted quiz abuse.

## FEAT-010 Observability And Data Quality

User story: As an operator, I can detect stale, broken, or low-quality data before users are impacted.

Acceptance criteria:

1. Ingestion jobs emit success/failure metrics and latency.
2. Freshness monitors alert when dataset exceeds stale threshold.
3. Broken-source link checker runs on scheduled cadence and reports failures.
4. Source-reference validator blocks publish if required source links or excerpts are missing.
5. Crawler and ingestion jobs record robots policy checks where relevant and skip disallowed paths.
6. Operator dashboard displays current pipeline and public data health.
7. Golden-dataset checks validate expected records and key field integrity on every ingestion cycle.
8. Parser drift alerts fire when extraction quality drops after source layout changes.
9. Search quality metrics are tracked on benchmark queries.
10. Lightweight public status reporting for critical service health is available at launch.
11. Operator email alerts exist for ingestion failures, freshness breaches, parser drift, source-contract failures, recovery events, and daily digest summaries.
12. Alerting uses verified admin destinations and a documented Cloudflare-compatible path before relying on paid transactional email.

## FEAT-011 Polling And Momentum Tracker

User story: As a user, I can see who is up, down, gaining, or losing ground in public polling without mistaking noise for certainty.

Acceptance criteria:

1. Tracker shows national Westminster voting intention by party.
2. Each poll record includes pollster, client where available, fieldwork dates, publication date, sample size, population, method, geography, question wording, and source link where available.
3. UI distinguishes individual polls from rolling averages.
4. Movement labels use defined thresholds and show uncertainty caveats.
5. Polling movement is not presented as an election prediction.
6. Pollster methodology and full-tables links are shown when available.
7. Fieldwork date is displayed separately from retrieval and publication dates.
8. Trend charts include accessible table equivalents.
9. Source freshness and stale states are visible.
10. Methodology page explains averaging, exclusions, weighting, and uncertainty.
11. Seat projections are excluded unless a separately reviewed methodology and uncertainty model is approved.

---

# Cross-Feature Definition Of Done

1. Unit and integration tests added for core logic and ingestion.
2. Accessibility checks pass WCAG 2.2 AA baseline for new views.
3. Analytics events documented in tracking plan and privacy-reviewed.
4. Security review completed for rate limits, input validation, and secret exposure.
5. Legal/compliance checklist approved for GDPR-sensitive flows.
6. CI includes unit tests, integration tests, Playwright smoke tests, and basic performance checks.
7. Source-reference tests verify source links, excerpts, and coverage-gap handling.
8. Performance budgets are defined and enforced for core pages and API endpoints.
9. Core public pages are indexable and include metadata standards.
