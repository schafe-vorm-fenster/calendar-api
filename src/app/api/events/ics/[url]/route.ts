/**
 * @swagger
 * /api/events/ics/{url}:
 *   post:
 *     summary: Returns events of the a calendar.
 *     description: Provides a list of events for the given calendar.
 *     tags:
 *       - Events
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: url
 *         in: path
 *         description: ICD feed url.
 *         example: https://export.kalender.digital/ics/0/7eb6dfe46cc56259948d/gesamterkalender.ics?past_months=3&future_months=36
 *       - name: since
 *         in: query
 *         description: The point in time in ISO-8601 in UTC.
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
