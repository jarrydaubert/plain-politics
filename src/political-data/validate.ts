import { createHash } from "node:crypto";
import { deriveCurrentLeadership, deriveRoleHistory } from "@/political-data/derive";
import { type PoliticalData, politicalDataSchema } from "@/political-data/model";

export type PoliticalDataValidationResult = {
  assignments: number;
  evidenceReferences: number;
  parties: number;
  snapshots: number;
};

export function validatePoliticalData(input: unknown): PoliticalDataValidationResult {
  const parsed = politicalDataSchema.safeParse(input);

  if (!parsed.success) {
    throw new Error(
      `Political data schema validation failed:\n${JSON.stringify(parsed.error.issues, null, 2)}`
    );
  }

  const data = parsed.data;
  const errors: string[] = [];

  validateUniqueIds(data, errors);
  validateReferences(data, errors);
  validateSources(data, errors);
  validateAssignments(data, errors);
  validateDeterministicQueries(data, errors);

  if (errors.length > 0) {
    throw new Error(`Political data validation failed:\n- ${errors.join("\n- ")}`);
  }

  return {
    assignments: data.roleAssignments.length,
    evidenceReferences: data.evidenceReferences.length,
    parties: data.parties.length,
    snapshots: data.sourceSnapshots.length
  };
}

export function validatePoliticalDataHistory(previousInput: unknown, currentInput: unknown): void {
  const previous = politicalDataSchema.parse(previousInput);
  const current = politicalDataSchema.parse(currentInput);
  const errors: string[] = [];

  preserveImmutableRecords("party", previous.parties, current.parties, errors);
  preserveImmutableRecords("person", previous.people, current.people, errors);
  preserveImmutableRecords("role", previous.roles, current.roles, errors);
  preserveImmutableRecords(
    "source document",
    previous.sourceDocuments,
    current.sourceDocuments,
    errors
  );
  preserveImmutableRecords(
    "source snapshot",
    previous.sourceSnapshots,
    current.sourceSnapshots,
    errors
  );
  preserveImmutableRecords(
    "reviewed evidence",
    previous.evidenceReferences,
    current.evidenceReferences,
    errors
  );

  const currentAssignments = new Map(
    current.roleAssignments.map((assignment) => [assignment.id, assignment])
  );
  for (const previousAssignment of previous.roleAssignments) {
    const currentAssignment = currentAssignments.get(previousAssignment.id);

    if (!currentAssignment) {
      errors.push(`Historical assignment ${previousAssignment.id} was deleted`);
      continue;
    }
    if (JSON.stringify(previousAssignment) === JSON.stringify(currentAssignment)) {
      continue;
    }

    const {
      effectiveToExclusive: previousEnd,
      evidenceReferenceIds: previousEvidence,
      ...before
    } = previousAssignment;
    const {
      effectiveToExclusive: currentEnd,
      evidenceReferenceIds: currentEvidence,
      ...after
    } = currentAssignment;
    const closesOpenAssignment =
      previousEnd === null &&
      currentEnd !== null &&
      JSON.stringify(before) === JSON.stringify(after) &&
      previousEvidence.every((evidenceId) => currentEvidence.includes(evidenceId));

    if (!closesOpenAssignment) {
      errors.push(
        `Historical assignment ${previousAssignment.id} was rewritten instead of only being closed`
      );
    }
  }

  if (errors.length > 0) {
    throw new Error(`Political data history validation failed:\n- ${errors.join("\n- ")}`);
  }
}

function preserveImmutableRecords<T extends { id: string }>(
  label: string,
  previousRecords: T[],
  currentRecords: T[],
  errors: string[]
) {
  const currentById = new Map(currentRecords.map((record) => [record.id, record]));

  for (const previousRecord of previousRecords) {
    const currentRecord = currentById.get(previousRecord.id);
    if (!currentRecord) {
      errors.push(`Immutable ${label} ${previousRecord.id} was deleted`);
    } else if (JSON.stringify(previousRecord) !== JSON.stringify(currentRecord)) {
      errors.push(`Immutable ${label} ${previousRecord.id} was rewritten`);
    }
  }
}

