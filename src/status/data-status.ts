import { z } from "zod";
import { glossaryTerms } from "@/data/glossary";
import { maxIsoDate } from "@/lib/format";
import {
  COMMONS_VOTES_API_BASE,
  MEMBERS_API_BASE,
  POSTCODES_API_BASE,
  WHATSON_API_BASE
} from "@/sources/upstream-endpoints";

export type DataHealthState = "healthy" | "degraded" | "offline";
export type DataCheckOutcome = "pass" | "warn" | "fail";
type DataCheckKind = "api_reachable" | "response_parsed" | "freshness" | "record_shape" | "sanity";

type DataStatusCheck = {
  blocksCriticalJourney?: boolean;
  detail: string;
  kind: DataCheckKind;
  label: string;
  outcome: DataCheckOutcome;
};

export type DataSourceFamilyStatus = {
  checks: DataStatusCheck[];
  critical: boolean;
  id: DataSourceFamilyId;
  lastAttemptedCheckAt: string;
  lastSuccessfulCheckAt: string | null;
  name: string;
  state: DataHealthState;
  summary: string;
};

export type DataStatusReport = {
  checkedAt: string;
  lastAttemptedCheckAt: string;
  lastSuccessfulCheckAt: string | null;
  overall: DataHealthState;
  sources: DataSourceFamilyStatus[];
};

type DataSourceFamilyId =
  | "uk-parliament-members"
  | "uk-parliament-commons-votes"
  | "uk-parliament-whatson"
  | "postcodes-ons"
  | "static-glossary";

type StatusFetch = (url: string, init?: RequestInit) => Promise<Response>;

type DataStatusOptions = {
  fetcher?: StatusFetch;
  now?: Date;
};

type NextFetchInit = RequestInit & {
  next?: {
    revalidate: number;
  };
};

const COMMONS_HOUSE_ID = 1;
// Regression canaries from the July 2026 Members API audit: these former MPs appeared in a
// supposedly current Commons sample when the query was not filtered tightly enough.
const KNOWN_FORMER_MEMBER_IDS = new Set([662, 645, 4057]);
const MIN_EXPECTED_COMMONS_MEMBERS = 600;
const MAX_EXPECTED_COMMONS_MEMBERS = 700;

const currentMembersStatusSchema = z
  .object({
    items: z.array(
      z
        .object({
          value: z
            .object({
              id: z.number(),
              latestHouseMembership: z
                .object({
                  house: z.number(),
                  membershipEndDate: z.string().nullable(),
                  membershipFrom: z.string(),
                  membershipStartDate: z.string(),
                  membershipStatus: z
                    .object({
                      statusIsActive: z.boolean()
                    })
                    .passthrough()
                    .nullable()
                    .optional()
                })
                .passthrough(),
              latestParty: z
                .object({
                  name: z.string()
                })
                .passthrough(),
              nameDisplayAs: z.string()
            })
            .passthrough()
        })
        .passthrough()
    ),
    totalResults: z.number()
  })
  .passthrough();

const commonsDivisionsStatusSchema = z.array(
  z
    .object({
      AyeCount: z.number(),
      Date: z.string(),
      DivisionId: z.number(),
      NoCount: z.number(),
      Number: z.number(),
      Title: z.string()
    })
    .passthrough()
);

const whatsonStatusSchema = z.array(
  z
    .object({
      CancelledDate: z.string().nullable().optional(),
      Category: z.string().nullable().optional(),
      Description: z.string().nullable().optional(),
      House: z.string().nullable().optional(),
      Id: z.number(),
      StartDate: z.string()
    })
    .passthrough()
);

const postcodeStatusSchema = z
  .object({
    result: z
      .object({
        codes: z
          .object({
            parliamentary_constituency: z.string().nullable().optional(),
            parliamentary_constituency_2024: z.string().nullable().optional()
          })
          .passthrough()
          .optional(),
        parliamentary_constituency: z.string().nullable(),
        parliamentary_constituency_2024: z.string().nullable().optional(),
        postcode: z.string()
      })
      .passthrough()
      .nullable()
      .optional(),
    status: z.number()
  })
  .passthrough();

const statusMemory = new Map<DataSourceFamilyId, string>();

