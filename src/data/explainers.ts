export type ExplainerSource = {
  name: string;
  url: string;
};

export type ExplainerSection = {
  heading: string;
  body: string;
};

export type Explainer = {
  slug: string;
  title: string;
  description: string;
  readTime: string;
  lastReviewed: string;
  sourceLinks: ExplainerSource[];
  relatedGlossaryTerms: string[];
  sections: ExplainerSection[];
};

const parliamentGlossary = {
  name: "UK Parliament glossary",
  url: "https://www.parliament.uk/site-information/glossary/"
} as const;

const howParliamentWorks = {
  name: "How Parliament works",
  url: "https://www.parliament.uk/about/how/"
} as const;

const commonsVotesApi = {
  name: "UK Parliament Commons Votes API",
  url: "https://commonsvotes-api.parliament.uk/"
} as const;

export const explainers: Explainer[] = [
  {
    description: "PMQs is the regular Commons session where MPs question the Prime Minister.",
    lastReviewed: "2026-07-03",
    readTime: "2 min",
    relatedGlossaryTerms: ["PMQs", "Prime Minister", "Speaker", "House of Commons"],
    sections: [
      {
        body: "Prime Minister's Questions is a regular House of Commons session where MPs put questions to the Prime Minister.",
        heading: "What it means"
      },
      {
        body: "It is one of the most visible moments in Parliament, but it is only one part of scrutiny. MPs also use debates, committees, written questions and votes.",
        heading: "Why it matters"
      },
      {
        body: "If a news story says something happened at PMQs, treat it as a parliamentary exchange. For the public record, follow the official Parliament or Hansard source rather than guessing what it proves.",
        heading: "Example"
      }
    ],
    slug: "what-is-pmqs",
    sourceLinks: [parliamentGlossary, howParliamentWorks],
    title: "What is PMQs?"
  },
  {
    description:
      "An MP represents a House of Commons constituency and appears in Parliament's public records.",
    lastReviewed: "2026-07-03",
    readTime: "3 min",
    relatedGlossaryTerms: ["MP", "Constituency", "House of Commons", "Written question"],
    sections: [
      {
        body: "A Member of Parliament is elected to represent one House of Commons constituency.",
        heading: "What it means"
      },
      {
        body: "For a local user, the MP is often the first useful Westminster record to identify: constituency, party, votes, questions and contact routes all start there.",
        heading: "Why it matters"
      },
      {
        body: "A postcode lookup should first identify the constituency, then the current MP, then link to official records instead of making unsupported claims about local impact.",
        heading: "Example"
      }
    ],
    slug: "what-does-an-mp-do",
    sourceLinks: [parliamentGlossary, howParliamentWorks],
    title: "What does an MP do?"
  },
  {
    description: "Commons votes are often recorded as divisions, counted as ayes and noes.",
    lastReviewed: "2026-07-03",
    readTime: "3 min",
    relatedGlossaryTerms: ["Division", "Abstain", "Whips", "House of Commons"],
    sections: [
      {
        body: "A division is a formal recorded vote in Parliament. The result is usually shown as ayes and noes.",
        heading: "What it means"
      },
      {
        body: "Divisions are useful because they are source-backed records. They show how a vote was counted, while the reason someone voted or did not vote needs separate evidence.",
        heading: "Why it matters"
      },
      {
        body: "If a division lists 310 ayes and 280 noes, the count and official record show how the vote split. A reason for someone's vote needs separate evidence.",
        heading: "Example"
      }
    ],
    slug: "how-commons-votes-work",
    sourceLinks: [parliamentGlossary, commonsVotesApi],
    title: "How do Commons votes work?"
  },
  {
    description:
      "Whips are party organisers who help coordinate voting and attendance in Parliament.",
    lastReviewed: "2026-07-03",
    readTime: "2 min",
    relatedGlossaryTerms: ["Whips", "Division", "Government", "Opposition"],
    sections: [
      {
        body: "Whips are party organisers who help coordinate how party members vote and attend Parliament.",
        heading: "What it means"
      },
      {
        body: "Whipping helps explain why MPs from the same party often vote the same way, but the public vote record is still the evidence to check first.",
        heading: "Why it matters"
      },
      {
        body: "When a vote is described as whipped, that points to party organisation. The actual vote still needs the official division record.",
        heading: "Example"
      }
    ],
    slug: "what-does-a-whip-do",
    sourceLinks: [parliamentGlossary],
    title: "What does a whip do?"
  },
  {
    description: "A constituency is the local area that elects one MP to the House of Commons.",
    lastReviewed: "2026-07-03",
    readTime: "2 min",
    relatedGlossaryTerms: ["Constituency", "MP", "First Past the Post", "By-election"],
    sections: [
      {
        body: "A constituency is a geographic area that elects one MP to the House of Commons.",
        heading: "What it means"
      },
      {
        body: "Constituencies make postcode lookup possible. They connect a local place to a current MP and then to public parliamentary records.",
        heading: "Why it matters"
      },
      {
        body: "Two nearby postcodes can sit in different constituencies, so a checked postcode lookup is safer than guessing from a town name.",
        heading: "Example"
      }
    ],
    slug: "what-is-a-constituency",
    sourceLinks: [parliamentGlossary],
    title: "What is a constituency?"
  },
  {
    description:
      "A bill is a proposal for a new law or a change to an existing law before it becomes an Act.",
    lastReviewed: "2026-07-03",
    readTime: "3 min",
    relatedGlossaryTerms: ["Bill", "House of Commons", "House of Lords", "Royal Assent"],
    sections: [
      {
        body: "A bill is a proposal for a new law, or for changing an existing law, before it becomes an Act.",
        heading: "What it means"
      },
      {
        body: "Bills matter because they are where political promises can turn into legal text. They can be debated, amended and voted on before becoming law.",
        heading: "Why it matters"
      },
      {
        body: "If a policy is described as part of a bill, the official bill page or parliamentary record lets readers check the stage and wording.",
        heading: "Example"
      }
    ],
    slug: "what-is-a-bill",
    sourceLinks: [parliamentGlossary, howParliamentWorks],
    title: "What is a bill?"
  }
];

export function findExplainerBySlug(slug: string) {
  return explainers.find((explainer) => explainer.slug === slug);
}