function validateUniqueIds(data: PoliticalData, errors: string[]) {
  const records = [
    ...data.parties,
    ...data.people,
    ...data.roles,
    ...data.roleAssignments,
    ...data.sourceDocuments,
    ...data.sourceSnapshots,
    ...data.evidenceReferences
  ];
  const seen = new Set<string>();

  for (const record of records) {
    if (seen.has(record.id)) {
      errors.push(`Duplicate stable ID: ${record.id}`);
    }
    seen.add(record.id);
  }

  const slugs = new Set<string>();
  for (const party of data.parties) {
    if (slugs.has(party.slug)) {
      errors.push(`Duplicate party slug: ${party.slug}`);
    }
    slugs.add(party.slug);
  }
}

function validateReferences(data: PoliticalData, errors: string[]) {
  const partyIds = new Set(data.parties.map((party) => party.id));
  const personIds = new Set(data.people.map((person) => person.id));
  const rolesById = new Map(data.roles.map((role) => [role.id, role]));
  const assignmentsById = new Map(
    data.roleAssignments.map((assignment) => [assignment.id, assignment])
  );
  const evidenceById = new Map(data.evidenceReferences.map((evidence) => [evidence.id, evidence]));
  const documentIds = new Set(data.sourceDocuments.map((document) => document.id));
  const snapshotIds = new Set(data.sourceSnapshots.map((snapshot) => snapshot.id));

  for (const role of data.roles) {
    if (role.partyId !== null && !partyIds.has(role.partyId)) {
      errors.push(`${role.id} references missing party ${role.partyId}`);
    }
    if (role.category === "party" && role.partyId === null) {
      errors.push(`${role.id} is a party role without a partyId`);
    }
    if (
      role.descriptionEvidenceReferenceId &&
      !evidenceById.has(role.descriptionEvidenceReferenceId)
    ) {
      errors.push(
        `${role.id} references missing description evidence ${role.descriptionEvidenceReferenceId}`
      );
    }
    if (role.descriptionEvidenceReferenceId) {
      const evidence = evidenceById.get(role.descriptionEvidenceReferenceId);
      if (evidence && !evidence.roleDescriptionIds.includes(role.id)) {
        errors.push(`${evidence.id} does not claim support for ${role.id}'s description`);
      }
    }
  }

  for (const assignment of data.roleAssignments) {
    const role = rolesById.get(assignment.roleId);

    if (assignment.partyId !== null && !partyIds.has(assignment.partyId)) {
      errors.push(`${assignment.id} references missing party ${assignment.partyId}`);
    }
    if (!personIds.has(assignment.personId)) {
      errors.push(`${assignment.id} references missing person ${assignment.personId}`);
    }
    if (!role) {
      errors.push(`${assignment.id} references missing role ${assignment.roleId}`);
    } else if (role.partyId !== null && role.partyId !== assignment.partyId) {
      errors.push(`${assignment.id} assigns ${role.id} to the wrong party`);
    }
    for (const evidenceId of assignment.evidenceReferenceIds) {
      if (!evidenceById.has(evidenceId)) {
        errors.push(`${assignment.id} references missing evidence ${evidenceId}`);
      }
    }
  }

  for (const snapshot of data.sourceSnapshots) {
    if (!documentIds.has(snapshot.sourceDocumentId)) {
      errors.push(`${snapshot.id} references missing source document ${snapshot.sourceDocumentId}`);
    }
  }

  for (const evidence of data.evidenceReferences) {
    if (!snapshotIds.has(evidence.sourceSnapshotId)) {
      errors.push(`${evidence.id} references missing source snapshot ${evidence.sourceSnapshotId}`);
    }
    for (const claim of evidence.assignmentClaims) {
      const assignment = assignmentsById.get(claim.assignmentId);
      if (!assignment) {
        errors.push(`${evidence.id} claims support for missing assignment ${claim.assignmentId}`);
      } else if (!assignment.evidenceReferenceIds.includes(evidence.id)) {
        errors.push(`${evidence.id} claims ${assignment.id}, but that assignment does not link it`);
      }
    }
    for (const roleId of evidence.roleDescriptionIds) {
      const role = rolesById.get(roleId);
      if (!role) {
        errors.push(`${evidence.id} claims support for missing role description ${roleId}`);
      } else if (role.descriptionEvidenceReferenceId !== evidence.id) {
        errors.push(`${evidence.id} claims ${role.id}, but that role does not link it`);
      }
    }
  }
}

