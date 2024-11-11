import { getLogger } from '../../../logging/log-util';
import { apiclient } from '../../../logging/loggerApps.config';
import { GaxiosResponse } from 'gaxios';
import { googleCalendarFetchEvents } from './googleCalendarFetchEvents';
import {
  EventList,
  FetchEventsQuery,
  FetchEventsResult,
} from './types/events.types';

export const googleCalendarGetEvents = async (
  query: FetchEventsQuery, // TODO: type query
): Promise<FetchEventsResult> => {
  // TODO: type result
  const log = getLogger(apiclient.googleevents.get);

  if (!query.calendarId) {
    const errorMessage: string = `Invalid calendar query. Calendar id is missing.`;
    log.error(
      {
        query: query,
      },
      errorMessage,
    );
    return Promise.reject(new Error(errorMessage));
    // throw new Error(errorMessage);
  }

  try {
    let allEvents: EventList = [];
    let pageToken: string | undefined = undefined;

    do {
      const response = await googleCalendarFetchEvents({ ...query, pageToken });
      if (response) {
        allEvents.push(...response.data);
        pageToken = response.nextPageToken;
      } else {
        pageToken = undefined;
      }
    } while (pageToken);

    log.debug(
      { query, results: allEvents.length },
      `Fetched all events from google calendar.`,
    );

    return {
      calendarId: query.calendarId,
      results: allEvents.length,
      data: allEvents,
    };
  } catch (error: GaxiosResponse | any) {
    // for all other errors, thow an exception
    const errorMessage: string = `Could not fetch events from google api.`;
    log.error(
      {
        calendarId: query.calendarId,
        error: {
          code: error?.code,
          message: error?.statusText || error?.message,
        },
      },
      errorMessage,
    );
    return Promise.reject(new Error(errorMessage));
  }
};
