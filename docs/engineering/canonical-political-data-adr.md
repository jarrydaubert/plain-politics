# ADR: Checked-In Canonical Political Data For The Foundation Slice

Date: 2026-07-21
Status: Accepted for the foundation slice

## Decision

Use `src/political-data/canonical-data.json` as the only writable canonical store for the first leadership slice. Zod validates the domain model at runtime. A storage adapter reads the file, server-only query functions expose narrow reads, and presentation code receives resolved page data rather than raw records.

The evidence flow is:

```text
official source -> immutable snapshot -> reviewed evidence -> canonical record -> server query -> page
```

The model keeps `Party`, `Person`, `Role`, `RoleAssignment`, `SourceDocument`, `SourceSnapshot`, and `EvidenceReference` separate. Assignments use inclusive `effectiveFrom` and exclusive `effectiveToExclusive`; `isCurrent` is never stored. Date-only current state is evaluated at the end of the named UK date, so a same-day handover belongs to the replacement for that date rather than claiming an exact handover time. A source document keeps stable publisher and URL identity, while each reviewed capture is appended as a new hashed snapshot. Structured evidence claims pin the reviewed person, exact role title, party association and dates to the assignment fields they support.

## Why

The existing Supabase migration has source and party scaffolding but no people, roles, effective-dated assignments, or review enforcement, and the app does not yet have a database-backed rendering path. Adding those tables and an operational write workflow would make this proof larger without improving the page boundary. The checked-in store is reviewable, deterministic, deployable now, and remains one source of truth.

## Boundary

- `model.ts` owns all seven checked-in-store runtime contracts and inferred types. The existing `source-contracts.ts` remains aligned with the separate Supabase scaffold until migration.
- `storage.ts` is the only runtime adapter that imports the canonical file, runs full integrity validation and returns an isolated value.
- `queries.ts` is server-only. It exposes the required domain reads (`getPartyBySlug`, `getCurrentLeadership`, and `getRoleHistory`) plus the page-shaped and static-slug reads used by this route.
- `page-data.ts` resolves domain records into presentation data.
- Pages and components do not import the raw store, storage adapter, or a database client.

The validation command also compares the store with `origin/main` when a prior dataset exists. Source documents, snapshots and reviewed evidence cannot be removed or rewritten; existing assignments can only remain unchanged or be closed with their previous evidence preserved. Git keeps the immutable baseline for this checked-in phase.

## Supabase Migration Path

Add equivalent tables and constraints for the seven entities, preserve the stable IDs, and backfill the validated JSON records. Then replace only `storage.ts` with a Supabase adapter returning the same validated domain shape. Compare query output between stores before cutover, stop JSON writes at cutover, and retain the checked-in file as migration evidence rather than a second writable truth. Page and component imports do not change.
