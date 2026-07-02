# Plain Politics

Plain Politics is a UK-focused, source-first politics starter and information tracker. The product goal is to help people who know little or nothing about politics understand the basics, start from their postcode or an issue they care about, see who represents them, what parties stand for, how popular they are, and what changed across public political evidence.

## Current State

This repository now has a Bun/Next.js application scaffold plus planning and operating-standard docs. The first live source hooks are wired through official UK Parliament APIs on `/parliament`, with typed parsing and in-memory provenance objects before rendering.

## Source Of Truth

- Product requirements: `docs/product/prd-v2.md`
- Idea brief and success metrics: `docs/product/idea-brief.md`
- Delivery plan: `docs/project/action-plan.md`
- Delivery backlog: `docs/project/backlog.md`
- Technical baseline: `docs/engineering/tech-stack.md`
- Brand identity: `docs/brand/logo.md`
- GBrain usage policy: `docs/engineering/gbrain.md`
- Vercel plugin skill policy: `docs/engineering/vercel-plugin-skills.md`
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
- No progress bars, badges, or unlock mechanics in v1; keep exploration low-pressure and self-directed.
- The product is informational only: no campaign advice, no tactical voting recommendations.

## Repo Map

```text
.
|-- AGENTS.md
|-- README.md
|-- app/
|-- docs/
|   |-- brand/
|   |-- engineering/
|   |   `-- tech-stack.md
|   |-- market/
|   |-- methodology/
|   |-- product/
|   |   |-- idea-brief.md
|   |   `-- prd-v2.md
|   |-- project/
|   |   |-- action-plan.md
|   |   `-- backlog.md
|   |-- quality/
|   `-- strategy/
|-- public/
|-- src/
|   |-- components/
|   |-- data/
|   |-- lib/
|   `-- sources/
|-- supabase/
|   `-- migrations/
|-- tests/
|-- .github/
`-- .claude/
    |-- product-marketing-context.md
    `-- skills/
```

## Implementation Commands

Use the project commands documented in `AGENTS.md`:

```bash
bun install --frozen-lockfile
bun run dev
bun run fix-all
bun run check:repo
bun run check
bun run test:no-coverage
bun run test
bun run test:e2e
bun run build
```

## DevOps

- Production: `https://plainpolitics.co.uk`; `https://www.plainpolitics.co.uk` redirects to the apex domain.
- GitHub Actions runs CI on pushes and pull requests to `main`: Bun frozen install, lockfile guard, live env-file guard, Biome format/lint, TypeScript, unit tests, and production build.
- CodeQL scans JavaScript/TypeScript on pushes, pull requests, and a weekly schedule.
- Playwright smoke tests run in CI as a non-blocking job while the live-source surface settles.
- Production should deploy from GitHub to Vercel. Cloudflare manages `plainpolitics.co.uk` DNS and email routing.
- `vercel.json` pins Bun frozen installs and redirects `www.plainpolitics.co.uk` to `plainpolitics.co.uk`.
- Analytics setup is documented in `docs/ops/domain-and-analytics.md`: Vercel Web Analytics and consent-based GA4.

## Live Source Hooks

- `/parliament` calls the UK Parliament Members API for Commons party seat counts.
- `/parliament` calls the UK Parliament Members API for a sample of current Commons members.
- `/parliament` calls the UK Parliament Commons Votes API for recent Commons divisions.
- `/sources` lists live hooks, candidate feeds, review-sensitive sources, and target datapoint groups.
