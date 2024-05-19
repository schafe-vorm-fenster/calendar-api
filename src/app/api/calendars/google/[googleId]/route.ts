/**
 * @swagger
 * /api/calendars/google/{googleId}:
 *   post:
 *     summary: Returns a calendar.
 *     description: Provides the google calendar for the given id.
 *     tags:
 *       - Calendars
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: googleId
 *         in: path
 *         description: Google id of the calendar.
 *         example: schafe-vorm-fenster.de_0k88ob4lttnn73ro2gu0nhs5l4@group.calendar.google.com
 *     responses:
 *       200:
 *         description: Calendar.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Calendar not found.
 *       500:
 *         description: Error. Maybe the google api could not be reached.
 */
export async function GET() {
  const data = {
    debug: 'Jan',
  };

  return Response.json({ data });
}
