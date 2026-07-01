# UK Policy Explainer

UK Policy Explainer is a UK-focused, source-first politics starter and information tracker. The product goal is to help people who know little or nothing about politics understand the basics, start from their postcode or an issue they care about, see who represents them, what parties stand for, how popular they are, and what changed across public political evidence.

## Current State

This repository now has a Bun/Next.js application scaffold plus planning and operating-standard docs. The first live source hooks are wired through official UK Parliament APIs on `/parliament`, with typed parsing and in-memory provenance objects before rendering.

## Source Of Truth

- Product requirements: `PRD_V2.md`
- Architecture decisions: `DECISIONS.md`
- Technical baseline: `TECH_STACK.md`
- Delivery plan: `UK_POLICY_EXPLAINER_ACTION_PLAN.md`
- Delivery backlog: `backlog.md`
- Methodology standards: `docs/methodology/`
- Strategy and current assessment: `docs/strategy/`
- Competitive landscape: `docs/market/`
- Agent instructions: `AGENTS.md`

## Non-Negotiables

- Every factual answer must be source-backed.
- Beginner-first entry points should assume no political knowledge.
- Primary sources are preferred over secondary context.
- Political neutrality is a quality gate, not a writing preference.
- No source means no factual claim.
- Privacy defaults must treat political opinion signals as high-risk data.
- Light gamification should reward learning, source-checking, and exploration, never political preference.
- The product is informational only: no campaign advice, no tactical voting recommendations.

## Repo Map

```text
.
|-- AGENTS.md
|-- DECISIONS.md
|-- IDEA_BRIEF.md
|-- PRD_V2.md
|-- TECH_STACK.md
|-- UK_POLICY_EXPLAINER_ACTION_PLAN.md
|-- backlog.md
|-- app/
|-- docs/
|   |-- engineering/
|   |-- market/
|   |-- methodology/
|   |-- quality/
|   `-- strategy/
|-- src/
|   |-- components/
|   |-- data/
|   |-- lib/
|   `-- sources/
|-- supabase/
|   `-- migrations/
|-- tests/
`-- .claude/
    |-- product-marketing-context.md
    `-- skills/
```

## Implementation Commands

Use the project commands documented in `AGENTS.md`:

```bash
bun run dev
bun run fix-all
bun run test:no-coverage
bun run test
bun run test:e2e
bun run build
```

## Live Source Hooks

- `/parliament` calls the UK Parliament Members API for Commons party seat counts.
- `/parliament` calls the UK Parliament Members API for a sample of current Commons members.
- `/parliament` calls the UK Parliament Commons Votes API for recent Commons divisions.
- `/sources` lists live hooks, candidate feeds, review-sensitive sources, and target datapoint groups.
