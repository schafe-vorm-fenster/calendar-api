import { ApiResponseList } from '../api.types';
import { Organizer } from '@/src/organizer/organizer.types';

export interface OrganizerApiResponse extends ApiResponseList {
  data: Organizer[];
}
