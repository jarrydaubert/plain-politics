# Backlog

Last updated: 2026-07-04

This file is only for unfinished todo items. It is not a status report, product spec, or changelog.

Rules for this file:

1. Keep only work that still needs doing.
2. Remove an item once its definition of done is met.
3. Give every item a clear definition of done.
4. Put context, decisions, and review notes in the linked docs, not here.

For context, use:

- v1 scope: `docs/strategy/v1.0.0-scope.md`
- strategy/current assessment: `docs/strategy/current-assessment.md`
- source hooks: `docs/strategy/source-hooks.md`
- technical stack: `docs/engineering/tech-stack.md`
- competitive landscape: `docs/market/competitive-landscape.md`

## V1 Launch Blockers

- [ ] Verify `info@plainpolitics.co.uk` receives contact and correction email end to end.
  Definition of done: A test email sent from an external account arrives in the mailbox, replies work, and the live site points users to the verified address.

- [ ] Review the homepage visual direction, OG image, and public imagery before launch.
  Definition of done: Desktop and mobile homepage screenshots are reviewed, OG image renders in a preview tool, and any launch-blocking visual issues are fixed.

- [ ] Complete a beginner Parliament page copy pass.
  Definition of done: Random sample/demo framing is removed or replaced with a purposeful beginner interaction, API-speak is rewritten, gender columns are explained or deprioritised, and recent votes/upcoming business explain what the records can and cannot prove.

- [ ] Expand the About page trust content.
  Definition of done: The page explains the approved operator/contact level, methodology, correction route, update cadence, privacy posture, and non-affiliation in plain English.

- [ ] Submit the sitemap to Google Search Console and Bing Webmaster Tools.
  Definition of done: Site ownership is verified, the sitemap URL is submitted, and any indexing or sitemap errors are recorded for follow-up.

- [ ] Complete one final beginner walkthrough pass.
  Definition of done: A tester can follow homepage -> glossary -> Parliament -> my area -> source links -> contact/corrections without confusion, dead ends, or unsupported factual claims.

## V1 Nice-To-Have

- [ ] Add a small evidence popover or drawer for at least one homepage snapshot card.
  Definition of done: One homepage live-data card exposes its source URL, checked time, and plain-English caveat without cluttering the card.

- [ ] Add a small evidence drawer for at least one Parliament table row.
  Definition of done: One Parliament row exposes source URL, retrieved time, and raw-record context in an accessible drawer or popover.

- [ ] Add inline glossary links from `/my-area` and `/parliament`.
  Definition of done: Common terms on those pages link to canonical glossary term pages without disrupting reading flow.

- [ ] Add a glossary search input.
  Definition of done: Users can filter glossary terms by term, category, and plain-English text; the control is keyboard accessible and does not log or persist queries.

- [ ] Align navigation labels, page headings, and return links.
  Definition of done: Top-level nav labels, H1s, metadata titles, breadcrumbs, and back links use consistent beginner-facing wording, and generic text such as `Back to dashboard` is replaced or intentionally justified.

- [ ] Add lightweight next-step guidance after postcode lookup.
  Definition of done: `/my-area` results point users to the MP, constituency, relevant glossary terms, source records, and corrections route without implying extra live tracking is already available.

- [ ] Add a lightweight public corrections page.
  Definition of done: A `/corrections` or equivalent page explains how to report source issues and links to the verified correction email.

- [ ] Verify privacy-safe analytics after production deploy.
  Definition of done: Production analytics records page-level events only, does not store postcode lookups or political opinion signals, and honours the consent controls.

## Source And Data Foundation

- [ ] Convert current live Parliament fetches into a snapshot-first ingestion pipeline.
  Definition of done: Parliament seats, members, divisions, and upcoming business are fetched by an ingestion job before pages read them.

- [ ] Persist source documents, snapshots, excerpts, display facts, and ingestion runs to Supabase.
  Definition of done: The Supabase schema stores each entity type with stable IDs, source URLs, retrieval timestamps, and parser metadata.

- [ ] Ensure public pages can read last-good data from Supabase when a live source fails.
  Definition of done: A failed Parliament or postcode-adjacent source read shows the last successful persisted data with a visible stale/degraded note.

- [ ] Persist data-status check history beyond the current server process.
  Definition of done: `/status` can show last successful check and last attempted check after a cold start, deployment, or serverless instance change.

- [ ] Separate source retrieval time from app-cache check time.
  Definition of done: Public timestamps distinguish when Plain Politics checked its app cache from when the upstream source was last fetched or persisted.

- [ ] Add source cadence config for Parliament seats, members, divisions, and upcoming business.
  Definition of done: Each source family has an explicit expected refresh cadence, freshness threshold, and owner-facing failure threshold.

