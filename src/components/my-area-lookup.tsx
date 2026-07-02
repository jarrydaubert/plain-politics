"use client";

import { AlertCircle, CheckCircle2, ExternalLink, Loader2, MapPin, Vote } from "lucide-react";
import { type FormEvent, type ReactNode, useState } from "react";

type LookupState =
  | { status: "idle" }
  | { message: string; status: "error" }
  | { status: "loading" }
  | { data: MyAreaLookupResult; status: "success" };

type MyAreaLookupResult = {
  checkedAt: string;
  constituency: {
    code: string | null;
    district: string | null;
    name: string;
    postcode: string;
    ward: string | null;
  };
  member: CommonsMember;
  questions: WrittenQuestion[];
  sourceUrls: {
    member: string;
    postcode: string;
    questions: string;
    votes: string;
  };
  votes: MemberVote[];
};

type CommonsMember = {
  id: number;
  latestHouseMembership: {
    membershipFrom: string;
    membershipFromId: number;
    membershipStartDate: string;
  };
  latestParty: {
    backgroundColour: string | null;
    name: string;
  };
  nameDisplayAs: string;
  nameFullTitle: string | null;
  thumbnailUrl: string | null;
};

type MemberVote = {
  date: string;
  divisionNumber: number;
  id: number;
  inAffirmativeLobby: boolean;
  inNegativeLobby: boolean;
  numberAgainst: number;
  numberInFavour: number;
  title: string;
};

type WrittenQuestion = {
  dateAnswered: string | null;
  dateTabled: string;
  heading: string | null;
  id: number;
  questionText: string;
  uin: string;
};

type PostcodeLookupResponse = {
  result?: {
    admin_district: string | null;
    admin_ward: string | null;
    codes?: {
      parliamentary_constituency?: string | null;
      parliamentary_constituency_2024?: string | null;
    };
    parliamentary_constituency: string | null;
    parliamentary_constituency_2024?: string | null;
    postcode: string;
  } | null;
  status: number;
};

type MemberSearchResponse = {
  items?: Array<{ value: CommonsMember }>;
  totalResults: number;
};

type MemberVotesResponse = {
  items?: Array<{ value: MemberVote }>;
};

type WrittenQuestionsResponse = {
  items?: Array<{ value: WrittenQuestion }>;
};

const POSTCODES_API_BASE = "https://api.postcodes.io/postcodes";
const MEMBERS_API_BASE = "https://members-api.parliament.uk/api";

