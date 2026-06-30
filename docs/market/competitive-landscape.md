# Competitive Landscape Tracker

Last reviewed: 2026-06-30

## Positioning Hypothesis

UK Policy Explainer should become a free, source-backed UK politics information tracker that explains what parties stand for, what their manifestos say, how popular they are, and what changed across polls, policies, donors, votes, and public records.

The current market appears fragmented. Polling trackers, parliamentary transparency tools, donor registers, fact-checking organisations, and paid public-affairs monitoring platforms each cover part of the need. The opportunity is to combine the best parts into one public, neutral, source-backed information product.

## Product North Star

Build the calmest, clearest place to answer:

1. Who is up or down in polling and leader ratings?
2. Which parties, leaders, policies, donors, votes, or events changed?
3. What source proves each change?
4. How complete and fresh is the source coverage?
5. What evidence is missing or stale?

## Competitive Categories

### Polling, Forecasts, and Momentum

| Product | Source | What It Does Well | What To Borrow | Gap For UK Policy Explainer |
|---|---|---|---|---|
| Electoral Calculus | <https://www.electoralcalculus.co.uk/homepage.html> | UK polling, predictions, seat-level projections, maps, and archives. | Poll-of-polls, trend history, seat projection labels, archive depth. | Pair polling with policy, donor, vote, and source-explanation layers. |
| Financial Times UK elections poll tracker | <https://www.ft.com/content/ec11dcb6-4f53-4215-a1a1-0b72b4bc7e29> | Polished polling tracker and leadership approval presentation. | Clean trend visualisation, restrained editorial tone, leadership ratings. | Free public access and source-level explainability. |
| Wikipedia opinion polling pages | <https://en.wikipedia.org/wiki/Opinion_polling_for_the_next_United_Kingdom_general_election> | Broad polling tables, historical context, and community-maintained references. | Transparent tables, source list discipline, history-first framing. | Product-grade UX, provenance model, automated freshness, and explainers. |
| Britain Elects / Election Maps UK | <https://electionmaps.uk/> | Fast-moving election and polling presentation for politically engaged users. | Speed, social-native updates, clear visual summaries. | Auditable source framework, neutral methodology pages, and broader evidence graph. |

### Parliamentary Transparency

| Product | Source | What It Does Well | What To Borrow | Gap For UK Policy Explainer |
|---|---|---|---|---|
| TheyWorkForYou | <https://www.theyworkforyou.com/> | MP pages, debates, written answers, votes, interests, and alerts. | Person-centric navigation, plain-language parliamentary discovery, alert model. | Connect voting records to party profiles, policy positions, polling movement, and source-backed summaries. |
| TheyWorkForYou API | <https://www.theyworkforyou.com/api/> | Programmatic access to parliamentary data. | Reuse as possible upstream/source option, subject to terms and usage limits. | Need own provenance, source snapshots, and neutral methodology on top. |
| UK Parliament Votes | <https://votes.parliament.uk/> | Official Commons and Lords division records. | Primary-source vote ingestion and vote-detail pages. | Add comparison, policy mapping, and discrepancy methodology. |
| Hansard | <https://hansard.parliament.uk/> | Official parliamentary debate record. | Primary-source excerpts for statements and debates. | Add source-backed summaries, entity linking, and claim-to-source mapping. |
| UK Parliament Bills | <https://bills.parliament.uk/> | Official bill progress and documents. | Legislative tracker and event source. | Connect bills to party claims, policy promises, and explainer pages. |
| UK Parliament Developer Hub | <https://developer.parliament.uk/> | Official API entry point for Parliament data. | Prefer official APIs over scraped secondary copies where feasible. | Need product-specific normalization and quality gates. |

### Political Finance and Donors

| Product | Source | What It Does Well | What To Borrow | Gap For UK Policy Explainer |
|---|---|---|---|---|
| Electoral Commission Registers Search | <https://search.electoralcommission.org.uk/> | Official search for political finance, parties, campaigners, donations, loans, and spending records. | Canonical finance source, donor history, recipient filters, publication-lag labels. | Better charts, entity resolution, trend summaries, and links to political context. |

### Fact-Checking and Evidence Organisations

| Product | Source | What It Does Well | What To Borrow | Gap For UK Policy Explainer |
|---|---|---|---|---|
| Full Fact | <https://fullfact.org/> | Public fact-checking and evidence-led explainers. | Editorial discipline, corrections culture, clear uncertainty handling. | UK Policy Explainer should not rate claims true/false by default; it should track sourced political evidence and changes. |

### Election and Candidate Information

