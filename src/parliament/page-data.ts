import {
  type CommonsDivision,
  getCommonsPartySeatCounts,
  getRecentCommonsDivisions,
  getUpcomingParliamentEvents,
  type ParliamentEvent,
  type PartySeatCount,
  type SourceRecord
} from "@/sources/uk-parliament";

export type PanelResult<T> =
  | {
      record: T;
      status: "available";
    }
  | {
      status: "unavailable";
    };

export type ParliamentPageData = {
  divisions: PanelResult<SourceRecord<CommonsDivision[]>>;
  seatCounts: PanelResult<SourceRecord<PartySeatCount[]>>;
  upcomingEvents: PanelResult<SourceRecord<ParliamentEvent[]>>;
};

export type ParliamentPageLoaders = {
  divisions: () => Promise<SourceRecord<CommonsDivision[]>>;
  seatCounts: () => Promise<SourceRecord<PartySeatCount[]>>;
  upcomingEvents: () => Promise<SourceRecord<ParliamentEvent[]>>;
};

const defaultLoaders: ParliamentPageLoaders = {
  divisions: () => getRecentCommonsDivisions(5),
  seatCounts: () => getCommonsPartySeatCounts(),
  upcomingEvents: () => getUpcomingParliamentEvents(7, 8)
};

export async function getParliamentPageData(
  loaders: ParliamentPageLoaders = defaultLoaders
): Promise<ParliamentPageData> {
  const [seatCounts, divisions, upcomingEvents] = await Promise.allSettled([
    loaders.seatCounts(),
    loaders.divisions(),
    loaders.upcomingEvents()
  ]);

  return {
    divisions: toPanelResult(divisions),
    seatCounts: toPanelResult(seatCounts),
    upcomingEvents: toPanelResult(upcomingEvents)
  };
}

export function isPanelAvailable<T>(
  panel: PanelResult<T>
): panel is Extract<PanelResult<T>, { status: "available" }> {
  return panel.status === "available";
}

function toPanelResult<T>(result: PromiseSettledResult<T>): PanelResult<T> {
  if (result.status === "fulfilled") {
    return {
      record: result.value,
      status: "available"
    };
  }

  return {
    status: "unavailable"
  };
}