export function MyAreaLookup() {
  const [postcode, setPostcode] = useState("");
  const [lookup, setLookup] = useState<LookupState>({ status: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedInput = postcode.trim();

    if (!normalizedInput) {
      setLookup({ message: "Enter a full UK postcode to start.", status: "error" });
      return;
    }

    setLookup({ status: "loading" });

    try {
      const data = await lookupMyArea(normalizedInput);
      setLookup({ data, status: "success" });
    } catch (error) {
      setLookup({
        message: error instanceof Error ? error.message : "Could not complete this lookup.",
        status: "error"
      });
    }
  }

  return (
    <section className="grid gap-6">
      <form
        className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5"
        onSubmit={handleSubmit}
      >
        <label className="text-sm font-semibold" htmlFor="postcode">
          Enter a postcode
        </label>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <input
            autoComplete="postal-code"
            className="min-h-12 flex-1 rounded-md border border-[var(--border)] bg-white px-4 text-base outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)]"
            id="postcode"
            inputMode="text"
            onChange={(event) => setPostcode(event.target.value)}
            placeholder="SW1A 1AA"
            value={postcode}
          />
          <button
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[var(--accent)] px-5 text-sm font-semibold text-white transition hover:bg-[var(--accent-strong)] disabled:cursor-not-allowed disabled:opacity-70"
            disabled={lookup.status === "loading"}
            type="submit"
          >
            {lookup.status === "loading" ? (
              <Loader2 aria-hidden="true" className="animate-spin" size={18} />
            ) : (
              <MapPin aria-hidden="true" size={18} />
            )}
            Find my MP
          </button>
        </div>
        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
          Used only for this lookup. Plain Politics does not store your postcode.
        </p>
      </form>

      <div aria-live="polite">
        {lookup.status === "idle" ? <EmptyState /> : null}
        {lookup.status === "loading" ? <LoadingState /> : null}
        {lookup.status === "error" ? <ErrorState message={lookup.message} /> : null}
        {lookup.status === "success" ? <LookupResult data={lookup.data} /> : null}
      </div>
    </section>
  );
}

async function lookupMyArea(postcode: string): Promise<MyAreaLookupResult> {
  const encodedPostcode = encodeURIComponent(postcode);
  const postcodeUrl = `${POSTCODES_API_BASE}/${encodedPostcode}`;

  const postcodeResult = await fetchJson<PostcodeLookupResponse>(postcodeUrl, {
    notFoundMessage: "That postcode was not found. Check it and try again."
  });

  const postcodeData = postcodeResult.result;
  const constituencyName =
    postcodeData?.parliamentary_constituency_2024 ?? postcodeData?.parliamentary_constituency;

  if (!postcodeData || !constituencyName) {
    throw new Error("That postcode was not found in the public postcode data.");
  }

  const encodedResolvedPostcode = encodeURIComponent(postcodeData.postcode);
  const memberUrl = `${MEMBERS_API_BASE}/Members/Search?Location=${encodedResolvedPostcode}&House=1&skip=0&take=1`;
  const memberResult = await fetchJson<MemberSearchResponse>(memberUrl);
  const member = memberResult.items?.[0]?.value;

  if (!member) {
    throw new Error("No current Commons MP was returned for that postcode.");
  }

  const votesUrl = `${MEMBERS_API_BASE}/Members/${member.id}/Voting?house=Commons&page=1`;
  const questionsUrl = `${MEMBERS_API_BASE}/Members/${member.id}/WrittenQuestions?house=Commons&page=1`;

  const [votesResult, questionsResult] = await Promise.all([
    fetchJson<MemberVotesResponse>(votesUrl),
    fetchJson<WrittenQuestionsResponse>(questionsUrl)
  ]);

  return {
    checkedAt: new Date().toISOString(),
    constituency: {
      code:
        postcodeData.codes?.parliamentary_constituency_2024 ??
        postcodeData.codes?.parliamentary_constituency ??
        null,
      district: postcodeData.admin_district,
      name: constituencyName,
      postcode: postcodeData.postcode,
      ward: postcodeData.admin_ward
    },
    member,
    questions: questionsResult.items?.map((item) => item.value).slice(0, 3) ?? [],
    sourceUrls: {
      member: memberUrl,
      postcode: postcodeUrl,
      questions: questionsUrl,
      votes: votesUrl
    },
    votes: votesResult.items?.map((item) => item.value).slice(0, 3) ?? []
  };
}

async function fetchJson<T>(
  url: string,
  options: Readonly<{ notFoundMessage?: string }> = {}
): Promise<T> {
  const response = await fetch(url);

  if (response.status === 404 && options.notFoundMessage) {
    throw new Error(options.notFoundMessage);
  }

  if (!response.ok) {
    throw new Error(`Public source request failed with status ${response.status}.`);
  }

  return response.json() as Promise<T>;
}

function EmptyState() {
  return (
    <div className="rounded-lg border border-dashed border-[var(--border)] bg-[var(--surface-soft)] p-5">
      <h2 className="text-lg font-semibold">Start with where you live</h2>
      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
        The first result shows your Westminster constituency, current MP, recent votes and written
        questions where public APIs return them.
      </p>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
      <Loader2 aria-hidden="true" className="animate-spin text-[var(--accent)]" size={20} />
      <p className="text-sm font-medium">Finding your area...</p>
    </div>
  );
}

function ErrorState({ message }: Readonly<{ message: string }>) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-[var(--danger)] bg-[var(--surface)] p-5">
      <AlertCircle aria-hidden="true" className="mt-0.5 text-[var(--danger)]" size={20} />
      <div>
        <h2 className="font-semibold">Lookup unavailable</h2>
        <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{message}</p>
      </div>
    </div>
  );
}

