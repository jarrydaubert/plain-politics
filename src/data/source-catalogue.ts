export type SourceHook = {
  name: string;
  publisher: string;
  status: "hooked" | "candidate" | "review";
  access: string;
  sourceUrl: string;
  priority: string;
  powers: string[];
  datapoints: string[];
  caveat: string;
};

export type DatapointGroup = {
  title: string;
  description: string;
  datapoints: string[];
};

export const sourceHooks: SourceHook[] = [
  {
    access: "Open official API endpoint. Already called server-side.",
    caveat:
      "Good first source family because it is official, structured and stable enough for typed contracts.",
    datapoints: [
      "Party name, abbreviation and official API colour",
      "Current Commons seat count by party",
      "Gender counts by party where returned",
      "Source retrieval URL, snapshot hash and excerpt path"
    ],
    name: "State of the parties",
    powers: ["Home dashboard", "Parliament page", "Party profile factual panels"],
    priority: "Live now",
    publisher: "UK Parliament Members API",
    sourceUrl: "https://members-api.parliament.uk/",
    status: "hooked"
  },
  {
    access: "Open official API endpoint. Already called server-side.",
    caveat:
      "Useful for the first MP and constituency views, but full coverage needs paging and ingestion jobs.",
    datapoints: [
      "Member ID and display name",
      "Current party",
      "Current constituency",
      "Membership start date",
      "Member profile and thumbnail links where returned"
    ],
    name: "Current Commons members",
    powers: ["MP directory", "Constituency pages", "Party membership history"],
    priority: "Live now",
    publisher: "UK Parliament Members API",
    sourceUrl: "https://members-api.parliament.uk/",
    status: "hooked"
  },
  {
    access: "Open official API endpoint. Already called server-side.",
    caveat: "Vote meaning still needs plain-English context from bill, motion or Hansard sources.",
    datapoints: [
      "Division ID and division number",
      "Division title and date",
      "Aye and No totals",
      "Publication updated timestamp",
      "Member vote lists for deeper detail pages"
    ],
    name: "Recent Commons divisions",
    powers: ["Recent votes widget", "Party vote record pages", "Policy timeline"],
    priority: "Live now",
    publisher: "UK Parliament Commons Votes API",
    sourceUrl: "https://commonsvotes-api.parliament.uk/",
    status: "hooked"
  },
  {
    access: "Open official JSON endpoint. Already called server-side.",
    caveat:
      "Good for scheduled parliamentary business, but election dates and government announcements need separate sources.",
    datapoints: [
      "Event ID",
      "Start and end dates",
      "Start and end times where returned",
      "House, chamber or committee type",
      "Category",
      "Description",
      "Member names where returned",
      "Bill ID, bill name and bill page link where returned",
      "Cancellation date where returned"
    ],
    name: "Upcoming parliamentary business",
    powers: ["Upcoming dates widget", "Parliament calendar", "Bill and policy timelines"],
    priority: "Live now",
    publisher: "UK Parliament What's On API",
    sourceUrl: "https://whatson-api.parliament.uk/calendar/events/list.json",
    status: "hooked"
  },
  {
    access:
      "Open public API plus official Parliament location search. Called client-side from /my-area so the raw postcode is not sent to the app server.",
    caveat:
      "Postcodes are sensitive location data in practice. The v1 lookup is transient and does not yet create server-side snapshots or excerpts.",
    datapoints: [
      "Normalized postcode",
      "Westminster parliamentary constituency",
      "Constituency code",
      "Local authority and ward where available",
      "Current MP, party and Commons membership start date",
      "Source URLs checked"
    ],
    name: "Postcode to constituency and MP",
    powers: ["Beginner start here", "My area page", "Constituency pages"],
    priority: "Live now",
    publisher: "postcodes.io and UK Parliament Members API",
    sourceUrl: "https://api.postcodes.io/",
    status: "hooked"
  },
  {
    access: "Open official API endpoints. Called client-side from /my-area after an MP is found.",
    caveat:
      "This shows public parliamentary activity, not automatic proof of local impact. It does not yet create server-side snapshots or excerpts.",
    datapoints: [
      "Recent member votes",
      "Division title, date and vote totals",
      "Written questions where exposed by member endpoints",
      "Member activity caveat",
      "Source URLs checked"
    ],
    name: "MP public record starter",
    powers: ["My area page", "MP detail pages", "Beginner civic journey"],
    priority: "Live now",
    publisher: "UK Parliament Members API and Commons Votes API",
    sourceUrl: "https://members-api.parliament.uk/",
    status: "hooked"
  },
  {
    access: "Official public webpages. Initial glossary page is statically curated from them.",
    caveat:
      "Definitions should be simplified carefully and reviewed when official source wording changes.",
    datapoints: [
      "Term and category",
      "Plain-English definition",
      "Why the term matters",
      "Official source URL",
      "Related product pages for inline help"
    ],
    name: "Political glossary and traditions",
    powers: ["Glossary page", "Inline help", "Beginner civic journey"],
    priority: "Live now",
    publisher: "UK Parliament and Electoral Commission",
    sourceUrl: "https://www.parliament.uk/site-information/glossary/",
    status: "hooked"
  },
  {
    access: "Official Parliament source. Treat as candidate API or structured page ingestion.",
    caveat: "Needs endpoint mapping and source-span extraction before summaries are trusted.",
    datapoints: [
      "Bill title and bill ID",
      "Current stage",
      "Stage dates",
      "Sponsor or responsible member where available",
      "Bill documents and explanatory notes"
    ],
    name: "Bills and legislation",
    powers: ["Policy timelines", "Manifesto promise follow-through", "Legislation explainer pages"],
    priority: "Candidate next",
    publisher: "UK Parliament Bills",
    sourceUrl: "https://bills.parliament.uk/",
    status: "candidate"
  },
  {
    access: "Official Parliament source. Likely structured page ingestion first.",
    caveat:
      "Debate text is rich but noisy; it needs careful excerpt selection and neutral framing.",
    datapoints: [
      "Debate title",
      "Sitting date",
      "Speaker/member",
      "Contribution text",
      "Column reference",
      "Topic tags where available"
    ],
    name: "Hansard debates",
    powers: ["Policy evidence panels", "Member activity pages", "Issue explainers"],
    priority: "Candidate next",
    publisher: "UK Parliament Hansard",
    sourceUrl: "https://hansard.parliament.uk/",
    status: "candidate"
  },
  {
    access:
      "Official public search and export surface. Needs terms and automation review before ingestion.",
    caveat:
      "High-value but more ingestion-fragile than Parliament APIs because the public surface is search/export oriented.",
    datapoints: [
      "Donation, loan, spending or account reference",
      "Recipient regulated entity",
      "Donor or supplier name",
      "Value",
      "Accepted, received and reported dates",
      "Donation type and donor status",
      "Reporting period"
    ],
    name: "Political finance registers",
    powers: ["Donation tables", "Party money charts", "Donor history pages"],
    priority: "Candidate next",
    publisher: "Electoral Commission",
    sourceUrl: "https://search.electoralcommission.org.uk/",
    status: "review"
  },
  {
    access:
      "Party websites, PDFs and archived snapshots. Requires compliant crawling or manual curation.",
    caveat:
      "This is essential for plain-English party positions, but every summary must map to exact source excerpts.",
    datapoints: [
      "Manifesto title and publication date",
      "Party",
      "Policy area",
      "Quoted excerpt",
      "Page or section label",
      "Change diff against prior snapshot"
    ],
    name: "Party manifestos and policy pages",
    powers: ["Party profiles", "Policy compare", "Plain-English manifesto summaries"],
    priority: "Candidate next",
    publisher: "Political parties",
    sourceUrl: "https://www.electoralcommission.org.uk/i-am-a/voter/choosing-who-vote",
    status: "review"
  },
  {
    access:
      "Official GOV.UK Atom feed. Easy to poll, but it is activity/news rather than future diary.",
    caveat:
      "Useful for Prime Minister statements, speeches and releases after publication; not a reliable source for unpublished future No. 10 diary dates.",
    datapoints: [
      "Entry title",
      "Publication/update timestamp",
      "Document URL",
      "Summary",
      "Content type by URL path where inferable"
    ],
    name: "No. 10 GOV.UK activity",
    powers: ["Government activity feed", "Recent statements", "Policy timeline context"],
    priority: "Candidate next",
    publisher: "GOV.UK / Prime Minister's Office, 10 Downing Street",
    sourceUrl:
      "https://www.gov.uk/government/organisations/prime-ministers-office-10-downing-street.atom",
    status: "candidate"
  },
  {
    access:
      "Pollster pages, full tables and secondary trackers. No central free API confirmed yet.",
    caveat: "Keep out of the critical path until source access, licensing and metadata are clean.",
    datapoints: [
      "Pollster and commissioner",
      "Fieldwork dates",
      "Publication date",
      "Sample size and population",
      "Mode and geography",
      "Question wording",
      "Party vote share",
      "Movement and uncertainty caveat"
    ],
    name: "Polling and popularity",
    powers: ["Polling charts", "Momentum labels", "Popularity tables"],
    priority: "Stretch",
    publisher: "Pollsters and polling disclosure sources",
    sourceUrl: "https://www.britishpollingcouncil.org/rules-of-disclosure/",
    status: "review"
  }
];

