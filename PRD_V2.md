# Political Intelligence Platform v2 - One-Page PRD

Last updated: February 20, 2026

## 1) Product Objective
Build a neutral, source-first political intelligence platform that helps users compare parties, policies, donors, and voting behavior, with AI explanations that always cite evidence.

## 2) Problem Statement
Political information is fragmented, hard to compare, and often presented without source transparency. Users need a single place to get verified, understandable, and current public political information.
The timing is material in the current UK parliamentary cycle: public trust and media fragmentation increase the need for source-linked, auditable political explainers.

## 3) Target Users
1. General voters.
2. Journalists and researchers.
3. Civics educators and students.
4. Policy professionals.

## 4) Jobs To Be Done
1. Compare party positions by issue quickly.
2. Track if promises change over time.
3. Understand who funds parties and when.
4. Ask plain-language questions and verify answers via sources.
5. See upcoming key political events.
6. Export or share verified insights with source links.

## 5) Scope (MVP)
1. Home Dashboard.
2. Compare.
3. Policies (manifesto + policy tracking).
4. Money (donor explorer).
5. Calendar (conference and key event dates).
6. Quiz (anonymous-first alignment).
7. Ask AI (grounded Q&A).
8. Methodology and Sources.
9. Geographic scope: UK national parties and UK public institutional sources for v1.

## 6) Out of Scope (MVP)
1. Election outcome prediction.
2. Campaign persuasion tooling.
3. Micro-targeted political advertising.
4. Native mobile app.

## 7) Compliance and Privacy Requirements
1. Use only public-facing sources.
2. Treat identifiable data as personal data even if public.
3. Default quiz mode is anonymous.
4. Do not store political alignment without explicit consent.
5. Complete DPIA before enabling personalized profiling.
6. Provide access, deletion, correction, and export workflows.
7. Publish lawful basis and retention policy in privacy notice.
8. Prefer privacy-preserving analytics patterns (server-side/event-minimized, no unnecessary tracking cookies).
9. Maintain an AI governance note that assesses EU AI Act applicability for each AI feature before release.

## 8) AI Product Rules
1. Every factual AI answer must include source citations.
2. If evidence is weak, the system must return an uncertainty/fallback response.
3. AI output must be neutral in tone and non-persuasive.
4. Store prompt/version audit logs for traceability.

## 9) Success Metrics (90 days)
Primary decision metrics:
1. Citation click-through rate >= 25% on AI answers.
2. Answer support rate >= 95% of factual sentences linked to supporting source chunks.
3. Citation relevance QA pass rate >= 90% on weekly sampled answers.
4. Freshness SLA adherence >= 95% by dataset type.
5. 30-day return rate >= 30%.

Secondary diagnostics (tracked, but not primary go/no-go gates):
1. WAU/MAU ratio.
2. Quiz completion rate.
3. Privacy request SLA <= 30 days.
4. 100% of AI fact answers include at least one valid citation link.
5. Correction rate and correction turnaround.
6. User trust signal (`well-supported answer`).

## 10) Launch Gates
1. Data pipelines passing freshness checks.
2. AI citation enforcement test suite passing.
3. Security and abuse controls enabled.
4. Legal sign-off on privacy notice and DPIA scope.
5. Editorial sign-off on neutrality and source standards.
6. Closed beta test completed with documented user feedback and critical fixes triaged.

## 11) Recommended Technical Baseline (MVP)
1. Frontend: Next.js 16.x (App Router, React Server Components) with TypeScript.
2. UI: Tailwind CSS + accessible component primitives.
3. Backend/Data: Postgres on Supabase with `pgvector` enabled for semantic retrieval.
4. AI Runtime: Vercel AI SDK (`streamText` + structured output contract) with a model provider abstraction.
5. Retrieval Layer: Hybrid retrieval (keyword + vector) with source metadata attached per chunk.
6. Deployment: Vercel for web runtime and GitHub Actions for CI.
7. Observability: Application logs, ingestion job logs, and data freshness monitors in one operator view.
8. Security baseline: endpoint rate limiting, prompt injection controls, and source-domain allowlist enforcement.
9. Caching strategy: scheduled/static revalidation for public data pages aligned to dataset freshness policy.
10. Model routing policy: classify request complexity and route to lower-cost models by default, escalating to higher-cost reasoning models only when required.
11. Embedding policy: support local/open embedding models and managed providers behind a common interface; default MVP embedding model is `BAAI/bge-small-en-v1.5` (384 dimensions).
12. Semantic answer cache for repeated public queries with TTL/invalidation tied to source freshness and correction events.

