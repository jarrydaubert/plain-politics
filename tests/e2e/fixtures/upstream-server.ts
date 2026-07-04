const hostname = "127.0.0.1";
const port = 4010;

const server = Bun.serve({
  fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      return new Response("ok");
    }

    if (url.pathname.startsWith("/members-api/api/Parties/StateOfTheParties/1/")) {
      return Response.json({
        items: [
          {
            value: {
              female: 325,
              male: 324,
              nonBinary: 0,
              party: {
                abbreviation: "Lab",
                backgroundColour: "d50000",
                foregroundColour: "ffffff",
                id: 15,
                isIndependentParty: false,
                name: "Labour"
              },
              total: 649
            }
          },
          {
            value: {
              female: 1,
              male: 0,
              nonBinary: 0,
              party: {
                abbreviation: "Ind",
                backgroundColour: "999999",
                foregroundColour: "ffffff",
                id: 8,
                isIndependentParty: true,
                name: "Independent"
              },
              total: 1
            }
          }
        ]
      });
    }

    if (url.pathname === "/members-api/api/Members/Search") {
      return Response.json({
        items: [
          {
            value: {
              gender: "M",
              id: 5131,
              latestHouseMembership: {
                house: 1,
                membershipEndDate: null,
                membershipFrom: "Ipswich",
                membershipFromId: 3914,
                membershipStartDate: "2024-07-04T00:00:00",
                membershipStatus: {
                  statusDescription: "Current Member",
                  statusIsActive: true
                }
              },
              latestParty: {
                abbreviation: "Lab",
                backgroundColour: "d50000",
                foregroundColour: "ffffff",
                governmentType: 0,
                id: 15,
                isIndependentParty: false,
                isLordsMainParty: true,
                isLordsSpiritualParty: false,
                name: "Labour (Co-op)"
              },
              nameDisplayAs: "Jack Abbott",
              nameFullTitle: "Jack Abbott MP",
              thumbnailUrl: null
            }
          }
        ],
        skip: 0,
        take: 8,
        totalResults: 650
      });
    }

    if (url.pathname === "/commons-votes/data/divisions.json/search") {
      return Response.json([
        {
          AyeCount: 330,
          Date: new Date().toISOString(),
          DivisionId: 2394,
          NoCount: 93,
          Number: 43,
          PublicationUpdated: new Date().toISOString(),
          Title: "Fixture division record"
        }
      ]);
    }

    if (url.pathname === "/whatson/calendar/events/list.json") {
      const startDate = url.searchParams.get("startDate") ?? new Date().toISOString().slice(0, 10);

      return Response.json([
        {
          BillId: null,
          BillName: null,
          BillPageLink: null,
          CancelledDate: null,
          Category: "Oral questions",
          Description: "Fixture parliamentary business",
          EndDate: null,
          EndTime: null,
          HasSpeakers: false,
          House: "Commons",
          Id: 1001,
          LeadHouse: "Commons",
          Location: "House of Commons",
          Members: [],
          StartDate: `${startDate}T00:00:00`,
          StartTime: "11:30:00",
          SummarisedDetails: null,
          Type: "Main Chamber"
        }
      ]);
    }

    if (url.pathname === "/postcodes/postcodes/SW1A%201AA") {
      return Response.json({
        result: {
          codes: {
            parliamentary_constituency: "E14001172",
            parliamentary_constituency_2024: "E14001172"
          },
          parliamentary_constituency: "Cities of London and Westminster",
          parliamentary_constituency_2024: "Cities of London and Westminster",
          postcode: "SW1A 1AA"
        },
        status: 200
      });
    }

    return Response.json({ error: `No E2E fixture for ${url.pathname}` }, { status: 404 });
  },
  hostname,
  port
});

console.log(`E2E upstream fixtures listening on ${server.url}`);