export const datapointGroups: DatapointGroup[] = [
  {
    datapoints: [
      "Name, abbreviation, colour and official website",
      "Current Commons seats",
      "Current MPs and constituencies",
      "Manifesto and policy source links",
      "Coverage state and last checked date"
    ],
    description: "The backbone for plain-English party profile pages.",
    title: "Parties"
  },
  {
    datapoints: [
      "Policy area and subtopic",
      "Party position summary",
      "Original excerpt",
      "Source tier",
      "Change status",
      "No verified source state"
    ],
    description: "The core compare experience: what each party says, shown in the same structure.",
    title: "Policies and manifestos"
  },
  {
    datapoints: [
      "Postcode-to-constituency result",
      "Current MP, party and membership start date",
      "Recent votes and written questions",
      "Upcoming relevant Parliament business",
      "Local relevance label and coverage gaps"
    ],
    description:
      "The beginner on-ramp: start from a postcode and explain who represents the user in plain English.",
    title: "My area"
  },
  {
    datapoints: [
      "Term and category",
      "Plain-English definition",
      "Why it matters",
      "Official source URL",
      "Related pages for inline explanation"
    ],
    description:
      "The shared vocabulary layer that helps beginners understand political jargon and traditions.",
    title: "Glossary"
  },
  {
    datapoints: [
      "Pollster, client and fieldwork dates",
      "Sample size, population and method",
      "Question wording and full tables",
      "Vote share by party",
      "Rolling average",
      "Movement threshold and caveat"
    ],
    description: "Popularity tracking without turning uncertainty into false certainty.",
    title: "Polling and popularity"
  },
  {
    datapoints: [
      "Division, vote and member IDs",
      "Vote title and date",
      "Aye and No counts",
      "Member-level votes",
      "Bill stage",
      "Debate excerpts"
    ],
    description: "What Parliament is doing and how parties or members vote.",
    title: "Parliament"
  },
  {
    datapoints: [
      "Donation, loan or spending reference",
      "Donor, recipient and donor type",
      "Amount",
      "Accepted, received and reported dates",
      "Reporting period",
      "Source record URL"
    ],
    description: "Political finance and public-money context from official registers.",
    title: "Money"
  },
  {
    datapoints: [
      "Event title or description",
      "Event date",
      "Start and end times",
      "House, chamber, committee or institution",
      "Category",
      "Bill link where relevant",
      "Cancellation or change status",
      "Last checked timestamp"
    ],
    description:
      "Forward-looking dates for sitting days, parliamentary business and civic deadlines.",
    title: "Upcoming dates"
  },
  {
    datapoints: [
      "Constituency ID and name",
      "Boundary geometry",
      "Current MP",
      "Candidates",
      "Vote share, majority and turnout",
      "Election result source"
    ],
    description: "Maps, local pages and election result context.",
    title: "Elections and constituencies"
  },
  {
    datapoints: [
      "Publisher, URL and source tier",
      "Retrieved and published timestamps",
      "Snapshot hash",
      "Parser version",
      "Freshness state",
      "Review and correction history"
    ],
    description: "The audit trail that keeps the public pages honest.",
    title: "Source quality"
  }
];
