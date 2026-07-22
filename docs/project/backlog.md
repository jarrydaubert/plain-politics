# Plain Politics Evergreen Backlog

## 1. Purpose and maintenance

This is the only authoritative list of unfinished Plain Politics outcomes and their order. Product requirements, strategy notes, methodology, ADRs, runbooks and dated reports provide context or constraints; they do not set current priorities.

Maintain this file as follows:

1. Keep outcomes, activation conditions, dependencies and definitions of done here.
2. Nest supporting tasks under the outcome they enable. Do not promote every small change into a milestone.
3. Remove completed outcomes. Preserve delivery history in issues, PRs, git, releases or dated reports.
4. Move delivery detail, source evidence, review notes and verification output into the implementing issue or PR.
5. Reclassify work when its trigger changes. Do not activate platform work without a current or imminent product need.
6. Do not maintain another roadmap, delivery plan or todo list. If another document identifies unfinished work, add or reconcile it here.

## 2. Product goal

Build a neutral, source-first, beginner-friendly UK politics product that helps someone understand the basics, start from where they live, identify who represents and governs them, inspect what parties officially publish, and follow public political evidence without being told what to think.

The product should be a calm route into politics, not a pundit, prediction engine, campaign tool or public-affairs platform.

## 3. Working rules

1. Beginner understanding comes before policy depth.
2. Institutional basics may follow the real constitutional structure; party priorities remain source-led.
3. No public factual claim appears without reviewed evidence.
4. Government, Parliament and parties remain distinct.
5. Runtime data owns current facts; documentation does not duplicate them.
6. `BACKLOG` owns priorities; issues and PRs own implementation detail, source evidence and verification.
7. Feature PRs map to a backlog outcome, except for small maintenance fixes.
8. Completed outcomes leave this file; history belongs in PRs, git, releases or dated reports.
9. No other document owns a competing roadmap or todo list.
10. Environment examples, runbooks and evergreen reference docs change with the behaviour or procedure they describe.

## 4. Current: Politics Basics Spine

**Activation condition:** Active by product decision. Beginner understanding is the current product constraint.

**Exit condition:** “A first-time visitor can follow one coherent, evidence-backed path explaining who governs the UK, what Parliament and Government each do, how elections and law-making work, and how to find their own representative.”

**Current non-goals:** Policy comparison, polling, political finance, alignment scoring, political profiling, general search infrastructure and speculative ingestion, unless required by the beginner journey.

- [ ] **Define the beginner journey and information architecture.**
  - **Definition of done:** One documented route hierarchy takes a first-time visitor from orientation to the Politics Basics spine, their representative, relevant terms and deeper evidence without a dead end or competing learning path.
  - Supporting tasks:
    - Define the central sequence, entry points, contextual next steps and routes back to orientation.
    - Add lightweight next-step guidance after postcode lookup.
    - Add local navigation among My Area, glossary, Parliament, Politics Basics and the future public leadership destination.
    - Add an accessible glossary filter when it materially helps the spine rather than introducing general search infrastructure.
    - Keep exploration self-directed, with no progress bars, badges, streaks or unlock mechanics.

- [ ] **Publish the central Politics Basics path.**
  - **Definition of done:** A single public starting surface introduces the spine, orders the core explanations and makes the next useful step obvious for someone who does not know political vocabulary.
  - Supporting tasks:
    - Publish an orientation that begins with who governs and how institutions relate.
    - Connect short glossary definitions to fuller explanations without duplicating either.
    - Use recurring civic moments only where they clarify the central path; unpublished topics do not create placeholder routes.

- [ ] **Explain institutions, elections, law-making, devolution and evidence types.**
  - **Definition of done:** The spine has reviewed, source-backed explanations of Government, Parliament, parties, elections, making a law, devolved responsibility and the difference between manifestos, official records, government publications and party publications.
  - Supporting tasks:
    - Explain Government, Parliament and political parties as separate institutions and evidence producers.
    - Cover the Commons, Lords, elections and voting systems, the bill-to-law path, and the limits of UK-wide claims under devolution.
    - Add the civic terms and traditions a beginner meets in the path, including inline links from My Area and Parliament.
    - Restore broad ideology terms only with stronger civic or academic sourcing and explicit limitations.
    - Test a source-backed “Who can fix this?” responsibility map if it makes council, Westminster, devolved government, regulator, court and private-provider boundaries clearer.

