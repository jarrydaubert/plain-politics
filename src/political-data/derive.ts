import type { Party, PoliticalData, RoleAssignment } from "@/political-data/model";

const categoryOrder = {
  party: 0,
  parliamentary: 1,
  government: 2
} as const;

export function findPartyBySlug(data: PoliticalData, slug: string): Party | null {
  return data.parties.find((party) => party.slug === slug) ?? null;
}

export function deriveCurrentLeadership(
  data: PoliticalData,
  partyId: string,
  asOf: string
): RoleAssignment[] {
  const rolesById = new Map(data.roles.map((role) => [role.id, role]));
  const peopleById = new Map(data.people.map((person) => [person.id, person]));

  return data.roleAssignments
    .filter(
      (assignment) =>
        assignment.partyId === partyId &&
        assignment.effectiveFrom <= asOf &&
        (assignment.effectiveToExclusive === null || asOf < assignment.effectiveToExclusive)
    )
    .sort((left, right) => {
      const leftRole = rolesById.get(left.roleId);
      const rightRole = rolesById.get(right.roleId);

      if (!leftRole || !rightRole) {
        return left.id.localeCompare(right.id);
      }

      return (
        categoryOrder[leftRole.category] - categoryOrder[rightRole.category] ||
        leftRole.sortOrder - rightRole.sortOrder ||
        leftRole.title.localeCompare(rightRole.title) ||
        (peopleById.get(left.personId)?.name ?? left.personId).localeCompare(
          peopleById.get(right.personId)?.name ?? right.personId
        ) ||
        left.id.localeCompare(right.id)
      );
    });
}

export function deriveRoleHistory(data: PoliticalData, roleId: string): RoleAssignment[] {
  const peopleById = new Map(data.people.map((person) => [person.id, person]));

  return data.roleAssignments
    .filter((assignment) => assignment.roleId === roleId)
    .sort(
      (left, right) =>
        right.effectiveFrom.localeCompare(left.effectiveFrom) ||
        (right.effectiveToExclusive ?? "9999-12-31").localeCompare(
          left.effectiveToExclusive ?? "9999-12-31"
        ) ||
        (peopleById.get(left.personId)?.name ?? left.personId).localeCompare(
          peopleById.get(right.personId)?.name ?? right.personId
        ) ||
        left.id.localeCompare(right.id)
    );
}
