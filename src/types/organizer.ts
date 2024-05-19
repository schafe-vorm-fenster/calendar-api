import { ZendeskSellClientType } from '@/apiclients/crm/types/ZendeskSellClientType';
import { Calendar } from './calendar';

// export interface Organizer {
//   id: string; // CRM id
//   displayName: string; // name to display in the web
//   calendars: Calendar[];
// }

export type Organizer = ZendeskSellClientType;

export interface OrganizerApiResponse {
  results: number;
  data: Organizer[];
}