- [ ] **Connect My Area, glossary, Parliament and leadership.**
  - **Definition of done:** A visitor can move between their representative, the public parliamentary record, definitions, institutional explanations and leadership context while retaining where they came from.
  - Supporting tasks:
    - Explain what recent votes and written questions can and cannot prove.
    - Improve verification for ambiguous, devolved, boundary-edge and Northern Ireland postcode cases when the beginner path exposes a gap.
    - Add plain-English labels for parliamentary procedure and local-relevance limits.
    - Define the hand-off to public party and leadership pages without exposing unfinished content.

- [ ] **Prove comprehension, sourcing, mobile and accessibility.**
  - **Definition of done:** A recorded beginner walkthrough shows that first-time visitors can complete the phase exit journey, identify the institutional distinctions, find their representative and open the evidence; core flows also pass mobile, keyboard and automated accessibility checks.
  - Supporting tasks:
    - Run comprehension checks with representative first-time users and record misunderstandings against the relevant outcome.
    - Add lightweight explainer feedback for “clear”, “still confused” and “source issue” without collecting political opinions.
    - Publish a lightweight corrections route linked from factual surfaces.
    - Activate the source-reference, link, mobile and accessibility gates in Enabling Platform Work for this phase.

## 5. Next: Parties and Political Leadership

**Activation condition:** Activate only after the Politics Basics Spine exit condition is met.

**Exit condition:** A first-time visitor can find every in-scope party’s public leadership, distinguish party, parliamentary and government roles, inspect reviewed evidence and dates, and understand any coverage gap on identically structured pages.

- [ ] **Publish consistent party and leadership pages.**
  - **Definition of done:** Every in-scope party uses the same public structure for party, parliamentary and government leadership, with shared navigation, evidence access and explicit missing-data states.
  - Supporting tasks:
    - Promote the checked-in leadership proof into the public information architecture only after neutrality and accessibility review.
    - Keep Government, Parliament and party roles visibly separate even when one person holds several roles.
    - Add source-backed party profile basics without introducing policy comparison.

- [ ] **Make leadership history and correction handling trustworthy.**
  - **Definition of done:** Current and historical role assignments render from runtime data for arbitrary supported dates; reviewed metadata corrections preserve stable IDs; evidence history and coverage gaps remain inspectable.
  - Supporting tasks:
    - Extend reviewed evidence coverage where public pages expose a role or transition.
    - Show effective or verified dates and explain their meaning in beginner language.
    - Use the canonical editing runbook for amendments, transitions and source changes.

- [ ] **Deepen representative and constituency context.**
  - **Definition of done:** Stable MP and constituency destinations can be reached from My Area and leadership pages, show current runtime facts with sources, and avoid treating parliamentary activity as proof of local impact.
  - Supporting tasks:
    - Add constituency pages after their source data is durable enough for stable public URLs.
    - Add MP detail pages after member identity and membership records are durable.
    - Expand votes, written questions, debates, committees, bills or events only where reliable source mapping and limitations exist.

## 6. Later: Manifestos and Policy Discovery

**Activation condition:** Activate only after public leadership meets its exit condition and the source capture and editorial review capabilities required for official party documents are ready.

**Exit condition:** Every in-scope party has a source-faithful manifesto or official-policy discovery surface whose topics come from reviewed official material and whose excerpts, dates, locators, evidence types and coverage gaps can be inspected without comparison framing.

- [ ] **Capture official manifesto and policy material faithfully.**
  - **Definition of done:** Included documents have stable source identities, immutable snapshots, retrieval and publication context, hashes, access notes, reviewed excerpts and visible gaps.
  - Supporting tasks:
    - Use official party publications as the default source and record PDF, browser-only, gated or unavailable access honestly.
    - Keep party publications, parliamentary records and government publications as separate evidence types.
    - Activate durable source storage and editorial review work only to the extent this phase needs it.

- [ ] **Let party-policy topics emerge from official sources.**
  - **Definition of done:** The discovery taxonomy records how reviewed source headings and concepts map to neutral canonical topics; no comparison heading is selected first and then backfilled with party evidence.
  - Supporting tasks:
    - Inventory source language across all in-scope parties before creating shared topic labels.
    - Version taxonomy changes and record asymmetric source coverage.
    - Preserve aspirations, targets, actions and outcomes as distinct claim types.

