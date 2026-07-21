import "server-only";

import {
  deriveCurrentLeadership,
  deriveRoleHistory,
  findPartyBySlug
} from "@/political-data/derive";
import { buildPartyLeadershipPageData } from "@/political-data/page-data";
import { loadCanonicalPoliticalData } from "@/political-data/storage";

export function getPartyBySlug(slug: string) {
  return findPartyBySlug(loadCanonicalPoliticalData(), slug);
}

export function getCurrentLeadership(partyId: string, asOf: string) {
  return deriveCurrentLeadership(loadCanonicalPoliticalData(), partyId, asOf);
}

export function getRoleHistory(roleId: string) {
  return deriveRoleHistory(loadCanonicalPoliticalData(), roleId);
}

export function getPartyLeadershipPageBySlug(slug: string) {
  const data = loadCanonicalPoliticalData();
  return buildPartyLeadershipPageData(data, slug, data.asOf);
}

export function getLeadershipPartySlugs() {
  return [...loadCanonicalPoliticalData().parties]
    .sort((left, right) => left.sortOrder - right.sortOrder || left.slug.localeCompare(right.slug))
    .map((party) => party.slug);
}
