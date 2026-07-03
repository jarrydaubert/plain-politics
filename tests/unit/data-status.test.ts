import { afterEach, describe, expect, test } from "bun:test";
import { getDataStatusReport, resetDataStatusMemory } from "@/status/data-status";

const now = new Date("2026-07-03T09:30:00.000Z");

describe("data status", () => {
  afterEach(() => {
    resetDataStatusMemory();
  });

  test("marks stale source data as degraded", async () => {
    const report = await getDataStatusReport({
      fetcher: mockStatusFetch({
        votes: [
          division({
            date: "2025-01-01T16:00:00"
          })
        ]
      }),
      now
    });

    const votes = report.sources.find((source) => source.id === "uk-parliament-commons-votes");

    expect(report.overall).toBe("degraded");
    expect(votes?.state).toBe("degraded");
    expect(
      votes?.checks.some((check) => check.kind === "freshness" && check.outcome === "warn")
    ).toBe(true);
  });

  test("degrades when a non-critical API fails", async () => {
    const report = await getDataStatusReport({
      fetcher: mockStatusFetch({
        votesStatus: 503
      }),
      now
    });

    const votes = report.sources.find((source) => source.id === "uk-parliament-commons-votes");

    expect(report.overall).toBe("degraded");
    expect(votes?.state).toBe("degraded");
    expect(votes?.lastSuccessfulCheckAt).toBeNull();
  });

  test("goes offline when a critical API cannot support the postcode journey", async () => {
    const report = await getDataStatusReport({
      fetcher: mockStatusFetch({
        postcodeStatus: 500
      }),
      now
    });

    const postcode = report.sources.find((source) => source.id === "postcodes-ons");

    expect(report.overall).toBe("offline");
    expect(postcode?.state).toBe("offline");
  });

  test("goes offline for malformed critical API responses", async () => {
    const report = await getDataStatusReport({
      fetcher: mockStatusFetch({
        members: {
          items: [{ value: { id: 172 } }],
          totalResults: "650"
        }
      }),
      now
    });

    const members = report.sources.find((source) => source.id === "uk-parliament-members");

    expect(report.overall).toBe("offline");
    expect(members?.state).toBe("offline");
    expect(
      members?.checks.some((check) => check.kind === "record_shape" && check.outcome === "fail")
    ).toBe(true);
  });

  test("degrades suspicious current-MP data without calling the site offline", async () => {
    const report = await getDataStatusReport({
      fetcher: mockStatusFetch({
        members: {
          items: [
            member({
              endDate: "1987-06-11T00:00:00",
              id: 662,
              membershipFrom: "Torfaen",
              name: "Leo Abse",
              startDate: "1958-11-10T00:00:00",
              statusIsActive: false
            })
          ],
          totalResults: 650
        }
      }),
      now
    });

    const members = report.sources.find((source) => source.id === "uk-parliament-members");

    expect(report.overall).toBe("degraded");
    expect(members?.state).toBe("degraded");
    expect(
      members?.checks.some((check) => check.kind === "sanity" && check.outcome === "warn")
    ).toBe(true);
  });
});

function mockStatusFetch({
  members = healthyMembers(),
  postcode = healthyPostcode(),
  postcodeStatus = 200,
  votes = [division()],
  votesStatus = 200,
  whatson = [calendarEvent()]
}: {
  members?: unknown;
  postcode?: unknown;
  postcodeStatus?: number;
  votes?: unknown;
  votesStatus?: number;
  whatson?: unknown;
}) {
  return async (url: string) => {
    const requestUrl = new URL(url);

    if (
      requestUrl.hostname === "members-api.parliament.uk" &&
      requestUrl.pathname === "/api/Members/Search"
    ) {
      return Response.json(members);
    }

    if (
      requestUrl.hostname === "commonsvotes-api.parliament.uk" &&
      requestUrl.pathname === "/data/divisions.json"
    ) {
      return Response.json(votes, {
        status: votesStatus
      });
    }

    if (
      requestUrl.hostname === "whatson-api.parliament.uk" &&
      requestUrl.pathname === "/calendar/events/list.json"
    ) {
      return Response.json(whatson);
    }

    if (
      requestUrl.hostname === "api.postcodes.io" &&
      requestUrl.pathname.startsWith("/postcodes/")
    ) {
      return Response.json(postcode, {
        status: postcodeStatus
      });
    }

    return Response.json({}, { status: 404 });
  };
}

function healthyMembers() {
  return {
    items: [
      member({
        id: 172,
        membershipFrom: "Hackney North and Stoke Newington",
        name: "Ms Diane Abbott",
        startDate: "1987-06-11T00:00:00"
      }),
      member({
        id: 5131,
        membershipFrom: "Ipswich",
        name: "Jack Abbott",
        partyName: "Labour (Co-op)",
        startDate: "2024-07-04T00:00:00"
      })
    ],
    totalResults: 650
  };
}

function member({
  endDate = null,
  id,
  membershipFrom,
  name,
  partyName = "Labour",
  startDate,
  statusIsActive = true
}: {
  endDate?: string | null;
  id: number;
  membershipFrom: string;
  name: string;
  partyName?: string;
  startDate: string;
  statusIsActive?: boolean;
}) {
  return {
    value: {
      id,
      latestHouseMembership: {
        house: 1,
        membershipEndDate: endDate,
        membershipFrom,
        membershipStartDate: startDate,
        membershipStatus:
          endDate === null
            ? {
                statusIsActive
              }
            : {
                statusIsActive
              }
      },
      latestParty: {
        name: partyName
      },
      nameDisplayAs: name
    }
  };
}

function division({ date = "2026-07-01T16:01:00" }: { date?: string } = {}) {
  return {
    AyeCount: 177,
    Date: date,
    DivisionId: 2399,
    NoCount: 308,
    Number: 48,
    Title: "Taxation (Energy and Vehicles) Bill Committee: New Clause 5"
  };
}

function calendarEvent() {
  return {
    CancelledDate: null,
    Category: "Legislation",
    Description: "Nature's Rights Bill - second reading",
    House: "Lords",
    Id: 55738,
    StartDate: "2026-07-03T00:00:00"
  };
}

function healthyPostcode() {
  return {
    result: {
      codes: {
        parliamentary_constituency_2024: "E14001172"
      },
      parliamentary_constituency: "Cities of London and Westminster",
      parliamentary_constituency_2024: "Cities of London and Westminster",
      postcode: "SW1A 1AA"
    },
    status: 200
  };
}
