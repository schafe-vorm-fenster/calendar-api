import { googleCalendarGetEvents } from '@/apiclients/google/googleCalendarGetEvents';

/**
 * @swagger
 * /api/calendars/{calendarId}/events:
 *   post:
 *     summary: Returns events of the a calendar.
 *     description: Provides a list of events for the given calendar.
 *     tags:
 *       - Events
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: calendarId
 *         in: path
 *         description: Id of the calendar.
 *         example: schafe-vorm-fenster.de_0k88ob4lttnn73ro2gu0nhs5l4@group.calendar.google.com
 *       - name: since
 *         in: query
 *         description: The point in time in ISO-8601 in UTC.®
 *     responses:
 *       200:
 *         description: Event list.
 *       204:
 *         description: No events found.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Calendar not found.
 *       500:
 *         description: Error. Maybe the google api could not be reached.
 */
export async function GET(
  undefined: any,
  { params }: { params: { calendarId: string } },
) {
  const calendarId = params.calendarId;

  try {
    const events: any = await googleCalendarGetEvents({
      calendarId: calendarId,
    } as { calendarId: string });

    // TODO: type as response
    const response = {
      status: 200,
      calendarId: calendarId,
      results: events.length,
      data: events,
    };

    return Response.json(response);
  } catch (error: any) {
    throw new Error(error.message);
  }
}