function validateSources(data: PoliticalData, errors: string[]) {
  for (const document of data.sourceDocuments) {
    if (new URL(document.url).protocol !== "https:") {
      errors.push(`${document.id} must use an HTTPS URL`);
    }
  }

  const snapshotsById = new Map(data.sourceSnapshots.map((snapshot) => [snapshot.id, snapshot]));

  for (const snapshot of data.sourceSnapshots) {
    const calculatedHash = createHash("sha256").update(snapshot.capturedText, "utf8").digest("hex");

    if (calculatedHash !== snapshot.contentHash) {
      errors.push(`${snapshot.id} contentHash does not match its captured text`);
    }
    if (toUkDate(snapshot.capturedAt) > data.asOf) {
      errors.push(`${snapshot.id} was captured after dataset asOf ${data.asOf}`);
    }
  }

  for (const evidence of data.evidenceReferences) {
    const snapshot = snapshotsById.get(evidence.sourceSnapshotId);

    if (snapshot && !snapshot.capturedText.includes(evidence.exactQuote)) {
      errors.push(`${evidence.id} exact quote is absent from ${snapshot.id}`);
    }
    if (snapshot && Date.parse(evidence.reviewedAt) < Date.parse(snapshot.capturedAt)) {
      errors.push(`${evidence.id} was reviewed before ${snapshot.id} was captured`);
    }
    if (toUkDate(evidence.reviewedAt) > data.asOf) {
      errors.push(`${evidence.id} was reviewed after dataset asOf ${data.asOf}`);
    }
  }
}

