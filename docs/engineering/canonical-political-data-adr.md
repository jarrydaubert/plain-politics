# ADR: Checked-In Canonical Political Data For The Foundation Slice

Date: 2026-07-21
Status: Accepted for the foundation slice

## Decision

Use `src/political-data/canonical/` as the only writable canonical store for the first leadership slice. The store is one logical dataset split into cohesive checked-in files for entity metadata, assignments, sources, evidence and amendment audit records. Zod validates the assembled domain model at runtime. A storage adapter is the only module that imports those files; server-only query functions expose narrow reads, and presentation code receives resolved page data rather than raw records.

The evidence flow is:

```text
official source -> immutable snapshot -> reviewed evidence -> canonical record -> server query -> page
```

The model keeps `Party`, `Person`, `Role`, `RoleAssignment`, `SourceDocument`, `SourceSnapshot`, and `EvidenceReference` separate. Assignments use inclusive `effectiveFrom` and exclusive `effectiveToExclusive`; `isCurrent` is never stored. Date-only current state is evaluated at the end of the named UK date, so a same-day handover belongs to the replacement for that date rather than claiming an exact handover time. A source document has a stable identity but amendable reviewed metadata, while each reviewed capture is appended as a new hashed snapshot. Structured evidence claims pin the reviewed person, exact role title, party association and dates to the assignment fields they support.

`MetadataAmendment` is operational audit metadata rather than an eighth political domain entity. It permits an in-place correction to a party, person, role or source document only when the stable ID remains, the exact changed fields and next revision are declared, a reason is recorded, reviewed evidence is linked and review is complete. Amendment records, source snapshots and reviewed evidence references are append-only. Git retains the prior entity state.

## Why

The existing Supabase migration has source and party scaffolding but no people, roles, effective-dated assignments, or review enforcement, and the app does not yet have a database-backed rendering path. Adding those tables and an operational write workflow would make this proof larger without improving the page boundary. The checked-in store is reviewable, deterministic, deployable now, and remains one source of truth.

The original all-in-one JSON file had already become difficult to review at more than 700 lines. The physical split improves ownership and diffs without creating another adapter or write path.

## Boundary

- `model.ts` owns all seven checked-in-store runtime contracts, the amendment audit contract and inferred types. The existing `source-contracts.ts` remains aligned with the separate Supabase scaffold until migration.
- `storage.ts` is the only runtime adapter that imports the canonical files, assembles and fully validates one dataset, and returns an isolated value.
- `queries.ts` is server-only. It exposes the required domain reads (`getPartyBySlug`, `getCurrentLeadership`, and `getRoleHistory`) plus the page-shaped and static-slug reads used by this route.
- `page-data.ts` resolves domain records into presentation data.
- Pages and components do not import raw files, the storage adapter, or a database client.

The validation command compares the store with an explicit Git commit when a prior dataset exists. GitHub Actions derives that commit from the verified event payload, fetches it in the shallow checkout and passes its SHA to the validator; failure to obtain it is fatal. Snapshots, reviewed evidence and amendment records cannot be removed or rewritten. Existing assignments may only be closed or receive appended evidence. Parties, people, roles and source documents retain stable IDs and require a new reviewed amendment record for every correction.

## Supabase Migration Path

Add equivalent tables and constraints for the seven entities plus amendment audit metadata, preserve the stable IDs, and backfill the validated JSON records. Then replace only `storage.ts` with a Supabase adapter returning the same validated domain shape. Compare query output between stores before cutover, stop JSON writes at cutover, and retain the checked-in dataset as migration evidence rather than a second writable truth. Page and component imports do not change.
