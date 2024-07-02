import { ZendeskSellClientType } from '@/apiclients/crm/types/ZendeskSellClientType';
import { ApiResponseList } from '../api.types';

export type Organizer = ZendeskSellClientType;

export interface OrganizerApiResponse extends ApiResponseList {
  data: Organizer[];
}