export async function getDataStatusReport(
  options: DataStatusOptions = {}
): Promise<DataStatusReport> {
  const now = options.now ?? new Date();
  const fetcher = options.fetcher ?? defaultStatusFetch;

  const sources = await Promise.all([
    checkMembersApi({ fetcher, now }),
    checkCommonsVotesApi({ fetcher, now }),
    checkWhatsonApi({ fetcher, now }),
    checkPostcodesApi({ fetcher, now }),
    checkStaticGlossary({ now })
  ]);
  const lastAttemptedCheckAt = maxIsoDate(sources.map((source) => source.lastAttemptedCheckAt));
  const lastSuccessfulCheckAt = maxIsoDate(
    sources
      .map((source) => source.lastSuccessfulCheckAt)
      .filter((value): value is string => Boolean(value))
  );

  return {
    checkedAt: now.toISOString(),
    lastAttemptedCheckAt: lastAttemptedCheckAt ?? now.toISOString(),
    lastSuccessfulCheckAt,
    overall: calculateOverallStatus(sources),
    sources
  };
}

function calculateOverallStatus(sources: DataSourceFamilyStatus[]): DataHealthState {
  if (sources.some((source) => source.critical && source.state === "offline")) {
    return "offline";
  }

  if (sources.some((source) => source.state !== "healthy")) {
    return "degraded";
  }

  return "healthy";
}

export function resetDataStatusMemory() {
  statusMemory.clear();
}

export function formatDataStatusLabel(status: DataHealthState) {
  return status[0].toUpperCase() + status.slice(1);
}

async function checkMembersApi({ fetcher, now }: { fetcher: StatusFetch; now: Date }) {
  const attemptedAt = now.toISOString();
  const url = `${MEMBERS_API_BASE}/Members/Search?House=${COMMONS_HOUSE_ID}&IsCurrentMember=true&skip=0&take=8`;
  const checks: DataStatusCheck[] = [];
  const raw = await fetchRawJson(url, fetcher, checks);

  if (!raw.ok) {
    addSkippedQualityChecks(checks, true);

    return buildSourceStatus({
      attemptedAt,
      checks,
      critical: true,
      id: "uk-parliament-members",
      name: "UK Parliament Members API"
    });
  }

  const parsed = currentMembersStatusSchema.safeParse(raw.data);

  if (!parsed.success) {
    checks.push(
      failCheck(
        "record_shape",
        "Expected record shape",
        "The current-member response did not match the expected member fields.",
        true
      )
    );
    addSkippedQualityChecks(checks, true);

    return buildSourceStatus({
      attemptedAt,
      checks,
      critical: true,
      id: "uk-parliament-members",
      name: "UK Parliament Members API"
    });
  }

  checks.push(
    passCheck("record_shape", "Expected record shape", "Current-member fields are present.")
  );
  checks.push(
    passCheck(
      "freshness",
      "Freshness threshold",
      "Checked against the live current-member endpoint."
    )
  );

  const members = parsed.data.items.map((item) => item.value);
  const suspiciousMembers = members.filter((member) => {
    const membership = member.latestHouseMembership;

    return (
      KNOWN_FORMER_MEMBER_IDS.has(member.id) ||
      membership.house !== COMMONS_HOUSE_ID ||
      membership.membershipEndDate !== null ||
      membership.membershipStatus?.statusIsActive !== true
    );
  });

  if (
    parsed.data.totalResults < MIN_EXPECTED_COMMONS_MEMBERS ||
    parsed.data.totalResults > MAX_EXPECTED_COMMONS_MEMBERS ||
    members.length === 0
  ) {
    checks.push(
      failCheck(
        "sanity",
        "Obvious data sanity",
        `Current Commons member count looked wrong: ${String(parsed.data.totalResults)} returned.`,
        true
      )
    );
  } else if (suspiciousMembers.length > 0) {
    checks.push(
      warnCheck(
        "sanity",
        "Obvious data sanity",
        `The sample included records that do not look like current Commons MPs: ${suspiciousMembers
          .map((member) => member.nameDisplayAs)
          .join(", ")}.`
      )
    );
  } else {
    checks.push(
      passCheck("sanity", "Obvious data sanity", "Sample rows look like current Commons MPs.")
    );
  }

  return buildSourceStatus({
    attemptedAt,
    checks,
    critical: true,
    id: "uk-parliament-members",
    name: "UK Parliament Members API"
  });
}

