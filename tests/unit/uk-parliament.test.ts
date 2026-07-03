import { afterEach, describe, expect, test } from "bun:test";
import { getCommonsMembersSample, resetParliamentSourceCache } from "@/sources/uk-parliament";

const originalFetch = globalThis.fetch;

describe("UK Parliament source adapters", () => {
  afterEach(() => {
    globalThis.fetch = originalFetch;
    resetParliamentSourceCache();
  });

  test("requests and returns only current Commons members", async () => {
    let requestedUrl = "";
    globalThis.fetch = (async (input) => {
      requestedUrl = String(input);

      return Response.json({
        items: [
          memberSearchItem({
            id: 172,
            membershipFrom: "Hackney North and Stoke Newington",
            name: "Ms Diane Abbott",
            startDate: "1987-06-11T00:00:00"
          }),
          memberSearchItem({
            endDate: "1987-06-11T00:00:00",
            id: 662,
            membershipFrom: "Torfaen",
            name: "Leo Abse",
            startDate: "1958-11-10T00:00:00"
          }),
          memberSearchItem({
            id: 5131,
            membershipFrom: "Ipswich",
            name: "Jack Abbott",
            partyName: "Labour (Co-op)",
            startDate: "2024-07-04T00:00:00"
          }),
          memberSearchItem({
            endDate: "2011-01-26T00:00:00",
            id: 645,
            membershipFrom: "Belfast West",
            name: "Mr Gerry Adams",
            startDate: "1997-05-01T00:00:00"
          }),
          memberSearchItem({
            endDate: "2023-06-12T00:00:00",
            id: 4057,
            membershipFrom: "Selby and Ainsty",
            name: "Nigel Adams",
            startDate: "2010-05-06T00:00:00"
          })
        ],
        skip: 0,
        take: 8,
        totalResults: 650
      });
    }) as typeof fetch;

    const members = await getCommonsMembersSample(8);

    expect(requestedUrl).toContain("House=1");
    expect(requestedUrl).toContain("IsCurrentMember=true");
    expect(members.data.map((member) => member.nameDisplayAs)).toEqual([
      "Ms Diane Abbott",
      "Jack Abbott"
    ]);
    expect(members.data.map((member) => member.latestHouseMembership.membershipEndDate)).toEqual([
      null,
      null
    ]);
    expect(members.dataStatus.state).toBe("fresh");
  });

  test("returns last successful current-member data as stale when a later source check fails", async () => {
    globalThis.fetch = (async () =>
      Response.json({
        items: [
          memberSearchItem({
            id: 5131,
            membershipFrom: "Ipswich",
            name: "Jack Abbott",
            partyName: "Labour (Co-op)",
            startDate: "2024-07-04T00:00:00"
          })
        ],
        skip: 0,
        take: 8,
        totalResults: 650
      })) as unknown as typeof fetch;

    const freshMembers = await getCommonsMembersSample(8);

    globalThis.fetch = (async () => Response.json({}, { status: 503 })) as unknown as typeof fetch;

    const staleMembers = await getCommonsMembersSample(8);

    expect(freshMembers.dataStatus.state).toBe("fresh");
    expect(staleMembers.dataStatus.state).toBe("stale");
    expect(staleMembers.data.map((member) => member.nameDisplayAs)).toEqual(["Jack Abbott"]);
    expect(staleMembers.dataStatus.note).toContain("last successful response");
  });
});

function memberSearchItem({
  endDate = null,
  id,
  membershipFrom,
  name,
  partyName = "Labour",
  startDate
}: {
  endDate?: string | null;
  id: number;
  membershipFrom: string;
  name: string;
  partyName?: string;
  startDate: string;
}) {
  return {
    value: {
      gender: "M",
      id,
      latestHouseMembership: {
        house: 1,
        membershipEndDate: endDate,
        membershipFrom,
        membershipFromId: id,
        membershipStartDate: startDate,
        membershipStatus:
          endDate === null
            ? {
                statusDescription: "Current Member",
                statusIsActive: true
              }
            : null
      },
      latestParty: {
        abbreviation: "Lab",
        backgroundColour: "d50000",
        foregroundColour: "ffffff",
        governmentType: 0,
        id: 15,
        isIndependentParty: false,
        isLordsMainParty: true,
        isLordsSpiritualParty: true,
        name: partyName
      },
      nameDisplayAs: name,
      nameFullTitle: name,
      thumbnailUrl: null
    }
  };
}
