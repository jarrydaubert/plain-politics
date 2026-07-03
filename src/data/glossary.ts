export type GlossaryTerm = {
  term: string;
  category: "Elections" | "Parliament" | "Parties" | "Traditions";
  plainEnglish: string;
  whyItMatters: string;
  sourceName: string;
  sourceUrl: string;
};

export const glossaryTerms: GlossaryTerm[] = [
  {
    category: "Parliament",
    plainEnglish:
      "A Member of Parliament is the person elected to represent a House of Commons constituency.",
    sourceName: "UK Parliament glossary",
    sourceUrl: "https://www.parliament.uk/site-information/glossary/",
    term: "MP",
    whyItMatters: "This is usually the first person users want to identify from a postcode."
  },
  {
    category: "Elections",
    plainEnglish: "A constituency is a geographic area that elects one MP to the House of Commons.",
    sourceName: "UK Parliament glossary",
    sourceUrl: "https://www.parliament.uk/site-information/glossary/",
    term: "Constituency",
    whyItMatters: "It tells you which local seat and MP a postcode belongs to."
  },
  {
    category: "Parliament",
    plainEnglish:
      "The House of Commons is the elected chamber where MPs debate, scrutinise government, and vote on legislation.",
    sourceName: "How Parliament works",
    sourceUrl: "https://www.parliament.uk/about/how/",
    term: "House of Commons",
    whyItMatters: "Most postcode and MP activity views will focus on Commons records first."
  },
  {
    category: "Parliament",
    plainEnglish:
      "The House of Lords is the second chamber of Parliament. Its members examine legislation and scrutinise government.",
    sourceName: "How Parliament works",
    sourceUrl: "https://www.parliament.uk/about/how/",
    term: "House of Lords",
    whyItMatters: "Bills usually move through both Houses before they can become law."
  },
  {
    category: "Parliament",
    plainEnglish:
      "A bill is a proposal for a new law, or a proposal to change an existing law, before it becomes an Act.",
    sourceName: "UK Parliament glossary",
    sourceUrl: "https://www.parliament.uk/site-information/glossary/",
    term: "Bill",
    whyItMatters: "Policy promises often become real only when they appear in bills and votes."
  },
  {
    category: "Parliament",
    plainEnglish:
      "A division is a formal recorded vote in Parliament, usually counted as ayes and noes.",
    sourceName: "UK Parliament glossary",
    sourceUrl: "https://www.parliament.uk/site-information/glossary/",
    term: "Division",
    whyItMatters: "Divisions are the official vote records behind many MP voting-history rows."
  },
  {
    category: "Parliament",
    plainEnglish: "To abstain is to not vote either for or against when a vote takes place.",
    sourceName: "UK Parliament glossary",
    sourceUrl: "https://www.parliament.uk/site-information/glossary/",
    term: "Abstain",
    whyItMatters: "A missing vote is not always the same as voting against something."
  },
  {
    category: "Parties",
    plainEnglish:
      "Whips are party organisers who help coordinate how party members vote and attend Parliament.",
    sourceName: "UK Parliament glossary",
    sourceUrl: "https://www.parliament.uk/site-information/glossary/",
    term: "Whips",
    whyItMatters: "Whipping helps explain why many MPs from the same party vote the same way."
  },
  {
    category: "Parliament",
    plainEnglish:
      "A select committee is a cross-party committee that examines a subject area, public body, or government department.",
    sourceName: "UK Parliament glossary",
    sourceUrl: "https://www.parliament.uk/site-information/glossary/",
    term: "Select committee",
    whyItMatters: "Committee work can show what MPs are investigating beyond headline votes."
  },
  {
    category: "Parliament",
    plainEnglish:
      "A written question is a formal question from an MP or Lord that receives a written answer from government.",
    sourceName: "UK Parliament glossary",
    sourceUrl: "https://www.parliament.uk/site-information/glossary/",
    term: "Written question",
    whyItMatters: "Written questions are useful evidence of what a representative is asking about."
  },
  {
    category: "Traditions",
    plainEnglish:
      "Prime Minister's Questions is a regular Commons session where MPs question the Prime Minister.",
    sourceName: "UK Parliament glossary",
    sourceUrl: "https://www.parliament.uk/site-information/glossary/",
    term: "PMQs",
    whyItMatters: "It is one of the most visible political traditions, but it is not the whole job."
  },
  {
    category: "Elections",
    plainEnglish:
      "A by-election is an election held in one constituency between general elections, usually because a seat becomes vacant.",
    sourceName: "UK Parliament glossary",
    sourceUrl: "https://www.parliament.uk/site-information/glossary/",
    term: "By-election",
    whyItMatters: "By-elections can affect Parliament and often draw national attention."
  },
  {
    category: "Elections",
    plainEnglish:
      "First Past the Post is the voting system used for UK general elections, where the candidate with the most votes in a constituency wins.",
    sourceName: "UK Parliament glossary",
    sourceUrl: "https://www.parliament.uk/site-information/glossary/",
    term: "First Past the Post",
    whyItMatters: "This explains why seat counts and vote share are not the same thing."
  },
  {
    category: "Parties",
    plainEnglish:
      "A manifesto is a party's published set of commitments and priorities for an election.",
    sourceName: "UK Parliament glossary",
    sourceUrl: "https://www.parliament.uk/site-information/glossary/",
    term: "Manifesto",
    whyItMatters: "Manifestos are one of the highest-value sources for explaining party positions."
  },
  {
    category: "Elections",
    plainEnglish:
      "A hung Parliament happens when no single party has an overall majority in the House of Commons.",
    sourceName: "UK Parliament glossary",
    sourceUrl: "https://www.parliament.uk/site-information/glossary/",
    term: "Hung Parliament",
    whyItMatters:
      "It helps users understand coalitions, confidence arrangements, and minority governments."
  },
  {
    category: "Traditions",
    plainEnglish:
      "The King's Speech sets out the government's planned laws and priorities at the State Opening of Parliament.",
    sourceName: "UK Parliament glossary",
    sourceUrl: "https://www.parliament.uk/site-information/glossary/",
    term: "King's Speech",
    whyItMatters: "It is a useful date for tracking what the government says it will try to do."
  },
  {
    category: "Traditions",
    plainEnglish:
      "Royal Assent is the formal approval that turns a bill passed by Parliament into an Act.",
    sourceName: "UK Parliament glossary",
    sourceUrl: "https://www.parliament.uk/site-information/glossary/",
    term: "Royal Assent",
    whyItMatters: "It marks the point where a bill becomes law."
  },
  {
    category: "Traditions",
    plainEnglish:
      "Black Rod is an officer of the House of Lords with ceremonial and administrative duties.",
    sourceName: "UK Parliament glossary",
    sourceUrl: "https://www.parliament.uk/site-information/glossary/",
    term: "Black Rod",
    whyItMatters: "It helps separate parliamentary ceremony from decisions that change law."
  },
  {
    category: "Traditions",
    plainEnglish:
      "State Opening is the formal start of a parliamentary session, when the monarch's speech sets out the government's planned laws and priorities.",
    sourceName: "State Opening of Parliament",
    sourceUrl: "https://www.parliament.uk/about/how/occasions/stateopening/",
    term: "State Opening",
    whyItMatters:
      "It is a recurring civic moment that can anchor explainers, timelines, and checks on proposed legislation."
  },
  {
    category: "Parliament",
    plainEnglish:
      "A parliamentary session is a period of parliamentary time within a Parliament, usually including several sitting periods and recesses.",
    sourceName: "Parliamentary sessions and sittings",
    sourceUrl: "https://www.parliament.uk/about/how/occasions/calendar/",
    term: "Session",
    whyItMatters:
      "Sessions explain why the calendar has openings, recesses, bill carry-over points, and planned legislative programmes."
  },
  {
    category: "Parliament",
    plainEnglish:
      "A sitting is a daily meeting of either House of Parliament, or a meeting of a committee.",
    sourceName: "Parliamentary sessions and sittings",
    sourceUrl: "https://www.parliament.uk/about/how/occasions/calendar/",
    term: "Sitting",
    whyItMatters:
      "Sitting days are when debates, questions, votes, and committee work can appear in the public record."
  },
  {
    category: "Parliament",
    plainEnglish:
      "A recess is a break in a parliamentary session when neither the House of Commons nor the House of Lords meets for normal business.",
    sourceName: "Parliamentary sessions and sittings",
    sourceUrl: "https://www.parliament.uk/about/how/occasions/calendar/",
    term: "Recess",
    whyItMatters:
      "Recess helps explain why fewer votes or debates may appear during certain weeks of the year."
  },
  {
    category: "Parliament",
    plainEnglish:
      "The Speaker chairs debates in the House of Commons, calls MPs to speak, and is expected to be politically impartial while in the chair.",
    sourceName: "UK Parliament glossary",
    sourceUrl: "https://www.parliament.uk/site-information/glossary/",
    term: "Speaker",
    whyItMatters:
      "Beginners hear the Speaker named often during debates and PMQs, but the Speaker is not speaking for a party in that role."
  },
  {
    category: "Parties",
    plainEnglish:
      "The Government is usually formed by the party, or parties, that can command support in the House of Commons and run government departments.",
    sourceName: "UK Parliament glossary",
    sourceUrl: "https://www.parliament.uk/site-information/glossary/",
    term: "Government",
    whyItMatters:
      "It explains why one party may be responsible for ministers, budgets and most bills while others scrutinise them."
  },
  {
    category: "Parties",
    plainEnglish:
      "The Opposition is made up of MPs and parties that are not in government. The largest opposition party is called the Official Opposition.",
    sourceName: "UK Parliament glossary",
    sourceUrl: "https://www.parliament.uk/site-information/glossary/",
    term: "Opposition",
    whyItMatters:
      "Opposition parties do not run departments, but they question ministers, debate bills and offer alternatives."
  },
  {
    category: "Parties",
    plainEnglish:
      "The Cabinet is the senior group of government ministers who lead major departments and help decide government policy.",
    sourceName: "UK Parliament glossary",
    sourceUrl: "https://www.parliament.uk/site-information/glossary/",
    term: "Cabinet",
    whyItMatters:
      "Cabinet roles explain who is publicly responsible for areas such as health, education, home affairs and the Treasury."
  },
  {
    category: "Parties",
    plainEnglish:
      "The Prime Minister is the head of the UK Government and appoints ministers to run government departments.",
    sourceName: "UK Parliament glossary",
    sourceUrl: "https://www.parliament.uk/site-information/glossary/",
    term: "Prime Minister",
    whyItMatters:
      "The Prime Minister is central to government decisions, but Parliament still debates, scrutinises and votes on laws."
  },
  {
    category: "Parties",
    plainEnglish:
      "The Shadow Cabinet is a team from the Official Opposition that follows government departments and challenges ministers on those areas.",
    sourceName: "UK Parliament glossary",
    sourceUrl: "https://www.parliament.uk/site-information/glossary/",
    term: "Shadow Cabinet",
    whyItMatters:
      "Shadow roles help users understand who is responding to the government from the main opposition party."
  },
  {
    category: "Parliament",
    plainEnglish:
      "A backbencher is an MP or Lord who is not a government minister or opposition frontbench spokesperson.",
    sourceName: "UK Parliament glossary",
    sourceUrl: "https://www.parliament.uk/site-information/glossary/",
    term: "Backbencher",
    whyItMatters:
      "Backbenchers can still speak, vote, sit on committees and raise constituency issues."
  },
  {
    category: "Parties",
    plainEnglish:
      "A coalition government is formed when two or more parties share government, usually because no single party has enough seats to govern alone.",
    sourceName: "UK Parliament glossary",
    sourceUrl: "https://www.parliament.uk/site-information/glossary/",
    term: "Coalition",
    whyItMatters: "Coalitions explain why parties may compromise on policies after an election."
  },
  {
    category: "Parliament",
    plainEnglish:
      "Devolution means some powers are held by elected bodies in Scotland, Wales and Northern Ireland instead of being decided only at Westminster.",
    sourceName: "UK Parliament glossary",
    sourceUrl: "https://www.parliament.uk/site-information/glossary/",
    term: "Devolution",
    whyItMatters:
      "It helps users understand why health, education or transport may be decided differently in different parts of the UK."
  }
];

export const glossaryCategories = ["Parliament", "Elections", "Parties", "Traditions"] as const;

export function glossaryTermSlug(term: Pick<GlossaryTerm, "term">) {
  return term.term
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function findGlossaryTermBySlug(slug: string) {
  return glossaryTerms.find((term) => glossaryTermSlug(term) === slug);
}
