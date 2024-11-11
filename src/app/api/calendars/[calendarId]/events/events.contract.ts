import { initContract } from '@ts-rest/core';
import { EventsOkaySchema, RFC3339 } from './events.schema';
import { ErrorSchema } from '@/rest/error.schema';
import { z } from 'zod';

const c = initContract();

export const EventsContract = c.router({
  getEvents: {
    method: 'GET',
    path: `/api/calendars/:calendarId/events`,
    query: z.object({
      // default / fallback today 0am
      timeMin: RFC3339.optional().default(
        new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
      ),
      // default / fallback to 90 days in the future
      timeMax: RFC3339.optional().default(
        new Date(new Date().getTime() + 90 * 24 * 60 * 60 * 1000).toISOString(),
      ),
      updatedMin: z
        .string()
        .transform((v) => v ?? new Date().toISOString())
        .optional(),
    }),

    responses: {
      200: EventsOkaySchema,
      400: ErrorSchema,
      500: ErrorSchema,
    },
  },
});
