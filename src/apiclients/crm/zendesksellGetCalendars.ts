import { SvFCalendar } from '../google/types/svfCalendar.types';
import { ZendeskSellClientType } from './types/ZendeskSellClientType';
import {
  CalenderFeedType,
  ZendeskSellClientCalendar,
  ZendeskSellClientCalendarWithClient,
} from './types/zendesk-sell-calendar.types';
import {
  zendesksellGetClients,
  ZendesksellGetClientsResult,
} from './zendesksellGetClients';

export interface ZendesksellGetCalendarsQuery {
  type?: CalenderFeedType;
}

export type ZendesksellGetCalendarsResult =
  | ZendeskSellClientCalendarWithClient[]
  | null;

export const zendesksellGetCalendars = async (
  query: ZendesksellGetCalendarsQuery,
  page: number = 1,
): Promise<ZendesksellGetCalendarsResult> => {
  console.debug(`Execute zendesksell.getClients(page=${page})`);

  // get all clients, because calenders can only be accessed as attributes of clients
  const clients: ZendesksellGetClientsResult = await zendesksellGetClients({});
  if (!clients) {
    return null;
  }

  // collect all calenders of all clients as a flat list typed as ZendeskSellClientCalendarWithClient
  let calenders: ZendeskSellClientCalendarWithClient[] = [];

  clients.map((client: ZendeskSellClientType) => {
    return client.calendars.map((calendar: ZendeskSellClientCalendar) => {
      const cal: ZendeskSellClientCalendarWithClient = {
        id: calendar.id,
        type: calendar.type,
        organizer: {
          id: client.id,
          name: client.name,
        },
      };
      if (!query.type || query.type === calendar.type) calenders.push(cal);
    });
  });

  //

  return calenders;
};
