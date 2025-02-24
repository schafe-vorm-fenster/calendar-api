import { ZendeskSellClientCalendar } from './zendesk-sell-calendar.types';

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
  email?: string;
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

// pick attributes
export type ZendeskSellClientTeaserType = Pick<
  ZendeskSellClientType,
  'id' | 'name'
>;