## 12) Source Trust Framework
1. Tier 1 (authoritative primary): legislation/parliament records, official party publications, Electoral Commission, GOV.UK.
2. Tier 2 (institutional public): ONS, NAO, committee reports, regulator publications.
3. Tier 3 (secondary context): major publishers for context when primary evidence is unavailable.
4. Blocked by default: anonymous blogs, unverifiable social posts, and unsupported domains.
5. Retrieval and citation must prefer highest available source tier.

## 13) Canonical Data Model and Provenance
1. Core entities: `Party`, `Policy`, `PolicyStatement`, `SourceDocument`, `Citation`, `Donation`, `Event`, `VoteRecord`, `AIAnswerAudit`.
2. Required provenance fields for factual records: `source_url`, `source_type`, `source_publisher`, `retrieved_at`, `published_at` (if known), `content_hash`, `extract_method`, `citation_span`.
3. Source snapshots are stored for critical records to mitigate link rot and support audits.

## 14) Freshness and Verification Policy
1. Party policy pages: verify at least daily.
2. Donations: refresh on source publication cadence with stale threshold monitoring.
3. Events/calendar: verify at least daily.
4. Manifestos: static baseline with ad hoc re-check on detected updates.
5. Votes/parliamentary records: refresh per available session/data feed cadence.
6. UI must show `last verified` and stale badges where thresholds are exceeded.

## 15) Neutrality Standard (Operational)
1. No persuasive or campaign-style language in generated outputs.
2. No motive inference or intent claims without direct evidence.
3. Uncertainty and source disagreement must be explicitly surfaced.
4. Comparative outputs must use a standardized format across parties.

## 16) Editorial Review and Corrections Workflow
1. `Needs review` queue is triggered for low confidence, source conflicts, new domains, and parser anomalies.
2. Reviewer actions: approve, reject, correct, or escalate.
3. Corrections are logged with timestamp, reason, and affected records.

## 17) Misuse and Abuse Controls
1. Apply rate limits and bot-abuse controls on public endpoints.
2. Use prompt abuse filters for harassment, manipulation, and disallowed persuasion requests.
3. Label AI-generated summaries distinctly from source text.
4. Maintain product disclaimers for non-legal/non-campaign advice positioning.

## 18) Policy Taxonomy (v1)
1. Use canonical issue themes (for example: economy/tax, health, housing, immigration, education, crime/justice, climate/energy).
2. Maintain synonym mappings to canonical labels for retrieval and comparison.
3. Version taxonomy updates and publish changes in methodology.
4. Track coverage by theme (strong/partial/no verified source).

## 19) Non-Functional Requirements
1. p75 page load <= 2.5s on core views.
2. p95 AI initial response <= 8s with streaming enabled.
3. Availability target: 99.5% monthly for public app endpoints.
4. Ingestion jobs are idempotent with retry handling.
5. Admin and moderation actions produce audit logs.
6. Core views meet keyboard navigation and screen-reader labeling requirements.

## 20) MVP Phase Plan (Budget-First)
1. Phase 1 (core trust engine): `Compare`, `Policies`, `Ask AI`, `Methodology/Sources`, baseline observability.
2. Phase 2 (expansion): `Money`, `Calendar`, `Home Dashboard` enhancements, `Quiz` with explicit consent workflow hardening.
3. FEAT-009 may begin with manual rights-request operations (`form + inbox + SLA tracking`) before a full admin panel.

## 21) Ingestion Strategy
1. Source ingestion modes: official APIs where available, structured scraping where allowed, and manual curation fallback.
2. Each source must record ingestion mode, robots.txt outcome, and parser version.
3. Pipeline stages: fetch -> normalize -> provenance attach -> quality checks -> publish.
4. MVP execution model is sequential scheduled jobs with idempotent retries (no dedicated queue required at launch).
5. Upgrade trigger to queue-backed workers: any two of these sustained for 7 days -> >20% failed retries, >30 minute backlog after schedule window, or >2 critical freshness breaches/week.
6. Policy/manifesto processing uses semantic chunking with overlap to preserve claim context for retrieval.

