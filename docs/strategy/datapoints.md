# Target Datapoints

Last updated: 2026-06-30

## Purpose

This catalogue lists the public political datapoints UK Policy Explainer should aim to collect, normalize, display, and trace back to source records.

The first implementation principle is:

```text
source_document -> source_snapshot -> source_excerpt -> display_fact/chart_datapoint/table_row
```

## Hooked First

### UK Parliament Members API - State Of The Parties

Source: <https://members-api.parliament.uk/>

Initial datapoints:

1. Party name, abbreviation and colour.
2. Current House of Commons seat count by party.
3. Gender count by party where provided by the API.
4. Source retrieval URL, snapshot hash and excerpt path.

### UK Parliament Members API - Current Commons Members

Source: <https://members-api.parliament.uk/>

Initial datapoints:

1. MP name.
2. Member ID.
3. Party.
4. Constituency.
5. Membership start date.
6. Gender where returned.
7. Profile and thumbnail links where returned.
8. Source retrieval URL, snapshot hash and excerpt path.

### Postcode And Constituency Starter

Sources: <https://api.postcodes.io/>, <https://members-api.parliament.uk/>

Initial datapoints:

1. User-entered postcode, processed transiently unless explicit consent exists.
2. Normalized postcode.
3. Westminster parliamentary constituency name.
4. Constituency code.
5. Local authority and ward where available.
6. Current MP name.
7. Current MP party.
8. Commons membership start date.
9. Member ID and Parliament profile link where available.
10. Source retrieval URL, snapshot hash and excerpt path.
11. Privacy state showing whether the postcode was stored, discarded, or anonymized.

### MP Public Record Starter

Sources: <https://members-api.parliament.uk/>, <https://commonsvotes-api.parliament.uk/>

Initial datapoints:

1. Recent Commons division title and date.
2. Member vote where available.
3. Division outcome and vote totals.
4. Recent written questions asked by the member where available.
5. Recent debate, committee, or bill involvement where available and source-mapped.
6. Upcoming Parliament events relevant to the member, constituency, bill, or policy area where source data supports the link.
7. Local relevance label: direct local source, constituency mention, member activity, or no local link verified.
8. Source retrieval URL, snapshot hash and excerpt path.

### UK Parliament Commons Votes API

Source: <https://commonsvotes-api.parliament.uk/>

Initial datapoints:

1. Division ID and number.
2. Division title.
3. Division date.
4. Publication updated timestamp.
5. Aye count and No count.
6. Tellers and party affiliations where returned.
7. Member vote lists for deeper future views.
8. Source retrieval URL, snapshot hash and excerpt path.

### UK Parliament What's On API

Source: <https://whatson-api.parliament.uk/calendar/events/list.json>

Initial datapoints:

1. Event ID.
2. Start and end date.
3. Start and end time where returned.
4. House.
5. Event type.
6. Category.
7. Description.
8. Location where returned.
9. Member names and parties where returned.
10. Bill ID, bill name and bill page link where returned.
11. Cancellation date where returned.
12. Source retrieval URL, snapshot hash and excerpt path.

## Party And Policy Datapoints

1. Party name.
2. Party abbreviation.
3. Party colour/branding where official or API-provided.
4. Official party website.
5. Official manifesto URL.
6. Policy area.
7. Policy position summary.
8. Original quoted excerpt.
9. Source tier.
10. Last checked timestamp.
11. Source published/updated timestamp where available.
12. Coverage state: strong, partial, no verified source.
13. Change status: new, changed, removed, unchanged.

## Glossary And Civic Tradition Datapoints

Sources: UK Parliament glossary, UK Parliament learning pages, Electoral Commission voting guidance, GOV.UK where relevant.

Initial datapoints:

1. Term.
2. Plain-English definition.
3. Category: Parliament, elections, parties, procedure, or traditions.
4. Why it matters in product context.
5. Official source URL.
6. Source publisher and source tier.
7. Last checked timestamp.
8. Related pages where the term should appear inline.
9. Review status and version history.

## Manifesto Datapoints

1. Manifesto title.
2. Party.
3. Election or publication context.
4. Publication date.
5. Source URL.
6. Snapshot hash.
7. Extracted sections.
8. Policy area tags.
9. Page/section labels.
10. Change diff against prior snapshot where available.

## Polling And Popularity Datapoints

Polling should stay out of the Phase 0 critical path unless source access and metadata are straightforward.

Desired fields:

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
14. Leader approval/favourability where available.
15. Issue salience where available.
16. Rolling average value.
17. Movement since previous comparable poll/average.
18. Uncertainty caveat.

## Elections And Constituencies

1. Constituency name and ID.
2. Boundary geometry.
3. Nation/region.
4. Current MP.
5. Current MP party.
6. Election date.
7. Candidate name.
8. Candidate party.
9. Votes.
10. Vote share.
11. Majority.
12. Turnout.
13. Result source.

## Parliament Datapoints

1. MP name.
2. MP member ID.
3. Party.
4. Constituency.
5. House.
6. Membership start/end dates.
7. Committee roles.
8. Registered interests.
9. Written questions.
10. Debate contributions.
11. Division votes.
12. Bill sponsorship or participation where available.

## Donations And Political Finance

1. Donor name.
2. Donor type.
3. Recipient party or campaigner.
4. Amount.
5. Donation date.
6. Accepted date.
7. Reported/publication date.
8. Donation category.
9. Electoral Commission source link.
10. Reporting period.
11. Entity-resolution key.

## Events And Calendar

1. Event title.
2. Event type.
3. Party or institution.
4. Start/end date.
5. Location.
6. Source URL.
7. Last checked timestamp.
8. ICS export fields.
9. Cancellation or change status.
10. Bill link where relevant.
11. Election type for civic deadlines.
12. Registration, postal vote, proxy vote and nomination deadlines where available.

## Source And Quality Datapoints

1. Source document URL.
2. Source title.
3. Publisher.
4. Source tier.
5. Licence/terms note.
6. Robots outcome where relevant.
7. Retrieved timestamp.
8. Published timestamp.
9. Snapshot hash.
10. Parser version.
11. Parser confidence.
12. Freshness state.
13. Broken-link status.
14. Review status.
15. Correction history.