- [ ] **Publish source-led party policy discovery.**
  - **Definition of done:** Identically structured party surfaces let users browse what each party officially published, open exact reviewed excerpts and see when no verified source is available.
  - Supporting tasks:
    - Keep summaries editorially reviewed or template-rendered from structured records.
    - Add bills and Hansard only as labelled public-record context, never as automatic proof of party belief or delivery.
    - Keep source dates, geographic scope and evidence limitations visible.

**Housing dependency:** Housing remains the first eventual policy-area proof. It stays inactive until the Politics Basics Spine, public leadership and source-faithful manifesto discovery have all met their exit conditions.

## 7. Later: Fair Policy Comparison and Change Tracking

**Activation condition:** Activate only after Manifestos and Policy Discovery exits, Housing source coverage has been revalidated, and shared comparison headings have emerged from official sources.

**Exit condition:** The first Housing comparison presents every in-scope party in the same reviewed structure, with exact source support or an explicit gap for every cell, and can show a verified change between source snapshots without scoring, ranking or advice.

- [ ] **Prove fair comparison with Housing.**
  - **Definition of done:** The first bounded Housing topic compares all in-scope parties using source-derived headings, identical ordering, geographic caveats, reviewed excerpts and visible coverage gaps.
  - Supporting tasks:
    - Map reviewed excerpts to the first source-derived Housing topics.
    - Keep manifesto promises, current party publications, government action and parliamentary outcomes in separate labelled layers.
    - Add neutrality review for asymmetric wording, unsupported judgement, rankings, motive claims and implied voting advice.
    - Use `unknown` until evidence supports a stronger lifecycle state.

- [ ] **Track source-backed policy changes.**
  - **Definition of done:** Consecutive comparable snapshots can be classified as new, changed, removed or unchanged; low-confidence changes require review; public wording links to both the change and its evidence.
  - Supporting tasks:
    - Add semantic diffing, parser confidence and reviewed correction handling.
    - Keep document changes separate from claims about implementation or broken promises.

- [ ] **Publish verified change discovery.**
  - **Definition of done:** A public “What changed” surface lists reviewed changes with stable URLs, source links and checked times; syndication appears only after the public feed is reliable.
  - Supporting tasks:
    - Add Atom or RSS after the public change feed exists.
    - Add filters for party, policy, bill, constituency, source family and corrections only when those entities have durable records.

## 8. Enabling Platform Work

**Activation condition:** Activate an enabling outcome only when a Current or imminent Next/Later outcome cannot meet its definition of done without it.

**Exit condition:** The activating product outcome uses the capability in production, its failure modes and operating procedure are verified, and no unused parallel platform or data path remains.

- [ ] **Enforce evidence, accessibility and neutrality gates for the active phase.**
  - **Activation:** Required now for the Politics Basics Spine and before public leadership.
  - **Definition of done:** CI or the documented review process catches missing factual sources, broken approved links, inaccessible core interactions and asymmetric party framing before publication.
  - Supporting tasks:
    - Add source-reference validation for configured factual pages.
    - Add scheduled, rate-limited checks for official source links without blocking deploys on third-party outages.
    - Add automated accessibility smoke checks for core routes and retain keyboard/mobile review.
    - Add a documented neutrality review gate before party or policy content ships.
    - Add golden fixtures when a parser becomes part of an activated outcome.

- [ ] **Build durable source ingestion only when an activated phase needs it.**
  - **Activation:** Required before stable MP/constituency records or manifesto discovery depend on persisted upstream data.
  - **Definition of done:** Activated source families run through fetch, immutable snapshot, parse, normalize, provenance, quality checks and publish; repeated content deduplicates and every record identifies its parser version and source registry entry.
  - Supporting tasks:
    - Convert required live Parliament reads to snapshot-first ingestion.
    - Persist source documents, snapshots, excerpts, display facts and ingestion runs in Supabase.
    - Record source tier, licence/access notes, cadence, freshness threshold, fields used and limitations.
    - Add parser-version tracking, content-hash dedupe and representative malformed, empty, stale and suspicious fixtures.
    - Keep one canonical write path during any checked-in-store to Supabase migration.

