/**
 * @swagger
 * /api/calendars/ics/{url}:
 *   post:
 *     summary: Returns a calendar.
 *     description: Provides the calendar for the given url.
 *     tags:
 *       - Calendars
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: url
 *         in: path
 *         description: ICD feed url.
 *         example: https://export.kalender.digital/ics/0/7eb6dfe46cc56259948d/gesamterkalender.ics?past_months=3&future_months=36
 *     responses:
 *       200:
 *         description: Calendar.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Calendar not found.
 *       500:
 *         description: Error. Maybe the ics feed url could not be processed.
 */
export async function GET() {
  const data = {
    debug: 'Jan',
  };

  return Response.json({ data });
}
