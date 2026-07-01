import { z } from "zod";
import {
  hashText,
  type ProvenanceDisplayFact,
  type ProvenanceSourceDocument,
  type ProvenanceSourceExcerpt,
  type ProvenanceSourceSnapshot,
  stableId
} from "@/lib/provenance";

const MEMBERS_API_BASE = "https://members-api.parliament.uk/api";
const COMMONS_VOTES_API_BASE = "https://commonsvotes-api.parliament.uk/data";
const WHATSON_API_BASE = "https://whatson-api.parliament.uk/calendar/events";
const COMMONS_HOUSE_ID = 1;

const parliamentPartySchema = z.object({
  id: z.number(),
  name: z.string(),
  abbreviation: z.string().nullable(),
  backgroundColour: z.string().nullable(),
  foregroundColour: z.string().nullable(),
  isIndependentParty: z.boolean()
});

const partySeatCountSchema = z.object({
  male: z.number().nullable(),
  female: z.number().nullable(),
  nonBinary: z.number().nullable(),
  total: z.number(),
  party: parliamentPartySchema
});

const partySeatCountItemSchema = z.object({
  value: partySeatCountSchema
});

const stateOfPartiesSchema = z.object({
  items: z.array(partySeatCountItemSchema)
});

const memberPartySchema = parliamentPartySchema.extend({
  isLordsMainParty: z.boolean(),
  isLordsSpiritualParty: z.boolean(),
  governmentType: z.number().nullable()
});

const memberHouseMembershipSchema = z.object({
  membershipFrom: z.string(),
  membershipFromId: z.number(),
  house: z.number(),
  membershipStartDate: z.string(),
  membershipEndDate: z.string().nullable()
});

const memberSchema = z.object({
  id: z.number(),
  nameDisplayAs: z.string(),
  nameFullTitle: z.string().nullable(),
  latestParty: memberPartySchema,
  gender: z.string().nullable(),
  latestHouseMembership: memberHouseMembershipSchema,
  thumbnailUrl: z.string().url().nullable()
});

const memberSearchItemSchema = z.object({
  value: memberSchema
});

const memberSearchSchema = z.object({
  items: z.array(memberSearchItemSchema),
  totalResults: z.number(),
  skip: z.number(),
  take: z.number()
});

const divisionSchema = z.object({
  DivisionId: z.number(),
  Date: z.string(),
  PublicationUpdated: z.string(),
  Number: z.number(),
  Title: z.string(),
  AyeCount: z.number(),
  NoCount: z.number()
});

const divisionsSchema = z.array(divisionSchema);

const parliamentEventMemberSchema = z.object({
  Id: z.number(),
  Name: z.string(),
  Party: z.string().nullable(),
  MemberFrom: z.string().nullable(),
  PartyColour: z.string().nullable()
});

const parliamentEventSchema = z.object({
  Id: z.number(),
  StartDate: z.string(),
  EndDate: z.string().nullable(),
  CancelledDate: z.string().nullable(),
  StartTime: z.string().nullable(),
  EndTime: z.string().nullable(),
  Description: z.string().nullable(),
  Type: z.string().nullable(),
  House: z.string().nullable(),
  LeadHouse: z.string().nullable(),
  Category: z.string().nullable(),
  Location: z.string().nullable(),
  HasSpeakers: z.boolean(),
  Members: z.array(parliamentEventMemberSchema),
  SummarisedDetails: z.string().nullable(),
  BillId: z.number().nullable(),
  BillName: z.string().nullable(),
  BillPageLink: z.string().nullable()
});

const parliamentEventsSchema = z.array(parliamentEventSchema);

export type PartySeatCount = z.infer<typeof partySeatCountSchema>;
export type CommonsMember = z.infer<typeof memberSchema>;
export type CommonsDivision = z.infer<typeof divisionSchema>;
export type ParliamentEvent = z.infer<typeof parliamentEventSchema>;

export type ProvenancedRecord<T> = {
  data: T;
  sourceDocument: ProvenanceSourceDocument;
  sourceSnapshot: ProvenanceSourceSnapshot;
  sourceExcerpts: ProvenanceSourceExcerpt[];
  displayFacts: ProvenanceDisplayFact[];
};