function validateAssignments(data: PoliticalData, errors: string[]) {
  const evidenceById = new Map(data.evidenceReferences.map((evidence) => [evidence.id, evidence]));
  const rolesById = new Map(data.roles.map((role) => [role.id, role]));
  const snapshotsById = new Map(data.sourceSnapshots.map((snapshot) => [snapshot.id, snapshot]));

  for (const assignment of data.roleAssignments) {
    if (
      assignment.effectiveToExclusive !== null &&
      assignment.effectiveToExclusive <= assignment.effectiveFrom
    ) {
      errors.push(`${assignment.id} has an invalid effective interval`);
    }

    const role = rolesById.get(assignment.roleId);
    const claims = assignment.evidenceReferenceIds.flatMap((evidenceId) => {
      const evidence = evidenceById.get(evidenceId);
      return (
        evidence?.assignmentClaims
          .filter((claim) => claim.assignmentId === assignment.id)
          .map((claim) => ({ evidence, expected: claim.expected, fields: claim.fields })) ?? []
      );
    });
    const claimedFields = new Set(claims.flatMap((claim) => claim.fields));

    for (const claim of claims) {
      for (const field of claim.fields) {
        const actual = {
          effective_from: assignment.effectiveFrom,
          effective_to_exclusive: assignment.effectiveToExclusive,
          holder: assignment.personId,
          party: assignment.partyId,
          role_title: role?.title ?? null
        }[field];

        if (claim.expected[field] !== actual) {
          errors.push(
            `${claim.evidence.id} expects ${assignment.id}.${field} to be ${claim.expected[field]}, not ${actual}`
          );
        }
      }
    }

    for (const requiredField of ["holder", "role_title"] as const) {
      if (!claimedFields.has(requiredField)) {
        errors.push(`${assignment.id} lacks reviewed evidence for ${requiredField}`);
      }
    }
    if (
      assignment.effectiveDateBasis === "official_start" &&
      !claimedFields.has("effective_from")
    ) {
      errors.push(`${assignment.id} lacks reviewed evidence for its official start date`);
    }
    if (assignment.effectiveToExclusive && !claimedFields.has("effective_to_exclusive")) {
      errors.push(`${assignment.id} lacks reviewed evidence for its exclusive end date`);
    }

    if (role?.partyId === null && assignment.partyId !== null && !claimedFields.has("party")) {
      errors.push(`${assignment.id} lacks reviewed evidence for its party association`);
    }

    if (assignment.effectiveDateBasis === "verified_from") {
      const verifiedAtEffectiveDate = claims.some(({ evidence, fields }) => {
        const snapshot = snapshotsById.get(evidence.sourceSnapshotId);
        return (
          fields.includes("holder") &&
          fields.includes("role_title") &&
          (snapshot ? toUkDate(snapshot.capturedAt) : null) === assignment.effectiveFrom
        );
      });

      if (!verifiedAtEffectiveDate) {
        errors.push(`${assignment.id} verified_from must match its supporting snapshot date`);
      }
    }
  }

  for (const role of data.roles) {
    if (role.holderPolicy === "multiple") {
      continue;
    }

    const assignments = data.roleAssignments
      .filter((assignment) => assignment.roleId === role.id)
      .sort((left, right) => left.effectiveFrom.localeCompare(right.effectiveFrom));

    for (let index = 1; index < assignments.length; index += 1) {
      const previous = assignments[index - 1];
      const current = assignments[index];

      if (
        previous &&
        current &&
        (previous.effectiveToExclusive === null ||
          current.effectiveFrom < previous.effectiveToExclusive)
      ) {
        errors.push(`${role.id} is single-holder but ${previous.id} overlaps ${current.id}`);
      }
    }
  }
}

function toUkDate(isoDateTime: string): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    timeZone: "Europe/London",
    year: "numeric"
  }).formatToParts(new Date(isoDateTime));
  const values = new Map(parts.map((part) => [part.type, part.value]));

  return `${values.get("year")}-${values.get("month")}-${values.get("day")}`;
}

function validateDeterministicQueries(data: PoliticalData, errors: string[]) {
  const reversed: PoliticalData = {
    ...structuredClone(data),
    evidenceReferences: [...data.evidenceReferences].reverse(),
    parties: [...data.parties].reverse(),
    people: [...data.people].reverse(),
    roleAssignments: [...data.roleAssignments].reverse(),
    roles: [...data.roles].reverse(),
    sourceDocuments: [...data.sourceDocuments].reverse(),
    sourceSnapshots: [...data.sourceSnapshots].reverse()
  };

  for (const party of data.parties) {
    const originalIds = deriveCurrentLeadership(data, party.id, data.asOf).map(
      (assignment) => assignment.id
    );
    const reversedIds = deriveCurrentLeadership(reversed, party.id, data.asOf).map(
      (assignment) => assignment.id
    );

    if (JSON.stringify(originalIds) !== JSON.stringify(reversedIds)) {
      errors.push(`Current leadership query is not deterministic for ${party.id}`);
    }
  }

  for (const role of data.roles) {
    const originalIds = deriveRoleHistory(data, role.id).map((assignment) => assignment.id);
    const reversedIds = deriveRoleHistory(reversed, role.id).map((assignment) => assignment.id);

    if (JSON.stringify(originalIds) !== JSON.stringify(reversedIds)) {
      errors.push(`Role history query is not deterministic for ${role.id}`);
    }
  }
}
