# Repo Housekeeping

## Current Shape

The repository is currently documentation-first. There is no `package.json`, Next.js app, Supabase migration directory, or test runner configuration yet.

## Housekeeping Rules

1. Keep root planning docs stable until the app scaffold exists.
2. Put methodology and operational standards under `docs/`.
3. Keep `.claude/skills/VERSIONS.md` aligned with skill frontmatter.
4. Do not add generated build output, dependency folders, local env files, or reports to Git.
5. When implementation begins, create the expected Bun scripts before relying on the commands in `AGENTS.md`.

## Suggested App Scaffold Targets

When ready to scaffold the product app, add:

- `package.json`
- `bun.lock`
- `src/` or `app/`
- `supabase/migrations/`
- `tests/`
- `playwright.config.*`
- `biome.json`
- `.env.example`
- source ingestion scripts and source contracts

## Validation For Documentation-Only Changes

1. Confirm the Git diff only includes intended files.
2. Check local Markdown links.
3. Check dates and target milestones are not stale.
4. Check no private credentials or local-only paths are introduced.