export async function getCommonsPartySeatCounts(now = new Date()) {
  const forDate = toDateParam(now);
  const url = `${MEMBERS_API_BASE}/Parties/StateOfTheParties/${COMMONS_HOUSE_ID}/${forDate}`;
  const raw = await fetchJson(url);
  const parsed = stateOfPartiesSchema.parse(raw);
  const retrievedAt = new Date().toISOString();
  const rawText = JSON.stringify(raw, null, 2);
  const sourceDocument = buildSourceDocument({
    title: `State of the Parties in the House of Commons on ${forDate}`,
    publisher: "UK Parliament Members API",
    retrievedAt,
    url
  });
  const sourceSnapshot = buildSourceSnapshot(sourceDocument, rawText, retrievedAt);
  const sourceExcerpts = parsed.items.map((item, index) =>
    buildSourceExcerpt({
      excerptText: JSON.stringify(item.value),
      path: `items[${index}].value`,
      sourceSnapshot
    })
  );
  const displayFacts = parsed.items.map((item, index) =>
    buildDisplayFact({
      summaryText: `${item.value.party.name} has ${item.value.total} seats in the House of Commons.`,
      sourceExcerptIds: [sourceExcerpts[index]?.id ?? ""]
    })
  );

  return {
    data: parsed.items.map((item) => item.value).sort((a, b) => b.total - a.total),
    displayFacts,
    sourceDocument,
    sourceExcerpts,
    sourceSnapshot
  } satisfies ProvenancedRecord<PartySeatCount[]>;
}

export async function getCommonsMembersSample(take = 8) {
  const url = `${MEMBERS_API_BASE}/Members/Search?House=${COMMONS_HOUSE_ID}&skip=0&take=${take}`;
  const raw = await fetchJson(url);
  const parsed = memberSearchSchema.parse(raw);
  const retrievedAt = new Date().toISOString();
  const rawText = JSON.stringify(raw, null, 2);
  const sourceDocument = buildSourceDocument({
    title: "Current House of Commons members sample",
    publisher: "UK Parliament Members API",
    retrievedAt,
    url
  });
  const sourceSnapshot = buildSourceSnapshot(sourceDocument, rawText, retrievedAt);
  const sourceExcerpts = parsed.items.map((item, index) =>
    buildSourceExcerpt({
      excerptText: JSON.stringify(item.value),
      path: `items[${index}].value`,
      sourceSnapshot
    })
  );
  const displayFacts = parsed.items.map((item, index) =>
    buildDisplayFact({
      summaryText: `${item.value.nameDisplayAs} represents ${item.value.latestHouseMembership.membershipFrom}.`,
      sourceExcerptIds: [sourceExcerpts[index]?.id ?? ""]
    })
  );

  return {
    data: parsed.items.map((item) => item.value),
    displayFacts,
    sourceDocument,
    sourceExcerpts,
    sourceSnapshot
  } satisfies ProvenancedRecord<CommonsMember[]>;
}

export async function getRecentCommonsDivisions(take = 5) {
  const url = `${COMMONS_VOTES_API_BASE}/divisions.json/search?queryParameters.skip=0&queryParameters.take=${take}`;
  const raw = await fetchJson(url);
  const parsed = divisionsSchema.parse(raw);
  const retrievedAt = new Date().toISOString();
  const rawText = JSON.stringify(raw, null, 2);
  const sourceDocument = buildSourceDocument({
    title: "Recent House of Commons divisions",
    publisher: "UK Parliament Commons Votes API",
    retrievedAt,
    url
  });
  const sourceSnapshot = buildSourceSnapshot(sourceDocument, rawText, retrievedAt);
  const sourceExcerpts = parsed.map((division, index) =>
    buildSourceExcerpt({
      excerptText: JSON.stringify(division),
      path: `[${index}]`,
      sourceSnapshot
    })
  );
  const displayFacts = parsed.map((division, index) =>
    buildDisplayFact({
      summaryText: `${division.Title}: ${division.AyeCount} ayes and ${division.NoCount} noes.`,
      sourceExcerptIds: [sourceExcerpts[index]?.id ?? ""]
    })
  );

  return {
    data: parsed,
    displayFacts,
    sourceDocument,
    sourceExcerpts,
    sourceSnapshot
  } satisfies ProvenancedRecord<CommonsDivision[]>;
}

