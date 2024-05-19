import {
  ZendesksellGetClientsQuery,
  ZendesksellGetClientsResult,
  zendesksellGetClients,
} from '@/apiclients/crm/zendesksellGetClients';
import { OrganizerApiResponse } from '@/types/organizer';

/**
 * @swagger
 * /api/organizers:
 *   post:
 *     summary: Returns a list of all organizers..
 *     description: Provides all organizers which means all active clients from the crm system.
 *     tags:
 *       - Organizers
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Organizers.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: No organizers found.
 *       500:
 *         description: Error. Maybe the crm system could not be reached.
 */
export async function GET() {
  const query: ZendesksellGetClientsQuery = {};
  const data: ZendesksellGetClientsResult =
    (await zendesksellGetClients(query)) || null;

  const responseBody: OrganizerApiResponse = {
    results: data ? data.length : 0,
    data: data || [],
  };

  // add cache header to allow cdn caching of responses
  const cacheMaxAge: string = '1800'; // 30 minutes
  const cacheStaleWhileRevalidate: string = '180'; // 3 minutes

  // send response with cache headers
  return Response.json(responseBody, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=180',
      'CDN-Cache-Control': 'public, s-maxage=180',
      'Vercel-CDN-Cache-Control': 'public, s-maxage=1800',
    },
  });
}
