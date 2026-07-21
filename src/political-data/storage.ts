import canonicalData from "@/political-data/canonical-data.json";
import { type PoliticalData, politicalDataSchema } from "@/political-data/model";
import { validatePoliticalData } from "@/political-data/validate";

validatePoliticalData(canonicalData);
const parsedCanonicalData = politicalDataSchema.parse(canonicalData);

export function loadCanonicalPoliticalData(): PoliticalData {
  return structuredClone(parsedCanonicalData);
}
