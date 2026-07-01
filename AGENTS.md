# AGENTS.md - Plain Politics

This file defines how coding agents should work in this repo. Keep it short and keep it true.

## Purpose

UK-focused, source-first political information tracker with auditable public sources.

## Priorities

- Source accuracy first: every factual claim must trace to a primary source.
- Political neutrality: no party favouritism, enforced as operational QA.
- Source-gated factual content: no source, no factual claim.
- Accessibility + performance: ship fast and inclusive UI.
- Privacy-safe defaults: special-category political data handled with extra care.

## Source Of Truth

- Source trust framework: `docs/methodology/`
- Data model: Supabase schema
- Tax/financial data (if any): primary legislation or HMRC publications

## Before You Change Code

- Check existing patterns in the codebase.
- Verify any political claims against primary sources.
- Consider accessibility impacts.
- Avoid leaking server env vars into client components.
- Ensure political neutrality in any content or copy changes.

## After You Change Code

- Run `bun run fix-all` when you touch TS/JS/CSS.
- Run `bun run test:no-coverage` (or the smallest relevant test for your change).
- Bugs: add a regression test when it fits.
- If you cannot run tests, say so explicitly in the PR/summary.

## Security Checks (When Relevant)

- Scan for hardcoded secrets in `src/`.
- Validate user input, especially search queries and public forms.
- Do not log user queries or personal data.
- Treat political opinion signals as special-category data under GDPR.

## Tech Stack

- Next.js 16, React 19, TypeScript 5.9+
- Tailwind CSS 4, Zod 4
- Supabase Postgres
- MapLibre and chart/table libraries as needed
- Bun test or Vitest, Playwright
- Biome, Bun

## Quick Commands

```bash
bun run dev                 # Start dev server
bun run fix-all             # Format, lint, typecheck
bun run test:no-coverage    # Fast tests
bun run test                # Full tests with coverage
bun run test:e2e            # Playwright E2E
bun run build               # Production build
```

## Skills (Agent Reference)

All skills have `## Politics Platform Context` sections with project-specific guidance, file paths, and what does/doesn't apply.

Skill docs live in `.claude/skills/`. Version history: `.claude/skills/VERSIONS.md`.

### SEO & Content
- `ai-seo` — search visibility and answer-engine optimisation, not product functionality
- `programmatic-seo` — scaled page generation (explainers, compare pages, profiles)
- `schema-markup` — JSON-LD structured data

### Engineering & Quality
- `engineering` — Next.js/React/TS performance patterns and Supabase
- `accessibility` — WCAG 2.2 AA compliance
- `analytics-tracking` — privacy-safe analytics, Vercel Analytics, Speed Insights, and event tracking

### GBrain Policy
- GBrain may be used as local operator memory for prior decisions, strategy, and reusable patterns.
- Do not use GBrain as evidence for political claims, source freshness, legal/privacy decisions, or production behavior.
- Do not store postcode lookups, raw search text, quiz answers, or political opinion signals in GBrain.
- Canonical truth remains git, source files, approved docs, primary public sources, migrations, and verification artifacts.
- Full policy: `docs/engineering/gbrain.md`.

### Vercel Plugin Skill Policy
- Use now: `deployments-cicd`, `vercel-cli`, `env-vars`, `verification`, `nextjs`, `react-best-practices`, `turbopack`, `vercel-functions`, and `vercel-firewall`.
- Use later or with care: `next-cache-components`, `runtime-cache`, `vercel-storage`, `routing-middleware`, `marketplace`, `next-upgrade`, `auth`, `workflow`, and `shadcn`.
- Avoid for v1: `ai-gateway`, `ai-sdk`, `chat-sdk`, `eve`, `vercel-agent`, `vercel-connect`, and `vercel-sandbox`; Plain Politics v1 has no AI product surface.
- Removed locally from the Vercel plugin cache: `microfrontends`, `next-forge`, `bootstrap`, and `knowledge-update`.
- Full audit: `docs/engineering/vercel-plugin-skills.md`.

### Upstream Source
Skills are sourced from [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills). See `.claude/skills/VERSIONS.md` for sync history and available skills to port.

### Available for Future Porting
content-strategy, copywriting, launch-strategy, social-content, seo-audit, competitor-alternatives, marketing-psychology, free-tool-strategy, product-marketing-context, copy-editing, marketing-ideas, email-sequence, and others.

## More Docs

See project root for:
- `README.md` — Repo entry point and current state
- `PRD_V2.md` — Product requirements
- `TECH_STACK.md` — Technical baseline
- `PLAIN_POLITICS_ACTION_PLAN.md` — Phased execution plan
- `IDEA_BRIEF.md` — Project brief and success metrics
- `docs/strategy/` — Current assessment and Phase 0 proof-of-thesis guidance
- `docs/market/` — Competitive landscape tracker
