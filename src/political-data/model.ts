import { z } from "zod";

const stableIdSchema = z.string().regex(/^[a-z][a-z0-9-]*$/);
const isoDateSchema = z.iso.date();
const isoDateTimeSchema = z.iso.datetime({ offset: true });

export const partySchema = z.object({
  id: stableIdSchema,
  name: z.string().min(1),
  officialName: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  sortOrder: z.number().int().nonnegative()
});

export const personSchema = z.object({
  id: stableIdSchema,
  name: z.string().min(1)
});

export const roleCategorySchema = z.enum(["party", "parliamentary", "government"]);

export const roleSchema = z
  .object({
    category: roleCategorySchema,
    description: z.string().min(1).optional(),
    descriptionEvidenceReferenceId: stableIdSchema.optional(),
    holderPolicy: z.enum(["single", "multiple"]),
    id: stableIdSchema,
    partyId: stableIdSchema.nullable(),
    scopeLabel: z.string().min(1),
    sortOrder: z.number().int().nonnegative(),
    title: z.string().min(1)
  })
  .refine(
    (role) => Boolean(role.description) === Boolean(role.descriptionEvidenceReferenceId),
    "A role description and its evidence reference must be supplied together"
  );

export const roleAssignmentSchema = z.object({
  effectiveDateBasis: z.enum(["official_start", "verified_from"]),
  effectiveFrom: isoDateSchema,
  effectiveToExclusive: isoDateSchema.nullable(),
  evidenceReferenceIds: z.array(stableIdSchema).min(1),
  id: stableIdSchema,
  partyId: stableIdSchema.nullable(),
  personId: stableIdSchema,
  roleId: stableIdSchema
});

const canonicalSourceDocumentSchema = z.object({
  id: stableIdSchema,
  publisher: z.string().min(1),
  sourceTier: z.literal("tier_1"),
  sourceType: z.enum(["official_party_page", "official_parliamentary_record", "gov_uk"]),
  title: z.string().min(1),
  url: z.string().url()
});

const canonicalSourceSnapshotSchema = z.object({
  capturedAt: isoDateTimeSchema,
  capturedText: z.string().min(1),
  contentHash: z.string().regex(/^[a-f0-9]{64}$/),
  extractMethod: z.literal("manual_reviewed_extract"),
  id: stableIdSchema,
  sourceDocumentId: stableIdSchema
});

const evidenceClaimFieldSchema = z.enum([
  "holder",
  "role_title",
  "party",
  "effective_from",
  "effective_to_exclusive"
]);

const assignmentClaimSchema = z
  .object({
    assignmentId: stableIdSchema,
    expected: z.record(z.string(), z.string().nullable()),
    fields: z
      .array(evidenceClaimFieldSchema)
      .min(1)
      .refine((fields) => new Set(fields).size === fields.length, "Claim fields must be unique")
  })
  .refine(
    (claim) =>
      Object.keys(claim.expected).length === claim.fields.length &&
      claim.fields.every((field) => Object.hasOwn(claim.expected, field)),
    "Each claim field must have exactly one expected value"
  );

const evidenceReferenceSchema = z
  .object({
    assignmentClaims: z.array(assignmentClaimSchema),
    exactQuote: z.string().min(1),
    id: stableIdSchema,
    locator: z.string().min(1),
    reviewStatus: z.literal("reviewed"),
    reviewedAt: isoDateTimeSchema,
    roleDescriptionIds: z.array(stableIdSchema),
    sourceSnapshotId: stableIdSchema,
    whatItSupports: z.string().min(1)
  })
  .refine(
    (evidence) => evidence.assignmentClaims.length > 0 || evidence.roleDescriptionIds.length > 0,
    "Evidence must support at least one assignment or role description"
  );

export const metadataEntityTypeSchema = z.enum(["party", "person", "role", "source_document"]);

const amendableFields = {
  party: new Set(["name", "officialName", "slug", "sortOrder"]),
  person: new Set(["name"]),
  role: new Set([
    "description",
    "descriptionEvidenceReferenceId",
    "scopeLabel",
    "sortOrder",
    "title"
  ]),
  source_document: new Set(["publisher", "sourceTier", "sourceType", "title", "url"])
} as const;

export const metadataAmendmentSchema = z
  .object({
    changedFields: z
      .array(z.string().min(1))
      .min(1)
      .refine((fields) => new Set(fields).size === fields.length, "Changed fields must be unique"),
    entityId: stableIdSchema,
    entityType: metadataEntityTypeSchema,
    evidenceReferenceIds: z.array(stableIdSchema).min(1),
    id: stableIdSchema,
    reason: z.string().trim().min(12),
    reviewStatus: z.literal("reviewed"),
    reviewedAt: isoDateTimeSchema,
    revision: z.number().int().min(2)
  })
  .superRefine((amendment, context) => {
    const allowedFields = amendableFields[amendment.entityType];

    for (const field of amendment.changedFields) {
      if (!allowedFields.has(field)) {
        context.addIssue({
          code: "custom",
          message: `${field} is not amendable metadata for ${amendment.entityType}`,
          path: ["changedFields"]
        });
      }
    }
  });

export const politicalDataSchema = z.object({
  asOf: isoDateSchema,
  evidenceReferences: z.array(evidenceReferenceSchema),
  metadataAmendments: z.array(metadataAmendmentSchema),
  parties: z.array(partySchema),
  people: z.array(personSchema),
  roleAssignments: z.array(roleAssignmentSchema),
  roles: z.array(roleSchema),
  sourceDocuments: z.array(canonicalSourceDocumentSchema),
  sourceSnapshots: z.array(canonicalSourceSnapshotSchema),
  version: z.literal(1)
});

export type Party = z.infer<typeof partySchema>;
export type EvidenceReference = z.infer<typeof evidenceReferenceSchema>;
export type MetadataAmendment = z.infer<typeof metadataAmendmentSchema>;
export type MetadataEntityType = z.infer<typeof metadataEntityTypeSchema>;
export type Person = z.infer<typeof personSchema>;
export type PoliticalData = z.infer<typeof politicalDataSchema>;
export type Role = z.infer<typeof roleSchema>;
export type RoleAssignment = z.infer<typeof roleAssignmentSchema>;
export type RoleCategory = z.infer<typeof roleCategorySchema>;
export type SourceDocument = z.infer<typeof canonicalSourceDocumentSchema>;
export type SourceSnapshot = z.infer<typeof canonicalSourceSnapshotSchema>;
