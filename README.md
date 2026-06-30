# UK Policy Explainer

UK Policy Explainer is a UK-focused, source-first political information tracker concept. The product goal is to help people see what parties stand for, what their manifestos say, how popular they are, and what changed across polls, policies, donors, votes, and public political evidence.

## Current State

This repository is currently a planning and operating-standards repo. The app scaffold described in `TECH_STACK.md` has not been created yet, so the Bun/Next.js commands in `AGENTS.md` apply once implementation code exists.

## Source Of Truth

- Product requirements: `PRD_V2.md`
- Architecture decisions: `DECISIONS.md`
- Technical baseline: `TECH_STACK.md`
- Delivery plan: `UK_POLICY_EXPLAINER_ACTION_PLAN.md`
- Methodology standards: `docs/methodology/`
- Strategy and current assessment: `docs/strategy/`
- Competitive landscape: `docs/market/`
- Agent instructions: `AGENTS.md`

## Non-Negotiables

- Every factual answer must be source-backed.
- Primary sources are preferred over secondary context.
- Political neutrality is a quality gate, not a writing preference.
- No source means no factual claim.
- Privacy defaults must treat political opinion signals as high-risk data.
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
|-- docs/
|   |-- engineering/
|   |-- market/
|   |-- methodology/
|   |-- quality/
|   `-- strategy/
`-- .claude/
    |-- product-marketing-context.md
    `-- skills/
```

## Implementation Commands

When the application scaffold exists, use the project commands documented in `AGENTS.md`:

```bash
bun run dev
bun run fix-all
bun run test:no-coverage
bun run test
bun run test:e2e
bun run build
```

Until then, validate documentation changes by reviewing local links, checking Markdown structure, and confirming `git status --short` only contains intended changes.