async function checkCommonsVotesApi({ fetcher, now }: { fetcher: StatusFetch; now: Date }) {
  const attemptedAt = now.toISOString();
  const url = `${COMMONS_VOTES_API_BASE}/divisions.json/search?queryParameters.skip=0&queryParameters.take=5`;
  const checks: DataStatusCheck[] = [];
  const raw = await fetchRawJson(url, fetcher, checks);

  if (!raw.ok) {
    addSkippedQualityChecks(checks);

    return buildSourceStatus({
      attemptedAt,
      checks,
      critical: false,
      id: "uk-parliament-commons-votes",
      name: "UK Parliament Commons Votes API"
    });
  }

  const parsed = commonsDivisionsStatusSchema.safeParse(raw.data);

  if (!parsed.success) {
    checks.push(
      failCheck(
        "record_shape",
        "Expected record shape",
        "The divisions response did not match the expected vote fields."
      )
    );
    addSkippedQualityChecks(checks);

    return buildSourceStatus({
      attemptedAt,
      checks,
      critical: false,
      id: "uk-parliament-commons-votes",
      name: "UK Parliament Commons Votes API"
    });
  }

  checks.push(passCheck("record_shape", "Expected record shape", "Division fields are present."));

  const latestDivisionDate = parsed.data
    .map((division) => new Date(division.Date))
    .filter((date) => !Number.isNaN(date.getTime()))
    .sort((a, b) => b.getTime() - a.getTime())[0];

  if (!latestDivisionDate) {
    checks.push(
      warnCheck(
        "freshness",
        "Freshness threshold",
        "No usable division date was returned in the latest sample."
      )
    );
  } else {
    const ageDays = differenceInDays(now, latestDivisionDate);

    if (ageDays > 90) {
      checks.push(
        warnCheck(
          "freshness",
          "Freshness threshold",
          `Latest division is ${String(ageDays)} days old, above the 90-day threshold.`
        )
      );
    } else {
      checks.push(
        passCheck(
          "freshness",
          "Freshness threshold",
          `Latest division is ${String(ageDays)} days old.`
        )
      );
    }
  }

  const impossibleCounts = parsed.data.filter(
    (division) =>
      division.AyeCount < 0 || division.NoCount < 0 || division.AyeCount + division.NoCount === 0
  );

  if (parsed.data.length === 0) {
    checks.push(
      warnCheck("sanity", "Obvious data sanity", "The recent divisions endpoint returned no rows.")
    );
  } else if (impossibleCounts.length > 0) {
    checks.push(
      warnCheck(
        "sanity",
        "Obvious data sanity",
        "One or more divisions returned impossible vote totals."
      )
    );
  } else {
    checks.push(passCheck("sanity", "Obvious data sanity", "Vote totals are non-negative."));
  }

  return buildSourceStatus({
    attemptedAt,
    checks,
    critical: false,
    id: "uk-parliament-commons-votes",
    name: "UK Parliament Commons Votes API"
  });
}

async function checkWhatsonApi({ fetcher, now }: { fetcher: StatusFetch; now: Date }) {
  const attemptedAt = now.toISOString();
  const startDate = toDateParam(now);
  const endDate = toDateParam(addDays(now, 7));
  const url = `${WHATSON_API_BASE}/list.json?startDate=${startDate}&endDate=${endDate}`;
  const checks: DataStatusCheck[] = [];
  const raw = await fetchRawJson(url, fetcher, checks);

  if (!raw.ok) {
    addSkippedQualityChecks(checks);

    return buildSourceStatus({
      attemptedAt,
      checks,
      critical: false,
      id: "uk-parliament-whatson",
      name: "UK Parliament What's On API"
    });
  }

  const parsed = whatsonStatusSchema.safeParse(raw.data);

  if (!parsed.success) {
    checks.push(
      failCheck(
        "record_shape",
        "Expected record shape",
        "The calendar response did not match the expected event fields."
      )
    );
    addSkippedQualityChecks(checks);

    return buildSourceStatus({
      attemptedAt,
      checks,
      critical: false,
      id: "uk-parliament-whatson",
      name: "UK Parliament What's On API"
    });
  }

  checks.push(
    passCheck("record_shape", "Expected record shape", "Calendar event fields are present.")
  );
  checks.push(
    passCheck("freshness", "Freshness threshold", "Calendar probe covers the next seven days.")
  );

  const activeEvents = parsed.data.filter((event) => !event.CancelledDate);
  const datedEvents = activeEvents.filter(
    (event) => !Number.isNaN(new Date(event.StartDate).getTime())
  );

  if (activeEvents.length === 0) {
    checks.push(
      warnCheck(
        "sanity",
        "Obvious data sanity",
        "The calendar returned no active events in the next seven days."
      )
    );
  } else if (datedEvents.length !== activeEvents.length) {
    checks.push(
      warnCheck(
        "sanity",
        "Obvious data sanity",
        "One or more active calendar events had an invalid date."
      )
    );
  } else {
    checks.push(
      passCheck("sanity", "Obvious data sanity", "Active calendar rows have valid dates.")
    );
  }

  return buildSourceStatus({
    attemptedAt,
    checks,
    critical: false,
    id: "uk-parliament-whatson",
    name: "UK Parliament What's On API"
  });
}

