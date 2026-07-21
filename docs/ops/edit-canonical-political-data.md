# Editing Canonical Political Data

The only writable source for this slice is `src/political-data/canonical-data.json`. Never copy leadership facts into documentation or page code.

## Evidence Flow

```text
official source -> immutable snapshot -> reviewed evidence -> canonical record -> server query -> page
```

## Capture And Review

1. Open the official primary source and confirm the publisher, exact title, role category, holder, and any stated start date.
2. Reuse the existing `SourceDocument` when the source identity and URL are unchanged. Append a new `SourceSnapshot`; never edit or replace an older snapshot.
3. Put the smallest relevant reviewed extract in `capturedText`, record the capture timestamp and method, then calculate its SHA-256:

   ```bash
   bun -e 'import data from "./src/political-data/canonical-data.json"; import { createHash } from "node:crypto"; for (const snapshot of data.sourceSnapshots) console.log(snapshot.id, createHash("sha256").update(snapshot.capturedText, "utf8").digest("hex"))'
   ```

4. Add an `EvidenceReference` whose exact quote occurs in that snapshot. Map its structured assignment claim to the exact fields reviewed: holder, role title, party association, effective start or exclusive end. The expected values must match the assignment. Record a useful locator and mark it reviewed only after checking each mapped field.
5. If the source states the appointment date, use `official_start`. Otherwise use the capture date with `verified_from`; do not invent a date or role equivalence.

## End And Replace An Assignment

1. Keep the old `RoleAssignment`, set its `effectiveToExclusive` to the replacement’s start date, and append reviewed evidence that maps the supported exclusive end date. Never rewrite its prior evidence.
2. Add the replacement as a new assignment with a stable ID and reviewed evidence. Do not add `isCurrent`.
3. For a single-holder role, the intervals must not overlap. Use a multi-holder role only when an official source establishes simultaneous holders. Date-only state is evaluated at the end of the named UK date.
4. Confirm that party, parliamentary, and government roles remain separate records even when one person holds more than one.

## Validate

Run:

```bash
bun run validate:political-data
bun run check:repo
```

Review the affected noindex page for exact titles, effective or verified dates, coverage gaps, and keyboard access to every evidence disclosure. A second reviewer should confirm the quote-to-assignment mapping and political neutrality before publication.

When `origin/main` already contains the dataset, validation also rejects deletion or rewriting of parties, people, roles, source documents, snapshots, reviewed evidence and historical assignments. The first introducing branch reports that the dataset path is absent from the verified base ref. CI and explicit base-ref runs fail if that ref or Git worktree is unavailable.