function LookupResult({ data }: Readonly<{ data: MyAreaLookupResult }>) {
  return (
    <div className="grid gap-6">
      <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
        <div className="flex items-start gap-3">
          <CheckCircle2 aria-hidden="true" className="mt-1 text-[var(--accent)]" size={22} />
          <div>
            <p className="text-sm font-semibold uppercase text-[var(--muted)]">
              Constituency found
            </p>
            <h2 className="mt-1 text-2xl font-semibold">{data.constituency.name}</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              {data.constituency.district ?? "Local authority not returned"}
              {data.constituency.ward ? `, ${data.constituency.ward}` : ""}
            </p>
          </div>
        </div>

        <dl className="mt-5 grid gap-4 sm:grid-cols-3">
          <InfoItem label="Postcode checked" value={data.constituency.postcode} />
          <InfoItem label="Constituency code" value={data.constituency.code ?? "Not returned"} />
          <InfoItem label="Checked at" value={formatDateTime(data.checkedAt)} />
        </dl>
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <article className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
          <p className="text-sm font-semibold uppercase text-[var(--muted)]">Current MP</p>
          <div className="mt-4 flex items-start gap-4">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--accent-soft)] text-xl font-semibold text-[var(--accent-strong)]">
              {getInitials(data.member.nameDisplayAs)}
            </div>
            <div>
              <h2 className="text-2xl font-semibold">{data.member.nameDisplayAs}</h2>
              <p className="mt-1 font-medium">{data.member.latestParty.name}</p>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                MP for {data.member.latestHouseMembership.membershipFrom} since{" "}
                {formatDateOnly(data.member.latestHouseMembership.membershipStartDate)}.
              </p>
            </div>
          </div>
        </article>

        <article className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
          <p className="text-sm font-semibold uppercase text-[var(--muted)]">Note</p>
          <h2 className="mt-1 text-xl font-semibold">Parliament record, not local impact</h2>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
            Votes and written questions show parliamentary activity. They do not, by themselves,
            prove what changed in a constituency. We only call something locally relevant when a
            source directly supports that link.
          </p>
        </article>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <ActivityList
          emptyText="No recent member votes were returned by the endpoint."
          getKey={(vote) => `vote-${vote.id}`}
          items={data.votes}
          renderItem={(vote) => (
            <>
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-semibold">{vote.title}</h3>
                <span className="rounded-sm bg-[var(--accent-soft)] px-2 py-1 text-xs font-semibold text-[var(--accent-strong)]">
                  {formatVote(vote)}
                </span>
              </div>
              <p className="mt-2 text-sm text-[var(--muted)]">
                {formatDateOnly(vote.date)} - Division {vote.divisionNumber} - {vote.numberInFavour}{" "}
                ayes, {vote.numberAgainst} noes
              </p>
            </>
          )}
          title="Recent votes"
        />

        <ActivityList
          emptyText="No recent written questions were returned by the endpoint."
          getKey={(question) => `question-${question.id}`}
          items={data.questions}
          renderItem={(question) => (
            <>
              <h3 className="font-semibold">{question.heading ?? `Question ${question.uin}`}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{question.questionText}</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Tabled {formatDateOnly(question.dateTabled)}
                {question.dateAnswered ? `, answered ${formatDateOnly(question.dateAnswered)}` : ""}
              </p>
            </>
          )}
          title="Recent written questions"
        />
      </section>

      <SourceLinks urls={data.sourceUrls} />
    </div>
  );
}

function InfoItem({ label, value }: Readonly<{ label: string; value: string }>) {
  return (
    <div className="border-t border-[var(--border)] pt-3">
      <dt className="text-sm font-semibold">{label}</dt>
      <dd className="mt-1 break-words text-sm text-[var(--muted)]">{value}</dd>
    </div>
  );
}

function ActivityList<T>({
  emptyText,
  getKey,
  items,
  renderItem,
  title
}: Readonly<{
  emptyText: string;
  getKey: (item: T) => string;
  items: T[];
  renderItem: (item: T) => ReactNode;
  title: string;
}>) {
  return (
    <article className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
      <div className="mb-4 flex items-center gap-2">
        <Vote aria-hidden="true" className="text-[var(--accent)]" size={20} />
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      {items.length > 0 ? (
        <ul className="grid gap-4">
          {items.map((item) => (
            <li className="border-t border-[var(--border)] pt-4" key={getKey(item)}>
              {renderItem(item)}
            </li>
          ))}
        </ul>
      ) : (
        <p className="border-t border-[var(--border)] pt-4 text-sm text-[var(--muted)]">
          {emptyText}
        </p>
      )}
    </article>
  );
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function SourceLinks({ urls }: Readonly<{ urls: MyAreaLookupResult["sourceUrls"] }>) {
  const links = [
    ["Postcode lookup", urls.postcode],
    ["Current MP lookup", urls.member],
    ["Member voting record", urls.votes],
    ["Written questions", urls.questions]
  ] as const;

  return (
    <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
      <h2 className="text-xl font-semibold">Source links</h2>
      <div className="mt-4 grid gap-3">
        {links.map(([label, url]) => (
          <a
            className="flex items-start justify-between gap-4 border-t border-[var(--border)] pt-3 text-sm font-medium transition hover:text-[var(--accent)]"
            href={url}
            key={url}
            rel="noreferrer"
            target="_blank"
          >
            <span>{label}</span>
            <ExternalLink aria-hidden="true" size={16} />
          </a>
        ))}
      </div>
    </section>
  );
}

function formatVote(vote: MemberVote) {
  if (vote.inAffirmativeLobby) {
    return "Aye";
  }

  if (vote.inNegativeLobby) {
    return "No";
  }

  return "Recorded";
}

function formatDateOnly(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium"
  }).format(new Date(value));
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}
