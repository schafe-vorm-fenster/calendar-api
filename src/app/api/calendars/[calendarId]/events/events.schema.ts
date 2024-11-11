import { ResultSchema } from '@/rest/result.schema';
import { z } from 'zod';

const EventsActionResultSchema = ResultSchema.extend({
  calendarId: z.string(),
});

export const EventsActionSuccessfulSchema = EventsActionResultSchema.extend({
  status: z.number().min(200).max(200),
  results: z.number().min(1),
  data: z.array(z.object({})),
});

export const EventsActionEmptySchema = ResultSchema.extend({
  status: z.number().min(204).max(204),
  results: z.number().max(0),
});

export const EventsOkaySchema = EventsActionSuccessfulSchema.or(
  EventsActionEmptySchema,
);

export const RFC3339 = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?Z?$/)
  .transform((v) => new Date(v).toISOString());

export type RFC3339 = z.infer<typeof RFC3339>;
