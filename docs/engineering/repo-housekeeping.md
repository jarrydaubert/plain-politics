# Repo Housekeeping

## Current Shape

Plain Politics is a Bun/Next.js application with source-first political information pages, a provenance-first Supabase schema, live UK Parliament API hooks, and a structured documentation layer under `docs/`.

## Root Rules

1. Keep the repository root lean: entrypoint docs, framework/tooling config, lockfiles, env examples, deploy config, and top-level app folders only.
2. Keep product requirements and briefs in `docs/product/`.
3. Keep delivery plans and the todo-only backlog in `docs/project/`.
4. Keep technical architecture, data model, deployment notes, and repo-maintenance docs in `docs/engineering/`.
5. Keep methodology, quality, market, brand, and strategy material in their matching `docs/` folders.
6. Do not add generated build output, dependency folders, local env files, reports, screenshots, or local platform state to Git.
7. Keep Bun scripts in `package.json` aligned with `AGENTS.md`.
8. Any public factual datapoint must have a source path before it renders.

## App Scaffold Baseline

The baseline scaffold should keep these parts in place:

- `app/`
- `src/`
- `public/`
- `supabase/migrations/`
- `tests/`
- `package.json`
- `bun.lock`
- `next.config.ts`
- `playwright.config.ts`
- `biome.json`
- `.env.example`
- source contracts
- source hook registry

## Validation

1. Confirm the Git diff only includes intended files.
2. Run `bun run fix-all` when TS/JS/CSS changes.
3. Run `bun run test:no-coverage` for code changes.
4. Run `bun run build` for app-shell or route changes.
5. Run `bun run test:e2e` for route or user-flow changes.
6. Check dates and target milestones are not stale.
7. Check no private credentials or local-only paths are introduced.
8. Run `rg` for moved or renamed docs before committing repo-structure changes.
