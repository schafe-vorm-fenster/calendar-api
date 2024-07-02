import { calendar_v3 } from 'googleapis';
import Calendar = calendar_v3.Schema$Calendar;
import { TextWithData } from '@schafevormfenster/data-text-mapper/dist';

export type SvFCalendar = Pick<Calendar, 'id' | 'summary' | 'description'> &
  Pick<TextWithData, 'tags' | 'scopes' | 'url'>;
