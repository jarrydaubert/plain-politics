const E2E_UPSTREAM_BASE_URL =
  process.env.NODE_ENV === "production"
    ? null
    : (process.env.E2E_UPSTREAM_BASE_URL?.replace(/\/$/, "") ?? null);

export const MEMBERS_API_BASE = E2E_UPSTREAM_BASE_URL
  ? `${E2E_UPSTREAM_BASE_URL}/members-api/api`
  : "https://members-api.parliament.uk/api";

export const COMMONS_VOTES_API_BASE = E2E_UPSTREAM_BASE_URL
  ? `${E2E_UPSTREAM_BASE_URL}/commons-votes/data`
  : "https://commonsvotes-api.parliament.uk/data";

export const WHATSON_API_BASE = E2E_UPSTREAM_BASE_URL
  ? `${E2E_UPSTREAM_BASE_URL}/whatson/calendar/events`
  : "https://whatson-api.parliament.uk/calendar/events";

export const POSTCODES_API_BASE = E2E_UPSTREAM_BASE_URL
  ? `${E2E_UPSTREAM_BASE_URL}/postcodes/postcodes`
  : "https://api.postcodes.io/postcodes";
