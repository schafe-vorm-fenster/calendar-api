/**
 * @swagger
 * /api/calendars:
 *   post:
 *     summary: Returns a list of all available calendars.
 *     description: Fetches all available calendars of active clients from the crm system.
 *     tags:
 *       - CRM
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Calendars.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: No calendars found.
 *       500:
 *         description: Error. Maybe the crm system could not be reached.
 */
export async function GET() {
  const data = {
    debug: 'Jan',
  };

  return Response.json({ data });
}