## 22) Known Retrieval Trade-Off and Upgrade Trigger
1. MVP lexical retrieval uses Postgres full-text search for cost and simplicity.
2. Known limitation: legal/political terminology ranking quality may degrade on complex long-form queries.
3. Upgrade trigger: if benchmark relevance or support-rate targets are missed for 2 consecutive release cycles, evaluate dedicated lexical engine options.

---

# Engineering Ticket Set with Acceptance Criteria

## FEAT-001 Home Dashboard
User story: As a user, I can see a single-page overview of the latest political updates.

Acceptance criteria:
1. Dashboard shows at least four widgets: policy changes, donor updates, upcoming events, recent votes.
2. Each widget item links to a detailed page.
3. Each item displays `last updated` timestamp.
4. Page loads in <= 2.5s p75 on broadband baseline.
5. Empty state is shown when a widget has no data.
6. Dashboard layout is responsive and usable across mobile and desktop breakpoints.
7. Each item shows source-count and coverage badge.
8. `Recent` windows are explicitly defined and documented (for example, default 30 days).
9. Stale badge appears when freshness threshold is exceeded.
10. Time to Interactive (TTI) target is defined and monitored (p75 <= 3.5s).

## FEAT-002 Compare View
User story: As a user, I can compare parties side-by-side on selected issues.

Acceptance criteria:
1. User can select at least two parties and one issue theme.
2. UI renders side-by-side policy statements per party.
3. Each statement shows at least one primary source link.
4. AI-generated difference summary appears with citation list.
5. If a party has no source data for a theme, UI displays `No verified source available`.
6. Issue selector is backed by canonical policy taxonomy labels.
7. Each row shows source recency (`last verified`) and coverage status (`strong`, `partial`, `none`).
8. View supports shareable compare links with selected parties/theme encoded.
9. Phase 2 stretch: where voting records conflict with stated party policy text, UI shows discrepancy indicator with linked evidence.

## FEAT-003 Policies Tracker
User story: As a user, I can inspect manifesto positions and track changes over time.

Acceptance criteria:
1. System ingests and stores manifesto/policy documents with source URL and retrieved date.
2. Policy detail page shows current text and previous version snapshot.
3. Change diff view highlights inserted and removed text.
4. Each policy card includes status labels: announced, voted, implemented, dropped, unknown.
5. All policy records retain source provenance metadata.
6. System stores source document snapshots (or immutable extracts) for auditability and link-rot resilience.
7. Diff pipeline records parser-confidence and routes low-confidence diffs to editorial review.
8. Authorized reviewers can apply manual diff corrections with audit logging.
9. `unknown` is the default status until evidence supports another lifecycle state.
10. Chunking metadata is stored (`chunk_id`, offsets, chunking strategy version) for reproducible retrieval and citation.

## FEAT-004 Money Explorer
User story: As a user, I can analyze major party donors and donation trends.

Acceptance criteria:
1. User can filter by party, date range, and donation amount band.
2. Results include donor name, amount, date, recipient party, source link.
3. Sort supports amount and date ascending/descending.
4. Top donors leaderboard updates from latest ingestion run.
5. Data export to CSV includes visible filtered fields.
6. MVP ingestion can run as curated read-only pipeline before full automation.
7. Donor entity-resolution rules are defined and applied for common name variants.
8. Each record exposes `data current as of` to reflect reporting/publication lag.

## FEAT-005 Calendar
User story: As a user, I can view and track upcoming political events.

Acceptance criteria:
1. Calendar includes conference dates and key public political events.
2. User can filter by party and event type.
3. Event detail page includes source link and last verified date.
4. User can export a single event as ICS conforming to iCalendar (`RFC 5545`).
5. Past events are archived and still searchable.

## FEAT-006 Alignment Quiz (Anonymous-First)
User story: As a user, I can complete an issue quiz and view alignment results.

Acceptance criteria:
1. Quiz supports anonymous completion without account creation.
2. Result page shows ranked alignment with transparent scoring method.
3. Result page includes `why this match` explanation with citations.
4. No special-category data is persisted unless explicit consent is captured.
5. Consent capture event is logged with timestamp and policy version when opted in.
6. Results include notable cross-party agreement areas to reduce single-party framing/filter-bubble effects.
7. Core quiz scoring runs deterministically and can execute client-side for anonymous mode.
8. Optional retrieval-backed explanation layer may be used for rationale text, but core scoring remains deterministic and inspectable.

## FEAT-007 Ask AI (Grounded Q&A)
User story: As a user, I can ask political questions and receive source-grounded answers.

