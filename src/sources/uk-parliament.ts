import { z } from "zod";
import {
  hashText,
  type ProvenanceDisplayFact,
  type ProvenanceSourceDocument,
  type ProvenanceSourceExcerpt,
  type ProvenanceSourceSnapshot,
  stableId
} from "@/lib/provenance";
import {
  COMMONS_VOTES_API_BASE,
  MEMBERS_API_BASE,
  WHATSON_API_BASE
} from "@/sources/upstream-endpoints";

const COMMONS_HOUSE_ID = 1;
export const PARLIAMENT_SOURCE_REVALIDATE_SECONDS = 5 * 60;

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

const memberHouseMembershipStatusSchema = z
  .object({
    statusDescription: z.string().nullable().optional(),
    statusIsActive: z.boolean()
  })
  .passthrough();

const memberHouseMembershipSchema = z.object({
  membershipFrom: z.string(),
  membershipFromId: z.number(),
  house: z.number(),
  membershipStartDate: z.string(),
  membershipEndDate: z.string().nullable(),
  membershipStatus: memberHouseMembershipStatusSchema.nullable().optional()
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
  dataStatus: SourceRecordStatus;
  sourceDocument: ProvenanceSourceDocument;
  sourceSnapshot: ProvenanceSourceSnapshot;
  sourceExcerpts: ProvenanceSourceExcerpt[];
  displayFacts: ProvenanceDisplayFact[];
};

export type SourceRecordStatus = {
  lastAttemptedCheckAt: string;
  lastSuccessfulCheckAt: string;
  note?: string;
  state: "fresh" | "stale";
};

const lastGoodRecords = new Map<string, ProvenancedRecord<unknown>>();

export function resetParliamentSourceCache() {
  lastGoodRecords.clear();
}

export async function getCommonsPartySeatCounts(now = new Date()) {
  return withLastGoodRecord("commons-party-seat-counts", async () => {
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
    };
  });
}

export async function getCommonsMembersSample(take = 8) {
  return withLastGoodRecord(`commons-members-sample:${take}`, async () => {
    const url = `${MEMBERS_API_BASE}/Members/Search?House=${COMMONS_HOUSE_ID}&IsCurrentMember=true&skip=0&take=${take}`;
    const raw = await fetchJson(url);
    const parsed = memberSearchSchema.parse(raw);
    const retrievedAt = new Date().toISOString();
    const rawText = JSON.stringify(raw, null, 2);
    const currentMemberItems = parsed.items
      .map((item, sourceIndex) => ({ member: item.value, sourceIndex }))
      .filter(({ member }) => isCurrentCommonsMember(member))
      .slice(0, take);
    const data = currentMemberItems.map(({ member }) => member);
    const sourceDocument = buildSourceDocument({
      title: "Current House of Commons members sample",
      publisher: "UK Parliament Members API",
      retrievedAt,
      url
    });
    const sourceSnapshot = buildSourceSnapshot(sourceDocument, rawText, retrievedAt);
    const sourceExcerpts = currentMemberItems.map(({ member, sourceIndex }) =>
      buildSourceExcerpt({
        excerptText: JSON.stringify(member),
        path: `items[${sourceIndex}].value`,
        sourceSnapshot
      })
    );
    const displayFacts = data.map((member, index) =>
      buildDisplayFact({
        summaryText: `${member.nameDisplayAs} represents ${member.latestHouseMembership.membershipFrom}.`,
        sourceExcerptIds: [sourceExcerpts[index]?.id ?? ""]
      })
    );

    return {
      data,
      displayFacts,
      sourceDocument,
      sourceExcerpts,
      sourceSnapshot
    };
  });
}

export async function getRecentCommonsDivisions(take = 5) {
  return withLastGoodRecord(`commons-divisions:${take}`, async () => {
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
    };
  });
}

export async function getUpcomingParliamentEvents(daysAhead = 7, take = 8, now = new Date()) {
  return withLastGoodRecord(`parliament-events:${daysAhead}:${take}`, async () => {
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
    };
  });
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

function isCurrentCommonsMember(member: CommonsMember) {
  const membership = member.latestHouseMembership;

  return (
    membership.house === COMMONS_HOUSE_ID &&
    membership.membershipEndDate === null &&
    membership.membershipStatus?.statusIsActive === true
  );
}

async function withLastGoodRecord<T>(
  cacheKey: string,
  loadFreshRecord: () => Promise<Omit<ProvenancedRecord<T>, "dataStatus">>
): Promise<ProvenancedRecord<T>> {
  const attemptedAt = new Date().toISOString();

  try {
    const record = attachDataStatus(await loadFreshRecord(), {
      lastAttemptedCheckAt: attemptedAt,
      lastSuccessfulCheckAt: attemptedAt,
      state: "fresh"
    });
    lastGoodRecords.set(cacheKey, record as ProvenancedRecord<unknown>);

    return record;
  } catch (error) {
    const cached = lastGoodRecords.get(cacheKey) as ProvenancedRecord<T> | undefined;

    if (!cached) {
      throw error;
    }

    return attachDataStatus(cached, {
      lastAttemptedCheckAt: attemptedAt,
      lastSuccessfulCheckAt: cached.dataStatus.lastSuccessfulCheckAt,
      note: "The latest source check failed, so Plain Politics is showing an earlier successful copy held in memory.",
      state: "stale"
    });
  }
}

function attachDataStatus<T>(
  record: Omit<ProvenancedRecord<T>, "dataStatus">,
  dataStatus: SourceRecordStatus
): ProvenancedRecord<T> {
  return {
    ...record,
    dataStatus
  };
}

async function fetchJson(url: string) {
  const response = await fetch(url, {
    next: {
      revalidate: PARLIAMENT_SOURCE_REVALIDATE_SECONDS
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
