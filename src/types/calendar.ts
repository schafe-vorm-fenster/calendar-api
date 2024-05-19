export type CalenderFeedType = 'ical' | 'google';

export interface CalendarFeed {
  type: CalenderFeedType;
  url: string;
}

export interface Calendar {
  id: string; // CRM id
  name: string;
  description?: string;
  defaultTags?: string[];
  defaultScope?: string;
  defaultLocation?: string;
  feed: CalendarFeed;
}