Acceptance criteria:
1. Response payload follows a strict schema: `answer`, `confidence`, `claims[]`, `citations[]`, `uncertainty_reason`.
2. Each citation includes `url`, `title`, and `evidence_snippet` (plus `page` when source is paginated).
3. Answers stream to the client, with a visible loading state and progressive rendering.
4. If retrieval returns insufficient evidence, assistant responds with a fallback `cannot verify` message and no fabricated claims.
5. Unsupported domains are blocked from retrieval/citation via an allowlist.
6. Prompt/response metadata is logged for audit without storing sensitive free text beyond retention policy.
7. Factual sentences without linked evidence spans are blocked or downgraded as uncertain (`no orphan claims`).
8. Response includes claim-to-citation mapping so each factual paragraph traces to at least one source chunk.
9. Requests are classified (fact lookup, comparison, trend, opinion/persuasion); persuasion requests return policy-compliant refusal templates.
10. Retrieval freshness rules are enforced by query type and source age threshold.
11. Confidence levels are defined against retrieval support thresholds and applied consistently.
12. Repeated/near-duplicate public queries use cache with TTL and invalidation tied to source freshness.
13. Out-of-domain requests (non-political/non-product scope) are filtered early with low-cost classifier rules and refusal templates.
14. Pre-release evaluation suite measures groundedness and context-faithfulness on benchmark queries.

## FEAT-008 Methodology and Sources
User story: As a user, I can understand how data and AI outputs are produced.

Acceptance criteria:
1. Methodology page documents ingestion, normalization, and update frequency.
2. Scoring method for quiz is published in plain language.
3. AI limitations and uncertainty behavior are documented.
4. Source directory page lists all active source systems.
5. Each feature page links back to methodology.
6. Methodology changelog captures dated updates to scoring, sourcing, and retrieval policies.
7. Source inclusion/removal criteria and correction policy are published.
8. Architecture/product trade-off decisions are maintained in a lightweight decision log.

## FEAT-009 Privacy, Consent, and Rights Workflows
User story: As a user, I can control my data and exercise privacy rights.

Acceptance criteria:
1. Privacy notice is accessible from footer on all pages.
2. Consent manager stores granular consent preferences.
3. User can submit access, deletion, and correction requests via form.
4. Admin panel supports SLA tracking for rights requests.
5. Data retention jobs enforce deletion windows as configured.
6. Abuse controls include request throttling for form spam and scripted quiz abuse.
7. Query text sent to semantic cache is normalized and stripped of unnecessary user-identifiable content before cache write.

## FEAT-010 Observability and Data Quality
User story: As an operator, I can detect stale, broken, or low-quality data before users are impacted.

Acceptance criteria:
1. Ingestion jobs emit success/failure metrics and latency.
2. Freshness monitors alert when dataset exceeds stale threshold.
3. Broken-source link checker runs daily and reports failures.
4. AI citation validator blocks publish if citation URL is missing/invalid.
5. Crawler and ingestion jobs record robots.txt policy checks and skip disallowed paths.
6. Incident dashboard displays current pipeline and API health.
7. Golden-dataset checks validate expected records and key field integrity on every ingestion cycle.
8. Parser drift alerts fire when extraction quality drops after source layout changes.
9. Retrieval quality metrics are tracked on benchmark queries (top-k hit relevance and support rate).
10. Lightweight public status reporting for critical service health is available at launch.
11. LLM telemetry includes token usage, latency, and estimated cost per request class.
12. Trace-level observability supports debugging retrieval context, citations selected, and final answer payload.

---

# Cross-Feature Definition of Done
1. Unit and integration tests added for core logic and APIs.
2. Accessibility checks pass WCAG 2.2 AA baseline for new views.
3. Analytics events documented in tracking plan.
4. Security review completed for auth, rate limits, and abuse controls.
5. Legal/compliance checklist approved for GDPR-sensitive flows.
6. CI includes unit tests, API integration tests, Playwright E2E smoke tests, and Lighthouse CI checks.
7. AI contract tests verify schema conformance, citation presence, and fallback behavior for low-evidence prompts.
8. Performance budgets are defined and enforced in CI for core pages and API endpoints.
9. Core public pages are indexable and include metadata standards (title, description, Open Graph).
10. RAG evaluation benchmarks (groundedness and faithfulness) pass agreed release thresholds before launch.
