import { SvFCalendar } from '@/calendar/types/calendar.types';
import { ApiResponseItem, ApiResponseList } from '../api.types';

export interface CalendarApiResponse extends ApiResponseList {
  data: SvFCalendar[];
}

export interface CalendarApiResponseItem extends ApiResponseItem {
  data: SvFCalendar;
}
