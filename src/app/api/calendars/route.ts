import {
  zendesksellGetCalendars,
  ZendesksellGetCalendarsQuery,
  ZendesksellGetCalendarsResult,
} from '@/apiclients/crm/zendesksellGetCalendars';
import { ChacheHeaderFifteenMinutes } from '../api.const';
import { CalendarApiResponse } from './api.types';
import { SvFCalendar } from '@/apiclients/google/types/svfCalendar.types';
import { CalenderFeedType } from '@/apiclients/crm/types/zendesk-sell-calendar.types';
import { NextRequest } from 'next/server';
import { ApiErrorResponse } from '../api.types';
import { getLogger } from '../../../../logging/log-util';
import { api } from '../../../../logging/loggerApps.config';
import { enrichZendeskCalendarsWithGoogleCalendars } from '@/aggregations/enrichZendeskCalendarsWithGoogleCalendars';

/**
 * @swagger
 * /api/calendars:
 *   get:
 *     summary: Returns a list of all available calendars.
 *     description: Provides all available calendars of active clients from the crm system.
 *     tags:
 *       - Calendars
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: type
 *         in: query
 *         description: The type of the calendar (google|ical).
 *     responses:
 *       200:
 *         description: Calendars.
 *       204:
 *         description: No calendars found.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Error. Maybe the crm system could not be reached.
 */
export async function GET(request: NextRequest) {
  const log = getLogger(api.calendars.get);

  const searchParams = request.nextUrl.searchParams;
  const type: string | null = searchParams.get('type');

  // check parameter "type"
  if (type && !['google', 'ical'].includes(type)) {
    const errBody: ApiErrorResponse = {
      status: 400,
      error: `Parameter "type" is invalid.`,
    };
    return Response.json(errBody, {
      status: errBody.status,
      headers: {
        ...ChacheHeaderFifteenMinutes,
      },
    });
  }

  const query: ZendesksellGetCalendarsQuery = type
    ? { type: type as CalenderFeedType }
    : {};

  // first get calendars from organizers from crm
  let zendeskCalendars: ZendesksellGetCalendarsResult =
    await zendesksellGetCalendars(query);

  // check if no calendars found
  if (!zendeskCalendars || zendeskCalendars.length === 0) {
    const errBody: CalendarApiResponse = {
      status: 200,
      results: 0,
      data: [],
    };
    return Response.json(errBody, {
      status: errBody.status,
      headers: {
        ...ChacheHeaderFifteenMinutes,
      },
    });
  }

  // compose zendeskCalendars and googleCalendars to one list typed as SvFCalendar
  const data: SvFCalendar[] =
    await enrichZendeskCalendarsWithGoogleCalendars(zendeskCalendars);

  const responseBody: CalendarApiResponse = {
    status: data && data.length > 0 ? 200 : 404,
    results: data ? data?.length : 0,
    data: data || [],
  };

  if (responseBody.status !== 200) {
    return Response.json(responseBody, {
      status: responseBody.status,
      headers: {
        ...ChacheHeaderFifteenMinutes,
      },
    });
  }

  // send response with cache headers
  return Response.json(responseBody, {
    headers: {
      ...ChacheHeaderFifteenMinutes,
    },
  });
}
