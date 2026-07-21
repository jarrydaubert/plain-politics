import { describe, expect, test } from "bun:test";
import {
  deriveCurrentLeadership,
  deriveRoleHistory,
  findPartyBySlug
} from "@/political-data/derive";
import { roleSchema } from "@/political-data/model";
import { buildPartyLeadershipPageData } from "@/political-data/page-data";
import { loadCanonicalPoliticalData } from "@/political-data/storage";
import { validatePoliticalData, validatePoliticalDataHistory } from "@/political-data/validate";

const partySlugs = [
  "labour",
  "conservatives",
  "liberal-democrats",
  "reform-uk",
  "green-party-england-wales"
];

function firstOrThrow<T>(items: T[], label: string): T {
  const item = items[0];

  if (!item) {
    throw new Error(`Missing ${label} fixture`);
  }

  return item;
}

describe("canonical political data", () => {
  test("validates all five proof parties and their evidence chain", () => {
    const result = validatePoliticalData(loadCanonicalPoliticalData());

    expect(result.parties).toBe(5);
    expect(result.assignments).toBeGreaterThan(5);
    expect(result.snapshots).toBeGreaterThan(0);
    expect(result.evidenceReferences).toBeGreaterThan(0);
  });

  test("derives current state from an explicit as-of date without storing isCurrent", async () => {
    const data = loadCanonicalPoliticalData();
    const labour = findPartyBySlug(data, "labour");

    expect(labour).not.toBeNull();
    expect(
      deriveCurrentLeadership(data, labour?.id ?? "", "2026-07-19").map((item) => item.id)
    ).not.toContain("assignment-andy-burnham-prime-minister");
    expect(
      deriveCurrentLeadership(data, labour?.id ?? "", data.asOf).map((item) => item.id)
    ).toContain("assignment-andy-burnham-prime-minister");

    const rawData = await Bun.file("src/political-data/canonical-data.json").text();
    expect(rawData).not.toContain('"isCurrent"');
  });

  test("isolates canonical storage reads from caller mutation", () => {
    const firstRead = loadCanonicalPoliticalData();
    const originalName = firstOrThrow(firstRead.parties, "party").name;

    firstOrThrow(firstRead.parties, "party").name = "Mutated by caller";

    expect(firstOrThrow(loadCanonicalPoliticalData().parties, "party").name).toBe(originalName);
  });

  test("preserves ended assignments in deterministic role history", () => {
    const history = deriveRoleHistory(loadCanonicalPoliticalData(), "role-prime-minister");

    expect(history.map((assignment) => assignment.id)).toEqual([
      "assignment-andy-burnham-prime-minister",
      "assignment-keir-starmer-prime-minister"
    ]);
    expect(history[1]?.effectiveToExclusive).toBe("2026-07-20");
  });

  test("supports simultaneous holders only for a multi-holder role", () => {
    const data = loadCanonicalPoliticalData();
    const greenParty = findPartyBySlug(data, "green-party-england-wales");
    const current = deriveCurrentLeadership(data, greenParty?.id ?? "", data.asOf);

    expect(
      current
        .filter((assignment) => assignment.roleId === "role-green-deputy-leader")
        .map((assignment) => assignment.personId)
    ).toEqual(["person-mothin-ali", "person-rachel-millward"]);
    expect(() => validatePoliticalData(data)).not.toThrow();
  });

  test("the role contract supports an officially named co-leader office", () => {
    expect(
      roleSchema.parse({
        category: "party",
        holderPolicy: "multiple",
        id: "role-example-co-leader",
        partyId: "party-example",
        scopeLabel: "Example party",
        sortOrder: 10,
        title: "Co-Leader"
      }).holderPolicy
    ).toBe("multiple");
  });

  test("rejects overlap for a single-holder role", () => {
    const data = structuredClone(loadCanonicalPoliticalData());
    const historical = data.roleAssignments.find(
      (assignment) => assignment.id === "assignment-keir-starmer-prime-minister"
    );

    if (!historical) {
      throw new Error("Missing historical Prime Minister fixture");
    }

    historical.effectiveToExclusive = "2026-07-21";

    expect(() => validatePoliticalData(data)).toThrow(/single-holder.*overlaps/);
  });

  test("rejects unresolved references, non-HTTPS sources and altered snapshots", () => {
    const unresolved = structuredClone(loadCanonicalPoliticalData());
    firstOrThrow(unresolved.roleAssignments, "role assignment").personId = "person-missing";
    expect(() => validatePoliticalData(unresolved)).toThrow(/missing person/);

    const insecure = structuredClone(loadCanonicalPoliticalData());
    firstOrThrow(insecure.sourceDocuments, "source document").url = "http://example.com/source";
    expect(() => validatePoliticalData(insecure)).toThrow(/HTTPS URL/);

    const altered = structuredClone(loadCanonicalPoliticalData());
    firstOrThrow(altered.sourceSnapshots, "source snapshot").capturedText += " altered";
    expect(() => validatePoliticalData(altered)).toThrow(/contentHash does not match/);

    const absentQuote = structuredClone(loadCanonicalPoliticalData());
    firstOrThrow(absentQuote.evidenceReferences, "evidence reference").exactQuote =
      "This quote is not in the captured snapshot.";
    expect(() => validatePoliticalData(absentQuote)).toThrow(/exact quote is absent/);

    const wrongParty = structuredClone(loadCanonicalPoliticalData());
    firstOrThrow(wrongParty.roleAssignments, "role assignment").partyId = "party-conservatives";
    expect(() => validatePoliticalData(wrongParty)).toThrow(/wrong party/);

    const wrongGlobalParty = structuredClone(loadCanonicalPoliticalData());
    const primeMinister = wrongGlobalParty.roleAssignments.find(
      (assignment) => assignment.id === "assignment-andy-burnham-prime-minister"
    );
    if (!primeMinister) {
      throw new Error("Missing current Prime Minister fixture");
    }
    primeMinister.partyId = "party-conservative";
    expect(() => validatePoliticalData(wrongGlobalParty)).toThrow(/expects.*party/);

    const swappedEvidence = structuredClone(loadCanonicalPoliticalData());
    const deputy = swappedEvidence.roleAssignments.find(
      (assignment) => assignment.id === "assignment-lucy-powell-labour-deputy"
    );
    if (!deputy) {
      throw new Error("Missing Labour deputy fixture");
    }
    deputy.evidenceReferenceIds = ["evidence-kemi-badenoch-conservative-leader"];
    expect(() => validatePoliticalData(swappedEvidence)).toThrow(/lacks reviewed evidence/);

    const missingEvidence = structuredClone(loadCanonicalPoliticalData());
    firstOrThrow(missingEvidence.roleAssignments, "role assignment").evidenceReferenceIds = [
      "evidence-missing"
    ];
    expect(() => validatePoliticalData(missingEvidence)).toThrow(/missing evidence/);

    const missingDocument = structuredClone(loadCanonicalPoliticalData());
    firstOrThrow(missingDocument.sourceSnapshots, "source snapshot").sourceDocumentId =
      "source-document-missing";
    expect(() => validatePoliticalData(missingDocument)).toThrow(/missing source document/);

    const missingSnapshot = structuredClone(loadCanonicalPoliticalData());
    firstOrThrow(missingSnapshot.evidenceReferences, "evidence reference").sourceSnapshotId =
      "source-snapshot-missing";
    expect(() => validatePoliticalData(missingSnapshot)).toThrow(/missing source snapshot/);
  });

  test("rejects duplicate stable IDs and party slugs", () => {
    const duplicateId = structuredClone(loadCanonicalPoliticalData());
    firstOrThrow(duplicateId.people, "person").id = firstOrThrow(duplicateId.parties, "party").id;
    expect(() => validatePoliticalData(duplicateId)).toThrow(/Duplicate stable ID/);

    const duplicateSlug = structuredClone(loadCanonicalPoliticalData());
    const firstParty = firstOrThrow(duplicateSlug.parties, "party");
    const secondParty = duplicateSlug.parties[1];

    if (!secondParty) {
      throw new Error("Missing second party fixture");
    }

    secondParty.slug = firstParty.slug;
    expect(() => validatePoliticalData(duplicateSlug)).toThrow(/Duplicate party slug/);
  });

  test("rejects invalid intervals, timestamps and unreviewed public evidence", () => {
    const interval = structuredClone(loadCanonicalPoliticalData());
    const firstAssignment = firstOrThrow(interval.roleAssignments, "role assignment");
    firstAssignment.effectiveToExclusive = firstAssignment.effectiveFrom;
    expect(() => validatePoliticalData(interval)).toThrow(/invalid effective interval/);

    const timestamp = structuredClone(loadCanonicalPoliticalData());
    firstOrThrow(timestamp.sourceSnapshots, "source snapshot").capturedAt = "not-a-timestamp";
    expect(() => validatePoliticalData(timestamp)).toThrow(/schema validation failed/);

    const calendarDate = structuredClone(loadCanonicalPoliticalData());
    firstOrThrow(calendarDate.roleAssignments, "role assignment").effectiveFrom = "2026-02-30";
    expect(() => validatePoliticalData(calendarDate)).toThrow(/schema validation failed/);

    const backdatedVerification = structuredClone(loadCanonicalPoliticalData());
    const verifiedAssignment = backdatedVerification.roleAssignments.find(
      (assignment) => assignment.effectiveDateBasis === "verified_from"
    );
    if (!verifiedAssignment) {
      throw new Error("Missing verified-from assignment fixture");
    }
    verifiedAssignment.effectiveFrom = "2026-07-20";
    expect(() => validatePoliticalData(backdatedVerification)).toThrow(
      /verified_from must match its supporting snapshot date/
    );

    const earlyReview = structuredClone(loadCanonicalPoliticalData());
    firstOrThrow(earlyReview.evidenceReferences, "evidence reference").reviewedAt =
      "2026-07-20T10:00:00.000+01:00";
    expect(() => validatePoliticalData(earlyReview)).toThrow(/reviewed before/);

    const futureCapture = structuredClone(loadCanonicalPoliticalData());
    firstOrThrow(futureCapture.sourceSnapshots, "source snapshot").capturedAt =
      "2026-07-22T10:00:00.000+01:00";
    expect(() => validatePoliticalData(futureCapture)).toThrow(/captured after dataset asOf/);

    const offsetFutureCapture = structuredClone(loadCanonicalPoliticalData());
    firstOrThrow(offsetFutureCapture.sourceSnapshots, "source snapshot").capturedAt =
      "2026-07-21T23:30:00.000-05:00";
    expect(() => validatePoliticalData(offsetFutureCapture)).toThrow(/captured after dataset asOf/);

    const unreviewed = structuredClone(loadCanonicalPoliticalData()) as unknown as {
      evidenceReferences: Array<{ reviewStatus: string }>;
    };
    firstOrThrow(unreviewed.evidenceReferences, "evidence reference").reviewStatus = "pending";
    expect(() => validatePoliticalData(unreviewed)).toThrow(/schema validation failed/);
  });

  test("preserves immutable evidence history and allows an open assignment to close", () => {
    const previous = loadCanonicalPoliticalData();
    const rewrittenSnapshot = structuredClone(previous);
    firstOrThrow(rewrittenSnapshot.sourceSnapshots, "source snapshot").capturedText += " changed";
    expect(() => validatePoliticalDataHistory(previous, rewrittenSnapshot)).toThrow(
      /Immutable source snapshot.*rewritten/
    );

    const deletedAssignment = structuredClone(previous);
    deletedAssignment.roleAssignments.shift();
    expect(() => validatePoliticalDataHistory(previous, deletedAssignment)).toThrow(
      /Historical assignment.*deleted/
    );

    const rewrittenParty = structuredClone(previous);
    firstOrThrow(rewrittenParty.parties, "party").name = "Rewritten identity";
    expect(() => validatePoliticalDataHistory(previous, rewrittenParty)).toThrow(
      /Immutable party.*rewritten/
    );

    const rewrittenPerson = structuredClone(previous);
    firstOrThrow(rewrittenPerson.people, "person").name = "Rewritten person";
    expect(() => validatePoliticalDataHistory(previous, rewrittenPerson)).toThrow(
      /Immutable person.*rewritten/
    );

    const rewrittenRole = structuredClone(previous);
    firstOrThrow(rewrittenRole.roles, "role").title = "Rewritten role";
    expect(() => validatePoliticalDataHistory(previous, rewrittenRole)).toThrow(
      /Immutable role.*rewritten/
    );

    const closedAssignment = structuredClone(previous);
    firstOrThrow(closedAssignment.roleAssignments, "role assignment").effectiveToExclusive =
      "2026-07-22";
    expect(() => validatePoliticalDataHistory(previous, closedAssignment)).not.toThrow();
  });

  test("changing one canonical assignment changes derived page data without page edits", () => {
    const data = structuredClone(loadCanonicalPoliticalData());
    const before = buildPartyLeadershipPageData(data, "labour", data.asOf);
    const assignment = data.roleAssignments.find(
      (item) => item.id === "assignment-andy-burnham-labour-leader"
    );

    if (!assignment) {
      throw new Error("Missing Labour leader assignment fixture");
    }

    assignment.effectiveToExclusive = data.asOf;
    const after = buildPartyLeadershipPageData(data, "labour", data.asOf);

    expect(JSON.stringify(before)).toContain("Andy Burnham");
    expect(JSON.stringify(after)).not.toContain("assignment-andy-burnham-labour-leader");
    expect(after).not.toEqual(before);
  });

  test("unknown slugs fail safely and all parties share the same section structure", () => {
    const data = loadCanonicalPoliticalData();
    const expectedSections = ["Party leadership", "Parliamentary leadership", "Government roles"];

    expect(buildPartyLeadershipPageData(data, "unknown-party", data.asOf)).toBeNull();

    for (const slug of partySlugs) {
      const pageData = buildPartyLeadershipPageData(data, slug, data.asOf);
      expect(pageData?.sections.map((section) => section.heading)).toEqual(expectedSections);
    }
  });

  test("keeps visible coverage gaps instead of inventing equivalent roles", () => {
    const data = loadCanonicalPoliticalData();
    const pages = partySlugs.map((slug) => buildPartyLeadershipPageData(data, slug, data.asOf));

    expect(pages.some((page) => page?.sections.some((section) => section.roles.length === 0))).toBe(
      true
    );
    expect(
      pages.flatMap((page) => page?.sections ?? []).map((section) => section.category)
    ).toContain("government");
  });
});
