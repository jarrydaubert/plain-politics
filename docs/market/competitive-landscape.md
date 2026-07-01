# Competitive Landscape Tracker

Last reviewed: 2026-07-01

## Positioning Hypothesis

Plain Politics should become a free, source-backed UK politics information tracker that explains what parties stand for, what their manifestos say, how popular they are, and what changed across polls, policies, donors, votes, and public records.

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

| Product | Source | What It Does Well | What To Borrow | Gap For Plain Politics |
|---|---|---|---|---|
| Electoral Calculus | <https://www.electoralcalculus.co.uk/homepage.html> | UK polling, predictions, seat-level projections, maps, and archives. | Poll-of-polls, trend history, seat projection labels, archive depth. | Pair polling with policy, donor, vote, and source-explanation layers. |
| Financial Times UK elections poll tracker | <https://www.ft.com/content/ec11dcb6-4f53-4215-a1a1-0b72b4bc7e29> | Polished polling tracker and leadership approval presentation. | Clean trend visualisation, restrained editorial tone, leadership ratings. | Free public access and source-level explainability. |
| Wikipedia opinion polling pages | <https://en.wikipedia.org/wiki/Opinion_polling_for_the_next_United_Kingdom_general_election> | Broad polling tables, historical context, and community-maintained references. | Transparent tables, source list discipline, history-first framing. | Product-grade UX, provenance model, automated freshness, and explainers. |
| Britain Elects / Election Maps UK | <https://electionmaps.uk/> | Fast-moving election and polling presentation for politically engaged users. | Speed, social-native updates, clear visual summaries. | Auditable source framework, neutral methodology pages, and broader evidence graph. |

### Parliamentary Transparency

| Product | Source | What It Does Well | What To Borrow | Gap For Plain Politics |
|---|---|---|---|---|
| TheyWorkForYou | <https://www.theyworkforyou.com/> | MP pages, debates, written answers, votes, interests, and alerts. | Person-centric navigation, plain-language parliamentary discovery, alert model. | Connect voting records to party profiles, policy positions, polling movement, and source-backed summaries. |
| TheyWorkForYou API | <https://www.theyworkforyou.com/api/> | Programmatic access to parliamentary data. | Reuse as possible upstream/source option, subject to terms and usage limits. | Need own provenance, source snapshots, and neutral methodology on top. |
| UK Parliament Votes | <https://votes.parliament.uk/> | Official Commons and Lords division records. | Primary-source vote ingestion and vote-detail pages. | Add comparison, policy mapping, and discrepancy methodology. |
| Hansard | <https://hansard.parliament.uk/> | Official parliamentary debate record. | Primary-source excerpts for statements and debates. | Add source-backed summaries, entity linking, and claim-to-source mapping. |
| UK Parliament Bills | <https://bills.parliament.uk/> | Official bill progress and documents. | Legislative tracker and event source. | Connect bills to party claims, policy promises, and explainer pages. |
| UK Parliament Developer Hub | <https://developer.parliament.uk/> | Official API entry point for Parliament data. | Prefer official APIs over scraped secondary copies where feasible. | Need product-specific normalization and quality gates. |

### Political Finance and Donors

| Product | Source | What It Does Well | What To Borrow | Gap For Plain Politics |
|---|---|---|---|---|
| Electoral Commission Registers Search | <https://search.electoralcommission.org.uk/> | Official search for political finance, parties, campaigners, donations, loans, and spending records. | Canonical finance source, donor history, recipient filters, publication-lag labels. | Better charts, entity resolution, trend summaries, and links to political context. |

### Fact-Checking and Evidence Organisations

| Product | Source | What It Does Well | What To Borrow | Gap For Plain Politics |
|---|---|---|---|---|
| Full Fact | <https://fullfact.org/> | Public fact-checking and evidence-led explainers. | Editorial discipline, corrections culture, clear uncertainty handling. | Plain Politics should not rate claims true/false by default; it should track sourced political evidence and changes. |

### Election and Candidate Information

| Product | Source | What It Does Well | What To Borrow | Gap For Plain Politics |
|---|---|---|---|---|
| Democracy Club | <https://democracyclub.org.uk/> | Civic election data and public democratic information infrastructure. | Public-good posture, election data partnerships, candidate/election data model inspiration. | Broader ongoing politics tracker across polls, policy, votes, donors, and plain-English explainers. |
| WhoCanIVoteFor | <https://whocanivotefor.co.uk/> | Candidate and election lookup for voters. | Location-based election discovery and accessible civic UX. | Persistent tracker after election day and source-backed policy intelligence. |

### Paid Political Intelligence and Public Affairs

| Product | Source | What It Does Well | What To Borrow | Gap For Plain Politics |
|---|---|---|---|---|
| Dods Political Intelligence | <https://www.dodspoliticalintelligence.com/> | Professional political monitoring, policy analysis, stakeholder intelligence, and public-affairs support. | Monitoring workflows, stakeholder/entity tracking, alerting, expert analysis patterns. | Free public access, open methodology, neutral civic framing, and source-backed public information. |
| PolicyMogul | <https://policymogul.com/> | Public-affairs platform for monitoring and engagement. | Monitoring feeds, stakeholder views, public-affairs workflow ideas. | Public civic product rather than professional lobbying workflow. |
| DeHavilland | <https://www.dehavilland.co.uk/> | Political monitoring and policy intelligence for public-affairs teams. | Alerts, briefings, policy issue tracking, organisation/stakeholder mapping. | Free source-backed public tracker with transparent methodology. |
| Vuelio | <https://www.vuelio.com/uk/> | Media, stakeholder, and political monitoring for communications teams. | Alerting, contact/stakeholder database patterns, monitoring workflow. | Avoid CRM/lobbying emphasis; focus on public evidence and user trust. |

