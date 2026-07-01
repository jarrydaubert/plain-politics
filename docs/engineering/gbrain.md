# GBrain Usage Policy

GBrain can be useful for Plain Politics, but only as local operator memory. It should help agents remember prior decisions, product direction, research notes, and recurring implementation patterns across sessions.

## Useful For

- Searching prior Plain Politics decisions and strategy notes.
- Remembering why a product or technical direction was chosen.
- Summarising past run outcomes so future agents do not repeat stale discussion.
- Finding reusable patterns from nearby projects, especially Project Atlas operating standards.

## Not Useful For

- Verifying political facts or public-source claims.
- Replacing repository docs, git history, source files, database migrations, or primary-source evidence.
- Storing user postcode lookups, raw search text, quiz answers, or political opinion signals.
- CI gating, production runtime features, public site functionality, or analytics.

## Boundary

GBrain is memory and synthesis, not canonical truth. The canonical truth for this repo remains:

- git history;
- source files;
- approved docs and decision logs;
- Supabase migrations and source registry data;
- primary public sources;
- test and browser-verification artifacts.

## Current Local Status

A local check on 2026-07-01 found `gbrain doctor --fast --json` usable with warnings: health score 95, skill checks passing, and only a fast-mode connection warning. A search for `Plain Politics` did not return project-specific memory, so the repo should not assume existing GBrain context is complete.

Do not install extra repo integrations such as retrieval-reflex unless there is a concrete need and the user approves it.
