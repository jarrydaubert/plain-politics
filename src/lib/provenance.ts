import { createHash } from "node:crypto";

export type SourceTier = "tier_1" | "tier_2" | "tier_3";

export type ProvenanceSourceDocument = {
  id: string;
  title: string;
  publisher: string;
  url: string;
  sourceType: string;
  sourceTier: SourceTier;
  retrievedAt: string;
};

export type ProvenanceSourceSnapshot = {
  id: string;
  sourceDocumentId: string;
  contentHash: string;
  capturedAt: string;
};

export type ProvenanceSourceExcerpt = {
  id: string;
  sourceSnapshotId: string;
  excerptText: string;
  path: string;
};

export type ProvenanceDisplayFact = {
  id: string;
  summaryText: string;
  coverageState: "strong" | "partial" | "none";
  sourceExcerptIds: string[];
};

export function hashText(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export function stableId(prefix: string, value: string) {
  return `${prefix}_${hashText(value).slice(0, 20)}`;
}
