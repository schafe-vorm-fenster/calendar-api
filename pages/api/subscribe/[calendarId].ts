import { NextApiRequest, NextApiResponse } from "next";
import { getLogger } from "../../../logging/log-util";
import { calendar_v3, google } from "googleapis";
import Calendar = calendar_v3.Calendar;

/**
 * @swagger
 * /api/subscribe/{calendarId}:
 *   post:
 *     summary: TODO.
 *     description: TODO.
 *     tags:
 *       - Subscription
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: calendarId
 *         description: Google calendar id e.g. "schafe-vorm-fenster.de_0k88ob4lttnn73ro2gu0nhs5l4@group.calendar.google.com"
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: TODO.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const log = getLogger("api.subscribe");
  const { calendarId } = req.query;
  log.debug(
    { request: { calendarId: calendarId } },
    "Received subscribe request"
  );

  // init google api incl. auth by JWT for a server-to-server usage
  const auth = new google.auth.JWT(
    process.env.GOOGLEAPI_CLIENT_EMAIL,
    undefined,
    JSON.parse(`"${process.env.GOOGLEAPI_PRIVATE_KEY}"`),
    [
      "https://www.googleapis.com/auth/calendar.readonly",
      "https://www.googleapis.com/auth/calendar.events.readonly",
    ]
  );
  const calendar: Calendar = google.calendar({ version: "v3", auth });

  // stop
  const stop: any = await calendar.channels.stop({
    requestBody: {
      id: "my-channel-id-5",
      resourceId: "kTXMwT3eKNqup9TfU9vDSrAXMH4",
    },
  });

  // get metadata
  const test: any = await calendar.events.watch({
    calendarId:
      "schafe-vorm-fenster.de_0k88ob4lttnn73ro2gu0nhs5l4@group.calendar.google.com", // calendarId as string,
    showDeleted: true,
    requestBody: {
      id: "my-channel-id-5",
      address: "https://calendar.api.schafe-vorm-fenster.de/api/webhook/",
      type: "web_hook",
      payload: true,
      resourceId: "kTXMwT3eKNqup9TfU9vDSrAXMH4",
      kind: "api#channel",
      params: {
        ttl: "3600",
      },
    },
  });

  return res.status(200).json({ stop: stop, watch: test });
}
