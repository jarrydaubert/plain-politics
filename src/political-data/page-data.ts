import { deriveCurrentLeadership, findPartyBySlug } from "@/political-data/derive";
import type {
  EvidenceReference,
  PoliticalData,
  RoleCategory,
  SourceDocument,
  SourceSnapshot
} from "@/political-data/model";

export type LeadershipEvidence = {
  checkedAt: string;
  exactQuote: string;
  id: string;
  locator: string;
  snapshotHash: string;
  sourceName: string;
  sourceTier: "Tier 1";
  sourceUrl: string;
  whatItSupports: string;
};

export type LeadershipHolder = {
  effectiveDateBasis: "official_start" | "verified_from";
  effectiveFrom: string;
  evidence: LeadershipEvidence[];
  id: string;
  personName: string;
};

export type LeadershipRole = {
  description: string | null;
  descriptionEvidence: LeadershipEvidence | null;
  holders: LeadershipHolder[];
  id: string;
  scopeLabel: string;
  title: string;
};

export type LeadershipSection = {
  category: RoleCategory;
  heading: string;
  roles: LeadershipRole[];
};

export type PartyLeadershipPageData = {
  asOf: string;
  party: {
    name: string;
    officialName: string;
    slug: string;
  };
  sections: LeadershipSection[];
};

const sectionDefinitions = [
  { category: "party", heading: "Party leadership" },
  { category: "parliamentary", heading: "Parliamentary leadership" },
  { category: "government", heading: "Government roles" }
] as const satisfies ReadonlyArray<{ category: RoleCategory; heading: string }>;

export function buildPartyLeadershipPageData(
  data: PoliticalData,
  slug: string,
  asOf: string
): PartyLeadershipPageData | null {
  const party = findPartyBySlug(data, slug);

  if (!party) {
    return null;
  }

  const currentAssignments = deriveCurrentLeadership(data, party.id, asOf);
  const assignmentsByRole = new Map<string, typeof currentAssignments>();

  for (const assignment of currentAssignments) {
    const assignments = assignmentsByRole.get(assignment.roleId) ?? [];
    assignments.push(assignment);
    assignmentsByRole.set(assignment.roleId, assignments);
  }

  const rolesById = new Map(data.roles.map((role) => [role.id, role]));
  const peopleById = new Map(data.people.map((person) => [person.id, person]));
  const evidenceById = new Map(data.evidenceReferences.map((evidence) => [evidence.id, evidence]));
  const snapshotsById = new Map(data.sourceSnapshots.map((snapshot) => [snapshot.id, snapshot]));
  const documentsById = new Map(data.sourceDocuments.map((document) => [document.id, document]));

  const sections = sectionDefinitions.map(({ category, heading }) => {
    const roles = [...assignmentsByRole.entries()]
      .map(([roleId, assignments]) => ({ assignments, role: rolesById.get(roleId) }))
      .filter(
        (
          entry
        ): entry is {
          assignments: typeof currentAssignments;
          role: NonNullable<typeof entry.role>;
        } => entry.role?.category === category
      )
      .sort(
        (left, right) =>
          left.role.sortOrder - right.role.sortOrder ||
          left.role.title.localeCompare(right.role.title)
      )
      .map(({ assignments, role }) => ({
        description: role.description ?? null,
        descriptionEvidence: role.descriptionEvidenceReferenceId
          ? resolveEvidence(
              role.descriptionEvidenceReferenceId,
              evidenceById,
              snapshotsById,
              documentsById
            )
          : null,
        holders: assignments.map((assignment) => ({
          effectiveDateBasis: assignment.effectiveDateBasis,
          effectiveFrom: assignment.effectiveFrom,
          evidence: assignment.evidenceReferenceIds.map((evidenceId) =>
            resolveEvidence(evidenceId, evidenceById, snapshotsById, documentsById)
          ),
          id: assignment.id,
          personName: mustGet(peopleById, assignment.personId, "person").name
        })),
        id: role.id,
        scopeLabel: role.scopeLabel,
        title: role.title
      }));

    return { category, heading, roles };
  });

  return {
    asOf,
    party: {
      name: party.name,
      officialName: party.officialName,
      slug: party.slug
    },
    sections
  };
}

function resolveEvidence(
  evidenceId: string,
  evidenceById: Map<string, EvidenceReference>,
  snapshotsById: Map<string, SourceSnapshot>,
  documentsById: Map<string, SourceDocument>
): LeadershipEvidence {
  const evidence = mustGet(evidenceById, evidenceId, "evidence reference");
  const snapshot = mustGet(snapshotsById, evidence.sourceSnapshotId, "source snapshot");
  const document = mustGet(documentsById, snapshot.sourceDocumentId, "source document");

  return {
    checkedAt: snapshot.capturedAt,
    exactQuote: evidence.exactQuote,
    id: evidence.id,
    locator: evidence.locator,
    snapshotHash: snapshot.contentHash,
    sourceName: `${document.publisher} — ${document.title}`,
    sourceTier: "Tier 1",
    sourceUrl: document.url,
    whatItSupports: evidence.whatItSupports
  };
}

function mustGet<T>(map: Map<string, T>, id: string, kind: string): T {
  const value = map.get(id);

  if (!value) {
    throw new Error(`Canonical political data has an unresolved ${kind}: ${id}`);
  }

  return value;
}
