# Data Model Notes

Last updated: 2026-06-30

## Purpose

The data model should make public political information traceable from every displayed fact, chart datapoint, table row, and map region back to its public source.

## Core Provenance Chain

The heart of the product is:

```text
source_document -> source_snapshot -> source_excerpt -> display_fact/chart_datapoint/table_row
```

This chain is required for party profiles, policy summaries, manifesto pages, polling views, donation tables, vote records, maps, and explainers.

## Core Tables

### Sources

1. `source_documents`
2. `source_snapshots`
3. `source_excerpts`
4. `source_references`
5. `source_domains`
6. `source_licence_notes`

### Political Entities

1. `parties`
2. `party_profiles`
3. `policy_areas`
4. `policy_positions`
5. `manifestos`
6. `constituencies`

### Public Records

1. `pollsters`
2. `polls`
3. `poll_results`
4. `polling_averages`
5. `donations`
6. `vote_records`
7. `bills`
8. `debate_records`
9. `events`

### Display And Review

1. `display_facts`
2. `chart_datapoints`
3. `table_rows`
4. `coverage_gaps`
5. `corrections`
6. `editorial_reviews`

### Operations

1. `ingestion_runs`
2. `parser_versions`
3. `parser_outputs`
4. `freshness_checks`
5. `broken_link_checks`

## Required Source Fields

Each factual record should be able to expose:

1. source URL
2. source publisher
3. source title
4. source tier
5. retrieval date
6. publication date when available
7. content hash
8. parser version
9. source excerpt or row reference
10. freshness state

## Design Rule

Do not treat plain-English summaries as the source of truth. Summaries are presentation. Structured records and source excerpts are the source-backed substrate.
