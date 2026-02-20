# Product Marketing Context

Last updated: 2026-02-20

## Product

**Name:** UK Policy Explainer (working title)
**Type:** Free civic information platform
**URL:** TBD
**Status:** Pre-build (public beta target: May 2026)

## One-Line Description

A UK-focused, source-first political intelligence platform that helps users compare parties, policies, donors, and voting behavior with auditable AI explanations.

## Problem

Political information is fragmented across official publications, parliamentary records, and media summaries. Users can rarely compare party positions in one place, verify claims against primary sources quickly, track policy changes over time, or distinguish clear evidence from weak or missing evidence.

## Target Audience

1. **Politically engaged citizens** — want to understand policy but don't have time to read Hansard or legislation.gov.uk
2. **Journalists and researchers** — need quick, verified summaries with traceable citations
3. **Students and educators** — studying UK politics and government
4. **Campaign and advocacy groups** — tracking policy positions and donor patterns

## Value Proposition

Fast, plain-English answers to UK political questions, with every claim backed by a verifiable primary source. No opinion, no spin — just auditable facts.

## Differentiators

1. **Claim-to-citation traceability** — every factual statement links to a primary source
2. **Source trust tiers** — explicit hierarchy (legislation > institutional > secondary) with coverage gaps shown
3. **Neutrality as operational QA** — not aspirational, enforced in editorial and automated checks
4. **Freshness SLAs** — visible `last verified` dates and automated staleness detection
5. **Public corrections workflow** — errors are logged publicly and corrected transparently

## Product Model

- Free, no accounts required, no paywall
- No ads, no sponsored content
- Revenue model TBD (likely grants, donations, or premium data access for institutions)

## Brand Voice

- Clear and authoritative, never partisan
- British English (colour, organised, programme)
- Professional but accessible — explain complex policy in plain language
- Citation-heavy — always show your working
- Humble about uncertainty — explicitly flag what is unclear or contested

## Proof Types

- Primary source citations (legislation.gov.uk, Hansard, Electoral Commission)
- Methodology transparency (public scoring rubric, source trust framework)
- Freshness indicators ("Last verified: [date]", "Source updated: [date]")
- Correction history (public log of changes and corrections)
- Coverage gap indicators ("No primary source found for this claim")

## CTAs

- "Compare Party Positions" (compare view)
- "Ask a Question" (AI Q&A)
- "View Sources" (methodology/transparency)
- "Stay Updated" (newsletter signup)
- "Report an Error" (corrections workflow)

## Key Pages

| Page Type | URL Pattern | Purpose |
|-----------|-------------|---------|
| Compare | `/compare/[issue]` | Side-by-side party comparison |
| Explainer | `/explain/[topic]` | Plain-English policy/law reference |
| Policy Tracker | `/policy/[party]/[policy]` | Single-party policy deep-dive with versioning |
| Ask AI | `/ask/[question]` | Grounded AI answer with citations |
| MP Profile | `/mp/[name]` | Voting record, stated positions, donors |
| Donor Profile | `/donor/[entity]` | Donation history, recipient breakdown |
| Methodology | `/methodology` | Source framework, trust tiers, correction log |

## Tech Stack

- Next.js 16 + React 19 + TypeScript 5.9+
- Tailwind CSS 4 + Zustand 5 + Zod 4
- Supabase (Postgres + pgvector)
- Vercel AI SDK
- Hosting: Vercel

## Competitors / Adjacent Products

- TheyWorkForYou (MySociety) — MP tracking, Hansard search
- Full Fact — fact-checking
- UK Parliament website — raw Hansard and committee reports
- Institute for Government — policy analysis
- Wikipedia UK politics articles — general reference

## What This Product Is NOT

- Not a fact-checker (doesn't rate claims true/false — shows evidence and lets users decide)
- Not a news site (doesn't cover events — covers policy and law)
- Not partisan or campaigning (no endorsements, no opinion)
- Not a social platform (no comments, no user profiles)