async function checkPostcodesApi({ fetcher, now }: { fetcher: StatusFetch; now: Date }) {
  const attemptedAt = now.toISOString();
  const url = `${POSTCODES_API_BASE}/SW1A%201AA`;
  const checks: DataStatusCheck[] = [];
  const raw = await fetchRawJson(url, fetcher, checks);

  if (!raw.ok) {
    addSkippedQualityChecks(checks, true);

    return buildSourceStatus({
      attemptedAt,
      checks,
      critical: true,
      id: "postcodes-ons",
      name: "postcodes.io / ONS lookup"
    });
  }

  const parsed = postcodeStatusSchema.safeParse(raw.data);

  if (!parsed.success) {
    checks.push(
      failCheck(
        "record_shape",
        "Expected record shape",
        "The postcode response did not match the expected postcode and constituency fields.",
        true
      )
    );
    addSkippedQualityChecks(checks, true);

    return buildSourceStatus({
      attemptedAt,
      checks,
      critical: true,
      id: "postcodes-ons",
      name: "postcodes.io / ONS lookup"
    });
  }

  checks.push(passCheck("record_shape", "Expected record shape", "Postcode fields are present."));
  checks.push(
    passCheck("freshness", "Freshness threshold", "Lookup checked against a known public postcode.")
  );

  const result = parsed.data.result;
  const constituency =
    result?.parliamentary_constituency_2024 ?? result?.parliamentary_constituency ?? null;
  const constituencyCode =
    result?.codes?.parliamentary_constituency_2024 ??
    result?.codes?.parliamentary_constituency ??
    null;

  if (parsed.data.status !== 200 || !result || !constituency) {
    checks.push(
      failCheck(
        "sanity",
        "Obvious data sanity",
        "Known postcode SW1A 1AA did not return a Westminster constituency.",
        true
      )
    );
  } else if (constituencyCode && !/^[A-Z]\d{8}$/.test(constituencyCode)) {
    checks.push(
      warnCheck(
        "sanity",
        "Obvious data sanity",
        `Constituency code ${constituencyCode} does not look like an ONS Westminster code.`
      )
    );
  } else {
    checks.push(
      passCheck("sanity", "Obvious data sanity", `Known postcode resolved to ${constituency}.`)
    );
  }

  return buildSourceStatus({
    attemptedAt,
    checks,
    critical: true,
    id: "postcodes-ons",
    name: "postcodes.io / ONS lookup"
  });
}

async function checkStaticGlossary({ now }: { now: Date }) {
  const attemptedAt = now.toISOString();
  const checks: DataStatusCheck[] = [
    passCheck("api_reachable", "Source reachable", "Static glossary records are available locally.")
  ];

  const malformedTerms = glossaryTerms.filter(
    (term) => !term.term || !term.plainEnglish || !term.sourceName || !isHttpUrl(term.sourceUrl)
  );
  const uniqueTerms = new Set(glossaryTerms.map((term) => term.term.toLowerCase()));

  checks.push(
    passCheck("response_parsed", "Response parsed", "Static glossary records loaded in process.")
  );
  checks.push(
    passCheck(
      "freshness",
      "Freshness threshold",
      "Static definitions are checked through source review rather than a live API."
    )
  );

  if (glossaryTerms.length === 0 || malformedTerms.length > 0) {
    checks.push(
      failCheck(
        "record_shape",
        "Expected record shape",
        "One or more glossary records is missing a term, definition or source URL."
      )
    );
  } else {
    checks.push(
      passCheck("record_shape", "Expected record shape", "Glossary records include source URLs.")
    );
  }

  if (uniqueTerms.size !== glossaryTerms.length) {
    checks.push(warnCheck("sanity", "Obvious data sanity", "Duplicate glossary terms were found."));
  } else {
    checks.push(passCheck("sanity", "Obvious data sanity", "Glossary terms are unique."));
  }

  return buildSourceStatus({
    attemptedAt,
    checks,
    critical: false,
    id: "static-glossary",
    name: "Static glossary sources"
  });
}

