# Source Trust Framework

## Purpose

The source trust framework keeps sourcing decisions consistent, auditable, and politically neutral. It governs search, ingestion, source-reference display, and editorial review.

## Source Tiers

### Tier 1: Authoritative Primary

Use first when available.

- Official legislation and statutory material
- Parliamentary records and committee materials
- Official party publications and manifestos
- Electoral Commission publications and registers
- GOV.UK and other official public bodies

### Tier 2: Institutional Public

Use for public context, statistics, oversight, and corroboration.

- Public statistics and official datasets
- Regulators and oversight bodies
- Public audit and inquiry reports
- Non-partisan public institutions

### Tier 3: Secondary Context

Use only when primary or institutional evidence is unavailable, insufficient, or needs contextual explanation.

- Reputable news publishers
- Research organisations
- Academic or civil society publications

Tier 3 sources must not override higher-tier sources. They should be labelled as context, not canonical evidence.

## Blocked By Default

- Anonymous blogs
- Unverifiable social posts
- Campaign material without a named publisher and stable URL
- Scraped pages that disallow collection under robots or site terms
- Any source with unclear provenance

## Required Provenance Fields

Each factual record should include:

- `source_url`
- `source_type`
- `source_publisher`
- `retrieved_at`
- `published_at` when available
- `content_hash`
- `extract_method`
- `source_excerpt_id`
- `source_tier`
- `parser_version`

## Review Triggers

Route records to review when:

1. A new publisher or domain appears.
2. Tier 1 and Tier 2 sources conflict.
3. The parser confidence drops below the release threshold.
4. A source has moved, disappeared, or changed materially.
5. A claim cannot be tied to a stable source excerpt.
