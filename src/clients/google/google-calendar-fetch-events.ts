import { getLogger } from '@/logging/logger';
import { calendarApiClient } from './client/client';
import { reduceGoogleEvent } from './helpers/reduce-google-event';
import {
  EventList,
  FetchEventsPageQuery,
  FetchEventsResult,
} from './types/events.types';
import { GaxiosResponse } from 'gaxios';
import { clientLoggerGoogle } from '@/logging/loggerApps.config';
import { cacheLife } from 'next/dist/server/use-cache/cache-life';

const log = getLogger(clientLoggerGoogle['events.fetch']);

export const googleCalendarFetchEvents = async (
  query: FetchEventsPageQuery,
): Promise<FetchEventsResult | null> => {
  'use cache';
  cacheLife('google');
  const eventsApiResponse: GaxiosResponse = await calendarApiClient.events.list(
    {
      calendarId: query.calendarId,
      orderBy: 'startTime',
      singleEvents: true, // expand recurring events to single events always
      showDeleted: true, // include deleted events always
      timeMin: query.timeMin ?? undefined,
      timeMax: query.timeMax ?? undefined,
      updatedMin: query.updatedMin ?? undefined,
      maxResults: 500, // maximum from google is 2.500, default would be 250, use a high number to minimize request overhead
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
