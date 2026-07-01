export type PollingTrendPoint = {
  date: string;
  labour: number;
  conservative: number;
  reform: number;
  libDem: number;
};

export const coverageSummary = [
  { label: "Phase 0 parties", value: "5" },
  { label: "Source families", value: "3" },
  { label: "Policy area", value: "1" },
  { label: "Live API hooks", value: "4" }
];

export const featuredParties = [
  {
    slug: "labour",
    name: "Labour",
    coverage: "planned",
    summary:
      "Profile summary placeholder. Replace with reviewed source-backed text from manifesto and official policy records."
  },
  {
    slug: "conservatives",
    name: "Conservatives",
    coverage: "planned",
    summary:
      "Profile summary placeholder. Replace with reviewed source-backed text from manifesto and official policy records."
  },
  {
    slug: "liberal-democrats",
    name: "Liberal Democrats",
    coverage: "planned",
    summary:
      "Profile summary placeholder. Replace with reviewed source-backed text from manifesto and official policy records."
  },
  {
    slug: "reform",
    name: "Reform UK",
    coverage: "planned",
    summary:
      "Profile summary placeholder. Replace with reviewed source-backed text from manifesto and official policy records."
  }
];

export const policyAreas = [
  { name: "Housing", status: "recommended first slice" },
  { name: "NHS and health", status: "candidate" },
  { name: "Immigration", status: "candidate" },
  { name: "Tax and cost of living", status: "candidate" },
  { name: "Climate and energy", status: "candidate" }
];

export const sourceReferences = [
  {
    title: "UK Parliament Members API",
    publisher: "UK Parliament",
    tier: "Tier 1",
    url: "https://members-api.parliament.uk/"
  },
  {
    title: "UK Parliament Commons Votes API",
    publisher: "UK Parliament",
    tier: "Tier 1",
    url: "https://commonsvotes-api.parliament.uk/"
  },
  {
    title: "UK Parliament What's On API",
    publisher: "UK Parliament",
    tier: "Tier 1",
    url: "https://whatson-api.parliament.uk/calendar/events/list.json"
  },
  {
    title: "UK Parliament Developer Hub",
    publisher: "UK Parliament",
    tier: "Tier 1",
    url: "https://developer.parliament.uk/"
  },
  {
    title: "Hansard",
    publisher: "UK Parliament",
    tier: "Tier 1",
    url: "https://hansard.parliament.uk/"
  },
  {
    title: "Electoral Commission registers",
    publisher: "Electoral Commission",
    tier: "Tier 1",
    url: "https://search.electoralcommission.org.uk/"
  }
];

export const pollingSeries: PollingTrendPoint[] = [
  { date: "Week 1", labour: 39, conservative: 22, reform: 18, libDem: 11 },
  { date: "Week 2", labour: 38, conservative: 22, reform: 19, libDem: 11 },
  { date: "Week 3", labour: 37, conservative: 21, reform: 20, libDem: 12 },
  { date: "Week 4", labour: 38, conservative: 20, reform: 20, libDem: 12 },
  { date: "Week 5", labour: 37, conservative: 20, reform: 21, libDem: 12 }
];
