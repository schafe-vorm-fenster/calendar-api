import { SvFCalendar } from '@/apiclients/google/types/svfCalendar.types';
import { ApiResponseItem } from '../api.types';

export interface CalendarsApiResponseItem extends ApiResponseItem {
  data: SvFCalendar;
}
