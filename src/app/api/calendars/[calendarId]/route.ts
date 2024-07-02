import { ApiErrorResponse } from '../../api.types';
import { CalendarsApiResponseItem } from '../calendars-api.types';
import { CalendarResult } from '@/apiclients/google/types/getCalendar.types';
import { googleCalendarGetCalendar } from '@/apiclients/google/googleCalendarGetCalendar';

/**
 * @swagger
 * /api/calendars/{calendarId}:
 *   get:
 *     summary: Returns details of a calendar.
 *     description: Provides details of a calendar.
 *     tags:
 *       - Calendars
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Calendar tayped as SvFCalendar.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Calendar not found.
 *       500:
 *         description: Error. Maybe the crm system could not be reached.
 */
export async function GET(
  undefined: any,
  { params }: { params: { calendarId: string } },
) {
  const calendarId = params.calendarId;

  try {
    const calendarResult: CalendarResult = await googleCalendarGetCalendar({
      calendarId: calendarId,
    } as { calendarId: string });

    if (!calendarResult) {
      return Response.json(
        { status: 404, error: 'Calendar not found' } as ApiErrorResponse,
        { status: 404 },
      );
    }

    const apiResponse: CalendarsApiResponseItem = {
      status: 200,
      data: calendarResult,
    };

    return Response.json(apiResponse, { status: 200 });
  } catch (error: any) {
    const errorMessage: ApiErrorResponse = {
      status: 500,
      error: error.message,
    };
    return Response.json(errorMessage, { status: 500 });
  }
}
