import { getLogger } from '../../../logging/log-util';
import { apiclient } from '../../../logging/loggerApps.config';
import { calendarApiClient } from './client/client';
import { reduceGoogleEvent } from './helpers/reduceGoogleEvent';
import {
  EventList,
  FetchEventsPageQuery,
  FetchEventsResult,
} from './types/events.types';
import { GaxiosResponse } from 'gaxios';

export const googleCalendarFetchEvents = async (
  query: FetchEventsPageQuery,
): Promise<FetchEventsResult | null> => {
  const log = getLogger(apiclient.googleevents.fetch);

  const eventsApiResponse: GaxiosResponse = await calendarApiClient.events.list(
    {
      calendarId: query.calendarId,
      orderBy: 'startTime',
      singleEvents: true, // expand recurring events to single events always
      showDeleted: true, // include deleted events always
      // timeMin: query.timeMin ?? undefined,
      // timeMax: query.timeMax ?? undefined,
      updatedMin: query.updatedMin ?? undefined,
      maxResults: 2000, // maximum from google is 2.500, default would be 250, use a high number to minimize request overhead
      pageToken: query.pageToken ?? undefined,
    },
  );

  const results: number = eventsApiResponse.data.items.length;
  const nextPageToken: string | undefined =
    eventsApiResponse.data.nextPageToken ?? undefined;

  log.debug(
    { query, results, nextPageToken },
    `Fetched events from google calendar.`,
  );

  // reduce events payload
  const events: EventList = eventsApiResponse.data.items.map(reduceGoogleEvent);

  return {
    calendarId: query.calendarId,
    results: results,
    data: events,
    nextPageToken: nextPageToken,
  };
};
