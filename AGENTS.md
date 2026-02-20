# AGENTS.md - UK Policy Explainer

This file defines how coding agents should work in this repo. Keep it short and keep it true.

## Purpose

UK-focused, source-first political intelligence platform with auditable AI explanations.

## Priorities

- Source accuracy first: every factual claim must trace to a primary source.
- Political neutrality: no party favouritism, enforced as operational QA.
- Citation-gated answers: no citation, no answer.
- Accessibility + performance: ship fast and inclusive UI.
- Privacy-safe defaults: special-category political data handled with extra care.

## Source Of Truth

- Source trust framework: `docs/methodology/` (when created)
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
- Validate user input (especially search/ask queries).
- Do not log user queries or personal data.
- Treat political opinion signals as special-category data under GDPR.

## Tech Stack

- Next.js 16, React 19, TypeScript 5.9+
- Tailwind CSS 4, Zustand 5, Zod 4
- Supabase (Postgres + pgvector)
- Vercel AI SDK
- Jest, Playwright
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
- `ai-seo` — AI search optimisation (AEO/GEO/LLMO), AI Overviews, citations
- `programmatic-seo` — scaled page generation (explainers, compare pages, profiles)
- `schema-markup` — JSON-LD structured data

### Engineering & Quality
- `engineering` — Next.js/React/TS performance patterns, Supabase, AI SDK
- `accessibility` — WCAG 2.2 AA compliance
- `analytics-tracking` — GA4, Vercel Analytics, event tracking

### Upstream Source
Skills are sourced from [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills). See `.claude/skills/VERSIONS.md` for sync history and available skills to port.

### Available for Future Porting
content-strategy, copywriting, launch-strategy, social-content, seo-audit, competitor-alternatives, marketing-psychology, free-tool-strategy, product-marketing-context, copy-editing, marketing-ideas, email-sequence, and others.

## More Docs

See project root for:
- `PRD_V2.md` — Product requirements
- `TECH_STACK.md` — Architecture decisions
- `UK_POLICY_EXPLAINER_ACTION_PLAN.md` — 12-week execution plan
- `IDEA_BRIEF.md` — Project brief and success metrics