## International Civic Product Benchmarks

These are not direct UK competitors, but they show useful product patterns from civic information tools in other countries.

| Product | Country / Region | Source | What It Does Well | What To Borrow | Caution For Plain Politics |
|---|---|---|---|---|---|
| Policy.nz | New Zealand | <https://policy.nz/> | Local-election guide that starts from area/election, compares candidates and policies, supports favourites, and uses simple voter-facing language. | Address/postcode-led onboarding, compare-by-topic cards, local-only favourites/research trail, clear "not telling you how to vote" copy. | Candidate questionnaires are labour-heavy and election-cycle dependent. |
| Vote Smart | United States | <https://justfacts.votesmart.org/> | Candidate and official profiles across biographies, votes, positions, ratings, statements, funding, RSS, and API products. | Standard profile tabs, "enter politician or zip code" search, issue-position source discipline, RSS/data reuse patterns. | Some API/data access may be commercial; avoid importing interest-group ratings as neutral truth. |
| Ballotpedia | United States | <https://ballotpedia.org/> | Large political encyclopedia covering candidates, elections, ballot measures, offices, and local races. | Encyclopedia depth, reusable page templates, ballot/local election explainers, issue pages that can be updated over time. | Scale requires a real editorial operation; do not copy wiki-like breadth before the corpus exists. |
| GovTrack | United States | <https://www.govtrack.us/> | Tracks bills, members, votes, and lets users follow legislative activity. | Bill/member tracking, follow/alert mental model, public data reuse, and long-run archives. | Ranking/report-card style features can become politically contentious unless methodology is very tight. |
| Open States / Plural Open | United States | <https://docs.openstates.org/> | Standardises legislative data across many jurisdictions and provides API/bulk downloads. | Public API, bulk data downloads, source standardisation, contribution workflows, and open issue reporting. | Data infrastructure is valuable later; not a v1 homepage feature. |
| Represent by OpenNorth | Canada | <https://represent.opennorth.ca/> | Postal-code/address lookup for elected officials and districts across federal, provincial, and municipal levels, with free API and downloads. | "Find my representatives" as infrastructure, multi-level government mapping, downloadable/open data posture. | UK version should be clear whether it covers Westminster only or also devolved/local government. |
| They Vote For You | Australia | <https://theyvoteforyou.org.au/> | Postcode/name MP lookup, issue-oriented voting records, policies, divisions, recent edits, open data, and API. | Simple question-led homepage, recent edits/change history, API/licensing page, issue pages that explain votes in plain language. | Avoid overstating that formal votes equal everything an MP does; show records without automatic judgement. |
| OpenAustralia Foundation | Australia | <https://oaf.org.au/> | Frames civic tools as public digital infrastructure and reports public usage metrics. | Public-good framing, donation support, service metrics, and a collection of focused tools rather than one overloaded interface. | Keep funding/donation asks secondary until the product has public value. |
| Wahl-O-Mat | Germany | <https://www.wahl-o-mat.de/> | Mass-market civic questionnaire with party responses, archives, high public awareness, and education materials. | Gamified issue-learning path, archived election editions, classroom/teacher explainers, and transparent question process. | Do not present as voting advice; UK product should be "learn where parties stand", not "who should I vote for". |
| smartvote | Switzerland | <https://smartvote.ch/> | Candidate/list matching, current/upcoming/archive elections, smartspider thematic charts, smartmap position maps, and published methodology. | Visual issue profiles, election archive, candidate/party participation stats, and methodology-backed charts. | Position maps and match percentages need careful explanation and should stay out of v1.0.0. |
| abgeordnetenwatch.de | Germany | <https://www.abgeordnetenwatch.de/> | Public questions to representatives, moderated Q&A, voting records, side-income/lobbying transparency, and candidate checks. | Moderated public question model, representative profile depth, and transparency/research stories. | Public Q&A requires moderation, legal process, and abuse handling; future feature, not v1. |

## International Patterns To Borrow

1. Lead with the user's context: postcode, address, constituency, election, issue, or "I do not know where to start".
2. Make the homepage a guided route, not a directory. The best comparators ask a simple question first.
3. Use local-only favourites, saved cards, or a research trail so exploration feels game-like without accounts or political profiling.
4. Keep trust and methodology visible but secondary: About, source drawers, source pages, corrections, and help text, not the first hero message.
5. Treat feeds, recent edits, and change history as retention features. They bring people back without persuasion.
6. Build reusable profile templates for MPs, parties, constituencies, policies, bills, sources, and glossary terms.
7. Offer public data and downloads once records are reviewed enough to reuse.
8. Keep any questionnaire educational first: show issue trade-offs and source-backed positions before any match score.
9. Prefer "show me what happened" over "tell me what to think"; avoid ranking politicians or parties without a published methodology.
10. Archive past elections, explainers, source snapshots, and changes so the site becomes more valuable with time.

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
9. From Policy.nz and Represent: local lookup as the first meaningful action.
10. From Wahl-O-Mat and smartvote: gamified civic learning, but with clear "not voting advice" limits.
11. From They Vote For You and GovTrack: recent edits, follows, alerts, and public data reuse.
12. From Open States and OpenAustralia: public infrastructure posture, APIs, downloads, and contribution/error reporting.

## Differentiation Strategy

Plain Politics should not try to be the best standalone polling model, the deepest parliamentary database, or a paid public-affairs CRM. It should win by connecting these evidence streams in a way normal users can trust.

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

### 2026-07-01

- Added international civic product benchmarks from New Zealand, the United States, Canada, Australia, Germany, and Switzerland.
- Reframed borrowed UX ideas around local-first onboarding, guided exploration, local-only favourites, change history, public data, and educational gamification.
