# Editing Canonical Political Data

The only writable source for this slice is the logical dataset in `src/political-data/canonical/`. Its cohesive JSON files separate entities, assignments, sources, evidence and amendment metadata, but `storage.ts` loads and validates them as one dataset. Never create a second writable copy or copy leadership facts into documentation or page code.

## Evidence Flow

```text
official source -> immutable snapshot -> reviewed evidence -> canonical record -> server query -> page
```

## Capture And Review

1. Open the official primary source and confirm the publisher, exact title, role category, holder, party association and any stated start date.
2. Reuse the existing `SourceDocument` when its stable identity is unchanged. Append a new `SourceSnapshot`; never edit or replace an older snapshot.
3. Put the smallest relevant reviewed extract in `capturedText`, record the capture timestamp and method, then calculate its SHA-256:

   ```bash
   bun -e 'import data from "./src/political-data/canonical/sources.json"; import { createHash } from "node:crypto"; for (const snapshot of data.sourceSnapshots) console.log(snapshot.id, createHash("sha256").update(snapshot.capturedText, "utf8").digest("hex"))'
   ```

4. Add an `EvidenceReference` whose exact quote occurs in that snapshot. Map its structured assignment claim to the exact fields reviewed: holder, role title, party association, effective start or exclusive end. The expected values must match the assignment. Record a useful locator and mark it reviewed only after checking each mapped field.
5. If the source states the appointment date, use `official_start`. Otherwise use the capture date with `verified_from`; do not invent a date or role equivalence.

## End And Replace An Assignment

1. Keep the old `RoleAssignment`, set its `effectiveToExclusive` to the replacement’s start date, and append reviewed evidence that maps the supported exclusive end date. Never remove or rewrite its prior evidence.
2. Add the replacement as a new assignment with a stable ID and reviewed evidence. Do not add `isCurrent`.
3. For a single-holder role, the intervals must not overlap. Use a multi-holder role only when an official source establishes simultaneous holders. Date-only state is evaluated at the end of the named UK date.
4. Confirm that party, parliamentary, and government roles remain separate records even when one person holds more than one.

## Correct Reviewed Metadata

Parties, people, roles and source documents have stable identities, not frozen metadata. Correct a reviewed name, title, URL or other allowed metadata field in place; do not create a replacement person, role or source document merely to fix metadata.

1. Keep the existing entity `id` unchanged and edit only the reviewed metadata fields that need correction.
2. Append one record to `metadata-amendments.json`. Set `entityType` and `entityId`, list the exact top-level `changedFields`, increment that entity's revision from 2, explain the correction in `reason`, and link the reviewed evidence used for the decision.
3. Set `reviewStatus` to `reviewed` only after a second reviewer has compared the corrected value with the linked primary-source evidence. An unreviewed status, an empty explanation, a wrong target, a skipped revision or an inaccurate changed-field list fails validation.
4. Git history retains the previous entity state; the append-only amendment record makes the correction explicit in the current dataset. Never edit or delete an older amendment.
5. `SourceSnapshot` and `EvidenceReference` records are not amendable. Never rewrite or delete captured text, hashes, exact quotations or reviewed claim mappings. Append a new snapshot and evidence reference when the source changes or a later review supersedes a conclusion.

If a role-title correction needs a new quotation, append the snapshot and reviewed evidence first, then append that evidence ID to the affected assignment without removing earlier evidence. Historical evidence remains an auditable statement of what was reviewed at that time.

## Validate

Run:

```bash
bun run validate:political-data
bun run check:repo
```

Review the affected noindex page for exact titles, effective or verified dates, coverage gaps, and keyboard access to every evidence disclosure. A second reviewer should confirm the quote-to-assignment mapping and political neutrality before publication.

Local validation compares the dataset with `origin/main` by default. GitHub Actions instead takes the exact pull-request base SHA or previous push SHA from the verified event payload, fetches that commit explicitly, and passes it as `POLITICAL_DATA_BASE_REF`. CI fails if the SHA is missing, malformed, unfetchable or resolves to a different commit; history validation is never silently skipped.

When the baseline already contains the dataset, validation rejects deletion or rewriting of snapshots, reviewed evidence and amendment records. Existing assignments may only be closed or receive additional reviewed evidence. Parties, people, roles and source documents may change only through the reviewed amendment process above, with stable IDs retained. The first introducing branch reports that the dataset root is absent from the verified base commit.
