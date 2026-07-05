import { z } from "zod";

const sourceTierSchema = z.enum(["tier_1", "tier_2", "tier_3"]);

export const sourceDocumentSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  publisher: z.string().min(1),
  url: z.string().url(),
  sourceType: z.string().min(1),
  sourceTier: sourceTierSchema,
  publishedAt: z.string().datetime().nullable(),
  retrievedAt: z.string().datetime()
});

export const sourceSnapshotSchema = z.object({
  id: z.string().uuid(),
  sourceDocumentId: z.string().uuid(),
  contentHash: z.string().min(16),
  capturedAt: z.string().datetime(),
  storagePath: z.string().min(1).nullable()
});

export const sourceExcerptSchema = z.object({
  id: z.string().uuid(),
  sourceSnapshotId: z.string().uuid(),
  excerptText: z.string().min(1),
  startOffset: z.number().int().nonnegative().nullable(),
  endOffset: z.number().int().positive().nullable(),
  pageLabel: z.string().nullable()
});

export const displayFactSchema = z.object({
  id: z.string().uuid(),
  subjectType: z.string().min(1),
  subjectId: z.string().uuid(),
  summaryText: z.string().min(1),
  sourceExcerptIds: z.array(z.string().uuid()).min(1),
  coverageState: z.enum(["strong", "partial", "none"]),
  lastCheckedAt: z.string().datetime()
});
