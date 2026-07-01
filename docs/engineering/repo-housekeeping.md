# Repo Housekeeping

## Current Shape

The repository now has a documentation layer plus an early Bun/Next.js app scaffold. The first live source hooks call official UK Parliament APIs, and the first Supabase migration defines the provenance-first schema.

## Housekeeping Rules

1. Keep root planning docs aligned with the actual app state.
2. Put methodology and operational standards under `docs/`.
3. Keep source hook planning in `docs/strategy/source-hooks.md`.
4. Do not add generated build output, dependency folders, local env files, or reports to Git.
5. Keep Bun scripts in `package.json` aligned with `AGENTS.md`.
6. Any public factual datapoint must have a source path before it renders.

## App Scaffold Baseline

The baseline scaffold should keep these parts in place:

- `package.json`
- `bun.lock`
- `src/` or `app/`
- `supabase/migrations/`
- `tests/`
- `playwright.config.*`
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