async function fetchRawJson(url: string, fetcher: StatusFetch, checks: DataStatusCheck[]) {
  let response: Response;

  try {
    response = await fetcher(url);
  } catch {
    checks.push(
      failCheck("api_reachable", "API reachable", "The source could not be reached.", true)
    );

    return { ok: false as const };
  }

  if (!response.ok) {
    checks.push(
      failCheck(
        "api_reachable",
        "API reachable",
        `The source returned HTTP ${String(response.status)}.`,
        true
      )
    );

    return { ok: false as const };
  }

  checks.push(
    passCheck("api_reachable", "API reachable", "The source returned a successful response.")
  );

  try {
    const data: unknown = await response.json();
    checks.push(
      passCheck("response_parsed", "Response parsed", "The response body parsed as JSON.")
    );

    return { data, ok: true as const };
  } catch {
    checks.push(
      failCheck(
        "response_parsed",
        "Response parsed",
        "The response body was not parseable JSON.",
        true
      )
    );

    return { ok: false as const };
  }
}

function buildSourceStatus({
  attemptedAt,
  checks,
  critical,
  id,
  name
}: {
  attemptedAt: string;
  checks: DataStatusCheck[];
  critical: boolean;
  id: DataSourceFamilyId;
  name: string;
}): DataSourceFamilyStatus {
  const state = calculateSourceState(checks, critical);
  const allChecksPassed = checks.every((check) => check.outcome === "pass");

  if (allChecksPassed) {
    statusMemory.set(id, attemptedAt);
  }

  return {
    checks,
    critical,
    id,
    lastAttemptedCheckAt: attemptedAt,
    lastSuccessfulCheckAt: allChecksPassed ? attemptedAt : (statusMemory.get(id) ?? null),
    name,
    state,
    summary: sourceSummary(state)
  };
}

function addSkippedQualityChecks(checks: DataStatusCheck[], blocksCriticalJourney = false) {
  if (!checks.some((check) => check.kind === "response_parsed")) {
    checks.push(
      failCheck(
        "response_parsed",
        "Response parsed",
        "Not checked because the source response was unavailable.",
        blocksCriticalJourney
      )
    );
  }

  if (!checks.some((check) => check.kind === "record_shape")) {
    checks.push(
      failCheck(
        "record_shape",
        "Expected record shape",
        "Not checked because the response could not be parsed into records.",
        blocksCriticalJourney
      )
    );
  }

  if (!checks.some((check) => check.kind === "freshness")) {
    checks.push(
      warnCheck(
        "freshness",
        "Freshness threshold",
        "Not checked because no usable records were returned."
      )
    );
  }

  if (!checks.some((check) => check.kind === "sanity")) {
    checks.push(
      warnCheck(
        "sanity",
        "Obvious data sanity",
        "Not checked because no usable records were returned."
      )
    );
  }
}

function calculateSourceState(checks: DataStatusCheck[], critical: boolean): DataHealthState {
  const blocksCriticalJourney = checks.some(
    (check) => check.outcome === "fail" && check.blocksCriticalJourney
  );

  if (critical && blocksCriticalJourney) {
    return "offline";
  }

  if (checks.some((check) => check.outcome !== "pass")) {
    return "degraded";
  }

  return "healthy";
}

function sourceSummary(state: DataHealthState) {
  if (state === "healthy") {
    return "Checks passed.";
  }

  if (state === "offline") {
    return "A critical user journey cannot be checked right now.";
  }

  return "Usable, but one or more quality checks needs attention.";
}

function defaultStatusFetch(url: string) {
  return fetch(url, {
    next: {
      revalidate: 5 * 60
    }
  } as NextFetchInit);
}

function passCheck(kind: DataCheckKind, label: string, detail: string): DataStatusCheck {
  return {
    detail,
    kind,
    label,
    outcome: "pass"
  };
}

function warnCheck(kind: DataCheckKind, label: string, detail: string): DataStatusCheck {
  return {
    detail,
    kind,
    label,
    outcome: "warn"
  };
}

function failCheck(
  kind: DataCheckKind,
  label: string,
  detail: string,
  blocksCriticalJourney = false
): DataStatusCheck {
  return {
    blocksCriticalJourney,
    detail,
    kind,
    label,
    outcome: "fail"
  };
}

function toDateParam(date: Date) {
  return date.toISOString().slice(0, 10);
}

function addDays(date: Date, days: number) {
  const nextDate = new Date(date);
  nextDate.setUTCDate(nextDate.getUTCDate() + days);

  return nextDate;
}

function differenceInDays(laterDate: Date, earlierDate: Date) {
  const milliseconds = laterDate.getTime() - earlierDate.getTime();

  return Math.floor(milliseconds / (24 * 60 * 60 * 1000));
}

function isHttpUrl(value: string) {
  try {
    const url = new URL(value);

    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}
