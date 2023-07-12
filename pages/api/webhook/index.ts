import { NextApiRequest, NextApiResponse } from "next";
import { getLogger } from "../../../logging/log-util";

/**
 * @swagger
 * /api/webhook/:
 *   post:
 *     summary: Receives webhook from Google Calendar.
 *     description: TODO.
 *     tags:
 *       - Calendar
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: TODO.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const log = getLogger("api.webhook");

  log.debug(
    { request: { body: req.body, headers: req.headers } },
    "Received webhook"
  );

  return res.status(200).json({ hello: "jan" });
}
