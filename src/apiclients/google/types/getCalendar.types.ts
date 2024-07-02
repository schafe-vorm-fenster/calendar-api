import { SvFCalendar } from './svfCalendar.types';

export interface CalendarQuery {
  calendarId: string;
}

export type CalendarResult = SvFCalendar | null;
