import { calendar_v3 } from 'googleapis';

export type GoogleEvent = calendar_v3.Schema$Event;

// pick id, created, updated, summary, description, location, creator, organizer, start, end, iCalUID, sequence, attachments, recurrence from calendar_v3.Schema$Event
export type ReducedGoogleEvent = Pick<
  calendar_v3.Schema$Event,
  | 'id'
  | 'created'
  | 'updated'
  | 'summary'
  | 'description'
  | 'location'
  | 'start'
  | 'end'
  | 'sequence'
  | 'attachments'
  | 'recurrence'
  | 'recurringEventId'
  | 'status'
  | 'kind'
> & {
  organizer?: Omit<
    calendar_v3.Schema$Event['organizer'],
    'displayName' | 'self'
  > | null;
};

// pick   organizer.email

export interface FetchEventsQuery {
  calendarId: string;
  timeMin?: string;
  timeMax?: string;
  updatedMin?: string;
}

export interface FetchEventsPageQuery extends FetchEventsQuery {
  pageToken?: string;
}

export type EventList = ReducedGoogleEvent[];

export interface FetchEventsResult {
  calendarId: string;
  results: number;
  data: EventList;
  nextPageToken?: string;
}
