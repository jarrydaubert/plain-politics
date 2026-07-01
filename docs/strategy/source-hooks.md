# Source Hook Inventory

Last updated: 2026-06-30

## Purpose

This document tracks public data feeds UK Policy Explainer can use for a free, current, source-backed politics tracker.

Use this status language:

- `Hooked now`: implemented in the app with typed parsing and provenance objects.
- `Candidate`: likely useful and public, but not wired yet.
- `Needs review`: useful, but terms, licensing, export limits, scraping policy, or metadata quality need checking before ingestion.

## Hooked Now

### UK Parliament Members API - State Of The Parties

Source: <https://members-api.parliament.uk/>

Implemented in: `src/sources/uk-parliament.ts`, `app/parliament/page.tsx`

Current datapoints:

1. Party name.
2. Party abbreviation.
3. Party colour where returned.
4. Current House of Commons seat count by party.
5. Gender counts by party where returned.
6. Retrieval URL.
7. Snapshot hash.
8. Source excerpt path.

Product use:

1. Live Parliament page.
2. Home dashboard API hook count.
3. Party profile factual panels.
4. Future Commons composition chart.

### UK Parliament Members API - Current Members Sample

Source: <https://members-api.parliament.uk/>

Implemented in: `src/sources/uk-parliament.ts`, `app/parliament/page.tsx`

Current datapoints:

1. Member ID.
2. Display name.
3. Full title where returned.
4. Current party.
5. Current constituency.
6. Membership start date.
7. Gender where returned.
8. Thumbnail/profile links where returned.
9. Retrieval URL.
10. Snapshot hash.
11. Source excerpt path.

Product use:

1. MP directory.
2. Constituency pages.
3. Party membership pages.
4. Future member activity pages.

### UK Parliament Commons Votes API - Recent Divisions

Source: <https://commonsvotes-api.parliament.uk/>

Implemented in: `src/sources/uk-parliament.ts`, `app/parliament/page.tsx`

Current datapoints:

1. Division ID.
2. Division number.
3. Division title.
4. Division date.
5. Publication updated timestamp.
6. Aye count.
7. No count.
8. Retrieval URL.
9. Snapshot hash.
10. Source excerpt path.

Product use:

1. Recent votes widget.
2. Party vote record pages.
3. Policy timelines.
4. Future vote detail pages with member-level votes.

### UK Parliament What's On API - Upcoming Parliamentary Business

Source: <https://whatson-api.parliament.uk/calendar/events/list.json>

Implemented in: `src/sources/uk-parliament.ts`, `app/parliament/page.tsx`

Current datapoints:

1. Event ID.
2. Start date.
3. End date.
4. Start time where returned.
5. End time where returned.
6. House.
7. Event type.
8. Category.
9. Description.
10. Location where returned.
11. Member names and parties where returned.
12. Bill ID, bill name, and bill page link where returned.
13. Cancellation date where returned.
14. Retrieval URL.
15. Snapshot hash.
16. Source excerpt path.

Product use:

1. Upcoming dates widget.
2. Parliament calendar page.
3. Bill and policy timelines.
4. Election-day and sitting-day context around the UK time/date navbar.

## Candidate Next

### Postcode And Constituency Lookup

Sources: <https://api.postcodes.io/>, <https://members-api.parliament.uk/>

Likely datapoints:

1. Normalized postcode.
2. Westminster parliamentary constituency name.
3. Constituency code.
4. Local authority and ward where available.
5. Current MP name and member ID.
6. Current MP party.
7. Commons membership start date.
8. Parliament profile link where available.

Why it matters:

This is the best beginner on-ramp: start from where the user lives, then explain who represents them and what public sources say.

Review needed:

1. Privacy handling for postcodes.
2. Fallback behaviour for invalid, partial, new, or ambiguous postcodes.
3. Source precedence between postcode lookup and Parliament location search.
4. Northern Ireland, devolved, and boundary-edge handling.

### MP Public Record Starter

Sources: <https://members-api.parliament.uk/>, <https://commonsvotes-api.parliament.uk/>

Likely datapoints:

1. Recent member votes.
2. Division title, date, vote totals, and member vote.
3. Recent written questions where exposed by member endpoints.
4. Debate, committee, bill, or event involvement where source mapping is reliable.
5. Local relevance label: direct local source, constituency mention, member activity, or no local link verified.

Why it matters:

Users care more about "what has my representative done publicly?" than abstract national records. This should show the record without overclaiming local impact.

Review needed:

1. Endpoint coverage and pagination.
2. Plain-English labels for parliamentary procedure.
3. Rules for when an activity is allowed to be described as locally relevant.
4. Evidence drawer coverage for each activity row.

### Official Glossary And Civic Learning Sources

Sources: <https://www.parliament.uk/site-information/glossary/>, <https://www.parliament.uk/about/how/>, <https://www.electoralcommission.org.uk/voting-and-elections>

Likely datapoints:

1. Political or parliamentary term.
2. Official definition or explanatory source page.
3. Plain-English product definition.
4. Category: Parliament, elections, parties, procedures, or traditions.
5. Related product pages where the term should be explained inline.

Why it matters:

The beginner journey fails if users meet terms such as division, whip, written question, by-election, manifesto, or Royal Assent and have to leave the site to understand them.

Review needed:

1. Source hierarchy for terms that appear in multiple official sources.
2. Editorial review to simplify without changing meaning.
3. Accessibility pattern for inline definitions and glossary links.
4. Versioning when official source wording changes.

### UK Parliament Bills

Source: <https://bills.parliament.uk/>

Likely datapoints:

1. Bill ID.
2. Bill title.
3. Current stage.
4. Stage dates.
5. Sponsor or responsible member where available.
6. Bill documents.
7. Explanatory notes.
8. Source document links.

Why it matters:

Bills connect party promises and policy claims to what Parliament is actually considering.

Review needed:

1. Endpoint map.
2. Document download handling.
3. Stage/status normalization.
4. Source excerpt extraction for summaries.

### Hansard Debates

Source: <https://hansard.parliament.uk/>

Likely datapoints:

1. Debate title.
2. Sitting date.
3. House.
4. Speaker/member.
5. Contribution text.
6. Column reference.
7. Topic tags where available.

Why it matters:

Hansard can back plain-English explainers and member activity pages with official debate excerpts.

Review needed:

1. Best ingestion route.
2. Excerpt length rules.
3. Neutral presentation rules for debate summaries.

### Party Manifestos And Policy Pages

Sources: official party websites, manifesto PDFs, archived snapshots.

Likely datapoints:

1. Party.
2. Manifesto title.
3. Publication or election context.
4. Publication date where available.
5. Policy area.
6. Page/section label.
7. Exact quote or excerpt.
8. Change diff against prior snapshot.

Why it matters:

This is the core input for "what does this party stand for?" and policy comparison.

Review needed:

1. Crawl permissions.
2. PDF parsing quality.
3. Manual review workflow.
4. Archive strategy for changed or removed pages.

### No. 10 GOV.UK Activity

Source: <https://www.gov.uk/government/organisations/prime-ministers-office-10-downing-street.atom>

Likely datapoints:

1. Entry title.
2. Published or updated timestamp.
3. Document URL.
4. Summary.
5. Content type inferred from URL path where appropriate.

Why it matters:

This can track Prime Minister statements, speeches, releases, and meetings after publication.

Review needed:

1. It is not a forward-looking official diary.
2. It should be labelled as recent government activity, not upcoming No. 10 dates.
3. It should be connected to policy timelines only when the release itself is relevant.

## Needs Review

### Electoral Commission Political Finance Registers

Source: <https://search.electoralcommission.org.uk/>

Likely datapoints:

1. Donation, loan, spending, registration, account, asset or liability reference.
2. Regulated entity.
3. Donor, lender or supplier.
4. Amount.
5. Accepted date.
6. Received date.
7. Reported date.
8. Reporting period.
9. Donor status.
10. Donation type.
11. Search result URL or export reference.

Why it matters:

This enables party money tables, donor trend charts, and source-backed finance context.

Review needed:

1. Terms and acceptable automation.
2. Export limits and formats.
3. Whether stable per-record URLs exist.
4. Entity resolution rules.

### Polling And Popularity

Sources: pollster publications, full tables, British Polling Council disclosure rules, and carefully reviewed secondary trackers.

Reference: <https://www.britishpollingcouncil.org/rules-of-disclosure/>

Likely datapoints:

1. Pollster.
2. Client or commissioner.
3. Fieldwork start date.
4. Fieldwork end date.
5. Publication date.
6. Sample size.
7. Population.
8. Geography.
9. Collection method.
10. Question wording.
11. Weighting notes.
12. Full tables URL.
13. Party vote share.
14. Rolling average.
15. Movement since previous comparable poll or average.
16. Uncertainty caveat.

Why it matters:

Polling answers the user question "who is up or down?" but must avoid treating noisy changes as certainty.

Review needed:

1. Whether a reliable free source exists.
2. Licensing for poll tables and aggregation.
3. Pollster inclusion rules.
4. Methodology for averages and movement thresholds.
5. How to distinguish fieldwork, publication and retrieval dates.

### Elections And Civic Deadlines

Sources: Electoral Commission guidance, local authority notices, Democracy Club data, GOV.UK, and official election announcements.

Likely datapoints:

1. Election name.
2. Election type.
3. Polling day.
4. Registration deadline.
5. Postal vote deadline.
6. Proxy vote deadline.
7. Candidate nomination deadline where available.
8. Counting date or expected declaration window where available.
9. Geography.
10. Source authority.

Why it matters:

This is the right home for snap election timelines, by-elections, local elections, devolved elections, and voter deadlines.

Review needed:

1. Source authority hierarchy.
2. Whether a reliable free API exists for each election type.
3. How quickly official announcements are reflected in downstream civic datasets.
4. How to represent uncertain or not-yet-formally-announced dates.

## Priority Order

1. Add postcode and current-MP lookup for the beginner `my area` journey.
2. Keep expanding official Parliament APIs, especially member votes and written questions.
3. Add manifesto and party-policy ingestion for the plain-English party pages.
4. Add bills and Hansard to connect policies to live parliamentary action.
5. Add election/civic deadline sources after source authority rules are clear.
6. Add Electoral Commission finance once terms and exports are clear.
7. Add polling only when source access and metadata quality are good enough.

The first user-facing win is not "all data everywhere." It is one page where every table row or summary visibly links back to an official source chain.