- [ ] Add golden fixture tests for each parser.
  Definition of done: Parser tests cover representative success, empty, malformed, stale, and suspicious data cases using checked-in fixtures.

- [ ] Add source registry metadata for every active and candidate source.
  Definition of done: Each source has publisher, licence/access notes, source tier, cadence, fields used, limitations, and public source URL.

- [ ] Add parser version tracking to persisted records.
  Definition of done: Ingested records can be traced to the parser version that created them.

- [ ] Add source hash dedupe.
  Definition of done: Unchanged source snapshots do not create duplicate persisted records.

## Change Tracking

- [ ] Add semantic diffing between consecutive source snapshots.
  Definition of done: The system can classify new, changed, removed, and unchanged records for at least one source family.

- [ ] Add a public `What changed` feed after snapshots and diffs exist.
  Definition of done: A public page lists recent verified changes with source links and checked times.

- [ ] Add Atom/RSS feeds for change events after the public feed exists.
  Definition of done: Feed readers can subscribe to verified change events with stable URLs and source links.

- [ ] Add filtered feeds for party, policy, bill, constituency, source family, and corrections.
  Definition of done: Users can open scoped feeds once those entities exist in persisted data.

## Beginner Product

- [ ] Expand `/my-area` with clearer explanations for recent votes and written questions.
  Definition of done: The page explains what each record type can and cannot prove, with links to source records and glossary terms.

- [ ] Add constituency pages after postcode lookup has persisted source data.
  Definition of done: Each constituency page has a stable URL, current MP, source links, and coverage-gap messaging.

- [ ] Add MP detail pages after member records are persisted.
  Definition of done: Each MP page has stable identity, constituency, party, current Commons membership, recent public records, and source links.

- [ ] Add local navigation for beginner journeys.
  Definition of done: Users can move between area, MP, constituency, glossary, Parliament, and sources without losing context.

- [ ] Add a local no-account learning trail if it can stay privacy-safe.
  Definition of done: The trail stores only local browser state, avoids political opinion profiling, and can be cleared by the user.

- [ ] Add more beginner glossary terms as they appear in real pages.
  Definition of done: New public pages do not introduce unexplained political or parliamentary jargon.

- [ ] Restore broad ideology glossary terms with stronger sourcing.
  Definition of done: Left wing, right wing, centre/centrist and similar terms use UK civic or academic sources, or are explicitly labelled as reviewed editorial definitions with limitations.

## Parties, Policies, And Comparison

- [ ] Create a feature branch for the first policy area after v1.0.0 is live.
  Definition of done: The branch exists, has a named first policy area, and keeps policy work out of the launch branch.

- [ ] Choose the first policy area on that feature branch.
  Definition of done: The chosen area has official source availability, user value, and manageable scope.

- [ ] Capture official party manifesto or policy pages as source snapshots.
  Definition of done: Each included party has source snapshots with URL, retrieval time, hash, and licence/access notes.

- [ ] Map reviewed excerpts to party positions for the first policy area.
  Definition of done: Every displayed party-position summary links to reviewed source excerpts.

- [ ] Build source-backed party profile sections with identical structure across parties.
  Definition of done: Party pages use the same section structure and show coverage gaps where evidence is missing.

- [ ] Build the first Compare view after evidence drawers/source excerpts work.
  Definition of done: The Compare view shows sourced positions side by side without voting advice or unsupported claims.

- [ ] Add coverage-gap states for missing or unverified party-policy evidence.
  Definition of done: Missing evidence is visibly labelled rather than silently omitted or inferred.

- [ ] Keep public-record side-by-side context non-judgemental unless reviewed manually.
  Definition of done: Review confirms the page does not score, rank, shame, or endorse parties.

## Parliament And Civic Calendar

- [ ] Add a dedicated upcoming dates/calendar page powered by reviewed sources.
  Definition of done: The page lists upcoming civic/parliamentary dates with source links, checked times, and coverage gaps.

- [ ] Separate upcoming Parliament business from recent GOV.UK or No. 10 activity.
  Definition of done: Calendar data sources are labelled by institution and never mixed under one ambiguous heading.

- [ ] Add civic explainer hooks for State Opening, PMQs, recess, Budget, elections, and party conferences.
  Definition of done: Relevant pages link to source-backed explainers or clearly labelled placeholder routes.

- [ ] Add bill and Hansard context after the evidence drawer can show exact source records.
  Definition of done: Bill/debate references include source URLs, record dates, and plain-English limitations.

## Polling, Money, And Wider Context

- [ ] Decide the first reliable free/public polling source strategy.
  Definition of done: The chosen source strategy documents licence/access, metadata availability, update cadence, and limitations.

- [ ] Implement polling only after required metadata can be captured.
  Definition of done: Polling records include fieldwork dates, sample size, pollster, client, method, geography, question wording, and source links.

