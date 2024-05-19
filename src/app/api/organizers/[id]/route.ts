import {
  ZendesksellGetClientsQuery,
  ZendesksellGetClientsResult,
  zendesksellGetClients,
} from '@/apiclients/crm/zendesksellGetClients';

/**
 * @swagger
 * /api/organizers/{id}:
 *   post:
 *     summary: Returns a list of new organizers.
 *     description: Provides new organizers (active clients from the crm system) since a given point in time.
 *     tags:
 *       - Organizers
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The crm id of the organizer.
 *         example: 365524402
 *     responses:
 *       200:
 *         description: Organizer.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Organizer not found.
 *       500:
 *         description: Error. Maybe the crm system could not be reached.
 */
export async function GET() {
  const query: ZendesksellGetClientsQuery = {};
  const data: ZendesksellGetClientsResult =
    (await zendesksellGetClients(query)) || null;

  return Response.json({ data });
}
