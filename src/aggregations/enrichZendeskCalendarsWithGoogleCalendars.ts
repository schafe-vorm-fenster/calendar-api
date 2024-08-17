import { ZendeskSellClientCalendarWithClient } from '@/apiclients/crm/types/zendesk-sell-calendar.types';
import { googleCalendarGetCalendar } from '@/apiclients/google/googleCalendarGetCalendar';
import { CalendarResult } from '@/apiclients/google/types/getCalendar.types';
import { SvFCalendar } from '@/apiclients/google/types/svfCalendar.types';
import { getLogger } from '../../logging/log-util';
import { aggregations } from '../../logging/loggerApps.config';

/**
 * Enriches the given list of Zendesk calendars with Google calendar details.
 * Utilizes the googleCalendarGetCalendar function including api requests to get the details.
 * @param zendeskCalendars: ZendeskSellClientCalendarWithClient[]
 * @returns Promise<SvFCalendar[]>
 */
export const enrichZendeskCalendarsWithGoogleCalendars = async (
  zendeskCalendars: ZendeskSellClientCalendarWithClient[],
  filterInvalid: boolean = true,
): Promise<SvFCalendar[]> => {
  const log = getLogger(aggregations.zendesksell.googlecalendar);

  // no input, no output
  if (!zendeskCalendars || zendeskCalendars.length === 0) {
    return [];
  }

  // get google calendar details for each calendar by Promise.all
  const googleCalendars: CalendarResult[] = await Promise.all(
    zendeskCalendars.map(
      async (calendar: ZendeskSellClientCalendarWithClient) => {
        return await googleCalendarGetCalendar({ calendarId: calendar.id });
      },
    ),
  );

  // compose zendeskCalendars and googleCalendars to one list typed as SvFCalendar
  const calendars: SvFCalendar[] = zendeskCalendars
    .map((calendar: ZendeskSellClientCalendarWithClient, index: number) => {
      // get google calendar details from googleCalendars where "id" matches
      let googleCal: SvFCalendar | null = null;
      if (calendar.type === 'google') {
        googleCal =
          googleCalendars.find(
            (googleCalendar: CalendarResult) =>
              googleCalendar?.id === calendar.id,
          ) || null;
        if (!googleCal)
          log.warn(`Google calendar not found for calendar id: ${calendar.id}`);
      }
      // if unknown calendars shpuld be skipped here to ensure only valid cals are within the list
      if (filterInvalid && calendar.type === 'google' && !googleCal)
        return null;

      return {
        id: calendar.id,
        type: calendar.type,
        organizer: {
          id: calendar.organizer.id,
          name: calendar.organizer.name,
        },
        tags: googleCal?.tags || [],
        description: googleCal?.description || '',
        scopes: googleCal?.scopes || [],
        url: googleCal?.url || '',
      };
    })
    .filter(
      (calendar: SvFCalendar | null) => calendar !== null,
    ) as SvFCalendar[];

  return calendars;
};