- [ ] Add cautious polling language and no-forecast labels before showing polling movement.
  Definition of done: Polling pages explain uncertainty and avoid seat or election predictions unless a reviewed methodology exists.

- [ ] Research Electoral Commission donation data ingestion.
  Definition of done: A short technical note covers data access, fields, publication lag, entity resolution, and caveats.

- [ ] Add political finance only after entity resolution and source caveats are understood.
  Definition of done: Donation/finance records display source caveats, publication lag, and entity matching confidence.

- [ ] Design a public honesty dashboard beyond the current data-status badge.
  Definition of done: The design covers coverage, freshness, source gaps, corrections, and ingestion health without overwhelming users.

## Guided Civic Check

- [ ] Decide whether the guided civic check is a learning path only or may later include party-alignment scoring.
  Definition of done: The decision is recorded with privacy, neutrality, and methodology implications.

- [ ] Write methodology before building any party-match or alignment result.
  Definition of done: The methodology explains sources, scoring limits, neutrality safeguards, and privacy treatment.

- [ ] Build a source-backed question bank if the feature survives methodology review.
  Definition of done: Every question has a source rationale, neutral wording review, and coverage-gap handling.

- [ ] Keep answers anonymous by default and deletable locally.
  Definition of done: No answer leaves the browser unless the user explicitly opts in.

- [ ] Complete a DPIA before storing political opinions, quiz answers, or personalisation.
  Definition of done: The DPIA is reviewed and any required controls are implemented before storage exists.

## Search And Discovery

- [ ] Add beginner-friendly site search once there are enough live pages and source records to search.
  Definition of done: Search returns useful pages for glossary terms, explainers, Parliament records, sources, and area/MP routes.

- [ ] Start with structured filters and Postgres full-text search when persisted records exist.
  Definition of done: Search can filter by entity type, source family, date, and coverage state.

- [ ] Revisit a dedicated search service only if users cannot reliably find key records.
  Definition of done: A search evaluation shows Postgres search is insufficient for parties, policies, sources, votes, events, or polling records.

## Competitor-Inspired Experiments

- [ ] Design The Plain Week briefing.
  Definition of done: A page or prototype has sections for what Parliament did, what is coming next, one vote explained, and three terms decoded, each with source links.

- [ ] Design Ask Plain Politics.
  Definition of done: A prototype lets users submit a question, shows example questions, and explains that answered questions may become public explainers.

- [ ] Design share-card templates for glossary terms, explainers, and Commons votes.
  Definition of done: Templates include title, plain-English meaning, source, checked time, and canonical URL.

- [ ] Add a My MP Watch concept module to `/my-area`.
  Definition of done: After postcode lookup, placeholder cards explain planned votes, debates, written questions, and constituency mentions without implying they are live.

- [ ] Prototype Who can fix this.
  Definition of done: A neutral guided page maps common issues to council, MP/Parliament, devolved government, regulator, private provider, or court responsibility with source links.

- [ ] Add feedback buttons to explainers.
  Definition of done: Explainer pages include Clear, Still confused, and Source issue actions with a mock/local interaction and no backend dependency.

## Platform And Quality

- [ ] Add broken-link checks for source links and public navigation.
  Definition of done: CI or a scheduled job reports broken internal links and source URLs.

- [ ] Add accessibility smoke checks for core pages.
  Definition of done: Core routes pass automated accessibility checks for landmarks, headings, labels, colour contrast, and keyboard navigation.

- [ ] Add source-reference validation for public factual pages.
  Definition of done: CI fails when configured factual content lacks an approved source reference.

- [ ] Add neutrality lint or review checks for reviewed party/policy content.
  Definition of done: Party and policy content has a documented review step for partisan framing, unsupported judgement, and asymmetric wording.

- [ ] Add API/source health email alerts after ingestion runs are persisted.
  Definition of done: Operators receive deduped alerts when critical source checks fail beyond the configured threshold.

- [ ] Add alert dedupe and cooldown before sending repeated health emails.
  Definition of done: Repeated failures do not create alert spam and recovery messages are clear.

- [ ] Add deployment notes for Vercel, Cloudflare DNS, Email Routing, and required env vars.
  Definition of done: A maintainer can redeploy the app and verify DNS/email settings from the documentation.

- [ ] Decide and document the AI training-crawler policy beyond OpenAI bots.
  Definition of done: `robots.txt`, `/llms.txt`, and source policy agree on whether non-search training crawlers are allowed or blocked.

- [ ] Keep `.env.example` aligned with any Supabase or public runtime configuration.
  Definition of done: Every required environment variable is documented with safe placeholder values and no secrets.

- [ ] Revisit repo docs after each feature lands while keeping this backlog todo-only.
  Definition of done: Docs that describe current product behaviour match the shipped app, and this backlog contains only unfinished todos.
