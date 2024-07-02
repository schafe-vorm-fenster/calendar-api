export type CalenderFeedType = 'ical' | 'google';

export type ZendeskSellClientCalendarFormat = CalenderFeedType;

export interface ZendeskSellClientCalendar {
  id: string;
  type: ZendeskSellClientCalendarFormat;
}
export interface ZendeskSellClientType {
  id: number;
  created_at: string;
  updated_at: string;
  wikidataId: string | null;
  // contact_id?: number;
  // parent_organization_id?: number;
  name: string;
  // isOrganization: boolean;
  // isClient: boolean;
  // currentTarif: string | null;
  description?: string;
  website?: string;
  // email?: string;
  // phone?: string;
  // twitter?: string;
  // address: {
  //   city: string;
  //   address: string;
  //   zip: string;
  //   county: string;
  //   state: string;
  //   country: string;
  // } | null;
  // category?: string;
  // tags: string[];
  calendars: ZendeskSellClientCalendar[];
}
