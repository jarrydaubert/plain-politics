import { describe, expect, test } from "bun:test";
import { createHash } from "node:crypto";
import {
  deriveCurrentLeadership,
  deriveRoleHistory,
  findPartyBySlug
} from "@/political-data/derive";
import { type MetadataEntityType, type PoliticalData, roleSchema } from "@/political-data/model";
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
    const beforeTransition = deriveCurrentLeadership(data, labour?.id ?? "", "2026-07-19").map(
      (item) => item.id
    );
    const afterTransition = deriveCurrentLeadership(data, labour?.id ?? "", data.asOf).map(
      (item) => item.id
    );

    expect(beforeTransition).toContain("assignment-keir-starmer-prime-minister");
    expect(beforeTransition).not.toContain("assignment-andy-burnham-prime-minister");
    expect(afterTransition).toContain("assignment-andy-burnham-prime-minister");
    expect(afterTransition).not.toContain("assignment-keir-starmer-prime-minister");

    const rawDataParts: string[] = [];
    for await (const path of new Bun.Glob("src/political-data/canonical/*.json").scan(".")) {
      rawDataParts.push(await Bun.file(path).text());
    }
    const rawData = rawDataParts.join("\n");
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

  test("allows reviewed corrections to every amendable collection while preserving stable IDs", () => {
    const corrections: Array<{
      changedField: string;
      entityId: string;
      entityType: MetadataEntityType;
      mutate: (data: PoliticalData) => void;
    }> = [
      {
        changedField: "name",
        entityId: "party-labour",
        entityType: "party",
        mutate: (data) => {
          const party = data.parties.find((item) => item.id === "party-labour");
          if (party) party.name = "Labour corrected";
        }
      },
      {
        changedField: "name",
        entityId: "person-keir-starmer",
        entityType: "person",
        mutate: (data) => {
          const person = data.people.find((item) => item.id === "person-keir-starmer");
          if (person) person.name = "Sir Keir Starmer corrected";
        }
      },
      {
        changedField: "scopeLabel",
        entityId: "role-prime-minister",
        entityType: "role",
        mutate: (data) => {
          const role = data.roles.find((item) => item.id === "role-prime-minister");
          if (role) role.scopeLabel = "UK Government corrected";
        }
      },
      {
        changedField: "title",
        entityId: "source-document-gov-keir-starmer",
        entityType: "source_document",
        mutate: (data) => {
          const document = data.sourceDocuments.find(
            (item) => item.id === "source-document-gov-keir-starmer"
          );
          if (document) document.title = "Corrected source title";
        }
      }
    ];

    for (const correction of corrections) {
      const previous = loadCanonicalPoliticalData();
      const corrected = structuredClone(previous);
      correction.mutate(corrected);
      corrected.metadataAmendments.push({
        changedFields: [correction.changedField],
        entityId: correction.entityId,
        entityType: correction.entityType,
        evidenceReferenceIds: [firstOrThrow(corrected.evidenceReferences, "evidence").id],
        id: `amendment-${correction.entityType.replaceAll("_", "-")}-test`,
        reason: "Correct the reviewed metadata while preserving the canonical identity.",
        reviewStatus: "reviewed",
        reviewedAt: "2026-07-21T12:00:00.000+01:00",
        revision: 2
      });

      expect(() => validatePoliticalDataHistory(previous, corrected)).not.toThrow();
      expect(
        [
          ...corrected.parties,
          ...corrected.people,
          ...corrected.roles,
          ...corrected.sourceDocuments
        ].some((record) => record.id === correction.entityId)
      ).toBe(true);
    }
  });

  test("allows a reviewed role-title correction without rewriting earlier quotations", () => {
    const previous = loadCanonicalPoliticalData();
    const corrected = structuredClone(previous);
    const title = "Prime Minister of the United Kingdom";
    const evidenceId = "evidence-prime-minister-title-correction-test";
    const role = corrected.roles.find((item) => item.id === "role-prime-minister");
    const assignments = corrected.roleAssignments.filter(
      (assignment) => assignment.roleId === "role-prime-minister"
    );

    if (!role || assignments.length === 0) {
      throw new Error("Missing Prime Minister correction fixtures");
    }

    role.title = title;
    corrected.sourceSnapshots.push({
      capturedAt: "2026-07-21T12:00:00.000+01:00",
      capturedText: title,
      contentHash: createHash("sha256").update(title, "utf8").digest("hex"),
      extractMethod: "manual_reviewed_extract",
      id: "source-snapshot-prime-minister-title-correction-test",
      sourceDocumentId: "source-document-gov-prime-minister"
    });
    corrected.evidenceReferences.push({
      assignmentClaims: assignments.map((assignment) => ({
        assignmentId: assignment.id,
        expected: { role_title: title },
        fields: ["role_title"]
      })),
      exactQuote: title,
      id: evidenceId,
      locator: "Role title correction test",
      reviewStatus: "reviewed",
      reviewedAt: "2026-07-21T12:05:00.000+01:00",
      roleDescriptionIds: [],
      sourceSnapshotId: "source-snapshot-prime-minister-title-correction-test",
      whatItSupports: "The appended reviewed evidence supports the corrected role title."
    });
    for (const assignment of assignments) {
      assignment.evidenceReferenceIds.push(evidenceId);
    }
    corrected.metadataAmendments.push({
      changedFields: ["title"],
      entityId: role.id,
      entityType: "role",
      evidenceReferenceIds: [evidenceId],
      id: "amendment-prime-minister-title-correction-test",
      reason: "Correct the reviewed role title without replacing its stable identity.",
      reviewStatus: "reviewed",
      reviewedAt: "2026-07-21T12:10:00.000+01:00",
      revision: 2
    });

    expect(() => validatePoliticalData(corrected)).not.toThrow();
    expect(() => validatePoliticalDataHistory(previous, corrected)).not.toThrow();
    expect(role.id).toBe("role-prime-minister");
    expect(
      previous.evidenceReferences.find(
        (evidence) => evidence.id === "evidence-keir-starmer-prime-minister"
      )?.exactQuote
    ).toBe(
      corrected.evidenceReferences.find(
        (evidence) => evidence.id === "evidence-keir-starmer-prime-minister"
      )?.exactQuote
    );
  });

  test("rejects unreviewed, unexplained or inaccurately described metadata rewrites", () => {
    const previous = loadCanonicalPoliticalData();
    const unexplained = structuredClone(previous);
    firstOrThrow(unexplained.people, "person").name = "Unexplained rewrite";
    expect(() => validatePoliticalDataHistory(previous, unexplained)).toThrow(
      /without exactly one new reviewed metadata amendment/
    );

    const wrongFields = structuredClone(unexplained);
    wrongFields.metadataAmendments.push({
      changedFields: ["name"],
      entityId: firstOrThrow(wrongFields.parties, "party").id,
      entityType: "party",
      evidenceReferenceIds: [firstOrThrow(wrongFields.evidenceReferences, "evidence").id],
      id: "amendment-wrong-target-test",
      reason: "This review record deliberately targets the wrong canonical record.",
      reviewStatus: "reviewed",
      reviewedAt: "2026-07-21T12:00:00.000+01:00",
      revision: 2
    });
    expect(() => validatePoliticalDataHistory(previous, wrongFields)).toThrow(
      /does not describe a changed pre-existing record/
    );

    const unreviewed = structuredClone(previous);
    firstOrThrow(unreviewed.people, "person").name = "Unreviewed rewrite";
    (unreviewed.metadataAmendments as unknown as Array<Record<string, unknown>>).push({
      changedFields: ["name"],
      entityId: firstOrThrow(unreviewed.people, "person").id,
      entityType: "person",
      evidenceReferenceIds: [firstOrThrow(unreviewed.evidenceReferences, "evidence").id],
      id: "amendment-unreviewed-test",
      reason: "This record has not passed the required review gate.",
      reviewStatus: "pending",
      reviewedAt: "2026-07-21T12:00:00.000+01:00",
      revision: 2
    });
    expect(() => validatePoliticalDataHistory(previous, unreviewed)).toThrow(/reviewStatus/);
  });

  test("keeps source snapshots and reviewed quotations append-only", () => {
    const previous = loadCanonicalPoliticalData();
    const rewrittenSnapshot = structuredClone(previous);
    firstOrThrow(rewrittenSnapshot.sourceSnapshots, "source snapshot").capturedText += " changed";
    expect(() => validatePoliticalDataHistory(previous, rewrittenSnapshot)).toThrow(
      /Immutable source snapshot.*rewritten/
    );

    const deletedSnapshot = structuredClone(previous);
    deletedSnapshot.sourceSnapshots.shift();
    expect(() => validatePoliticalDataHistory(previous, deletedSnapshot)).toThrow(
      /Immutable source snapshot.*deleted/
    );

    const rewrittenQuotation = structuredClone(previous);
    firstOrThrow(rewrittenQuotation.evidenceReferences, "evidence reference").exactQuote +=
      " changed";
    expect(() => validatePoliticalDataHistory(previous, rewrittenQuotation)).toThrow(
      /Immutable reviewed evidence.*rewritten/
    );

    const deletedQuotation = structuredClone(previous);
    deletedQuotation.evidenceReferences.shift();
    expect(() => validatePoliticalDataHistory(previous, deletedQuotation)).toThrow(
      /Immutable reviewed evidence.*deleted/
    );
  });

  test("preserves historical assignments and allows an open assignment to close", () => {
    const previous = loadCanonicalPoliticalData();

    const deletedAssignment = structuredClone(previous);
    deletedAssignment.roleAssignments.shift();
    expect(() => validatePoliticalDataHistory(previous, deletedAssignment)).toThrow(
      /Historical assignment.*deleted/
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
