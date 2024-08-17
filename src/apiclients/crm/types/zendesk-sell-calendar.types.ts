import { ZendeskSellClientTeaserType } from './ZendeskSellClientType';

export type CalenderFeedType = 'ical' | 'google';

export type ZendeskSellClientCalendarFormat = CalenderFeedType;

export interface ZendeskSellClientCalendar {
  id: string;
  type: ZendeskSellClientCalendarFormat;
}

export interface ZendeskSellClientCalendarWithClient
  extends ZendeskSellClientCalendar {
  organizer: ZendeskSellClientTeaserType;
}