- [ ] **Add durable resilience and source operations after ingestion exists.**
  - **Activation:** Activate when a persisted source family becomes user-facing.
  - **Definition of done:** Public pages can use last-good persisted data across deployments, distinguish upstream retrieval from app-cache checks, retain status history and alert operators without duplicate noise.
  - Supporting tasks:
    - Persist successful and attempted source checks across cold starts.
    - Configure refresh cadence, freshness and owner-facing failure thresholds by active source family.
    - Add deduplicated failure, recovery and threshold alerts with cooldowns.
    - Expand the public status surface only when persisted coverage and freshness data can support it.

- [ ] **Establish editorial review at the first scale point.**
  - **Activation:** Activate before manifesto or policy material exceeds a reviewable checked-in workflow.
  - **Definition of done:** Reviewers can approve, reject, correct or escalate source excerpts and metadata with stable IDs, audit history and public correction links where interpretation changes.
  - Supporting tasks:
    - Define review states and source-excerpt validation.
    - Add reviewer tooling only when manual checked-in review no longer supports the imminent phase.
    - Preserve immutable evidence and append reviewed amendments rather than rewriting history.

- [ ] **Close current deployment and analytics ownership gaps.**
  - **Activation:** Required by the current public spine for maintainable production operations and privacy-safe learning signals.
  - **Definition of done:** A maintainer can verify Vercel, Cloudflare DNS, Email Routing, required environment variables and privacy-safe analytics from current runbooks; undocumented or inactive analytics code is removed.
  - Supporting tasks:
    - Confirm production Vercel Web Analytics traffic or remove its component and claims.
    - Document redeployment, DNS, email and safe environment configuration.
    - Keep `.env.example` synchronized whenever runtime configuration changes.

## 9. Parked Work

Parked work is valid product or platform work with no current activation. It must not acquire implementation tasks until its trigger is met.

- **Polling and popularity:** Activate only after a reliable free/public source strategy passes licence, metadata, inclusion, averaging and uncertainty review. Any tracker must separate fieldwork, publication and retrieval dates and must not predict elections.
- **Political finance:** Activate only after Electoral Commission access, publication lag, export limits, stable references and donor entity resolution are understood. Public records must expose caveats and matching confidence.
- **Guided civic checks, alignment scoring and political profiling:** Activate a learning-only path only if Politics Basics comprehension research shows a guided interaction is needed. Alignment results or storage require published methodology, neutrality review, explicit consent boundaries and a completed DPIA. Answers remain local and deletable by default.
- **General search infrastructure:** Activate only when user research or benchmark queries show that navigation, glossary filtering and structured browsing cannot find the reviewed corpus. Start with Postgres full-text search and filters; consider a dedicated service only after measured failure.
- **Live civic calendar and additional event feeds:** Activate after the Politics Basics event explanations are stable and authoritative date ownership, update cadence and cancellation handling are defined. Parliament business, GOV.UK activity, party events and election deadlines must remain separate.
- **Speculative source ingestion:** Activate a new family such as broad Hansard, bills, No. 10 activity, election data or devolved/local feeds only when a named imminent outcome requires its fields and source authority is settled.
- **Local learning trail:** Activate only if comprehension research shows that users need resumable progress and the design remains account-free, local, clearable and free of political preference profiling.
- **Retention and distribution experiments:** Activate The Plain Week only when a reliable weekly source cadence exists; Ask Plain Politics only with editorial and moderation capacity; share cards only after stable canonical content; My MP Watch only after durable MP records and change feeds; classroom materials only after the basics spine is proven.
- **Public data API, bulk downloads and reusable feeds:** Activate after reviewed records have stable schemas, licences, correction history and operating capacity.
- **Expanded public honesty dashboard:** Activate after durable coverage, freshness, correction and ingestion-health histories exist and user research shows the current status surface is insufficient.
- **User accounts and stored personalisation:** Activate only for a validated user need that cannot be met locally, followed by rights workflows, retention controls, abuse protection and privacy review.
- **AI training-crawler policy expansion:** Activate when crawler behaviour, legal policy or source licensing creates a concrete gap beyond the current published rules.
