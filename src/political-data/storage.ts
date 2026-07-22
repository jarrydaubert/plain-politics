import assignments from "@/political-data/canonical/assignments.json";
import dataset from "@/political-data/canonical/dataset.json";
import entities from "@/political-data/canonical/entities.json";
import evidence from "@/political-data/canonical/evidence.json";
import metadataAmendments from "@/political-data/canonical/metadata-amendments.json";
import sources from "@/political-data/canonical/sources.json";
import { type PoliticalData, politicalDataSchema } from "@/political-data/model";
import { validatePoliticalData } from "@/political-data/validate";

export const canonicalPoliticalDataPaths = [
  "src/political-data/canonical/dataset.json",
  "src/political-data/canonical/entities.json",
  "src/political-data/canonical/assignments.json",
  "src/political-data/canonical/sources.json",
  "src/political-data/canonical/evidence.json",
  "src/political-data/canonical/metadata-amendments.json"
] as const;

export function parseCanonicalPoliticalDataFiles(files: unknown[]): PoliticalData {
  if (files.length !== canonicalPoliticalDataPaths.length) {
    throw new Error(
      `Canonical political dataset requires ${canonicalPoliticalDataPaths.length} files, received ${files.length}`
    );
  }

  return politicalDataSchema.parse(Object.assign({}, ...files));
}

const parsedCanonicalData = parseCanonicalPoliticalDataFiles([
  dataset,
  entities,
  assignments,
  sources,
  evidence,
  metadataAmendments
]);
validatePoliticalData(parsedCanonicalData);

export function loadCanonicalPoliticalData(): PoliticalData {
  return structuredClone(parsedCanonicalData);
}
