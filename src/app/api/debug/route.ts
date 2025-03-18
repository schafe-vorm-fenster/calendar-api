import { googleCalendarGetEvents } from '@/clients/google/google-calendar-get-events';
import { FetchEventsQuery } from '@/clients/google/types/events.types';

export async function GET() {
  const query: FetchEventsQuery = {
    calendarId: '8f42ktg61fmed039dnc70icsc6ii118b@import.calendar.google.com',
  };

  const events: object[] = await googleCalendarGetEvents(query);

  return Response.json({ results: events.length, data: events });
}
