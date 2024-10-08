import { type NextRequest } from 'next/server';
import {
  ZendesksellGetClientsQuery,
  ZendesksellGetClientsResult,
  zendesksellGetClients,
} from '@/apiclients/crm/zendesksellGetClients';
import { OrganizerApiResponse } from '../api.types';
import { ChacheHeaderFifteenMinutes } from '../../api.const';

/**
 * @swagger
 * /api/organizers/new:
 *   get:
 *     summary: Returns a list of new organizers.
 *     description: Provides new organizers (active clients from the crm system) since a given point in time.
 *     tags:
 *       - Organizers
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: since
 *         in: query
 *         description: The point in time in ISO-8601 in UTC.
 *         example: 2024-05-01T02:30:00Z
 *     responses:
 *       200:
 *         description: Organizers.
 *       400:
 *         description: Bad request. Maybe the since parameter is missing or not in ISO-8601 format.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: No organizers found.
 *       500:
 *         description: Error. Maybe the crm system could not be reached.
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const since: string | null = searchParams.get('since'); // ISO-8601

  if (!since) {
    return new Response(`Required parameter "since" is missing.`, {
      status: 400,
    });
  }

  if (!since.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/)) {
    return new Response(`Parameter "since" is not in ISO-8601 format.`, {
      status: 400,
    });
  }

  const query: ZendesksellGetClientsQuery = { changed: since };
  const data: ZendesksellGetClientsResult =
    (await zendesksellGetClients(query)) || null;

  const responseBody: OrganizerApiResponse = {
    status: data ? 200 : 404,
    results: data ? data.length : 0,
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