| Product | Source | What It Does Well | What To Borrow | Gap For UK Policy Explainer |
|---|---|---|---|---|
| Democracy Club | <https://democracyclub.org.uk/> | Civic election data and public democratic information infrastructure. | Public-good posture, election data partnerships, candidate/election data model inspiration. | Broader ongoing politics tracker across polls, policy, votes, donors, and plain-English explainers. |
| WhoCanIVoteFor | <https://whocanivotefor.co.uk/> | Candidate and election lookup for voters. | Location-based election discovery and accessible civic UX. | Persistent tracker after election day and source-backed policy intelligence. |

### Paid Political Intelligence and Public Affairs

| Product | Source | What It Does Well | What To Borrow | Gap For UK Policy Explainer |
|---|---|---|---|---|
| Dods Political Intelligence | <https://www.dodspoliticalintelligence.com/> | Professional political monitoring, policy analysis, stakeholder intelligence, and public-affairs support. | Monitoring workflows, stakeholder/entity tracking, alerting, expert analysis patterns. | Free public access, open methodology, neutral civic framing, and source-backed public information. |
| PolicyMogul | <https://policymogul.com/> | Public-affairs platform for monitoring and engagement. | Monitoring feeds, stakeholder views, public-affairs workflow ideas. | Public civic product rather than professional lobbying workflow. |
| DeHavilland | <https://www.dehavilland.co.uk/> | Political monitoring and policy intelligence for public-affairs teams. | Alerts, briefings, policy issue tracking, organisation/stakeholder mapping. | Free source-backed public tracker with transparent methodology. |
| Vuelio | <https://www.vuelio.com/uk/> | Media, stakeholder, and political monitoring for communications teams. | Alerting, contact/stakeholder database patterns, monitoring workflow. | Avoid CRM/lobbying emphasis; focus on public evidence and user trust. |

## Upstream Source Standards To Borrow

### British Polling Council Disclosure Metadata

Source: <https://www.britishpollingcouncil.org/rules-of-disclosure/>

Polling records should store and display, where available:

1. Pollster and client.
2. Fieldwork dates.
3. Sample size and population.
4. Methodology or mode.
5. Question wording.
6. Geographic scope.
7. Full tables link.
8. Weighting notes.
9. Uncertainty or margin-of-error caveat.

### Official-First Public Data

Prefer official sources for canonical records:

1. Votes: <https://votes.parliament.uk/>
2. Debates: <https://hansard.parliament.uk/>
3. Bills: <https://bills.parliament.uk/>
4. Parliament APIs: <https://developer.parliament.uk/>
5. Donations and political finance: <https://search.electoralcommission.org.uk/>

## Feature Principles To Take From The Market

1. From Electoral Calculus: polling averages, seat-level modelling, and long-run archives.
2. From FT: elegant polling charts, leadership approval framing, and restrained narrative.
3. From TheyWorkForYou: MP/person pages, alerts, and human-readable parliamentary records.
4. From Parliament official services: primary-source authority and stable provenance.
5. From Electoral Commission: official political finance records and reporting-period context.
6. From Full Fact: visible uncertainty, correction culture, and evidence discipline.
7. From paid political intelligence tools: monitoring, alerts, entity tracking, and stakeholder-style navigation.
8. From Democracy Club: civic-public-good posture and accessible voter-first UX.

## Differentiation Strategy

UK Policy Explainer should not try to be the best standalone polling model, the deepest parliamentary database, or a paid public-affairs CRM. It should win by connecting these evidence streams in a way normal users can trust.

The product should differentiate on:

1. Free public access.
2. Source-backed change tracking.
3. Claim-to-source explainability.
4. Neutral, non-persuasive presentation.
5. Polling movement with uncertainty and metadata.
6. Policy, vote, donor, and polling context in one graph.
7. Search and explainer pages that show coverage gaps instead of unsupported claims.
8. Visible freshness and coverage gaps.

## Recommended MVP Slice

Start narrow enough to be excellent:

1. Polling tracker for national Westminster voting intention.
2. Leader approval or favourability tracker if reliable data sources are available.
3. Party policy tracker for 5 high-salience issues.
4. Official vote tracker for selected Commons divisions.
5. Donation tracker using Electoral Commission public records.
6. Search and plain-English explainers over only the ingested, source-backed corpus.
7. Methodology pages explaining polling averages, source tiers, freshness, and uncertainty.

## Tracker Review Cadence

Review this file monthly during product discovery and quarterly after launch.

For each review, record:

1. New competitors or adjacent tools.
2. New feature launches by tracked products.
3. Pricing/access changes.
4. API/source availability changes.
5. UX ideas worth borrowing.
6. Risks to differentiation.

## Review Log

### 2026-06-30

- Created initial competitive landscape.
- Identified the main gap as a free, public, source-backed tracker combining polls, policy, donations, votes, party profiles, and plain-English explainers.
- Added source standards for polling metadata and official public data.
