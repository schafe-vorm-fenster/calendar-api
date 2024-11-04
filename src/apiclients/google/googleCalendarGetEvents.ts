import { CalendarQuery, CalendarResult } from './types/getCalendar.types';
import { getLogger } from '../../../logging/log-util';
import { apiclient } from '../../../logging/loggerApps.config';
import { GaxiosResponse } from 'gaxios';
import { calendarApiClient } from './client/client';

export const googleCalendarGetEvents = async (
  query: CalendarQuery, // TODO: type query
): Promise<CalendarResult | null> => {
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
    // TODO: add parameters
    // TODO: iterate over all pages
    const eventsApiResponse: GaxiosResponse =
      await calendarApiClient.events.list({
        calendarId: query.calendarId,
        orderBy: 'startTime',
        singleEvents: true, // expand recurring events to single events
        showDeleted: true, // include deleted events
        timeMin: undefined, // TODO: set by query
        timeMax: undefined, // TODO: set by query
      });

    // TODO: mapp and type
    // TODO: add crm organizer to each event
    // TODO: add/keep/map calendar id to each event
    // TODO: reduce events payload
    const events: any = eventsApiResponse.data.items;

    return events;
  } catch (error: GaxiosResponse | any) {
    // if no calendar found, return null as technical positive but empty result
    if (error?.code === 404) {
      log.info(
        {
          calendarId: query.calendarId,
        },
        'Calendar not found.',
      );
      return Promise.resolve(null);
    }

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
    // throw new Error(errorMessage, {
    //   cause: error,
    // });
  }
};