export async function getUpcomingParliamentEvents(daysAhead = 7, take = 8, now = new Date()) {
  const startDate = toDateParam(now);
  const endDate = toDateParam(addDays(now, daysAhead));
  const url = `${WHATSON_API_BASE}/list.json?startDate=${startDate}&endDate=${endDate}`;
  const raw = await fetchJson(url);
  const parsed = parliamentEventsSchema.parse(raw);
  const retrievedAt = new Date().toISOString();
  const rawText = JSON.stringify(raw, null, 2);
  const sourceDocument = buildSourceDocument({
    title: `Upcoming Parliament events from ${startDate} to ${endDate}`,
    publisher: "UK Parliament What's On API",
    retrievedAt,
    url
  });
  const sourceSnapshot = buildSourceSnapshot(sourceDocument, rawText, retrievedAt);
  const data = parsed
    .filter((event) => !event.CancelledDate)
    .sort(compareParliamentEvents)
    .slice(0, take);
  const sourceExcerpts = data.map((event, index) =>
    buildSourceExcerpt({
      excerptText: JSON.stringify(event),
      path: `events[${index}]`,
      sourceSnapshot
    })
  );
  const displayFacts = data.map((event, index) =>
    buildDisplayFact({
      summaryText: `${event.House ?? "Parliament"} ${event.Category ?? "event"}: ${event.Description ?? event.Type ?? "Scheduled business"}.`,
      sourceExcerptIds: [sourceExcerpts[index]?.id ?? ""]
    })
  );

  return {
    data,
    displayFacts,
    sourceDocument,
    sourceExcerpts,
    sourceSnapshot
  } satisfies ProvenancedRecord<ParliamentEvent[]>;
}

function toDateParam(date: Date) {
  return date.toISOString().slice(0, 10);
}

function addDays(date: Date, days: number) {
  const nextDate = new Date(date);
  nextDate.setUTCDate(nextDate.getUTCDate() + days);

  return nextDate;
}

function compareParliamentEvents(a: ParliamentEvent, b: ParliamentEvent) {
  const dateComparison = a.StartDate.localeCompare(b.StartDate);

  if (dateComparison !== 0) {
    return dateComparison;
  }

  return (a.StartTime ?? "").localeCompare(b.StartTime ?? "");
}

async function fetchJson(url: string) {
  const response = await fetch(url, {
    next: {
      revalidate: 60 * 60
    }
  });

  if (!response.ok) {
    throw new Error(`UK Parliament request failed (${response.status}) for ${url}`);
  }

  return response.json();
}

function buildSourceDocument({
  publisher,
  retrievedAt,
  title,
  url
}: {
  publisher: string;
  retrievedAt: string;
  title: string;
  url: string;
}): ProvenanceSourceDocument {
  return {
    id: stableId("source_document", url),
    publisher,
    retrievedAt,
    sourceTier: "tier_1",
    sourceType: "api",
    title,
    url
  };
}

function buildSourceSnapshot(
  sourceDocument: ProvenanceSourceDocument,
  rawText: string,
  capturedAt: string
): ProvenanceSourceSnapshot {
  const contentHash = hashText(rawText);

  return {
    capturedAt,
    contentHash,
    id: stableId("source_snapshot", `${sourceDocument.id}:${contentHash}`),
    sourceDocumentId: sourceDocument.id
  };
}

function buildSourceExcerpt({
  excerptText,
  path,
  sourceSnapshot
}: {
  excerptText: string;
  path: string;
  sourceSnapshot: ProvenanceSourceSnapshot;
}): ProvenanceSourceExcerpt {
  return {
    excerptText,
    id: stableId("source_excerpt", `${sourceSnapshot.id}:${path}:${excerptText}`),
    path,
    sourceSnapshotId: sourceSnapshot.id
  };
}

function buildDisplayFact({
  sourceExcerptIds,
  summaryText
}: {
  sourceExcerptIds: string[];
  summaryText: string;
}): ProvenanceDisplayFact {
  return {
    coverageState: "strong",
    id: stableId("display_fact", `${summaryText}:${sourceExcerptIds.join(",")}`),
    sourceExcerptIds,
    summaryText
  };
}
